import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { ArrowRight, RefreshCw } from 'lucide-react';
import '@/pages/style-guide.css';

function useNoIndex(title: string) {
  useEffect(() => {
    document.title = title;
    let meta = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'robots');
      document.head.appendChild(meta);
    }
    const prev = meta.getAttribute('content');
    meta.setAttribute('content', 'noindex, nofollow');
    return () => {
      if (prev) meta!.setAttribute('content', prev);
    };
  }, [title]);
}

/**
 * Living reference for the جاهز Live design system. Not linked from the
 * marketing nav — reachable at /style-guide for anyone building a new page.
 * Every value shown here reads from src/styles/tokens.css and
 * src/styles/animations.css; see DESIGN_SYSTEM.md at the project root for
 * the full usage guide.
 */

const semanticColors = [
  { name: 'Background', varName: '--background' },
  { name: 'Foreground', varName: '--foreground' },
  { name: 'Card', varName: '--card' },
  { name: 'Primary', varName: '--primary' },
  { name: 'Secondary', varName: '--secondary' },
  { name: 'Muted', varName: '--muted' },
  { name: 'Accent', varName: '--accent' },
  { name: 'Destructive', varName: '--destructive' },
  { name: 'Success', varName: '--success' },
  { name: 'Warning', varName: '--warning' },
  { name: 'Info', varName: '--info' },
  { name: 'Border', varName: '--border' },
];

const brandColors = [
  { name: 'Ink', varName: '--ink' },
  { name: 'Paper', varName: '--paper' },
  { name: 'Coral', varName: '--coral' },
  { name: 'Sun', varName: '--sun' },
  { name: 'Mint', varName: '--mint' },
];

const displayScale = [
  { tag: '--text-display-xl', size: 'var(--text-display-xl)', sample: 'ذاكر من مكانك' },
  { tag: '--text-display-hero', size: 'var(--text-display-hero)', sample: 'كل شيء يتغير' },
  { tag: '--text-display-lg', size: 'var(--text-display-lg)', sample: 'خلّ المكان يشتغل لك' },
  { tag: '--text-display-md', size: 'var(--text-display-md)', sample: 'قريباً على السبورة' },
];

const bodyScale = [
  { tag: 'text-xs', className: 'text-xs' },
  { tag: 'text-sm', className: 'text-sm' },
  { tag: 'text-base', className: 'text-base' },
  { tag: 'text-lg', className: 'text-lg' },
  { tag: 'text-xl', className: 'text-xl' },
  { tag: 'text-2xl', className: 'text-2xl' },
];

const spaceScale = [
  ['--space-1', 4], ['--space-2', 8], ['--space-3', 12], ['--space-4', 16],
  ['--space-5', 20], ['--space-6', 24], ['--space-8', 32], ['--space-10', 40],
  ['--space-12', 48], ['--space-16', 64], ['--space-20', 80],
] as const;

const radiusTokens = [
  { tag: '--radius-chip', value: 'var(--radius-chip)' },
  { tag: '--radius-control', value: 'var(--radius-control)' },
  { tag: '--radius-signal-sm', value: 'var(--radius-signal-sm)' },
  { tag: '--radius-signal-badge', value: 'var(--radius-signal-badge)' },
  { tag: '--radius-signal-card', value: 'var(--radius-signal-card)' },
  { tag: '--radius-signal-panel', value: 'var(--radius-signal-panel)' },
  { tag: '--radius-signal-mark', value: 'var(--radius-signal-mark)' },
];

const shadowTokens = [
  { tag: 'sticker-xs', value: 'var(--shadow-sticker-xs) hsl(var(--accent) / .72)' },
  { tag: 'sticker-sm', value: 'var(--shadow-sticker-sm) hsl(var(--accent) / .72)' },
  { tag: 'sticker-md', value: 'var(--shadow-sticker-md) hsl(var(--accent) / .72)' },
  { tag: 'sticker-lg', value: 'var(--shadow-sticker-lg) hsl(var(--accent) / .72)' },
  { tag: 'sticker-xl', value: 'var(--shadow-sticker-xl) hsl(var(--accent) / .72)' },
  { tag: 'float', value: 'var(--shadow-float)' },
];

