import { CAR_TYPES, SITE } from '../content/site.js'
import { formatDate } from './contact.js'

/**
 * E-mail delivery of booking requests through Web3Forms (https://web3forms.com).
 * The access key is public by design — it can only send to the inbox it was created for —
 * so it is set in .env and ships in the browser bundle. An empty key means WhatsApp only.
 */
export const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY?.trim() || ''
const REQUEST_TIMEOUT_MS = 12_000

/** Sends one validated booking to the business inbox. Rejects if it wasn't delivered. */
export async function sendBookingEmail(data, source) {
  const type = CAR_TYPES.find((c) => c.id === data.carType)?.label.en ?? 'Any / not sure'
  const fields = {
    access_key: WEB3FORMS_KEY,
    subject: `New booking request — ${data.name}${data.car ? ` — ${data.car}` : ''}`,
    from_name: `${SITE.name} website`,
    name: data.name,
    phone: `+91 ${data.phone}`,
    ...(data.car && { car: data.car }),
    car_type: type,
    pickup: formatDate(data.pickup),
    return: formatDate(data.dropoff),
    message: data.message || '—',
    form: source,
    page: window.location.href,
  }
  const body = new FormData()
  for (const [key, value] of Object.entries(fields)) body.append(key, value)

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)
  try {
    // FormData keeps this a "simple" CORS request (no preflight), and keepalive lets it finish
    // even if the browser is sent to the background while WhatsApp opens.
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body,
      keepalive: true,
      signal: controller.signal,
    })
    const json = await res.json().catch(() => ({}))
    if (!res.ok || !json.success) throw new Error(json.message || 'Delivery failed')
  } finally {
    clearTimeout(timer)
  }
}
