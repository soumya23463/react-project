import React, { createContext, useState, useContext } from 'react'

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev)
  }

  const theme = {
    isDarkMode,
    toggleTheme,
    background: isDarkMode ? 'bg-dark' : 'bg-light',
    text: isDarkMode ? 'text-light' : 'text-dark',
    navbar: 'navbar-light',
    navbarBg: 'crimson',
    card: isDarkMode ? 'text-light' : 'bg-light text-dark',
    cardBg: isDarkMode ? '#2d2d2d' : '#ffffff'
  }

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  )
}