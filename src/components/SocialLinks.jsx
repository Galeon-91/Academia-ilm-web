import { motion } from "framer-motion";

/** Botón base con halo animado */
function IconButton({ href, label, ringClass, children }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      whileHover={{ y: -2, scale: 1.06 }}
      whileTap={{ scale: 0.98 }}
      className="relative grid h-12 w-12 place-items-center rounded-full bg-white/90 dark:bg-white/10 border border-black/10 dark:border-white/15 shadow-sm overflow-hidden group"
    >
      {/* halo/anel */}
      <span
        className={`absolute inset-0 rounded-full opacity-80 blur-[6px] transition duration-300 group-hover:opacity-100 ${ringClass}`}
      />
      {/* contenido */}
      <span className="relative z-10">{children}</span>
    </motion.a>
  );
}

/** SVG Instagram (outline + lente) */
function InstagramIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" className="drop-shadow">
      <defs>
        <linearGradient id="ig-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FF0077" />
          <stop offset="50%" stopColor="#FF8A00" />
          <stop offset="100%" stopColor="#FFD400" />
        </linearGradient>
      </defs>
      <rect
        x="3" y="3" width="18" height="18" rx="5"
        fill="none" stroke="url(#ig-g)" strokeWidth="1.8"
      />
      <circle cx="12" cy="12" r="4.3" fill="none" stroke="url(#ig-g)" strokeWidth="1.8"/>
      <circle cx="17.2" cy="6.8" r="1.2" fill="url(#ig-g)"/>
    </svg>
  );
}

/** SVG X (antes Twitter) */
function XIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" className="drop-shadow">
      <path
        d="M3 3l8.2 10.1L3.7 21h2.5l6.7-6.9L18.8 21H21l-8.8-10.8L20.3 3h-2.5l-6.1 6.3L7 3H3z"
        fill="currentColor"
      />
    </svg>
  );
}

/** SVG YouTube (play dentro de píldora) */
function YoutubeIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" className="drop-shadow">
      <defs>
        <linearGradient id="yt-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FF1E1E" />
          <stop offset="100%" stopColor="#FF4D4D" />
        </linearGradient>
      </defs>
      <rect x="3" y="6.5" width="18" height="11" rx="3.5"
            fill="none" stroke="url(#yt-g)" strokeWidth="1.8"/>
      <path d="M11 9.8l4.2 2.2L11 14.2V9.8z" fill="url(#yt-g)"/>
    </svg>
  );
}

export default function SocialLinks() {
  return (
    <div className="flex items-center gap-4">
      <IconButton
        href="https://www.instagram.com/tu_usuario"
        label="Abrir Instagram de Academia ILM"
        ringClass="bg-gradient-to-tr from-fuchsia-500 via-rose-500 to-yellow-300 animate-tilt"
      >
        <InstagramIcon />
      </IconButton>

      <IconButton
        href="https://x.com/tu_usuario"
        label="Abrir perfil en X de Academia ILM"
        ringClass="bg-gradient-to-tr from-slate-400 via-cyan-400 to-blue-500 animate-tilt"
      >
        <XIcon />
      </IconButton>

      <IconButton
        href="https://www.youtube.com/@tu_usuario"
        label="Abrir canal de YouTube de Academia ILM"
        ringClass="bg-gradient-to-tr from-red-400 via-red-500 to-orange-400 animate-tilt"
      >
        <YoutubeIcon />
      </IconButton>
    </div>
  );
}
