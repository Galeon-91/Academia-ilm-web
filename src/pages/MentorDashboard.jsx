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
  Shield,
  Users,
  ChevronRight,
  GraduationCap
} from 'lucide-react'

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

  const currentRoleData = roles.find(r => r.id === currentRole) || roles[1]
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

export default function MentorDashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeSection, setActiveSection] = useState('inicio')
  
  const [userRole, setUserRole] = useState('mentor')
  const [avatarUrl, setAvatarUrl] = useState(null)
  
  const [allCourses, setAllCourses] = useState([])
  const [allUsers, setAllUsers] = useState([])
  
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
      
      // Verificar rol
      const { data: roleData } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id)
        .single()
      
      if (roleData?.role === 'alumno') {
        navigate('/alumno-dashboard')
        return
      }
      
      setUserRole(roleData?.role || 'mentor')
      
      await loadData()
      
    } catch (error) {
      console.error('Error:', error)
      navigate('/login')
    } finally {
      setLoading(false)
    }
  }

  const loadData = async () => {
    try {
      const { data: courses } = await supabase
        .from('courses')
        .select('*')
        .order('id', { ascending: true })
      
      setAllCourses(courses || [])
      
      const { data: users } = await supabase
        .from('user_roles')
        .select('user_id, role, created_at')
        .order('created_at', { ascending: false })
      
      setAllUsers(users || [])
    } catch (error) {
      console.error('Error:', error)
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
    { id: 'inicio', icon: LayoutDashboard, label: 'Panel General' },
    { id: 'gestion', icon: Shield, label: 'Gestión de Cursos' },
    { id: 'usuarios', icon: Users, label: 'Usuarios' },
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
              <span className="px-3 py-1 bg-gradient-to-r from-[#FFB380] to-[#FF9E8B] text-white text-xs font-bold rounded-full">
                {userRole === 'admin' ? 'ADMIN' : 'MENTOR'}
              </span>
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
                  <Shield className="w-4 h-4 text-[#FFB380]" />
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
                        ? 'bg-gradient-to-r from-[#FFB380] to-[#FF9E8B] text-white shadow-lg'
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
            {/* INICIO / PANEL GENERAL */}
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
                    Panel de {userRole === 'admin' ? 'Administración' : 'Mentor'}
                  </h2>
                  <p className="text-white/70 text-lg">Gestiona la academia desde aquí</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-[#87CEEB]/20 to-[#4A90C9]/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                    <Users className="w-8 h-8 text-[#87CEEB] mb-2" />
                    <p className="text-white/60 text-sm">Usuarios Totales</p>
                    <p className="text-3xl font-bold text-white">{allUsers.length}</p>
                  </div>

                  <div className="bg-gradient-to-br from-[#9B7FB8]/20 to-[#6B4C8C]/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                    <BookOpen className="w-8 h-8 text-[#9B7FB8] mb-2" />
                    <p className="text-white/60 text-sm">Cursos Totales</p>
                    <p className="text-3xl font-bold text-white">{allCourses.length}</p>
                  </div>

                  <div className="bg-gradient-to-br from-[#FFB380]/20 to-[#FF9E8B]/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                    <Shield className="w-8 h-8 text-[#FFB380] mb-2" />
                    <p className="text-white/60 text-sm">Tu Rol</p>
                    <p className="text-3xl font-bold text-white capitalize">{userRole}</p>
                  </div>
                </div>

                <div className="bg-[#1a0f2e]/30 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                  <h3 className="text-2xl font-bold text-white mb-4">Accesos Rápidos</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveSection('gestion')}
                      className="flex items-center gap-3 p-4 bg-gradient-to-r from-[#87CEEB] to-[#4A90C9] text-white rounded-xl hover:shadow-lg transition-all"
                    >
                      <Shield className="w-6 h-6" />
                      <div className="text-left">
                        <p className="font-semibold">Gestionar Cursos</p>
                        <p className="text-sm text-white/80">Crear y editar cursos</p>
                      </div>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveSection('usuarios')}
                      className="flex items-center gap-3 p-4 bg-gradient-to-r from-[#9B7FB8] to-[#6B4C8C] text-white rounded-xl hover:shadow-lg transition-all"
                    >
                      <Users className="w-6 h-6" />
                      <div className="text-left">
                        <p className="font-semibold">Ver Usuarios</p>
                        <p className="text-sm text-white/80">Gestionar alumnos</p>
                      </div>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* GESTIÓN DE CURSOS - PANEL ADMIN */}
            {activeSection === 'gestion' && (
              <motion.div
                key="gestion"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <PanelAdmin user={user} userRole={userRole} />
              </motion.div>
            )}

            {/* USUARIOS */}
            {activeSection === 'usuarios' && (
              <motion.div key="usuarios" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
                <h2 className="text-3xl font-bold text-white mb-6">Usuarios</h2>
                
                <div className="bg-[#1a0f2e]/30 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-4">Total de usuarios: {allUsers.length}</h3>
                  <div className="space-y-3">
                    {allUsers.slice(0, 10).map((userRole, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#87CEEB] to-[#E8A0BF] flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="text-white font-medium">{userRole.user_id.substring(0, 8)}...</p>
                            <p className="text-white/60 text-sm capitalize">{userRole.role}</p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          userRole.role === 'admin' ? 'bg-orange-500/20 text-orange-400' :
                          userRole.role === 'mentor' ? 'bg-purple-500/20 text-purple-400' :
                          'bg-blue-500/20 text-blue-400'
                        }`}>
                          {userRole.role}
                        </span>
                      </div>
                    ))}
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
                        <Shield className="w-4 h-4 text-[#FFB380]" />
                        <p className="text-[#FFB380] text-sm capitalize">Rol: {userRole}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/60 text-sm mb-2">Nombre</label>
                      <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl border border-white/10">
                        <User className="w-5 h-5 text-white/40" />
                        <input
                          type="text"
                          value={user?.user_metadata?.full_name || ''}
                          readOnly
                          className="flex-1 bg-transparent text-white outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-white/60 text-sm mb-2">Email</label>
                      <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl border border-white/10">
                        <Mail className="w-5 h-5 text-white/40" />
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
                      className="w-full px-6 py-3 bg-gradient-to-r from-[#FFB380] to-[#FF9E8B] text-white font-bold rounded-xl shadow-lg"
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