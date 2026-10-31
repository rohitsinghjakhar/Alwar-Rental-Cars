import { PHOTOS, PHOTO_WIDTHS, photoSrc } from '../../content/photos.js'
import { useI18n } from '../../i18n/index.jsx'
import { Link } from '../../router/Router.jsx'

/** Responsive AVIF/WebP photo with intrinsic size (no layout shift). */
export default function Photo({ id, alt, sizes = '(min-width: 1024px) 33vw, 100vw', priority = false, className = '', imgClassName = '' }) {
  const srcSet = (ext) => PHOTO_WIDTHS.map((w) => `${photoSrc(id, w, ext)} ${w}w`).join(', ')
  return (
    <picture className={className}>
      <source type="image/avif" srcSet={srcSet('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet('webp')} sizes={sizes} />
      <img
        src={photoSrc(id, 1024, 'webp')}
        alt={alt}
        width={1024}
        height={683}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        decoding="async"
        className={imgClassName}
      />
    </picture>
  )
}

export function PhotoCredit({ id, className = '' }) {
  const { t, href } = useI18n()
  const photo = PHOTOS[id]
  return (
    <p className={`text-[12px] text-stone ${className}`}>
      <Link to={href('credits')} className="underline decoration-dune underline-offset-2 hover:text-ink">
        {t.common.photoBy(photo.author, photo.license)}
      </Link>
    </p>
  )
}
