import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero         from '../components/Hero'
import Marquee      from '../components/Marquee'
import About        from '../components/About'
import Education     from '../components/Education'
import WorkExperience from '../components/WorkExperience'
import Skills        from '../components/Skills'
import Projects     from '../components/Projects'
import Services     from '../components/Services'
import Testimonials from '../components/Testimonials'
import MeetTeam     from '../components/MeetTeam'
import Footer       from '../components/Footer'

export default function Home() {
  const { hash } = useLocation()

  // When arriving with a #hash (e.g. coming back from /work), scroll to it
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 80)
    } else {
      window.scrollTo(0, 0)
    }
  }, [hash])

  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <Education />
      <WorkExperience />
      <Skills />
      <Projects />
      <Services />
      <Testimonials />
      <MeetTeam />
      <Footer />
    </>
  )
}
