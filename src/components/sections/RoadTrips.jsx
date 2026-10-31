import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView, useMotionValue, useMotionValueEvent } from 'motion/react'
import { ArrowRight, Clock, Navigation } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading.jsx'
import Button from '../ui/Button.jsx'
import Photo from '../ui/Photo.jsx'
import WhatsAppIcon from '../ui/WhatsAppIcon.jsx'
import { Link } from '../../router/Router.jsx'
import { useI18n } from '../../i18n/index.jsx'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion.js'
import { DESTINATIONS } from '../../content/destinations.js'
import { whatsappHref } from '../../lib/contact.js'
import { EASE, EASE_IN_OUT, VIEWPORT } from '../../lib/motion.js'

const HOME = { x: 340, y: 320 }
const AUTO_ADVANCE_MS = 4200

const routePath = ({ x, y, curve }) => {
  const cx = (HOME.x + x) / 2 + curve[0]
  const cy = (HOME.y + y) / 2 + curve[1]
  return `M${HOME.x} ${HOME.y} Q${cx} ${cy} ${x} ${y}`
}

const RIDGES = [
  'M60 360 C120 330 160 300 210 310 S300 380 360 420 S470 470 560 440',
  'M40 420 C110 400 170 380 230 400 S320 470 380 500 S480 540 580 520',
  'M80 300 C140 270 190 250 240 262 S320 320 380 350',
  'M300 140 C350 120 410 150 450 190 S520 260 580 270',
  'M320 100 C380 80 440 110 480 150 S540 210 590 220',
]

