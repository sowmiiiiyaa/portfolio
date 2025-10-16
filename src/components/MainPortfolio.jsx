import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import profileImg from '../assets/profile.jpg'
import project1 from '../assets/project1.jpg'
import project2 from '../assets/project2.jpg'
import project3 from '../assets/project3.jpg'

const Section = ({ id, title, children }) => (
  <motion.section
    id={id}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.6 }}
    className="py-20"
  >
    <div className="container mx-auto px-6">
      <h2 className="text-2xl font-semibold mb-6">{title}</h2>
      {children}
    </div>
  </motion.section>
)

export default function MainPortfolio({ theme, onToggleTheme, onResetTheme, onGoToTerminal }) {
  const [activeTab, setActiveTab] = useState('about')
  const underlineRef = useRef(null)
  const aboutRef = useRef(null)
  const projectsRef = useRef(null)

  useEffect(() => {
    // position the neon cursor by setting left/top so the CSS translate(-50%, -50%) remains applied
    const moveCursor = (e) => {
      const c = document.getElementById('neon-cursor')
      if (c) {
        c.style.left = `${e.clientX}px`
        c.style.top = `${e.clientY}px`
      }
    }
    window.addEventListener('mousemove', moveCursor)
    return () => window.removeEventListener('mousemove', moveCursor)
  }, [])

  useEffect(() => {
    // position underline under active tab
    const target = activeTab === 'about' ? aboutRef.current : projectsRef.current
    const el = underlineRef.current
    if (target && el) {
      const r = target.getBoundingClientRect()
      const parentR = target.parentElement.getBoundingClientRect()
      el.style.width = `${r.width}px`
      el.style.left = `${r.left - parentR.left}px`
    }
  }, [activeTab])

  // Typing animation for hero title
  const heroRef = useRef(null)
  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const full = el.dataset.text || el.innerText
    el.innerText = ''
    let i = 0
    const t = setInterval(() => {
      el.innerText += full.charAt(i)
      i += 1
      if (i >= full.length) clearInterval(t)
    }, 45)
    return () => clearInterval(t)
  }, [])

  // Skill bars: animate fill when in view
  useEffect(() => {
    const items = Array.from(document.querySelectorAll('.skill-progress'))
    if (!items.length) return
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const el = e.target
          const pct = el.datasetProgress || el.getAttribute('data-progress') || el.dataset.progress
          // animate width
          requestAnimationFrame(() => {
            el.style.width = pct + '%'
          })
          obs.unobserve(el)
        }
      })
    }, { threshold: 0.4 })
    items.forEach(it => { it.style.width = '0%'; obs.observe(it) })
    return () => obs.disconnect()
  }, [])

  // Bokeh particles that respond to mouse movement
  useEffect(() => {
    const container = document.createElement('div')
    container.className = 'bokeh-container'
    document.body.appendChild(container)
    const particles = []
    const count = 10
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div')
      p.className = 'bokeh-particle'
      p.style.left = Math.random() * 100 + '%'
      p.style.top = Math.random() * 100 + '%'
      p.dataset.speed = (0.2 + Math.random() * 0.6).toString()
      container.appendChild(p)
      particles.push(p)
    }
    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    const onMove = (ev) => {
      mx = ev.clientX
      my = ev.clientY
      particles.forEach((p, idx) => {
        const rect = p.getBoundingClientRect()
        const dx = (rect.left + rect.width/2) - mx
        const dy = (rect.top + rect.height/2) - my
        const speed = Number(p.dataset.speed)
        p.style.transform = `translate(${ -dx * 0.02 * speed }px, ${ -dy * 0.02 * speed }px)`
      })
    }
    window.addEventListener('mousemove', onMove)
    return () => {
      window.removeEventListener('mousemove', onMove)
      container.remove()
    }
  }, [])

  return (
    <div className="min-h-screen editor-bg relative">
      <div className="neon-grid" />
    <div className="digital-lines" />
    <div className="stars" />
    {/* animated background layer */}
    <div className="animated-bg" aria-hidden />
      <div id="neon-cursor"><div className="trail" /></div>
  <header className="py-6 px-6 flex items-center justify-between relative" style={{ zIndex: 9999, pointerEvents: 'auto' }}>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden">
            <img src={profileImg} alt="Sowmiya" className="w-full h-full object-cover" />
          </div>
        </div>

        <nav className="flex items-center gap-6 relative">
          <div className="tabs flex items-center gap-6">
            <button
              ref={aboutRef}
              onClick={() => { setActiveTab('about'); window.location.hash = '#about' }}
              className={`text-sm font-mono-custom ${activeTab === 'about' ? 'text-white' : 'text-slate-400'}`}>
              About
            </button>
            <button
              ref={projectsRef}
              onClick={() => { setActiveTab('projects'); window.location.hash = '#projects' }}
              className={`text-sm font-mono-custom ${activeTab === 'projects' ? 'text-white' : 'text-slate-400'}`}>
              Projects
            </button>
            <div
              ref={underlineRef}
              className="absolute bottom-0 h-0.5 bg-cyan-400 rounded"
              style={{ left: 0, width: 0, transition: 'left 280ms ease, width 280ms ease' }}
            />
          </div>

          <div className="flex items-center gap-4">
            <a href="#contact" className="nav-link mr-4">Contact</a>
            <button
              onClick={onGoToTerminal}
              className="nav-link mr-4"
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', fontFamily: 'inherit', fontSize: 'inherit' }}
            >
              Terminal
            </button>
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="header-icon" aria-label="GitHub">GitHub</a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="header-icon" aria-label="LinkedIn">LinkedIn</a>
            <button
              className="header-icon theme-toggle-btn"
              onClick={onToggleTheme}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </div>
        </nav>
  </header>
      <main>
        <div className="hero flex items-center justify-between gap-8 px-4 lg:px-0">
          {/* Left: neon heading + subtitle */}
          <div className="hero-text max-w-3xl text-left">
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-7xl lg:text-8xl font-orbitron tracking-widest text-white leading-tight neon-title font-extrabold typing-caret"
              ref={heroRef}
              data-text="SOWMIYA S"
            >
              SOWMIYA S
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08 }}
              className="mt-3 text-lg lg:text-2xl font-nunito text-cyan-200 hero-subtitle"
            >
              Aspiring DevOps Engineer | Python Automation Beginner
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.12 }}
              className="mt-4 text-sm leading-8 text-slate-200"
            >
              <p>I'm currently learning to automate workflows and bridge development with operations using Python. Excited to grow my skills and explore new technologies in the DevOps world!</p>
            </motion.div>

            <div className="mt-4">
              <span className="text-sm text-teal-300 italic opacity-90 animate-pulse hero-tagline">Always learning. Always automating.</span>
            </div>
          </div>

          {/* Right: profile card */}
          <div className="photo-bar" aria-hidden>
              <div className="photo-bar-inner profile-card">
                <img src={profileImg} alt="Sowmiya" />
              </div>
          </div>
        </div>

        <Section id="about" title={"About Me"}>
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="about-wrap max-w-4xl mx-auto"
            >
              <div className={`about-card p-6 rounded-lg ${theme === 'dark' ? 'card-dark' : 'card-pastel'}`}>
                <motion.h3
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.05 }}
                  className={`text-2xl font-extrabold mb-4 ${theme === 'dark' ? 'neon-heading' : ''}`}
                >About Me</motion.h3>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="text-sm leading-8 text-slate-200"
                >
                  <p>Hey there! I’m Sowmiy S, a developer who loves bringing automation to life with Python.</p>
                  <p className="mt-3">In a world that never stops evolving, I find my spark in writing code that makes systems faster, smarter, and smoother.</p>
                  <p className="mt-3">I’m currently exploring DevOps tools and cloud technologies — because I believe automation isn’t just about saving time, it’s about unlocking creativity and innovation.</p>
                  <p className="mt-3">Whether it’s a script that simplifies a complex task or a system that deploys itself, I love creating things that just work — beautifully.</p>

                  <div className="mt-6">
                    <a href="#" className={`inline-block px-4 py-2 rounded ${theme === 'dark' ? 'resume-btn-neon' : 'resume-btn-pastel'}`} download>Download Resume</a>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </Section>

  <Section id="projects" title={<span className="font-mono-custom">Projects</span>}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {([project1, project2, project3]).map((p, idx) => (
              <article key={idx} className="p-4 card-dark rounded-lg project-card relative overflow-hidden">
                <div className="h-40 bg-gray-800 rounded mb-3 overflow-hidden">
                  <img src={p} alt={`project ${idx + 1}`} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-semibold text-slate-100">Project {idx + 1}</h3>
                <p className="text-sm text-slate-300">Short description about the project, tech used, and the outcome.</p>
                <div className="project-overlay absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 pointer-events-none transition-all duration-300">
                  <div className="flex gap-3">
                    <button className="btn-accent-pink px-4 py-2 rounded">View</button>
                    <button className="btn-accent-blue px-4 py-2 rounded">Demo</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Section>

        <Section id="skills" title={<span className="skills-heading">Skills</span>}>
          <div className="skills-section grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="skill-label font-medium mb-2">Python</h4>
              <div className="skill-bar-bg w-full rounded h-4 overflow-hidden mb-4">
                <div className="skill-progress h-4 bg-gradient-to-r from-green-400 to-cyan-400" data-progress="90" data-tip="Python — 90%" />
              </div>
              <h4 className="skill-label font-medium mb-2">Docker & Kubernetes</h4>
              <div className="skill-bar-bg w-full rounded h-4 overflow-hidden mb-4">
                <div className="skill-progress h-4 bg-gradient-to-r from-purple-400 to-pink-400" data-progress="75" data-tip="Docker & K8s — 75%" />
              </div>
            </div>

            <div>
              <h4 className="skill-label font-medium mb-2">CI/CD (GitHub Actions, Jenkins)</h4>
              <div className="skill-bar-bg w-full rounded h-4 overflow-hidden mb-4">
                <div className="skill-progress h-4 bg-gradient-to-r from-yellow-400 to-red-400" data-progress="80" data-tip="CI/CD — 80%" />
              </div>
              <h4 className="skill-label font-medium mb-2">Infrastructure as Code</h4>
              <div className="skill-bar-bg w-full rounded h-4 overflow-hidden mb-4">
                <div className="skill-progress h-4 bg-gradient-to-r from-indigo-400 to-blue-400" data-progress="60" data-tip="IaC — 60%" />
              </div>
            </div>
          </div>
        </Section>

        <Section id="contact" title="Contact">
          <div className="max-w-xl">
            <div className="flex flex-col gap-3">
              <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="social">GitHub</a>
              <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="social">LinkedIn</a>
            </div>
          </div>
        </Section>
      </main>
    </div>
  )
}
