import React, { createContext, useContext } from 'react'
import { useTheme } from '../hooks/useTheme'
import { useLanguage } from '../hooks/useLanguage'

const AppContext = createContext(undefined)

export function AppProvider({ children }) {
  const { theme, toggleTheme } = useTheme()
  const { language, toggleLanguage, setLanguage } = useLanguage()

  return (
    <AppContext.Provider value={{
      theme,
      toggleTheme,
      language,
      toggleLanguage,
      setLanguage
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}