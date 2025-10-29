import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, GraduationCap, Users, ChevronDown } from 'lucide-react'
import { supabase } from '../lib/supabase'

export default function RoleSelector({ currentRole, userId, onRoleChange }) {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const roles = [
    { 
      value: 'alumno', 
      label: 'Alumno', 
      icon: GraduationCap, 
      color: 'from-[#87CEEB] to-[#4A90C9]',
      description: 'Ver cursos y aprender'
    },
    { 
      value: 'mentor', 
      label: 'Mentor', 
      icon: Users, 
      color: 'from-[#9B7FB8] to-[#6B4C8C]',
      description: 'Gestionar cursos y alumnos'
    },
    { 
      value: 'admin', 
      label: 'Admin', 
      icon: Shield, 
      color: 'from-[#FFB380] to-[#FF9E8B]',
      description: 'Control total de la plataforma'
    },
  ]

  const currentRoleData = roles.find(r => r.value === currentRole)

  const handleRoleChange = async (newRole) => {
    if (newRole === currentRole) {
      setIsOpen(false)
      return
    }

    try {
      setLoading(true)

      // Actualizar rol en Supabase
      const { error } = await supabase
        .from('user_roles')
        .update({ role: newRole })
        .eq('user_id', userId)

      if (error) throw error

      // Notificar al componente padre
      if (onRoleChange) {
        onRoleChange(newRole)
      }

      setIsOpen(false)
    } catch (error) {
      console.error('Error cambiando rol:', error)
      alert('Error al cambiar de rol')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative">
      {/* Botón Selector */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        disabled={loading}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r ${currentRoleData?.color} text-white font-medium shadow-lg hover:shadow-xl transition-all disabled:opacity-50`}
      >
        {currentRoleData && (
          <>
            <currentRoleData.icon className="w-5 h-5" />
            <span>{currentRoleData.label}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </>
        )}
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 right-0 w-72 bg-[#1a0f2e]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50"
          >
            <div className="p-3 space-y-2">
              {roles.map((role) => {
                const Icon = role.icon
                const isActive = role.value === currentRole

                return (
                  <motion.button
                    key={role.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleRoleChange(role.value)}
                    disabled={loading}
                    className={`w-full flex items-start gap-3 p-3 rounded-xl transition-all ${
                      isActive
                        ? `bg-gradient-to-r ${role.color}`
                        : 'bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${
                      isActive ? 'bg-white/20' : 'bg-white/10'
                    }`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-white font-semibold">{role.label}</p>
                      <p className="text-white/60 text-xs">{role.description}</p>
                    </div>
                    {isActive && (
                      <div className="w-2 h-2 rounded-full bg-white mt-2" />
                    )}
                  </motion.button>
                )
              })}
            </div>

            <div className="px-4 py-3 bg-white/5 border-t border-white/10">
              <p className="text-white/40 text-xs text-center">
                Cambia de rol para ver diferentes vistas del dashboard
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay para cerrar al hacer click fuera */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}