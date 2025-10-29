import { useState, useEffect } from 'react'

export function useTheme() {
  const [theme, setTheme] = useState('light') // ← FORZADO A LIGHT

  useEffect(() => {
    // Solo cargar del localStorage DESPUÉS del montaje
    const saved = localStorage.getItem('ilm-theme')
    if (saved) {
      setTheme(saved)
    }
  }, [])

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('ilm-theme', theme)
  }, [theme])

  const toggle = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  return { theme, toggle }
}