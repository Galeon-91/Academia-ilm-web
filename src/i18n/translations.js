export const translations = {
  es: {
    nav: {
      home: 'Inicio',
      classes: 'Clases',
      university: 'Universidad',
      prices: 'Precios',
      blog: 'Blog',
      contact: 'Contacto',
      login: 'Iniciar Sesión',
      register: 'Registrarse',
    },
    home: {
      hero: {
        title: 'La academia de ciencias que combina mentoría humana e IA',
        subtitle: 'ESO, Bachillerato y Universidad. Clases en directo, simulacros, vídeos bilingües y plataforma de práctica.',
        cta1: 'Empieza gratis',
        cta2: 'Ver precios',
      },
    },
  },
  en: {
    nav: {
      home: 'Home',
      classes: 'Classes',
      university: 'University',
      prices: 'Pricing',
      blog: 'Blog',
      contact: 'Contact',
      login: 'Login',
      register: 'Sign Up',
    },
    home: {
      hero: {
        title: 'The science academy combining human mentorship & AI',
        subtitle: 'ESO, Bachillerato and University. Live classes, mock exams, bilingual videos and practice platform.',
        cta1: 'Start free',
        cta2: 'View pricing',
      },
    },
  },
}

export function t(language, key) {
  const keys = key.split('.')
  let value = translations[language]
  
  for (const k of keys) {
    value = value?.[k]
  }
  
  return value || key
}