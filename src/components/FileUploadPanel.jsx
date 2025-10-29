import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Upload, 
  X, 
  File, 
  FileText, 
  FileSpreadsheet,
  FileArchive,
  Video,
  Image as ImageIcon,
  Download,
  Trash2,
  Check,
  Loader
} from 'lucide-react'
import { supabase } from '../lib/supabase'
import { createNotification } from './NotificationSystem'

// ==========================================
// ICONOS POR TIPO DE ARCHIVO
// ==========================================

const getFileIcon = (fileType) => {
  const iconProps = { className: "w-8 h-8" }
  
  if (fileType.includes('pdf')) return <FileText {...iconProps} className="w-8 h-8 text-red-400" />
  if (fileType.includes('presentation') || fileType.includes('powerpoint')) 
    return <File {...iconProps} className="w-8 h-8 text-orange-400" />
  if (fileType.includes('sheet') || fileType.includes('excel')) 
    return <FileSpreadsheet {...iconProps} className="w-8 h-8 text-green-400" />
  if (fileType.includes('zip') || fileType.includes('rar') || fileType.includes('compressed')) 
    return <FileArchive {...iconProps} className="w-8 h-8 text-purple-400" />
  if (fileType.includes('video')) 
    return <Video {...iconProps} className="w-8 h-8 text-blue-400" />
  if (fileType.includes('image')) 
    return <ImageIcon {...iconProps} className="w-8 h-8 text-pink-400" />
  
  return <File {...iconProps} className="w-8 h-8 text-gray-400" />
}

// ==========================================
// COMPONENTE: FILE UPLOAD PANEL
// ==========================================

