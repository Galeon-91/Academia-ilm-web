import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, Info, AlertCircle, AlertTriangle } from 'lucide-react'
import { supabase } from '../lib/supabase'

// ==========================================
// ICONOS SVG ANIMADOS PARA NOTIFICACIONES
// ==========================================

const SuccessIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 64 64">
    <motion.circle
      cx="32"
      cy="32"
      r="28"
      fill="none"
      stroke="#10b981"
      strokeWidth="4"
      initial={{ pathLength: 0, rotate: -90 }}
      animate={{ pathLength: 1, rotate: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    />
    <motion.path
      d="M 20 32 L 28 40 L 44 24"
      fill="none"
      stroke="#10b981"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.4, delay: 0.3 }}
    />
  </svg>
)

const InfoIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 64 64">
    <motion.circle
      cx="32"
      cy="32"
      r="28"
      fill="none"
      stroke="#3b82f6"
      strokeWidth="4"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.4, type: "spring" }}
    />
    <motion.text
      x="32"
      y="42"
      fontSize="32"
      fontWeight="bold"
      fill="#3b82f6"
      textAnchor="middle"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      i
    </motion.text>
  </svg>
)

const WarningIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 64 64">
    <motion.path
      d="M 32 8 L 56 52 L 8 52 Z"
      fill="none"
      stroke="#f59e0b"
      strokeWidth="4"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.6 }}
    />
    <motion.line
      x1="32"
      y1="24"
      x2="32"
      y2="36"
      stroke="#f59e0b"
      strokeWidth="4"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ delay: 0.3 }}
    />
    <motion.circle
      cx="32"
      cy="44"
      r="2"
      fill="#f59e0b"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.5, type: "spring" }}
    />
  </svg>
)

const ErrorIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 64 64">
    <motion.circle
      cx="32"
      cy="32"
      r="28"
      fill="none"
      stroke="#ef4444"
      strokeWidth="4"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3, type: "spring" }}
    />
    <motion.path
      d="M 22 22 L 42 42 M 42 22 L 22 42"
      stroke="#ef4444"
      strokeWidth="4"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    />
  </svg>
)

// ==========================================
// COMPONENTE: NOTIFICATION ITEM
// ==========================================

const NotificationItem = ({ notification, onClose, onMarkRead }) => {
  const [progress, setProgress] = useState(100)
  
  // Auto-cerrar después de 5 segundos
  useEffect(() => {
    const duration = 5000
    const interval = 50
    const decrement = (interval / duration) * 100
    
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(timer)
          onClose(notification.id)
          return 0
        }
        return prev - decrement
      })
    }, interval)
    
    return () => clearInterval(timer)
  }, [notification.id, onClose])

  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return <SuccessIcon />
      case 'info':
        return <InfoIcon />
      case 'warning':
        return <WarningIcon />
      case 'error':
        return <ErrorIcon />
      default:
        return <InfoIcon />
    }
  }

  const getColors = () => {
    switch (notification.type) {
      case 'success':
        return {
          bg: 'from-emerald-500/20 to-green-500/20',
          border: 'border-emerald-500/30',
          text: 'text-emerald-400',
          progress: 'bg-emerald-500'
        }
      case 'info':
        return {
          bg: 'from-blue-500/20 to-cyan-500/20',
          border: 'border-blue-500/30',
          text: 'text-blue-400',
          progress: 'bg-blue-500'
        }
      case 'warning':
        return {
          bg: 'from-amber-500/20 to-yellow-500/20',
          border: 'border-amber-500/30',
          text: 'text-amber-400',
          progress: 'bg-amber-500'
        }
      case 'error':
        return {
          bg: 'from-red-500/20 to-rose-500/20',
          border: 'border-red-500/30',
          text: 'text-red-400',
          progress: 'bg-red-500'
        }
      default:
        return {
          bg: 'from-blue-500/20 to-cyan-500/20',
          border: 'border-blue-500/30',
          text: 'text-blue-400',
          progress: 'bg-blue-500'
        }
    }
  }

  const colors = getColors()

  const handleClick = () => {
    if (!notification.read) {
      onMarkRead(notification.id)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 400, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 400, scale: 0.8 }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
      onClick={handleClick}
      className={`relative w-full max-w-sm bg-gradient-to-r ${colors.bg} backdrop-blur-xl rounded-2xl border ${colors.border} shadow-2xl overflow-hidden cursor-pointer`}
    >
      {/* Contenido */}
      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* Icono animado */}
          <div className="flex-shrink-0">
            {getIcon()}
          </div>

          {/* Texto */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h4 className="text-white font-bold text-sm">
                {notification.icon && <span className="mr-1">{notification.icon}</span>}
                {notification.title}
              </h4>
              
              {/* Botón cerrar */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation()
                  onClose(notification.id)
                }}
                className="flex-shrink-0 p-1 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-4 h-4 text-white/60 hover:text-white" />
              </motion.button>
            </div>
            
            <p className="text-white/70 text-sm mt-1">
              {notification.message}
            </p>
          </div>
        </div>
      </div>

      {/* Barra de progreso */}
      <div className="h-1 bg-white/10">
        <motion.div
          className={`h-full ${colors.progress}`}
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.05, ease: "linear" }}
        />
      </div>
    </motion.div>
  )
}

