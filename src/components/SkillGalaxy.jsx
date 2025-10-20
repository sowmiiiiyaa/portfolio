import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import '../styles/skill-galaxy.css'

// Final requested skills and order
// All skills set to equal sizing and marked as learning
const skillsData = [
  { id: 'html', label: 'HTML', desc: 'Working on semantic markup and accessibility.', learning: false },
  { id: 'css', label: 'CSS', desc: 'Practicing responsive layouts and basic animations.', learning: false },
  { id: 'git', label: 'Git & GitHub', desc: 'Learning branching, merging and PR workflows.', learning: false },
  { id: 'python', label: 'Python', desc: 'Building automation scripts and learning DevOps workflows.', learning: false, extra: 'Focus: small automation tools and pipelines.' },
  { id: 'docker', label: 'Docker', desc: 'Learning container basics and Dockerfiles.', learning: true, extra: 'Goal: build, run and publish a small containerized app.' },
  { id: 'linux', label: 'Linux', desc: 'Learning CLI, permissions, and basic administration.', learning: true, extra: 'Fun: practicing with a small VM and shell scripts.' },
]

function randomBetween(min, max) { return Math.random() * (max - min) + min }

export default function SkillGalaxy({ theme = 'dark' }) {
  const containerRef = useRef(null)
  // no active/hovered state: badges should not open popups or show extra info
  const [unused, setUnused] = useState(null)
  const [orbs, setOrbs] = useState([])

  useEffect(() => {
    // layout orbs in a centered row / compact grid depending on width
    const compute = () => {
      const w = containerRef.current?.clientWidth || 800
      const h = containerRef.current?.clientHeight || 260
      const centerY = h / 2
      const gap = Math.min(28, Math.max(12, Math.floor(w / 80)))
      const orbSize = Math.min(88, Math.max(54, Math.floor(w / 8)))
      const totalWidth = skillsData.length * orbSize + (skillsData.length - 1) * gap
      const startX = Math.max(orbSize / 2 + 12, (w - totalWidth) / 2 + orbSize / 2)
      const generated = skillsData.map((s, i) => {
        const x = startX + i * (orbSize + gap)
        const y = centerY
        return { ...s, x, y, size: orbSize }
      })
      setOrbs(generated)
    }
    compute()
    const onR = () => compute()
    window.addEventListener('resize', onR)
    return () => window.removeEventListener('resize', onR)
  }, [])

  // No global click handlers required — popups removed per design

  return (
    <div ref={containerRef} className={`skill-galaxy ${theme === 'dark' ? 'theme-dark' : 'theme-light'}`} role="region" aria-label="Skill Galaxy">
      <svg className="constellation" viewBox="0 0 1000 500" preserveAspectRatio="none" aria-hidden>
        {/* map some lines between related skills */}
        {orbs.length > 1 && (
          <g stroke={theme === 'dark' ? 'rgba(180,220,255,0.25)' : 'rgba(120,120,140,0.12)'} strokeWidth="1">
            {/* Python <-> CI/CD */}
            <line x1={orbs[0].x} y1={orbs[0].y} x2={orbs[3]?.x} y2={orbs[3]?.y} />
            {/* Docker <-> Kubernetes */}
            <line x1={orbs[1].x} y1={orbs[1].y} x2={orbs[2]?.x} y2={orbs[2]?.y} />
            {/* Kubernetes <-> IaC */}
            <line x1={orbs[2].x} y1={orbs[2].y} x2={orbs[4]?.x} y2={orbs[4]?.y} />
          </g>
        )}
      </svg>

  <div className="orbs-wrap">
        {orbs.map((o) => (
          <motion.button
            key={o.id}
            className={`orb orb-${o.id}`}
            style={{ left: `${o.x}px`, top: `${o.y}px`, width: o.size, height: o.size, minWidth: o.size }}
            initial={{ scale: 0.96, opacity: 0.98 }}
            whileHover={{ y: -8, scale: 1.06 }}
            whileTap={{ y: -4, scale: 1.02 }}
            // keep interactions purely visual; do not modify component state or open popups
            type="button"
          >
            <span className="orb-core" />
            <span className="orb-label">{o.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
