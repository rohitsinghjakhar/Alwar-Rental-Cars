import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { Menu, Phone, X } from 'lucide-react'
import Logo from '../ui/Logo.jsx'
import Button from '../ui/Button.jsx'
import LangToggle from '../ui/LangToggle.jsx'
import WhatsAppIcon from '../ui/WhatsAppIcon.jsx'
import { Link, useRouter } from '../../router/Router.jsx'
import { useI18n } from '../../i18n/index.jsx'
import { SITE } from '../../content/site.js'
import { telHref, whatsappHref } from '../../lib/contact.js'
import { getLenis } from '../../lib/scroll.js'
import { EASE } from '../../lib/motion.js'

const DESKTOP = ['cars', 'services', 'trips', 'how', 'about', 'contact']
const MOBILE = ['home', 'cars', 'services', 'trips', 'how', 'documents', 'about', 'faq', 'contact']
const SECTION_OF = { car: 'cars', trip: 'trips' }

export default function Navbar() {
  const { route } = useRouter()
  const { t, href } = useI18n()
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const current = SECTION_OF[route.page] ?? route.page

  useMotionValueEvent(scrollY, 'change', (y) => {
    const delta = y - (scrollY.getPrevious() ?? 0)
    setScrolled(y > 40)
    if (y < 480 || open) setHidden(false)
    else if (delta > 6) setHidden(true)
    else if (delta < -6) setHidden(false)
  })

  const close = useCallback(() => setOpen(false), [])
  const solid = scrolled && !open

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={`transition-[background-color,border-color,backdrop-filter] duration-500 ${
            solid ? 'border-b border-ink/8 bg-paper/85 backdrop-blur-xl backdrop-saturate-150' : 'border-b border-transparent'
          }`}
        >
          <nav aria-label={t.nav.main} className="container-x flex h-[72px] items-center justify-between gap-4">
            <Link to={href('home')} onClick={close} aria-label={`${SITE.name} — ${t.nav.home}`} className="shrink-0 rounded-xl">
              <Logo tone={solid ? 'dark' : 'light'} />
            </Link>

            <ul className="hidden items-center gap-0.5 xl:flex">
              {DESKTOP.map((page) => {
                const active = current === page
                return (
                  <li key={page}>
                    <Link
                      to={href(page)}
                      aria-current={active ? 'page' : undefined}
                      className={`relative block rounded-full px-3.5 py-2 text-[14.5px] font-medium whitespace-nowrap transition-colors duration-300 ${
                        solid ? 'text-ink/70 hover:text-ink' : 'text-paper/75 hover:text-paper'
                      } ${active ? (solid ? '!text-ink' : '!text-paper') : ''}`}
                    >
                      {active && (
                        <motion.span
                          layoutId="nav-pill"
                          className={`absolute inset-0 -z-10 rounded-full ${solid ? 'bg-ink/[0.07]' : 'bg-paper/10'}`}
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        />
                      )}
                      {t.nav[page]}
                    </Link>
                  </li>
                )
              })}
            </ul>

            <div className="flex items-center gap-2">
              <a
                href={telHref}
                className={`hidden items-center gap-2 rounded-full px-3 py-2 text-[14.5px] font-semibold tabular-nums transition-colors 2xl:inline-flex ${
                  solid ? 'text-ink hover:bg-ink/5' : 'text-paper hover:bg-paper/10'
                }`}
              >
                <Phone className="size-4" aria-hidden="true" />
                {SITE.phone.display}
              </a>
              <LangToggle solid={solid} id="nav-lang" />
              <div className="hidden sm:block">
                <Button href={whatsappHref(t.common.defaultMessage)} variant="primary" size="sm" icon={WhatsAppIcon}>
                  {t.nav.book}
                </Button>
              </div>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
                className={`relative grid size-11 place-items-center rounded-full transition-colors xl:hidden ${
                  solid ? 'bg-ink text-paper' : 'bg-paper/10 text-paper hover:bg-paper/15'
                }`}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={open ? 'x' : 'menu'}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {open ? <X className="size-5" /> : <Menu className="size-5" />}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      <MobileMenu open={open} onClose={close} current={current} />
    </>
  )
}

function MobileMenu({ open, onClose, current }) {
  const { t, href } = useI18n()
  const panelRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const lenis = getLenis()
    lenis?.stop()
    document.body.style.overflow = 'hidden'
    panelRef.current?.querySelector('a')?.focus({ preventScroll: true })

    const onKey = (e) => e.key === 'Escape' && onClose()
    const mql = window.matchMedia('(min-width: 1280px)')
    const onResize = () => mql.matches && onClose()
    window.addEventListener('keydown', onKey)
    mql.addEventListener('change', onResize)
    return () => {
      lenis?.start()
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      mql.removeEventListener('change', onResize)
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={t.nav.menu}
          className="grain fixed inset-0 z-40 flex flex-col overflow-y-auto bg-night px-4 pt-24 pb-[max(2rem,env(safe-area-inset-bottom))] text-paper sm:px-6 xl:hidden"
          initial={{ clipPath: 'inset(0 0 100% 0)' }}
          animate={{ clipPath: 'inset(0 0 0% 0)' }}
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <ul className="flex flex-col">
            {MOBILE.map((page, i) => (
              <motion.li
                key={page}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10, transition: { duration: 0.2 } }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.12 + i * 0.04 }}
                className="border-b border-paper/10"
              >
                <Link
                  to={href(page)}
                  onClick={onClose}
                  aria-current={current === page ? 'page' : undefined}
                  className="font-display flex items-baseline justify-between py-3.5 text-[1.85rem]"
                >
                  <span className={current === page ? 'text-saffron' : ''}>{t.nav[page]}</span>
                  <span className="text-xs font-medium tracking-widest text-paper/40 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                </Link>
              </motion.li>
            ))}
          </ul>

          <motion.div
            className="mt-auto grid gap-3 pt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.45 }}
          >
            <Button href={whatsappHref(t.common.defaultMessage)} variant="whatsapp" size="lg" icon={WhatsAppIcon} className="w-full">
              {t.common.bookWhatsApp}
            </Button>
            <Button href={telHref} variant="outline-light" size="lg" icon={Phone} className="w-full">
              {t.common.call(SITE.phone.display)}
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
