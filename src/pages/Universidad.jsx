import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { Link } from 'react-router-dom'

export default function Universidad() {
  const { language } = useApp()
  const [activeProgram, setActiveProgram] = useState('ciencias')

  const translations = {
    es: {
      title: 'Educación Universitaria',
      subtitle: 'Formación especializada para carreras científicas y tecnológicas de alto nivel',
      programsTitle: 'Programas Disponibles',
      whyUs: '¿Por qué ILM University?',
      benefits: [
        'Metodología única con IA personalizada',
        'Profesores expertos con experiencia real',
        'Contenido actualizado constantemente',
        'Flexibilidad horaria total',
        'Certificaciones oficiales',
        'Comunidad activa de estudiantes'
      ],
      ctaTitle: '¿Listo para el siguiente nivel?',
      ctaDesc: 'Solicita información y descubre cómo podemos ayudarte a alcanzar tus objetivos universitarios',
      requestInfo: 'Solicitar Información',
      viewCurriculum: 'Ver Plan de Estudios',
      // Programas
      ciencias: 'Ciencias',
      ciencias_desc: 'Física, Química, Biología y Matemáticas avanzadas',
      ingenieria: 'Ingeniería',
      ingenieria_desc: 'Preparación para carreras técnicas y de ingeniería',
      medicina: 'Ciencias de la Salud',
      medicina_desc: 'Química Orgánica, Bioquímica y preparación sanitaria',
      data: 'Data Science',
      data_desc: 'Estadística, Machine Learning y Análisis de Datos',
    },
    en: {
      title: 'University Education',
      subtitle: 'Specialized training for high-level scientific and technological careers',
      programsTitle: 'Available Programs',
      whyUs: 'Why ILM University?',
      benefits: [
        'Unique methodology with personalized AI',
        'Expert teachers with real experience',
        'Constantly updated content',
        'Total schedule flexibility',
        'Official certifications',
        'Active student community'
      ],
      ctaTitle: 'Ready for the next level?',
      ctaDesc: 'Request information and discover how we can help you achieve your university goals',
      requestInfo: 'Request Information',
      viewCurriculum: 'View Curriculum',
      ciencias: 'Sciences',
      ciencias_desc: 'Advanced Physics, Chemistry, Biology and Mathematics',
      ingenieria: 'Engineering',
      ingenieria_desc: 'Preparation for technical and engineering careers',
      medicina: 'Health Sciences',
      medicina_desc: 'Organic Chemistry, Biochemistry and health preparation',
      data: 'Data Science',
      data_desc: 'Statistics, Machine Learning and Data Analysis',
    }
  }

  const t = translations[language]

  const programs = [
    {
      id: 'ciencias',
      title: t.ciencias,
      description: t.ciencias_desc,
      icon: 'atom',
      gradient: 'from-blue-600 to-indigo-600',
      subjects: ['Física Avanzada', 'Química Orgánica', 'Cálculo Multivariable', 'Álgebra Lineal']
    },
    {
      id: 'ingenieria',
      title: t.ingenieria,
      description: t.ingenieria_desc,
      icon: 'cog',
      gradient: 'from-purple-600 to-pink-600',
      subjects: ['Mecánica', 'Termodinámica', 'Circuitos', 'Programación']
    },
    {
      id: 'medicina',
      title: t.medicina,
      description: t.medicina_desc,
      icon: 'heart',
      gradient: 'from-red-600 to-rose-600',
      subjects: ['Bioquímica', 'Química Orgánica', 'Fisiología', 'Anatomía']
    },
    {
      id: 'data',
      title: t.data,
      description: t.data_desc,
      icon: 'chart',
      gradient: 'from-green-600 to-emerald-600',
      subjects: ['Estadística', 'Python', 'Machine Learning', 'Big Data']
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50 to-blue-50 dark:from-[#0a0f1c] dark:via-[#0d1526] dark:to-[#0a0f1c] pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="inline-block mb-6"
          >
            <UniversityIcon className="w-20 h-20 sm:w-24 sm:h-24 text-indigo-600 dark:text-indigo-400" />
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 md:mb-6">
            <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 dark:from-indigo-400 dark:via-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
              {t.title}
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Programs Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-800 dark:text-white">
            {t.programsTitle}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs.map((program, index) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.03, y: -5 }}
                onClick={() => setActiveProgram(program.id)}
                className={`cursor-pointer rounded-2xl p-6 transition-all duration-300 ${
                  activeProgram === program.id
                    ? 'bg-gradient-to-br ' + program.gradient + ' text-white shadow-2xl'
                    : 'bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl'
                }`}
              >
                <div className="mb-4">
                  <ProgramIcon type={program.icon} className="w-12 h-12" active={activeProgram === program.id} />
                </div>
                <h3 className={`text-xl font-bold mb-2 ${activeProgram === program.id ? 'text-white' : 'text-gray-800 dark:text-white'}`}>
                  {program.title}
                </h3>
                <p className={`text-sm ${activeProgram === program.id ? 'text-white/90' : 'text-gray-600 dark:text-gray-400'}`}>
                  {program.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Selected Program Details */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProgram}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 mb-16"
          >
            <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
              Asignaturas del programa {programs.find(p => p.id === activeProgram)?.title}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {programs.find(p => p.id === activeProgram)?.subjects.map((subject, index) => (
                <motion.div
                  key={subject}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 p-4 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-xl"
                >
                  <CheckIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{subject}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8 flex flex-col sm:flex-row gap-4"
            >
              <Link to="/contacto" className="flex-1">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 px-6 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  {t.viewCurriculum} →
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Why Us Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-800 dark:text-white">
            {t.whyUs}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {t.benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="flex items-start gap-4 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg"
              >
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center">
                    <CheckIcon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 font-medium">{benefit}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-3xl p-8 md:p-12 text-center shadow-2xl"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t.ctaTitle}
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            {t.ctaDesc}
          </p>
          <Link to="/contacto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-white text-indigo-600 font-bold text-lg rounded-xl shadow-lg hover:bg-gray-100 transition-all"
            >
              {t.requestInfo} →
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

// Icons
function UniversityIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
    </svg>
  )
}

function ProgramIcon({ type, className, active }) {
  const color = active ? 'text-white' : 'text-gray-600 dark:text-gray-400'
  
  const icons = {
    atom: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={`${className} ${color}`}>
        <circle cx="12" cy="12" r="2"/>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
        <ellipse cx="12" cy="12" rx="9" ry="3.5" fill="none" stroke="currentColor" strokeWidth="1.5" transform="rotate(45 12 12)"/>
        <ellipse cx="12" cy="12" rx="9" ry="3.5" fill="none" stroke="currentColor" strokeWidth="1.5" transform="rotate(-45 12 12)"/>
      </svg>
    ),
    cog: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={`${className} ${color}`}>
        <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
      </svg>
    ),
    heart: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={`${className} ${color}`}>
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
    ),
    chart: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={`${className} ${color}`}>
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
      </svg>
    ),
  }
  return icons[type] || icons.atom
}

function CheckIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={className}>
      <path d="M20 6L9 17l-5-5"/>
    </svg>
  )
}