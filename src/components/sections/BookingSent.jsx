import { motion } from 'motion/react'
import { CircleCheck } from 'lucide-react'
import Button from '../ui/Button.jsx'
import WhatsAppIcon from '../ui/WhatsAppIcon.jsx'
import { useI18n } from '../../i18n/index.jsx'
import { whatsappHref } from '../../lib/contact.js'
import { EASE } from '../../lib/motion.js'

/**
 * Confirmation shown after a booking form is sent. The wording depends on what got through:
 * the e-mail, the WhatsApp tab, both — or neither yet (then the visitor taps to send on WhatsApp).
 */
export default function BookingSent({ booking, onReset, className = '' }) {
  const { t } = useI18n()
  const f = t.form
  const { email, whatsapp, data } = booking.result
  const first = data?.name.split(' ')[0]
  const emailed = email === 'sent'
  const done = emailed || whatsapp

  const title = emailed ? f.sentEmailTitle : whatsapp ? f.sentWhatsAppTitle : f.pendingTitle
  const text = emailed ? (whatsapp ? f.sentBothText(first) : f.sentEmailText(first)) : whatsapp ? f.sentWhatsAppText : f.pendingText
  const action = whatsapp ? f.openWhatsAppAgain : emailed ? f.fasterOnWhatsApp : f.submitWhatsApp

  return (
    <motion.div
      role="status"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5, ease: EASE }}
      className={`flex flex-col items-center justify-center text-center ${className}`}
    >
      <motion.span
        initial={{ scale: 0.4, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 16, delay: 0.1 }}
        className="grid size-20 place-items-center rounded-full bg-whatsapp/15 text-whatsapp-deep"
      >
        {done ? <CircleCheck className="size-10" aria-hidden="true" /> : <WhatsAppIcon className="size-9" />}
      </motion.span>
      <h3 className="mt-6 text-2xl font-extrabold [font-stretch:115%]">{title}</h3>
      <p className="mt-2 max-w-sm text-stone">{text}</p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        {data && (
          <Button href={whatsappHref(booking.message(data))} variant="whatsapp" icon={WhatsAppIcon}>
            {action}
          </Button>
        )}
        <Button variant="outline-dark" onClick={onReset}>
          {f.newEnquiry}
        </Button>
      </div>
    </motion.div>
  )
}
