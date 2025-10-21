import React, { useEffect, useState } from 'react'
import ThemeSelector from './components/ThemeSelector'
import MainPortfolio from './components/MainPortfolio'
import TerminalPage from './pages/TerminalPage'

export default function App() {
  const [theme, setTheme] = useState(null) // Always start with null to show selector first
  const [showSelector, setShowSelector] = useState(false)
  const [currentPage, setCurrentPage] = useState('selector') // 'selector', 'portfolio', 'terminal'

  useEffect(() => {
    // Apply theme by toggling a root class. Both theme css files are bundled
    // into the build so we no longer rely on injecting a runtime /src link.
    const root = document.documentElement
    // Clear known theme classes
    root.classList.remove('theme-dark', 'theme-light', 'theme-pastel')
    if (theme) {
      localStorage.setItem('theme', theme)
      if (theme === 'dark') {
        root.classList.add('theme-dark')
      } else {
        // Some CSS uses .theme-light while other component styles use `-pastel`
        // class suffixes (e.g. .card-pastel). Add both to ensure rules match.
        root.classList.add('theme-light', 'theme-pastel')
      }
    } else {
      localStorage.removeItem('theme')
    }
  }, [theme])

  // On mount, restore previously chosen theme (if any) and go straight to portfolio
  // so returning visitors see their selected theme immediately.
  useEffect(() => {
    const saved = localStorage.getItem('theme')
    if (saved) {
      setTheme(saved)
      setCurrentPage('portfolio')
    }
  }, [])

  // Function to toggle theme without navigation
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'pastel' : 'dark'
    setTheme(newTheme)
  }

  // Function to return to home/front page
  const goToHomePage = () => {
    setTheme(null)
    setCurrentPage('selector')
    localStorage.removeItem('theme')
  }

  // Navigate to terminal page
  const goToTerminal = () => {
    setCurrentPage('terminal')
  }

  // Navigate back to portfolio
  const goToPortfolio = () => {
    setCurrentPage('portfolio')
  }

  // Handle theme selection
  const handleThemeSelect = (t) => {
    setTheme(t)
    setCurrentPage('portfolio')
  }

  return (
    <div className="min-h-screen">
      {currentPage === 'selector' && (
        <ThemeSelector onChoose={handleThemeSelect} />
      )}
      
      {currentPage === 'portfolio' && theme && (
        <>
          <MainPortfolio 
            theme={theme} 
            onToggleTheme={toggleTheme}
            onResetTheme={goToHomePage}
            onGoToTerminal={goToTerminal}
            openSelector={() => setShowSelector(true)} 
          />
          {showSelector && (
            <div className="fixed inset-0 z-50">
              <ThemeSelector onChoose={(t) => { setTheme(t); setShowSelector(false) }} />
            </div>
          )}
          {/* Switch Mode removed from floating fixed position; use in-menu Switch Mode instead */}
        </>
      )}
      
      {currentPage === 'terminal' && theme && (
        <TerminalPage 
          theme={theme}
          onToggleTheme={toggleTheme}
          onBackToPortfolio={goToPortfolio}
        />
      )}
    </div>
  )
}
