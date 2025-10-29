import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { Link } from 'react-router-dom'

export default function Precios() {
  const { language } = useApp()
  const [billingPeriod, setBillingPeriod] = useState('monthly')

  const translations = {
    es: {
      title: 'Planes y Precios',
      subtitle: 'Elige el plan perfecto para tu educación. Sin compromisos, cancela cuando quieras',
      monthly: 'Mensual',
      annual: 'Anual',
      save: 'Ahorra 20%',
      perMonth: '/mes',
      perYear: '/año',
      choosePlan: 'Elegir Plan',
      popularPlan: 'Más Popular',
      familyDiscount: 'Descuento Familiar',
      familyDesc: '15% de descuento al inscribir a 2 o más estudiantes',
      faq: 'Preguntas Frecuentes',
      basic: 'Básico',
      basic_desc: 'Ideal para estudiantes de ESO que buscan apoyo extra',
      basic_price_m: '29',
      basic_price_y: '279',
      pro: 'Pro',
      pro_desc: 'Perfecto para Bachillerato',
      pro_price_m: '49',
      pro_price_y: '469',
      premium: 'Premium',
      premium_desc: 'Experiencia completa universitaria',
      premium_price_m: '79',
      premium_price_y: '759',
    },
    en: {
      title: 'Plans & Pricing',
      subtitle: 'Choose the perfect plan. No commitments, cancel anytime',
      monthly: 'Monthly',
      annual: 'Annual',
      save: 'Save 20%',
      perMonth: '/month',
      perYear: '/year',
      choosePlan: 'Choose Plan',
      popularPlan: 'Most Popular',
      familyDiscount: 'Family Discount',
      familyDesc: '15% discount when enrolling 2 or more students',
      faq: 'Frequently Asked Questions',
      basic: 'Basic',
      basic_desc: 'Ideal for middle school students',
      basic_price_m: '29',
      basic_price_y: '279',
      pro: 'Pro',
      pro_desc: 'Perfect for high school',
      pro_price_m: '49',
      pro_price_y: '469',
      premium: 'Premium',
      premium_desc: 'Complete university experience',
      premium_price_m: '79',
      premium_price_y: '759',
    }
  }

  const t = translations[language]

  const plans = [
    {
      id: 'basic',
      name: t.basic,
      description: t.basic_desc,
      price_monthly: t.basic_price_m,
      price_annual: t.basic_price_y,
      features: [
        'Acceso a materias de ESO',
        '10 horas de clases mensuales',
        'Videos educativos HD',
        'Soporte por email',
        'Material descargable'
      ],
      gradient: 'from-blue-500 to-cyan-500',
      popular: false
    },
    {
      id: 'pro',
      name: t.pro,
      description: t.pro_desc,
      price_monthly: t.pro_price_m,
      price_annual: t.pro_price_y,
      features: [
        'Todo lo del plan Básico',
        '20 horas de clases mensuales',
        'Materias de Bachillerato',
        'Soporte prioritario',
        'Sesiones personalizadas',
        'Ejercicios interactivos'
      ],
      gradient: 'from-purple-500 to-pink-500',
      popular: true
    },
    {
      id: 'premium',
      name: t.premium,
      description: t.premium_desc,
      price_monthly: t.premium_price_m,
      price_annual: t.premium_price_y,
      features: [
        'Todo lo del plan Pro',
        'Horas ilimitadas',
        'Todas las materias',
        'Contenido universitario',
        'Programación e IA',
        'Tutor personal',
        'Certificados oficiales'
      ],
      gradient: 'from-orange-500 to-red-500',
      popular: false
    }
  ]

  const faqs = [
    {
      q: '¿Puedo cambiar de plan?',
      a: 'Sí, puedes cambiar en cualquier momento.'
    },
    {
      q: '¿Cómo funciona el descuento familiar?',
      a: 'Se aplica automáticamente un 15% al inscribir 2 o más estudiantes.'
    },
    {
      q: '¿Hay periodo de prueba?',
      a: 'Sí, 7 días de prueba gratuita sin compromiso.'
    },
    {
      q: '¿Qué métodos de pago aceptan?',
      a: 'Tarjeta, PayPal y Bizum.'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50 dark:from-[#0a0f1c] dark:via-[#0d1526] dark:to-[#0a0f1c] pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 dark:from-purple-400 dark:via-pink-400 dark:to-rose-400 bg-clip-text text-transparent">
              {t.title}
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            {t.subtitle}
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-4 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                billingPeriod === 'monthly'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              {t.monthly}
            </button>
            <button
              onClick={() => setBillingPeriod('annual')}
              className={`px-6 py-2 rounded-full font-semibold transition-all flex items-center gap-2 ${
                billingPeriod === 'annual'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              {t.annual}
              <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">
                {t.save}
              </span>
            </button>
          </div>
        </motion.div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                    {t.popularPlan}
                  </span>
                </div>
              )}

              <div className={`bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 h-full flex flex-col ${
                plan.popular ? 'ring-4 ring-purple-500 ring-opacity-50' : ''
              }`}>
                {/* Header */}
                <div className="text-center mb-6">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${plan.gradient} flex items-center justify-center`}>
                    <PlanIcon type={plan.id} className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {plan.description}
                  </p>
                </div>

                {/* Price */}
                <div className="text-center mb-8">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      €{billingPeriod === 'monthly' ? plan.price_monthly : plan.price_annual}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">
                      {billingPeriod === 'monthly' ? t.perMonth : t.perYear}
                    </span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300 text-sm">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Button */}
                <Link to="/registro">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-3 rounded-xl font-bold transition-all ${
                      plan.popular
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {t.choosePlan} →
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Family Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl p-8 md:p-12 text-center shadow-2xl mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <UsersIcon className="w-8 h-8 text-white" />
            <h2 className="text-3xl font-bold text-white">
              {t.familyDiscount}
            </h2>
          </div>
          <p className="text-white/90 text-lg max-w-2xl mx-auto">
            {t.familyDesc}
          </p>
        </motion.div>

        {/* FAQs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-800 dark:text-white">
            {t.faq}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
              >
                <h3 className="font-bold text-gray-800 dark:text-white mb-2 flex items-start gap-2">
                  <QuestionIcon className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                  {faq.q}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm pl-7">
                  {faq.a}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// Icons
function PlanIcon({ type, className }) {
  const icons = {
    basic: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
      </svg>
    ),
    pro: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
    premium: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    )
  }
  return icons[type] || icons.basic
}

function CheckIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={className}>
      <path d="M20 6L9 17l-5-5"/>
    </svg>
  )
}

function UsersIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
    </svg>
  )
}

function QuestionIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
    </svg>
  )
}