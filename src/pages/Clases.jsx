import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { Link } from 'react-router-dom'

export default function Clases() {
  const { language } = useApp()
  const [activeTab, setActiveTab] = useState('eso')
  const [flippedCard, setFlippedCard] = useState(null)

  const translations = {
    es: {
      title: 'Nuestras Clases',
      subtitle: 'Educación científica de excelencia con metodología innovadora e IA',
      eso: 'ESO',
      bachillerato: 'Bachillerato',
      universidad: 'Universidad',
      programacion: 'Programación',
      freeClass: 'Solicitar Clase Gratuita',
      ctaTitle: '¿Listo para empezar?',
      ctaSubtitle: 'Solicita una clase gratuita y descubre cómo nuestra metodología puede ayudarte a alcanzar tus objetivos',
      bilingual: 'Contenido Bilingüe',
      aiPowered: 'Potenciado con IA',
      seeMore: 'Ver más',
      viewCourse: 'Ver curso',
      // Materias ESO
      matematicas_eso: 'Matemáticas ESO',
      matematicas_eso_desc: 'Álgebra, geometría y estadística adaptada a tu nivel',
      fisica_quimica_eso: 'Física y Química',
      fisica_quimica_eso_desc: 'Experimentos y conceptos fundamentales de la ciencia',
      biologia_eso: 'Biología y Geología',
      biologia_eso_desc: 'Explora el mundo natural y la vida en la Tierra',
      tecnologia_eso: 'Tecnología',
      tecnologia_eso_desc: 'Robótica, programación básica y pensamiento computacional',
      // Materias Bachillerato
      matematicas_bach: 'Matemáticas',
      matematicas_bach_desc: 'Cálculo diferencial e integral, álgebra lineal',
      fisica_bach: 'Física',
      fisica_bach_desc: 'Mecánica, termodinámica, electromagnetismo y física moderna',
      quimica_bach: 'Química',
      quimica_bach_desc: 'Química orgánica, inorgánica y análisis químico',
      biologia_bach: 'Biología',
      biologia_bach_desc: 'Biología celular, genética y evolución',
      // Materias Universidad
      calculo: 'Cálculo Avanzado',
      calculo_desc: 'Cálculo multivariable, ecuaciones diferenciales',
      fisica_i: 'Física I y II',
      fisica_i_desc: 'Física universitaria, mecánica cuántica',
      quimica_org: 'Química Orgánica',
      quimica_org_desc: 'Reacciones, síntesis y mecanismos orgánicos',
      estadistica: 'Estadística',
      estadistica_desc: 'Probabilidad, inferencia estadística y análisis de datos',
      // Programación
      python: 'Python',
      python_desc: 'Desde básico hasta avanzado, IA y Data Science',
      javascript: 'JavaScript & React',
      javascript_desc: 'Desarrollo web moderno y aplicaciones interactivas',
      algoritmos: 'Algoritmos y Estructuras',
      algoritmos_desc: 'Optimización, complejidad y resolución de problemas',
      ia_ml: 'IA y Machine Learning',
      ia_ml_desc: 'Redes neuronales, deep learning y aplicaciones prácticas',
    },
    en: {
      title: 'Our Classes',
      subtitle: 'Excellence in scientific education with innovative methodology and AI',
      eso: 'Middle School',
      bachillerato: 'High School',
      universidad: 'University',
      programacion: 'Programming',
      freeClass: 'Request Free Class',
      ctaTitle: 'Ready to start?',
      ctaSubtitle: 'Request a free class and discover how our methodology can help you achieve your goals',
      bilingual: 'Bilingual Content',
      aiPowered: 'AI Powered',
      seeMore: 'See more',
      viewCourse: 'View course',
      matematicas_eso: 'Mathematics',
      matematicas_eso_desc: 'Algebra, geometry and statistics adapted to your level',
      fisica_quimica_eso: 'Physics & Chemistry',
      fisica_quimica_eso_desc: 'Experiments and fundamental science concepts',
      biologia_eso: 'Biology & Geology',
      biologia_eso_desc: 'Explore the natural world and life on Earth',
      tecnologia_eso: 'Technology',
      tecnologia_eso_desc: 'Robotics, basic programming and computational thinking',
      matematicas_bach: 'Mathematics',
      matematicas_bach_desc: 'Differential and integral calculus, linear algebra',
      fisica_bach: 'Physics',
      fisica_bach_desc: 'Mechanics, thermodynamics, electromagnetism and modern physics',
      quimica_bach: 'Chemistry',
      quimica_bach_desc: 'Organic, inorganic chemistry and chemical analysis',
      biologia_bach: 'Biology',
      biologia_bach_desc: 'Cell biology, genetics and evolution',
      calculo: 'Advanced Calculus',
      calculo_desc: 'Multivariable calculus, differential equations',
      fisica_i: 'Physics I & II',
      fisica_i_desc: 'University physics, quantum mechanics',
      quimica_org: 'Organic Chemistry',
      quimica_org_desc: 'Reactions, synthesis and organic mechanisms',
      estadistica: 'Statistics',
      estadistica_desc: 'Probability, statistical inference and data analysis',
      python: 'Python',
      python_desc: 'From basic to advanced, AI and Data Science',
      javascript: 'JavaScript & React',
      javascript_desc: 'Modern web development and interactive applications',
      algoritmos: 'Algorithms & Structures',
      algoritmos_desc: 'Optimization, complexity and problem solving',
      ia_ml: 'AI & Machine Learning',
      ia_ml_desc: 'Neural networks, deep learning and practical applications',
    }
  }

  const t = translations[language]

  const subjects = {
    eso: [
      { 
        id: 1, 
        title: t.matematicas_eso, 
        description: t.matematicas_eso_desc,
        icon: 'ruler',
        gradient: 'from-blue-500 to-cyan-500',
        topics: ['Álgebra', 'Geometría', 'Funciones', 'Estadística']
      },
      { 
        id: 2, 
        title: t.fisica_quimica_eso, 
        description: t.fisica_quimica_eso_desc,
        icon: 'flask',
        gradient: 'from-purple-500 to-pink-500',
        topics: ['Materia', 'Energía', 'Reacciones', 'Electricidad']
      },
      { 
        id: 3, 
        title: t.biologia_eso, 
        description: t.biologia_eso_desc,
        icon: 'dna',
        gradient: 'from-green-500 to-emerald-500',
        topics: ['Célula', 'Ecosistemas', 'Evolución', 'Geología']
      },
      { 
        id: 4, 
        title: t.tecnologia_eso, 
        description: t.tecnologia_eso_desc,
        icon: 'robot',
        gradient: 'from-orange-500 to-red-500',
        topics: ['Robótica', 'Programación', 'Diseño 3D', 'Electrónica']
      },
    ],
    bachillerato: [
      { 
        id: 5, 
        title: t.matematicas_bach, 
        description: t.matematicas_bach_desc,
        icon: 'integral',
        gradient: 'from-blue-600 to-indigo-600',
        topics: ['Cálculo', 'Álgebra Lineal', 'Probabilidad', 'Análisis']
      },
      { 
        id: 6, 
        title: t.fisica_bach, 
        description: t.fisica_bach_desc,
        icon: 'atom',
        gradient: 'from-purple-600 to-blue-600',
        topics: ['Mecánica', 'Ondas', 'Electromagnetismo', 'Cuántica']
      },
      { 
        id: 7, 
        title: t.quimica_bach, 
        description: t.quimica_bach_desc,
        icon: 'test-tube',
        gradient: 'from-pink-600 to-rose-600',
        topics: ['Orgánica', 'Inorgánica', 'Termodinámica', 'Cinética']
      },
      { 
        id: 8, 
        title: t.biologia_bach, 
        description: t.biologia_bach_desc,
        icon: 'microscope',
        gradient: 'from-green-600 to-teal-600',
        topics: ['Genética', 'Bioquímica', 'Microbiología', 'Evolución']
      },
    ],
    universidad: [
      { 
        id: 9, 
        title: t.calculo, 
        description: t.calculo_desc,
        icon: 'nabla',
        gradient: 'from-indigo-700 to-purple-700',
        topics: ['Multivariable', 'Ec. Diferenciales', 'Series', 'Transformadas']
      },
      { 
        id: 10, 
        title: t.fisica_i, 
        description: t.fisica_i_desc,
        icon: 'lightning',
        gradient: 'from-blue-700 to-cyan-700',
        topics: ['Mecánica Clásica', 'Relatividad', 'Cuántica', 'Campos']
      },
      { 
        id: 11, 
        title: t.quimica_org, 
        description: t.quimica_org_desc,
        icon: 'hexagon',
        gradient: 'from-rose-700 to-pink-700',
        topics: ['Síntesis', 'Mecanismos', 'Espectroscopia', 'Estereoquímica']
      },
      { 
        id: 12, 
        title: t.estadistica, 
        description: t.estadistica_desc,
        icon: 'chart',
        gradient: 'from-emerald-700 to-green-700',
        topics: ['Inferencia', 'Regresión', 'ANOVA', 'Big Data']
      },
    ],
    programacion: [
      { 
        id: 13, 
        title: t.python, 
        description: t.python_desc,
        icon: 'python',
        gradient: 'from-yellow-600 to-green-600',
        topics: ['POO', 'Pandas', 'NumPy', 'TensorFlow']
      },
      { 
        id: 14, 
        title: t.javascript, 
        description: t.javascript_desc,
        icon: 'react',
        gradient: 'from-cyan-600 to-blue-600',
        topics: ['ES6+', 'React', 'Next.js', 'TypeScript']
      },
      { 
        id: 15, 
        title: t.algoritmos, 
        description: t.algoritmos_desc,
        icon: 'target',
        gradient: 'from-purple-600 to-indigo-600',
        topics: ['Complejidad', 'Grafos', 'Árboles', 'Optimización']
      },
      { 
        id: 16, 
        title: t.ia_ml, 
        description: t.ia_ml_desc,
        icon: 'brain',
        gradient: 'from-pink-600 to-purple-600',
        topics: ['Neural Networks', 'Deep Learning', 'NLP', 'Computer Vision']
      },
    ],
  }

  const tabs = [
    { id: 'eso', label: t.eso, icon: 'book' },
    { id: 'bachillerato', label: t.bachillerato, icon: 'graduation' },
    { id: 'universidad', label: t.universidad, icon: 'university' },
    { id: 'programacion', label: t.programacion, icon: 'code' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50 dark:from-[#0a0f1c] dark:via-[#0d1526] dark:to-[#0a0f1c] pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 md:mb-16"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 md:mb-6 px-4">
            <span className="bg-gradient-to-r from-[#1E40AF] via-[#3B82F6] to-[#06B6D4] bg-clip-text text-transparent">
              {t.title}
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-6 md:mb-8 px-4">
            {t.subtitle}
          </p>
          
          {/* Badges */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-6 md:mb-8 px-4">
            <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full font-semibold flex items-center gap-2 text-sm sm:text-base">
              <GlobeIcon className="w-5 h-5" />
              {t.bilingual}
            </span>
            <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full font-semibold flex items-center gap-2 text-sm sm:text-base">
              <SparklesIcon className="w-5 h-5" />
              {t.aiPowered}
            </span>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-8 md:mb-12 px-4"
        >
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id)
                setFlippedCard(null)
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-bold text-sm sm:text-base md:text-lg transition-all duration-300 flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white shadow-lg shadow-blue-500/50'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <TabIcon type={tab.icon} className="w-5 h-5" />
              {tab.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
          >
            {subjects[activeTab].map((subject, index) => (
              <SubjectCard
                key={subject.id}
                subject={subject}
                index={index}
                isFlipped={flippedCard === subject.id}
                onFlip={() => setFlippedCard(flippedCard === subject.id ? null : subject.id)}
                t={t}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 md:mt-20 text-center px-4"
        >
          <div className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] rounded-2xl md:rounded-3xl p-8 md:p-12 shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 md:mb-4">
              {t.ctaTitle}
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-6 md:mb-8 max-w-2xl mx-auto">
              {t.ctaSubtitle}
            </p>
            <Link to="/contacto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 md:px-10 py-3 md:py-4 bg-white text-[#3B82F6] font-bold text-base md:text-lg rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg"
              >
                {t.freeClass} →
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// Subject Card Component
function SubjectCard({ subject, index, isFlipped, onFlip, t }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="h-72 sm:h-80"
      style={{ perspective: '1000px' }}
    >
      <motion.div
        className="relative w-full h-full cursor-pointer"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        style={{ transformStyle: "preserve-3d" }}
        onClick={onFlip}
      >
        {/* Front */}
        <div 
          className="absolute w-full h-full"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          <div className={`h-full bg-gradient-to-br ${subject.gradient} rounded-2xl p-4 sm:p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between`}>
            <div>
              <div className="mb-4">
                <SubjectIcon type={subject.icon} className="w-16 h-16 sm:w-20 sm:h-20 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">
                {subject.title}
              </h3>
              <p className="text-white/90 text-xs sm:text-sm leading-relaxed">
                {subject.description}
              </p>
            </div>
            <div className="text-white/80 text-xs sm:text-sm font-semibold mt-4">
              {t.seeMore} →
            </div>
          </div>
        </div>

        {/* Back */}
        <div 
          className="absolute w-full h-full"
          style={{ 
            backfaceVisibility: 'hidden', 
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)' 
          }}
        >
          <div className="h-full bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-xl flex flex-col justify-between border-2 border-gray-200 dark:border-gray-700">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white mb-3 sm:mb-4">
                {subject.title}
              </h3>
              <ul className="space-y-1.5 sm:space-y-2">
                {subject.topics.map((topic, i) => (
                  <li key={i} className="flex items-center text-sm sm:text-base text-gray-600 dark:text-gray-300">
                    <span className="mr-2 text-[#3B82F6] font-bold">✓</span>
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
            <Link 
              to="/login"
              onClick={(e) => e.stopPropagation()}
              className="block"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-2 bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white font-bold rounded-lg hover:shadow-lg transition-all duration-300"
              >
                {t.viewCourse} →
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ICONOS SVG PERSONALIZADOS

function SubjectIcon({ type, className }) {
  const icons = {
    ruler: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M21.71 3.29a1 1 0 0 0-1.42 0l-18 18a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l18-18a1 1 0 0 0 0-1.42zM7 5.83l1.59 1.59-1.42 1.41L5.59 7.24zM5.41 9.76l1.59 1.59-1.42 1.41-1.59-1.59zM3.83 13.24l1.59 1.59-1.42 1.41-1.59-1.59zM14.76 18.59l1.59 1.59-1.42 1.41-1.59-1.59zM9.17 15l1.59 1.59-1.42 1.41L7.76 16.41zM18.24 20.17l1.59 1.59-1.42 1.41-1.59-1.59z"/>
      </svg>
    ),
    flask: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M9 3v1H8c-.55 0-1 .45-1 1v1c0 .55.45 1 1 1h1v3.14c0 .41-.16.8-.44 1.09L5 14.89C4.36 15.61 4 16.54 4 17.5 4 19.43 5.57 21 7.5 21h9c1.93 0 3.5-1.57 3.5-3.5 0-.96-.36-1.89-1-2.61l-3.56-3.66A1.49 1.49 0 0 1 15 10.14V7h1c.55 0 1-.45 1-1V5c0-.55-.45-1-1-1h-1V3H9zm1 2h4v2H10V5zm4 11.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
      </svg>
    ),
    dna: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M4 2h2v2c0 5.5 4.5 10 10 10v2c-6.63 0-12-5.37-12-12V2m16 0h2v2c0 6.63-5.37 12-12 12v-2c5.5 0 10-4.5 10-10V2M9 7c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1m6 0c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1M6 12c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1m12 0c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1M9 17c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1m6 0c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z"/>
      </svg>
    ),
    robot: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2M7.5 13A2.5 2.5 0 0 0 5 15.5 2.5 2.5 0 0 0 7.5 18a2.5 2.5 0 0 0 2.5-2.5A2.5 2.5 0 0 0 7.5 13m9 0a2.5 2.5 0 0 0-2.5 2.5 2.5 2.5 0 0 0 2.5 2.5 2.5 2.5 0 0 0 2.5-2.5 2.5 2.5 0 0 0-2.5-2.5z"/>
      </svg>
    ),
    integral: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M10.5 3A3.5 3.5 0 0 0 7 6.5v11A3.5 3.5 0 0 0 10.5 21h1.25v-2H10.5A1.5 1.5 0 0 1 9 17.5v-11A1.5 1.5 0 0 1 10.5 5h1.25V3H10.5z"/>
        <text x="14" y="17" fontSize="12" fontWeight="bold">∫</text>
      </svg>
    ),
    atom: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <circle cx="12" cy="12" r="2"/>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
        <ellipse cx="12" cy="12" rx="9" ry="3.5" fill="none" stroke="currentColor" strokeWidth="1.5" transform="rotate(45 12 12)"/>
        <ellipse cx="12" cy="12" rx="9" ry="3.5" fill="none" stroke="currentColor" strokeWidth="1.5" transform="rotate(-45 12 12)"/>
      </svg>
    ),
    'test-tube': (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M7 2v2h1v14c0 2.21 1.79 4 4 4s4-1.79 4-4V4h1V2H7m4 14c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1m2-4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
      </svg>
    ),
    microscope: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M9.46 6.28L11.05 8c-1.08.58-1.77 1.78-1.63 3.13.2 1.88 1.88 3.31 3.75 3.31 2.21 0 4-1.79 4-4 0-1.86-1.28-3.41-3-3.86l-.17-.17c-.39-.38-.39-1 0-1.38L15.17 4 13.6 2.45c-.39-.38-.39-1 0-1.38l.71-.71L21 7l-.71.71c-.38.39-1 .39-1.38 0L17.62 6.4l-1.17 1.17c-.38.39-1 .39-1.38 0l-.17-.17c-.45 1.72-1.93 3-3.75 3-2.21 0-4-1.79-4-4 0-1.82 1.28-3.3 3-3.75l-.17-.17c-.39-.38-.39-1 0-1.38L11.27 0l-.71.71c-.39.38-.39 1 0 1.38l1.17 1.17c.39.39.39 1 0 1.38l-.27.27zM18 13v-2h-5c0-1.1-.9-2-2-2H3c-1.1 0-2 .9-2 2v7c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v-1h2v2h3v-6z"/>
      </svg>
    ),
    nabla: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <text x="5" y="18" fontSize="18" fontWeight="bold">∇</text>
      </svg>
    ),
    lightning: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z"/>
      </svg>
    ),
    hexagon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M21 16.5c0 .38-.21.71-.53.88l-7.9 4.44c-.16.12-.36.18-.57.18-.21 0-.41-.06-.57-.18l-7.9-4.44A.991.991 0 0 1 3 16.5v-9c0-.38.21-.71.53-.88l7.9-4.44c.16-.12.36-.18.57-.18.21 0 .41.06.57.18l7.9 4.44c.32.17.53.5.53.88v9z"/>
      </svg>
    ),
    chart: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
      </svg>
    ),
    python: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M9.585 11.692h4.328s2.432.039 2.432-2.35V5.391S16.714 3 11.936 3C7.362 3 7.647 4.983 7.647 4.983l.006 2.055h4.363v.617H5.92s-3.24-.37-3.24 4.692c0 5.062 2.841 4.883 2.841 4.883h1.694v-2.377s-.092-2.161 2.37-2.161zm-.419-6.838c-.36 0-.652-.31-.652-.692s.292-.692.652-.692.652.31.652.692-.292.692-.652.692z"/>
        <path d="M14.415 12.308h-4.328s-2.432-.04-2.432 2.35v3.951s-.369 2.391 4.409 2.391c4.574 0 4.289-1.983 4.289-1.983l-.006-2.055h-4.363v-.617h6.096s3.24.37 3.24-4.692c0-5.062-2.841-4.883-2.841-4.883H16.78v2.377s.092 2.161-2.365 2.161zm.419 6.838c.36 0 .652.31.652.692s-.292.692-.652.692-.652-.31-.652-.692.292-.692.652-.692z"/>
      </svg>
    ),
    react: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <circle cx="12" cy="12" r="2"/>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
        <ellipse cx="12" cy="12" rx="9" ry="3" fill="none" stroke="currentColor" strokeWidth="1.5"/>
        <ellipse cx="12" cy="12" rx="9" ry="3" fill="none" stroke="currentColor" strokeWidth="1.5" transform="rotate(60 12 12)"/>
        <ellipse cx="12" cy="12" rx="9" ry="3" fill="none" stroke="currentColor" strokeWidth="1.5" transform="rotate(-60 12 12)"/>
      </svg>
    ),
    target: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <circle cx="12" cy="12" r="2"/>
        <circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" strokeWidth="2"/>
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    brain: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M21.33 12.91c.09 1.55-.62 3.04-1.89 3.95l.77 1.49c-.17.02-.34.05-.52.05-1.24 0-2.45-.5-3.33-1.41-.91.74-2.05 1.15-3.24 1.15-1.38 0-2.67-.53-3.63-1.5-.96.97-2.25 1.5-3.63 1.5-1.85 0-3.46-1.25-3.9-3.06-.48.23-.98.36-1.49.36-.23 0-.46-.02-.69-.07.08-1.1.67-2.09 1.57-2.67C1.17 11.07 1 10.05 1 9c0-3.86 3.14-7 7-7 1.99 0 3.79.83 5.07 2.17C14.35 2.83 16.15 2 18.14 2c3.86 0 7 3.14 7 7 0 1.05-.17 2.07-.51 3l.7 1.91z"/>
      </svg>
    ),
  }
  return icons[type] || icons.ruler
}

function TabIcon({ type, className }) {
  const icons = {
    book: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/>
      </svg>
    ),
    graduation: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
      </svg>
    ),
    university: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
      </svg>
    ),
    code: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
      </svg>
    ),
  }
  return icons[type] || icons.book
}

function GlobeIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
    </svg>
  )
}

function SparklesIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2l2.4 7.2H22l-6 4.8 2.4 7.2L12 16.8 5.6 21.2 8 14l-6-4.8h7.6z"/>
      <path d="M19 8l1.2 3.6h3.6l-3 2.4 1.2 3.6-3-2.4-3 2.4 1.2-3.6-3-2.4h3.6z" opacity="0.7"/>
    </svg>
  )
}