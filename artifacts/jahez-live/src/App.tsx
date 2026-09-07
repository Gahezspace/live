import { type ReactNode, useEffect, useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  ArrowLeft,
  ArrowUpLeft,
  Bell,
  Bookmark,
  CalendarDays,
  Check,
  ChevronLeft,
  CirclePlay,
  Clock3,
  Menu,
  Play,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  X,
} from 'lucide-react';
import { Link, Route, Switch, Router as WouterRouter, useLocation } from 'wouter';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';

const queryClient = new QueryClient();

type ClassItem = {
  id: string;
  title: string;
  teacher: string;
  initials: string;
  avatar: string;
  subject: string;
  grade: string;
  rating: string;
  viewers?: string;
  status: 'live' | 'upcoming';
  theme: string;
  equation: string;
  caption: string;
  date?: string;
  time?: string;
  day?: string;
};

const classes: ClassItem[] = [
  { id: 'limits', title: 'النهايات ببساطة: كيف تفكر فيها قبل أن تحسبها؟', teacher: 'أ. نورة العتيبي', initials: 'نع', avatar: 'avatar-a', subject: 'رياضيات', grade: 'ثالث ثانوي', rating: '4.9', viewers: '342', status: 'live', theme: 'thumb-coral', equation: 'x → ∞', caption: 'THE BIG IDEA' },
  { id: 'chemistry', title: 'التفاعلات الكيميائية: من المعادلة إلى التجربة', teacher: 'د. يزن الحربي', initials: 'يح', avatar: 'avatar-b', subject: 'كيمياء', grade: 'ثاني ثانوي', rating: '4.8', viewers: '218', status: 'live', theme: 'thumb-ink', equation: 'H₂O', caption: 'LET IT REACT' },
  { id: 'writing', title: 'اكتب إجابة تترك أثراً في ورقة الاختبار', teacher: 'أ. ليان الشريف', initials: 'لش', avatar: 'avatar-c', subject: 'لغة عربية', grade: 'أول ثانوي', rating: '4.9', viewers: '97', status: 'live', theme: 'thumb-sun', equation: '« ! »', caption: 'MAKE IT CLEAR' },
  { id: 'physics', title: 'الحركة الدائرية: السرعة التي لا تتوقف', teacher: 'أ. فهد السبيعي', initials: 'فس', avatar: 'avatar-d', subject: 'فيزياء', grade: 'ثالث ثانوي', rating: '4.7', status: 'upcoming', theme: 'thumb-mint', equation: 'F = ma', caption: 'COMING SOON', date: 'الخميس، 21 مارس', time: '07:30 م', day: '21' },
  { id: 'grammar', title: 'النحو من الصفر: الجملة التي تفهمها من أول مرة', teacher: 'أ. سارة القحطاني', initials: 'سق', avatar: 'avatar-a', subject: 'لغة عربية', grade: 'ثاني متوسط', rating: '4.9', status: 'upcoming', theme: 'thumb-coral', equation: 'مبتدأ + خبر', caption: 'SAVE THE DATE', date: 'السبت، 23 مارس', time: '05:00 م', day: '23' },
  { id: 'calculus', title: 'التكامل كمساحة: الدرس الذي يكمل الصورة', teacher: 'د. مازن الدوسري', initials: 'مد', avatar: 'avatar-b', subject: 'رياضيات', grade: 'ثالث ثانوي', rating: '4.8', status: 'upcoming', theme: 'thumb-ink', equation: '∫ f(x)', caption: 'PREMIERE', date: 'الأحد، 24 مارس', time: '08:00 م', day: '24' },
  { id: 'english', title: 'Speak with confidence: من الفكرة إلى المحادثة', teacher: 'أ. ريم النجار', initials: 'رن', avatar: 'avatar-c', subject: 'لغة إنجليزية', grade: 'جميع المراحل', rating: '4.9', status: 'upcoming', theme: 'thumb-sun', equation: 'say it', caption: 'PREMIERE', date: 'الإثنين، 25 مارس', time: '06:30 م', day: '25' },
];

const teachers = [
  { id: 'noura', name: 'أ. نورة العتيبي', specialty: 'رياضيات • 12.4k متابع', initials: 'نع', avatar: 'avatar-a' },
  { id: 'yazan', name: 'د. يزن الحربي', specialty: 'كيمياء • 8.7k متابع', initials: 'يح', avatar: 'avatar-b' },
  { id: 'layan', name: 'أ. ليان الشريف', specialty: 'لغة عربية • 6.2k متابع', initials: 'لش', avatar: 'avatar-c' },
];

