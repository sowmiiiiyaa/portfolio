import React from 'react'
import { motion } from 'framer-motion'

const Side = ({ title, subtitle, className }) => (
  <div className={`flex-1 flex items-center justify-center p-8 ${className}`}>
    <div className="max-w-md text-center">
      <h2 className="text-4xl mb-2 font-extrabold tracking-tight">{title}</h2>
      <p className="text-sm opacity-80">{subtitle}</p>
    </div>
  </div>
)

export default function ThemeSelector({ onChoose }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-screen flex relative overflow-hidden">
      <Side
        title={<span className="font-orbitron text-cyan-300">Neon Dark</span>}
        subtitle="Cyber aesthetic with glowing accents and motion."
        className="bg-black text-cyan-200 relative overflow-hidden"
      />

      <Side
        title={<span className="font-nunito text-purple-800">Pastel Light</span>}
        subtitle="Soft, elegant tones and gentle motion."
        className="bg-gradient-to-br from-[#E6E6FA] to-[#F5E8FF] text-purple-800"
      />

      {/* central floating control */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="absolute left-1/2 top-1/2 z-20"
        aria-hidden
      >
        <div className="transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-4 bg-white/6 backdrop-blur-md rounded-full p-1 shadow-2xl">
          <motion.button whileHover={{ scale: 1.05 }} onClick={() => onChoose('dark')} className="control-btn w-12 h-12 rounded-full flex items-center justify-center text-xl">−</motion.button>
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-400 to-teal-300 relative">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-black control-dot" />
          </div>
          <motion.button whileHover={{ scale: 1.05 }} onClick={() => onChoose('pastel')} className="control-btn w-12 h-12 rounded-full flex items-center justify-center text-xl">+</motion.button>
        </div>
      </motion.div>

      {/* hidden accessible choose buttons for keyboard users */}
      <div className="sr-only">
        <button onClick={() => onChoose('dark')}>Choose Dark</button>
        <button onClick={() => onChoose('pastel')}>Choose Pastel</button>
      </div>
    </motion.div>
  )
}
