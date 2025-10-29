import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export default function Footer() {
  const { language } = useApp()

  const translations = {
    es: {
      madeWith: 'Hecho con',
      by: 'por Ismaín',
      quickLinks: 'Enlaces Rápidos',
      home: 'Inicio',
      classes: 'Clases',
      university: 'Universidad',
      prices: 'Precios',
      contact: 'Contacto',
      legal: 'Legal',
      privacy: 'Privacidad',
      terms: 'Términos',
      cookies: 'Cookies',
      followUs: 'Síguenos',
      allRights: 'Todos los derechos reservados',
      tagline: 'Ciencia con IA - Educación del futuro',
    },
    en: {
      madeWith: 'Made with',
      by: 'by Ismaín',
      quickLinks: 'Quick Links',
      home: 'Home',
      classes: 'Classes',
      university: 'University',
      prices: 'Pricing',
      contact: 'Contact',
      legal: 'Legal',
      privacy: 'Privacy',
      terms: 'Terms',
      cookies: 'Cookies',
      followUs: 'Follow Us',
      allRights: 'All rights reserved',
      tagline: 'Science with AI - Education of the future',
    }
  }

  const t = translations[language]

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 dark:from-[#0a0f1c] dark:via-[#0d1526] dark:to-[#0a0f1c] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Logo y descripción */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-3 group">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <svg viewBox="0 0 200 200" className="w-12 h-12">
                  <defs>
                    <linearGradient id="flaskGradientFooter" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#3B82F6', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#06B6D4', stopOpacity: 1 }} />
                    </linearGradient>
                  </defs>
                  <path d="M80 40 L80 80 L50 140 L150 140 L120 80 L120 40 Z" fill="url(#flaskGradientFooter)" stroke="#06B6D4" strokeWidth="3"/>
                  <path d="M60 120 L140 120 Q135 110 130 105 L70 105 Q65 110 60 120" fill="#06B6D4" opacity="0.9"/>
                  <circle cx="90" cy="110" r="4" fill="white" opacity="0.9">
                    <animate attributeName="cy" values="110;105;110" dur="2s" repeatCount="indefinite"/>
                  </circle>
                  <circle cx="105" cy="105" r="3" fill="white" opacity="0.7">
                    <animate attributeName="cy" values="105;100;105" dur="2.5s" repeatCount="indefinite"/>
                  </circle>
                  <rect x="92" y="20" width="16" height="20" fill="#3B82F6" stroke="#06B6D4" strokeWidth="2" rx="2"/>
                </svg>
              </motion.div>
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Academia ILM
              </span>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed">
              {t.tagline}
            </p>
          </div>

          {/* Enlaces Rápidos */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-cyan-400">{t.quickLinks}</h3>
            <ul className="space-y-2">
              <FooterLink to="/">{t.home}</FooterLink>
              <FooterLink to="/clases">{t.classes}</FooterLink>
              <FooterLink to="/universidad">{t.university}</FooterLink>
              <FooterLink to="/precios">{t.prices}</FooterLink>
              <FooterLink to="/contacto">{t.contact}</FooterLink>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-cyan-400">{t.legal}</h3>
            <ul className="space-y-2">
              <FooterLink to="/privacidad">{t.privacy}</FooterLink>
              <FooterLink to="/terminos">{t.terms}</FooterLink>
              <FooterLink to="/cookies">{t.cookies}</FooterLink>
            </ul>
          </div>

          {/* Redes Sociales */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-cyan-400">{t.followUs}</h3>
            <div className="flex gap-4">
              <SocialIcon 
                href="https://twitter.com" 
                icon="twitter"
                label="Twitter"
              />
              <SocialIcon 
                href="https://instagram.com" 
                icon="instagram"
                label="Instagram"
              />
              <SocialIcon 
                href="https://linkedin.com" 
                icon="linkedin"
                label="LinkedIn"
              />
              <SocialIcon 
                href="https://youtube.com" 
                icon="youtube"
                label="YouTube"
              />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 dark:border-gray-800 my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>
            © {currentYear} Academia ILM. {t.allRights}.
          </p>
          
          {/* Hecho con Amor por Ismaín */}
          <motion.div 
            className="flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span>{t.madeWith}</span>
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
              }}
              transition={{ 
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <HeartIcon className="w-5 h-5 text-red-500" />
            </motion.div>
            <span className="font-semibold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              {t.by}
            </span>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}

// Footer Link Component
function FooterLink({ to, children }) {
  return (
    <li>
      <Link 
        to={to}
        className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 text-sm flex items-center group"
      >
        <motion.span
          className="inline-block mr-2 opacity-0 group-hover:opacity-100 transition-opacity"
          initial={false}
        >
          →
        </motion.span>
        {children}
      </Link>
    </li>
  )
}

// Social Icon Component
function SocialIcon({ href, icon, label }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 transition-all duration-300"
    >
      <SocialSVG type={icon} />
    </motion.a>
  )
}

// Social SVG Icons
function SocialSVG({ type }) {
  const icons = {
    twitter: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
      </svg>
    ),
    instagram: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
    linkedin: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    youtube: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  }
  return icons[type] || icons.twitter
}

// Heart Icon Component (Animated)
function HeartIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  )
}