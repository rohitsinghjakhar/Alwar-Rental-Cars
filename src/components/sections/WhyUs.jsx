import { useEffect, useRef } from 'react'
import { animate, motion, useInView, useReducedMotion } from 'motion/react'
import { FileCheck2, Handshake, MapPinned, Wrench } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading.jsx'
import { useI18n } from '../../i18n/index.jsx'
import { CAR_TYPES } from '../../content/site.js'
import { EASE, VIEWPORT } from '../../lib/motion.js'

const ICONS = [Wrench, FileCheck2, MapPinned, Handshake]
const STAT_VALUES = [12, 2, CAR_TYPES.length, 1]

export default function WhyUs({ index = '03', withStats = true, bordered = true }) {
  const { t } = useI18n()
  return (
    <section aria-labelledby="why-title" className="relative bg-paper pb-24 lg:pb-32">
      <div className="container-x">
        <div className={bordered ? 'border-t border-dune pt-24 lg:pt-32' : 'pt-24 lg:pt-32'}>
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
            <SectionHeading id="why-title" index={index} eyebrow={t.why.eyebrow} title={t.why.title} description={t.why.desc} className="lg:col-span-5" />

            <ul className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:col-span-7 lg:pt-4">
              {t.why.features.map(({ title, text }, i) => {
                const Icon = ICONS[i]
                return (
                  <motion.li
                    key={title}
                    className="group"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={VIEWPORT}
                    transition={{ duration: 0.8, ease: EASE, delay: i * 0.08 }}
                  >
                    <span className="grid size-12 place-items-center rounded-2xl bg-sand text-terracotta transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-rotate-6 group-hover:scale-105">
                      <Icon className="size-[22px]" aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 text-lg font-bold [font-stretch:110%]">{title}</h3>
                    <p className="mt-2 leading-relaxed text-stone">{text}</p>
                  </motion.li>
                )
              })}
            </ul>
          </div>

          {withStats && (
            <dl className="mt-20 grid grid-cols-2 overflow-hidden rounded-[28px] border border-dune bg-paper-2 lg:grid-cols-4">
              {t.why.stats.map((label, i) => (
                <div
                  key={label}
                  className={`flex flex-col-reverse justify-end gap-2 p-6 sm:p-8 ${i % 2 ? 'border-l border-dune' : ''} ${i > 1 ? 'border-t border-dune lg:border-t-0' : ''} ${i === 2 ? 'lg:border-l' : ''}`}
                >
                  <dt className="text-[14px] leading-snug text-stone">{label}</dt>
                  <dd className="font-display flex items-baseline gap-1.5 text-5xl text-ink sm:text-6xl">
                    <CountUp to={STAT_VALUES[i]} />
                    {i === 0 && <span className="text-xl text-terracotta [font-stretch:100%]">{t.why.hrs}</span>}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>
    </section>
  )
}

function CountUp({ to }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!inView || reduce || !ref.current) return
    const node = ref.current
    const controls = animate(0, to, {
      duration: 1.4,
      ease: EASE,
      onUpdate: (v) => {
        node.textContent = String(Math.round(v))
      },
    })
    return () => controls.stop()
  }, [inView, reduce, to])

  return (
    <span ref={ref} className="tabular-nums">
      {to}
    </span>
  )
}
