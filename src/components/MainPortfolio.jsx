import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import profileImg from '../../pfp/1000106259 (1).png'
import project1 from '../assets/project1.jpg'
import project2 from '../assets/project2.jpg'
import project3 from '../assets/project3.jpg'
import SkillGalaxy from './SkillGalaxy'
import ConstellationBackground from './ConstellationBackground'

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
      {title ? <h2 className="text-2xl font-semibold mb-6">{title}</h2> : null}
      {children}
    </div>
  </motion.section>
)

export default function MainPortfolio({ theme, onToggleTheme, onResetTheme, onGoToTerminal }) {
  const [activeTab, setActiveTab] = useState('about')
  const [resumeMsgVisible, setResumeMsgVisible] = useState(false)
  // state for undeployed project demo popups
  const [demoPopup, setDemoPopup] = useState({ visible: false, id: null, rect: null })
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
    // Preserve visible spaces reliably by using non-breaking spaces when typing
    const raw = el.dataset.text || el.innerText
    const full = raw.replace(/ /g, '\u00A0')
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

  useEffect(() => {
    const onDoc = (e) => {
      // if click outside popup, close it
      if (!demoPopup.visible) return
      const p = document.getElementById('project-demo-popup')
      if (p && !p.contains(e.target)) setDemoPopup({ visible: false, id: null, rect: null })
    }
    document.addEventListener('pointerdown', onDoc)
    return () => document.removeEventListener('pointerdown', onDoc)
  }, [demoPopup.visible])

  const showDemoPopup = (id, anchorEl) => {
    if (!anchorEl) return
    const r = anchorEl.getBoundingClientRect()
    setDemoPopup({ visible: true, id, rect: r })
    // auto-close after 4 seconds
    window.setTimeout(() => setDemoPopup({ visible: false, id: null, rect: null }), 4000)
  }

  return (
    <div className="min-h-screen editor-bg relative">
      {/* Constellation background (theme-aware) */}
      <ConstellationBackground theme={theme === 'dark' ? 'dark' : 'light'} id="constellation-portfolio" />
      <div className="neon-grid" />
    <div className="digital-lines" />
    <div className="stars" />
    {/* animated background layer */}
    <div className="animated-bg" aria-hidden />
      <div id="neon-cursor"><div className="trail" /></div>
  <header className="py-6 px-6 flex items-center justify-end relative" style={{ zIndex: 9999, pointerEvents: 'auto' }}>
            {/* top-left site title (branding) */}
            <div className="site-title" aria-hidden="false">Sowmiya's Portfolio</div>
            {/* header avatar removed per user request (we'll show a friendlier profile in the About section) */}

        <nav className="flex items-center gap-6 relative">
          <div className="tabs flex items-center gap-6">
            <button
              ref={aboutRef}
              onClick={() => { setActiveTab('about'); window.location.hash = '#about' }}
              className={`nav-tab text-sm font-mono-custom ${activeTab === 'about' ? 'text-white' : 'text-slate-400'}`}>
              About
            </button>
            <button
              ref={projectsRef}
              onClick={() => { setActiveTab('projects'); window.location.hash = '#projects' }}
              className={`nav-tab text-sm font-mono-custom ${activeTab === 'projects' ? 'text-white' : 'text-slate-400'}`}>
              Projects
            </button>
            <button
              onClick={() => { setActiveTab('skills'); window.location.hash = '#skills' }}
              className={`nav-tab text-sm font-mono-custom ${activeTab === 'skills' ? 'text-white' : 'text-slate-400'}`}>
              Skills & Tools
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
            <a href="https://www.linkedin.com/in/sowmiya-s-241486346/" target="_blank" rel="noopener noreferrer" className="header-icon" aria-label="LinkedIn">LinkedIn</a>
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
        {theme === 'dark' ? (
          <div className="container mx-auto px-6 hero-container-dark">
            <div className="hero flex items-center justify-between gap-8 lg:px-0">
              {/* Left: neon heading + subtitle */}
              <div className="about-wrap max-w-4xl mx-auto">
                <div className="hero-text max-w-full text-left">
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
              </div>

              {/* Right: profile card removed per user request */}
            </div>
          </div>
        ) : (
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

            {/* Right: profile card removed per user request */}
          </div>
        )}

  <Section id="about" title={null}>
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
                  {/* New profile greeting: avatar + friendly line */}
                  <div className="profile-greeting card-profile-greeting" role="region" aria-label="Profile greeting">
                    <div className="profile-avatar-wrap" aria-hidden>
                      <img src={profileImg} alt="Profile photo of Sowmiya S" className="profile-avatar" />
                    </div>
                    <div className="greeting-text">
                      <p className="greeting-line">Hey, I’m Sowmiya—passionate about DevOps, web design, and creative automation!</p>
                      <p className="greeting-sub">Aspiring DevOps Engineer | Python Automation Beginner</p>
                    </div>
                  </div>

                  <p className="sr-only">Main About text follows</p>
                  <p>Hey there! I’m Sowmiy S, a developer who loves bringing automation to life with Python.</p>
                  <p className="mt-3">In a world that never stops evolving, I find my spark in writing code that makes systems faster, smarter, and smoother.</p>
                  <p className="mt-3">I’m currently exploring DevOps tools and cloud technologies — because I believe automation isn’t just about saving time, it’s about unlocking creativity and innovation.</p>
                  <p className="mt-3">Whether it’s a script that simplifies a complex task or a system that deploys itself, I love creating things that just work — beautifully.</p>

                  <div className="mt-6" style={{ position: 'relative' }}>
                    <a
                      href="#"
                      className={`inline-block px-4 py-2 rounded ${theme === 'dark' ? 'resume-btn-neon' : 'resume-btn-pastel'}`}
                      onClick={(e) => {
                        e.preventDefault()
                        // show message for 2.5s
                        setResumeMsgVisible(true)
                        window.setTimeout(() => setResumeMsgVisible(false), 2500)
                      }}
                      download
                    >
                      Download Resume
                    </a>

                    {/* ephemeral resume message, centered beneath the button */}
                    <div
                      aria-hidden={!resumeMsgVisible}
                      className={`resume-msg ${resumeMsgVisible ? 'visible' : ''} ${theme === 'dark' ? 'resume-msg-dark' : 'resume-msg-light'}`}
                    >
                      Resume will be available soon.
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </Section>

        <Section id="projects" title={<span className="font-mono-custom">Projects</span>}>
          <div className="grid md:grid-cols-2 gap-6">
            <article className={`p-4 rounded-lg project-card relative overflow-hidden ${theme === 'dark' ? 'card-dark' : 'card-pastel'}`}>
              <div className="project-icon-wrap mb-3 flex items-center justify-center">
                {/* Timer SVG icon for Focus Timer */}
                <svg className={`project-icon ${theme === 'dark' ? 'icon-dark' : 'icon-light'}`} width="68" height="68" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" fill="none" />
                  <path d="M12 8v4l2 1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M9 3h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className={`font-semibold text-center ${theme === 'dark' ? 'text-slate-100' : 'text-slate-900'}`}>Focus Timer</h3>
              <p className={`text-sm text-center ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>A web-based productivity tool that helps users stay focused by tracking work sessions and breaks. Built using React and styled-components, it features a sleek timer display, session history, and motivational UI.</p>
              <div className="mt-4 text-center">
                <button
                  className={`view-demo-btn ${theme === 'dark' ? 'btn-dark' : 'btn-pastel'}`}
                  onClick={(e) => { e.stopPropagation(); showDemoPopup('focus-timer', e.currentTarget) }}
                >View Demo</button>
              </div>
            </article>

            <article className={`p-4 rounded-lg project-card relative overflow-hidden ${theme === 'dark' ? 'card-dark' : 'card-pastel'}`}>
              <div className="project-icon-wrap mb-3 flex items-center justify-center">
                {/* Monitor SVG icon for System Monitoring */}
                <svg className={`project-icon ${theme === 'dark' ? 'icon-dark' : 'icon-light'}`} width="68" height="68" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <rect x="3" y="4" width="18" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.6" fill="none" />
                  <path d="M8 20h8M12 16v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className={`font-semibold text-center ${theme === 'dark' ? 'text-slate-100' : 'text-slate-900'}`}>System Monitoring</h3>
              <p className={`text-sm text-center ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>A desktop utility for real-time system performance tracking, developed with Python and Tkinter. Shows live CPU and memory usage, alerts for resource spikes, and a simple dashboard for quick analysis.</p>
              <div className="mt-4 text-center">
                <button
                  className={`view-demo-btn ${theme === 'dark' ? 'btn-dark' : 'btn-pastel'}`}
                  onClick={(e) => { e.stopPropagation(); showDemoPopup('system-monitoring', e.currentTarget) }}
                >View Demo</button>
              </div>
            </article>
          </div>
        </Section>

  <Section id="skills" title={<span className="skills-heading">Skills & Tools</span>}>
          <div className="container mx-auto px-6">
            <SkillGalaxy theme={theme} />
          </div>
        </Section>

        <Section id="contact" title="Contact">
          <div className="max-w-xl">
            <div className="contact-card card-shadow p-4 rounded-lg">
              <div className="contact-list" role="list">
                <a role="listitem" href="https://github.com/" target="_blank" rel="noopener noreferrer" className="contact-item" aria-label="GitHub profile">
                  {/* GitHub icon (simple) */}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden focusable="false"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.16 6.84 9.49.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1.01.07 1.54 1.04 1.54 1.04.9 1.54 2.36 1.09 2.94.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.26-.45-1.28.1-2.67 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.8c.85.004 1.71.115 2.51.34 1.9-1.29 2.74-1.02 2.74-1.02.55 1.39.2 2.41.1 2.67.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .27.18.58.69.48A10.01 10.01 0 0022 12c0-5.52-4.48-10-10-10z" fill="currentColor"/></svg>
                  <span className="contact-label">GitHub</span>
                </a>

                <a role="listitem" href="https://www.linkedin.com/in/sowmiya-s-241486346/" target="_blank" rel="noopener noreferrer" className="contact-item" aria-label="LinkedIn profile">
                  {/* LinkedIn icon (simple) */}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden focusable="false"><path d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v14H0zM8 8h4.8v2h.1c.7-1.3 2.4-2.7 4.9-2.7C22.2 7.3 24 9.4 24 13v9h-5v-8.2c0-2-1.8-2.3-2.3-2.3-1.2 0-2 0.8-2.3 1.6-.1.2-.1.5-.1.8V22H8V8z" fill="currentColor"/></svg>
                  <span className="contact-label">LinkedIn</span>
                </a>

                <a role="listitem" href="mailto:sowmiyaa757@gmail.com" className="contact-item contact-email" aria-label="Send email to Sowmiya" title="sowmiyaa757@gmail.com">
                  {/* Envelope icon */}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden focusable="false"><path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="currentColor"/></svg>
                  <span className="contact-label">sowmiyaa757 [at] gmail [dot] com</span>
                </a>
              </div>

              <div className="contact-footer mt-3 text-sm text-muted">Feel free to reach out for collaborations or portfolio feedback!</div>
            </div>
          </div>
        </Section>
      </main>
      {/* Project demo popup (undeployed projects) */}
      {demoPopup.visible && demoPopup.rect && (
        <div
          id="project-demo-popup"
          className={`project-demo-popup ${theme === 'dark' ? 'dark' : 'pastel'} show`}
          style={{
            left: Math.min(Math.max(demoPopup.rect.left + demoPopup.rect.width / 2 - 160, 8), window.innerWidth - 328),
            top: Math.max(demoPopup.rect.top - 12 - 72, 12)
          }}
        >
          <div className="demo-loader" aria-hidden>
            <div className="bar" />
          </div>
          <div className="demo-text">
            This project is still in progress and will be uploaded or deployed soon. Please check back later!
          </div>
        </div>
      )}

      {/* Floating terminal quick-access button (theme-aware styling applied via CSS) */}
      <button
        className={`floating-terminal-btn ${theme === 'dark' ? 'ft-dark' : 'ft-pastel'}`}
        aria-label="Open Terminal"
        onClick={onGoToTerminal}
        title="Open Terminal"
      >
        <span className="ft-label">Terminal</span>
      </button>
    </div>
  )
}
