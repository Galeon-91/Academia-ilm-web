import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { motion, AnimatePresence } from 'framer-motion'
import ThemeToggle from './ThemeToggle'
import LanguageToggle from './LanguageToggle'

export default function Navbar() {
  const { language } = useApp()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  
  const isActive = (path) => location.pathname === path

  // Detectar scroll para cambiar estilo del navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Cerrar menú móvil al cambiar de ruta
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  const translations = {
    es: {
      home: 'Inicio',
      classes: 'Clases',
      university: 'Universidad',
      prices: 'Precios',
      login: 'Iniciar Sesión',
    },
    en: {
      home: 'Home',
      classes: 'Classes',
      university: 'University',
      prices: 'Pricing',
      login: 'Login',
    }
  }

  const t = translations[language]

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/98 dark:bg-[#0a0f1c]/98 backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-black/20 border-b border-gray-200/50 dark:border-white/10'
            : 'bg-white/80 dark:bg-[#0a0f1c]/80 backdrop-blur-md border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <motion.div 
                className="w-10 h-10 relative"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  <defs>
                    <linearGradient id="flaskGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#1E40AF', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#0a0f1c', stopOpacity: 1 }} />
                    </linearGradient>
                  </defs>
                  <path d="M80 40 L80 80 L50 140 L150 140 L120 80 L120 40 Z" fill="url(#flaskGradient)" stroke="#3B82F6" strokeWidth="3"/>
                  <path d="M60 120 L140 120 Q135 110 130 105 L70 105 Q65 110 60 120" fill="#3B82F6" opacity="0.9"/>
                  <circle cx="90" cy="110" r="4" fill="white" opacity="0.9">
                    <animate attributeName="cy" values="110;105;110" dur="2s" repeatCount="indefinite"/>
                  </circle>
                  <circle cx="105" cy="105" r="3" fill="white" opacity="0.7">
                    <animate attributeName="cy" values="105;100;105" dur="2.5s" repeatCount="indefinite"/>
                  </circle>
                  <circle cx="80" cy="100" r="3.5" fill="white" opacity="0.8">
                    <animate attributeName="cy" values="100;95;100" dur="3s" repeatCount="indefinite"/>
                  </circle>
                  <rect x="92" y="20" width="16" height="20" fill="#1E40AF" stroke="#3B82F6" strokeWidth="2" rx="2"/>
                  <path d="M140 50 Q160 40 155 65 Q150 70 145 60 Q140 55 140 50" fill="#06B6D4" opacity="0.9"/>
                </svg>
              </motion.div>
              <div className="flex flex-col leading-tight">
                <span className="text-xl font-bold bg-gradient-to-r from-[#1E40AF] to-[#3B82F6] dark:from-[#3B82F6] dark:to-[#06B6D4] bg-clip-text text-transparent group-hover:from-[#3B82F6] group-hover:to-[#06B6D4] transition-all duration-300">
                  Academia ILM
                </span>
                <span className="text-xs text-gray-600 dark:text-gray-400">Ciencia con IA</span>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <NavLink to="/" active={isActive('/')}>{t.home}</NavLink>
              <NavLink to="/clases" active={isActive('/clases')}>{t.classes}</NavLink>
              <NavLink to="/universidad" active={isActive('/universidad')}>{t.university}</NavLink>
              <NavLink to="/precios" active={isActive('/precios')}>{t.prices}</NavLink>
              
              <div className="flex items-center space-x-4 ml-4">
                <ThemeToggle />
                <LanguageToggle />
                
                {/* Botón Login mejorado */}
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    to="/login" 
                    className="group relative px-6 py-2.5 bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white font-bold rounded-lg shadow-md hover:shadow-xl hover:shadow-[#3B82F6]/50 transition-all duration-300 overflow-hidden"
                  >
                    {/* Efecto brillo animado */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                    <span className="relative z-10">{t.login}</span>
                  </Link>
                </motion.div>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-3">
              <ThemeToggle />
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                aria-label="Toggle menu"
              >
                <div className="w-6 h-6 flex flex-col justify-center items-center">
                  <motion.span
                    animate={mobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                    className="w-6 h-0.5 bg-current mb-1.5 origin-center transition-all"
                  />
                  <motion.span
                    animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                    className="w-6 h-0.5 bg-current mb-1.5 transition-all"
                  />
                  <motion.span
                    animate={mobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                    className="w-6 h-0.5 bg-current origin-center transition-all"
                  />
                </div>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Fullscreen */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white/98 dark:bg-[#0a0f1c]/98 backdrop-blur-2xl"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Menu content */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="relative h-full flex flex-col items-center justify-center p-8"
            >
              <div className="flex flex-col items-center space-y-6 w-full max-w-sm">
                {[
                  { to: '/', label: t.home },
                  { to: '/clases', label: t.classes },
                  { to: '/universidad', label: t.university },
                  { to: '/precios', label: t.prices },
                ].map((item, index) => (
                  <motion.div
                    key={item.to}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                    className="w-full"
                  >
                    <Link
                      to={item.to}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block w-full text-center px-6 py-4 text-2xl font-bold rounded-xl transition-all duration-300 ${
                        isActive(item.to)
                          ? 'bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white shadow-lg'
                          : 'text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}

                {/* Language toggle en mobile */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="pt-8"
                >
                  <LanguageToggle />
                </motion.div>

                {/* Botón Login en mobile */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="w-full pt-4"
                >
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full text-center px-8 py-4 bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white text-xl font-bold rounded-xl shadow-lg hover:shadow-xl hover:shadow-[#3B82F6]/50 transition-all duration-300"
                  >
                    {t.login}
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// Desktop NavLink con underline animado
function NavLink({ to, active, children }) {
  return (
    <Link to={to} className="relative group">
      <span className={`text-sm font-medium transition-colors duration-300 ${
        active
          ? 'text-[#1E40AF] dark:text-[#3B82F6]'
          : 'text-gray-700 dark:text-gray-300 group-hover:text-[#3B82F6]'
      }`}>
        {children}
      </span>
      
      {/* Underline animado */}
      <motion.span
        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] rounded-full"
        initial={false}
        animate={{
          scaleX: active ? 1 : 0,
          opacity: active ? 1 : 0
        }}
        whileHover={{
          scaleX: 1,
          opacity: 1
        }}
        transition={{ duration: 0.3 }}
      />
    </Link>
  )
}