import React, { useEffect, useState } from 'react'
import MainPortfolio from './components/MainPortfolio'
import TerminalPage from './pages/TerminalPage'

export default function App() {
  const [currentPage, setCurrentPage] = useState('portfolio')

  useEffect(() => {
    // Always load dark theme stylesheet
    const id = 'theme-css'
    let link = document.getElementById(id)
    if (!link) {
      link = document.createElement('link')
      link.rel = 'stylesheet'
      link.id = id
      document.head.appendChild(link)
    }
    link.href = '/styles/dark.css'
  }, [])

  const goToTerminal = () => setCurrentPage('terminal')
  const goToPortfolio = () => setCurrentPage('portfolio')

  return (
    <div className="min-h-screen">
      {currentPage === 'portfolio' && (
        <MainPortfolio onGoToTerminal={goToTerminal} />
      )}

      {currentPage === 'terminal' && (
        <TerminalPage onBackToPortfolio={goToPortfolio} />
      )}
    </div>
  )
}