export default function FileUploadPanel({ userRole, userId, courseId, lessonId = null }) {
  const [files, setFiles] = useState([])
  const [uploading, setUploading] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [fileDescription, setFileDescription] = useState('')
  const fileInputRef = useRef(null)

  // Verificar permisos
  const canUpload = userRole === 'mentor' || userRole === 'admin'

  // ==========================================
  // CARGAR ARCHIVOS EXISTENTES
  // ==========================================
  useEffect(() => {
    loadFiles()
  }, [courseId, lessonId])

  const loadFiles = async () => {
    try {
      let query = supabase
        .from('course_files')
        .select(`
          *,
          uploader:uploaded_by(email)
        `)
        .eq('course_id', courseId)

      if (lessonId) {
        query = query.eq('lesson_id', lessonId)
      } else {
        query = query.is('lesson_id', null)
      }

      const { data, error } = await query.order('created_at', { ascending: false })

      if (error) throw error
      setFiles(data || [])
    } catch (error) {
      console.error('Error cargando archivos:', error)
    }
  }

  // ==========================================
  // SELECCIONAR ARCHIVO
  // ==========================================
  const handleFileSelect = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validar tamaño (máx 50MB)
    if (file.size > 50 * 1024 * 1024) {
      alert('El archivo debe ser menor a 50MB')
      return
    }

    setSelectedFile(file)
    setShowUploadModal(true)
  }

  // ==========================================
  // SUBIR ARCHIVO A SUPABASE STORAGE
  // ==========================================
  const handleUpload = async () => {
    if (!selectedFile || !userId) return

    setUploading(true)

    try {
      // Generar nombre único
      const fileExt = selectedFile.name.split('.').pop()
      const fileName = `${courseId}-${Date.now()}-${selectedFile.name}`
      const filePath = `course-${courseId}/${fileName}`

      // Subir a Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('course-files')
        .upload(filePath, selectedFile, {
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) throw uploadError

      // Obtener URL pública
      const { data: urlData } = supabase.storage
        .from('course-files')
        .getPublicUrl(filePath)

      const fileUrl = urlData.publicUrl

      // Guardar metadata en base de datos
      const { error: dbError } = await supabase
        .from('course_files')
        .insert({
          course_id: courseId,
          lesson_id: lessonId,
          uploaded_by: userId,
          file_name: selectedFile.name,
          file_type: selectedFile.type,
          file_url: fileUrl,
          file_size_mb: (selectedFile.size / (1024 * 1024)).toFixed(2),
          description: fileDescription || null
        })

      if (dbError) throw dbError

      // Crear notificación
      await createNotification(
        userId,
        'success',
        'Archivo Subido',
        `${selectedFile.name} se subió correctamente`,
        '📄'
      )

      // Reset y recargar
      setShowUploadModal(false)
      setSelectedFile(null)
      setFileDescription('')
      loadFiles()

    } catch (error) {
      console.error('Error subiendo archivo:', error)
      alert('Error al subir el archivo. Inténtalo de nuevo.')
    } finally {
      setUploading(false)
    }
  }

  // ==========================================
  // ELIMINAR ARCHIVO
  // ==========================================
  const handleDelete = async (file) => {
    if (!confirm(`¿Eliminar ${file.file_name}?`)) return

    try {
      // Extraer path del storage de la URL
      const urlParts = file.file_url.split('/course-files/')
      const filePath = urlParts[1]

      // Eliminar de Storage
      const { error: storageError } = await supabase.storage
        .from('course-files')
        .remove([filePath])

      if (storageError) throw storageError

      // Eliminar de base de datos
      const { error: dbError } = await supabase
        .from('course_files')
        .delete()
        .eq('id', file.id)

      if (dbError) throw dbError

      // Crear notificación
      await createNotification(
        userId,
        'info',
        'Archivo Eliminado',
        `${file.file_name} se eliminó correctamente`,
        '🗑️'
      )

      loadFiles()
    } catch (error) {
      console.error('Error eliminando archivo:', error)
      alert('Error al eliminar el archivo')
    }
  }

  // ==========================================
  // FORMATEAR TAMAÑO
  // ==========================================
  const formatSize = (mb) => {
    const size = parseFloat(mb)
    if (size < 1) return `${(size * 1024).toFixed(0)} KB`
    return `${size.toFixed(2)} MB`
  }

  // ==========================================
  // RENDER
  // ==========================================
  return (
    <div className="space-y-6">
      {/* Header con botón de subida */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-white">
            Archivos del {lessonId ? 'Lección' : 'Curso'}
          </h3>
          <p className="text-white/60 text-sm mt-1">
            Material descargable para estudiantes
          </p>
        </div>

        {canUpload && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-[#87CEEB] to-[#4A90C9] text-white font-bold rounded-xl shadow-lg"
          >
            <Upload className="w-5 h-5" />
            Subir Archivo
          </motion.button>
        )}

        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* Lista de archivos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence mode="popLayout">
          {files.map((file, index) => (
            <motion.div
              key={file.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: index * 0.05 }}
              className="bg-gradient-to-br from-[#1a0f2e]/80 to-[#0f0820]/80 backdrop-blur-xl rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all"
            >
              <div className="flex items-start gap-4">
                {/* Icono */}
                <div className="flex-shrink-0 p-3 bg-white/5 rounded-lg">
                  {getFileIcon(file.file_type)}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-semibold text-sm truncate">
                    {file.file_name}
                  </h4>
                  {file.description && (
                    <p className="text-white/60 text-xs mt-1">
                      {file.description}
                    </p>
                  )}
                  <div className="flex items-center gap-3 mt-2 text-xs text-white/50">
                    <span>{formatSize(file.file_size_mb)}</span>
                    <span>•</span>
                    <span>{new Date(file.created_at).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Acciones */}
                <div className="flex flex-col gap-2">
                  <motion.a
                    href={file.file_url}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 bg-[#87CEEB]/20 hover:bg-[#87CEEB]/30 rounded-lg transition-colors"
                  >
                    <Download className="w-4 h-4 text-[#87CEEB]" />
                  </motion.a>

                  {canUpload && (
                    <motion.button
                      onClick={() => handleDelete(file)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {files.length === 0 && (
          <div className="col-span-full text-center py-12">
            <File className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <p className="text-white/60">No hay archivos disponibles</p>
          </div>
        )}
      </div>

      {/* Modal de subida */}
      <AnimatePresence>
        {showUploadModal && selectedFile && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !uploading && setShowUploadModal(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg"
            >
              <div className="bg-gradient-to-br from-[#1a0f2e] to-[#0f0820] backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">
                    Subir Archivo
                  </h3>
                  <button
                    onClick={() => !uploading && setShowUploadModal(false)}
                    disabled={uploading}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50"
                  >
                    <X className="w-5 h-5 text-white/60" />
                  </button>
                </div>

                {/* Archivo seleccionado */}
                <div className="mb-4 p-4 bg-white/5 rounded-xl flex items-center gap-3">
                  {getFileIcon(selectedFile.type)}
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate">
                      {selectedFile.name}
                    </p>
                    <p className="text-white/50 text-sm">
                      {formatSize((selectedFile.size / (1024 * 1024)).toFixed(2))}
                    </p>
                  </div>
                </div>

                {/* Descripción */}
                <div className="mb-6">
                  <label className="block text-[#87CEEB] text-sm font-medium mb-2">
                    Descripción (opcional)
                  </label>
                  <textarea
                    value={fileDescription}
                    onChange={(e) => setFileDescription(e.target.value)}
                    placeholder="Describe el contenido del archivo..."
                    rows={3}
                    disabled={uploading}
                    className="w-full px-4 py-3 bg-white/5 rounded-xl border border-white/10 text-white outline-none focus:border-[#87CEEB]/50 transition-all resize-none disabled:opacity-50"
                  />
                </div>

                {/* Botones */}
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowUploadModal(false)}
                    disabled={uploading}
                    className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl border border-white/10 transition-all disabled:opacity-50"
                  >
                    Cancelar
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleUpload}
                    disabled={uploading}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-[#87CEEB] to-[#4A90C9] text-white font-bold rounded-xl shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {uploading ? (
                      <>
                        <Loader className="w-5 h-5 animate-spin" />
                        Subiendo...
                      </>
                    ) : (
                      <>
                        <Check className="w-5 h-5" />
                        Subir
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

// ==========================================
// EJEMPLO DE USO:
// ==========================================

// En Dashboard.jsx o Curso.jsx:
// import FileUploadPanel from '../components/FileUploadPanel'
//
// <FileUploadPanel
//   userRole={userRole}
//   userId={user.id}
//   courseId={1}
//   lessonId={null} // o un ID específico para archivos de lección
// />