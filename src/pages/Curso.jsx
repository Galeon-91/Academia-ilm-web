import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../lib/supabase'
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Circle,
  Clock,
  Download,
  Edit3,
  FileText,
  Lock,
  PlayCircle,
  Plus,
  Save,
  Trash2,
  Upload,
  X
} from 'lucide-react'

export default function Curso() {
  const { cursoId } = useParams()
  const navigate = useNavigate()
  
  const [user, setUser] = useState(null)
  const [userRole, setUserRole] = useState('alumno')
  const [loading, setLoading] = useState(true)
  
  const [curso, setCurso] = useState(null)
  const [lecciones, setLecciones] = useState([])
  const [leccionActual, setLeccionActual] = useState(null)
  const [progreso, setProgreso] = useState({})
  const [progresoTotal, setProgresoTotal] = useState(0)
  
  const [modoEdicion, setModoEdicion] = useState(false)
  const [editandoLeccion, setEditandoLeccion] = useState(null)
  const [subiendoArchivo, setSubiendoArchivo] = useState(false)

  // Estados para nueva lección
  const [nuevaLeccion, setNuevaLeccion] = useState({
    titulo: '',
    descripcion: '',
    video_url: '',
    duracion_min: 0,
    orden: 0
  })

  useEffect(() => {
    checkUser()
  }, [])

  useEffect(() => {
    if (user && cursoId) {
      loadCursoData()
    }
  }, [user, cursoId])

  const checkUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        navigate('/login')
        return
      }
      
      setUser(session.user)
      
      const { data: roleData } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id)
        .single()
      
      setUserRole(roleData?.role || 'alumno')
      
    } catch (error) {
      console.error('Error:', error)
      navigate('/login')
    }
  }

  const loadCursoData = async () => {
    try {
      setLoading(true)
      
      // Cargar curso
      const { data: cursoData } = await supabase
        .from('courses')
        .select('*')
        .eq('id', cursoId)
        .single()
      
      setCurso(cursoData)
      
      // Cargar lecciones
      const { data: leccionesData } = await supabase
        .from('lessons')
        .select('*')
        .eq('course_id', cursoId)
        .order('orden', { ascending: true })
      
      setLecciones(leccionesData || [])
      
      if (leccionesData && leccionesData.length > 0) {
        setLeccionActual(leccionesData[0])
      }
      
      // Cargar progreso del usuario
      const { data: progresoData } = await supabase
        .from('user_lesson_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('course_id', cursoId)
      
      const progresoMap = {}
      progresoData?.forEach(p => {
        progresoMap[p.lesson_id] = p.completed
      })
      setProgreso(progresoMap)
      
      // Calcular progreso total
      if (leccionesData && leccionesData.length > 0) {
        const completadas = Object.values(progresoMap).filter(Boolean).length
        const total = leccionesData.length
        setProgresoTotal(Math.round((completadas / total) * 100))
      }
      
    } catch (error) {
      console.error('Error cargando curso:', error)
    } finally {
      setLoading(false)
    }
  }

  const marcarComoCompletada = async (leccionId) => {
    try {
      const yaCompletada = progreso[leccionId]
      
      if (yaCompletada) {
        // Desmarcar
        await supabase
          .from('user_lesson_progress')
          .delete()
          .eq('user_id', user.id)
          .eq('lesson_id', leccionId)
        
        setProgreso(prev => ({ ...prev, [leccionId]: false }))
      } else {
        // Marcar como completada
        await supabase
          .from('user_lesson_progress')
          .insert({
            user_id: user.id,
            course_id: cursoId,
            lesson_id: leccionId,
            completed: true
          })
        
        setProgreso(prev => ({ ...prev, [leccionId]: true }))
      }
      
      // Recalcular progreso total
      const completadas = Object.values({ ...progreso, [leccionId]: !yaCompletada }).filter(Boolean).length
      const total = lecciones.length
      setProgresoTotal(Math.round((completadas / total) * 100))
      
    } catch (error) {
      console.error('Error actualizando progreso:', error)
    }
  }

  const crearLeccion = async () => {
    try {
      const { data, error } = await supabase
        .from('lessons')
        .insert({
          course_id: cursoId,
          title: nuevaLeccion.titulo,
          description: nuevaLeccion.descripcion,
          video_url: nuevaLeccion.video_url,
          duration_minutes: nuevaLeccion.duracion_min,
          orden: lecciones.length + 1
        })
        .select()
      
      if (!error) {
        await loadCursoData()
        setNuevaLeccion({
          titulo: '',
          descripcion: '',
          video_url: '',
          duracion_min: 0,
          orden: 0
        })
        setModoEdicion(false)
      }
    } catch (error) {
      console.error('Error creando lección:', error)
    }
  }

  const actualizarLeccion = async (leccionId, cambios) => {
    try {
      await supabase
        .from('lessons')
        .update(cambios)
        .eq('id', leccionId)
      
      await loadCursoData()
      setEditandoLeccion(null)
    } catch (error) {
      console.error('Error actualizando lección:', error)
    }
  }

  const eliminarLeccion = async (leccionId) => {
    if (!confirm('¿Seguro que quieres eliminar esta lección?')) return
    
    try {
      await supabase
        .from('lessons')
        .delete()
        .eq('id', leccionId)
      
      await loadCursoData()
    } catch (error) {
      console.error('Error eliminando lección:', error)
    }
  }

  const subirRecurso = async (leccionId, archivo) => {
    try {
      setSubiendoArchivo(true)
      
      const fileExt = archivo.name.split('.').pop()
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`
      const filePath = `course-resources/${cursoId}/${fileName}`
      
      const { error: uploadError } = await supabase.storage
        .from('course-files')
        .upload(filePath, archivo)
      
      if (uploadError) throw uploadError
      
      const { data: { publicUrl } } = supabase.storage
        .from('course-files')
        .getPublicUrl(filePath)
      
      await supabase
        .from('lesson_resources')
        .insert({
          lesson_id: leccionId,
          title: archivo.name,
          file_url: publicUrl,
          file_type: fileExt,
          file_size: archivo.size
        })
      
      await loadCursoData()
      
    } catch (error) {
      console.error('Error subiendo recurso:', error)
    } finally {
      setSubiendoArchivo(false)
    }
  }

  const getVideoEmbedUrl = (url) => {
    if (!url) return null
    
    // YouTube
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoId = url.split('v=')[1]?.split('&')[0] || url.split('/').pop()
      return `https://www.youtube.com/embed/${videoId}`
    }
    
    // Vimeo
    if (url.includes('vimeo.com')) {
      const videoId = url.split('/').pop()
      return `https://player.vimeo.com/video/${videoId}`
    }
    
    return url
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

  const puedeEditar = userRole === 'admin' || userRole === 'mentor'

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2E5C8A] via-[#6B4C8C] to-[#C76B99]">
      {/* HEADER */}
      <header className="bg-[#1a0f2e]/30 backdrop-blur-xl border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-2 text-white hover:text-[#87CEEB] transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">Volver</span>
              </motion.button>
              
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-white">{curso?.name}</h1>
                <p className="text-white/60 text-sm">{curso?.description}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-white/60 text-sm">Progreso del curso</p>
                <p className="text-2xl font-bold text-white">{progresoTotal}%</p>
              </div>
              
              <div className="w-20 h-20 relative">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="40"
                    cy="40"
                    r="35"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="35"
                    stroke="url(#progressGradient)"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 35}`}
                    strokeDashoffset={`${2 * Math.PI * 35 * (1 - progresoTotal / 100)}`}
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#87CEEB" />
                      <stop offset="100%" stopColor="#4A90C9" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex max-w-7xl mx-auto">
        {/* SIDEBAR - CONTENIDO DEL CURSO */}
        <aside className="w-96 bg-[#1a0f2e]/30 backdrop-blur-xl border-r border-white/10 h-[calc(100vh-4rem)] overflow-y-auto sticky top-16">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Contenido del Curso
              </h2>
              
              {puedeEditar && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setModoEdicion(!modoEdicion)}
                  className={`p-2 rounded-lg transition-colors ${
                    modoEdicion 
                      ? 'bg-red-500 text-white' 
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {modoEdicion ? <X className="w-5 h-5" /> : <Edit3 className="w-5 h-5" />}
                </motion.button>
              )}
            </div>

            {/* FORMULARIO NUEVA LECCIÓN (Solo Admin/Mentor) */}
            {puedeEditar && modoEdicion && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 rounded-xl p-4 mb-4 border border-white/10"
              >
                <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Nueva Lección
                </h3>
                
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Título de la lección"
                    value={nuevaLeccion.titulo}
                    onChange={(e) => setNuevaLeccion({ ...nuevaLeccion, titulo: e.target.value })}
                    className="w-full px-3 py-2 bg-white/10 rounded-lg text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-[#87CEEB]"
                  />
                  
                  <textarea
                    placeholder="Descripción"
                    value={nuevaLeccion.descripcion}
                    onChange={(e) => setNuevaLeccion({ ...nuevaLeccion, descripcion: e.target.value })}
                    className="w-full px-3 py-2 bg-white/10 rounded-lg text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-[#87CEEB] resize-none"
                    rows="3"
                  />
                  
                  <input
                    type="text"
                    placeholder="URL del video (YouTube/Vimeo)"
                    value={nuevaLeccion.video_url}
                    onChange={(e) => setNuevaLeccion({ ...nuevaLeccion, video_url: e.target.value })}
                    className="w-full px-3 py-2 bg-white/10 rounded-lg text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-[#87CEEB]"
                  />
                  
                  <input
                    type="number"
                    placeholder="Duración (minutos)"
                    value={nuevaLeccion.duracion_min}
                    onChange={(e) => setNuevaLeccion({ ...nuevaLeccion, duracion_min: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 bg-white/10 rounded-lg text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-[#87CEEB]"
                  />
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={crearLeccion}
                    disabled={!nuevaLeccion.titulo}
                    className="w-full px-4 py-2 bg-gradient-to-r from-[#87CEEB] to-[#4A90C9] text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Crear Lección
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* LISTA DE LECCIONES */}
            <div className="space-y-2">
              {lecciones.map((leccion, index) => {
                const completada = progreso[leccion.id]
                const esActual = leccionActual?.id === leccion.id
                
                return (
                  <motion.div
                    key={leccion.id}
                    whileHover={{ x: 5 }}
                    onClick={() => setLeccionActual(leccion)}
                    className={`p-4 rounded-xl cursor-pointer transition-all ${
                      esActual
                        ? 'bg-gradient-to-r from-[#87CEEB] to-[#4A90C9] text-white shadow-lg'
                        : 'bg-white/5 hover:bg-white/10 text-white/80'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {completada ? (
                          <CheckCircle2 className="w-5 h-5 text-green-400" />
                        ) : (
                          <Circle className="w-5 h-5 text-white/40" />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-medium opacity-60">
                            Lección {index + 1}
                          </span>
                          {leccion.duration_minutes && (
                            <span className="flex items-center gap-1 text-xs opacity-60">
                              <Clock className="w-3 h-3" />
                              {leccion.duration_minutes} min
                            </span>
                          )}
                        </div>
                        
                        <h3 className="font-semibold text-sm mb-1">
                          {leccion.title}
                        </h3>
                        
                        {leccion.description && (
                          <p className="text-xs opacity-70 line-clamp-2">
                            {leccion.description}
                          </p>
                        )}
                      </div>

                      {puedeEditar && modoEdicion && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            eliminarLeccion(leccion.id)
                          }}
                          className="flex-shrink-0 p-1 hover:bg-red-500/20 rounded"
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </aside>

        {/* CONTENIDO PRINCIPAL */}
        <main className="flex-1 p-6 overflow-y-auto">
          {leccionActual ? (
            <div className="space-y-6">
              {/* VIDEO PLAYER */}
              {leccionActual.video_url && (
                <div className="bg-[#1a0f2e]/30 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10">
                  <div className="aspect-video bg-black">
                    <iframe
                      src={getVideoEmbedUrl(leccionActual.video_url)}
                      className="w-full h-full"
                      allowFullScreen
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                  </div>
                </div>
              )}

              {/* INFO DE LA LECCIÓN */}
              <div className="bg-[#1a0f2e]/30 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-2">
                      {leccionActual.title}
                    </h2>
                    {leccionActual.description && (
                      <p className="text-white/70">{leccionActual.description}</p>
                    )}
                  </div>
                  
                  {leccionActual.duration_minutes && (
                    <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-white">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{leccionActual.duration_minutes} min</span>
                    </div>
                  )}
                </div>

                {/* BOTÓN MARCAR COMO COMPLETADA */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => marcarComoCompletada(leccionActual.id)}
                  className={`w-full px-6 py-3 rounded-xl font-semibold transition-all ${
                    progreso[leccionActual.id]
                      ? 'bg-green-500 text-white'
                      : 'bg-gradient-to-r from-[#87CEEB] to-[#4A90C9] text-white'
                  }`}
                >
                  {progreso[leccionActual.id] ? (
                    <span className="flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-5 h-5" />
                      Completada
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Circle className="w-5 h-5" />
                      Marcar como Completada
                    </span>
                  )}
                </motion.button>
              </div>

              {/* RECURSOS ADICIONALES */}
              <div className="bg-[#1a0f2e]/30 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Recursos Adicionales
                  </h3>
                  
                  {puedeEditar && (
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) subirRecurso(leccionActual.id, file)
                        }}
                      />
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
                      >
                        <Upload className="w-4 h-4" />
                        <span className="text-sm font-medium">Subir Recurso</span>
                      </motion.div>
                    </label>
                  )}
                </div>

                <div className="space-y-2">
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-xl cursor-pointer transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-red-500/20 rounded-lg">
                        <FileText className="w-5 h-5 text-red-400" />
                      </div>
                      <div>
                        <p className="text-white font-medium">Apuntes de la Lección</p>
                        <p className="text-white/60 text-sm">PDF • 2.3 MB</p>
                      </div>
                    </div>
                    <Download className="w-5 h-5 text-white/60" />
                  </motion.div>

                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-xl cursor-pointer transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-500/20 rounded-lg">
                        <FileText className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-white font-medium">Ejercicios Prácticos</p>
                        <p className="text-white/60 text-sm">PDF • 1.8 MB</p>
                      </div>
                    </div>
                    <Download className="w-5 h-5 text-white/60" />
                  </motion.div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <BookOpen className="w-20 h-20 text-white/30 mx-auto mb-4" />
                <p className="text-white/60 text-lg">Selecciona una lección para comenzar</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}