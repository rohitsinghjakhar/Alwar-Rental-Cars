import { Fragment, useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { Clock, IdCard, MapPin, Phone } from 'lucide-react'
import Button from '../ui/Button.jsx'
import WhatsAppIcon from '../ui/WhatsAppIcon.jsx'
import QuickBook from './QuickBook.jsx'
import HeroRoad from './HeroRoad.jsx'
import { useI18n } from '../../i18n/index.jsx'
import { SITE } from '../../content/site.js'
import { telHref, whatsappHref } from '../../lib/contact.js'
import { useOpenNow } from '../../hooks/useLiveStatus.js'

// Deterministic contour lines (same output on server and client).
function contour(cx, cy, r, seed) {
  const pts = []
  for (let i = 0; i <= 72; i++) {
    const a = (i / 72) * Math.PI * 2
    const rr = r * (1 + 0.09 * Math.sin(3 * a + seed) + 0.05 * Math.sin(5 * a + seed * 1.7) + 0.03 * Math.cos(7 * a))
    pts.push(`${(cx + Math.cos(a) * rr * 1.35).toFixed(1)} ${(cy + Math.sin(a) * rr).toFixed(1)}`)
  }
  return `M${pts.join(' L')}Z`
}
const CONTOURS = [
  ...Array.from({ length: 9 }, (_, i) => contour(1180, 160, 40 + i * 34, 1.2)),
  ...Array.from({ length: 6 }, (_, i) => contour(140, 640, 30 + i * 36, 2.6)),
]

export default function Hero() {
  const ref = useRef(null)
  const { t, L } = useI18n()
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const topoY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 140])
  const copyY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60])
  const words = t.hero.words
  const facts = [
    { icon: IdCard, label: t.hero.facts[0] },
    { icon: Clock, label: L(SITE.hours.short) },
    { icon: MapPin, label: t.hero.facts[1] },
  ]

  return (
    <section id="top" ref={ref} aria-labelledby="hero-title" className="grain relative isolate overflow-hidden bg-night text-paper">
      <motion.svg
        aria-hidden="true"
        style={{ y: topoY }}
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <g fill="none" stroke="currentColor" strokeWidth="1" className="text-paper/[0.07]">
          {CONTOURS.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>
      </motion.svg>
      <div aria-hidden="true" className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-saffron/10 blur-[120px]" />

      <div className="container-x grid grid-cols-1 items-end gap-12 pt-28 pb-6 sm:pt-32 lg:grid-cols-12 lg:gap-10 lg:pt-32">
        <motion.div style={{ y: copyY }} className="lg:col-span-7">
          <OpenPill />

          <h1 id="hero-title" className="mt-7">
            <span className="eyebrow anim-fade-up block text-saffron" style={{ animationDelay: '0.1s' }}>
              {t.hero.eyebrow}
            </span>{' '}
            <span className="font-display hero-title mt-4 block text-[clamp(3.1rem,8.2vw,6.4rem)]">
              {words.map((word, i) => {
                const accent = word.startsWith('*')
                return (
                  <Fragment key={word}>
                    <span className="word-mask">
                      <span
                        className={`anim-rise inline-block ${accent ? 'font-accent pr-[0.06em] text-[1.1em] text-saffron' : ''}`}
                        style={{ animationDelay: `${0.2 + i * 0.08}s` }}
                      >
                        {word.replace(/\*/g, '')}
                      </span>
                    </span>
                    {i < words.length - 1 && ' '}
                    {i === 1 && <br />}
                  </Fragment>
                )
              })}
            </span>
          </h1>

          <p className="anim-fade-up mt-7 max-w-xl text-[17px] leading-relaxed text-pretty text-paper/70 sm:text-lg" style={{ animationDelay: '0.55s' }}>
            {t.hero.text}
          </p>

          <div className="anim-fade-up mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap" style={{ animationDelay: '0.65s' }}>
            <Button href={whatsappHref(t.common.defaultMessage)} size="lg" icon={WhatsAppIcon}>
              {t.common.bookWhatsApp}
            </Button>
            <Button href={telHref} variant="outline-light" size="lg" icon={Phone}>
              {t.common.call(SITE.phone.short)}
            </Button>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-7 gap-y-3">
            {facts.map(({ icon: Icon, label }, i) => (
              <li
                key={label}
                className="anim-fade-up flex items-center gap-2.5 text-[14.5px] text-paper/75"
                style={{ animationDelay: `${0.8 + i * 0.08}s` }}
              >
                <span className="grid size-8 place-items-center rounded-full bg-paper/[0.07] text-saffron">
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </motion.div>

        <div className="anim-card lg:col-span-5 lg:pb-4" style={{ animationDelay: '0.45s' }}>
          <QuickBook />
        </div>
      </div>

      <HeroRoad progress={scrollYProgress} />
    </section>
  )
}

function OpenPill() {
  const { t, L } = useI18n()
  const open = useOpenNow()
  const status = open === null ? t.common.timings : open ? t.common.openNow : t.common.closedNow
  const detail = open === false ? t.common.opens(L(SITE.hours.opensAt)) : L(SITE.hours.short)
  return (
    <p className="anim-fade-up inline-flex items-center gap-2.5 rounded-full border border-paper/12 bg-paper/[0.05] py-1.5 pr-4 pl-2 text-[13.5px] text-paper/80 backdrop-blur">
      <span className="relative flex size-6 items-center justify-center rounded-full bg-paper/10">
        <span className={`size-2 rounded-full ${open === false ? 'bg-terracotta' : 'bg-whatsapp'} ${open ? 'shadow-[0_0_0_4px_rgb(37_211_102/0.2)]' : ''}`} />
      </span>
      <span className="font-semibold text-paper">{status}</span>
      <span className="text-paper/40">·</span>
      <span>{detail}</span>
      <span className="hidden text-paper/40 sm:inline">·</span>
      <span className="hidden sm:inline">
        {L(SITE.address.street).split(', ').at(-1)}, {L(SITE.address.city)}
      </span>
    </p>
  )
}
