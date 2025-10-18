import React, { useEffect } from 'react'
import '../styles/toast.css'

export default function Toast({ message = '', theme = 'light', onClose, duration = 3200 }) {
  useEffect(() => {
    if (!message) return
    const t = setTimeout(() => {
      onClose && onClose()
    }, duration)
    return () => clearTimeout(t)
  }, [message, duration, onClose])

  if (!message) return null

  return (
    <div className={`site-toast ${theme === 'dark' ? 'toast-dark' : 'toast-light'}`} role="status" aria-live="polite">
      <div className="toast-content">{message}</div>
    </div>
  )
}
