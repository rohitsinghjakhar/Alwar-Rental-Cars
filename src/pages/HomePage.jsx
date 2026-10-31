import Hero from '../components/sections/Hero.jsx'
import Marquee from '../components/sections/Marquee.jsx'
import Glance from '../components/sections/Glance.jsx'
import Fleet from '../components/sections/Fleet.jsx'
import WhyUs from '../components/sections/WhyUs.jsx'
import Audience from '../components/sections/Audience.jsx'
import HowItWorks from '../components/sections/HowItWorks.jsx'
import Documents from '../components/sections/Documents.jsx'
import RoadTrips from '../components/sections/RoadTrips.jsx'
import Faq from '../components/sections/Faq.jsx'
import Contact from '../components/sections/Contact.jsx'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Glance />
      <Fleet />
      <WhyUs index="03" />
      <Audience index="04" />
      <HowItWorks index="05" />
      <Documents index="06" />
      <RoadTrips index="07" />
      <Faq index="08" />
      <Contact index="09" />
    </>
  )
}
