import { useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'motion/react'
import { Phone } from 'lucide-react'
import WhatsAppIcon from '../ui/WhatsAppIcon.jsx'
import { useI18n } from '../../i18n/index.jsx'
import { telHref, whatsappHref } from '../../lib/contact.js'
import { EASE } from '../../lib/motion.js'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })
  return <motion.div aria-hidden="true" style={{ scaleX }} className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-saffron" />
}

function useScrolledPast(px) {
  const { scrollY } = useScroll()
  const [past, setPast] = useState(false)
  useMotionValueEvent(scrollY, 'change', (y) => setPast(y > px))
  return past
}

/** Desktop: floating WhatsApp bubble. */
export function FloatingWhatsApp() {
  const { t } = useI18n()
  const visible = useScrolledPast(500)
  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={whatsappHref(t.common.defaultMessage)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t.common.chatAria}
          className="group fixed right-6 bottom-6 z-40 hidden items-center md:flex"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        >
          <span className="pointer-events-none mr-3 translate-x-2 rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper opacity-0 shadow-lg transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
            {t.common.chatWithUs}
          </span>
          <span className="relative grid size-14 place-items-center rounded-full bg-whatsapp text-ink shadow-[0_12px_30px_-8px_rgb(37_211_102/0.7)] transition-transform duration-300 group-hover:scale-105">
            <span className="absolute inset-0 animate-ping-slow rounded-full bg-whatsapp" aria-hidden="true" />
            <WhatsAppIcon className="relative size-7" />
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  )
}

/** Mobile: thumb-reachable Call / WhatsApp bar. */
export function MobileActionBar() {
  const { t } = useI18n()
  const visible = useScrolledPast(160)
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          <div className="grid grid-cols-2 gap-2 rounded-2xl border border-ink/10 bg-paper/90 p-2 shadow-[0_-10px_40px_-15px_rgb(17_19_26/0.35)] backdrop-blur-xl">
            <a href={telHref} className="flex h-12 items-center justify-center gap-2 rounded-xl bg-ink text-[15px] font-semibold text-paper active:scale-[0.98]">
              <Phone className="size-[18px]" aria-hidden="true" /> {t.common.callNow}
            </a>
            <a
              href={whatsappHref(t.common.defaultMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 items-center justify-center gap-2 rounded-xl bg-whatsapp text-[15px] font-semibold text-ink active:scale-[0.98]"
            >
              <WhatsAppIcon className="size-5" /> {t.common.whatsapp}
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
