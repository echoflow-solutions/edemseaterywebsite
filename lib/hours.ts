/**
 * Trading-hours and pickup-slot logic.
 *
 * Everything here is computed in the restaurant's timezone, never the
 * visitor's. Someone ordering from Perth or overseas must see Liverpool NSW
 * times, otherwise they will book a slot the kitchen is not open for.
 */

const TIMEZONE = 'Australia/Sydney';

/**
 * Placeholder operational settings — confirm these with the restaurant and
 * change them here. They are deliberately in one place for that reason.
 */
export const PICKUP_SETTINGS = {
  /** Minutes the kitchen needs before an ASAP order is ready. */
  prepMinutes: 25,
  /** Gap between selectable scheduled slots, in minutes. */
  slotIntervalMinutes: 15,
  /** Stop accepting orders this many minutes before closing. */
  lastOrderBufferMinutes: 30,
} as const;

type Weekday = 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat';

/** Opening window per weekday, in minutes from midnight. null means closed. */
const TRADING_WINDOWS: Record<Weekday, { open: number; close: number } | null> = {
  Mon: null,
  Tue: { open: 11 * 60, close: 20 * 60 },
  Wed: { open: 11 * 60, close: 20 * 60 },
  Thu: { open: 11 * 60, close: 20 * 60 },
  Fri: { open: 11 * 60, close: 20 * 60 },
  Sat: { open: 11 * 60, close: 20 * 60 },
  Sun: { open: 13 * 60, close: 20 * 60 },
};

const WEEKDAY_NAMES: Record<Weekday, string> = {
  Sun: 'Sunday',
  Mon: 'Monday',
  Tue: 'Tuesday',
  Wed: 'Wednesday',
  Thu: 'Thursday',
  Fri: 'Friday',
  Sat: 'Saturday',
};

