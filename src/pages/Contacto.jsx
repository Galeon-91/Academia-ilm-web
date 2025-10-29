import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useApp } from '../context/AppContext'

export default function Contacto() {
  const { language } = useApp()
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    asunto: '',
    mensaje: ''
  })
  const [claseGratisData, setClaseGratisData] = useState({
    nombre: '',
    email: '',
    nivel: '',
    materia: '',
    horario: ''
  })

  const translations = {
    es: {
      title: 'Contáctanos',
      subtitle: 'Estamos aquí para ayudarte. Envíanos tu consulta y te responderemos lo antes posible',
      mainForm: 'Formulario de Contacto',
      freeClass: 'Solicitar Clase Gratuita',
      contactInfo: 'Información de Contacto',
      nombre: 'Nombre completo',
      email: 'Email',
      telefono: 'Teléfono (opcional)',
      asunto: 'Asunto',
      mensaje: 'Mensaje',
      enviar: 'Enviar Mensaje',
      asuntos: {
        info: 'Solicitar información',
        precios: 'Consulta sobre precios',
        tecnico: 'Soporte técnico',
        otro: 'Otro'
      },
      nivel: 'Nivel educativo',
      materia: 'Materia de interés',
      horario: 'Horario preferido',
      solicitar: 'Solicitar Clase',
      niveles: {
        eso: 'ESO',
        bachillerato: 'Bachillerato',
        universidad: 'Universidad',
        programacion: 'Programación'
      },
      horarios: {
        manana: 'Mañana (9:00 - 14:00)',
        tarde: 'Tarde (16:00 - 20:00)',
        noche: 'Noche (20:00 - 22:00)'
      },
      emailLabel: 'Email',
      telefonoLabel: 'Teléfono',
      ubicacionLabel: 'Ubicación',
      emailValue: 'info@academiailm.com',
      telefonoValue: '+34 638448778',
      ubicacionValue: 'Málaga, España',
      siguenos: 'Síguenos',
      exitoEnvio: '¡Mensaje enviado con éxito!',
      exitoClase: '¡Solicitud enviada! Te contactaremos pronto.',
    },
    en: {
      title: 'Contact Us',
      subtitle: 'We are here to help. Send us your inquiry and we will respond as soon as possible',
      mainForm: 'Contact Form',
      freeClass: 'Request Free Class',
      contactInfo: 'Contact Information',
      nombre: 'Full name',
      email: 'Email',
      telefono: 'Phone (optional)',
      asunto: 'Subject',
      mensaje: 'Message',
      enviar: 'Send Message',
      asuntos: {
        info: 'Request information',
        precios: 'Pricing inquiry',
        tecnico: 'Technical support',
        otro: 'Other'
      },
      nivel: 'Educational level',
      materia: 'Subject of interest',
      horario: 'Preferred schedule',
      solicitar: 'Request Class',
      niveles: {
        eso: 'Middle School',
        bachillerato: 'High School',
        universidad: 'University',
        programacion: 'Programming'
      },
      horarios: {
        manana: 'Morning (9:00 - 14:00)',
        tarde: 'Afternoon (16:00 - 20:00)',
        noche: 'Evening (20:00 - 22:00)'
      },
      emailLabel: 'Email',
      telefonoLabel: 'Phone',
      ubicacionLabel: 'Location',
      emailValue: 'info@academiailm.com',
      telefonoValue: '+34 638448778',
      ubicacionValue: 'Málaga, España',
      siguenos: 'Follow Us',
      exitoEnvio: 'Message sent successfully!',
      exitoClase: 'Request sent! We will contact you soon.',
    }
  }

  const t = translations[language]

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Formulario contacto:', formData)
    alert(t.exitoEnvio)
    setFormData({ nombre: '', email: '', telefono: '', asunto: '', mensaje: '' })
  }

  const handleClaseGratis = (e) => {
    e.preventDefault()
    console.log('Solicitud clase gratis:', claseGratisData)
    alert(t.exitoClase)
    setClaseGratisData({ nombre: '', email: '', nivel: '', materia: '', horario: '' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50 dark:from-[#0a0f1c] dark:via-[#0d1526] dark:to-[#0a0f1c] pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16 md:pb-20 px-3 sm:px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Hero - responsive */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="inline-block mb-4 sm:mb-6"
          >
            <MessageIcon className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-blue-600 dark:text-blue-400" />
          </motion.div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 md:mb-6 px-4">
            <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 dark:from-blue-400 dark:via-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
              {t.title}
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Main Content - responsive grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          
          {/* Formularios Column - responsive */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            
            {/* Formulario Principal */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-2xl p-5 sm:p-6 md:p-8 border border-gray-200 dark:border-gray-700"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-5 sm:mb-6 flex items-center gap-2 sm:gap-3">
                <EditIcon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" />
                {t.mainForm}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">
                      {t.nombre}
                    </label>
                    <input
                      type="text"
                      value={formData.nombre}
                      onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 dark:text-white"
                      placeholder="Juan García"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">
                      {t.email}
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 dark:text-white"
                      placeholder="juan@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">
                      {t.telefono}
                    </label>
                    <input
                      type="tel"
                      value={formData.telefono}
                      onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 dark:text-white"
                      placeholder="+34 XXX XXX XXX"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">
                      {t.asunto}
                    </label>
                    <select
                      value={formData.asunto}
                      onChange={(e) => setFormData({...formData, asunto: e.target.value})}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 dark:text-white"
                      required
                    >
                      <option value="">Selecciona...</option>
                      <option value="info">{t.asuntos.info}</option>
                      <option value="precios">{t.asuntos.precios}</option>
                      <option value="tecnico">{t.asuntos.tecnico}</option>
                      <option value="otro">{t.asuntos.otro}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">
                    {t.mensaje}
                  </label>
                  <textarea
                    value={formData.mensaje}
                    onChange={(e) => setFormData({...formData, mensaje: e.target.value})}
                    rows="5"
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 dark:text-white resize-none"
                    placeholder="Cuéntanos en qué podemos ayudarte..."
                    required
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-2.5 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <SendIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  {t.enviar}
                </motion.button>
              </form>
            </motion.div>

            {/* Formulario Clase Gratis */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl sm:rounded-3xl shadow-2xl p-5 sm:p-6 md:p-8"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-5 sm:mb-6 flex items-center gap-2 sm:gap-3">
                <GiftIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                {t.freeClass}
              </h2>

              <form onSubmit={handleClaseGratis} className="space-y-3.5 sm:space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-white mb-1.5 sm:mb-2">
                      {t.nombre}
                    </label>
                    <input
                      type="text"
                      value={claseGratisData.nombre}
                      onChange={(e) => setClaseGratisData({...claseGratisData, nombre: e.target.value})}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-white/20 border border-white/30 rounded-xl focus:ring-2 focus:ring-white text-white placeholder-white/70 backdrop-blur-sm"
                      placeholder="Tu nombre"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-white mb-1.5 sm:mb-2">
                      {t.email}
                    </label>
                    <input
                      type="email"
                      value={claseGratisData.email}
                      onChange={(e) => setClaseGratisData({...claseGratisData, email: e.target.value})}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-white/20 border border-white/30 rounded-xl focus:ring-2 focus:ring-white text-white placeholder-white/70 backdrop-blur-sm"
                      placeholder="tu@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-white mb-1.5 sm:mb-2">
                      {t.nivel}
                    </label>
                    <select
                      value={claseGratisData.nivel}
                      onChange={(e) => setClaseGratisData({...claseGratisData, nivel: e.target.value})}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-white/20 border border-white/30 rounded-xl focus:ring-2 focus:ring-white text-white backdrop-blur-sm"
                      required
                    >
                      <option value="" className="text-gray-900">Selecciona...</option>
                      <option value="eso" className="text-gray-900">{t.niveles.eso}</option>
                      <option value="bach" className="text-gray-900">{t.niveles.bachillerato}</option>
                      <option value="uni" className="text-gray-900">{t.niveles.universidad}</option>
                      <option value="prog" className="text-gray-900">{t.niveles.programacion}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-white mb-1.5 sm:mb-2">
                      {t.horario}
                    </label>
                    <select
                      value={claseGratisData.horario}
                      onChange={(e) => setClaseGratisData({...claseGratisData, horario: e.target.value})}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-white/20 border border-white/30 rounded-xl focus:ring-2 focus:ring-white text-white backdrop-blur-sm"
                      required
                    >
                      <option value="" className="text-gray-900">Selecciona...</option>
                      <option value="manana" className="text-gray-900">{t.horarios.manana}</option>
                      <option value="tarde" className="text-gray-900">{t.horarios.tarde}</option>
                      <option value="noche" className="text-gray-900">{t.horarios.noche}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-white mb-1.5 sm:mb-2">
                    {t.materia}
                  </label>
                  <input
                    type="text"
                    value={claseGratisData.materia}
                    onChange={(e) => setClaseGratisData({...claseGratisData, materia: e.target.value})}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-white/20 border border-white/30 rounded-xl focus:ring-2 focus:ring-white text-white placeholder-white/70 backdrop-blur-sm"
                    placeholder="Ej: Matemáticas, Física, Python..."
                    required
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-2.5 sm:py-3 text-sm sm:text-base bg-white text-green-600 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  {t.solicitar} →
                </motion.button>
              </form>
            </motion.div>
          </div>

          {/* Info Contacto Column - responsive */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-5 sm:space-y-6"
          >
            {/* Info Card */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-2xl p-5 sm:p-6 md:p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-5 sm:mb-6">
                {t.contactInfo}
              </h2>

              <div className="space-y-5 sm:space-y-6">
                {/* Email */}
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                    <MailIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                      {t.emailLabel}
                    </p>
                    <a href="mailto:info@academiailm.com" className="text-sm sm:text-base text-gray-800 dark:text-white font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition-colors break-all">
                      {t.emailValue}
                    </a>
                  </div>
                </div>

                {/* Teléfono */}
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                    <PhoneIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                      {t.telefonoLabel}
                    </p>
                    <a href="tel:+34638448778" className="text-sm sm:text-base text-gray-800 dark:text-white font-semibold hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                      {t.telefonoValue}
                    </a>
                  </div>
                </div>

                {/* Ubicación */}
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center flex-shrink-0">
                    <LocationIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                      {t.ubicacionLabel}
                    </p>
                    <p className="text-sm sm:text-base text-gray-800 dark:text-white font-semibold">
                      {t.ubicacionValue}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Redes Sociales - OPTIMIZADO para 4 cols en desktop */}
            <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl sm:rounded-3xl shadow-2xl p-5 sm:p-6 md:p-8">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-5 sm:mb-6 text-center">
                {t.siguenos}
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
                {[
                  { name: 'Twitter', icon: 'twitter', url: '#' },
                  { name: 'Instagram', icon: 'instagram', url: '#' },
                  { name: 'LinkedIn', icon: 'linkedin', url: '#' },
                  { name: 'YouTube', icon: 'youtube', url: '#' }
                ].map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center justify-center gap-2 p-3 sm:p-4 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all"
                  >
                    <SocialIcon type={social.icon} className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                    <span className="text-white text-xs sm:text-sm font-medium">{social.name}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

// SVG Icons
function MessageIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
    </svg>
  )
}

function EditIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
    </svg>
  )
}

function GiftIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 00-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z"/>
    </svg>
  )
}

function SendIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
    </svg>
  )
}

function MailIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
    </svg>
  )
}

function PhoneIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
    </svg>
  )
}

function LocationIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  )
}

function SocialIcon({ type, className }) {
  const icons = {
    twitter: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
    instagram: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 2A3.75 3.75 0 004 7.75v8.5A3.75 3.75 0 007.75 20h8.5A3.75 3.75 0 0020 16.25v-8.5A3.75 3.75 0 0016.25 4h-8.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6zm5.25-3.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5z"/>
      </svg>
    ),
    linkedin: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
      </svg>
    ),
    youtube: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"/>
      </svg>
    ),
  }
  return icons[type] || icons.twitter
}