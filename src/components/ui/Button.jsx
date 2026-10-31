import { motion } from 'motion/react'

const VARIANTS = {
  primary: 'bg-saffron text-ink hover:bg-saffron-2 shadow-[0_10px_30px_-12px_rgb(242_163_58/0.7)]',
  whatsapp: 'bg-whatsapp text-ink hover:brightness-105 shadow-[0_10px_30px_-12px_rgb(37_211_102/0.6)]',
  dark: 'bg-ink text-paper hover:bg-night-2',
  'outline-light': 'border border-paper/25 text-paper hover:bg-paper/10 hover:border-paper/45',
  'outline-dark': 'border border-ink/15 text-ink hover:bg-ink/5 hover:border-ink/30',
}

const SIZES = {
  md: 'h-12 px-5 text-[15px] gap-2.5',
  lg: 'h-14 px-6 text-base gap-3',
  sm: 'h-10 px-4 text-sm gap-2',
}

/**
 * Renders <a> when `href` is given (external links open safely in a new tab), otherwise <button>.
 */
export default function Button({
  href,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  trailingIcon: TrailingIcon,
  className = '',
  children,
  ...props
}) {
  const external = href?.startsWith('http')
  const Tag = href ? motion.a : motion.button
  const linkProps = href
    ? { href, ...(external && { target: '_blank', rel: 'noopener noreferrer' }) }
    : { type: props.type ?? 'button' }

  return (
    <Tag
      {...linkProps}
      {...props}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 420, damping: 26 }}
      className={`group relative inline-flex shrink-0 items-center justify-center rounded-full font-semibold whitespace-nowrap transition-[background-color,border-color,filter] duration-200 [font-stretch:105%] disabled:pointer-events-none disabled:opacity-60 ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
    >
      {Icon && <Icon className="size-[1.15em] shrink-0" aria-hidden="true" />}
      <span>{children}</span>
      {TrailingIcon && (
        <TrailingIcon
          className="size-[1.05em] shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-px"
          aria-hidden="true"
        />
      )}
    </Tag>
  )
}
