import Cursor       from './components/Cursor'
import Navbar       from './components/Navbar'
import Hero         from './components/Hero'
import Marquee      from './components/Marquee'
import Projects     from './components/Projects'
import Services     from './components/Services'
import Clients      from './components/Clients'
import Testimonials from './components/Testimonials'
import Footer       from './components/Footer'

export default function App() {
  return (
    <>
      <Cursor />
      <main style={{ background: '#000' }}>
        <Navbar />
        <Hero />
        <Marquee />
        <Projects />
        <Services />
        <Clients />
        <Testimonials />
        <Footer />
      </main>
    </>
  )
}
