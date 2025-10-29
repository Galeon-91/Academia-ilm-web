import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, Lock } from 'lucide-react'

// ==========================================
// COMPONENTE: PASSWORD INPUT
// ==========================================

export default function PasswordInput({ 
  value, 
  onChange, 
  placeholder = '••••••••',
  label,
  id,
  className = '',
  disabled = false
}) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={id}
          className="block text-[#87CEEB] text-sm font-medium mb-2"
        >
          {label}
        </label>
      )}
      
      <div className="relative">
        {/* Icono de candado */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <Lock className="w-5 h-5 text-[#87CEEB]/70" />
        </div>

        {/* Input */}
        <input
          id={id}
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full pl-12 pr-14 py-3 bg-white/5 rounded-xl border border-white/10 text-white outline-none focus:border-[#87CEEB]/50 transition-all placeholder:text-white/30 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        />

        {/* Botón toggle visibilidad */}
        <motion.button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          disabled={disabled}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <AnimatePresence mode="wait">
            {showPassword ? (
              <motion.div
                key="eye-off"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ duration: 0.2 }}
              >
                <EyeOff className="w-5 h-5 text-[#87CEEB]" />
              </motion.div>
            ) : (
              <motion.div
                key="eye"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ duration: 0.2 }}
              >
                <Eye className="w-5 h-5 text-white/60" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  )
}

// ==========================================
// VARIANTE: PASSWORD STRENGTH INDICATOR
// ==========================================

export function PasswordInputWithStrength({ 
  value, 
  onChange, 
  placeholder = '••••••••',
  label,
  id,
  showStrength = true
}) {
  const [showPassword, setShowPassword] = useState(false)

  // Calcular fuerza de contraseña
  const calculateStrength = (pass) => {
    if (!pass) return { score: 0, label: '', color: '' }
    
    let score = 0
    if (pass.length >= 8) score++
    if (pass.length >= 12) score++
    if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) score++
    if (/\d/.test(pass)) score++
    if (/[^a-zA-Z0-9]/.test(pass)) score++

    if (score <= 1) return { score: 20, label: 'Muy débil', color: 'bg-red-500' }
    if (score === 2) return { score: 40, label: 'Débil', color: 'bg-orange-500' }
    if (score === 3) return { score: 60, label: 'Media', color: 'bg-yellow-500' }
    if (score === 4) return { score: 80, label: 'Fuerte', color: 'bg-lime-500' }
    return { score: 100, label: 'Muy fuerte', color: 'bg-green-500' }
  }

  const strength = calculateStrength(value)

  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={id}
          className="block text-[#87CEEB] text-sm font-medium mb-2"
        >
          {label}
        </label>
      )}
      
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <Lock className="w-5 h-5 text-[#87CEEB]/70" />
        </div>

        <input
          id={id}
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full pl-12 pr-14 py-3 bg-white/5 rounded-xl border border-white/10 text-white outline-none focus:border-[#87CEEB]/50 transition-all placeholder:text-white/30"
        />

        <motion.button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-lg transition-colors"
        >
          <AnimatePresence mode="wait">
            {showPassword ? (
              <motion.div
                key="eye-off"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
              >
                <EyeOff className="w-5 h-5 text-[#87CEEB]" />
              </motion.div>
            ) : (
              <motion.div
                key="eye"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
              >
                <Eye className="w-5 h-5 text-white/60" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Indicador de fuerza */}
      {showStrength && value && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-white/60">Seguridad:</span>
            <span className={`text-xs font-medium ${
              strength.score >= 80 ? 'text-green-400' : 
              strength.score >= 60 ? 'text-yellow-400' : 
              'text-red-400'
            }`}>
              {strength.label}
            </span>
          </div>
          
          <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
            <motion.div
              className={`h-full ${strength.color}`}
              initial={{ width: 0 }}
              animate={{ width: `${strength.score}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>
      )}
    </div>
  )
}

// ==========================================
// EJEMPLO DE USO:
// ==========================================

// Uso básico:
// import PasswordInput from '../components/PasswordInput'
//
// const [password, setPassword] = useState('')
//
// <PasswordInput
//   value={password}
//   onChange={(e) => setPassword(e.target.value)}
//   label="Contraseña"
//   placeholder="Ingresa tu contraseña"
// />

// Con indicador de fuerza:
// import { PasswordInputWithStrength } from '../components/PasswordInput'
//
// <PasswordInputWithStrength
//   value={password}
//   onChange={(e) => setPassword(e.target.value)}
//   label="Nueva Contraseña"
// />