const entranceAnimations = ['fade-up', 'fade-in', 'scale-in', 'slide-up', 'slide-in-right', 'pop-in'];

function SectionHead({ num, title }: { num: string; title: string }) {
  return (
    <div className="sg-section-head">
      <span className="sg-section-num">{num}</span>
      <h2 className="sg-section-title">{title}</h2>
    </div>
  );
}

export default function StyleGuide() {
  useNoIndex('نظام تصميم جاهز Live');
  const [replayKey, setReplayKey] = useState(0);

  return (
    <div className="sg-page" dir="rtl">
      <div className="sg-wrap">
        <Link href="/" className="sg-back" data-testid="link-styleguide-home">
          <ArrowRight size={14} /> رجوع للموقع
        </Link>
        <h1 className="sg-title">نظام تصميم جاهز Live</h1>
        <p className="sg-subtitle">
          المرجع الحي لكل الألوان، المسافات، الأشكال، والحركة المستخدمة في المنتج. أي صفحة جديدة
          المفروض تستخدم القيم دي بدل ما تخترع ألوان أو حركات جديدة — التفاصيل الكاملة في
          ملف <code style={{ fontFamily: 'var(--app-font-mono)', direction: 'ltr', display: 'inline-block' }}>DESIGN_SYSTEM.md</code> في جذر المشروع.
        </p>

        {/* Colors */}
        <section className="sg-section">
          <SectionHead num="01 / COLOR" title="الألوان" />
          <p className="sg-section-note">
            ألوان دلالية (semantic) للواجهة — استخدمها دايمًا عن طريق <code>hsl(var(--token))</code> أو
            كلاسات Tailwind زي <code>bg-primary</code>. ألوان الهوية (brand) استخدمها بس للرسومات
            والعناصر الزخرفية.
          </p>
          <div className="sg-grid" style={{ marginBottom: 22 }}>
            {semanticColors.map((c) => (
              <div className="sg-swatch" key={c.varName}>
                <div className="sg-swatch-fill" style={{ background: `hsl(var(${c.varName}))` }} />
                <div className="sg-swatch-meta">
                  <span className="sg-swatch-name">{c.name}</span>
                  <span className="sg-swatch-var">{c.varName}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="sg-grid">
            {brandColors.map((c) => (
              <div className="sg-swatch" key={c.varName}>
                <div className="sg-swatch-fill" style={{ background: `var(${c.varName})` }} />
                <div className="sg-swatch-meta">
                  <span className="sg-swatch-name">{c.name}</span>
                  <span className="sg-swatch-var">{c.varName}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section className="sg-section">
          <SectionHead num="02 / TYPE" title="الخطوط والمقاسات" />
          <p className="sg-section-note">
            Cairo للنصوص والعناوين، Space Grotesk (LTR) للأرقام والتفاصيل التقنية. مقاسات العناوين
            الكبيرة (fluid clamp) محفوظة كـ tokens؛ نصوص الجسم استخدم كلاسات Tailwind القياسية.
          </p>
          {displayScale.map((t) => (
            <div className="sg-type-row" key={t.tag}>
              <span className="sg-type-tag">{t.tag}</span>
              <span className="sg-type-sample" style={{ fontSize: t.size }}>{t.sample}</span>
            </div>
          ))}
          <div style={{ marginTop: 18 }}>
            {bodyScale.map((t) => (
              <div className="sg-type-row" key={t.tag}>
                <span className="sg-type-tag">{t.tag}</span>
                <span className={`sg-type-sample ${t.className}`}>جملة تجريبية بالعربي — Aa 123</span>
              </div>
            ))}
          </div>
        </section>

        {/* Spacing */}
        <section className="sg-section">
          <SectionHead num="03 / SPACE" title="المسافات" />
          <p className="sg-section-note">
            سلم مسافات بمضاعفات 4px. للصفحات الجديدة فضّل كلاسات Tailwind (<code>p-4</code>,
            <code> gap-6</code>) — الـ tokens دي للـ CSS المخصص بس.
          </p>
          {spaceScale.map(([tag, px]) => (
            <div className="sg-space-row" key={tag}>
              <span className="sg-space-label">{tag} — {px}px</span>
              <div className="sg-space-bar" style={{ width: `var(${tag})` }} />
            </div>
          ))}
        </section>

        {/* Shape */}
        <section className="sg-section">
          <SectionHead num="04 / SHAPE" title="الأشكال — زاوية واحدة حادة" />
          <p className="sg-section-note">
            توقيع الهوية البصرية: زاوية واحدة حادة مقابل ثلاثة ناعمة. استخدمها للبطاقات، الأزرار،
            والعلامات بدل الزوايا المتماثلة العادية.
          </p>
          <div className="sg-shape-grid">
            {radiusTokens.map((r) => (
              <div key={r.tag}>
                <div className="sg-shape-box" style={{ borderRadius: r.value }}>{r.tag.replace('--radius-', '')}</div>
                <p className="sg-shape-label">{r.tag}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Elevation */}
        <section className="sg-section">
          <SectionHead num="05 / ELEVATION" title="الظلال" />
          <p className="sg-section-note">
            ظل "ستيكر" مسطّح بدون blur — التوقيع البصري الرئيسي. الظل الناعم (float) للقوائم
            المنسدلة والعناصر العائمة بس.
          </p>
          <div className="sg-shadow-grid">
            {shadowTokens.map((s) => (
              <div key={s.tag}>
                <div className="sg-shadow-box" style={{ boxShadow: s.value }}>{s.tag}</div>
                <p className="sg-shadow-label">{s.tag}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Motion */}
        <section className="sg-section">
          <SectionHead num="06 / MOTION" title="الحركة" />
          <p className="sg-section-note">
            كل حركة في المنتج لازم تيجي من <code>src/styles/animations.css</code>. مفيش
            @keyframes جديدة مبعثرة في صفحات فردية. كل حاجة هنا بتحترم
            <code> prefers-reduced-motion</code> تلقائيًا.
          </p>

          <button
            className="sg-replay-btn"
            style={{ marginBottom: 18 }}
            onClick={() => setReplayKey((k) => k + 1)}
            data-testid="button-replay-animations"
          >
            <RefreshCw size={12} style={{ display: 'inline', verticalAlign: '-2px', marginLeft: 5 }} />
            أعد تشغيل حركات الدخول
          </button>

          <div className="sg-motion-grid" style={{ marginBottom: 22 }} key={replayKey}>
            {entranceAnimations.map((name) => (
              <div className="sg-motion-card" key={name}>
                <div className={`sg-demo-box ${name}`}>Aa</div>
                <span className="sg-motion-label">.{name}</span>
              </div>
            ))}
          </div>

          <div className="sg-motion-grid" style={{ marginBottom: 22 }}>
            <div className="sg-motion-card">
              <div className="sg-demo-box animate-float">float</div>
              <span className="sg-motion-label">.animate-float</span>
              <span className="sg-motion-hint">idle bob — hero illustrations</span>
            </div>
            <div className="sg-motion-card">
              <div className="sg-demo-dot animate-pulse-live" />
              <span className="sg-motion-label">.animate-pulse-live</span>
              <span className="sg-motion-hint">"live now" indicators</span>
            </div>
            <div className="sg-motion-card">
              <div className="sg-demo-box animate-wiggle" style={{ animationIterationCount: 'infinite' }}>!</div>
              <span className="sg-motion-label">.animate-wiggle</span>
              <span className="sg-motion-hint">use rarely — one hint per screen</span>
            </div>
            <div className="sg-motion-card">
              <div className="sg-shimmer-bar animate-shimmer" />
              <span className="sg-motion-label">.animate-shimmer</span>
              <span className="sg-motion-hint">loading skeletons</span>
            </div>
          </div>

          <div className="sg-motion-grid" style={{ marginBottom: 22 }}>
            <div className="sg-motion-card">
              <div className="sg-hover-card hover-lift">hover-lift</div>
              <span className="sg-motion-label">.hover-lift</span>
            </div>
            <div className="sg-motion-card">
              <div className="sg-hover-card hover-lift-lg">hover-lift-lg</div>
              <span className="sg-motion-label">.hover-lift-lg</span>
            </div>
            <div className="sg-motion-card">
              <div className="sg-hover-card hover-press">hover-press</div>
              <span className="sg-motion-label">.hover-press</span>
            </div>
            <div className="sg-motion-card">
              <div className="sg-hover-card press-shrink">press-shrink</div>
              <span className="sg-motion-label">.press-shrink</span>
            </div>
          </div>

          <p className="sg-section-note" style={{ marginBottom: 10 }}>
            تعشيق تلقائي (stagger) — حط <code>--index</code> على كل عنصر و<code>.stagger-children</code>
            على الأب، وكل عنصر ياخد delay تلقائي:
          </p>
          <div className="sg-stagger-row stagger-children" key={`stagger-${replayKey}`}>
            {['واحد', 'اتنين', 'تلاتة', 'أربعة', 'خمسة'].map((label, i) => (
              <span className="sg-stagger-chip fade-up" style={{ '--index': i } as React.CSSProperties} key={label}>
                {label}
              </span>
            ))}
          </div>
        </section>

        {/* Components */}
        <section className="sg-section">
          <SectionHead num="07 / COMPONENTS" title="عناصر جاهزة" />
          <p className="sg-section-note">استخدم الكلاسات دي بدل ما تعمل زرار أو بادج جديد من الصفر.</p>

          <div className="sg-component-row">
            <span className="sg-component-row-label">buttons</span>
            <button className="button-primary">زرار أساسي</button>
            <button className="button-secondary">زرار ثانوي</button>
            <button className="header-signup">header-signup</button>
            <button className="header-login">header-login</button>
          </div>

          <div className="sg-component-row">
            <span className="sg-component-row-label">status</span>
            <span className="status-badge" style={{ position: 'static' }}><span className="live-dot" /> مباشر الآن</span>
            <span className="status-badge" style={{ position: 'static' }}><span className="premiere-dot" /> حصة قادمة</span>
          </div>

          <div className="sg-component-row">
            <span className="sg-component-row-label">filter pills</span>
            <button className="filter-pill active">نشط</button>
            <button className="filter-pill">غير نشط</button>
          </div>

          <div className="sg-component-row">
            <span className="sg-component-row-label">avatars</span>
            <span className="teacher-avatar avatar-a">نع</span>
            <span className="teacher-avatar avatar-b">يح</span>
            <span className="teacher-avatar avatar-c">لش</span>
            <span className="teacher-avatar avatar-d">فس</span>
          </div>

          <div className="sg-component-row">
            <span className="sg-component-row-label">thumb themes</span>
            <span className="sg-demo-box" style={{ background: '#f4bca6', color: 'inherit', borderRadius: 8 }} />
            <span className="sg-demo-box" style={{ background: '#b6d4c9', color: 'inherit', borderRadius: 8 }} />
            <span className="sg-demo-box" style={{ background: '#f1d978', color: 'inherit', borderRadius: 8 }} />
            <span className="sg-demo-box" style={{ background: '#c6ded6', color: 'inherit', borderRadius: 8 }} />
          </div>
        </section>

        <p className="sg-footer-note">
          كل التوكينز دي حية في <code>src/styles/tokens.css</code> و<code>src/styles/animations.css</code>.
          غيّر القيمة هناك، وكل مكان بيستخدمها يتحدث تلقائيًا — بما فيها الصفحة دي.
        </p>
      </div>
    </div>
  );
}