const ORDERED_WEEKDAYS: Weekday[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

type SydneyClock = {
  year: number;
  month: number;
  day: number;
  /** Minutes from midnight, Sydney time. */
  minutes: number;
  weekday: Weekday;
  /** Sydney's UTC offset in milliseconds at this instant. */
  offsetMs: number;
};

const formatter = new Intl.DateTimeFormat('en-AU', {
  timeZone: TIMEZONE,
  hour12: false,
  weekday: 'short',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
});

/** Break an instant into Sydney wall-clock parts plus the offset in force. */
export const getSydneyClock = (instant: Date): SydneyClock => {
  const parts = new Map(
    formatter.formatToParts(instant).map((part) => [part.type, part.value])
  );

  const year = Number(parts.get('year'));
  const month = Number(parts.get('month'));
  const day = Number(parts.get('day'));
  // 'en-AU' with hour12:false renders midnight as 24; normalise it to 0.
  const hour = Number(parts.get('hour')) % 24;
  const minute = Number(parts.get('minute'));
  const second = Number(parts.get('second'));
  const weekday = parts.get('weekday') as Weekday;

  const wallAsUtc = Date.UTC(year, month - 1, day, hour, minute, second);
  const offsetMs = wallAsUtc - (instant.getTime() - instant.getMilliseconds());

  return { year, month, day, minutes: hour * 60 + minute, weekday, offsetMs };
};

/** Build a real instant from a Sydney wall-clock time on the clock's date. */
const instantForSydneyMinutes = (clock: SydneyClock, minutes: number): Date =>
  new Date(
    Date.UTC(clock.year, clock.month - 1, clock.day, Math.floor(minutes / 60), minutes % 60) -
      clock.offsetMs
  );

const formatMinutes = (minutes: number): string => {
  const hour24 = Math.floor(minutes / 60);
  const minute = minutes % 60;
  const suffix = hour24 < 12 ? 'am' : 'pm';
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  return `${hour12}:${String(minute).padStart(2, '0')}${suffix}`;
};

export const isOpenAt = (instant: Date): boolean => {
  const clock = getSydneyClock(instant);
  const window = TRADING_WINDOWS[clock.weekday];
  if (!window) return false;
  return clock.minutes >= window.open && clock.minutes < window.close;
};

/** The next day the kitchen opens, e.g. "Tuesday from 11:00am". */
export const getNextOpening = (instant: Date): string => {
  const clock = getSydneyClock(instant);
  const todayIndex = ORDERED_WEEKDAYS.indexOf(clock.weekday);

  for (let ahead = 0; ahead < 8; ahead += 1) {
    const weekday = ORDERED_WEEKDAYS[(todayIndex + ahead) % 7];
    const window = TRADING_WINDOWS[weekday];
    if (!window) continue;
    // Today only counts if there is still time left to order.
    if (ahead === 0 && clock.minutes >= window.close - PICKUP_SETTINGS.lastOrderBufferMinutes) {
      continue;
    }
    const when = ahead === 0 ? 'today' : ahead === 1 ? 'tomorrow' : WEEKDAY_NAMES[weekday];
    const opensAt = ahead === 0 ? formatMinutes(clock.minutes) : formatMinutes(window.open);
    return ahead === 0 ? `today until ${formatMinutes(window.close)}` : `${when} from ${opensAt}`;
  }

  return 'soon';
};

export type PickupSlot = {
  /** ISO instant, ready to send to Square as pickup_at. */
  value: string;
  /** Sydney-local label for the customer, e.g. "6:15pm". */
  label: string;
};

export type PickupAvailability = {
  /** True when an ASAP order can be placed right now. */
  asapAvailable: boolean;
  /** Human-readable ASAP estimate, e.g. "Ready around 6:05pm". */
  asapLabel: string | null;
  /** ISO instant for the ASAP estimate. */
  asapValue: string | null;
  /** Later slots available today. Empty outside trading hours. */
  slots: PickupSlot[];
  /** Set when ordering is unavailable, explaining why. */
  closedReason: string | null;
};

/**
 * Work out what pickup times can be offered for an instant. Slots run from the
 * earliest the kitchen could have food ready up to the last-order cutoff, and
 * never cross midnight because the venue always closes the same day.
 */
export const getPickupAvailability = (instant: Date): PickupAvailability => {
  const clock = getSydneyClock(instant);
  const window = TRADING_WINDOWS[clock.weekday];

  const unavailable = (reason: string): PickupAvailability => ({
    asapAvailable: false,
    asapLabel: null,
    asapValue: null,
    slots: [],
    closedReason: reason,
  });

  if (!window) {
    return unavailable(
      `We are closed on ${WEEKDAY_NAMES[clock.weekday]}. We reopen ${getNextOpening(instant)}.`
    );
  }

  const lastOrder = window.close - PICKUP_SETTINGS.lastOrderBufferMinutes;

  if (clock.minutes >= lastOrder) {
    return unavailable(`Online orders for today have closed. We reopen ${getNextOpening(instant)}.`);
  }

  // Before opening, the first order can only be ready once the kitchen is on.
  const readyFrom = Math.max(clock.minutes + PICKUP_SETTINGS.prepMinutes, window.open);

  if (readyFrom > window.close) {
    return unavailable(`Online orders for today have closed. We reopen ${getNextOpening(instant)}.`);
  }

  const interval = PICKUP_SETTINGS.slotIntervalMinutes;
  const firstSlot = Math.ceil(readyFrom / interval) * interval;

  const slots: PickupSlot[] = [];
  for (let minutes = firstSlot; minutes <= window.close; minutes += interval) {
    slots.push({
      value: instantForSydneyMinutes(clock, minutes).toISOString(),
      label: formatMinutes(minutes),
    });
  }

  const openNow = clock.minutes >= window.open;

  return {
    asapAvailable: openNow,
    asapLabel: openNow ? `Ready around ${formatMinutes(readyFrom)}` : null,
    asapValue: openNow ? instantForSydneyMinutes(clock, readyFrom).toISOString() : null,
    slots,
    closedReason: openNow
      ? null
      : `We open at ${formatMinutes(window.open)} today. You can still schedule a pickup time below.`,
  };
};
