import { MotionConfig } from 'framer-motion'

import { About } from './components/About'
import { Awards } from './components/Awards'
import { Contact } from './components/Contact'
import { Experience } from './components/Experience'
import { Hero } from './components/Hero'
import { Nav } from './components/Nav'
import { OpenSource } from './components/OpenSource'
import { Projects } from './components/Projects'
import { Research } from './components/Research'
import { Stack } from './components/Stack'

export default function App() {
  return (
    // reducedMotion="user" drops transform animation for anyone who asked the OS
    // for less motion, while still fading content in so nothing stays invisible.
    <MotionConfig reducedMotion="user">
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <OpenSource />
        <Research />
        <Stack />
        <Awards />
      </main>
      <Contact />
    </MotionConfig>
  )
}
