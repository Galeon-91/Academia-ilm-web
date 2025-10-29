import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { motion, useReducedMotion } from 'framer-motion'
import { Sparkles, Zap, GraduationCap } from 'lucide-react'
import CtaConVideo from './../components/CtaConVideo.jsx'

/* -------------------- SVG utilies sacado de https://icon-icons.com/es/buscar/iconos/pagina+web -------------------- */
const ArrowRight = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
const BulbIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M9 18h6M8 14a6 6 0 118 0c-1.2 1-2 2-2 4H10c0-2-0.8-3-2-4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

/* -------------------- SVG de los planes (Ocean Blue por IA) -------------------- */
const IAIcon = () => (
  <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" aria-hidden="true">
    <circle cx="32" cy="32" r="28" stroke="url(#grad1)" strokeWidth="2" opacity="0.3"/>
    <circle cx="32" cy="32" r="20" stroke="url(#grad1)" strokeWidth="2"/>
    <circle cx="32" cy="32" r="12" fill="url(#grad1)" opacity="0.5"/>
    <path d="M32 8 L32 24 M32 40 L32 56 M8 32 L24 32 M40 32 L56 32" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="32" cy="32" r="4" fill="#3B82F6"/>
    <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6"/>
        <stop offset="100%" stopColor="#06B6D4"/>
      </linearGradient>
    </defs>
  </svg>
)
const MentoriasIcon = () => (
  <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" aria-hidden="true">
    <circle cx="32" cy="24" r="8" stroke="#3B82F6" strokeWidth="2" fill="url(#grad2)" opacity="0.3"/>
    <path d="M20 44 Q20 36 32 36 Q44 36 44 44 L44 52 L20 52 Z" stroke="#3B82F6" strokeWidth="2" fill="url(#grad2)" opacity="0.3"/>
    <circle cx="16" cy="28" r="6" stroke="#06B6D4" strokeWidth="2" fill="#06B6D4" opacity="0.2"/>
    <circle cx="48" cy="28" r="6" stroke="#06B6D4" strokeWidth="2" fill="#06B6D4" opacity="0.2"/>
    <defs>
      <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6"/>
        <stop offset="100%" stopColor="#06B6D4"/>
      </linearGradient>
    </defs>
  </svg>
)
const VideosIcon = () => (
  <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" aria-hidden="true">
    <rect x="8" y="16" width="48" height="32" rx="4" stroke="#3B82F6" strokeWidth="2" fill="url(#grad3)" opacity="0.2"/>
    <path d="M28 26 L38 32 L28 38 Z" fill="#3B82F6"/>
    <circle cx="16" cy="12" r="2" fill="#06B6D4"/>
    <circle cx="24" cy="12" r="2" fill="#06B6D4"/>
    <text x="44" y="14" fill="#3B82F6" fontSize="8" fontWeight="bold">ES</text>
    <text x="52" y="14" fill="#06B6D4" fontSize="8" fontWeight="bold">EN</text>
    <defs>
      <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6"/>
        <stop offset="100%" stopColor="#06B6D4"/>
      </linearGradient>
    </defs>
  </svg>
)
const ExamenesIcon = () => (
  <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" aria-hidden="true">
    <rect x="12" y="8" width="40" height="48" rx="4" stroke="#3B82F6" strokeWidth="2" fill="url(#grad4)" opacity="0.2"/>
    <path d="M20 20 L44 20 M20 28 L44 28 M20 36 L36 36" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="20" cy="44" r="2" fill="#06B6D4"/>
    <path d="M18 44 L19.5 45.5 L22 43" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <defs>
      <linearGradient id="grad4" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6"/>
        <stop offset="100%" stopColor="#06B6D4"/>
      </linearGradient>
    </defs>
  </svg>
)

