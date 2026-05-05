/**
 * Wraps every content section with:
 *  - Full-width coloured background (bg-base / bg-base-alt)
 *  - A centred max-width column (max-w-6xl) with symmetric responsive padding
 *  - Consistent vertical breathing room (py-24 md:py-32)
 *
 * Padding lives INSIDE the max-width wrapper so the background always fills
 * the full viewport width while content stays perfectly centred.
 */
export default function SectionContainer({
  id,
  children,
  alternate = false,
  className = '',
}) {
  return (
    <section
      id={id}
      className={[
        'w-full',
        alternate ? 'bg-base-alt' : 'bg-base',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 py-24 md:py-32">
        {children}
      </div>
    </section>
  )
}
