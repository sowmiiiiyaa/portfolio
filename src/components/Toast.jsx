import React from 'react'
import '../styles/toast.css'

export default function Toast({ message, theme = 'dark' }) {
  return (
    <div className={`site-toast ${theme === 'dark' ? 'toast-dark' : 'toast-light'}`} role="status" aria-live="polite">
      {message}
    </div>
  )
}
