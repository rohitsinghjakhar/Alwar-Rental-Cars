import { SITE } from '../content/site.js'

export const telHref = `tel:${SITE.phone.tel}`
export const mailHref = `mailto:${SITE.email}`

export const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.mapsQuery)}`

export const mapsEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(SITE.mapsEmbedQuery)}&output=embed`

/** Builds a wa.me link. Text is URI-encoded, so user input can't break out of the URL. */
export function whatsappHref(text) {
  return `https://wa.me/${SITE.phone.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`
}

/**
 * Opens WhatsApp in a new tab. Returns false if a pop-up blocker stopped it.
 * ('noopener' as a window feature would make window.open always return null, so the opener
 * link is cut by hand instead.)
 */
export function openWhatsApp(text) {
  const win = window.open(whatsappHref(text), '_blank')
  if (win) win.opener = null
  return Boolean(win)
}

/** Current open/closed state in Alwar (IST), independent of the visitor's timezone. */
export function getOpenStatus(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(now)
  const hour = Number(parts.find((p) => p.type === 'hour')?.value ?? 0)
  const minute = Number(parts.find((p) => p.type === 'minute')?.value ?? 0)
  const minutes = hour * 60 + minute
  const isOpen = minutes >= SITE.hours.open * 60 && minutes < SITE.hours.close * 60
  return { isOpen }
}

/** Today's date in IST as YYYY-MM-DD (for <input type="date" min>). */
export function todayIST(now = new Date()) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(now)
}

export function formatDate(iso, lang = 'en') {
  if (!iso) return ''
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })
}