/* Planes */
const ESOIcon = () => (
  <svg className="w-20 h-20" viewBox="0 0 64 64" fill="none" aria-hidden="true">
    <rect x="12" y="16" width="14" height="36" rx="2" fill="#3B82F6" opacity="0.3"/>
    <rect x="28" y="10" width="14" height="42" rx="2" fill="#06B6D4" opacity="0.4"/>
    <rect x="44" y="20" width="14" height="32" rx="2" fill="#3B82F6" opacity="0.3"/>
    <path d="M12 16 L26 16 M12 24 L26 24 M12 32 L26 32" stroke="#3B82F6" strokeWidth="1.5"/>
    <path d="M28 10 L42 10 M28 18 L42 18 M28 26 L42 26" stroke="#06B6D4" strokeWidth="1.5"/>
    <circle cx="20" cy="40" r="2" fill="#3B82F6"/>
  </svg>
)
const BachilleratoIcon = () => (
  <svg className="w-20 h-20" viewBox="0 0 64 64" fill="none" aria-hidden="true">
    <circle cx="32" cy="28" r="20" fill="url(#gradBach)" opacity="0.2"/>
    <circle cx="32" cy="28" r="16" stroke="#3B82F6" strokeWidth="2.5"/>
    <circle cx="32" cy="28" r="5" fill="#06B6D4"/>
    <path d="M32 8 L36 24 L32 28 L28 24 Z" fill="#3B82F6" opacity="0.6"/>
    <path d="M48 28 L36 32 L32 28 L36 24 Z" fill="#06B6D4" opacity="0.6"/>
    <defs>
      <radialGradient id="gradBach">
        <stop offset="0%" stopColor="#3B82F6"/>
        <stop offset="100%" stopColor="#06B6D4"/>
      </radialGradient>
    </defs>
  </svg>
)
const UniversidadIcon = () => (
  <svg className="w-20 h-20" viewBox="0 0 64 64" fill="none" aria-hidden="true">
    <rect x="14" y="36" width="36" height="20" rx="2" fill="#3B82F6" opacity="0.2"/>
    <ellipse cx="32" cy="22" rx="12" ry="6" fill="#06B6D4" opacity="0.3"/>
    <path d="M14 36 L32 22 L50 36" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="28" y="38" width="8" height="18" fill="#3B82F6" opacity="0.4"/>
    <circle cx="22" cy="44" r="2" fill="#06B6D4"/>
    <circle cx="32" cy="44" r="2" fill="#06B6D4"/>
    <circle cx="42" cy="44" r="2" fill="#06B6D4"/>
  </svg>
)

