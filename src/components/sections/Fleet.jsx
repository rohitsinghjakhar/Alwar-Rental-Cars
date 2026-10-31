import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, ArrowUpRight, Briefcase, Fuel, Info, Settings2, Users } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading.jsx'
import Photo from '../ui/Photo.jsx'
import WhatsAppIcon from '../ui/WhatsAppIcon.jsx'
import { Link } from '../../router/Router.jsx'
import { useI18n } from '../../i18n/index.jsx'
import { CAR_TYPES } from '../../content/site.js'
import { FLEET } from '../../content/fleet.js'
import { carTypeLabel } from '../../content/derived.js'
import { whatsappHref } from '../../lib/contact.js'
import { EASE } from '../../lib/motion.js'

export function FleetGrid({ cars = FLEET, filterable = true, className = '' }) {
  const { t, L } = useI18n()
  const [filter, setFilter] = useState('all')
  const visible = filter === 'all' ? cars : cars.filter((c) => c.type === filter)
  const filters = [{ id: 'all', label: t.fleetSec.all }, ...CAR_TYPES.map((c) => ({ id: c.id, label: L(c.label) }))]

  return (
    <div className={className}>
      {filterable && (
        <div role="group" aria-label={t.fleetSec.filterLabel} className="-mx-4 flex overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:px-0">
          <div className="flex gap-1 rounded-full border border-dune bg-paper-2 p-1">
            {filters.map((f) => {
              const active = filter === f.id
              return (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(f.id)}
                  className={`relative rounded-full px-4 py-2 text-[14px] font-medium whitespace-nowrap transition-colors duration-300 ${
                    active ? 'text-paper' : 'text-ink/70 hover:text-ink'
                  }`}
                >
                  {active && (
                    <motion.span layoutId="fleet-filter" className="absolute inset-0 rounded-full bg-ink" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />
                  )}
                  <span className="relative">{f.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      )}

      <motion.ul layout className={`grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 ${filterable ? 'mt-10' : ''}`}>
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((car, i) => (
            <FleetCard key={car.id} car={car} index={i} />
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  )
}

export function FleetCard({ car, index = 0 }) {
  const { t, lang, href, L } = useI18n()
  const name = L(car.name)
  const page = href('car', car.slug)

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.25 } }}
      transition={{ duration: 0.8, ease: EASE, delay: (index % 3) * 0.08 }}
      className="group relative flex flex-col overflow-hidden rounded-[26px] border border-dune/70 bg-paper-2 transition-[box-shadow,border-color] duration-500 hover:border-dune hover:shadow-[0_40px_70px_-40px_rgb(17_19_26/0.45)]"
    >
      <Link to={page} className="relative block aspect-[3/2] overflow-hidden" tabIndex={-1} aria-hidden="true">
        <Photo
          id={car.photo}
          alt=""
          sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
          imgClassName="h-full w-full object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.05]"
        />
        <span className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/35 to-transparent" />
        <span className="absolute top-4 left-4 rounded-full bg-paper/92 px-3 py-1 text-[12.5px] font-semibold text-terracotta shadow-sm backdrop-blur">
          {L(car.tag)}
        </span>
        <span className="absolute top-4 right-4 rounded-full bg-ink/70 px-3 py-1 text-[12px] font-semibold text-paper backdrop-blur">
          {carTypeLabel(car.type, lang)}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-[1.4rem] leading-tight font-bold tracking-tight [font-stretch:112%]">
          <Link to={page} className="transition-colors hover:text-terracotta">
            {name}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-[14.5px] leading-relaxed text-stone">{L(car.summary)}</p>

        <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 text-[14.5px] text-ink/75">
          <Spec icon={Users} label={t.pages.car.specLabels.seats} value={t.common.seats(car.seats)} />
          <Spec icon={Settings2} label={t.pages.car.specLabels.transmission} value={L(car.transmission)} />
          <Spec icon={Fuel} label={t.pages.car.specLabels.fuel} value={L(car.fuel)} />
          <Spec icon={Briefcase} label={t.pages.car.specLabels.bags} value={t.common.bags(car.bags)} />
        </dl>

        <div className="min-h-6 flex-1" aria-hidden="true" />
        <div className="flex items-center justify-between gap-3 border-t border-dashed border-dune pt-5">
          <Link to={page} className="inline-flex items-center gap-1.5 text-[14.5px] font-semibold text-ink transition-colors hover:text-terracotta">
            {t.common.viewDetails}
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
          <a
            href={whatsappHref(t.pages.car.quoteMessage(name))}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.common.quoteFor(name)}
            className="inline-flex h-11 items-center gap-2 rounded-full bg-ink pr-3 pl-4 text-[14px] font-semibold text-paper transition-colors duration-300 hover:bg-night-2"
          >
            <WhatsAppIcon className="size-4 text-whatsapp" />
            {t.common.getQuote}
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </motion.li>
  )
}

function Spec({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-2">
      <dt className="sr-only">{label}</dt>
      <Icon className="size-4 shrink-0 text-terracotta" aria-hidden="true" />
      <dd>{value}</dd>
    </div>
  )
}

/** Home-page fleet section. */
export default function Fleet() {
  const { t, href } = useI18n()
  return (
    <section id="fleet" aria-labelledby="fleet-title" className="relative bg-paper py-24 lg:py-32">
      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading id="fleet-title" index="02" eyebrow={t.fleetSec.eyebrow} title={t.fleetSec.title} description={t.fleetSec.desc} />
          <Link
            to={href('cars')}
            className="group inline-flex items-center gap-2 self-start rounded-full border border-ink/15 px-5 py-3 text-[15px] font-semibold transition-colors hover:bg-ink hover:text-paper lg:self-auto"
          >
            {t.common.viewAllCars}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>
        <FleetGrid className="mt-12" />
        <p className="mt-8 flex items-start gap-2.5 text-[14.5px] text-stone">
          <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {t.fleetSec.note}
        </p>
      </div>
    </section>
  )
}
