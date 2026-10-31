import { motion } from 'motion/react'
import { Link, useRouter } from '../../router/Router.jsx'
import { useI18n } from '../../i18n/index.jsx'
import { alternatePath } from '../../router/routes.js'

const OPTIONS = [
  { lang: 'en', label: 'EN' },
  { lang: 'hi', label: 'हिं' },
]

/** EN / हिं switch — links to the same page in the other language. */
export default function LangToggle({ solid, id = 'lang' }) {
  const { route } = useRouter()
  const { lang, t } = useI18n()

  return (
    <div
      role="group"
      aria-label={`${t.langLabel} / ${t.switchLabel}`}
      className={`relative flex rounded-full p-1 text-[13px] font-semibold ${solid ? 'bg-ink/[0.06]' : 'bg-paper/10'}`}
    >
      {OPTIONS.map((option) => {
        const active = option.lang === lang
        return (
          <Link
            key={option.lang}
            to={alternatePath(route, option.lang)}
            hrefLang={option.lang === 'hi' ? 'hi-IN' : 'en-IN'}
            lang={option.lang}
            aria-current={active ? 'true' : undefined}
            aria-label={active ? undefined : t.switchAria}
            className={`relative grid h-8 min-w-10 place-items-center rounded-full px-2.5 transition-colors duration-300 ${
              active ? (solid ? 'text-paper' : 'text-ink') : solid ? 'text-ink/60 hover:text-ink' : 'text-paper/70 hover:text-paper'
            }`}
          >
            {active && (
              <motion.span
                layoutId={`${id}-pill`}
                className={`absolute inset-0 rounded-full ${solid ? 'bg-ink' : 'bg-paper'}`}
                transition={{ type: 'spring', stiffness: 420, damping: 34 }}
              />
            )}
            <span className="relative">{option.label}</span>
          </Link>
        )
      })}
    </div>
  )
}