/* -------------------- Componente sexi principal -------------------- */
export default function Home() {
  const { language } = useApp()
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const reduceMotion = useReducedMotion()

  const testimonials = [
    { quote: 'Subí 2 puntos en la PEvAU gracias a los simulacros.', author: 'María García', role: 'Estudiante de Química', image: 'https://i.pravatar.cc/150?img=5' },
    { quote: 'Las mentorías personalizadas me ayudaron a entender química orgánica.', author: 'Carlos Rodríguez', role: 'Estudiante de Universidad', image: 'https://i.pravatar.cc/150?img=12' },
    { quote: 'La plataforma es súper fácil de usar y los vídeos son muy claros.', author: 'Laura Martínez', role: 'Estudiante de Bachillerato', image: 'https://i.pravatar.cc/150?img=9' },
  ]

  const translations = {
    es: {
      hero: {
        badge: 'Powered by AI',
        title: 'La academia de ciencias que combina',
        titleHighlight: 'mentoría humana e IA',
        subtitle: 'ESO, Bachillerato y Universidad. Clases en directo, simulacros, vídeos bilingües y plataforma de práctica.',
        cta1: 'Empieza gratis',
        cta2: 'Ver precios',
      },
      features: {
        ia: { title: 'IA de estudio', desc: 'Practica activa con feedback.' },
        mentorias: { title: 'Mentorías', desc: 'Practica activa con feedback.' },
        videos: { title: 'Vídeos ES/EN', desc: 'Practica activa con feedback.' },
        examenes: { title: 'Banco de exámenes', desc: 'Practica activa con feedback.' },
      },
    },
    en: {
      hero: {
        badge: 'Powered by AI',
        title: 'The science academy combining',
        titleHighlight: 'human mentorship & AI',
        subtitle: 'ESO, Bachillerato and University. Live classes, mock exams, bilingual videos and practice platform.',
        cta1: 'Start free',
        cta2: 'View pricing',
      },
      features: {
        ia: { title: 'Study AI', desc: 'Active practice with feedback.' },
        mentorias: { title: 'Mentorships', desc: 'Active practice with feedback.' },
        videos: { title: 'Videos ES/EN', desc: 'Active practice with feedback.' },
        examenes: { title: 'Exam bank', desc: 'Active practice with feedback.' },
      },
    }
  }

  const t = translations[language]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [testimonials.length])

  return (
    <div className="min-h-screen bg-white text-[#0e1a2b] dark:bg-[#1a1f2e] dark:text-white">
      {/* ========== HERO OCEAN BLUE ========== */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Gradiente animado con el colorcito de Ocean Blue */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 dark:from-[#1a1f2e] dark:via-[#1e2838] dark:to-[#1a1f2e]">
          <motion.div
            className="absolute inset-0 opacity-30"
            animate={{
              background: [
                'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 50%, rgba(6, 182, 212, 0.3) 0%, transparent 50%)',
                'radial-gradient(circle at 50% 80%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)',
                'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)',
              ]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Partículitas Ocean Blue */}
        {!reduceMotion && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(30)].map((_, i) => {
              const delay = Math.random() * 3
              const duration = 4 + Math.random() * 4
              const size = Math.random() > 0.7 ? 'w-2 h-2' : 'w-1 h-1'
              const color = Math.random() > 0.5 ? 'bg-[#3B82F6]' : 'bg-[#06B6D4]'
              return (
                <motion.div
                  key={i}
                  className={`absolute ${size} ${color} rounded-full blur-sm`}
                  animate={{
                    x: [0, Math.random() * 200 - 100],
                    y: [0, Math.random() * 200 - 100],
                    opacity: [0, 0.8, 0],
                    scale: [0, 1.5, 0]
                  }}
                  transition={{
                    duration,
                    repeat: Infinity,
                    delay,
                    ease: "easeInOut"
                  }}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                />
              )
            })}
          </div>
        )}

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* El texto Principal */}
            <div className="space-y-8">
              {/* Badge (IA) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-full border border-[#3B82F6]/30 shadow-lg shadow-[#3B82F6]/20">
                  <Sparkles className="w-4 h-4 text-[#3B82F6]" />
                  <span className="text-sm font-semibold bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] bg-clip-text text-transparent">
                    {t.hero.badge}
                  </span>
                </div>
              </motion.div>

              {/* Título */}
              <motion.h1
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
              >
                {t.hero.title}
                <br />
                <span className="relative inline-block mt-2">
                  <span className="bg-gradient-to-r from-[#1E40AF] via-[#3B82F6] to-[#06B6D4] dark:from-[#3B82F6] dark:via-[#06B6D4] dark:to-[#3B82F6] bg-clip-text text-transparent">
                    {t.hero.titleHighlight}
                  </span>
                  {/* Línea animada debajo (IA) */}
                  <motion.div
                    className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                  />
                </span>
              </motion.h1>

              {/* Subtítulo */}
              <motion.p
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-xl leading-relaxed"
              >
                {t.hero.subtitle}
              </motion.p>

              {/* Llamada a la acción */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-wrap gap-4 items-center"
              >
                {/* Llamada a la acción principal */}
                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/registro"
                    className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white font-bold rounded-xl shadow-lg hover:shadow-2xl hover:shadow-[#3B82F6]/50 transition-all duration-300 overflow-hidden"
                  >
                    {/* Brillo animado */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                    <span className="relative z-10">{t.hero.cta1}</span>
                    <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>

                {/* Llamada a la acciónSecundario */}
                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/precios"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-2 border-[#3B82F6] text-[#1E40AF] dark:text-[#3B82F6] font-bold rounded-xl hover:bg-[#3B82F6] hover:text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {t.hero.cta2}
                  </Link>
                </motion.div>
              </motion.div>

              {/* Stats rápidos (IA) */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-wrap gap-6 pt-4"
              >
                {[
                  { icon: GraduationCap, value: '500+', label: 'Estudiantes' },
                  { icon: Zap, value: '98%', label: 'Aprobados' },
                  { icon: Sparkles, value: '4.9/5', label: 'Valoración' },
                ].map((stat, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <stat.icon className="w-5 h-5 text-[#3B82F6]" />
                    <div>
                      <div className="text-lg font-bold text-[#1E40AF] dark:text-white">{stat.value}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Cards de Features (IA) */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <IAIcon />, title: t.features.ia.title, desc: t.features.ia.desc, color: 'from-blue-500/20 to-cyan-500/20' },
                { icon: <MentoriasIcon />, title: t.features.mentorias.title, desc: t.features.mentorias.desc, color: 'from-blue-600/20 to-blue-400/20' },
                { icon: <VideosIcon />, title: t.features.videos.title, desc: t.features.videos.desc, color: 'from-cyan-500/20 to-sky-500/20' },
                { icon: <ExamenesIcon />, title: t.features.examenes.title, desc: t.features.examenes.desc, color: 'from-sky-500/20 to-blue-500/20' },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30, rotateX: -15 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ delay: i * 0.1 + 0.4, duration: 0.6 }}
                  whileHover={{ 
                    y: -12, 
                    scale: 1.03,
                    transition: { duration: 0.3 }
                  }}
                  className="group relative p-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-2xl transition-all duration-500"
                >
                  {/* Borde luminoso animado */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`} />
                  
                  {/* Contenido */}
                  <div className="relative z-10">
                    <div className="mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="font-bold text-lg mb-2 group-hover:text-[#3B82F6] transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>

                  {/* Brillito de esquina */}
                  <div className="absolute top-2 right-2 w-8 h-8 bg-gradient-to-br from-white/40 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Por qué ILM (IA)*/}
      <section className="py-16 md:py-20 px-4 relative bg-white dark:bg-[#1a1f2e]">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              ¿Por qué <span className="text-[#3B82F6]">Academia ILM</span>?
            </h2>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-400">
              Transformamos tus apuntes en conocimiento real
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              { icon: <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none" aria-hidden="true"><circle cx="32" cy="32" r="24" fill="url(#gradPlus)" opacity="0.2"/><path d="M32 20 L32 44 M20 32 L44 32" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round"/><defs><linearGradient id="gradPlus" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#3B82F6"/><stop offset="100%" stopColor="#06B6D4"/></linearGradient></defs></svg>,
                title: 'Aprende con clases online y mentorías',
                desc: 'Clases en directo, vídeos on-demand bilingües y sesiones personalizadas con expertos.' },
              { icon: <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none" aria-hidden="true"><circle cx="32" cy="32" r="24" fill="url(#gradCheck)" opacity="0.2"/><path d="M20 32 L28 40 L44 24" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/><defs><linearGradient id="gradCheck" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#3B82F6"/><stop offset="100%" stopColor="#06B6D4"/></linearGradient></defs></svg>,
                title: 'Genera exámenes automáticos con IA',
                desc: 'Nuestra IA crea tests personalizados basados en tu nivel y progreso.' },
              { icon: <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none" aria-hidden="true"><circle cx="24" cy="28" r="8" fill="#3B82F6" opacity="0.3"/><circle cx="40" cy="28" r="8" fill="#06B6D4" opacity="0.3"/><circle cx="32" cy="38" r="8" fill="#3B82F6" opacity="0.5"/><path d="M16 24 L32 32 M48 24 L32 32 M24 36 L32 40 M40 36 L32 40" stroke="#3B82F6" strokeWidth="2"/></svg>,
                title: 'Únete a una comunidad de estudiantes',
                desc: 'Foro interno, chat en tiempo real y sistema de bonificaciones por ayudar.' },
            ].map((item, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 0.6 }} viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group p-6 md:p-8 bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-3xl border border-gray-200 dark:border-gray-700 hover:border-[#3B82F6]/50 hover:shadow-2xl hover:shadow-[#3B82F6]/20 transition-all duration-500"
              >
                <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-4 group-hover:text-[#3B82F6] transition-colors">{item.title}</h3>
                <p className="text-gray-700 dark:text-gray-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Planes (IA) */}
      <section className="py-16 md:py-20 px-4 bg-gradient-to-b from-blue-50 to-white dark:from-[#1a1f2e] dark:to-[#1a1f2e]">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Todos los <span className="text-[#3B82F6]">niveles educativos</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              { level: 'ESO',          price: '35', icon: <ESOIcon />,          features: ['1º-4º ESO', 'Todas las ciencias', 'Ejercicios adaptativos', '1 mentoría/mes'], popular: false },
              { level: 'Bachillerato', price: '45', icon: <BachilleratoIcon />, features: ['1º-2º Bach', 'Prep. Selectividad', 'Simulacros PEvAU', '2 mentorías/mes'], popular: true  },
              { level: 'Universidad',  price: '55', icon: <UniversidadIcon />,  features: ['Grado en Química', 'Mentores PhD', 'Labs virtuales', '2 mentorías + 1:1'], popular: false },
            ].map((plan, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, duration: 0.6 }} viewport={{ once: true }}
                whileHover={{ y: -8, scale: plan.popular ? 1.02 : 1 }}
                className={`relative p-6 md:p-8 rounded-3xl border transition-all duration-500 ${
                  plan.popular
                    ? 'bg-gradient-to-br from-[#3B82F6]/10 to-[#06B6D4]/10 border-[#3B82F6] shadow-2xl shadow-[#3B82F6]/30 scale-105'
                    : 'bg-white dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 hover:border-[#3B82F6]/50'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white font-bold rounded-full text-sm shadow-lg">
                    MÁS POPULAR
                  </div>
                )}

                <div className="mb-4">{plan.icon}</div>
                <h3 className="text-2xl md:text-3xl font-bold mb-2">{plan.level}</h3>
                <div className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="text-[#3B82F6]">€{plan.price}</span>
                  <span className="text-base md:text-lg text-gray-500 dark:text-gray-400">/mes</span>
                </div>

                <ul className="space-y-3 md:space-y-4 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start">
                      <svg className="w-5 h-5 text-[#06B6D4] mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm md:text-base">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/precios"
                  className={`block w-full text-center py-3 md:py-4 rounded-xl font-bold transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white hover:shadow-xl hover:shadow-[#3B82F6]/50'
                      : 'bg-gray-100 dark:bg-gray-700 border-2 border-[#3B82F6] text-[#1E40AF] dark:text-[#3B82F6] hover:bg-[#3B82F6] hover:text-white'
                  }`}
                >
                  Ver detalles
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonios (IA) */}
      <section className="py-16 md:py-20 px-4 bg-white dark:bg-[#1a1f2e]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16">Testimonios</h2>

          <motion.div key={currentTestimonial}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="relative p-8 md:p-12 bg-gradient-to-br from-[#3B82F6]/20 to-[#06B6D4]/20 backdrop-blur-sm rounded-3xl border border-[#3B82F6]/30"
          >
            <div className="flex justify-center mb-6">
              <img src={testimonials[currentTestimonial].image} alt={testimonials[currentTestimonial].author}
                   className="w-20 h-20 rounded-full border-4 border-[#3B82F6] shadow-lg" />
            </div>

            <div className="text-6xl md:text-8xl text-[#3B82F6]/30 font-serif absolute top-4 md:top-8 left-4 md:left-8" aria-hidden="true">"</div>
            <p className="text-xl md:text-2xl lg:text-3xl italic text-center mb-6 relative z-10 px-4">
              {testimonials[currentTestimonial].quote}
            </p>
            <div className="text-center">
              <p className="font-bold text-[#3B82F6] text-lg">{testimonials[currentTestimonial].author}</p>
              <p className="text-gray-700 dark:text-gray-400 text-sm">{testimonials[currentTestimonial].role}</p>
            </div>

            <div className="flex justify-center mt-8 space-x-2" role="tablist" aria-label="Paginación de testimonios">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setCurrentTestimonial(i)}
                        aria-label={`Testimonio ${i + 1}`} aria-selected={i === currentTestimonial}
                        className={`h-2 md:h-3 rounded-full transition-all duration-300 ${i === currentTestimonial ? 'bg-[#3B82F6] w-8 md:w-10' : 'bg-gray-400 dark:bg-gray-600 w-2 md:w-3'}`} />
              ))}
            </div>
          </motion.div>

          {/* Para mi (saber donde editar los array) */}
          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6 flex items-center justify-center gap-2">
            <BulbIcon className="w-4 h-4" />
          </p>
        </div>
      </section>

      {/* Llamada a la acción con vídeo (en la banda gris) */}
      <CtaConVideo />

      {/* WhatsApp (IA) */}
      <motion.a
        href="https://wa.me/34638448778" target="_blank" rel="noopener noreferrer"
        className="fixed bottom-6 md:bottom-8 right-6 md:right-8 w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-green-400 to-green-600 text-white rounded-full shadow-2xl flex items-center justify-center z-50"
        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        aria-label="Contactar por WhatsApp"
      >
        <svg className="w-7 h-7 md:w-8 md:h-8" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884"/>
        </svg>
        <span className="absolute -top-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-red-500 rounded-full animate-ping" aria-hidden="true"></span>
      </motion.a>
    </div>
  )
}