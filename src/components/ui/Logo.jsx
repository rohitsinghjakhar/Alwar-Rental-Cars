/** Brand mark: a road vanishing to the horizon, which also reads as an "A" for Alwar. */
export function LogoMark({ className = 'size-10' }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <rect width="40" height="40" rx="11" fill="var(--color-saffron)" />
      <path d="M8.5 33 L17.6 7.5 h4.8 L31.5 33 Z" fill="var(--color-ink)" />
      <path d="M13.2 24.5 h13.6" stroke="var(--color-saffron)" strokeWidth="1.6" />
      <g fill="var(--color-saffron)">
        <rect x="19.1" y="27.5" width="1.8" height="4" rx=".4" />
        <rect x="19.3" y="19.5" width="1.4" height="2.8" rx=".4" />
        <rect x="19.45" y="13.5" width="1.1" height="2" rx=".3" />
        <rect x="19.6" y="9.4" width=".8" height="1.3" rx=".2" />
      </g>
    </svg>
  )
}

export default function Logo({ tone = 'light', className = '' }) {
  const text = tone === 'light' ? 'text-paper' : 'text-ink'
  return (
    <span lang="en" className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className="size-10 shrink-0" />
      <span className={`flex flex-col leading-none ${text}`}>
        <span className="text-[19px] font-extrabold tracking-tight [font-stretch:120%]">Alwar</span>
        <span className="mt-1 text-[9.5px] font-semibold tracking-[0.24em] whitespace-nowrap uppercase opacity-70 [font-stretch:110%]">
          Rental Cars
        </span>
      </span>
    </span>
  )
}
