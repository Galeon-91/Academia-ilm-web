import { useMemo } from "react";

/**
 * Fondo de “partículas atómicas” animadas.
 * Usa posiciones estables con useMemo para evitar parpadeos.
 */
export default function ParticulasAtomicas({
  count = 28,         // número de partículas
  color = "#4fd1c7",  // color base
}) {
  const atoms = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: 1 + Math.random() * 2.2,            // px
      delay: Math.random() * 5,                 // s
      duration: 6 + Math.random() * 6,          // s
      twinkle: 1 + Math.random() * 1.2,         // s
      opacity: 0.35 + Math.random() * 0.4,
    }));
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {atoms.map(a => (
        <span
          key={a.id}
          className="absolute rounded-full atom animate-atom-drift"
          style={{
            left: a.left,
            top: a.top,
            width: a.size,
            height: a.size,
            background: color,
            opacity: a.opacity,
            animationDuration: `${a.duration}s`,
            animationDelay: `${a.delay}s`,
            // halo sutil
            boxShadow: `0 0 ${a.size * 3}px ${color}55`,
            // doble animación: movimiento + parpadeo
            animationName: `atom-drift, atom-twinkle`,
            animationTimingFunction: `ease-in-out, ease-in-out`,
            animationIterationCount: `infinite, infinite`,
            animationDelay: `${a.delay}s, ${a.delay / 2}s`,
            animationDuration: `${a.duration}s, ${a.twinkle}s`,
          }}
        />
      ))}
    </div>
  );
}