export default function RoadTrips({ index = '07' }) {
  const { t, L, href } = useI18n()
  const [activeId, setActiveId] = useState(DESTINATIONS[2].id)
  const [paused, setPaused] = useState(false)
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { margin: '-20% 0px -20% 0px' })
  const reduce = usePrefersReducedMotion()
  const active = DESTINATIONS.find((d) => d.id === activeId)

  useEffect(() => {
    if (paused || reduce || !inView) return
    const timer = setTimeout(() => {
      const i = DESTINATIONS.findIndex((d) => d.id === activeId)
      setActiveId(DESTINATIONS[(i + 1) % DESTINATIONS.length].id)
    }, AUTO_ADVANCE_MS)
    return () => clearTimeout(timer)
  }, [activeId, paused, reduce, inView])

  const select = (id) => {
    setPaused(true)
    setActiveId(id)
  }

  return (
    <section id="road-trips" ref={sectionRef} aria-labelledby="trips-title" className="grain relative isolate overflow-hidden bg-night py-24 text-paper lg:py-32">
      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading id="trips-title" index={index} eyebrow={t.trips.eyebrow} title={t.trips.title} description={t.trips.desc} tone="light" />
          <Button href={whatsappHref(t.trips.planMessage(L(active.name)))} variant="outline-light" icon={WhatsAppIcon} className="self-start lg:self-auto">
            {t.trips.plan(L(active.name))}
          </Button>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <ul className="order-2 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:order-1 lg:col-span-5 lg:grid-cols-1" onMouseEnter={() => setPaused(true)} onFocus={() => setPaused(true)}>
            {DESTINATIONS.map((d) => {
              const isActive = d.id === activeId
              return (
                <li key={d.id} className={`relative overflow-hidden rounded-2xl transition-colors duration-300 ${isActive ? 'bg-paper text-ink' : 'bg-paper/[0.04] text-paper hover:bg-paper/[0.08]'}`}>
                  <button type="button" onClick={() => select(d.id)} aria-pressed={isActive} className="w-full px-5 py-4 text-left">
                    <span className="flex items-center justify-between gap-4">
                      <span>
                        <span className="block text-[17px] font-bold [font-stretch:110%]">{L(d.name)}</span>
                        <span className={`text-[13px] ${isActive ? 'text-stone' : 'text-paper/50'}`}>{L(d.kind)}</span>
                      </span>
                      <span className="text-right text-[13.5px] tabular-nums">
                        <span className="block font-semibold">~{d.km} km</span>
                        <span className={`inline-flex items-center gap-1 ${isActive ? 'text-stone' : 'text-paper/50'}`}>
                          <Clock className="size-3" aria-hidden="true" /> {L(d.time)}
                        </span>
                      </span>
                    </span>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-4">
                      <p className="text-[14.5px] leading-relaxed text-ink/70">{L(d.note)}</p>
                      <Link to={href('trip', d.slug)} tabIndex={isActive ? 0 : -1} className="mt-2 inline-flex items-center gap-1.5 text-[14px] font-semibold text-terracotta">
                        {t.common.readGuide} <ArrowRight className="size-3.5" aria-hidden="true" />
                      </Link>
                    </div>
                  </motion.div>
                  {isActive && !paused && !reduce && (
                    <motion.span
                      key={d.id}
                      aria-hidden="true"
                      className="absolute bottom-0 left-0 h-[3px] w-full origin-left bg-saffron"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: AUTO_ADVANCE_MS / 1000, ease: 'linear' }}
                    />
                  )}
                </li>
              )
            })}
          </ul>

          <div className="order-1 lg:order-2 lg:col-span-7">
            <RouteMap activeId={activeId} onSelect={select} />
            <p className="mt-3 text-[12.5px] text-paper/40">{t.trips.mapNote}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export function RouteMap({ activeId, onSelect }) {
  const { t, L } = useI18n()
  const pathRefs = useRef({})
  const markerRef = useRef(null)
  const progress = useMotionValue(0)
  const reduce = usePrefersReducedMotion()

  useMotionValueEvent(progress, 'change', (p) => {
    const path = pathRefs.current[activeId]
    if (!path || !markerRef.current) return
    const length = path.getTotalLength()
    const point = path.getPointAtLength(p * length)
    const prev = path.getPointAtLength(Math.max(0, p * length - 1))
    // Navigation icon points north-east (-45°); turn it to face the direction of travel.
    const heading = p > 0 ? (Math.atan2(point.y - prev.y, point.x - prev.x) * 180) / Math.PI + 45 : 0
    markerRef.current.setAttribute('transform', `translate(${point.x} ${point.y}) rotate(${heading})`)
  })

  useEffect(() => {
    if (reduce) {
      progress.set(1)
      return
    }
    progress.jump(0)
    const controls = animate(progress, 1, { duration: 1.8, ease: EASE_IN_OUT, delay: 0.25 })
    return () => controls.stop()
  }, [activeId, progress, reduce])

  return (
    <div className="relative overflow-hidden rounded-[28px] bg-night-2 ring-1 ring-paper/10">
      <svg viewBox="70 20 520 520" className="block h-auto w-full" role="img" aria-label={t.trips.mapLabel}>
        <defs>
          <pattern id="map-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0 L0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.6" className="text-paper/[0.05]" />
          </pattern>
          <radialGradient id="map-glow">
            <stop offset="0" stopColor="#f2a33a" stopOpacity=".35" />
            <stop offset="1" stopColor="#f2a33a" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="600" height="560" fill="url(#map-grid)" />
        <g fill="none" strokeLinecap="round" className="text-paper/[0.08]" stroke="currentColor" strokeWidth="14">
          {RIDGES.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>
        <ellipse cx="282" cy="364" rx="14" ry="7" className="fill-[#3d5a80]/60" />

        <g transform="translate(548 76)" className="text-paper/40">
          <circle r="18" fill="none" stroke="currentColor" strokeWidth="1" />
          <path d="M0 -13 L5 3 L0 0 L-5 3 Z" fill="#f2a33a" />
          <text y="-24" textAnchor="middle" fontSize="11" fill="currentColor" fontWeight="600">
            {t.trips.north}
          </text>
        </g>

        {DESTINATIONS.map((d) => (
          <path
            key={d.id}
            ref={(el) => {
              pathRefs.current[d.id] = el
            }}
            d={routePath(d)}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="3 6"
            className="text-paper/25"
          />
        ))}

        {DESTINATIONS.filter((d) => d.id === activeId).map((d) => (
          <motion.path
            key={d.id}
            d={routePath(d)}
            fill="none"
            stroke="#f2a33a"
            strokeWidth="3.5"
            strokeLinecap="round"
            initial={{ pathLength: reduce ? 1 : 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.8, ease: EASE_IN_OUT, delay: 0.25 }}
          />
        ))}

        {DESTINATIONS.map((d) => {
          const isActive = d.id === activeId
          const right = d.x < 420
          return (
            <g key={d.id} transform={`translate(${d.x} ${d.y})`} onClick={() => onSelect?.(d.id)} className={onSelect ? 'cursor-pointer' : ''}>
              <circle r="16" fill="transparent" />
              <motion.circle initial={false} animate={{ r: isActive ? 7 : 5 }} fill={isActive ? '#f2a33a' : '#f6f1e7'} stroke="#1b2440" strokeWidth="3" />
              <text
                x={right ? 13 : -13}
                y="4"
                textAnchor={right ? 'start' : 'end'}
                fontSize="14.5"
                fontWeight={isActive ? 700 : 500}
                fill={isActive ? '#f7bd62' : 'rgba(246,241,231,0.7)'}
                style={{ transition: 'fill .3s' }}
              >
                {L(d.name)}
              </text>
            </g>
          )
        })}

        <g transform={`translate(${HOME.x} ${HOME.y})`}>
          <circle r="46" fill="url(#map-glow)" />
          <circle r="11" fill="#f2a33a" />
          <circle r="4.5" fill="#11131a" />
          <text x="18" y="-10" fontSize="15" fontWeight="800" fill="#f6f1e7" style={{ fontStretch: '115%' }}>
            {t.trips.alwar}
          </text>
          <text x="18" y="6" fontSize="10.5" fill="rgba(246,241,231,0.55)">
            {t.trips.youStart}
          </text>
        </g>

        <g ref={markerRef} transform={`translate(${HOME.x} ${HOME.y})`} aria-hidden="true">
          <circle r="13" fill="#f6f1e7" />
          <g transform="translate(-7 -7)">
            <Navigation width="14" height="14" color="#11131a" strokeWidth={2.4} />
          </g>
        </g>
      </svg>
    </div>
  )
}

/** Photo cards linking to each trip guide. */
export function TripCards({ exclude, only, className = '' }) {
  const { L, href } = useI18n()
  const items = DESTINATIONS.filter((d) => d.id !== exclude && (!only || only.includes(d.id)))
  return (
    <ul className={`grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 ${className}`}>
      {items.map((d, i) => (
        <motion.li
          key={d.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.8, ease: EASE, delay: (i % 3) * 0.08 }}
        >
          <Link to={href('trip', d.slug)} className="group relative block overflow-hidden rounded-[24px] bg-night">
            <Photo
              id={d.photo}
              alt={L(d.fullName)}
              sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
              imgClassName="aspect-[4/3] w-full object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
            <span className="absolute top-4 left-4 rounded-full bg-paper/90 px-3 py-1 text-[12.5px] font-semibold text-ink tabular-nums">
              ~{d.km} km · {L(d.time)}
            </span>
            <span className="absolute inset-x-0 bottom-0 p-5 text-paper">
              <span className="eyebrow block !text-[11px] text-saffron">{L(d.kind)}</span>
              <span className="mt-1.5 flex items-center justify-between gap-3 text-xl font-bold [font-stretch:112%]">
                {L(d.name)}
                <ArrowRight className="size-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </span>
          </Link>
        </motion.li>
      ))}
    </ul>
  )
}
