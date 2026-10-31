import { useEffect } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'motion/react'
import Lenis from 'lenis'
import Navbar from './components/layout/Navbar.jsx'
import Footer from './components/layout/Footer.jsx'
import { FloatingWhatsApp, MobileActionBar, ScrollProgress } from './components/layout/FloatingActions.jsx'
import HeadManager from './seo/Head.jsx'
import { RouterProvider, useRouter } from './router/Router.jsx'
import { I18nProvider, useI18n } from './i18n/index.jsx'
import { jumpTo, scrollToId, setLenis } from './lib/scroll.js'
import { EASE } from './lib/motion.js'
import HomePage from './pages/HomePage.jsx'
import CarsPage from './pages/CarsPage.jsx'
import CarPage from './pages/CarPage.jsx'
import ServicesPage from './pages/ServicesPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import HowPage from './pages/HowPage.jsx'
import DocumentsPage from './pages/DocumentsPage.jsx'
import TripsPage from './pages/TripsPage.jsx'
import TripPage from './pages/TripPage.jsx'
import FaqPage from './pages/FaqPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import LegalPage from './pages/LegalPage.jsx'
import CreditsPage from './pages/CreditsPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ autoRaf: true, duration: 1.15, anchors: true })
    setLenis(lenis)
    return () => {
      lenis.destroy()
      setLenis(null)
    }
  }, [])
}

function PageView({ route }) {
  switch (route.page) {
    case 'home':
      return <HomePage />
    case 'cars':
      return <CarsPage />
    case 'car':
      return <CarPage slug={route.param} />
    case 'services':
      return <ServicesPage />
    case 'about':
      return <AboutPage />
    case 'how':
      return <HowPage />
    case 'documents':
      return <DocumentsPage />
    case 'trips':
      return <TripsPage />
    case 'trip':
      return <TripPage slug={route.param} />
    case 'faq':
      return <FaqPage />
    case 'contact':
      return <ContactPage />
    case 'privacy':
    case 'terms':
      return <LegalPage page={route.page} />
    case 'credits':
      return <CreditsPage />
    default:
      return <NotFoundPage />
  }
}

/** Runs once each page mounts: restore / reset scroll, or jump to a #section. */
function useScrollOnEnter() {
  const { takePendingScroll } = useRouter()
  useEffect(() => {
    const apply = () => {
      const target = takePendingScroll()
      if (!target) return
      if (target.hash) requestAnimationFrame(() => scrollToId(target.hash))
      else jumpTo(target.y)
    }
    apply()
    window.addEventListener('router:samepage', apply)
    return () => window.removeEventListener('router:samepage', apply)
  }, [takePendingScroll])
}

function Page({ route }) {
  useScrollOnEnter()
  return <PageView route={route} />
}

function Shell() {
  const { route } = useRouter()
  const { t } = useI18n()
  useSmoothScroll()

  return (
    <MotionConfig reducedMotion="user">
      <HeadManager route={route} />
      <a href="#main" className="fixed top-3 left-3 z-[70] -translate-y-24 rounded-full bg-saffron px-5 py-3 font-semibold text-ink transition-transform focus:translate-y-0">
        {t.nav.skip}
      </a>
      <ScrollProgress />
      <Navbar />
      <main id="main">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={route.path}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.22, ease: 'easeIn' } }}
          >
            <Page route={route} />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <FloatingWhatsApp />
      <MobileActionBar />
    </MotionConfig>
  )
}

function LanguageScope() {
  const { route } = useRouter()
  return (
    <I18nProvider lang={route.lang}>
      <Shell />
    </I18nProvider>
  )
}

export default function App({ path }) {
  return (
    <RouterProvider initialPath={path}>
      <LanguageScope />
    </RouterProvider>
  )
}
