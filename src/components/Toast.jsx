import React from 'react'
import '../styles/toast.css'

export default function Toast({ message }) {
  return (
    <div className={`site-toast toast-dark`} role="status" aria-live="polite">
      {message}
    </div>
  )
}
