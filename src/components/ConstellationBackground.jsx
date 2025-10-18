import React, { useRef, useEffect } from 'react'

// Constellation background: drifting glowing dots and connecting lines.
// Theme-aware colors and subtle opacities per user request.
export default function ConstellationBackground({ theme = 'dark', id }) {
  const ref = useRef(null)
  const raf = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const parent = canvas.parentElement || document.body
    const ctx = canvas.getContext('2d')
    let width = parent.clientWidth
    let height = parent.clientHeight
    const dpr = Math.max(window.devicePixelRatio || 1, 1)

    function resize() {
      width = parent.clientWidth
      height = parent.clientHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    window.addEventListener('resize', resize)

    // Theme palettes and opacities
    const dark = {
      bg: '#14141a',
      dot: '#16e6f5', // primary cyan
      dotAlt: '#5df6b0',
      dotAlpha: 0.4,
      lineAlpha: 0.2
    }
    const light = {
      bg: '#f3e9f9',
      // slightly stronger pastels for contrast on light background
      dot: '#9a7ad1',
      dotAlt: '#bfa8ee',
      // bumped up so pale dots/lines remain visible on light backgrounds
      dotAlpha: 0.34,
      lineAlpha: 0.32
    }

    const pal = theme === 'dark' ? dark : light

    // Particle config
    const baseCount = Math.round((width * height) / 60000) // scales with viewport
  // boost light-theme density and allow a higher cap to help visibility on pale backgrounds
  const count = Math.max(18, Math.min(180, Math.floor(baseCount * (theme === 'dark' ? 1.0 : 1.0))))
    const particles = []
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
  r: (theme === 'dark' ? 1.1 + Math.random() * 1.6 : 2.8 + Math.random() * 4.0),
        hueMix: Math.random() > 0.86
      })
    }

    // Line connection distance (squared threshold)
    const maxDist = Math.min(Math.max(width, height) * 0.12, 180)
    const maxDistSq = maxDist * maxDist

    // Respect reduced motion
    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

    function step() {
      // clear with transparent fill to leave underlying background visible
      ctx.clearRect(0, 0, width, height)

      // draw lines
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j]
          const dx = p.x - q.x
          const dy = p.y - q.y
          const distSq = dx * dx + dy * dy
          if (distSq <= maxDistSq) {
            const t = 1 - distSq / maxDistSq
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.strokeStyle = pal.dot
            ctx.globalAlpha = pal.lineAlpha * t
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }

      // draw particles on top of lines
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        ctx.beginPath()
        ctx.fillStyle = p.hueMix ? pal.dotAlt : pal.dot
        ctx.globalAlpha = pal.dotAlpha
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }

      // update positions
      if (!reduced) {
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i]
          p.x += p.vx + (Math.random() - 0.5) * 0.15
          p.y += p.vy + (Math.random() - 0.5) * 0.15
          if (p.x < -10) p.x = width + 10
          if (p.x > width + 10) p.x = -10
          if (p.y < -10) p.y = height + 10
          if (p.y > height + 10) p.y = -10
        }
      }

      ctx.globalAlpha = 1
      raf.current = requestAnimationFrame(step)
    }

    if (!reduced) raf.current = requestAnimationFrame(step)

    return () => {
      window.removeEventListener('resize', resize)
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [theme])

  return <canvas id={id} ref={ref} className="constellation-canvas" aria-hidden />
}
