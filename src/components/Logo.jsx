import React from 'react'
import { motion } from 'framer-motion'
import logoImage from '../assets/images/logo-ilm.png'

export default function Logo({ size = "medium", className = "" }) {
  const sizes = {
    small: "w-8 h-8",
    medium: "w-10 h-10", 
    large: "w-16 h-16",
    xl: "w-20 h-20"
  }

  return (
    <motion.div 
      className={`${sizes[size]} ${className}`}
      whileHover={{ scale: 1.05, rotate: 5 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <img 
        src={logoImage} 
        alt="Academia ILM" 
        className="w-full h-full object-contain"
      />
    </motion.div>
  )
}