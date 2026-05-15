import Cursor       from './components/Cursor'
import Navbar       from './components/Navbar'
import Hero         from './components/Hero'
import Marquee      from './components/Marquee'
import About        from './components/About'
import Projects     from './components/Projects'
import Services     from './components/Services'
import Testimonials from './components/Testimonials'
import MeetTeam     from './components/MeetTeam'
import Footer       from './components/Footer'

export default function App() {
  return (
    <>
      <Cursor />
      <main style={{ background: '#000' }}>
        <Navbar />
        <Hero />
        <Marquee />
        <About />
        <Projects />
        <Services />
        <Testimonials />
        <MeetTeam />
        <Footer />
      </main>
    </>
  )
}
