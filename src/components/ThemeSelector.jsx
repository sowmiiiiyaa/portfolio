import React from "react";
import { motion } from "framer-motion";

const Side = ({ title, subtitle, className }) => (
  <div className={`flex-1 flex items-center justify-center p-8 ${className}`}>
    <div className="max-w-md text-center">
      <h2 className="text-5xl mb-4 font-extrabold tracking-tight">{title}</h2>
      <p className="text-lg opacity-80">{subtitle}</p>
    </div>
  </div>
);

export default function ThemeSelector({ onChoose }) {
  return (
    <div className="h-screen w-screen flex relative overflow-hidden">
      {/* Left Side - Pure Black with Neon Dark */}
      <Side
        title={<span className="font-orbitron text-cyan-300">Neon Dark</span>}
        subtitle="Cyber aesthetic with glowing accents and motion."
        className="bg-black text-cyan-200 relative overflow-hidden"
      />

      {/* Right Side - Pastel Lavender with Pastel Light */}
      <Side
        title={
          <span className="font-nunito text-purple-800">Pastel Light</span>
        }
        subtitle="Soft, elegant tones and gentle motion."
        className="bg-gradient-to-br from-[#E6E6FA] to-[#F5E8FF] text-purple-800"
      />

      {/* Central floating control - Rectangle-shaped toggle perfectly centered */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1000,
          margin: 0,
          padding: 0,
        }}
      >
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          style={{ margin: 0, padding: 0 }}
        >
          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-full p-2 shadow-2xl border border-white/20">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onChoose("dark")}
              className="w-12 h-12 rounded-full flex items-center justify-center text-2xl bg-black/20 text-cyan-300 hover:bg-black/40 transition-all duration-300"
            >
              −
            </motion.button>

            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 relative shadow-lg">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white shadow-md" />
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onChoose("pastel")}
              className="w-12 h-12 rounded-full flex items-center justify-center text-2xl bg-purple-200/30 text-purple-800 hover:bg-purple-200/50 transition-all duration-300"
            >
              +
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Hidden accessible buttons for keyboard users */}
      <div className="sr-only">
        <button onClick={() => onChoose("dark")}>Choose Dark Theme</button>
        <button onClick={() => onChoose("pastel")}>
          Choose Pastel Light Theme
        </button>
      </div>
    </div>
  );
}
