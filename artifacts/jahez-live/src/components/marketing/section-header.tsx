import type { ReactNode } from 'react';

export function SectionHeader({
  kicker,
  title,
  index,
  action,
}: {
  kicker: string;
  title: ReactNode;
  index?: string;
  action?: ReactNode;
}) {
  return (
    <div className="section-intro">
      <div>
        <p className="section-kicker">{kicker}</p>
        <h2 className="section-title">{title}</h2>
      </div>
      {index && !action && <span className="section-index">{index}</span>}
      {action}
    </div>
  );
}
