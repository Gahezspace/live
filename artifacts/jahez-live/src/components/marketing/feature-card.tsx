import type { ReactNode } from 'react';

export function FeatureCard({
  icon,
  number,
  title,
  copy,
  featured = false,
  underline,
}: {
  icon: ReactNode;
  number: string;
  title: string;
  copy: string;
  featured?: boolean;
  underline?: string;
}) {
  return (
    <article className={`friction-card hover-lift ${featured ? 'friction-card-featured' : ''}`}>
      <span className="friction-icon">{icon}</span>
      <span className="friction-number">{number}</span>
      <h3>{title}</h3>
      <p>{copy}</p>
      {underline && <span className="card-underline">{underline}</span>}
    </article>
  );
}
