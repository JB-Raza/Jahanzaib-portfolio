const variantMap = {
  default: 'bg-panel border border-rim text-slate-400',
  accent:  'bg-accent/10 border border-accent/25 text-accent',
  aurora:  'bg-aurora/10 border border-aurora/25 text-aurora',
  muted:   'bg-base-alt border border-rim text-slate-500',
}

export default function Tag({ children, variant = 'default', className = '' }) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium leading-none ${variantMap[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
