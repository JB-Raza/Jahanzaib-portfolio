export default function Card({ children, className = '', hover = true, as: Tag = 'div' }) {
  return (
    <Tag
      className={[
        'bg-panel border border-rim rounded-2xl p-6',
        'transition-all duration-300',
        hover && 'hover:border-accent/35 hover:bg-panel-hi hover:shadow-lg hover:shadow-accent/5 hover:-translate-y-0.5',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </Tag>
  )
}
