import type { ReactNode } from 'react';

export function StepCard({ number, title, copy, icon }: { number: string; title: string; copy: string; icon?: ReactNode }) {
  return (
    <article className="step-item">
      <span className="step-number">{number}</span>
      <div>
        <h3>{title}</h3>
        <p>{copy}</p>
      </div>
      {icon}
    </article>
  );
}