// ==========================================
// COMPONENTE PRINCIPAL: NOTIFICATION SYSTEM
// ==========================================

export default function NotificationSystem({ userId }) {
  const [notifications, setNotifications] = useState([])

  // ==========================================
  // CARGAR NOTIFICACIONES DESDE SUPABASE
  // ==========================================
  useEffect(() => {
    if (!userId) return

    const loadNotifications = async () => {
      try {
        const { data, error } = await supabase
          .from('notifications')
          .select('*')
          .eq('user_id', userId)
          .eq('read', false)
          .order('created_at', { ascending: false })
          .limit(5)

        if (error) throw error
        setNotifications(data || [])
      } catch (error) {
        console.error('Error cargando notificaciones:', error)
      }
    }

    loadNotifications()

    // Suscripción en tiempo real a nuevas notificaciones
    const channel = supabase
      .channel('notifications-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userId}`
        },
        (payload) => {
          setNotifications((prev) => [payload.new, ...prev].slice(0, 5))
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [userId])

  // ==========================================
  // CERRAR NOTIFICACIÓN
  // ==========================================
  const handleClose = async (notificationId) => {
    // Remover de la UI inmediatamente
    setNotifications((prev) => prev.filter((n) => n.id !== notificationId))

    // Marcar como leída en la BD
    try {
      await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', notificationId)
    } catch (error) {
      console.error('Error cerrando notificación:', error)
    }
  }

  // ==========================================
  // MARCAR COMO LEÍDA
  // ==========================================
  const handleMarkRead = async (notificationId) => {
    try {
      await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', notificationId)

      setNotifications((prev) =>
        prev.map((n) =>
          n.id === notificationId ? { ...n, read: true } : n
        )
      )
    } catch (error) {
      console.error('Error marcando notificación:', error)
    }
  }

  // ==========================================
  // RENDER
  // ==========================================
  return (
    <div className="fixed top-4 right-4 z-[9999] space-y-3 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {notifications.map((notification) => (
          <div key={notification.id} className="pointer-events-auto">
            <NotificationItem
              notification={notification}
              onClose={handleClose}
              onMarkRead={handleMarkRead}
            />
          </div>
        ))}
      </AnimatePresence>
    </div>
  )
}

// ==========================================
// HELPER: Crear notificación programáticamente
// ==========================================

export const createNotification = async (userId, type, title, message, icon = null) => {
  try {
    const { error } = await supabase
      .from('notifications')
      .insert({
        user_id: userId,
        type,
        title,
        message,
        icon
      })

    if (error) throw error
    return true
  } catch (error) {
    console.error('Error creando notificación:', error)
    return false
  }
}

// ==========================================
// EJEMPLOS DE USO:
// ==========================================

// En Dashboard.jsx:
// import NotificationSystem, { createNotification } from '../components/NotificationSystem'
//
// <NotificationSystem userId={user?.id} />
//
// Al completar una lección:
// await createNotification(user.id, 'success', '¡Lección Completada!', 'Has terminado la lección 1', '✅')
//
// Al subir un archivo:
// await createNotification(user.id, 'info', 'Archivo Subido', 'Tu archivo se subió correctamente', '📄')