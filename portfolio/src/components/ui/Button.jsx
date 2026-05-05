const sizeMap = {
  sm: 'px-4 py-2 text-sm gap-1.5',
  md: 'px-6 py-3 text-sm gap-2',
  lg: 'px-8 py-4 text-base gap-2.5',
}

const variantMap = {
  primary:
    'bg-gradient-to-r from-accent to-aurora text-white font-semibold rounded-xl ' +
    'shadow-lg shadow-accent/20 hover:shadow-accent/35 hover:scale-[1.02] ' +
    'active:scale-[0.98] transition-all duration-200',
  secondary:
    'border border-rim text-slate-300 rounded-xl font-medium ' +
    'hover:border-accent/60 hover:text-accent hover:bg-accent/5 ' +
    'transition-all duration-200',
  ghost:
    'text-slate-400 rounded-xl font-medium ' +
    'hover:text-slate-100 hover:bg-panel ' +
    'transition-all duration-200',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  type = 'button',
  onClick,
  className = '',
  ...props
}) {
  const base = `inline-flex items-center justify-center font-sans cursor-pointer ${sizeMap[size]} ${variantMap[variant]} ${className}`

  if (href) {
    return (
      <a href={href} className={base} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} className={base} {...props}>
      {children}
    </button>
  )
}
