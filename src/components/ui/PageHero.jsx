import { motion } from 'motion/react'
import Breadcrumbs from './Breadcrumbs.jsx'
import Photo from './Photo.jsx'
import { RevealTitle } from './SectionHeading.jsx'
import { EASE } from '../../lib/motion.js'

/** Header for inner pages: breadcrumbs, eyebrow, H1, intro, optional actions and photo. */
export default function PageHero({ eyebrow, title, intro, photo, photoAlt, aside, children }) {
  const media = photo || aside
  return (
    <section className="grain relative isolate overflow-hidden bg-night pt-28 pb-16 text-paper sm:pt-32 lg:pb-24">
      <div aria-hidden="true" className="absolute -top-40 left-1/3 -z-10 h-[420px] w-[720px] rounded-full bg-saffron/10 blur-[120px]" />
      <div className={`container-x grid grid-cols-1 gap-12 ${media ? 'lg:grid-cols-12 lg:items-end' : ''}`}>
        <div className={media ? 'lg:col-span-7' : 'max-w-4xl'}>
          <Breadcrumbs />
          <motion.p
            className="eyebrow mt-10 text-saffron"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
          >
            {eyebrow}
          </motion.p>
          <RevealTitle
            as="h1"
            text={title}
            accentClass="text-saffron"
            className="font-display mt-4 text-[2.5rem] text-balance sm:text-6xl lg:text-[4.2rem]"
          />
          {intro && (
            <motion.p
              className="mt-6 max-w-2xl text-[17px] leading-relaxed text-pretty text-paper/70 sm:text-lg"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
            >
              {intro}
            </motion.p>
          )}
          {children && (
            <motion.div
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.4 }}
            >
              {children}
            </motion.div>
          )}
        </div>
        {media && (
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: EASE, delay: 0.25 }}
          >
            {photo ? (
              <Photo
                id={photo}
                alt={photoAlt}
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                imgClassName="aspect-[3/2] w-full rounded-[28px] object-cover shadow-[0_40px_80px_-30px_rgb(0_0_0/0.7)] ring-1 ring-paper/10"
              />
            ) : (
              aside
            )}
          </motion.div>
        )}
      </div>
    </section>
  )
}
