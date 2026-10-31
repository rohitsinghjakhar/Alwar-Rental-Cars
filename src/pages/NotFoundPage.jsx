import { ArrowLeft } from 'lucide-react'
import CarIllustration from '../components/ui/CarIllustration.jsx'
import { Link } from '../router/Router.jsx'
import { DICTIONARIES } from '../i18n/index.jsx'

/** One static 404 file serves every unknown URL, so it is bilingual. */
export default function NotFoundPage() {
  const { en, hi } = DICTIONARIES
  return (
    <section className="grain relative isolate flex min-h-[80vh] items-center overflow-hidden bg-night pt-32 pb-24 text-paper">
      <div className="container-x text-center">
        <p className="font-display text-[7rem] leading-none text-saffron sm:text-[10rem]">404</p>
        <h1 className="font-display mt-6 text-4xl sm:text-5xl">{en.pages.notFound.title}</h1>
        <p lang="hi" className="mt-3 text-2xl font-bold text-paper/80">
          {hi.pages.notFound.title}
        </p>
        <p className="mx-auto mt-6 max-w-md text-paper/70">{en.pages.notFound.text}</p>
        <p lang="hi" className="mx-auto mt-1 max-w-md text-paper/60">
          {hi.pages.notFound.text}
        </p>
        <div className="mx-auto mt-10 w-full max-w-sm">
          <CarIllustration shape="offroad" color="#B39770" />
        </div>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-saffron px-6 font-semibold text-ink">
            <ArrowLeft className="size-4" aria-hidden="true" /> {en.pages.notFound.home}
          </Link>
          <Link to="/hi/" lang="hi" className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-paper/25 px-6 font-semibold">
            {hi.pages.notFound.home}
          </Link>
        </div>
      </div>
    </section>
  )
}
