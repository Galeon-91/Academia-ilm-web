import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useApp } from '../context/AppContext'

export default function Registro() {
  const { language } = useApp()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    email: '',
    password: '',
    confirmPassword: '',
    nivel: ''
  })

  const translations = {
    es: {
      title: 'Únete a Academia ILM',
      subtitle: 'Comienza tu viaje científico con nosotros',
      nombre: 'Nombre',
      apellidos: 'Apellidos',
      email: 'Email',
      password: 'Contraseña',
      confirmPassword: 'Confirmar contraseña',
      nivel: 'Nivel educativo',
      niveles: {
        eso: 'ESO',
        bachillerato: 'Bachillerato',
        universidad: 'Universidad'
      },
      register: 'Crear cuenta',
      hasAccount: '¿Ya tienes cuenta?',
      loginLink: 'Inicia sesión',
      withGoogle: 'Continuar con Google',
      withTwitter: 'Continuar con X',
      withFacebook: 'Continuar con Facebook',
      or: 'O',
      mascot: 'Marie Curie',
      mascotSubtitle: 'Guardiana de la Academia ILM'
    },
    en: {
      title: 'Join ILM Academy',
      subtitle: 'Begin your scientific journey with us',
      nombre: 'First name',
      apellidos: 'Last name',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm password',
      nivel: 'Educational level',
      niveles: {
        eso: 'Middle School',
        bachillerato: 'High School',
        universidad: 'University'
      },
      register: 'Create account',
      hasAccount: 'Already have an account?',
      loginLink: 'Sign in',
      withGoogle: 'Continue with Google',
      withTwitter: 'Continue with X',
      withFacebook: 'Continue with Facebook',
      or: 'Or',
      mascot: 'Marie Curie',
      mascotSubtitle: 'Guardian of ILM Academy'
    }
  }

  const t = translations[language]

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert(language === 'es' ? 'Las contraseñas no coinciden' : 'Passwords do not match')
      return
    }
    console.log('Registro:', formData)
    alert(language === 'es' ? '¡Registro exitoso!' : 'Registration successful!')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center p-3 sm:p-4 md:p-6 pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-12 overflow-hidden relative">
      
      {/* Átomos animados de fondo - Estilo científico */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`atom-${i}`}
            className="absolute"
            style={{
              left: `${10 + i * 12}%`,
              top: `${15 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
          >
            <svg width="60" height="60" viewBox="0 0 60 60" className="opacity-20">
              <circle cx="30" cy="30" r="4" fill="rgba(168, 85, 247, 0.8)" />
              <ellipse cx="30" cy="30" rx="24" ry="10" fill="none" stroke="rgba(168, 85, 247, 0.6)" strokeWidth="2" />
              <ellipse cx="30" cy="30" rx="24" ry="10" fill="none" stroke="rgba(236, 72, 153, 0.6)" strokeWidth="2" transform="rotate(60 30 30)" />
              <ellipse cx="30" cy="30" rx="24" ry="10" fill="none" stroke="rgba(147, 51, 234, 0.6)" strokeWidth="2" transform="rotate(120 30 30)" />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Partículas flotantes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 sm:w-1.5 sm:h-1.5 bg-purple-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-center">
        
        {/* Columna izquierda - Marie Curie - RESPONSIVE ARREGLADO */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden md:flex lg:col-span-2 flex-col items-center justify-center px-4"
        >
          <div className="relative mb-10">
            <MarieCurie3D 
              showPassword={showPassword || showConfirmPassword}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="text-center"
          >
            <p className="text-lg md:text-xl font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300 bg-clip-text text-transparent inline-flex items-center justify-center gap-2">
              <AtomSmallIcon className="w-4 h-4 md:w-5 md:h-5 text-purple-300" />
              {t.mascot}
              <AtomSmallIcon className="w-4 h-4 md:w-5 md:h-5 text-purple-300" />
            </p>
            <p className="text-xs md:text-sm text-purple-200 mt-2">{t.mascotSubtitle}</p>
          </motion.div>
        </motion.div>

        {/* Columna derecha - Formulario - RESPONSIVE */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full lg:col-span-3"
        >
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl border border-white/20">
            
            {/* Header - responsive arreglado */}
            <div className="text-center mb-6 sm:mb-8 px-2">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 leading-tight">
                {t.title}
              </h1>
              <p className="text-xs sm:text-sm md:text-base text-purple-200">{t.subtitle}</p>
            </div>

            {/* OAuth Buttons - SOLO ICONOS */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3 mb-5 sm:mb-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="py-3 sm:py-3.5 bg-white rounded-xl flex items-center justify-center hover:bg-gray-50 transition-all shadow-lg"
              >
                <GoogleIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="py-3 sm:py-3.5 bg-black text-white rounded-xl flex items-center justify-center hover:bg-gray-900 transition-all"
              >
                <TwitterIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="py-3 sm:py-3.5 bg-[#1877F2] text-white rounded-xl flex items-center justify-center hover:bg-[#166FE5] transition-all"
              >
                <FacebookIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.button>
            </div>

            {/* Divider */}
            <div className="relative my-5 sm:my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center text-xs sm:text-sm">
                <span className="px-3 sm:px-4 bg-transparent text-purple-200">{t.or}</span>
              </div>
            </div>

            {/* Formulario - responsive */}
            <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
              
              {/* Nombre y Apellidos */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-purple-200 mb-1.5 sm:mb-2">
                    {t.nombre}
                  </label>
                  <input
                    type="text"
                    value={formData.nombre}
                    onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all backdrop-blur-sm"
                    placeholder="Marie"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-purple-200 mb-1.5 sm:mb-2">
                    {t.apellidos}
                  </label>
                  <input
                    type="text"
                    value={formData.apellidos}
                    onChange={(e) => setFormData({...formData, apellidos: e.target.value})}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all backdrop-blur-sm"
                    placeholder="Curie"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-purple-200 mb-1.5 sm:mb-2">
                  {t.email}
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all backdrop-blur-sm"
                  placeholder="marie@academiailm.com"
                  required
                />
              </div>

              {/* Nivel educativo */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-purple-200 mb-1.5 sm:mb-2">
                  {t.nivel}
                </label>
                <select
                  value={formData.nivel}
                  onChange={(e) => setFormData({...formData, nivel: e.target.value})}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all backdrop-blur-sm"
                  required
                >
                  <option value="" className="text-gray-900">{language === 'es' ? 'Selecciona...' : 'Select...'}</option>
                  <option value="eso" className="text-gray-900">{t.niveles.eso}</option>
                  <option value="bach" className="text-gray-900">{t.niveles.bachillerato}</option>
                  <option value="uni" className="text-gray-900">{t.niveles.universidad}</option>
                </select>
              </div>

              {/* Contraseña */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-purple-200 mb-1.5 sm:mb-2">
                  {t.password}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all backdrop-blur-sm pr-10 sm:pr-12"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 text-purple-300 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOffIcon className="w-4 h-4 sm:w-5 sm:h-5" /> : <EyeIcon className="w-4 h-4 sm:w-5 sm:h-5" />}
                  </button>
                </div>
              </div>

              {/* Confirmar Contraseña */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-purple-200 mb-1.5 sm:mb-2">
                  {t.confirmPassword}
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all backdrop-blur-sm pr-10 sm:pr-12"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 text-purple-300 hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? <EyeOffIcon className="w-4 h-4 sm:w-5 sm:h-5" /> : <EyeIcon className="w-4 h-4 sm:w-5 sm:h-5" />}
                  </button>
                </div>
              </div>

              {/* Botón Submit */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-2.5 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all mt-5 sm:mt-6"
              >
                {t.register}
              </motion.button>
            </form>

            {/* Link a Login */}
            <p className="text-center text-purple-200 mt-5 sm:mt-6 text-xs sm:text-sm">
              {t.hasAccount}{' '}
              <Link to="/login" className="text-white font-semibold hover:underline">
                {t.loginLink}
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// Marie Curie Component - SIMPLE Y FIJA
function MarieCurie3D({ showPassword }) {
  return (
    <div className="relative w-48 h-64 md:w-56 md:h-72 lg:w-72 lg:h-[22rem]">
      
      {/* Resplandor sutil de fondo */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-transparent rounded-full blur-2xl"
        animate={{
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Imagen principal - FIJA */}
      <div className="relative z-10">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Marie_Curie_c._1920s.jpg/800px-Marie_Curie_c._1920s.jpg"
          alt="Marie Curie"
          className="w-full h-full object-cover rounded-2xl shadow-2xl"
          style={{
            filter: 'brightness(1.1) contrast(1.1)',
          }}
        />

        <div className="absolute inset-0">
          {/* Brillo sutil en los ojos cuando NO se muestra password */}
          {!showPassword && (
            <>
              {/* Ojo izquierdo */}
              <motion.div
                className="absolute w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-full"
                style={{
                  left: '38%',
                  top: '36%',
                  background: 'radial-gradient(circle, rgba(168, 85, 247, 0.5) 0%, transparent 70%)',
                  filter: 'blur(4px)',
                }}
                animate={{
                  opacity: [0.4, 0.7, 0.4],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* Ojo derecho */}
              <motion.div
                className="absolute w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-full"
                style={{
                  left: '57%',
                  top: '36%',
                  background: 'radial-gradient(circle, rgba(168, 85, 247, 0.5) 0%, transparent 70%)',
                  filter: 'blur(4px)',
                }}
                animate={{
                  opacity: [0.4, 0.7, 0.4],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.3
                }}
              />
            </>
          )}

          {/* Manos cubriendo cuando se muestra password */}
          {showPassword && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute top-[32%] left-1/2 -translate-x-1/2"
            >
              <motion.div
                animate={{ 
                  rotate: [-2, 2, -2],
                  scale: [1, 1.05, 1]
                }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="text-5xl sm:text-6xl md:text-7xl drop-shadow-2xl"
              >
              </motion.div>
            </motion.div>
          )}
        </div>

        {/* Aura sutil */}
        <motion.div
          className="absolute -inset-2 sm:-inset-3 md:-inset-4 rounded-2xl blur-xl"
          style={{
            background: 'linear-gradient(45deg, rgba(168, 85, 247, 0.2), rgba(236, 72, 153, 0.2))',
          }}
          animate={{
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
    </div>
  )
}

// SVG Icons
function GoogleIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  )
}

function TwitterIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  )
}

function FacebookIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  )
}

function EyeIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  )
}

function EyeOffIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  )
}

function AtomSmallIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <circle cx="12" cy="12" r="2"/>
      <path d="M20.2 15.5c.1-.3.2-.6.2-.9 0-.8-.4-1.5-1.1-1.9.7-.5 1.1-1.2 1.1-1.9 0-.3-.1-.6-.2-.9-.6-1.4-2.8-2.3-5.7-2.3-1.5 0-2.9.2-4 .6-1.1-.4-2.5-.6-4-.6-2.9 0-5.1.9-5.7 2.3-.1.3-.2.6-.2.9 0 .8.4 1.5 1.1 1.9-.7.5-1.1 1.2-1.1 1.9 0 .3.1.6.2.9.6 1.4 2.8 2.3 5.7 2.3 1.5 0 2.9-.2 4-.6 1.1.4 2.5.6 4 .6 2.9 0 5.1-.9 5.7-2.3z"/>
    </svg>
  )
}