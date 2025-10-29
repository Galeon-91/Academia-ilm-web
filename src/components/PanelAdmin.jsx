import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../lib/supabase'
import {
  Plus,
  Edit3,
  Trash2,
  Save,
  X,
  BookOpen,
  Upload,
  FileText,
  Video,
  Clock,
  Check,
  AlertCircle,
  Eye,
  EyeOff,
  ChevronDown,
  Search,
  Filter
} from 'lucide-react'

export default function PanelAdmin({ user, userRole }) {
  const [activeTab, setActiveTab] = useState('cursos') // cursos, lecciones, recursos
  const [loading, setLoading] = useState(false)
  
  // Estados para cursos
  const [cursos, setCursos] = useState([])
  const [cursoSeleccionado, setCursoSeleccionado] = useState(null)
  const [mostrarFormularioCurso, setMostrarFormularioCurso] = useState(false)
  const [editandoCurso, setEditandoCurso] = useState(null)
  
  // Estados para lecciones
  const [lecciones, setLecciones] = useState([])
  const [mostrarFormularioLeccion, setMostrarFormularioLeccion] = useState(false)
  const [editandoLeccion, setEditandoLeccion] = useState(null)
  
  // Estados para recursos
  const [recursos, setRecursos] = useState([])
  const [subiendoArchivo, setSubiendoArchivo] = useState(false)
  
  // Filtros y búsqueda
  const [busqueda, setBusqueda] = useState('')
  const [filtroCategoria, setFiltroCategoria] = useState('todos')
  
  // Mensajes
  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' })

  // Formularios
  const [formCurso, setFormCurso] = useState({
    name: '',
    description: '',
    category: 'ESO',
    level: '1º ESO',
    is_active: true
  })

  const [formLeccion, setFormLeccion] = useState({
    course_id: '',
    title: '',
    description: '',
    video_url: '',
    duration_minutes: 0,
    orden: 0
  })

  const categorias = [
    { id: 'ESO', label: 'ESO' },
    { id: 'Bachillerato', label: 'Bachillerato' },
    { id: 'Universidad', label: 'Universidad' },
    { id: 'Programación', label: 'Programación' },
    { id: 'Idiomas', label: 'Idiomas' },
    { id: 'Otros', label: 'Otros' }
  ]

  const nivelesESO = ['1º ESO', '2º ESO', '3º ESO', '4º ESO']
  const nivelesBach = ['1º Bachillerato', '2º Bachillerato']

  useEffect(() => {
    cargarCursos()
  }, [])

  useEffect(() => {
    if (cursoSeleccionado) {
      cargarLecciones(cursoSeleccionado)
    }
  }, [cursoSeleccionado])

  const mostrarMensaje = (tipo, texto) => {
    setMensaje({ tipo, texto })
    setTimeout(() => setMensaje({ tipo: '', texto: '' }), 5000)
  }

  // ==========================================
  // GESTIÓN DE CURSOS
  // ==========================================

  const cargarCursos = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      setCursos(data || [])
    } catch (error) {
      console.error('Error cargando cursos:', error)
      mostrarMensaje('error', 'Error al cargar cursos')
    } finally {
      setLoading(false)
    }
  }

  const crearCurso = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('courses')
        .insert([formCurso])
        .select()
      
      if (error) throw error
      
      mostrarMensaje('success', '✅ Curso creado exitosamente')
      setMostrarFormularioCurso(false)
      setFormCurso({
        name: '',
        description: '',
        category: 'ESO',
        level: '1º ESO',
        is_active: true
      })
      await cargarCursos()
    } catch (error) {
      console.error('Error creando curso:', error)
      mostrarMensaje('error', '❌ Error al crear curso')
    } finally {
      setLoading(false)
    }
  }

  const actualizarCurso = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const { error } = await supabase
        .from('courses')
        .update(formCurso)
        .eq('id', editandoCurso.id)
      
      if (error) throw error
      
      mostrarMensaje('success', '✅ Curso actualizado')
      setEditandoCurso(null)
      setMostrarFormularioCurso(false)
      await cargarCursos()
    } catch (error) {
      console.error('Error actualizando curso:', error)
      mostrarMensaje('error', '❌ Error al actualizar')
    } finally {
      setLoading(false)
    }
  }

  const eliminarCurso = async (cursoId) => {
    if (!confirm('¿Seguro que quieres eliminar este curso? Se eliminarán también todas sus lecciones.')) return
    
    try {
      setLoading(true)
      const { error } = await supabase
        .from('courses')
        .delete()
        .eq('id', cursoId)
      
      if (error) throw error
      
      mostrarMensaje('success', '✅ Curso eliminado')
      await cargarCursos()
    } catch (error) {
      console.error('Error eliminando curso:', error)
      mostrarMensaje('error', '❌ Error al eliminar')
    } finally {
      setLoading(false)
    }
  }

  const abrirEdicionCurso = (curso) => {
    setEditandoCurso(curso)
    setFormCurso({
      name: curso.name,
      description: curso.description || '',
      category: curso.category || 'ESO',
      level: curso.level || '1º ESO',
      is_active: curso.is_active !== false
    })
    setMostrarFormularioCurso(true)
  }

  // ==========================================
  // GESTIÓN DE LECCIONES
  // ==========================================

  const cargarLecciones = async (cursoId) => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('lessons')
        .select('*')
        .eq('course_id', cursoId)
        .order('orden', { ascending: true })
      
      if (error) throw error
      setLecciones(data || [])
    } catch (error) {
      console.error('Error cargando lecciones:', error)
      mostrarMensaje('error', 'Error al cargar lecciones')
    } finally {
      setLoading(false)
    }
  }

  const crearLeccion = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const { error } = await supabase
        .from('lessons')
        .insert([{
          ...formLeccion,
          course_id: cursoSeleccionado
        }])
      
      if (error) throw error
      
      mostrarMensaje('success', '✅ Lección creada')
      setMostrarFormularioLeccion(false)
      setFormLeccion({
        course_id: '',
        title: '',
        description: '',
        video_url: '',
        duration_minutes: 0,
        orden: 0
      })
      await cargarLecciones(cursoSeleccionado)
    } catch (error) {
      console.error('Error creando lección:', error)
      mostrarMensaje('error', '❌ Error al crear lección')
    } finally {
      setLoading(false)
    }
  }

  const actualizarLeccion = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const { error } = await supabase
        .from('lessons')
        .update(formLeccion)
        .eq('id', editandoLeccion.id)
      
      if (error) throw error
      
      mostrarMensaje('success', '✅ Lección actualizada')
      setEditandoLeccion(null)
      setMostrarFormularioLeccion(false)
      await cargarLecciones(cursoSeleccionado)
    } catch (error) {
      console.error('Error actualizando lección:', error)
      mostrarMensaje('error', '❌ Error al actualizar')
    } finally {
      setLoading(false)
    }
  }

  const eliminarLeccion = async (leccionId) => {
    if (!confirm('¿Seguro que quieres eliminar esta lección?')) return
    
    try {
      setLoading(true)
      const { error } = await supabase
        .from('lessons')
        .delete()
        .eq('id', leccionId)
      
      if (error) throw error
      
      mostrarMensaje('success', '✅ Lección eliminada')
      await cargarLecciones(cursoSeleccionado)
    } catch (error) {
      console.error('Error eliminando lección:', error)
      mostrarMensaje('error', '❌ Error al eliminar')
    } finally {
      setLoading(false)
    }
  }

  const abrirEdicionLeccion = (leccion) => {
    setEditandoLeccion(leccion)
    setFormLeccion({
      course_id: leccion.course_id,
      title: leccion.title,
      description: leccion.description || '',
      video_url: leccion.video_url || '',
      duration_minutes: leccion.duration_minutes || 0,
      orden: leccion.orden || 0
    })
    setMostrarFormularioLeccion(true)
  }

  // ==========================================
  // GESTIÓN DE RECURSOS
  // ==========================================

  const subirRecurso = async (leccionId, archivo) => {
    try {
      setSubiendoArchivo(true)
      
      const fileExt = archivo.name.split('.').pop()
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`
      const filePath = `course-resources/${cursoSeleccionado}/${fileName}`
      
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
      
      mostrarMensaje('success', '✅ Recurso subido')
      
    } catch (error) {
      console.error('Error subiendo recurso:', error)
      mostrarMensaje('error', '❌ Error al subir archivo')
    } finally {
      setSubiendoArchivo(false)
    }
  }

  // ==========================================
  // FILTROS
  // ==========================================

  const cursosFiltrados = cursos.filter(curso => {
    const matchBusqueda = curso.name.toLowerCase().includes(busqueda.toLowerCase()) ||
                          (curso.description || '').toLowerCase().includes(busqueda.toLowerCase())
    const matchCategoria = filtroCategoria === 'todos' || curso.category === filtroCategoria
    return matchBusqueda && matchCategoria
  })

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div className="space-y-6">
      {/* MENSAJE DE NOTIFICACIÓN */}
      <AnimatePresence>
        {mensaje.texto && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`p-4 rounded-xl flex items-center gap-3 ${
              mensaje.tipo === 'success' 
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : 'bg-red-500/20 text-red-400 border border-red-500/30'
            }`}
          >
            {mensaje.tipo === 'success' ? <Check className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            <span>{mensaje.texto}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Panel de Administración</h2>
          <p className="text-white/60">Gestiona cursos, lecciones y recursos</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setMostrarFormularioCurso(true)
            setEditandoCurso(null)
            setFormCurso({
              name: '',
              description: '',
              category: 'ESO',
              level: '1º ESO',
              is_active: true
            })
          }}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#87CEEB] to-[#4A90C9] text-white font-semibold rounded-xl shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Crear Curso Nuevo
        </motion.button>
      </div>

      {/* TABS */}
      <div className="flex gap-2">
        {[
          { id: 'cursos', label: 'Cursos', icon: BookOpen },
          { id: 'lecciones', label: 'Lecciones', icon: Video },
          { id: 'recursos', label: 'Recursos', icon: FileText }
        ].map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          
          return (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-[#87CEEB] to-[#4A90C9] text-white shadow-lg'
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </motion.button>
          )
        })}
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <AnimatePresence mode="wait">
        {/* TAB: CURSOS */}
        {activeTab === 'cursos' && (
          <motion.div
            key="cursos"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {/* BÚSQUEDA Y FILTROS */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  placeholder="Buscar cursos..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 rounded-xl text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-[#87CEEB] border border-white/10"
                />
              </div>

              <select
                value={filtroCategoria}
                onChange={(e) => setFiltroCategoria(e.target.value)}
                className="px-4 py-3 bg-white/5 rounded-xl text-white outline-none focus:ring-2 focus:ring-[#87CEEB] border border-white/10"
              >
                <option value="todos">Todas las categorías</option>
                {categorias.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.label}</option>
                ))}
              </select>
            </div>

            {/* LISTA DE CURSOS */}
            {loading ? (
              <div className="flex justify-center py-12">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full"
                />
              </div>
            ) : cursosFiltrados.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-white/30 mx-auto mb-4" />
                <p className="text-white/60 text-lg">No hay cursos aún</p>
                <p className="text-white/40 text-sm">Crea tu primer curso arriba</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {cursosFiltrados.map((curso) => (
                  <motion.div
                    key={curso.id}
                    whileHover={{ y: -5 }}
                    className="bg-[#1a0f2e]/30 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-1">{curso.name}</h3>
                        <div className="flex flex-wrap gap-2 mb-2">
                          <span className="px-2 py-1 bg-[#87CEEB]/20 text-[#87CEEB] text-xs rounded-full">
                            {curso.category}
                          </span>
                          {curso.level && (
                            <span className="px-2 py-1 bg-[#9B7FB8]/20 text-[#9B7FB8] text-xs rounded-full">
                              {curso.level}
                            </span>
                          )}
                        </div>
                        {curso.description && (
                          <p className="text-white/60 text-sm line-clamp-2">{curso.description}</p>
                        )}
                      </div>
                      
                      {curso.is_active ? (
                        <Eye className="w-5 h-5 text-green-400" />
                      ) : (
                        <EyeOff className="w-5 h-5 text-red-400" />
                      )}
                    </div>

                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setCursoSeleccionado(curso.id)
                          setActiveTab('lecciones')
                        }}
                        className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm"
                      >
                        Ver Lecciones
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => abrirEdicionCurso(curso)}
                        className="p-2 bg-[#87CEEB]/20 hover:bg-[#87CEEB]/30 text-[#87CEEB] rounded-lg transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => eliminarCurso(curso.id)}
                        className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* TAB: LECCIONES */}
        {activeTab === 'lecciones' && (
          <motion.div
            key="lecciones"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {!cursoSeleccionado ? (
              <div className="text-center py-12">
                <Video className="w-16 h-16 text-white/30 mx-auto mb-4" />
                <p className="text-white/60 text-lg">Selecciona un curso primero</p>
                <p className="text-white/40 text-sm">Ve a la pestaña "Cursos" y selecciona uno</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      Lecciones del curso: {cursos.find(c => c.id === cursoSeleccionado)?.name}
                    </h3>
                    <p className="text-white/60 text-sm">{lecciones.length} lecciones</p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setMostrarFormularioLeccion(true)
                      setEditandoLeccion(null)
                      setFormLeccion({
                        course_id: cursoSeleccionado,
                        title: '',
                        description: '',
                        video_url: '',
                        duration_minutes: 0,
                        orden: lecciones.length + 1
                      })
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#87CEEB] to-[#4A90C9] text-white font-semibold rounded-xl shadow-lg"
                  >
                    <Plus className="w-4 h-4" />
                    Agregar Lección
                  </motion.button>
                </div>

                {lecciones.length === 0 ? (
                  <div className="text-center py-12">
                    <Video className="w-16 h-16 text-white/30 mx-auto mb-4" />
                    <p className="text-white/60 text-lg">Sin lecciones aún</p>
                    <p className="text-white/40 text-sm">Agrega la primera lección</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {lecciones.map((leccion, idx) => (
                      <motion.div
                        key={leccion.id}
                        whileHover={{ x: 5 }}
                        className="bg-[#1a0f2e]/30 backdrop-blur-xl rounded-xl p-4 border border-white/10"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-white/40 font-mono text-sm">#{idx + 1}</span>
                              <h4 className="text-white font-semibold">{leccion.title}</h4>
                              {leccion.duration_minutes > 0 && (
                                <span className="flex items-center gap-1 text-white/60 text-xs">
                                  <Clock className="w-3 h-3" />
                                  {leccion.duration_minutes} min
                                </span>
                              )}
                            </div>
                            {leccion.description && (
                              <p className="text-white/60 text-sm mb-2">{leccion.description}</p>
                            )}
                            {leccion.video_url && (
                              <a
                                href={leccion.video_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#87CEEB] text-xs hover:underline"
                              >
                                Ver video →
                              </a>
                            )}
                          </div>

                          <div className="flex gap-2">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => abrirEdicionLeccion(leccion)}
                              className="p-2 bg-[#87CEEB]/20 hover:bg-[#87CEEB]/30 text-[#87CEEB] rounded-lg transition-colors"
                            >
                              <Edit3 className="w-4 h-4" />
                            </motion.button>
                            
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => eliminarLeccion(leccion.id)}
                              className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </>
            )}
          </motion.div>
        )}

        {/* TAB: RECURSOS */}
        {activeTab === 'recursos' && (
          <motion.div
            key="recursos"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center py-12"
          >
            <FileText className="w-16 h-16 text-white/30 mx-auto mb-4" />
            <p className="text-white/60 text-lg">Gestión de recursos</p>
            <p className="text-white/40 text-sm">Los recursos se gestionan desde cada lección en la página del curso</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL: FORMULARIO CURSO */}
      <AnimatePresence>
        {mostrarFormularioCurso && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMostrarFormularioCurso(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-[#1a0f2e] rounded-2xl p-6 z-50 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">
                  {editandoCurso ? 'Editar Curso' : 'Crear Nuevo Curso'}
                </h3>
                <button
                  onClick={() => setMostrarFormularioCurso(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>

              <form onSubmit={editandoCurso ? actualizarCurso : crearCurso} className="space-y-4">
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    Nombre del Curso *
                  </label>
                  <input
                    type="text"
                    required
                    value={formCurso.name}
                    onChange={(e) => setFormCurso({ ...formCurso, name: e.target.value })}
                    placeholder="Ej: Matemáticas Avanzadas"
                    className="w-full px-4 py-3 bg-white/5 rounded-xl text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-[#87CEEB] border border-white/10"
                  />
                </div>

                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    Descripción
                  </label>
                  <textarea
                    value={formCurso.description}
                    onChange={(e) => setFormCurso({ ...formCurso, description: e.target.value })}
                    placeholder="Describe el contenido del curso..."
                    rows="4"
                    className="w-full px-4 py-3 bg-white/5 rounded-xl text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-[#87CEEB] border border-white/10 resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Categoría *
                    </label>
                    <select
                      required
                      value={formCurso.category}
                      onChange={(e) => setFormCurso({ ...formCurso, category: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 rounded-xl text-white outline-none focus:ring-2 focus:ring-[#87CEEB] border border-white/10"
                    >
                      {categorias.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Nivel
                    </label>
                    <select
                      value={formCurso.level}
                      onChange={(e) => setFormCurso({ ...formCurso, level: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 rounded-xl text-white outline-none focus:ring-2 focus:ring-[#87CEEB] border border-white/10"
                    >
                      <option value="">Sin nivel específico</option>
                      <optgroup label="ESO">
                        {nivelesESO.map(nivel => (
                          <option key={nivel} value={nivel}>{nivel}</option>
                        ))}
                      </optgroup>
                      <optgroup label="Bachillerato">
                        {nivelesBach.map(nivel => (
                          <option key={nivel} value={nivel}>{nivel}</option>
                        ))}
                      </optgroup>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={formCurso.is_active}
                    onChange={(e) => setFormCurso({ ...formCurso, is_active: e.target.checked })}
                    className="w-5 h-5 rounded"
                  />
                  <label htmlFor="is_active" className="text-white/80 text-sm">
                    Curso activo (visible para alumnos)
                  </label>
                </div>

                <div className="flex gap-3 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => setMostrarFormularioCurso(false)}
                    className="flex-1 px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-colors"
                  >
                    Cancelar
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-[#87CEEB] to-[#4A90C9] text-white font-semibold rounded-xl shadow-lg disabled:opacity-50"
                  >
                    {loading ? 'Guardando...' : (editandoCurso ? 'Actualizar' : 'Crear Curso')}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* MODAL: FORMULARIO LECCIÓN */}
      <AnimatePresence>
        {mostrarFormularioLeccion && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMostrarFormularioLeccion(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-[#1a0f2e] rounded-2xl p-6 z-50 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">
                  {editandoLeccion ? 'Editar Lección' : 'Nueva Lección'}
                </h3>
                <button
                  onClick={() => setMostrarFormularioLeccion(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>

              <form onSubmit={editandoLeccion ? actualizarLeccion : crearLeccion} className="space-y-4">
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    Título de la Lección *
                  </label>
                  <input
                    type="text"
                    required
                    value={formLeccion.title}
                    onChange={(e) => setFormLeccion({ ...formLeccion, title: e.target.value })}
                    placeholder="Ej: Introducción al Cálculo"
                    className="w-full px-4 py-3 bg-white/5 rounded-xl text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-[#87CEEB] border border-white/10"
                  />
                </div>

                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    Descripción
                  </label>
                  <textarea
                    value={formLeccion.description}
                    onChange={(e) => setFormLeccion({ ...formLeccion, description: e.target.value })}
                    placeholder="Describe el contenido de esta lección..."
                    rows="3"
                    className="w-full px-4 py-3 bg-white/5 rounded-xl text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-[#87CEEB] border border-white/10 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    URL del Video (YouTube/Vimeo)
                  </label>
                  <input
                    type="url"
                    value={formLeccion.video_url}
                    onChange={(e) => setFormLeccion({ ...formLeccion, video_url: e.target.value })}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full px-4 py-3 bg-white/5 rounded-xl text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-[#87CEEB] border border-white/10"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Duración (minutos)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formLeccion.duration_minutes}
                      onChange={(e) => setFormLeccion({ ...formLeccion, duration_minutes: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-3 bg-white/5 rounded-xl text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-[#87CEEB] border border-white/10"
                    />
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Orden
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formLeccion.orden}
                      onChange={(e) => setFormLeccion({ ...formLeccion, orden: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-3 bg-white/5 rounded-xl text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-[#87CEEB] border border-white/10"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => setMostrarFormularioLeccion(false)}
                    className="flex-1 px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-colors"
                  >
                    Cancelar
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-[#87CEEB] to-[#4A90C9] text-white font-semibold rounded-xl shadow-lg disabled:opacity-50"
                  >
                    {loading ? 'Guardando...' : (editandoLeccion ? 'Actualizar' : 'Crear Lección')}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}