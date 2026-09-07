import { Search } from 'lucide-react';
import type { ReactNode } from 'react';

export function EmptyState({
  title = 'لم نجد هذه الفكرة بعد',
  copy = 'جرّب كلمة أخرى أو استكشف كل المواد.',
  action,
}: {
  title?: string;
  copy?: string;
  action?: ReactNode;
}) {
  return (
    <div className="empty-state">
      <Search size={27} />
      <h3>{title}</h3>
      <p>{copy}</p>
      {action}
    </div>
  );
}
