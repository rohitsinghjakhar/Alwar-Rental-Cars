import { motion } from 'motion/react'
import { ArrowUpRight, Briefcase, Camera, House, Landmark } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading.jsx'
import { Link } from '../../router/Router.jsx'
import { useI18n } from '../../i18n/index.jsx'
import { EASE, VIEWPORT } from '../../lib/motion.js'

export const AUDIENCE_ICONS = { business: Briefcase, government: Landmark, tourists: Camera, local: House }
const LAYOUT = {
  business: { featured: true, span: 'lg:col-span-7' },
  government: { featured: true, span: 'lg:col-span-5' },
  tourists: { featured: false, span: 'lg:col-span-5' },
  local: { featured: false, span: 'lg:col-span-7' },
}

export default function Audience({ index = '04' }) {
  const { t } = useI18n()
  return (
    <section aria-labelledby="audience-title" className="relative bg-sand py-24 lg:py-32">
      <div className="container-x">
        <SectionHeading id="audience-title" index={index} eyebrow={t.audience.eyebrow} title={t.audience.title} description={t.audience.desc} />
        <ul className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-12">
          {t.audience.items.map((item, i) => (
            <AudienceCard key={item.id} item={item} index={i} />
          ))}
        </ul>
      </div>
    </section>
  )
}

function AudienceCard({ item, index }) {
  const { t, href } = useI18n()
  const { featured, span } = LAYOUT[item.id]
  const Icon = AUDIENCE_ICONS[item.id]

  return (
    <motion.li
      className={`group relative isolate overflow-hidden rounded-[28px] p-7 sm:p-9 ${span} ${featured ? 'grain bg-night text-paper' : 'bg-paper-2 text-ink ring-1 ring-dune/80'}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.9, ease: EASE, delay: (index % 2) * 0.1 }}
      whileHover={{ y: -4 }}
    >
      <span
        aria-hidden="true"
        className={`font-display pointer-events-none absolute -right-3 -bottom-8 -z-10 text-[9rem] leading-none transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-2 ${featured ? 'text-paper/[0.04]' : 'text-ink/[0.04]'}`}
      >
        0{index + 1}
      </span>

      <div className="flex items-start justify-between gap-4">
        <span className={`grid size-14 place-items-center rounded-2xl transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-rotate-6 ${featured ? 'bg-saffron text-ink' : 'bg-terracotta/10 text-terracotta'}`}>
          <Icon className="size-6" aria-hidden="true" />
        </span>
        {featured && (
          <span className="rounded-full border border-saffron/40 px-3 py-1 text-[12px] font-semibold tracking-wide text-saffron uppercase">{t.audience.bestFit}</span>
        )}
      </div>

      <h3 className="mt-8 text-[1.7rem] leading-tight font-extrabold tracking-tight [font-stretch:115%]">{item.title}</h3>
      <p className={`mt-3 max-w-lg text-[16.5px] leading-relaxed ${featured ? 'text-paper/70' : 'text-stone'}`}>{item.text}</p>

      <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
        <ul className="flex flex-wrap gap-2" aria-label={t.audience.tagsAria(item.title)}>
          {item.tags.map((tag) => (
            <li key={tag} className={`rounded-full px-3 py-1.5 text-[13px] font-medium ${featured ? 'bg-paper/[0.08] text-paper/80' : 'bg-sand text-ink/75'}`}>
              {tag}
            </li>
          ))}
        </ul>
        <Link
          to={`${href('services')}#${item.id}`}
          aria-label={`${item.title} — ${t.common.learnMore}`}
          className={`grid size-11 place-items-center rounded-full transition-all duration-300 group-hover:rotate-45 ${featured ? 'bg-paper text-ink' : 'bg-ink text-paper'}`}
        >
          <ArrowUpRight className="size-5" aria-hidden="true" />
        </Link>
      </div>
    </motion.li>
  )
}
