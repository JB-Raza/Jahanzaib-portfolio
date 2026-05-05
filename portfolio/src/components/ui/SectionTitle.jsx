export default function SectionTitle({ label, title, subtitle, align = 'left' }) {
  const alignClass = {
    left:   'text-left',
    center: 'text-center mx-auto',
    right:  'text-right ml-auto',
  }[align]

  return (
    <div className={`mb-12 md:mb-16 max-w-3xl ${alignClass}`}>
      {label && (
        <p className="text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-3">
          {label}
        </p>
      )}
      <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-[2.75rem] leading-tight text-slate-100 mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-slate-400 text-base md:text-lg leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  )
}
