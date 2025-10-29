import { useTheme } from '../hooks/useTheme'

export default function ThemeToggle({ className = '' }) {
  const { theme, toggle } = useTheme()
  const checked = theme === 'dark'

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={toggle}
      aria-label={checked ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      title={checked ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      className={[
        'relative inline-flex items-center h-10 w-[84px] rounded-2xl px-2 transition',
        'border border-black/10 bg-white/70 backdrop-blur',
        'dark:border-white/15 dark:bg-white/10',
        'shadow-sm dark:shadow-[0_0_0_1px_rgba(255,255,255,0.05)]',
        className,
      ].join(' ')}
    >
      {/* Fondo con gradiente sutil */}
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none"
      >
        <span className="absolute inset-0 opacity-70 dark:opacity-100"
          style={{
            background:
              'linear-gradient(90deg, rgba(13,110,253,.08), rgba(0,209,161,.08))'
          }}
        />
      </span>

      {/* Knob deslizante */}
      <span
        aria-hidden="true"
        className={[
          'relative z-10 h-7 w-7 rounded-xl transition-transform duration-300',
          checked ? 'translate-x-[44px]' : 'translate-x-0',
          'bg-white dark:bg-white/10',
          'border border-black/10 dark:border-white/15',
          'shadow-sm dark:shadow-[0_2px_8px_rgba(0,0,0,.35)] grid place-items-center'
        ].join(' ')}
      >
        {/* ÍCONO: PRISMA (modo claro) */}
        <svg
          className={[
            'h-5 w-5 transition-all duration-300',
            checked ? 'opacity-0 scale-50' : 'opacity-100 scale-100',
            'text-blue-600'
          ].join(' ')}
          viewBox="0 0 24 24"
        >
          <path d="M12 3 L3 18 L21 18 Z" fill="currentColor" opacity="0.2"/>
          <path d="M12 3 L3 18" stroke="currentColor" strokeWidth="1.5" fill="none"/>
          <path d="M12 3 L21 18" stroke="currentColor" strokeWidth="1.5" fill="none"/>
          <path d="M3 18 L21 18" stroke="currentColor" strokeWidth="1.5" fill="none"/>
          <path d="M2 10 L9 12" stroke="#6F42C1" strokeWidth="1.4" strokeLinecap="round"/>
          <path d="M13 12 L22 15" stroke="#00D1A1" strokeWidth="1.4" strokeLinecap="round"/>
        </svg>

        {/* ÍCONO: ÁTOMO ORBITAL (modo oscuro) */}
        <svg
          className={[
            'absolute h-5 w-5 transition-all duration-300',
            checked ? 'opacity-100 scale-100' : 'opacity-0 scale-50',
            'text-white'
          ].join(' ')}
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="2.2" fill="currentColor" />
          <ellipse cx="12" cy="12" rx="8" ry="3.6" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.9"/>
          <ellipse cx="12" cy="12" rx="8" ry="3.6" transform="rotate(60 12 12)" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.6"/>
          <ellipse cx="12" cy="12" rx="8" ry="3.6" transform="rotate(120 12 12)" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.6"/>
          <circle className="animate-pulse" cx="20" cy="12" r="1.1" fill="#0D6EFD"/>
          <circle className="animate-pulse" cx="6" cy="7" r="1.1" fill="#00D1A1" style={{ animationDelay: '200ms' }}/>
          <circle className="animate-pulse" cx="6" cy="17" r="1.1" fill="#6F42C1" style={{ animationDelay: '400ms' }}/>
        </svg>
      </span>

      {/* Etiquetas (CLARO — OSCURO) */}
      <span className="relative z-0 flex-1 text-[11px] font-medium select-none pointer-events-none">
        <span className={[
          'absolute left-2 top-1/2 -translate-y-1/2 transition-opacity',
          checked ? 'opacity-0' : 'opacity-100',
          'text-gray-700'
        ].join(' ')}>Claro</span>
        <span className={[
          'absolute right-2 top-1/2 -translate-y-1/2 transition-opacity',
          checked ? 'opacity-100' : 'opacity-0',
          'text-white/80'
        ].join(' ')}>Oscuro</span>
      </span>
    </button>
  )
}