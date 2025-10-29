import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Lock, ArrowRight, Zap, Eye, EyeOff } from 'lucide-react'
import { supabase } from '../lib/supabase'

// ====================================
// ICONOS SVG PERSONALIZADOS
// ====================================

// Icono de Google
const GoogleIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
)

// Icono de X (Twitter)
const XIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

// Icono de Facebook
const FacebookIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="#1877F2">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
)

// ====================================
// TESLA ULTRA REALISTA
// ====================================
function AnimatedTesla({ showPassword, inputFocused }) {
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (inputFocused) {
        const rect = document.getElementById('tesla-container')?.getBoundingClientRect()
        if (rect) {
          const centerX = rect.left + rect.width / 2
          const centerY = rect.top + rect.height / 2
          const maxMove = 8
          
          const x = ((e.clientX - centerX) / window.innerWidth) * maxMove
          const y = ((e.clientY - centerY) / window.innerHeight) * maxMove
          
          setEyePosition({ 
            x: Math.max(-maxMove, Math.min(maxMove, x)), 
            y: Math.max(-maxMove, Math.min(maxMove, y)) 
          })
        }
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [inputFocused])

  return (
    <div id="tesla-container" className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mx-auto mb-4 sm:mb-6">
      <svg viewBox="0 0 240 240" className="w-full h-full drop-shadow-2xl">
        <defs>
          <linearGradient id="skinReal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffe4d1" />
            <stop offset="30%" stopColor="#ffd7c2" />
            <stop offset="70%" stopColor="#f4b79a" />
            <stop offset="100%" stopColor="#e8a582" />
          </linearGradient>
          
          <radialGradient id="skinHighlight" cx="50%" cy="30%">
            <stop offset="0%" stopColor="#fff5eb" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="#ffd7c2" stopOpacity="0"/>
          </radialGradient>
          
          <linearGradient id="hairReal" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4a4a4a" />
            <stop offset="50%" stopColor="#2d2d2d" />
            <stop offset="100%" stopColor="#1a1a1a" />
          </linearGradient>

          <linearGradient id="suitReal" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#5a5a62" />
            <stop offset="50%" stopColor="#3a3a42" />
            <stop offset="100%" stopColor="#2a2a32" />
          </linearGradient>

          <radialGradient id="glowReal">
            <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0"/>
          </radialGradient>

          <filter id="shadow">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3"/>
          </filter>
        </defs>

        {inputFocused && (
          <motion.circle
            cx="120" cy="120" r="100"
            fill="url(#glowReal)"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.3, opacity: 1 }}
            transition={{ duration: 0.6 }}
          />
        )}

        <g filter="url(#shadow)">
          <path d="M 70 160 L 60 195 L 180 195 L 170 160 Z" fill="url(#suitReal)"/>
          <path d="M 65 175 L 62 190" stroke="rgba(0,0,0,0.2)" strokeWidth="2"/>
          <path d="M 175 175 L 178 190" stroke="rgba(0,0,0,0.2)" strokeWidth="2"/>
        </g>

        <path d="M 100 160 L 95 185 L 120 190 L 145 185 L 140 160 Z" fill="white" filter="url(#shadow)"/>
        
        <g filter="url(#shadow)">
          <path d="M 115 165 L 110 180 L 120 195 L 130 180 L 125 165 Z" fill="#1E40AF"/>
          <path d="M 120 165 L 118 180 L 120 195 L 122 180 Z" fill="#2563EB" opacity="0.6"/>
        </g>

        <ellipse cx="120" cy="155" rx="22" ry="12" fill="url(#skinReal)" filter="url(#shadow)"/>
        <ellipse cx="120" cy="153" rx="20" ry="10" fill="url(#skinHighlight)"/>

        <ellipse cx="120" cy="110" rx="50" ry="58" fill="url(#skinReal)" filter="url(#shadow)"/>
        <ellipse cx="120" cy="95" rx="40" ry="45" fill="url(#skinHighlight)"/>
        
        <ellipse cx="90" cy="115" rx="8" ry="12" fill="rgba(0,0,0,0.05)"/>
        <ellipse cx="150" cy="115" rx="8" ry="12" fill="rgba(0,0,0,0.05)"/>
        
        <g filter="url(#shadow)">
          <ellipse cx="72" cy="110" rx="10" ry="16" fill="url(#skinReal)"/>
          <ellipse cx="74" cy="108" rx="4" ry="8" fill="rgba(0,0,0,0.1)"/>
          
          <ellipse cx="168" cy="110" rx="10" ry="16" fill="url(#skinReal)"/>
          <ellipse cx="166" cy="108" rx="4" ry="8" fill="rgba(0,0,0,0.1)"/>
        </g>

        <g filter="url(#shadow)">
          <path
            d="M 70 75 Q 65 55 75 50 Q 90 42 105 45 Q 120 43 135 45 Q 150 42 165 50 Q 175 55 170 75 L 165 85 Q 160 70 120 68 Q 80 70 75 85 Z"
            fill="url(#hairReal)"
          />
          <path d="M 85 70 Q 90 65 95 70" stroke="#1a1a1a" strokeWidth="2" fill="none"/>
          <path d="M 105 68 Q 110 63 115 68" stroke="#1a1a1a" strokeWidth="2" fill="none"/>
          <path d="M 125 68 Q 130 63 135 68" stroke="#1a1a1a" strokeWidth="2" fill="none"/>
          <path d="M 145 70 Q 150 65 155 70" stroke="#1a1a1a" strokeWidth="2" fill="none"/>
        </g>

        <g>
          <ellipse cx="95" cy="102" rx="16" ry="14" fill="rgba(0,0,0,0.1)"/>
          <ellipse cx="95" cy="100" rx="16" ry="12" fill="white"/>
          <circle cx={95 + eyePosition.x} cy={100 + eyePosition.y} r="8" fill="#2563EB"/>
          <circle cx={95 + eyePosition.x} cy={100 + eyePosition.y} r="6" fill="#1E40AF"/>
          <motion.circle 
            cx={95 + eyePosition.x} 
            cy={100 + eyePosition.y} 
            r="4" 
            fill="black"
            animate={{ scale: inputFocused ? [1, 1.15, 1] : 1 }}
            transition={{ duration: 0.8, repeat: inputFocused ? Infinity : 0 }}
          />
          <circle cx={97 + eyePosition.x} cy={98 + eyePosition.y} r="2.5" fill="white" opacity="0.9"/>
          <circle cx={93 + eyePosition.x} cy={101 + eyePosition.y} r="1.5" fill="white" opacity="0.6"/>
          
          <ellipse cx="145" cy="102" rx="16" ry="14" fill="rgba(0,0,0,0.1)"/>
          <ellipse cx="145" cy="100" rx="16" ry="12" fill="white"/>
          <circle cx={145 + eyePosition.x} cy={100 + eyePosition.y} r="8" fill="#2563EB"/>
          <circle cx={145 + eyePosition.x} cy={100 + eyePosition.y} r="6" fill="#1E40AF"/>
          <motion.circle 
            cx={145 + eyePosition.x} 
            cy={100 + eyePosition.y} 
            r="4" 
            fill="black"
            animate={{ scale: inputFocused ? [1, 1.15, 1] : 1 }}
            transition={{ duration: 0.8, repeat: inputFocused ? Infinity : 0, delay: 0.1 }}
          />
          <circle cx={147 + eyePosition.x} cy={98 + eyePosition.y} r="2.5" fill="white" opacity="0.9"/>
          <circle cx={143 + eyePosition.x} cy={101 + eyePosition.y} r="1.5" fill="white" opacity="0.6"/>

          <motion.g animate={{ y: inputFocused ? [-1, 0, -1] : 0 }} transition={{ duration: 1.5, repeat: Infinity }}>
            <path d="M 75 85 Q 80 81 85 82 Q 90 82 95 83 Q 100 84 105 85" 
              stroke="#2d2d2d" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
            <path d="M 77 86 Q 82 84 87 85" 
              stroke="rgba(0,0,0,0.3)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            
            <path d="M 135 85 Q 140 81 145 82 Q 150 82 155 83 Q 160 84 165 85" 
              stroke="#2d2d2d" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
            <path d="M 153 86 Q 148 84 143 85" 
              stroke="rgba(0,0,0,0.3)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          </motion.g>
        </g>

        <g filter="url(#shadow)">
          <ellipse cx="120" cy="120" rx="3.5" ry="5" fill="#d69975" opacity="0.6"/>
          <path d="M 118 122 L 122 122" stroke="rgba(0,0,0,0.2)" strokeWidth="1"/>
        </g>

        <g filter="url(#shadow)">
          <path d="M 120 125 Q 105 127 90 123 Q 82 121 78 125 Q 75 128 78 131 Q 85 136 95 133 Q 108 130 120 128" 
            fill="#2d2d2d"/>
          <path d="M 120 126 Q 108 128 95 125" 
            stroke="#1a1a1a" strokeWidth="1.5" fill="none"/>
          
          <path d="M 120 125 Q 135 127 150 123 Q 158 121 162 125 Q 165 128 162 131 Q 155 136 145 133 Q 132 130 120 128" 
            fill="#2d2d2d"/>
          <path d="M 120 126 Q 132 128 145 125" 
            stroke="#1a1a1a" strokeWidth="1.5" fill="none"/>
        </g>

        {inputFocused ? (
          <g>
            <path d="M 95 142 Q 120 150 145 142" 
              stroke="#d69975" strokeWidth="3" fill="none" strokeLinecap="round"/>
            <path d="M 100 143 Q 120 148 140 143" 
              stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="none" strokeLinecap="round"/>
          </g>
        ) : (
          <path d="M 100 145 Q 120 146 140 145" 
            stroke="#d69975" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        )}

        {inputFocused && (
          <>
            <ellipse cx="80" cy="120" rx="12" ry="8" fill="#ff9999" opacity="0.35"/>
            <ellipse cx="82" cy="118" rx="8" ry="5" fill="#ffcccc" opacity="0.25"/>
            
            <ellipse cx="160" cy="120" rx="12" ry="8" fill="#ff9999" opacity="0.35"/>
            <ellipse cx="158" cy="118" rx="8" ry="5" fill="#ffcccc" opacity="0.25"/>
          </>
        )}
      </svg>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center mt-2"
      >
        <p className="text-xs sm:text-sm md:text-base font-bold bg-gradient-to-r from-[#3B82F6] via-[#06B6D4] to-[#3B82F6] bg-clip-text text-transparent inline-flex items-center justify-center gap-1 sm:gap-2">
          <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-[#06B6D4]" />
          Nikola Tesla
          <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-[#06B6D4]" />
        </p>
      </motion.div>
    </div>
  )
}

