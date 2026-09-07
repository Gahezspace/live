import { Link } from 'wouter';
import { Bell, BookOpen, CalendarClock, RotateCcw, ShieldCheck, Star, Users } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { SectionHeader } from '@/components/marketing/section-header';
import { CTASection } from '@/components/marketing/cta-section';
import { useSeo } from '@/hooks/use-seo';
import { routes } from '@/lib/routes';
import { breadcrumbJsonLd } from '@/lib/structured-data';

const items = [
  { icon: <Users size={20} />, title: 'أكتر من مدرس', copy: 'مش مربوط بمدرس واحد — قارن واختار اللي يناسب أسلوبك.' },
  { icon: <Star size={20} />, title: 'تقييمات حقيقية', copy: 'شوف رأي طلاب حضروا الحصة فعلاً قبل ما تحجز.' },
  { icon: <Users size={20} />, title: 'متابعين ومتابعة', copy: 'اتابع المدرس اللي بتحب شرحه وهتعرف حصصه الجديدة أول بأول.' },
  { icon: <CalendarClock size={20} />, title: 'حصص مباشرة وقادمة', copy: 'ادخل حصة شغالة دلوقتي، أو احجز مكانك في حصة Premiere قبل ميعادها.' },
  { icon: <RotateCcw size={20} />, title: 'Replay', copy: 'فاتتك الحصة؟ بعض الحصص متاحة تراجعها بعدين.' },
  { icon: <Bell size={20} />, title: 'إشعارات', copy: 'هتعرف أول ما مدرسك يبدأ حصة مباشرة.' },
  { icon: <BookOpen size={20} />, title: 'سجل تعلّمك', copy: 'تابع الحصص اللي حضرتها والمدرسين اللي بتتابعهم في مكان واحد.' },
  { icon: <ShieldCheck size={20} />, title: 'مدرسين موثّقين', copy: 'علامة التوثيق تديك طمأنينة إضافية وانت بتختار.' },
];

export default function ForStudents() {
  useSeo({
    title: routes.forStudents.title,
    description: routes.forStudents.description,
    path: routes.forStudents.path,
    jsonLd: breadcrumbJsonLd([{ label: 'الرئيسية', path: '/' }, { label: 'للطلبة' }]),
  });

  return (
    <div className="app-shell" dir="rtl">
      <Header />
      <main>
        <section className="landing-hero" style={{ minHeight: 'auto', paddingBottom: 60 }}>
          <div className="container-wide">
            <div className="landing-hero-copy fade-up" style={{ maxWidth: 640 }}>
              <div className="eyebrow"><span className="eyebrow-line" /> للطلاب <span className="eyebrow-dot" /></div>
              <h1 style={{ fontSize: 'var(--text-display-hero)' }}>اختار المدرس<br /><em>قبل ما تختار الحصة.</em></h1>
              <p className="hero-copy">إنت مش مربوط بسنتر واحد ولا مدرس واحد. جاهز Live سوق مفتوح من المدرسين — تقدر تختار، تقارن، وتتابع اللي فعلاً يناسبك.</p>
              <div className="hero-actions">
                <Link href={routes.teachers.path} className="button-primary" data-testid="link-students-browse-teachers">تصفح المدرسين</Link>
                <Link href={routes.classes.path} className="button-secondary" data-testid="link-students-browse-classes">تصفح الحصص</Link>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container-wide">
            <SectionHeader kicker="إنت مش مربوط بسنتر واحد" title="كل حاجة تحتاجها عشان تختار صح." />
            <div className="why-live-grid">
              {items.map((item) => (
                <div className="why-live-item hover-lift" key={item.title}>
                  <span className="why-live-icon">{item.icon}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.copy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTASection kicker="جاهز تبدأ؟" title="أول حصة على بعد كام كليك بس." copy="اكتشف الحصص اللي شغالة دلوقتي وابدأ.">
          <Link href={routes.classes.path} className="button-secondary" data-testid="link-students-final-cta">تصفح الحصص</Link>
        </CTASection>
      </main>
      <Footer />
    </div>
  );
}
