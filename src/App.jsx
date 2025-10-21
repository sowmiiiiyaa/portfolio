import React, { useEffect, useState } from 'react'
import ThemeSelector from './components/ThemeSelector'
import MainPortfolio from './components/MainPortfolio'
import TerminalPage from './pages/TerminalPage'

export default function App() {
  // Initialize theme from localStorage or OS preference so CSS can load immediately
  const getInitialTheme = () => {
    try {
      const t = localStorage.getItem('theme')
      if (t === 'dark' || t === 'pastel') return t
    } catch (e) {}
    // fallback to system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark'
    return 'pastel'
  }

  const [theme, setTheme] = useState(getInitialTheme())
  const [showSelector, setShowSelector] = useState(false)
  const [currentPage, setCurrentPage] = useState('portfolio') // default to portfolio

  useEffect(() => {
    if (theme) {
      try { localStorage.setItem('theme', theme) } catch (e) {}
      // Dynamically load theme css from public/styles to avoid client-side import flash
      const id = 'theme-css'
      let link = document.getElementById(id)
      if (!link) {
        link = document.createElement('link')
        link.rel = 'stylesheet'
        link.id = id
        document.head.appendChild(link)
      }
      link.href = theme === 'dark' ? '/styles/dark.css' : '/styles/pastel.css'
    }
  }, [theme])

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
          {/* Switch Mode button - Always returns to home page */}
          <button 
            onClick={goToHomePage}
            className="fixed bottom-4 right-4 z-50 px-4 py-2 bg-gray-800 text-white rounded-lg shadow-lg hover:bg-gray-700 transition-colors"
            style={{ fontSize: '12px' }}
          >
            Switch Mode
          </button>
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
