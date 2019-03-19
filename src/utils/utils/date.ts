import { DateTime } from 'luxon';

export function formatJSDate(date: Date, format: Intl.DateTimeFormatOptions) {
  return DateTime.fromJSDate(date).toLocaleString(format);
}
