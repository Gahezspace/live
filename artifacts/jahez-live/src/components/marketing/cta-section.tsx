import type { ReactNode } from 'react';
import { SignalMark } from '@/components/marketing/signal-mark';

export function CTASection({
  kicker,
  title,
  copy,
  children,
  variant = 'accent',
}: {
  kicker: string;
  title: ReactNode;
  copy?: string;
  children: ReactNode;
  variant?: 'accent' | 'landing';
}) {
  return (
    <section className={variant === 'landing' ? 'landing-cta' : 'cta-banner'}>
      <div className="cta-signal"><SignalMark compact /></div>
      <div>
        <p className="section-kicker">{kicker}</p>
        <h2>{title}</h2>
        {copy && <p>{copy}</p>}
      </div>
      {children}
    </section>
  );
}
