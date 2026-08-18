import { NextResponse, type NextRequest } from 'next/server';
import { randomUUID } from 'node:crypto';
import { findMenuItem, priceSelection, describeSelections, type OptionSelections } from '@/lib/menu';
import { getPickupAvailability } from '@/lib/hours';
import { createPaymentLink, getSquareConfig, type PaymentLineItem } from '@/lib/square';
import { SITE_URL } from '@/lib/site';

const CURRENCY = 'AUD';
const MAX_LINES = 40;
const MAX_QUANTITY_PER_LINE = 20;

type IncomingLine = { id: string; quantity: number; options: OptionSelections };

type CheckoutRequest = {
  lines: IncomingLine[];
  /** ISO instant for a scheduled slot, or null to mean as-soon-as-possible. */
  pickupAt: string | null;
  customer: { name: string; phone: string; email?: string };
  note?: string;
};

/** Generic message for the buyer. Detail goes to the server log, never the response. */
const failure = (message: string, status: number) =>
  NextResponse.json({ error: message }, { status });

const isNonEmptyString = (value: unknown, max: number): value is string =>
  typeof value === 'string' && value.trim().length > 0 && value.trim().length <= max;

const parseBody = (body: unknown): CheckoutRequest | null => {
  if (typeof body !== 'object' || body === null) return null;
  const candidate = body as Partial<CheckoutRequest>;

  if (!Array.isArray(candidate.lines) || candidate.lines.length === 0) return null;
  if (candidate.lines.length > MAX_LINES) return null;

  const lines: IncomingLine[] = [];
  for (const entry of candidate.lines) {
    if (typeof entry !== 'object' || entry === null) return null;
    const line = entry as Partial<IncomingLine>;
    if (typeof line.id !== 'string') return null;
    if (
      typeof line.quantity !== 'number' ||
      !Number.isInteger(line.quantity) ||
      line.quantity < 1 ||
      line.quantity > MAX_QUANTITY_PER_LINE
    ) {
      return null;
    }
    // Options arrive as a flat { groupId: choiceId } map of strings. Anything
    // else is rejected outright rather than coerced.
    const rawOptions = (line as { options?: unknown }).options;
    const options: OptionSelections = {};
    if (rawOptions !== undefined) {
      if (typeof rawOptions !== 'object' || rawOptions === null || Array.isArray(rawOptions)) {
        return null;
      }
      for (const [group, choice] of Object.entries(rawOptions)) {
        if (typeof group !== 'string' || typeof choice !== 'string') return null;
        if (group.length > 40 || choice.length > 60) return null;
        options[group] = choice;
      }
    }

    lines.push({ id: line.id, quantity: line.quantity, options });
  }

  const customer = candidate.customer;
  if (typeof customer !== 'object' || customer === null) return null;
  if (!isNonEmptyString(customer.name, 100)) return null;
  if (!isNonEmptyString(customer.phone, 30)) return null;
  if (customer.email !== undefined && !isNonEmptyString(customer.email, 200)) return null;

  if (candidate.pickupAt !== null && typeof candidate.pickupAt !== 'string') return null;
  if (candidate.note !== undefined && typeof candidate.note !== 'string') return null;

  return {
    lines,
    pickupAt: candidate.pickupAt ?? null,
    customer: {
      name: customer.name.trim(),
      phone: customer.phone.trim(),
      email: customer.email?.trim() || undefined,
    },
    note: candidate.note?.slice(0, 300),
  };
};

export async function POST(request: NextRequest) {
  const config = getSquareConfig();
  if (!config) {
    // Credentials absent: the site is running without online payment wired up.
    return failure('Online payment is not available yet. Please call us to order.', 503);
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return failure('We could not read that order. Please try again.', 400);
  }

  const parsed = parseBody(raw);
  if (!parsed) {
    return failure('Some order details were missing or invalid. Please check and try again.', 400);
  }

  // Prices come from our menu, never from the browser. The client only ever
  // sends item ids and quantities.
  const lineItems: PaymentLineItem[] = [];
  for (const line of parsed.lines) {
    const item = findMenuItem(line.id);
    if (!item) {
      return failure('One of those dishes is no longer on the menu. Please review your order.', 409);
    }
    // priceSelection rejects a missing, unknown or mismatched option, so a
    // forged combination cannot produce a price.
    const unitCents = priceSelection(item, line.options);
    if (unitCents === null) {
      return failure(
        `We could not price "${item.name}" with those choices. Please re-add it to your order.`,
        409
      );
    }

    const detail = describeSelections(item, line.options);
    lineItems.push({
      // The kitchen docket shows the choices, e.g. "Light Soup (Fufu · Goat)".
      name: detail ? `${item.name} (${detail})` : item.name,
      quantity: String(line.quantity),
      base_price_money: { amount: unitCents, currency: CURRENCY },
    });
  }

  // Re-derive what times are actually orderable. A stale browser tab or a
  // crafted request must not be able to book a slot outside trading hours.
  const availability = getPickupAvailability(new Date());
  let pickupAt: string;

  if (parsed.pickupAt === null) {
    if (!availability.asapAvailable || !availability.asapValue) {
      return failure('We are not taking as-soon-as-possible orders right now.', 409);
    }
    pickupAt = availability.asapValue;
  } else {
    const validSlot = availability.days
      .flatMap((day) => day.slots)
      .find((slot) => slot.value === parsed.pickupAt);
    if (!validSlot) {
      return failure('That pickup time is no longer available. Please choose another.', 409);
    }
    pickupAt = validSlot.value;
  }

  // In production the redirect must be our own origin, not whatever the
  // caller claims, so a crafted request cannot bounce buyers elsewhere.
  const origin = process.env.NODE_ENV === 'production' ? SITE_URL : request.nextUrl.origin;

  try {
    const result = await createPaymentLink(config, {
      idempotencyKey: randomUUID(),
      lineItems,
      pickupAt,
      customerName: parsed.customer.name,
      customerPhone: parsed.customer.phone,
      customerEmail: parsed.customer.email,
      note: parsed.note,
      redirectUrl: `${origin}/order/confirmed`,
    });

    return NextResponse.json({ url: result.url });
  } catch (error) {
    console.error('[checkout] Square payment link failed', error);
    return failure('We could not start the payment just now. Please try again or call us.', 502);
  }
}
