import { Link } from 'wouter';
import { ChevronLeft } from 'lucide-react';

export interface Crumb {
  label: string;
  path?: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="مسار التصفح" className="mp-breadcrumbs">
      <ol>
        {items.map((item, i) => (
          <li key={item.label}>
            {item.path ? <Link href={item.path}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}
            {i < items.length - 1 && <ChevronLeft size={13} aria-hidden="true" />}
          </li>
        ))}
      </ol>
    </nav>
  );
}
