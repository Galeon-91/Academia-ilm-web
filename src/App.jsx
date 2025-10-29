import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import { supabase } from './lib/supabase'

// Layouts
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// Páginas públicas
import Home from './pages/Home'
import Login from './pages/Login'
import Registro from './pages/Registro'
import Clases from './pages/Clases'
import Universidad from './pages/Universidad'
import Precios from './pages/Precios'
import Contacto from './pages/Contacto'

// Dashboards por rol
import AlumnoDashboard from './pages/AlumnoDashboard'
import MentorDashboard from './pages/MentorDashboard'

// Otras páginas privadas
import Curso from './pages/Curso'

// ==========================================
// LAYOUT PARA PÁGINAS PÚBLICAS
// ==========================================
function PublicLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#0a0f1c] text-gray-900 dark:text-white transition-colors duration-300">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}

// ==========================================
// LAYOUT PARA PÁGINAS PRIVADAS
// ==========================================
function PrivateLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2E5C8A] via-[#6B4C8C] to-[#C76B99]">
      {children}
    </div>
  )
}

// ==========================================
// COMPONENTE APP PRINCIPAL
// ==========================================
function App() {
  const [user, setUser] = useState(null)
  const [userRole, setUserRole] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verificar sesión actual
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        loadUserRole(session.user.id)
      } else {
        setLoading(false)
      }
    })

    // Escuchar cambios de autenticación
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        loadUserRole(session.user.id)
      } else {
        setUserRole(null)
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const loadUserRole = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .single()

      if (error) {
        // Si no existe el rol, crear uno por defecto
        await supabase
          .from('user_roles')
          .insert({ user_id: userId, role: 'alumno' })
        setUserRole('alumno')
      } else {
        setUserRole(data?.role || 'alumno')
      }
    } catch (error) {
      console.error('Error loading role:', error)
      setUserRole('alumno')
    } finally {
      setLoading(false)
    }
  }

  // Componente de ruta protegida
  const ProtectedRoute = ({ children }) => {
    if (loading) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-[#2E5C8A] via-[#6B4C8C] to-[#C76B99] flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin" />
        </div>
      )
    }

    if (!user) {
      return <Navigate to="/login" replace />
    }

    return children
  }

  // Componente para redirigir al dashboard correcto
  const DashboardRedirect = () => {
    if (loading) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-[#2E5C8A] via-[#6B4C8C] to-[#C76B99] flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin" />
        </div>
      )
    }

    if (!user) {
      return <Navigate to="/login" replace />
    }

    // Redirigir según el rol
    if (userRole === 'admin' || userRole === 'mentor') {
      return <Navigate to="/mentor-dashboard" replace />
    } else {
      return <Navigate to="/alumno-dashboard" replace />
    }
  }

  return (
    <Router>
      <AppProvider>
        <Routes>
          {/* ========================================== */}
          {/* RUTAS PÚBLICAS - Con Navbar y Footer */}
          {/* ========================================== */}
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route 
            path="/login" 
            element={user ? <DashboardRedirect /> : <PublicLayout><Login /></PublicLayout>} 
          />
          <Route 
            path="/registro" 
            element={user ? <DashboardRedirect /> : <PublicLayout><Registro /></PublicLayout>} 
          />
          <Route path="/clases" element={<PublicLayout><Clases /></PublicLayout>} />
          <Route path="/universidad" element={<PublicLayout><Universidad /></PublicLayout>} />
          <Route path="/precios" element={<PublicLayout><Precios /></PublicLayout>} />
          <Route path="/contacto" element={<PublicLayout><Contacto /></PublicLayout>} />

          {/* ========================================== */}
          {/* RUTAS PRIVADAS - SIN Navbar ni Footer */}
          {/* ========================================== */}
          
          {/* Ruta de dashboard genérica - redirige al correcto según rol */}
          <Route 
            path="/dashboard" 
            element={<DashboardRedirect />} 
          />

          {/* Dashboard para alumnos */}
          <Route
            path="/alumno-dashboard"
            element={
              <ProtectedRoute>
                <PrivateLayout>
                  <AlumnoDashboard />
                </PrivateLayout>
              </ProtectedRoute>
            }
          />

          {/* Dashboard para mentores y admins */}
          <Route
            path="/mentor-dashboard"
            element={
              <ProtectedRoute>
                <PrivateLayout>
                  <MentorDashboard />
                </PrivateLayout>
              </ProtectedRoute>
            }
          />

          {/* Ruta de curso */}
          <Route
            path="/curso/:cursoId"
            element={
              <ProtectedRoute>
                <PrivateLayout>
                  <Curso />
                </PrivateLayout>
              </ProtectedRoute>
            }
          />

          {/* Ruta 404 - redirige a home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppProvider>
    </Router>
  )
}

export default App