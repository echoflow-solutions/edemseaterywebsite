/**
 * Square integration helpers. Server-only.
 *
 * This talks to Square's REST API directly rather than through the SDK. There
 * are exactly two calls — create a payment link, and verify a webhook — and a
 * pinned API version is more predictable than tracking SDK releases on the
 * path that handles money.
 *
 * None of these environment variables are NEXT_PUBLIC_, so they are never
 * bundled into the browser.
 */

import { createHmac, timingSafeEqual } from 'node:crypto';
import { GST } from './site';

/** Pinned so a Square API change can never alter behaviour without a deploy. */
const SQUARE_VERSION = '2026-07-15';

export type SquareConfig = {
  accessToken: string;
  locationId: string;
  baseUrl: string;
  environment: 'sandbox' | 'production';
};

/**
 * Reads Square credentials from the environment. Returns null when they are
 * absent so callers can degrade gracefully instead of throwing at import time.
 */
export const getSquareConfig = (): SquareConfig | null => {
  const accessToken = process.env.SQUARE_ACCESS_TOKEN;
  const locationId = process.env.SQUARE_LOCATION_ID;
  if (!accessToken || !locationId) return null;

  const environment = process.env.SQUARE_ENVIRONMENT === 'production' ? 'production' : 'sandbox';

  return {
    accessToken,
    locationId,
    environment,
    baseUrl:
      environment === 'production'
        ? 'https://connect.squareup.com'
        : 'https://connect.squareupsandbox.com',
  };
};

export type PaymentLineItem = {
  name: string;
  quantity: string;
  base_price_money: { amount: number; currency: string };
};

export type CreatePaymentLinkInput = {
  idempotencyKey: string;
  lineItems: PaymentLineItem[];
  pickupAt: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  note?: string;
  redirectUrl: string;
};

export type PaymentLinkResult = {
  url: string;
  orderId: string | undefined;
  paymentLinkId: string;
};

/**
 * Creates a Square-hosted checkout page for a pickup order.
 *
 * The order carries a PICKUP fulfillment, which is what pushes it to Square
 * Point of Sale and the Dashboard Order Manager once it has been paid.
 */
export const createPaymentLink = async (
  config: SquareConfig,
  input: CreatePaymentLinkInput
): Promise<PaymentLinkResult> => {
  const response = await fetch(`${config.baseUrl}/v2/online-checkout/payment-links`, {
    method: 'POST',
    headers: {
      'Square-Version': SQUARE_VERSION,
      Authorization: `Bearer ${config.accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      idempotency_key: input.idempotencyKey,
      description: `Online pickup order — ${input.customerName}`,
      order: {
        location_id: config.locationId,
        line_items: input.lineItems,
        // INCLUSIVE means Square extracts the GST already contained in the
        // menu price instead of adding it on top, so the customer still pays
        // the advertised amount and the tax is reported correctly.
        taxes: [
          {
            uid: 'gst',
            name: GST.name,
            percentage: GST.percentage,
            type: 'INCLUSIVE',
            scope: 'ORDER',
          },
        ],
        fulfillments: [
          {
            type: 'PICKUP',
            state: 'PROPOSED',
            pickup_details: {
              pickup_at: input.pickupAt,
              note: input.note,
              recipient: {
                display_name: input.customerName,
                phone_number: input.customerPhone,
                ...(input.customerEmail ? { email_address: input.customerEmail } : {}),
              },
            },
          },
        ],
      },
      checkout_options: {
        redirect_url: input.redirectUrl,
        ask_for_shipping_address: false,
      },
      // No pre_populated_data here. Square rejects an order that sets both a
      // fulfillment and buyer_email ("Only one of [fulfillment, buyer_email]
      // fields should be set"), and the buyer's details are already carried on
      // pickup_details.recipient. The buyer types their email on Square's page,
      // which is what triggers the receipt anyway.
    }),
  });

  const payload: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    // Square's error detail is useful in our logs but must not reach the buyer.
    throw new Error(
      `Square returned ${response.status}: ${JSON.stringify(payload)?.slice(0, 500)}`
    );
  }

  const link = (payload as { payment_link?: { url?: string; id?: string; order_id?: string } })
    ?.payment_link;

  if (!link?.url || !link.id) {
    throw new Error('Square response did not include a payment link URL');
  }

  return { url: link.url, orderId: link.order_id, paymentLinkId: link.id };
};

/**
 * Verifies a Square webhook signature.
 *
 * Square signs the concatenation of the notification URL and the raw request
 * body with the subscription's signature key. The comparison is constant-time
 * so a mismatch cannot be discovered by measuring how long it takes.
 */
export const verifyWebhookSignature = (
  rawBody: string,
  signatureHeader: string | null,
  notificationUrl: string,
  signatureKey: string
): boolean => {
  if (!signatureHeader) return false;

  const expected = createHmac('sha256', signatureKey)
    .update(notificationUrl + rawBody)
    .digest('base64');

  const expectedBuffer = Buffer.from(expected);
  const receivedBuffer = Buffer.from(signatureHeader);

  if (expectedBuffer.length !== receivedBuffer.length) return false;
  return timingSafeEqual(expectedBuffer, receivedBuffer);
};
