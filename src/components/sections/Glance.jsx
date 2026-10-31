import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading.jsx'
import { Link } from '../../router/Router.jsx'
import { useI18n } from '../../i18n/index.jsx'
import { EASE, VIEWPORT } from '../../lib/motion.js'

/**
 * "At a glance": the key facts in one quotable paragraph plus a definition list —
 * the format search engines and AI assistants lift answers from.
 */
export default function Glance() {
  const { t, href } = useI18n()
  return (
    <section aria-labelledby="glance-title" className="bg-paper pt-24 lg:pt-32">
      <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <SectionHeading id="glance-title" index="01" eyebrow={t.glance.eyebrow} title={t.glance.title} />
          <motion.p
            className="mt-6 text-lg leading-relaxed text-pretty text-ink/80"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
          >
            {t.glance.text}
          </motion.p>
          <Link to={href('about')} className="group mt-8 inline-flex items-center gap-2 text-[15px] font-semibold text-terracotta">
            {t.glance.more}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>
        <motion.dl
          className="divide-y divide-dune self-end rounded-[28px] border border-dune bg-paper-2 px-6 sm:px-8 lg:col-span-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
        >
          {t.glance.facts.map((fact) => (
            <div key={fact.label} className="grid grid-cols-1 gap-1 py-5 sm:grid-cols-[150px_1fr] sm:gap-6">
              <dt className="eyebrow !text-[11.5px] text-stone">{fact.label}</dt>
              <dd className="text-[16px] font-semibold">{fact.value}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  )
}
