import React, { useEffect, useState } from 'react'
import ThemeSelector from './components/ThemeSelector'
import MainPortfolio from './components/MainPortfolio'
import TerminalPage from './pages/TerminalPage'

export default function App() {
  const [theme, setTheme] = useState(null) // Always start with null to show selector first
  const [showSelector, setShowSelector] = useState(false)
  const [currentPage, setCurrentPage] = useState('selector') // 'selector', 'portfolio', 'terminal'

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