function SignalMark({ compact = false }: { compact?: boolean }) {
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

function Logo() {
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

function Header({ onNotify }: { onNotify: (message: string) => void }) {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="topbar">
      <div className="container-wide topbar-inner">
        <Link href="/" className="brand-link" data-testid="link-brand-home"><Logo /></Link>
        <nav className="nav-links" aria-label="التنقل الرئيسي">
          <Link href="/" className={`nav-link ${location === '/' ? 'active' : ''}`} data-testid="link-discover">اكتشف</Link>
          <Link href="/browse" className={`nav-link ${location === '/browse' ? 'active' : ''}`} data-testid="link-browse">تصفح الحصص</Link>
          <button className="nav-link nav-button" onClick={() => onNotify('ستظهر حصصك المحفوظة هنا قريباً')} data-testid="button-saved">المحفوظات</button>
        </nav>
        <div className="topbar-actions">
          <button className="icon-button notification-button" aria-label="الإشعارات" onClick={() => onNotify('لا يوجد إشعار جديد الآن')} data-testid="button-notifications"><Bell size={18} /><span className="notification-dot" /></button>
          <button className="avatar" aria-label="الملف الشخصي" onClick={() => onNotify('مرحباً بك في جاهز Live')} data-testid="button-profile">م</button>
          <button className="icon-button mobile-menu" aria-label={menuOpen ? 'إغلاق القائمة' : 'فتح القائمة'} onClick={() => setMenuOpen((value) => !value)} data-testid="button-mobile-menu">{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
      </div>
      {menuOpen && (
        <div className="mobile-panel" role="dialog" aria-label="قائمة التنقل">
          <Link href="/" onClick={() => setMenuOpen(false)} data-testid="mobile-link-discover">اكتشف</Link>
          <Link href="/browse" onClick={() => setMenuOpen(false)} data-testid="mobile-link-browse">تصفح الحصص</Link>
          <button onClick={() => { setMenuOpen(false); onNotify('ستظهر حصصك المحفوظة هنا قريباً'); }} data-testid="mobile-button-saved">المحفوظات</button>
        </div>
      )}
    </header>
  );
}

function BoardIllustration() {
  return (
    <div className="hero-board fade-up delay-2" aria-label="لوح يوضح لحظة الفهم">
      <div className="board-corner board-corner-top">LIVE / 01</div>
      <div className="floating-stats"><strong>+ ٣٤٢</strong><span>طالب يتعلمون الآن</span></div>
      <div className="board-surface">
        <div className="board-grid" aria-hidden="true" />
        <span className="board-label">THE EXPLANATION SIGNAL</span>
        <div className="board-copy" dir="rtl">
          <span className="small">الدرس يبدأ بسؤال صغير</span>
          <h2>متى تصبح<br /><mark>الفكرة واضحة؟</mark></h2>
          <div className="equation"><span>سؤال</span><span className="mark">→</span><span>تجربة</span><span className="mark">→</span><span>فهم</span></div>
        </div>
        <svg className="board-squiggle" viewBox="0 0 210 48" aria-hidden="true"><path d="M5 31 C 45 3, 71 41, 103 20 S 165 5, 205 17" /></svg>
        <div className="board-note"><span className="note-dot" />هنا تبدأ الـ «آها»</div>
        <div className="board-stamp">جاهز<br /><b>LIVE</b></div>
      </div>
      <div className="board-corner board-corner-bottom">فهم / 24</div>
    </div>
  );
}

function ClassThumb({ item }: { item: ClassItem }) {
  return (
    <div className={`class-thumb ${item.theme}`}>
      <span className="thumb-grid" aria-hidden="true" />
      <span className="thumb-dot" />
      <span className="thumb-orbit" />
      <span className="thumb-equation">{item.equation}</span>
      <span className="thumb-caption">{item.caption}</span>
      <span className="status-badge"><span className={item.status === 'live' ? 'live-dot' : 'premiere-dot'} />{item.status === 'live' ? 'مباشر الآن' : 'حصة قادمة'}</span>
    </div>
  );
}

function ClassCard({ item, followed, onFollow, onAction }: { item: ClassItem; followed: boolean; onFollow: () => void; onAction: () => void }) {
  return (
    <article className="class-card fade-up" data-testid={`card-class-${item.id}`}>
      <ClassThumb item={item} />
      <div className="card-body">
        <div className="card-meta"><span><span>{item.subject}</span><i>•</i><span>{item.grade}</span></span>{item.status === 'live' ? <span><Users size={13} /> {item.viewers}</span> : <span><Bookmark size={13} /> {item.date?.split('،')[0]}</span>}</div>
        <h3 className="card-title" data-testid={`text-class-title-${item.id}`}>{item.title}</h3>
        <div className="teacher-row">
          <span className={`teacher-avatar ${item.avatar}`}>{item.initials}</span><span className="teacher-name">{item.teacher}</span><span className="rating"><Star size={11} /> {item.rating}</span>
          <button className={`follow-button ${followed ? 'followed' : ''}`} aria-label={followed ? `إلغاء متابعة ${item.teacher}` : `متابعة ${item.teacher}`} onClick={onFollow} data-testid={`button-follow-${item.id}`}>{followed ? <Check size={16} /> : <PlusIcon />}</button>
        </div>
        <button className={`card-action ${item.status === 'live' ? 'live' : ''}`} onClick={onAction} data-testid={`button-class-action-${item.id}`}>{item.status === 'live' ? <><Play size={14} fill="currentColor" /> ادخل الحصة الآن</> : <><CalendarDays size={14} /> احجز مقعدك</>}</button>
      </div>
    </article>
  );
}

function PlusIcon() {
  return <svg className="plus-icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 3v10M3 8h10" /></svg>;
}

function TeacherPanel({ followed, onFollow }: { followed: Set<string>; onFollow: (id: string, name: string) => void }) {
  return (
    <aside className="side-stack">
      <div className="side-panel">
        <div className="side-panel-head"><h3>معلمون يستحقون المتابعة</h3><span className="side-panel-note">هذا الأسبوع</span></div>
        <div className="teacher-list">{teachers.map((teacher) => <div className="teacher-list-item" key={teacher.id} data-testid={`row-teacher-${teacher.id}`}><span className={`teacher-avatar ${teacher.avatar}`}>{teacher.initials}</span><span className="teacher-list-copy"><strong>{teacher.name}</strong><span>{teacher.specialty}</span></span><button className={`mini-follow ${followed.has(teacher.id) ? 'active' : ''}`} onClick={() => onFollow(teacher.id, teacher.name)} data-testid={`button-follow-teacher-${teacher.id}`}>{followed.has(teacher.id) ? 'تتابعه' : 'متابعة'}</button></div>)}</div>
      </div>
      <div className="side-panel note-panel">
        <div className="side-panel-head"><h3>الفكرة لا تنتظر</h3><Sparkles size={17} /></div>
        <p>كل يوم، يشرح معلم ما الشيء الذي جعلك تقول: «الآن فهمت!»</p>
        <button onClick={() => document.getElementById('live-classes')?.scrollIntoView({ behavior: 'smooth' })} data-testid="button-jump-live">شاهد ما يحدث الآن <ArrowLeft size={13} /></button>
      </div>
    </aside>
  );
}

function UpcomingCard({ item, onAction }: { item: ClassItem; onAction: () => void }) {
  return (
    <article className="upcoming-card fade-up" data-testid={`card-upcoming-${item.id}`}>
      <div className="upcoming-date"><span>حصة مميزة</span><span className="date-block"><strong>{item.day}</strong> مارس</span></div>
      <h3>{item.title}</h3>
      <div className="upcoming-teacher"><span className={`teacher-avatar ${item.avatar}`}>{item.initials}</span><span>{item.teacher}</span></div>
      <div className="upcoming-time"><Clock3 size={13} /> {item.date} — {item.time}</div>
      <button className="card-action" onClick={onAction} data-testid={`button-reserve-${item.id}`}>احجز مقعدك الآن</button>
    </article>
  );
}

function DiscoveryPage({ browseMode = false }: { browseMode?: boolean }) {
  const [query, setQuery] = useState('');
  const [subject, setSubject] = useState('الكل');
  const [activeTab, setActiveTab] = useState<'live' | 'upcoming'>(browseMode ? 'upcoming' : 'live');
  const [followedClasses, setFollowedClasses] = useState<Set<string>>(new Set());
  const [followedTeachers, setFollowedTeachers] = useState<Set<string>>(new Set());
  const [toast, setToast] = useState('');

  useEffect(() => { if (!toast) return; const timer = window.setTimeout(() => setToast(''), 2700); return () => window.clearTimeout(timer); }, [toast]);
  const notify = (message: string) => setToast(message);
  const subjects = ['الكل', 'رياضيات', 'فيزياء', 'كيمياء', 'لغة عربية', 'لغة إنجليزية'];
  const filteredClasses = useMemo(() => classes.filter((item) => {
    const matchesSubject = subject === 'الكل' || item.subject === subject;
    const matchesTab = item.status === activeTab;
    const matchesQuery = `${item.title} ${item.teacher} ${item.subject}`.includes(query.trim());
    return matchesSubject && matchesTab && matchesQuery;
  }), [activeTab, query, subject]);
  const liveClasses = classes.filter((item) => item.status === 'live');
  const upcomingClasses = classes.filter((item) => item.status === 'upcoming');
  const toggleClassFollow = (id: string, teacher: string) => setFollowedClasses((current) => { const next = new Set(current); if (next.has(id)) { next.delete(id); notify(`ألغيت متابعة ${teacher}`); } else { next.add(id); notify(`ستصلك حصص ${teacher} الجديدة`); } return next; });
  const toggleTeacherFollow = (id: string, teacher: string) => setFollowedTeachers((current) => { const next = new Set(current); if (next.has(id)) { next.delete(id); notify(`ألغيت متابعة ${teacher}`); } else { next.add(id); notify(`أصبحت تتابع ${teacher}`); } return next; });

  return (
    <div className="app-shell" dir="rtl">
      <Header onNotify={notify} />
      <main>
        <section className="hero">
          <div className="hero-scribble hero-scribble-one" aria-hidden="true">↗</div><div className="hero-scribble hero-scribble-two" aria-hidden="true">∿</div>
          <div className="container-wide hero-grid">
            <div className="fade-up">
              <div className="eyebrow"><span className="eyebrow-line" /> تعلّم بصوتك، وبطريقتك <span className="eyebrow-dot" /></div>
              <h1>{browseMode ? <>اختر الحصة التي<br /><em>تفتح الفكرة.</em></> : <>حين تشرح لك الفكرة نفسها،<br /><em>كل شيء يتغير.</em></>}</h1>
              <p className="hero-copy">حصص مباشرة من معلمين تثق بهم. تعال لتسأل، جرّب، وافهم — في اللحظة التي تناسبك.</p>
              <div className="hero-actions"><button className="button-primary" onClick={() => document.getElementById('live-classes')?.scrollIntoView({ behavior: 'smooth' })} data-testid="button-explore-live"><CirclePlay size={18} /> اكتشف الحصص الآن</button><button className="button-secondary" onClick={() => notify('تابع معلميك لتعرف كل جديد من جاهز Live')} data-testid="button-how-it-works"><Sparkles size={17} /> كيف يعمل جاهز Live؟</button></div>
              <div className="hero-proof"><span className="proof-avatars"><i>نع</i><i>يح</i><i>لش</i></span><span><b>+12,400</b> طالب وجدوا شرحهم</span><span className="proof-separator" /><span className="proof-live"><span /> حي الآن</span></div>
            </div>
            <BoardIllustration />
          </div>
        </section>

        <section className="section" id="live-classes">
          <div className="container-wide">
            <div className="section-intro"><div><p className="section-kicker">الإشارة الآن</p><h2 className="section-title">{activeTab === 'live' ? 'حصص تستحق أن تدخلها الآن' : 'حصص قادمة لا تفوّت بدايتها'}</h2></div><span className="section-index">01 / اكتشف</span></div>
            <div className="discovery-bar"><div className="search-box"><Search size={18} /><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ابحث عن مادة، معلم، أو فكرة..." aria-label="ابحث عن حصة" data-testid="input-search-classes" /></div><div className="segmented" role="tablist" aria-label="نوع الحصص"><button className={`segment ${activeTab === 'live' ? 'active' : ''}`} onClick={() => setActiveTab('live')} role="tab" aria-selected={activeTab === 'live'} data-testid="tab-live"><span className="segment-live-dot" />مباشر الآن <span dir="ltr">({liveClasses.length})</span></button><button className={`segment ${activeTab === 'upcoming' ? 'active' : ''}`} onClick={() => setActiveTab('upcoming')} role="tab" aria-selected={activeTab === 'upcoming'} data-testid="tab-upcoming">قادم قريباً <span dir="ltr">({upcomingClasses.length})</span></button></div></div>
            <div className="filter-row" aria-label="تصفية حسب المادة">{subjects.map((item) => <button key={item} className={`filter-pill ${subject === item ? 'active' : ''}`} onClick={() => setSubject(item)} data-testid={`filter-subject-${item}`}>{item}</button>)}</div>
            <div className="content-layout"><div className="class-grid">{filteredClasses.length ? filteredClasses.slice(0, 3).map((item) => <ClassCard key={item.id} item={item} followed={followedClasses.has(item.id)} onFollow={() => toggleClassFollow(item.id, item.teacher)} onAction={() => notify(item.status === 'live' ? `جارٍ تجهيز حصة ${item.teacher}` : `تم حفظ مقعدك في حصة ${item.teacher}`)} />) : <div className="empty-state"><Search size={27} /><h3>لم نجد هذه الفكرة بعد</h3><p>جرّب كلمة أخرى أو استكشف كل المواد.</p><button className="button-secondary" onClick={() => { setQuery(''); setSubject('الكل'); }} data-testid="button-clear-filters">إظهار كل الحصص</button></div>}</div><TeacherPanel followed={followedTeachers} onFollow={toggleTeacherFollow} /></div>
          </div>
        </section>

        <section className="upcoming-section" id="upcoming-classes"><div className="container-wide"><div className="section-head"><div><p className="section-kicker">قريباً على السبورة</p><h2 className="section-title">احجز مكانك في لحظة الفهم</h2></div><button className="text-link" onClick={() => { setActiveTab('upcoming'); document.getElementById('live-classes')?.scrollIntoView({ behavior: 'smooth' }); }} data-testid="button-view-upcoming">كل الحصص القادمة <ArrowUpLeft size={15} /></button></div><div className="upcoming-grid">{upcomingClasses.map((item) => <UpcomingCard key={item.id} item={item} onAction={() => notify(`تم حفظ مقعدك في حصة ${item.teacher}`)} />)}</div></div></section>

        <section className="teacher-strip"><div className="container-wide teacher-strip-grid"><div className="teacher-intro"><p className="section-kicker">أصوات تعرف كيف تشرح</p><h2>المعلم الجيد لا يعطيك الإجابة.<br /><span>يجعلك تراها بنفسك.</span></h2><p>تعرّف على معلمين يصنعون من كل حصة تجربة، ومن كل سؤال بداية جديدة.</p><button className="text-link" onClick={() => notify('دليل المعلمين قادم قريباً')} data-testid="button-all-teachers">اكتشف كل المعلمين <ArrowLeft size={15} /></button></div><div className="teacher-cards">{teachers.map((teacher, index) => <article className="expert-card fade-up" key={teacher.id} data-testid={`card-expert-${teacher.id}`}><div className="expert-top"><span className={`teacher-avatar ${teacher.avatar}`}>{teacher.initials}</span><span className="verified"><ShieldCheck size={13} /> موثّق</span></div><h3>{teacher.name}</h3><p>{teacher.specialty}</p><button className={`expert-follow ${followedTeachers.has(teacher.id) ? 'active' : ''}`} onClick={() => toggleTeacherFollow(teacher.id, teacher.name)} data-testid={`button-expert-follow-${teacher.id}`}>{followedTeachers.has(teacher.id) ? 'تتابعه الآن' : index === 1 ? 'يتابعه الكثيرون' : 'متابعة المعلم'}</button></article>)}</div></div></section>

        <section className="cta-banner"><div className="cta-signal" aria-hidden="true"><SignalMark compact /></div><div><p className="section-kicker">جاهز للحظة؟</p><h2>هل أنت مستعد تقول: «آها، فهمت!»؟</h2><p>ابدأ بحصة واحدة. واترك الباقي للحظة المناسبة.</p></div><button className="button-secondary" onClick={() => document.getElementById('live-classes')?.scrollIntoView({ behavior: 'smooth' })} data-testid="button-cta-discover">ابدأ الاكتشاف <ArrowLeft size={16} /></button></section>
      </main>
      <footer className="footer"><div className="container-wide footer-inner"><div className="footer-brand"><Logo /><span>جزء من منظومة جاهز التعليمية</span></div><div className="footer-links"><a href="#live-classes" data-testid="link-footer-live">الحصص المباشرة</a><a href="#upcoming-classes" data-testid="link-footer-upcoming">القادمة</a><button onClick={() => notify('نتمنى لك تعلماً ممتعاً')} data-testid="button-footer-help">مركز المساعدة</button></div><div className="footer-copy">© 2024 جاهز Live</div></div></footer>
      {toast && <div className="toast" role="status" data-testid="status-toast"><Check size={16} /> {toast}</div>}
    </div>
  );
}

function Router() {
  return <RoutedErrorBoundary><Switch><Route path="/" component={() => <DiscoveryPage />} /><Route path="/browse" component={() => <DiscoveryPage browseMode />} /><Route component={NotFound} /></Switch></RoutedErrorBoundary>;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;