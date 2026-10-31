import { ChevronRight } from 'lucide-react'
import { Link, useRouter } from '../../router/Router.jsx'
import { useI18n } from '../../i18n/index.jsx'
import { breadcrumbsFor } from '../../seo/meta.js'

export default function Breadcrumbs({ tone = 'light' }) {
  const { route } = useRouter()
  const { t } = useI18n()
  const items = breadcrumbsFor(route)
  const muted = tone === 'light' ? 'text-paper/55 hover:text-paper' : 'text-stone hover:text-ink'
  return (
    <nav aria-label={t.nav.breadcrumb}>
      <ol className="flex flex-wrap items-center gap-1.5 text-[13.5px]">
        {items.map((item, i) => {
          const last = i === items.length - 1
          return (
            <li key={item.path} className="flex items-center gap-1.5">
              {last ? (
                <span aria-current="page" className={tone === 'light' ? 'text-paper' : 'text-ink'}>
                  {item.name}
                </span>
              ) : (
                <>
                  <Link to={item.path} className={`transition-colors ${muted}`}>
                    {item.name}
                  </Link>
                  <ChevronRight className={`size-3.5 ${tone === 'light' ? 'text-paper/35' : 'text-stone/60'}`} aria-hidden="true" />
                </>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
