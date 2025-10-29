import { useState, useEffect } from 'react'

export function useLanguage() {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('ilm-language')
    return saved || 'es'
  })

  useEffect(() => {
    localStorage.setItem('ilm-language', language)
  }, [language])

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'es' ? 'en' : 'es')
  }

  return { language, setLanguage, toggleLanguage }
}