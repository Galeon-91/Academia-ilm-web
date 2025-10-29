import React from 'react'
import { useApp } from '../context/AppContext'

export default function LanguageToggle() {
  const { language, toggleLanguage } = useApp()

  return (
    <button
      onClick={toggleLanguage}
      className="px-3 py-1.5 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-semibold text-sm"
    >
      {language === 'es' ? '🇪🇸 ES' : '🇬🇧 EN'}
    </button>
  )
}