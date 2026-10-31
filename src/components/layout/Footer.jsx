import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { ArrowUp, ArrowUpRight, CodeXml, Phone } from 'lucide-react'
import Logo from '../ui/Logo.jsx'
import Button from '../ui/Button.jsx'
import WhatsAppIcon from '../ui/WhatsAppIcon.jsx'
import { RevealTitle } from '../ui/SectionHeading.jsx'
import { Link } from '../../router/Router.jsx'
import { useI18n } from '../../i18n/index.jsx'
import { SITE } from '../../content/site.js'
import { DESTINATIONS } from '../../content/destinations.js'
import { mailHref, mapsHref, telHref, whatsappHref } from '../../lib/contact.js'
import { scrollToId } from '../../lib/scroll.js'

const EXPLORE = ['cars', 'services', 'how', 'documents', 'trips', 'about', 'faq', 'contact']
// Photo credits stay reachable from every photo caption (see Photo.jsx).
const LEGAL = ['privacy', 'terms']
const DEVELOPER = { name: 'Gyanokar Learning & IT Services', url: 'https://www.gyanokar.com', site: 'www.gyanokar.com' }

export default function Footer() {
  const ref = useRef(null)
  const { t, lang, href, L } = useI18n()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const wordY = useTransform(scrollYProgress, [0, 1], ['40%', '0%'])
  const link = 'text-paper/75 transition-colors hover:text-saffron'

  return (
    <footer ref={ref} className="grain relative isolate overflow-hidden bg-ink pt-24 pb-28 text-paper md:pb-10 lg:pt-32">
      <div className="container-x">
        <div className="flex flex-col gap-10 border-b border-paper/10 pb-16 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="eyebrow text-saffron">{t.footer.eyebrow}</p>
            <RevealTitle
              as="p"
              text={t.footer.title}
              accentClass="text-saffron"
              className="font-display mt-5 text-[2.6rem] text-balance sm:text-6xl lg:text-7xl"
            />
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <Button href={whatsappHref(t.common.defaultMessage)} variant="whatsapp" size="lg" icon={WhatsAppIcon}>
              {t.common.bookWhatsApp}
            </Button>
            <Button href={telHref} variant="outline-light" size="lg" icon={Phone}>
              {SITE.phone.display}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12 pt-14 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo tone="light" />
            <p className="mt-5 max-w-xs leading-relaxed text-paper/60">{t.footer.about}</p>
            <p lang={lang === 'en' ? 'hi' : 'en'} className="mt-3 text-[15px] text-paper/45">
              {t.footer.tagline}
            </p>
          </div>

          <nav aria-label={t.footer.explore} className="lg:col-span-2">
            <p className="eyebrow text-[11px] text-paper/40">{t.footer.explore}</p>
            <ul className="mt-5 grid gap-3">
              {EXPLORE.map((page) => (
                <li key={page}>
                  <Link to={href(page)} className={link}>
                    {t.nav[page]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t.footer.guides} className="lg:col-span-3">
            <p className="eyebrow text-[11px] text-paper/40">{t.footer.guides}</p>
            <ul className="mt-5 grid gap-3">
              {DESTINATIONS.map((d) => (
                <li key={d.id}>
                  <Link to={href('trip', d.slug)} className={link}>
                    {L(d.name)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <p className="eyebrow text-[11px] text-paper/40">{t.footer.contact}</p>
            <address className="mt-5 grid gap-3 not-italic">
              <a href={telHref} className={`${link} tabular-nums`}>
                {SITE.phone.display}
              </a>
              <a href={mailHref} className={`${link} break-all`}>
                {SITE.email}
              </a>
              <a href={mapsHref} target="_blank" rel="noopener noreferrer" className={link}>
                {L(SITE.address.street)},
                <br />
                {L(SITE.address.city)}, {L(SITE.address.state)} {SITE.address.pin}
              </a>
            </address>
            <p className="eyebrow mt-8 text-[11px] text-paper/40">{t.footer.hours}</p>
            <p className="mt-3 text-paper/75">{L(SITE.hours.label)}</p>
            <p className="eyebrow mt-6 text-[11px] text-paper/40">{t.footer.docs}</p>
            <p className="mt-3 text-paper/75">{t.footer.docsValue}</p>
          </div>
        </div>

        <div className="mt-16 flex flex-col-reverse items-start justify-between gap-6 border-t border-paper/10 pt-8 text-[13.5px] text-paper/45 sm:flex-row sm:items-center">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <p suppressHydrationWarning>
              &copy; {new Date().getFullYear()} {lang === 'hi' ? SITE.nameHi : SITE.name}. {t.footer.rights}
            </p>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {LEGAL.map((page) => (
                <li key={page}>
                  <Link to={href(page)} className="transition-colors hover:text-paper">
                    {t.nav[page]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <button
            type="button"
            onClick={() => scrollToId('top')}
            className="group inline-flex items-center gap-2 text-paper/70 transition-colors hover:text-paper"
          >
            {t.nav.backToTop}
            <span className="grid size-9 place-items-center rounded-full bg-paper/10 transition-transform duration-300 group-hover:-translate-y-1">
              <ArrowUp className="size-4" aria-hidden="true" />
            </span>
          </button>
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href={DEVELOPER.url}
            target="_blank"
            rel="noopener"
            className="group inline-flex max-w-full flex-wrap items-center justify-center gap-x-4 gap-y-2.5 rounded-[22px] border border-paper/10 bg-paper/[0.04] p-2 transition-colors duration-300 hover:border-saffron/40 hover:bg-paper/[0.07] sm:flex-nowrap sm:rounded-full"
          >
            <span className="flex items-center gap-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-saffron text-ink transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-rotate-12">
                <CodeXml className="size-[18px]" aria-hidden="true" />
              </span>
              <span className="text-[13.5px] leading-snug text-paper/55">
                {t.footer.credit}{' '}
                <span lang="en" className="font-semibold text-paper transition-colors duration-300 group-hover:text-saffron">
                  {DEVELOPER.name}
                </span>
              </span>
            </span>
            <span lang="en" className="inline-flex items-center gap-1.5 rounded-full bg-paper/[0.08] px-3.5 py-1.5 text-[13px] font-semibold text-saffron">
              {DEVELOPER.site}
              <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </span>
          </a>
        </div>
      </div>

      <motion.p
        aria-hidden="true"
        style={{ y: wordY }}
        className="font-display pointer-events-none absolute inset-x-0 -bottom-[0.18em] -z-10 text-center text-[21vw] leading-none whitespace-nowrap text-paper/[0.035] select-none"
      >
        ALWAR
      </motion.p>
    </footer>
  )
}
