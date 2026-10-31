import { Fragment } from 'react'
import { motion } from 'motion/react'
import { EASE, VIEWPORT } from '../../lib/motion.js'

/**
 * Title words rise out of a mask one after another.
 * Wrap a word in *asterisks* to set it in the italic serif accent.
 */
export function RevealTitle({ text, as: Tag = 'h2', className = '', accentClass = 'text-terracotta', delay = 0, id }) {
  const words = text.split(' ')
  const MotionTag = motion[Tag]

  return (
    <MotionTag
      id={id}
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      transition={{ staggerChildren: 0.06, delayChildren: delay }}
    >
      {words.map((word, i) => {
        const accent = word.startsWith('*')
        const clean = word.replace(/\*/g, '')
        // The space must sit outside the inline-block mask, or the browser collapses it.
        return (
          <Fragment key={i}>
            <span className="word-mask">
              <motion.span
                className={`inline-block ${accent ? `font-accent pr-[0.06em] text-[1.08em] ${accentClass}` : ''}`}
                variants={{
                  hidden: { y: '110%' },
                  show: { y: '0%', transition: { duration: 0.9, ease: EASE } },
                }}
              >
                {clean}
              </motion.span>
            </span>
            {i < words.length - 1 && ' '}
          </Fragment>
        )
      })}
    </MotionTag>
  )
}

export default function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  id,
  as = 'h2',
  tone = 'dark',
  align = 'left',
  className = '',
  children,
}) {
  const light = tone === 'light'
  return (
    <div className={`${align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl'} ${className}`}>
      <motion.p
        className={`eyebrow flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''} ${light ? 'text-saffron' : 'text-terracotta'}`}
        initial={{ opacity: 0, x: -12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.7, ease: EASE }}
      >
        {index && <span className="tabular-nums">{index}</span>}
        <motion.span
          className={`h-px w-10 origin-left ${light ? 'bg-saffron/60' : 'bg-terracotta/50'}`}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
        />
        <span>{eyebrow}</span>
      </motion.p>
      <RevealTitle
        id={id}
        as={as}
        text={title}
        accentClass={light ? 'text-saffron' : 'text-terracotta'}
        className={`font-display mt-5 text-[2.35rem] text-balance sm:text-5xl lg:text-[3.5rem] ${light ? 'text-paper' : 'text-ink'}`}
      />
      {description && (
        <motion.p
          className={`mt-5 text-[17px] leading-relaxed text-pretty ${light ? 'text-paper/70' : 'text-stone'}`}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
        >
          {description}
        </motion.p>
      )}
      {children}
    </div>
  )
}
