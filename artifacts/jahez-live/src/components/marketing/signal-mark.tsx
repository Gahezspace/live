export function SignalMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`signal-mark ${compact ? 'compact' : ''}`} aria-hidden="true">
      <svg viewBox="0 0 46 46" role="presentation">
        <path d="M10 31.5c5.1-11.7 11.9-18 20.3-18.8" />
        <path d="M15.6 31.4c4.7-5.2 10.3-7.7 16.8-7.5" />
        <path className="signal-check" d="M27.5 13.5l4 4 7-8" />
        <circle cx="9.5" cy="32" r="3.2" />
      </svg>
    </span>
  );
}

export function Logo() {
  return (
    <span className="brand-lockup" aria-label="جاهز Live">
      <SignalMark />
      <span className="brand-name">
        جاهز
        <small><span>LIVE</span> / CLASSROOM</small>
      </span>
    </span>
  );
}
