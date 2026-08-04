import { NextResponse, type NextRequest } from 'next/server';
import { verifyWebhookSignature } from '@/lib/square';

/**
 * Square webhook receiver.
 *
 * Square remains the system of record, so this endpoint does not persist
 * anything. It exists so paid orders and payment failures are visible in our
 * own logs, and so we have a hook to attach alerting to later.
 */
export async function POST(request: NextRequest) {
  const signatureKey = process.env.SQUARE_WEBHOOK_SIGNATURE_KEY;
  const notificationUrl = process.env.SQUARE_WEBHOOK_NOTIFICATION_URL;

  if (!signatureKey || !notificationUrl) {
    console.error('[square-webhook] signature key or notification URL not configured');
    return NextResponse.json({ error: 'Not configured' }, { status: 503 });
  }

  // The signature covers the raw body, so it must be read as text before any
  // JSON parsing reformats it.
  const rawBody = await request.text();
  const signature = request.headers.get('x-square-hmacsha256-signature');

  if (!verifyWebhookSignature(rawBody, signature, notificationUrl, signatureKey)) {
    console.warn('[square-webhook] rejected a request with an invalid signature');
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  let event: { type?: string; event_id?: string; data?: { id?: string } };
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  switch (event.type) {
    case 'payment.updated':
    case 'payment.created':
      console.info('[square-webhook] payment event', event.type, event.data?.id);
      break;
    case 'order.created':
    case 'order.updated':
    case 'order.fulfillment.updated':
      console.info('[square-webhook] order event', event.type, event.data?.id);
      break;
    default:
      console.info('[square-webhook] unhandled event', event.type);
  }

  // Always acknowledge a verified event, or Square will keep retrying it.
  return NextResponse.json({ received: true });
}
