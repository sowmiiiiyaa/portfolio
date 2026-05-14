import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/tailwind.css'
import './styles/constellation.css'
import './styles/toast.css'
import './styles/projects.css'
// Removed light-theme and dual-theme styles — app is dark-only

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
