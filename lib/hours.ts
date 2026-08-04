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
  /**
   * How many future trading days can be pre-ordered, beyond today. Closed
   * days are skipped, so on a Sunday this offers Tuesday rather than Monday.
   */
  preOrderDays: 1,
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

type DayContext = {
  year: number;
  month: number;
  day: number;
  weekday: Weekday;
  offsetMs: number;
};

/**
 * The Sydney calendar day a given number of days after the supplied clock,
 * together with the UTC offset in force on that day. The offset is sampled at
 * roughly midday Sydney so a DST change overnight cannot skew it.
 */
const getDayContext = (base: SydneyClock, offsetDays: number): DayContext => {
  const target = new Date(Date.UTC(base.year, base.month - 1, base.day + offsetDays));
  const year = target.getUTCFullYear();
  const month = target.getUTCMonth() + 1;
  const day = target.getUTCDate();
  const weekday = ORDERED_WEEKDAYS[target.getUTCDay()];
  // 02:00 UTC lands at midday-ish in Sydney on the same calendar date.
  const { offsetMs } = getSydneyClock(new Date(Date.UTC(year, month - 1, day, 2, 0)));
  return { year, month, day, weekday, offsetMs };
};

const instantForDayMinutes = (context: DayContext, minutes: number): Date =>
  new Date(
    Date.UTC(
      context.year,
      context.month - 1,
      context.day,
      Math.floor(minutes / 60),
      minutes % 60
    ) - context.offsetMs
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

export type PickupSlot = {
  /** ISO instant, ready to send to Square as pickup_at. */
  value: string;
  /** Sydney-local label for the customer, e.g. "6:15pm". */
  label: string;
};

export type PickupDay = {
  /** "Today", "Tomorrow", or the weekday name. */
  label: string;
  slots: PickupSlot[];
};

export type PickupAvailability = {
  /** True when an ASAP order can be placed right now. */
  asapAvailable: boolean;
  /** Human-readable ASAP estimate, e.g. "Ready around 6:05pm". */
  asapLabel: string | null;
  /** ISO instant for the ASAP estimate. */
  asapValue: string | null;
  /** Selectable days, today first, closed days skipped. */
  days: PickupDay[];
  /** Informational note about today's trading, if any. */
  notice: string | null;
};

/** Look no further ahead than this when hunting for the next trading day. */
const LOOKAHEAD_LIMIT_DAYS = 8;

/**
 * Work out what pickup times can be offered from a given instant: the rest of
 * today, plus the next trading days allowed for pre-orders. Slots never cross
 * midnight because the venue always closes the same day it opens.
 */
export const getPickupAvailability = (instant: Date): PickupAvailability => {
  const clock = getSydneyClock(instant);
  const interval = PICKUP_SETTINGS.slotIntervalMinutes;
  const todayWindow = TRADING_WINDOWS[clock.weekday];

  const days: PickupDay[] = [];
  let futureDaysAdded = 0;

  for (let offset = 0; offset <= LOOKAHEAD_LIMIT_DAYS; offset += 1) {
    const context = getDayContext(clock, offset);
    const window = TRADING_WINDOWS[context.weekday];
    if (!window) continue;

    let earliest: number;
    if (offset === 0) {
      // Today only counts while there is still time to cook before cutoff.
      const lastOrder = window.close - PICKUP_SETTINGS.lastOrderBufferMinutes;
      if (clock.minutes >= lastOrder) continue;
      earliest = Math.max(clock.minutes + PICKUP_SETTINGS.prepMinutes, window.open);
    } else {
      earliest = window.open;
    }

    const firstSlot = Math.ceil(earliest / interval) * interval;
    const slots: PickupSlot[] = [];
    for (let minutes = firstSlot; minutes <= window.close; minutes += interval) {
      slots.push({
        value: instantForDayMinutes(context, minutes).toISOString(),
        label: formatMinutes(minutes),
      });
    }
    if (slots.length === 0) continue;

    const label =
      offset === 0 ? 'Today' : offset === 1 ? 'Tomorrow' : WEEKDAY_NAMES[context.weekday];
    days.push({ label, slots });

    if (offset > 0) {
      futureDaysAdded += 1;
      if (futureDaysAdded >= PICKUP_SETTINGS.preOrderDays) break;
    }
  }

  const openNow =
    todayWindow !== null &&
    clock.minutes >= todayWindow.open &&
    clock.minutes < todayWindow.close - PICKUP_SETTINGS.lastOrderBufferMinutes;

  const readyFrom = openNow ? clock.minutes + PICKUP_SETTINGS.prepMinutes : null;
  const asapAvailable =
    todayWindow !== null && readyFrom !== null && readyFrom <= todayWindow.close;

  const nextDay = days.find((day) => day.label !== 'Today');
  // "tomorrow" reads better lowercase mid-sentence; a weekday is a proper noun.
  const nextDayPhrase = nextDay
    ? ` You can pre-order for ${
        nextDay.label === 'Tomorrow' ? 'tomorrow' : nextDay.label
      } below.`
    : '';

  let notice: string | null = null;
  if (!todayWindow) {
    notice = `We are closed on ${WEEKDAY_NAMES[clock.weekday]}.${nextDayPhrase}`;
  } else if (clock.minutes < todayWindow.open) {
    notice = `We open at ${formatMinutes(todayWindow.open)} today. Choose a pickup time below.`;
  } else if (!openNow) {
    notice = `Online orders for today have closed.${nextDayPhrase}`;
  }

  return {
    asapAvailable,
    asapLabel: asapAvailable && readyFrom !== null ? `Ready around ${formatMinutes(readyFrom)}` : null,
    asapValue:
      asapAvailable && readyFrom !== null
        ? instantForSydneyMinutes(clock, readyFrom).toISOString()
        : null,
    days,
    notice,
  };
};
