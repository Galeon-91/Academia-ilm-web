import React from 'react'
import { motion } from 'framer-motion'
import { Wrench, Hammer, HardHat, Sparkles } from 'lucide-react'

export default function EnConstruccion({ titulo = "Próximamente", color = "from-[#87CEEB] to-[#4A90C9]" }) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
      {/* Fondo animado */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/10 rounded-full"
            initial={{ 
              x: Math.random() * 100 + '%', 
              y: Math.random() * 100 + '%',
              scale: 0 
            }}
            animate={{
              y: [null, Math.random() * -100 + '%'],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      {/* Contenido */}
      <div className="relative z-10 text-center">
        {/* Iconos animados */}
        <div className="flex justify-center items-center gap-4 mb-6">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <HardHat className={`w-12 h-12 bg-gradient-to-br ${color} bg-clip-text text-transparent`} />
          </motion.div>
          
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              rotate: [-10, 10, -10]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <Hammer className={`w-12 h-12 bg-gradient-to-br ${color} bg-clip-text text-transparent`} />
          </motion.div>
          
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <Wrench className={`w-12 h-12 bg-gradient-to-br ${color} bg-clip-text text-transparent`} />
          </motion.div>
        </div>

        {/* Título */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-3xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent mb-3`}
        >
          {titulo}
        </motion.h3>

        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-white/60 mb-4"
        >
          Estamos trabajando en este contenido increíble
        </motion.p>

        {/* Barra de progreso animada */}
        <div className="max-w-xs mx-auto">
          <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
            <motion.div
              className={`h-full bg-gradient-to-r ${color} rounded-full`}
              initial={{ width: "0%" }}
              animate={{ width: ["0%", "70%", "0%"] }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />
          </div>
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-white/40 text-sm mt-2"
          >
            Construyendo algo asombroso...
          </motion.p>
        </div>

        {/* Sparkles animados */}
        <div className="flex justify-center gap-2 mt-6">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                scale: [1, 1.5, 1],
                rotate: [0, 180, 360],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                delay: i * 0.2 
              }}
            >
              <Sparkles className="w-6 h-6 text-yellow-400" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}