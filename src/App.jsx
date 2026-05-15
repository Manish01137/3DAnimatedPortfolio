import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Cursor   from './components/Cursor'
import Navbar   from './components/Navbar'
import Home     from './pages/Home'
import WorkPage from './pages/WorkPage'
import ProjectDetail from './pages/ProjectDetail'

export default function App() {
  const location = useLocation()

  return (
    <>
      <Cursor />
      <main style={{ background: '#000' }}>
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/"            element={<Home />} />
            <Route path="/work"        element={<WorkPage />} />
            <Route path="/work/:slug"  element={<ProjectDetail />} />
            <Route path="*"            element={<Home />} />
          </Routes>
        </AnimatePresence>
      </main>
    </>
  )
}
