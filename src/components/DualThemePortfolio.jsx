import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import MainPortfolio from "./MainPortfolio";

export default function DualThemePortfolio() {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Add class to body for dual-theme styles
    document.body.classList.add("dual-theme-layout");

    return () => {
      document.body.classList.remove("dual-theme-layout");
    };
  }, []);

  const handleDividerHover = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  return (
    <div className="dual-screen-container">
      {/* Light Theme Side */}
      <motion.div
        className="theme-half light-half"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="theme-content light-theme">
          <MainPortfolio theme="pastel" />
        </div>
      </motion.div>

      {/* Animated Divider */}
      <motion.div
        className={`theme-divider ${isAnimating ? "animated" : ""}`}
        onHoverStart={handleDividerHover}
        whileHover={{ scaleY: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <div className="divider-line"></div>
        <motion.div
          className="divider-pulse"
          animate={{
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <div className="divider-gradient-top"></div>
        <div className="divider-gradient-bottom"></div>
      </motion.div>

      {/* Dark Theme Side */}
      <motion.div
        className="theme-half dark-half"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      >
        <div className="theme-content dark-theme">
          <MainPortfolio theme="dark" />
        </div>
      </motion.div>

      {/* Mobile Theme Toggle */}
      <div className="mobile-theme-indicator">
        <div className="indicator-light">Light</div>
        <div className="indicator-dark">Dark</div>
      </div>
    </div>
  );
}
