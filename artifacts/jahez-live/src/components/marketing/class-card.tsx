import { Bookmark, Calendar, Check, Play, Star, Users } from 'lucide-react';
import type { ClassItem } from '@/data/classes';

function PlusIcon() {
  return (
    <svg className="plus-icon" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M8 3v10M3 8h10" />
    </svg>
  );
}

export function ClassThumb({ item }: { item: ClassItem }) {
  return (
    <div className={`class-thumb ${item.theme}`}>
      <span className="thumb-grid" aria-hidden="true" />
      <span className="thumb-dot" />
      <span className="thumb-orbit" />
      <span className="thumb-equation">{item.equation}</span>
      <span className="thumb-caption">{item.caption}</span>
      <span className="status-badge">
        <span className={item.status === 'live' ? 'live-dot' : 'premiere-dot'} />
        {item.status === 'live' ? 'مباشر الآن' : 'حصة قادمة'}
      </span>
    </div>
  );
}

export function ClassCard({
  item,
  followed,
  onFollow,
  onAction,
}: {
  item: ClassItem;
  followed: boolean;
  onFollow: () => void;
  onAction: () => void;
}) {
  return (
    <article className="class-card fade-up" data-testid={`card-class-${item.id}`}>
      <ClassThumb item={item} />
      <div className="card-body">
        <div className="card-meta">
          <span><span>{item.subject}</span><i>•</i><span>{item.grade}</span></span>
          {item.status === 'live' ? (
            <span><Users size={13} /> {item.viewers}</span>
          ) : (
            <span><Bookmark size={13} /> {item.date?.split('،')[0]}</span>
          )}
        </div>
        <h3 className="card-title" data-testid={`text-class-title-${item.id}`}>{item.title}</h3>
        <div className="teacher-row">
          <span className={`teacher-avatar ${item.avatar}`}>{item.initials}</span>
          <span className="teacher-name">{item.teacher}</span>
          <span className="rating"><Star size={11} /> {item.rating}</span>
          <button
            className={`follow-button ${followed ? 'followed' : ''}`}
            aria-label={followed ? `إلغاء متابعة ${item.teacher}` : `متابعة ${item.teacher}`}
            onClick={onFollow}
            data-testid={`button-follow-${item.id}`}
          >
            {followed ? <Check size={16} /> : <PlusIcon />}
          </button>
        </div>
        <div className="card-price-row">
          <span className="card-price">{item.price}</span>
          <button className={`card-action ${item.status === 'live' ? 'live' : ''}`} onClick={onAction} data-testid={`button-class-action-${item.id}`}>
            {item.status === 'live' ? <><Play size={14} fill="currentColor" /> ادخل الحصة الآن</> : <><Calendar size={14} /> احجز مقعدك</>}
          </button>
        </div>
      </div>
    </article>
  );
}
