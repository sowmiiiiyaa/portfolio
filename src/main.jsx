import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/tailwind.css'
import './styles/constellation.css'
import './styles/toast.css'
import './styles/projects.css'
import './styles/theme-selector.css'
import './styles/dual-theme.css'
// Include both theme styles so the selectors (e.g. .theme-dark / .theme-pastel) are
// available at runtime and can be toggled by the app. These are intentionally
// bundled rather than loaded from /src at runtime so they work after building.
import './styles/dark.css'
import './styles/pastel.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
