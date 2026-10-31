import { motion } from 'motion/react'
import { ArrowRight, CircleCheck } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading.jsx'
import { AadhaarSpecimen, LicenceSpecimen } from '../ui/IdSpecimen.jsx'
import { Link } from '../../router/Router.jsx'
import { useI18n } from '../../i18n/index.jsx'
import { EASE } from '../../lib/motion.js'

/** The two specimen cards, fanned out as they scroll into view. */
export function SpecimenStack() {
  const cards = [
    { Card: AadhaarSpecimen, rest: { rotate: -6, x: -28, y: 54 } },
    { Card: LicenceSpecimen, rest: { rotate: 5, x: 30, y: -58 } },
  ]
  return (
    <div className="relative mx-auto grid h-[360px] w-full max-w-[480px] place-items-center sm:h-[440px]">
      <div aria-hidden="true" className="absolute inset-6 rounded-full bg-sand blur-2xl" />
      {cards.map(({ Card, rest }, i) => (
        <motion.div
          key={i}
          className="absolute w-[84%] max-w-[380px]"
          initial={{ rotate: 0, x: 0, y: 60, opacity: 0 }}
          whileInView={{ ...rest, opacity: 1 }}
          whileHover={{ y: rest.y - 10, rotate: rest.rotate / 2, zIndex: 3 }}
          viewport={{ once: true, margin: '0px 0px -15% 0px' }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.15 + i * 0.15 }}
        >
          <Card />
        </motion.div>
      ))}
    </div>
  )
}

export default function Documents({ index = '06' }) {
  const { t, href } = useI18n()
  return (
    <section id="documents" aria-labelledby="docs-title" className="relative overflow-hidden bg-paper py-24 lg:py-32">
      <div className="container-x grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <div>
          <SectionHeading id="docs-title" index={index} eyebrow={t.docs.eyebrow} title={t.docs.title} description={t.docs.desc} />
          <motion.ul
            className="mt-9 grid gap-3.5"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } } }}
          >
            {t.docs.checklist.map((item) => (
              <motion.li
                key={item}
                variants={{ hidden: { opacity: 0, x: -16 }, show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } } }}
                className="flex items-center gap-3 text-[16.5px]"
              >
                <CircleCheck className="size-5 shrink-0 text-whatsapp-deep" aria-hidden="true" />
                {item}
              </motion.li>
            ))}
          </motion.ul>
          <Link
            to={href('documents')}
            className="group mt-10 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-[15px] font-semibold text-paper transition-colors hover:bg-night-2"
          >
            {t.docs.see}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>
        <SpecimenStack />
      </div>
    </section>
  )
}
