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
  Clock,
  Target,
  Award,
  ChevronRight,
  GraduationCap,
  Library
} from 'lucide-react'

import NotificationSystem from '../components/NotificationSystem'
import AvatarUpload from '../components/AvatarUpload'
import PasswordInput from '../components/PasswordInput'

export default function AlumnoDashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeSection, setActiveSection] = useState('inicio')
  
  const [avatarUrl, setAvatarUrl] = useState(null)
  const [userCourses, setUserCourses] = useState([])
  const [userProgress, setUserProgress] = useState([])
  const [studyTime, setStudyTime] = useState(0)
  const [achievements, setAchievements] = useState([])
  
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordMessage, setPasswordMessage] = useState('')

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
      
      // Verificar que es alumno
      const { data: roleData } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id)
        .single()
      
      if (roleData?.role === 'admin' || roleData?.role === 'mentor') {
        navigate('/mentor-dashboard')
        return
      }
      
      await loadUserData(session.user.id)
      
    } catch (error) {
      console.error('Error:', error)
      navigate('/login')
    } finally {
      setLoading(false)
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
    return <BookOpen className="w-10 h-10 text-[#87CEEB]" />
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
    { id: 'catalogo', icon: Library, label: 'Explorar' },
    { id: 'progreso', icon: TrendingUp, label: 'Mi Progreso' },
    { id: 'configuracion', icon: Settings, label: 'Configuración' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2E5C8A] via-[#6B4C8C] to-[#C76B99]">
      <NotificationSystem userId={user?.id} />
      
      {/* HEADER */}
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
              <div className="hidden sm:block text-right">
                <p className="text-white font-medium">
                  {user?.user_metadata?.full_name || user?.email?.split('@')[0]}
                </p>
                <p className="text-white/60 text-sm flex items-center gap-2 justify-end">
                  <GraduationCap className="w-4 h-4 text-[#87CEEB]" />
                  <span>Alumno</span>
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
        {/* SIDEBAR */}
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

        {/* MAIN CONTENT */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          <AnimatePresence mode="wait">
            {/* INICIO */}
            {activeSection === 'inicio' && (
              <motion.div
                key="inicio"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="mb-8">
                  <h2 className="text-4xl font-bold text-white mb-2">
                    ¡Hola {user?.user_metadata?.full_name || 'Estudiante'}! 🎓
                  </h2>
                  <p className="text-white/70 text-lg">Bienvenido a tu espacio de aprendizaje</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-gradient-to-br from-[#87CEEB]/20 to-[#4A90C9]/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                    <BookOpen className="w-8 h-8 text-[#87CEEB] mb-2" />
                    <p className="text-white/60 text-sm">Mis Cursos</p>
                    <p className="text-3xl font-bold text-white">{userCourses.length}</p>
                  </div>

                  <div className="bg-gradient-to-br from-[#9B7FB8]/20 to-[#6B4C8C]/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                    <Target className="w-8 h-8 text-[#9B7FB8] mb-2" />
                    <p className="text-white/60 text-sm">Lecciones Completadas</p>
                    <p className="text-3xl font-bold text-white">{userProgress.length}</p>
                  </div>

                  <div className="bg-gradient-to-br from-[#E8A0BF]/20 to-[#C76B99]/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                    <Clock className="w-8 h-8 text-[#E8A0BF] mb-2" />
                    <p className="text-white/60 text-sm">Horas de Estudio</p>
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
                    <h3 className="text-2xl font-bold text-white mb-4">Continúa Aprendiendo</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {userCourses.map((uc) => (
                        <motion.div
                          key={uc.id}
                          whileHover={{ scale: 1.02 }}
                          onClick={() => navigate(`/curso/${uc.course.id}`)}
                          className="bg-white/5 rounded-xl p-4 cursor-pointer hover:bg-white/10 transition-colors"
                        >
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0">
                              {getCourseIcon(uc.course?.name)}
                            </div>
                            <div className="flex-1">
                              <h4 className="text-white font-semibold mb-2">{uc.course?.name}</h4>
                              <div className="w-full bg-white/10 rounded-full h-2 mb-1">
                                <div
                                  className="bg-gradient-to-r from-[#87CEEB] to-[#4A90C9] h-2 rounded-full transition-all"
                                  style={{ width: `${uc.progress || 0}%` }}
                                />
                              </div>
                              <p className="text-white/60 text-xs">{uc.progress || 0}% completado</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {userCourses.length === 0 && (
                  <div className="bg-[#1a0f2e]/30 backdrop-blur-xl rounded-2xl p-12 border border-white/10 text-center">
                    <BookOpen className="w-20 h-20 text-white/30 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-white mb-2">Aún no tienes cursos</h3>
                    <p className="text-white/60 mb-4">Explora el catálogo y comienza a aprender</p>
                    <button
                      onClick={() => setActiveSection('catalogo')}
                      className="px-6 py-3 bg-gradient-to-r from-[#87CEEB] to-[#4A90C9] text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                    >
                      Explorar Cursos
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {/* MIS CURSOS */}
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
                        <p className="text-white/60 text-sm text-center">{uc.progress || 0}% completado</p>
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

            {/* CATÁLOGO */}
            {activeSection === 'catalogo' && (
              <motion.div key="catalogo" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
                <h2 className="text-3xl font-bold text-white mb-6">Explorar Cursos</h2>
                
                <div className="bg-[#1a0f2e]/30 backdrop-blur-xl rounded-2xl p-12 border border-white/10 text-center">
                  <Library className="w-20 h-20 text-white/30 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">Catálogo próximamente</h3>
                  <p className="text-white/60">Estamos preparando cursos increíbles para ti</p>
                </div>
              </motion.div>
            )}

            {/* PROGRESO */}
            {activeSection === 'progreso' && (
              <motion.div key="progreso" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
                <h2 className="text-3xl font-bold text-white mb-6">Mi Progreso</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-[#1a0f2e]/30 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                    <h3 className="text-lg font-semibold text-white mb-4">Tiempo de Estudio</h3>
                    <div className="text-center">
                      <p className="text-5xl font-bold text-[#87CEEB] mb-2">{studyTime}</p>
                      <p className="text-white/60">horas totales</p>
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

            {/* CONFIGURACIÓN */}
            {activeSection === 'configuracion' && (
              <motion.div key="config" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
                <h2 className="text-3xl font-bold text-white mb-6">Configuración</h2>

                <div className="bg-[#1a0f2e]/30 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-6">Mi Perfil</h3>
                  
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
                        <GraduationCap className="w-4 h-4 text-[#87CEEB]" />
                        <p className="text-[#87CEEB] text-sm">Alumno</p>
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