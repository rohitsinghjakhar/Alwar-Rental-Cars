import { useI18n } from '../../i18n/index.jsx'

function Row({ items, hidden }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((item) => (
        <li key={item} className="flex items-center">
          <span className="px-6 text-[15px] font-semibold tracking-[0.08em] whitespace-nowrap uppercase [font-stretch:115%] sm:text-base">{item}</span>
          <span className="size-2 rotate-45 bg-ink" aria-hidden="true" />
        </li>
      ))}
    </ul>
  )
}

export default function Marquee() {
  const { t } = useI18n()
  return (
    <div className="group relative overflow-hidden bg-saffron py-4 text-ink" role="region" aria-label={t.marqueeLabel} tabIndex={0}>
      <div className="marquee-track flex w-max animate-marquee group-hover:[animation-play-state:paused] group-focus-visible:[animation-play-state:paused]">
        <Row items={t.marquee} />
        <Row items={t.marquee} hidden />
      </div>
    </div>
  )
}
