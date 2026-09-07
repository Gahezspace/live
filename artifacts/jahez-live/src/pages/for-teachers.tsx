import { useState } from 'react';
import { BarChart3, CalendarClock, CircleDollarSign, Star, UserPlus, Users, Video } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { AuthDialog, type AuthMode } from '@/components/marketing/auth-dialog';
import { SectionHeader } from '@/components/marketing/section-header';
import { CTASection } from '@/components/marketing/cta-section';
import { useSeo } from '@/hooks/use-seo';
import { routes } from '@/lib/routes';
import { breadcrumbJsonLd } from '@/lib/structured-data';

const sections = [
  { icon: <Video size={22} />, title: 'افتح حصتك', copy: 'افتح حصتك في دقائق — عنوان، وصف، وصورة مصغّرة.' },
  { icon: <CalendarClock size={22} />, title: 'حدد الميعاد', copy: 'حصة فورية دلوقتي، أو أعلن عنها كـ Premiere قبلها بأيام.' },
  { icon: <CircleDollarSign size={22} />, title: 'حدد السعر', copy: 'إنت اللي بتحدد سعر حصتك المناسب.' },
  { icon: <Users size={22} />, title: 'اجمع جمهورك', copy: 'الطلاب يقدروا يكتشفوك ويتابعوك عشان توصلهم حصصك الجديدة.' },
  { icon: <Star size={22} />, title: 'ابنِ سمعتك', copy: 'كل تقييم من طالب حضر فعلاً بيبني ثقة أكبر فيك.' },
  { icon: <BarChart3 size={22} />, title: 'تابع أداءك', copy: 'مشاهدات، عدد طلاب، حضور، وأرباح — في مكان واحد.' },
];

export default function ForTeachers() {
  useSeo({
    title: routes.forTeachers.title,
    description: routes.forTeachers.description,
    path: routes.forTeachers.path,
    jsonLd: breadcrumbJsonLd([{ label: 'الرئيسية', path: '/' }, { label: 'للمدرسين' }]),
  });

  const [authMode, setAuthMode] = useState<AuthMode | null>(null);

  return (
    <div className="app-shell" dir="rtl">
      <Header />
      <main>
        <section className="landing-hero" style={{ minHeight: 'auto', paddingBottom: 60 }}>
          <div className="container-wide teacher-hero-grid">
            <div className="landing-hero-copy fade-up">
              <div className="eyebrow"><span className="eyebrow-line" /> للمدرسين <span className="eyebrow-dot" /></div>
              <h1 style={{ fontSize: 'var(--text-display-hero)' }}>حوّل شرحك<br /><em>لمركز أونلاين.</em></h1>
              <p className="hero-copy">افتح حصصك، ابنِ جمهورك، وخلّي الطلاب يوصلولك — من غير ما تحتاج تبدأ من الصفر.</p>
              <div className="hero-actions">
                <button className="button-primary" onClick={() => setAuthMode('signup')} data-testid="button-teachers-hero-cta"><UserPlus size={18} /> ابدأ كمدرس</button>
              </div>
            </div>
            <div className="teacher-dashboard-preview fade-up delay-1" aria-hidden="true">
              <div className="teacher-dashboard-head"><span>لوحة المدرس</span><span className="signal-live"><i /> LIVE</span></div>
              <div className="teacher-dashboard-stats">
                <div><strong>٣٤٢</strong><span>مشاهد الآن</span></div>
                <div><strong>٤٫٩</strong><span>التقييم</span></div>
                <div><strong>١٢٫٤k</strong><span>متابع</span></div>
              </div>
              <div className="teacher-dashboard-bar" />
              <div className="teacher-dashboard-bar short" />
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container-wide">
            <SectionHeader kicker="ليه جاهز Live؟" title="كل حاجة تحتاجها عشان تبدأ." />
            <div className="friction-grid teacher-features-grid">
              {sections.map((s) => (
                <div className="friction-card hover-lift" key={s.title}>
                  <span className="friction-icon">{s.icon}</span>
                  <h3>{s.title}</h3>
                  <p>{s.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTASection kicker="خطوتك الأولى" title="ابدأ تدريسك أونلاين النهاردة." copy="افتح حسابك كمدرس مجانًا وابدأ حصتك الأولى.">
          <button className="button-secondary" onClick={() => setAuthMode('signup')} data-testid="button-teachers-final-cta"><UserPlus size={16} /> ابدأ كمدرس</button>
        </CTASection>
      </main>
      <Footer />
      {authMode && <AuthDialog mode={authMode} onClose={() => setAuthMode(null)} onSwitch={setAuthMode} />}
    </div>
  );
}
