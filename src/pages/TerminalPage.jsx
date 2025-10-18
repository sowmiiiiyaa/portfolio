import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './TerminalPage.css'

const TerminalPage = ({ theme, onToggleTheme, onBackToPortfolio }) => {
  const [currentCommand, setCurrentCommand] = useState('')
  const [commandHistory, setCommandHistory] = useState([])
  const [userName, setUserName] = useState('sowmiya')
  const [isEditingName, setIsEditingName] = useState(false)
  const terminalEndRef = useRef(null)
  const inputRef = useRef(null)

  // Command definitions with outputs
  const commands = {
    'show skills': {
        output: [
          '╔═══════════════════════════════════════════╗',
          '║         SKILL GALAXY MATRIX               ║',
          '╚═══════════════════════════════════════════╝',
          '',
          // NOTE: This static array is kept for fallback but the executeCommand handler
          // will produce a richer, styled block for 'show skills'.
          'Use the `show skills` command to render the interactive skill matrix.'
        ]
    },
    'list projects': {
      output: [
        '╔═══════════════════════════════════════════╗',
        '║            PROJECT REPOSITORY              ║',
        '╚═══════════════════════════════════════════╝',
        '',
        '📁 Project 1: Focus Timer',
        '   ├─ A React productivity timer with session tracking',
        '   ├─ Features: Start/Pause, Session history, Notification hints',
        '   └─ Tech: React, useState, localStorage',
        '',
        '📁 Project 2: System Monitoring',
        '   ├─ A Python/Tkinter dashboard for resource tracking',
        '   ├─ Features: Live CPU & memory charts, alerts for spikes',
        '   └─ Tech: Python, Tkinter, psutil',
        '',
        '> Found 2 projects in repository'
      ]
    },
    'fun_fact --devops': {
      output: [
        '╔═══════════════════════════════════════════╗',
        '║         DEVOPS FUN FACT 💡                ║',
        '╚═══════════════════════════════════════════╝',
        '',
        '🎯 Did you know?',
        '',
        'The term "DevOps" was coined by Patrick Debois',
        'at the first DevOpsDays conference in 2009 in',
        'Ghent, Belgium.',
        '',
        'DevOps is not just a methodology—it\'s a culture',
        'shift that breaks down silos between development',
        'and operations teams!',
        '',
        '🚀 Automation: The DevOps Superpower',
        ''
      ]
    },
    'whoami': {
      output: [
        '╔═══════════════════════════════════════════╗',
        '║             USER PROFILE                   ║',
        '╚═══════════════════════════════════════════╝',
        '',
  '👤 Name:     Sowmiya S',
  '💼 Role:     Computer Science Engineering Student',
  '🎓 Focus:    DevOps and Automation',
  '🌟 Motto:    "Always learning. Always automating."',
        '',
        '🔗 Connect:',
        '   GitHub:   github.com/sowmiiiiyaa',
  '   LinkedIn: https://www.linkedin.com/in/sowmiya-s-241486346/',
        '',
        '> Profile loaded successfully'
      ]
    },
    help: {
      output: [
        '╔═══════════════════════════════════════════╗',
        '║         AVAILABLE COMMANDS                ║',
        '╚═══════════════════════════════════════════╝',
        '',
        '  show skills         Display DevOps skills',
        '  list projects       Show project portfolio',
        '  fun_fact --devops   Get a DevOps fun fact',
        '  whoami              Display user profile',
        '  clear               Clear terminal screen',
        '  help                Show this help menu',
        '',
        '💡 Tip: Click command buttons below terminal!',
        ''
      ]
    },
    clear: { output: [], clearScreen: true }
  }

  // Command suggestion buttons
  const commandButtons = [
    { cmd: 'show skills', icon: '🎯', label: 'Skills' },
    { cmd: 'list projects', icon: '📁', label: 'Projects' },
    { cmd: 'whoami', icon: '👤', label: 'Profile' },
    { cmd: 'fun_fact --devops', icon: '💡', label: 'Fun Fact' }
  ]

  // Welcome message on mount
  useEffect(() => {
    setTimeout(() => {
      setCommandHistory([
        {
          type: 'welcome',
          lines: [
            '╔═══════════════════════════════════════════════════════╗',
            '║                                                       ║',
            '║      Welcome to DevOps Terminal Simulator v1.0       ║',
            '║                                                       ║',
            '╚═══════════════════════════════════════════════════════╝',
            '',
            '🚀 Type "help" to see available commands',
            '💡 Or click the command buttons below',
            '',
            '────────────────────────────────────────────────────────',
            ''
          ]
        }
      ])
    }, 300)
  }, [])

  // Auto-scroll to bottom
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [commandHistory])

  // Execute command
  const executeCommand = (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase()
    const commandData = commands[trimmedCmd]

    // Special handling for 'show skills' — render ASCII progress bars (retro terminal look)
    if (trimmedCmd === 'show skills') {
      const asciiBar = (pct) => {
        const total = 10
        const filled = Math.round(pct / 10)
        const full = '▓'
        const empty = '░'
        return full.repeat(filled) + empty.repeat(total - filled)
      }

      const rows = [
        '╔═══════════════════════════════════════════╗',
        '║         SKILL GALAXY MATRIX               ║',
        '╚═══════════════════════════════════════════╝',
        '',
        `🌐 HTML        ${asciiBar(85)} ${String(85).padStart(3)}%   — Semantic markup, accessibility`,
        `🎨 CSS         ${asciiBar(85)} ${String(85).padStart(3)}%   — Responsive layouts, basic animations`,
        `🔧 Git & GitHub ${asciiBar(80)} ${String(80).padStart(3)}%   — Branching, merging, PR workflows`,
        `🐍 Python      ${asciiBar(90)} ${String(90).padStart(3)}%   — Automation scripts, DevOps`,
        `🐧 Linux       ${asciiBar(30)} ${String(30).padStart(3)}%   — CLI, permissions, administration`,
        `🐳 Docker      ${asciiBar(20)} ${String(20).padStart(3)}%   — Container basics, Dockerfiles`,
        '',
        '🔭 Currently Learning: Docker, Linux, CI/CD (focused projects & labs)',
        '',
        '✓ Skills matrix loaded successfully!'
      ]

      setCommandHistory(prev => [
        ...prev,
        { type: 'input', text: cmd },
        { type: 'output', lines: rows }
      ])
      return
    }

    if (commandData) {
      if (commandData.clearScreen) {
        setCommandHistory([])
      } else {
        setCommandHistory(prev => [
          ...prev,
          { type: 'input', text: cmd },
          { type: 'output', lines: commandData.output }
        ])
      }
    } else if (trimmedCmd) {
      setCommandHistory(prev => [
        ...prev,
        { type: 'input', text: cmd },
        {
          type: 'output',
          lines: [
            `❌ Command not found: ${cmd}`,
            '',
            '💡 Type "help" for available commands',
            ''
          ]
        }
      ])
    }
  }

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault()
    if (currentCommand.trim()) {
      executeCommand(currentCommand)
      setCurrentCommand('')
    }
  }

  // Handle button click
  const handleButtonClick = (cmd) => {
    executeCommand(cmd)
    inputRef.current?.focus()
  }

  // Handle name edit
  const handleNameEdit = () => {
    setIsEditingName(true)
  }

  const handleNameChange = (e) => {
    if (e.key === 'Enter') {
      setIsEditingName(false)
      inputRef.current?.focus()
    }
  }

  return (
    <div className={`terminal-page ${theme === 'dark' ? 'theme-dark' : 'theme-light'}`}>
      {/* Animated Background */}
      <div className="terminal-bg">
        <div className="grid-pattern"></div>
        <div className="glow-orb orb-1"></div>
        <div className="glow-orb orb-2"></div>
        <div className="glow-orb orb-3"></div>
      </div>

      {/* Navigation Bar */}
      <motion.nav 
        className="terminal-nav"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.button
          className="nav-back-btn"
          onClick={onBackToPortfolio}
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="back-arrow">←</span>
          <span>Back to Portfolio</span>
        </motion.button>

        <motion.h1 
          className="nav-title"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className="title-icon">⚡</span>
          DevOps Terminal
        </motion.h1>

        <motion.button
          className="theme-toggle-btn"
          onClick={onToggleTheme}
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </motion.button>
      </motion.nav>

      {/* Main Terminal Window */}
      <motion.div 
        className="terminal-container"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="terminal-window">
          {/* Terminal Header */}
          <div className="terminal-header">
            <div className="terminal-controls">
              <span className="control-btn close"></span>
              <span className="control-btn minimize"></span>
              <span className="control-btn maximize"></span>
            </div>
            
            <div className="terminal-title">
              {isEditingName ? (
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  onKeyDown={handleNameChange}
                  onBlur={() => setIsEditingName(false)}
                  className="name-input"
                  autoFocus
                />
              ) : (
                <span onClick={handleNameEdit} className="name-display" title="Click to edit">
                  {userName}@devops:~$
                </span>
              )}
            </div>

            <div className="terminal-status">
              <span className="status-dot"></span>
              <span className="status-text">Connected</span>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="terminal-body">
            <div className="terminal-content">
              {/* Command History */}
              <AnimatePresence>
                {commandHistory.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.type === 'welcome' && (
                      <div className="welcome-message">
                        {item.lines.map((line, i) => (
                          <motion.div
                            key={i}
                            className="welcome-line"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: i * 0.05 }}
                          >
                            {line}
                          </motion.div>
                        ))}
                      </div>
                    )}
                    {item.type === 'input' && (
                      <div className="input-line">
                        <span className="prompt">{userName}@devops:~$</span>
                        <span className="command-text">{item.text}</span>
                      </div>
                    )}
                    {item.type === 'output' && (
                      <div className="output-block">
                        {item.lines.map((line, i) => (
                          <motion.div
                            key={i}
                            className="output-line"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: i * 0.03 }}
                          >
                            {line}
                          </motion.div>
                        ))}
                      </div>
                    )}
                    {item.type === 'skills' && (
                      <div className="output-block skills-matrix">
                        {item.data.map((s, idx) => (
                          <motion.div key={s.name} className="skill-row" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.03 }}>
                            <div className="skill-icon">{s.icon}</div>
                            <div className="skill-name">{s.name}</div>
                            <div className="skill-bar-bg" role="img" aria-label={`${s.name} proficiency ${s.pct}%`}>
                              <div className="skill-progress" style={{ width: `${s.pct}%` }} data-tip={`${s.pct}%`} />
                            </div>
                            <div className="skill-pct">{s.pct}%</div>
                            <div className="skill-note">— {s.note}</div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Current Input Line */}
              <form onSubmit={handleSubmit} className="input-form">
                <div className="input-line">
                  <span className="prompt">{userName}@devops:~$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={currentCommand}
                    onChange={(e) => setCurrentCommand(e.target.value)}
                    className="command-input"
                    placeholder="Type a command..."
                    autoFocus
                    aria-label="Command input"
                  />
                  <span className="cursor"></span>
                </div>
              </form>

              <div ref={terminalEndRef} />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Command Buttons */}
      <motion.div 
        className="command-buttons"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <div className="buttons-label">
          <span className="label-icon">💡</span>
          <span>Quick Commands</span>
        </div>
        <div className="buttons-grid">
          {commandButtons.map((btn, idx) => (
            <motion.button
              key={idx}
              className="cmd-button"
              onClick={() => handleButtonClick(btn.cmd)}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + idx * 0.1 }}
            >
              <span className="btn-icon">{btn.icon}</span>
              <span className="btn-label">{btn.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default TerminalPage
