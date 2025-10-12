import React, { useEffect, useState } from 'react'
import ThemeSelector from './components/ThemeSelector'
import MainPortfolio from './components/MainPortfolio'

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || null)
  const [showSelector, setShowSelector] = useState(false)

  useEffect(() => {
    if (theme) {
      localStorage.setItem('theme', theme)
      // Dynamically load theme css
      const id = 'theme-css'
      let link = document.getElementById(id)
      if (!link) {
        link = document.createElement('link')
        link.rel = 'stylesheet'
        link.id = id
        document.head.appendChild(link)
      }
      link.href = theme === 'dark' ? '/src/styles/dark.css' : '/src/styles/pastel.css'
    }
  }, [theme])

  return (
    <div className="min-h-screen">
      {!theme ? (
        <ThemeSelector onChoose={(t) => setTheme(t)} />
      ) : (
        <>
          <MainPortfolio theme={theme} onResetTheme={() => { setTheme(null); localStorage.removeItem('theme') }} openSelector={() => setShowSelector(true)} />
          {showSelector && (
            <div className="fixed inset-0 z-50">
              <ThemeSelector onChoose={(t) => { setTheme(t); setShowSelector(false) }} />
            </div>
          )}
        </>
      )}
    </div>
  )
}
