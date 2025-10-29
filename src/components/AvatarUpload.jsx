import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../lib/supabase'
import { Camera, Upload, X, Check, AlertCircle } from 'lucide-react'

export default function AvatarUpload({ user, currentAvatarUrl, onAvatarUpdate }) {
  const [uploading, setUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  // ==========================================
  // MANEJAR SELECCIÓN DE ARCHIVO
  // ==========================================
  const handleFileSelect = async (e) => {
    try {
      setError('')
      setSuccess(false)
      
      const file = e.target.files?.[0]
      if (!file) return

      // Validar tipo de archivo
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
      if (!validTypes.includes(file.type)) {
        setError('⚠️ Solo se permiten imágenes (JPG, PNG, GIF, WEBP)')
        return
      }

      // Validar tamaño (2MB)
      const maxSize = 2 * 1024 * 1024 // 2MB en bytes
      if (file.size > maxSize) {
        setError('⚠️ La imagen debe ser menor a 2MB')
        return
      }

      // Crear preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result)
      }
      reader.readAsDataURL(file)

    } catch (err) {
      console.error('Error seleccionando archivo:', err)
      setError('❌ Error al seleccionar la imagen')
    }
  }

  // ==========================================
  // SUBIR AVATAR A SUPABASE
  // ==========================================
  const uploadAvatar = async () => {
    try {
      setUploading(true)
      setError('')
      setSuccess(false)

      if (!user?.id) {
        throw new Error('Usuario no autenticado')
      }

      if (!previewUrl) {
        throw new Error('No hay imagen seleccionada')
      }

      // Convertir base64 a blob
      const response = await fetch(previewUrl)
      const blob = await response.blob()

      // Crear nombre único para el archivo
      const fileExt = blob.type.split('/')[1]
      const fileName = `${user.id}/avatar-${Date.now()}.${fileExt}`

      console.log('📤 Subiendo archivo:', fileName)

      // Eliminar avatar anterior si existe
      if (currentAvatarUrl) {
        try {
          const oldPath = currentAvatarUrl.split('/').pop()
          if (oldPath) {
            await supabase.storage
              .from('avatars')
              .remove([`${user.id}/${oldPath}`])
            console.log('🗑️ Avatar anterior eliminado')
          }
        } catch (err) {
          console.log('⚠️ No se pudo eliminar avatar anterior:', err)
        }
      }

      // Subir nuevo avatar
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, blob, {
          cacheControl: '3600',
          upsert: true,
          contentType: blob.type
        })

      if (uploadError) {
        console.error('❌ Error de Supabase:', uploadError)
        throw uploadError
      }

      console.log('✅ Archivo subido:', uploadData)

      // Obtener URL pública
      const { data: urlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName)

      if (!urlData?.publicUrl) {
        throw new Error('No se pudo obtener la URL pública')
      }

      const publicUrl = urlData.publicUrl
      console.log('🔗 URL pública:', publicUrl)

      // Actualizar metadata del usuario
      const { error: updateError } = await supabase.auth.updateUser({
        data: { avatar_url: publicUrl }
      })

      if (updateError) {
        console.error('❌ Error actualizando metadata:', updateError)
        throw updateError
      }

      console.log('✅ Avatar actualizado correctamente')

      // Notificar al componente padre
      if (onAvatarUpdate) {
        onAvatarUpdate(publicUrl)
      }

      setSuccess(true)
      setPreviewUrl(null)

      // Ocultar mensaje de éxito después de 3 segundos
      setTimeout(() => {
        setSuccess(false)
      }, 3000)

    } catch (err) {
      console.error('❌ Error completo:', err)
      
      // Mensajes de error más específicos
      if (err.message?.includes('not found')) {
        setError('❌ El bucket "avatars" no existe. Ejecuta el script SQL de configuración.')
      } else if (err.message?.includes('policy')) {
        setError('❌ Sin permisos. Verifica las políticas de Storage en Supabase.')
      } else if (err.message?.includes('size')) {
        setError('❌ La imagen es demasiado grande. Máximo 2MB.')
      } else {
        setError(`❌ Error al subir imagen: ${err.message}`)
      }
    } finally {
      setUploading(false)
    }
  }

  // ==========================================
  // CANCELAR PREVIEW
  // ==========================================
  const cancelPreview = () => {
    setPreviewUrl(null)
    setError('')
    setSuccess(false)
  }

  // ==========================================
  // OBTENER INICIALES DEL USUARIO
  // ==========================================
  const getInitials = () => {
    const name = user?.user_metadata?.full_name || user?.email || 'U'
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  // ==========================================
  // RENDER
  // ==========================================
  return (
    <div className="relative">
      {/* Avatar Display */}
      <div className="relative w-32 h-32 mx-auto">
        <div className="w-full h-full rounded-full overflow-hidden border-4 border-white/20 bg-gradient-to-br from-[#87CEEB] to-[#E8A0BF]">
          {previewUrl ? (
            <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
          ) : currentAvatarUrl ? (
            <img src={currentAvatarUrl} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-white text-3xl font-bold"
              >
                {getInitials()}
              </motion.span>
            </div>
          )}
        </div>

        {/* Botón de Cámara */}
        {!previewUrl && (
          <label className="absolute bottom-0 right-0 w-10 h-10 bg-gradient-to-br from-[#87CEEB] to-[#4A90C9] rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform border-2 border-white shadow-lg">
            <Camera className="w-5 h-5 text-white" />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              disabled={uploading}
            />
          </label>
        )}
      </div>

      {/* Preview Actions */}
      <AnimatePresence>
        {previewUrl && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex gap-3 justify-center mt-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={uploadAvatar}
              disabled={uploading}
              className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded-xl disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all"
            >
              {uploading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  />
                  <span>Subiendo...</span>
                </>
              ) : (
                <>
                  <Check className="w-5 h-5" />
                  <span>Guardar</span>
                </>
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={cancelPreview}
              disabled={uploading}
              className="flex items-center gap-2 px-6 py-2 bg-white/10 text-white font-medium rounded-xl hover:bg-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <X className="w-5 h-5" />
              <span>Cancelar</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Message */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="mt-4 p-3 bg-green-500/20 border border-green-500/30 rounded-xl flex items-center gap-2 text-green-400"
          >
            <Check className="w-5 h-5" />
            <span className="text-sm font-medium">¡Avatar actualizado correctamente!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-xl"
          >
            <div className="flex items-start gap-2 text-red-400">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium mb-2">{error}</p>
                {error.includes('bucket') && (
                  <div className="text-xs bg-red-500/10 p-2 rounded">
                    <p className="font-semibold mb-1">🔧 Solución:</p>
                    <p>1. Descarga CONFIGURAR-STORAGE-AVATARS.sql</p>
                    <p>2. Ve a Supabase → SQL Editor</p>
                    <p>3. Ejecuta el script completo</p>
                  </div>
                )}
                {error.includes('permisos') && (
                  <div className="text-xs bg-red-500/10 p-2 rounded">
                    <p className="font-semibold mb-1">🔧 Solución:</p>
                    <p>Ejecuta el script CONFIGURAR-STORAGE-AVATARS.sql en Supabase</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ayuda */}
      <p className="text-white/40 text-xs text-center mt-3">
        JPG, PNG, GIF o WEBP • Máximo 2MB
      </p>
    </div>
  )
}