// ====================================
// COMPONENTE PRINCIPAL
// ====================================
export default function Login() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [inputFocused, setInputFocused] = useState(false)

  // Manejar callback de OAuth (cuando Google/X/Facebook redirigen de vuelta)
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth event:', event)
      console.log('Session:', session)
      
      if (event === 'SIGNED_IN' && session) {
        console.log('✅ Usuario autenticado:', session.user.email)
        
        // Limpiar la URL de los tokens
        window.history.replaceState({}, document.title, '/login')
        
        // Redirigir al dashboard
        navigate('/dashboard')
      }
    })
    
    return () => {
      subscription?.unsubscribe()
    }
  }, [navigate])

  // Función de login tradicional
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      if (error) {
        alert('Error: ' + error.message)
      } else {
        // Redirigir al dashboard
        navigate('/dashboard')
      }
    } catch (error) {
      console.error('Error inesperado:', error)
      alert('Hubo un problema. Intenta de nuevo.')
    }
  }

  // Función para login con Google
  const handleGoogleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin + '/login'
        }
      })
      
      if (error) {
        console.error('Error:', error)
        alert('Error al iniciar sesión con Google: ' + error.message)
      }
    } catch (error) {
      console.error('Error inesperado:', error)
      alert('Hubo un problema. Intenta de nuevo.')
    }
  }

  const handleXLogin = async () => {
    alert('Login con X próximamente. Configura las credenciales en Supabase primero.')
  }

  const handleFacebookLogin = async () => {
    alert('Login con Facebook próximamente. Configura las credenciales en Supabase primero.')
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center px-3 sm:px-4 md:px-6 py-20 sm:py-24 overflow-hidden">
      
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ 
          minWidth: '100%',
          minHeight: '100%',
          objectFit: 'cover'
        }}
      >
        <source src="https://videos.pexels.com/video-files/6195677/6195677-uhd_2732_1440_25fps.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/40"></div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.3, 1]
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          >
            <svg width="40" height="40" viewBox="0 0 40 40" className="opacity-30">
              <circle cx="20" cy="20" r="3" fill="rgba(59, 130, 246, 0.8)" />
              <ellipse cx="20" cy="20" rx="16" ry="8" fill="none" stroke="rgba(59, 130, 246, 0.6)" strokeWidth="1.5" />
              <ellipse cx="20" cy="20" rx="16" ry="8" fill="none" stroke="rgba(6, 182, 212, 0.6)" strokeWidth="1.5" transform="rotate(60 20 20)" />
              <ellipse cx="20" cy="20" rx="16" ry="8" fill="none" stroke="rgba(30, 64, 175, 0.6)" strokeWidth="1.5" transform="rotate(120 20 20)" />
            </svg>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="relative z-10 w-full max-w-md"
      >
        <motion.div 
          className="relative backdrop-blur-2xl bg-white/10 rounded-3xl sm:rounded-[2rem] shadow-2xl p-6 sm:p-8 md:p-10 border border-white/20"
          style={{
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          }}
        >
          <AnimatedTesla showPassword={showPassword} inputFocused={inputFocused} />

          <motion.div 
            className="text-center mb-6 sm:mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-white drop-shadow-lg">
              Bienvenido de nuevo
            </h1>
            <p className="text-sm sm:text-base text-white/80">
              Inicia sesión en tu cuenta
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-xs sm:text-sm font-medium text-white/90 mb-2">
                Correo electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-white/60" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setInputFocused(true)}
                  onBlur={() => setInputFocused(false)}
                  className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base bg-white/10 backdrop-blur-md border border-white/30 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-[#06B6D4] focus:border-transparent transition-all duration-300"
                  placeholder="tu@email.com"
                  required
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <label className="block text-xs sm:text-sm font-medium text-white/90 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-white/60" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setInputFocused(true)}
                  onBlur={() => setInputFocused(false)}
                  className="w-full pl-9 sm:pl-10 pr-10 sm:pr-12 py-2.5 sm:py-3 text-sm sm:text-base bg-white/10 backdrop-blur-md border border-white/30 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-[#06B6D4] focus:border-transparent transition-all duration-300"
                  placeholder="••••••••"
                  required
                />
                <motion.button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                  whileTap={{ scale: 0.9 }}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </motion.button>
              </div>
            </motion.div>

            <motion.div 
              className="flex items-center justify-between text-xs sm:text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-3 h-3 sm:w-4 sm:h-4 rounded border-white/30 bg-white/10 text-[#06B6D4] focus:ring-[#06B6D4] focus:ring-offset-0"
                />
                <span className="ml-2 text-white/80">Recordarme</span>
              </label>
              <Link to="/recuperar-password" className="text-white/80 hover:text-white transition-colors">
                ¿Olvidaste tu contraseña?
              </Link>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              type="submit"
              className="group w-full relative px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white font-bold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden text-sm sm:text-base"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              <span className="relative z-10 flex items-center justify-center gap-2">
                Iniciar Sesión
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>
          </form>

          <motion.div 
            className="relative my-6 sm:my-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/30"></div>
            </div>
            <div className="relative flex justify-center text-xs sm:text-sm">
              <span className="px-3 sm:px-4 bg-[#2a2f3f] text-white/70">o continúa con</span>
            </div>
          </motion.div>

          <motion.div 
            className="grid grid-cols-3 gap-3 sm:gap-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <motion.button
              onClick={handleGoogleLogin}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.9, type: "spring" }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center justify-center p-3 sm:p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl transition-all duration-300 hover:bg-white/20 hover:border-white/40"
            >
              <GoogleIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </motion.button>

            <motion.button
              onClick={handleXLogin}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.0, type: "spring" }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center justify-center p-3 sm:p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl transition-all duration-300 hover:bg-white/20 hover:border-white/40"
            >
              <XIcon className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
            </motion.button>

            <motion.button
              onClick={handleFacebookLogin}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.1, type: "spring" }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center justify-center p-3 sm:p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl transition-all duration-300 hover:bg-white/20 hover:border-white/40"
            >
              <FacebookIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </motion.button>
          </motion.div>

          <motion.p 
            className="text-center mt-6 sm:mt-8 text-xs sm:text-sm text-white/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            ¿No tienes cuenta?{' '}
            <Link to="/registro" className="text-white font-medium hover:underline transition-colors">
              Regístrate gratis
            </Link>
          </motion.p>
        </motion.div>

        <motion.div 
          className="text-center mt-4 sm:mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
        >
          <Link
            to="/"
            className="text-xs sm:text-sm text-white/70 hover:text-white transition-colors inline-flex items-center gap-2"
          >
            ← Volver al inicio
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}