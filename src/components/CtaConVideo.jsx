export default function CtaConVideo() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Vídeo de fondo */}
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-65 dark:opacity-55"
        src="src/assets/cta-bg.mp4"        /* coloca tu vídeo en public/assets/cta-bg.mp4 */
        poster="/assets/cta-bg.jpg"     /* opcional: imagen de fallback */
        autoPlay
        loop
        muted
        playsInline
      />
      {/* Velo/gradiente para legibilidad */}
      <div className="absolute inset-0 pointer-events-none"
           style={{background:'linear-gradient(8deg, rgba(12,14,18,0.75) 0%, rgba(255,255,255,0.25) 55%, rgba(12,14,18,0.75) 100%)'}}
      />
      <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24 text-center">
        <h2 className="font-grotesk text-3xl md:text-5xl font-extrabold tracking-tight text-white">
          ¿Listo para <span className="text-ilm-mint">mejorar tus notas</span>?
        </h2>
        <p className="mt-4 text-white/80 max-w-2xl mx-auto">
          Únete a miles de estudiantes que ya han transformado su forma de estudiar.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <a href="/registro" className="px-6 py-3 rounded-2xl text-white font-semibold"
             style={{background:'linear-gradient(90deg,#00D1A1 0%, #1B4DFF 100%)'}}>
            Reserva tu primera clase gratuita
          </a>
          <a href="/precios" className="px-6 py-3 rounded-2xl bg-white text-ilm-dark border border-black/10 dark:bg-white/10 dark:text-white dark:border-white/15">
            Ver planes y precios
          </a>
        </div>
      </div>
    </section>
  );
}
