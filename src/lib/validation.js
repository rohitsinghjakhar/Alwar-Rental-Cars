import { CAR_TYPES } from '../content/site.js'
import { todayIST } from './contact.js'

export const LIMITS = { name: 60, message: 500 }

// Control characters plus zero-width and bidi-override characters (used to disguise text).
const INVISIBLE_RANGES = [
  [0x00, 0x08],
  [0x0b, 0x0c],
  [0x0e, 0x1f],
  [0x7f, 0x7f],
  [0x200b, 0x200f],
  [0x202a, 0x202e],
  [0x2066, 0x2069],
]
const CONTROL_CHARS = new RegExp(
  `[${INVISIBLE_RANGES.map(([from, to]) => `${String.fromCharCode(from)}-${String.fromCharCode(to)}`).join('')}]`,
  'g',
)
const ANGLE_BRACKETS = /[<>]/g
const NAME_PATTERN = /^[\p{L}\p{M} .'-]+$/u
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/

/** Strips control / bidi characters and markup brackets, normalises whitespace, enforces a max length. */
export function cleanText(value, max, { multiline = false } = {}) {
  let text = String(value ?? '')
    .replace(CONTROL_CHARS, '')
    .replace(ANGLE_BRACKETS, '')
  text = multiline
    ? text.replace(/\r\n?/g, '\n').replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n')
    : text.replace(/\s+/g, ' ')
  return text.trim().slice(0, max)
}

/** Returns a 10-digit Indian mobile number, or null if invalid. */
export function normalisePhone(value) {
  const digits = String(value ?? '').replace(/[\s()-]/g, '')
  const match = digits.match(/^(?:\+?91|0)?([6-9]\d{9})$/)
  return match ? match[1] : null
}

export function validateBooking(raw) {
  const data = {
    name: cleanText(raw.name, LIMITS.name),
    phone: normalisePhone(raw.phone),
    carType: CAR_TYPES.some((c) => c.id === raw.carType) ? raw.carType : '',
    pickup: DATE_PATTERN.test(raw.pickup ?? '') ? raw.pickup : '',
    dropoff: DATE_PATTERN.test(raw.dropoff ?? '') ? raw.dropoff : '',
    message: cleanText(raw.message, LIMITS.message, { multiline: true }),
  }

  // Values are error codes; the form looks up the message in the current language.
  const errors = {}
  if (data.name.length < 2) errors.name = 'nameShort'
  else if (!NAME_PATTERN.test(data.name)) errors.name = 'nameChars'

  if (!data.phone) errors.phone = 'phone'

  const today = todayIST()
  if (!data.pickup) errors.pickup = 'pickupMissing'
  else if (data.pickup < today) errors.pickup = 'pickupPast'

  if (!data.dropoff) errors.dropoff = 'dropoffMissing'
  else if (data.pickup && data.dropoff < data.pickup) errors.dropoff = 'dropoffBefore'

  return { data, errors, valid: Object.keys(errors).length === 0 }
}
