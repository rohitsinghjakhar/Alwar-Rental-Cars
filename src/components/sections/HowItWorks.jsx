import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'motion/react'
import { ArrowRight, IdCard, KeyRound, MessageCircle, RotateCcw } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading.jsx'
import { Link } from '../../router/Router.jsx'
import { useI18n } from '../../i18n/index.jsx'
import { EASE, VIEWPORT } from '../../lib/motion.js'

const ICONS = [MessageCircle, IdCard, KeyRound, RotateCcw]

/** Four steps on a road that fills as you scroll. `details` adds the longer checklist (How it works page). */
export default function HowItWorks({ index = '05', details = false, showLink = true }) {
  const ref = useRef(null)
  const { t, href } = useI18n()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 65%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return (
    <section id="how-it-works" aria-labelledby="how-title" className="grain relative isolate overflow-hidden bg-night py-24 text-paper lg:py-32">
      <div aria-hidden="true" className="absolute -right-40 -bottom-40 -z-10 size-[520px] rounded-full bg-terracotta/15 blur-[120px]" />
      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading id="how-title" index={index} eyebrow={t.how.eyebrow} title={t.how.title} tone="light" />
          {showLink && (
            <Link to={href('how')} className="group inline-flex items-center gap-2 self-start rounded-full border border-paper/20 px-5 py-3 text-[15px] font-semibold transition-colors hover:bg-paper hover:text-ink lg:self-auto">
              {t.common.learnMore}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          )}
        </div>

        <div ref={ref} className="relative mt-16 lg:mt-24">
          <div aria-hidden="true" className="absolute top-0 bottom-0 left-[27px] w-[3px] rounded-full bg-paper/10 lg:top-[27px] lg:right-0 lg:bottom-auto lg:left-0 lg:h-[3px] lg:w-auto">
            <motion.div style={{ scaleY: progress }} className="h-full w-full origin-top rounded-full bg-saffron lg:hidden" />
            <motion.div style={{ scaleX: progress }} className="hidden h-full w-full origin-left rounded-full bg-saffron lg:block" />
          </div>
          <ol className="relative grid grid-cols-1 gap-12 lg:grid-cols-4 lg:gap-8">
            {t.how.steps.map((step, i) => (
              <Step key={step.title} step={step} index={i} progress={progress} details={details ? t.pages.how.details[i] : null} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

function Step({ step, index, progress, details }) {
  const { t } = useI18n()
  const Icon = ICONS[index]
  const at = (index + 0.15) / 4
  const lit = useTransform(progress, [at - 0.08, at], [0, 1])
  const scale = useTransform(progress, [at - 0.08, at, at + 0.06], [1, 1.12, 1])

  return (
    <motion.li
      className="relative flex gap-6 lg:flex-col"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.8, ease: EASE, delay: index * 0.1 }}
    >
      <motion.span style={{ scale }} className="relative grid size-14 shrink-0 place-items-center rounded-2xl bg-night-2 ring-1 ring-paper/15">
        <Icon className="size-6 text-paper" aria-hidden="true" />
        <motion.span style={{ opacity: lit }} className="absolute inset-0 grid place-items-center rounded-2xl bg-saffron" aria-hidden="true">
          <Icon className="size-6 text-ink" />
        </motion.span>
      </motion.span>
      <div className="pt-1 lg:pt-0">
        <p className="eyebrow text-[11px] text-saffron">
          {t.how.stepLabel} {String(index + 1).padStart(2, '0')}
        </p>
        <h3 className="mt-2 text-[1.35rem] font-bold [font-stretch:112%]">{step.title}</h3>
        <p className="mt-2.5 max-w-xs leading-relaxed text-paper/65">{step.text}</p>
        {details && (
          <ul className="mt-4 grid max-w-xs gap-2 border-t border-paper/10 pt-4">
            {details.map((d) => (
              <li key={d} className="flex gap-2.5 text-[14.5px] leading-relaxed text-paper/75">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-saffron" aria-hidden="true" />
                {d}
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.li>
  )
}
