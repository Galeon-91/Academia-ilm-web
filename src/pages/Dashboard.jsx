import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../lib/supabase'
import {
  LayoutDashboard,
  BookOpen,
  TrendingUp,
  Settings,
  LogOut,
  Menu,
  X,
  User,
  Mail,
  Award,
  Clock,
  Target,
  Users,
  Shield,
  Code2,
  GraduationCap,
  Library,
  ChevronRight,
  Atom,
  Beaker,
  Calculator,
  Globe as GlobeIcon,
  BookText,
  Dna,
  Mountain,
  Terminal,
  Braces,
  Database,
  Check
} from 'lucide-react'

// Componentes
import NotificationSystem from '../components/NotificationSystem'
import AvatarUpload from '../components/AvatarUpload'
import PasswordInput from '../components/PasswordInput'
import PanelAdmin from '../components/PanelAdmin'

// ==========================================
// SELECTOR DE ROL
// ==========================================
const RoleSelector = ({ currentRole, userId, onRoleChange }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [updating, setUpdating] = useState(false)

  const roles = [
    { 
      id: 'alumno', 
      label: 'Alumno', 
      icon: GraduationCap,
      description: 'Ver cursos y aprender',
      color: 'from-[#87CEEB] to-[#4A90C9]'
    },
    { 
      id: 'mentor', 
      label: 'Mentor', 
      icon: Users,
      description: 'Gestionar cursos y alumnos',
      color: 'from-[#9B7FB8] to-[#6B4C8C]'
    },
    { 
      id: 'admin', 
      label: 'Admin', 
      icon: Shield,
      description: 'Control total de la plataforma',
      color: 'from-[#FFB380] to-[#FF9E8B]'
    }
  ]

  const currentRoleData = roles.find(r => r.id === currentRole) || roles[0]
  const CurrentIcon = currentRoleData.icon

  const handleRoleChange = async (newRole) => {
    if (newRole === currentRole) {
      setIsOpen(false)
      return
    }

    setUpdating(true)
    try {
      const { error } = await supabase
        .from('user_roles')
        .update({ role: newRole })
        .eq('user_id', userId)

      if (!error) {
        onRoleChange(newRole)
        setIsOpen(false)
        window.location.reload()
      }
    } catch (error) {
      console.error('Error cambiando rol:', error)
    } finally {
      setUpdating(false)
    }
  }

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r ${currentRoleData.color} text-white font-medium shadow-lg`}
      >
        <CurrentIcon className="w-5 h-5" />
        <span className="capitalize">{currentRole}</span>
        <ChevronRight className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40"
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-2 w-72 bg-[#1a0f2e] rounded-2xl shadow-2xl border border-white/10 overflow-hidden z-50"
            >
              {roles.map((role) => {
                const RoleIcon = role.icon
                const isActive = role.id === currentRole

                return (
                  <motion.button
                    key={role.id}
                    whileHover={{ x: 5 }}
                    onClick={() => handleRoleChange(role.id)}
                    disabled={updating}
                    className={`w-full p-4 flex items-start gap-3 transition-colors ${
                      isActive 
                        ? `bg-gradient-to-r ${role.color}` 
                        : 'hover:bg-white/5'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${isActive ? 'bg-white/20' : 'bg-white/5'}`}>
                      <RoleIcon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-2">
                        <p className="text-white font-semibold">{role.label}</p>
                        {isActive && <div className="w-2 h-2 bg-green-400 rounded-full" />}
                      </div>
                      <p className="text-white/60 text-xs">{role.description}</p>
                    </div>
                  </motion.button>
                )
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

// ==========================================
// EN CONSTRUCCIÓN
// ==========================================
const EnConstruccion = ({ titulo, color }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`bg-gradient-to-br ${color} rounded-2xl p-8 text-white relative overflow-hidden`}
    >
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold">{titulo}</h3>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <Settings className="w-8 h-8" />
          </motion.div>
        </div>
        <p className="text-white/80 mb-4">🚧 En construcción</p>
        <div className="flex gap-2">
          <div className="w-3 h-3 bg-white/40 rounded-full animate-pulse" />
          <div className="w-3 h-3 bg-white/40 rounded-full animate-pulse delay-100" />
          <div className="w-3 h-3 bg-white/40 rounded-full animate-pulse delay-200" />
        </div>
      </div>
      <motion.div
        className="absolute -right-8 -bottom-8 w-40 h-40 bg-white/10 rounded-full"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
    </motion.div>
  )
}

// ==========================================
// ICONOS SVG
// ==========================================
const AtomIcon = () => (
  <svg className="w-10 h-10" viewBox="0 0 64 64">
    <defs>
      <linearGradient id="atomGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#87CEEB" />
        <stop offset="100%" stopColor="#4A90C9" />
      </linearGradient>
    </defs>
    <motion.circle cx="32" cy="32" r="4" fill="url(#atomGradient)" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }} />
    <motion.ellipse cx="32" cy="32" rx="20" ry="10" fill="none" stroke="url(#atomGradient)" strokeWidth="2" animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} />
  </svg>
)

const BeakerIcon = () => (
  <svg className="w-10 h-10" viewBox="0 0 64 64">
    <defs>
      <linearGradient id="beakerGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#9B7FB8" />
        <stop offset="100%" stopColor="#6B4C8C" />
      </linearGradient>
    </defs>
    <motion.path d="M 24 10 L 24 30 L 16 50 Q 16 54 20 54 L 44 54 Q 48 54 48 50 L 40 30 L 40 10 Z" fill="none" stroke="url(#beakerGradient)" strokeWidth="2" />
  </svg>
)

const CalculatorIcon = () => (
  <svg className="w-10 h-10" viewBox="0 0 64 64">
    <defs>
      <linearGradient id="calcGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#E8A0BF" />
        <stop offset="100%" stopColor="#C76B99" />
      </linearGradient>
    </defs>
    <rect x="14" y="8" width="36" height="48" rx="4" fill="none" stroke="url(#calcGradient)" strokeWidth="2"/>
    <motion.circle cx="24" cy="32" r="3" fill="url(#calcGradient)" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} />
  </svg>
)

const CodeIcon = () => (
  <svg className="w-10 h-10" viewBox="0 0 64 64">
    <defs>
      <linearGradient id="codeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF9E8B" />
        <stop offset="100%" stopColor="#FF7F6A" />
      </linearGradient>
    </defs>
    <motion.path d="M 20 24 L 12 32 L 20 40" fill="none" stroke="url(#codeGradient)" strokeWidth="3" strokeLinecap="round" animate={{ x: [-2, 0, -2] }} transition={{ duration: 2, repeat: Infinity }} />
    <motion.path d="M 44 24 L 52 32 L 44 40" fill="none" stroke="url(#codeGradient)" strokeWidth="3" strokeLinecap="round" animate={{ x: [2, 0, 2] }} transition={{ duration: 2, repeat: Infinity }} />
  </svg>
)

export default function Dashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeSection, setActiveSection] = useState('inicio')
  
  const [userRole, setUserRole] = useState('alumno')
  const [avatarUrl, setAvatarUrl] = useState(null)
  
  const [userCourses, setUserCourses] = useState([])
  const [userProgress, setUserProgress] = useState([])
  const [studyTime, setStudyTime] = useState(0)
  const [achievements, setAchievements] = useState([])
  
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordMessage, setPasswordMessage] = useState('')

  const [nivelActivo, setNivelActivo] = useState('eso')
  const [cursoExpandido, setCursoExpandido] = useState(null)
  const [cursoProgExpandido, setCursoProgExpandido] = useState(null)

  const estructuraESO = [
    {
      curso: '1º ESO',
      color: 'from-[#87CEEB] to-[#4A90C9]',
      asignaturas: [
        { nombre: 'Lengua Castellana y Literatura', icon: BookText },
        { nombre: 'Matemáticas', icon: Calculator },
        { nombre: 'Geografía e Historia', icon: GlobeIcon },
        { nombre: 'Biología y Geología', icon: Dna }
      ]
    },
    {
      curso: '2º ESO',
      color: 'from-[#9B7FB8] to-[#6B4C8C]',
      asignaturas: [
        { nombre: 'Lengua Castellana y Literatura', icon: BookText },
        { nombre: 'Matemáticas', icon: Calculator },
        { nombre: 'Geografía e Historia', icon: GlobeIcon },
        { nombre: 'Física y Química', icon: Beaker }
      ]
    },
    {
      curso: '3º ESO',
      color: 'from-[#E8A0BF] to-[#C76B99]',
      asignaturas: [
        { nombre: 'Lengua', icon: BookText },
        { nombre: 'Matemáticas A/B', icon: Calculator },
        { nombre: 'Geografía e Historia', icon: GlobeIcon },
        { nombre: 'Física y Química', icon: Beaker },
        { nombre: 'Biología y Geología', icon: Dna }
      ]
    },
    {
      curso: '4º ESO',
      color: 'from-[#FF9E8B] to-[#FF7F6A]',
      asignaturas: [
        { nombre: 'Lengua', icon: BookText },
        { nombre: 'Geografía e Historia', icon: GlobeIcon },
        { nombre: 'Matemáticas A/B', icon: Calculator },
        { nombre: 'Física y Química', icon: Beaker },
        { nombre: 'Biología', icon: Dna }
      ]
    }
  ]

  const estructuraBachillerato = [
    {
      curso: '1º Bachillerato',
      color: 'from-[#87CEEB] to-[#4A90C9]',
      asignaturas: [
        { nombre: 'Lengua I', icon: BookText },
        { nombre: 'Matemáticas CCSS I', icon: Calculator },
        { nombre: 'Física y Química', icon: Beaker },
        { nombre: 'Biología', icon: Dna }
      ]
    },
    {
      curso: '2º Bachillerato',
      color: 'from-[#9B7FB8] to-[#6B4C8C]',
      asignaturas: [
        { nombre: 'Matemáticas II', icon: Calculator },
        { nombre: 'Física', icon: Atom },
        { nombre: 'Química', icon: Beaker },
        { nombre: 'Biología', icon: Dna }
      ]
    }
  ]

  const gradosUniversitarios = [
    { nombre: 'Grado en Química', color: 'from-[#87CEEB] to-[#4A90C9]', icon: Beaker },
    { nombre: 'Grado en Biología', color: 'from-[#9B7FB8] to-[#6B4C8C]', icon: Dna },
    { nombre: 'Grado en Ciencias Ambientales', color: 'from-[#E8A0BF] to-[#C76B99]', icon: Mountain },
    { nombre: 'Grado en Matemáticas', color: 'from-[#FF9E8B] to-[#FF7F6A]', icon: Calculator },
    { nombre: 'Grado en Física', color: 'from-[#FFB380] to-[#FF9E8B]', icon: Atom }
  ]

  const cursosProgramacion = [
    {
      nombre: 'Python',
      icon: Terminal,
      color: 'from-[#306998] to-[#FFD43B]',
      nivel: 'Principiante a Avanzado',
      duracion: '16 semanas',
      temas: ['Fundamentos', 'POO', 'Data Science', 'ML']
    },
    {
      nombre: 'JavaScript',
      icon: Braces,
      color: 'from-[#F7DF1E] to-[#F0DB4F]',
      nivel: 'Principiante a Avanzado',
      duracion: '14 semanas',
      temas: ['ES6+', 'DOM', 'Async', 'Node.js']
    },
    {
      nombre: 'React',
      icon: Code2,
      color: 'from-[#61DAFB] to-[#21A1C4]',
      nivel: 'Intermedio',
      duracion: '12 semanas',
      temas: ['Hooks', 'Context', 'Router', 'Redux']
    },
    {
      nombre: 'HTML & CSS',
      icon: GlobeIcon,
      color: 'from-[#E34F26] to-[#1572B6]',
      nivel: 'Principiante',
      duracion: '8 semanas',
      temas: ['Semantic', 'Flexbox', 'Grid', 'Responsive']
    },
    {
      nombre: 'SQL',
      icon: Database,
      color: 'from-[#00758F] to-[#F29111]',
      nivel: 'Principiante',
      duracion: '10 semanas',
      temas: ['Queries', 'JOINs', 'PostgreSQL', 'Optimization']
    },
    {
      nombre: 'Git & GitHub',
      icon: Users,
      color: 'from-[#F05032] to-[#24292E]',
      nivel: 'Principiante',
      duracion: '4 semanas',
      temas: ['Git Flow', 'Branches', 'PRs', 'CI/CD']
    }
  ]

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        navigate('/login')
        return
      }
      
      setUser(session.user)
      setAvatarUrl(session.user?.user_metadata?.avatar_url)
      
      await Promise.all([
        loadUserRole(session.user.id),
        loadUserData(session.user.id)
      ])
      
    } catch (error) {
      console.error('Error:', error)
      navigate('/login')
    } finally {
      setLoading(false)
    }
  }

  const loadUserRole = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .single()
      
      if (error) {
        await supabase
          .from('user_roles')
          .insert({ user_id: userId, role: 'alumno' })
        setUserRole('alumno')
      } else {
        setUserRole(data?.role || 'alumno')
      }
    } catch (error) {
      setUserRole('alumno')
    }
  }

  const loadUserData = async (userId) => {
    try {
      const { data: courses } = await supabase
        .from('user_courses')
        .select(`*, course:courses(*)`)
        .eq('user_id', userId)
      
      setUserCourses(courses || [])
      
      const { data: progress } = await supabase
        .from('user_lesson_progress')
        .select('*')
        .eq('user_id', userId)
      
      setUserProgress(progress || [])
      
      const { data: time } = await supabase
        .from('user_study_time')
        .select('minutes')
        .eq('user_id', userId)
      
      const totalMinutes = time?.reduce((acc, curr) => acc + (curr.minutes || 0), 0) || 0
      setStudyTime(Math.floor(totalMinutes / 60))
      
      const { data: userAchievements } = await supabase
        .from('user_achievements')
        .select('*')
        .eq('user_id', userId)
      
      setAchievements(userAchievements || [])
      
    } catch (error) {
      console.error('Error cargando datos:', error)
    }
  }

  const handlePasswordChange = async (e) => {
    e.preventDefault()
    setPasswordMessage('')

    if (newPassword !== confirmPassword) {
      setPasswordMessage('❌ Las contraseñas no coinciden')
      return
    }

    if (newPassword.length < 6) {
      setPasswordMessage('❌ Mínimo 6 caracteres')
      return
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      })

      if (error) throw error

      setPasswordMessage('✅ Contraseña actualizada')
      setNewPassword('')
      setConfirmPassword('')
    } catch (error) {
      setPasswordMessage('❌ Error al cambiar contraseña')
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  const getCourseIcon = (courseName) => {
    if (!courseName) return <BookOpen className="w-10 h-10 text-[#87CEEB]" />
    if (courseName.includes('Física')) return <AtomIcon />
    if (courseName.includes('Química')) return <BeakerIcon />
    if (courseName.includes('Matemáticas')) return <CalculatorIcon />
    if (courseName.includes('Python')) return <CodeIcon />
    return <BookOpen className="w-10 h-10 text-[#87CEEB]" />
  }

  const TarjetaCurso = ({ curso, color, asignaturas }) => {
    const isExpanded = cursoExpandido === curso

    return (
      <motion.div layout className="bg-[#1a0f2e]/30 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={() => setCursoExpandido(isExpanded ? null : curso)}
          className={`w-full p-6 bg-gradient-to-r ${color} text-white flex items-center justify-between`}
        >
          <div className="flex items-center gap-3">
            <GraduationCap className="w-6 h-6" />
            <h3 className="text-xl font-bold">{curso}</h3>
          </div>
          <motion.div animate={{ rotate: isExpanded ? 90 : 0 }}>
            <ChevronRight className="w-6 h-6" />
          </motion.div>
        </motion.button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
            >
              <div className="p-6 space-y-3">
                {asignaturas.map((asignatura, idx) => {
                  const Icon = asignatura.icon
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="flex items-center gap-3 p-4 bg-white/5 rounded-xl hover:bg-white/10 cursor-pointer"
                    >
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${color}`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-white font-medium">{asignatura.nombre}</span>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    )
  }

  const TarjetaCursoProgramacion = ({ curso }) => {
    const isExpanded = cursoProgExpandido === curso.nombre
    const Icon = curso.icon

    return (
      <motion.div layout className="bg-[#1a0f2e]/30 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={() => setCursoProgExpandido(isExpanded ? null : curso.nombre)}
          className={`w-full p-6 bg-gradient-to-r ${curso.color} text-white`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4 text-left">
              <div className="p-3 bg-white/20 rounded-xl">
                <Icon className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-1">{curso.nombre}</h3>
                <div className="flex gap-4 text-xs mt-2">
                  <span className="bg-white/20 px-3 py-1 rounded-full">{curso.nivel}</span>
                  <span className="bg-white/20 px-3 py-1 rounded-full">{curso.duracion}</span>
                </div>
              </div>
            </div>
            <motion.div animate={{ rotate: isExpanded ? 90 : 0 }}>
              <ChevronRight className="w-6 h-6" />
            </motion.div>
          </div>
        </motion.button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
            >
              <div className="p-6">
                <h4 className="text-white font-bold mb-3">📚 Contenido</h4>
                <div className="grid grid-cols-2 gap-2">
                  {curso.temas.map((tema, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 bg-white/5 rounded text-white/90 text-sm">
                      <Check className="w-4 h-4 text-green-400" />
                      <span>{tema}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#2E5C8A] via-[#6B4C8C] to-[#C76B99] flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full"
        />
      </div>
    )
  }

  const menuItems = [
    { id: 'inicio', icon: LayoutDashboard, label: 'Inicio' },
    { id: 'cursos', icon: BookOpen, label: 'Mis Cursos' },
    { id: 'catalogo', icon: Library, label: 'Catálogo' },
    { id: 'programacion', icon: Code2, label: 'Programación' },
    { id: 'progreso', icon: TrendingUp, label: 'Progreso' },
    { id: 'configuracion', icon: Settings, label: 'Configuración' },
  ]

  if (userRole === 'admin' || userRole === 'mentor') {
    menuItems.splice(5, 0, { id: 'admin', icon: Shield, label: 'Panel Admin' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2E5C8A] via-[#6B4C8C] to-[#C76B99]">
      <NotificationSystem userId={user?.id} />
      
      <header className="bg-[#1a0f2e]/30 backdrop-blur-xl border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                {sidebarOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
              </button>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#87CEEB] to-[#E8A0BF] bg-clip-text text-transparent">
                Academia ILM
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <RoleSelector
                currentRole={userRole}
                userId={user?.id}
                onRoleChange={(newRole) => setUserRole(newRole)}
              />

              <div className="hidden sm:block text-right">
                <p className="text-white font-medium">
                  {user?.user_metadata?.full_name || user?.email?.split('@')[0]}
                </p>
                <p className="text-white/60 text-sm flex items-center gap-2 justify-end">
                  {userRole === 'admin' && <Shield className="w-4 h-4 text-[#FFB380]" />}
                  <span className="capitalize">{userRole}</span>
                </p>
              </div>
              
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#87CEEB] to-[#E8A0BF] flex items-center justify-center overflow-hidden border-2 border-white/20">
                {avatarUrl ? (
                  <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-5 h-5 text-white" />
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        <AnimatePresence>
          {sidebarOpen && (
            <motion.aside
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed lg:sticky top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-[#1a0f2e]/30 backdrop-blur-xl border-r border-white/10 z-30 overflow-y-auto"
            >
              <nav className="p-4 space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      activeSection === item.id
                        ? 'bg-gradient-to-r from-[#87CEEB] to-[#4A90C9] text-white shadow-lg'
                        : 'text-white/70 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
                
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all mt-4"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Cerrar Sesión</span>
                </button>
              </nav>
            </motion.aside>
          )}
        </AnimatePresence>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          <AnimatePresence mode="wait">
            {activeSection === 'inicio' && (
              <motion.div
                key="inicio"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold text-white mb-6">
                  ¡Hola {user?.user_metadata?.full_name || 'Estudiante'}! 🎓
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-gradient-to-br from-[#87CEEB]/20 to-[#4A90C9]/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                    <BookOpen className="w-8 h-8 text-[#87CEEB] mb-2" />
                    <p className="text-white/60 text-sm">Cursos Activos</p>
                    <p className="text-3xl font-bold text-white">{userCourses.length}</p>
                  </div>

                  <div className="bg-gradient-to-br from-[#9B7FB8]/20 to-[#6B4C8C]/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                    <Target className="w-8 h-8 text-[#9B7FB8] mb-2" />
                    <p className="text-white/60 text-sm">Lecciones</p>
                    <p className="text-3xl font-bold text-white">{userProgress.length}</p>
                  </div>

                  <div className="bg-gradient-to-br from-[#E8A0BF]/20 to-[#C76B99]/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                    <Clock className="w-8 h-8 text-[#E8A0BF] mb-2" />
                    <p className="text-white/60 text-sm">Horas</p>
                    <p className="text-3xl font-bold text-white">{studyTime}h</p>
                  </div>

                  <div className="bg-gradient-to-br from-[#FF9E8B]/20 to-[#FF7F6A]/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                    <Award className="w-8 h-8 text-[#FF9E8B] mb-2" />
                    <p className="text-white/60 text-sm">Logros</p>
                    <p className="text-3xl font-bold text-white">{achievements.length}</p>
                  </div>
                </div>

                {userCourses.length > 0 && (
                  <div className="bg-[#1a0f2e]/30 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                    <h3 className="text-xl font-bold text-white mb-4">Continúa Aprendiendo</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {userCourses.map((uc) => (
                        <motion.div
                          key={uc.id}
                          whileHover={{ scale: 1.02 }}
                          onClick={() => navigate(`/curso/${uc.course.id}`)}
                          className="bg-white/5 rounded-xl p-4 cursor-pointer"
                        >
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0">
                              {getCourseIcon(uc.course?.name)}
                            </div>
                            <div className="flex-1">
                              <h4 className="text-white font-semibold mb-1">{uc.course?.name}</h4>
                              <div className="w-full bg-white/10 rounded-full h-2">
                                <div
                                  className="bg-gradient-to-r from-[#87CEEB] to-[#4A90C9] h-2 rounded-full"
                                  style={{ width: `${uc.progress || 0}%` }}
                                />
                              </div>
                              <p className="text-white/60 text-xs mt-1">{uc.progress || 0}%</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {activeSection === 'cursos' && (
              <motion.div key="cursos" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
                <h2 className="text-3xl font-bold text-white mb-6">Mis Cursos</h2>

                {userCourses.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userCourses.map((uc) => (
                      <motion.div
                        key={uc.id}
                        whileHover={{ y: -5 }}
                        onClick={() => navigate(`/curso/${uc.course?.id}`)}
                        className="bg-[#1a0f2e]/30 backdrop-blur-xl rounded-2xl p-6 border border-white/10 cursor-pointer"
                      >
                        <div className="flex justify-center mb-4">
                          {getCourseIcon(uc.course?.name)}
                        </div>
                        <h3 className="text-xl font-bold text-white text-center mb-2">{uc.course?.name}</h3>
                        <div className="w-full bg-white/10 rounded-full h-3 mb-2">
                          <div
                            className="bg-gradient-to-r from-[#87CEEB] to-[#4A90C9] h-3 rounded-full"
                            style={{ width: `${uc.progress || 0}%` }}
                          />
                        </div>
                        <p className="text-white/60 text-sm text-center">{uc.progress || 0}%</p>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-[#1a0f2e]/30 backdrop-blur-xl rounded-2xl p-12 border border-white/10 text-center">
                    <BookOpen className="w-20 h-20 text-white/30 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-white mb-2">Sin Cursos</h3>
                    <p className="text-white/60">Explora el catálogo para inscribirte</p>
                  </div>
                )}
              </motion.div>
            )}

            {activeSection === 'catalogo' && (
              <motion.div key="catalogo" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
                <h2 className="text-3xl font-bold text-white mb-6">Catálogo de Cursos</h2>

                <div className="flex justify-center gap-4 mb-8">
                  {[
                    { id: 'eso', label: 'ESO', icon: BookOpen },
                    { id: 'bachillerato', label: 'Bachillerato', icon: GraduationCap },
                    { id: 'universidad', label: 'Universidad', icon: Award }
                  ].map((nivel) => {
                    const Icon = nivel.icon
                    const isActive = nivelActivo === nivel.id
                    
                    return (
                      <motion.button
                        key={nivel.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setNivelActivo(nivel.id)}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold ${
                          isActive
                            ? 'bg-gradient-to-r from-[#87CEEB] to-[#4A90C9] text-white shadow-lg'
                            : 'bg-white/10 text-white/60 hover:bg-white/20'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{nivel.label}</span>
                      </motion.button>
                    )
                  })}
                </div>

                <AnimatePresence mode="wait">
                  {nivelActivo === 'eso' && (
                    <motion.div key="eso" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                      {estructuraESO.map((nivel, idx) => (
                        <TarjetaCurso key={idx} curso={nivel.curso} color={nivel.color} asignaturas={nivel.asignaturas} />
                      ))}
                    </motion.div>
                  )}

                  {nivelActivo === 'bachillerato' && (
                    <motion.div key="bach" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                      {estructuraBachillerato.map((nivel, idx) => (
                        <TarjetaCurso key={idx} curso={nivel.curso} color={nivel.color} asignaturas={nivel.asignaturas} />
                      ))}
                    </motion.div>
                  )}

                  {nivelActivo === 'universidad' && (
                    <motion.div key="uni" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {gradosUniversitarios.map((grado, idx) => (
                        <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}>
                          <EnConstruccion titulo={grado.nombre} color={grado.color} />
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {activeSection === 'programacion' && (
              <motion.div key="programacion" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
                <div className="text-center mb-8">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="inline-block mb-4">
                    <div className="p-4 bg-gradient-to-br from-[#87CEEB] to-[#4A90C9] rounded-2xl">
                      <Code2 className="w-16 h-16 text-white" />
                    </div>
                  </motion.div>
                  <h2 className="text-4xl font-bold text-white mb-3">Cursos de Programación</h2>
                  <p className="text-white/70">Método 4Geeks Academy</p>
                </div>

                <div className="space-y-4">
                  {cursosProgramacion.map((curso, idx) => (
                    <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}>
                      <TarjetaCursoProgramacion curso={curso} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeSection === 'progreso' && (
              <motion.div key="progreso" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
                <h2 className="text-3xl font-bold text-white mb-6">Mi Progreso</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-[#1a0f2e]/30 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                    <h3 className="text-lg font-semibold text-white mb-4">Tiempo</h3>
                    <div className="text-center">
                      <p className="text-5xl font-bold text-[#87CEEB] mb-2">{studyTime}</p>
                      <p className="text-white/60">horas</p>
                    </div>
                  </div>

                  <div className="bg-[#1a0f2e]/30 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                    <h3 className="text-lg font-semibold text-white mb-4">Lecciones</h3>
                    <div className="text-center">
                      <p className="text-5xl font-bold text-[#9B7FB8] mb-2">{userProgress.length}</p>
                      <p className="text-white/60">completadas</p>
                    </div>
                  </div>

                  <div className="bg-[#1a0f2e]/30 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                    <h3 className="text-lg font-semibold text-white mb-4">Logros</h3>
                    <div className="text-center">
                      <p className="text-5xl font-bold text-[#FF9E8B] mb-2">{achievements.length}</p>
                      <p className="text-white/60">desbloqueados</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeSection === 'admin' && (userRole === 'admin' || userRole === 'mentor') && (
              <motion.div
                key="admin"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <PanelAdmin user={user} userRole={userRole} />
              </motion.div>
            )}

            {activeSection === 'configuracion' && (
              <motion.div key="config" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
                <h2 className="text-3xl font-bold text-white mb-6">Configuración</h2>

                <div className="bg-[#1a0f2e]/30 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-6">Información Personal</h3>
                  
                  <div className="flex flex-col items-center gap-6 mb-6">
                    <AvatarUpload
                      user={user}
                      currentAvatarUrl={avatarUrl}
                      onAvatarUpdate={(newUrl) => setAvatarUrl(newUrl)}
                    />
                    
                    <div className="text-center">
                      <p className="text-white font-medium text-lg">
                        {user?.user_metadata?.full_name || 'Usuario'}
                      </p>
                      <p className="text-white/60">{user?.email}</p>
                      <div className="flex items-center justify-center gap-2 mt-2">
                        {userRole === 'admin' && <Shield className="w-4 h-4 text-[#FFB380]" />}
                        <p className="text-[#87CEEB] text-sm capitalize">Rol: {userRole}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#87CEEB] text-sm font-medium mb-2">Nombre</label>
                      <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl border border-white/10">
                        <User className="w-5 h-5 text-[#87CEEB]/70" />
                        <input
                          type="text"
                          value={user?.user_metadata?.full_name || ''}
                          readOnly
                          className="flex-1 bg-transparent text-white outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[#87CEEB] text-sm font-medium mb-2">Email</label>
                      <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl border border-white/10">
                        <Mail className="w-5 h-5 text-[#87CEEB]/70" />
                        <input
                          type="email"
                          value={user?.email || ''}
                          readOnly
                          className="flex-1 bg-transparent text-white outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#1a0f2e]/30 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-6">Cambiar Contraseña</h3>
                  
                  <form onSubmit={handlePasswordChange} className="space-y-4">
                    <PasswordInput
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      label="Nueva Contraseña"
                      placeholder="Mínimo 6 caracteres"
                    />

                    <PasswordInput
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      label="Confirmar"
                      placeholder="Repite la contraseña"
                    />

                    {passwordMessage && (
                      <div className={`p-3 rounded-xl ${
                        passwordMessage.includes('✅')
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {passwordMessage}
                      </div>
                    )}

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full px-6 py-3 bg-gradient-to-r from-[#87CEEB] to-[#4A90C9] text-white font-bold rounded-xl shadow-lg"
                    >
                      Actualizar Contraseña
                    </motion.button>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}