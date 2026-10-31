import { useRef, useState } from 'react'
import { useI18n } from '../i18n/index.jsx'
import { CAR_TYPES } from '../content/site.js'
import { formatDate, openWhatsApp } from '../lib/contact.js'
import { WEB3FORMS_KEY, sendBookingEmail } from '../lib/booking.js'

const COOLDOWN_MS = 30_000

/**
 * Sends a validated booking both ways from one click: by e-mail (Web3Forms) and on WhatsApp.
 * WhatsApp must open synchronously inside the click or pop-up blockers stop it, so the e-mail
 * request is started first and only awaited after WhatsApp has opened.
 *
 * `source` names the form in the e-mail. `car` (a FLEET entry) pre-selects one specific car;
 * it is included while its type is still the selected one.
 * `result` is { email: 'sent' | 'failed' | 'off', whatsapp: boolean (tab opened), data }.
 */
export function useBooking({ source, car } = {}) {
  const { t, lang, L } = useI18n()
  const [status, setStatus] = useState('idle') // idle | sending | sent
  const [result, setResult] = useState(null)
  const lastSubmit = useRef(0)

  /** WhatsApp text in the visitor's language. */
  const message = (d) =>
    t.form.whatsappMessage({
      ...d,
      car: d.car && car ? L(car.name) : '',
      type: L(CAR_TYPES.find((c) => c.id === d.carType)?.label) ?? t.form.any,
      pickup: formatDate(d.pickup, lang),
      dropoff: formatDate(d.dropoff, lang),
    })

  /** Returns false (and sends nothing) during the resubmit cooldown. */
  const send = async (validated) => {
    // Simple client-side rate limit against accidental double / repeated submits.
    const now = Date.now()
    if (now - lastSubmit.current < COOLDOWN_MS) return false
    lastSubmit.current = now

    const data = { ...validated, car: car && validated.carType === car.type ? car.name.en : '' }
    const delivery = WEB3FORMS_KEY ? sendBookingEmail(data, source).then(() => 'sent', () => 'failed') : null
    const whatsapp = openWhatsApp(message(data))
    if (delivery) {
      setStatus('sending')
      const email = await delivery
      if (email === 'failed') lastSubmit.current = 0
      setResult({ email, whatsapp, data })
    } else {
      setResult({ email: 'off', whatsapp, data })
    }
    setStatus('sent')
    return true
  }

  /** Honeypot hit: show a normal-looking success without sending anything. */
  const pretend = () => {
    setResult({ email: 'off', whatsapp: true, data: null })
    setStatus('sent')
  }

  const reset = () => {
    setStatus('idle')
    setResult(null)
  }

  return { status, result, message, send, pretend, reset, emailEnabled: Boolean(WEB3FORMS_KEY) }
}
