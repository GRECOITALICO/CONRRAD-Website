/** Wordmark + optional small mark from master logo. */
export function Wordmark({ className = '', withMark = false }: { className?: string; withMark?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2 font-display font-extrabold tracking-tight ${className}`}>
      {withMark && (
        <img src="/icon-48.png" alt="" width={20} height={20} className="w-5 h-5 shrink-0" />
      )}
      CONRRAD
    </span>
  )
}
