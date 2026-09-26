import { Link } from 'wouter';
import { CalendarClock, Radio, Star, Users } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { SectionHeader } from '@/components/marketing/section-header';
import { CTASection } from '@/components/marketing/cta-section';
import { useSeo } from '@/hooks/use-seo';
import { routes } from '@/lib/routes';
import { breadcrumbJsonLd } from '@/lib/structured-data';

const items = [
  { icon: <Users size={20} />, title: 'مدرسين مختلفين' },
  { icon: <Radio size={20} />, title: 'حصص مباشرة' },
  { icon: <CalendarClock size={20} />, title: 'مواعيد واضحة' },
  { icon: <Star size={20} />, title: 'مقارنة قبل الحجز' },
];

export default function ForStudents() {
  useSeo({
    title: routes.forStudents.title,
    description: routes.forStudents.description,
    path: routes.forStudents.path,
    jsonLd: breadcrumbJsonLd([{ label: 'الرئيسية', path: '/' }, { label: 'للطلاب' }]),
  });

  return (
    <div className="app-shell" dir="rtl">
      <Header />
      <main>
        <section className="landing-hero" style={{ minHeight: 'auto', paddingBottom: 60 }}>
          <div className="container-wide">
            <div className="landing-hero-copy fade-up" style={{ maxWidth: 640 }}>
              <div className="eyebrow"><span className="eyebrow-line" /> للطلاب <span className="eyebrow-dot" /></div>
              <h1 style={{ fontSize: 'var(--text-display-hero)' }}>أول حصة على بعد<br /><em>كام كليك.</em></h1>
              <p className="hero-copy">اكتشف الحصص اللي شغالة، اختار المدرس اللي يناسبك، واحجز من غير ما ترتبط بسنتر واحد.</p>
              <div className="hero-actions">
                <Link href={routes.classes.path} className="button-primary" data-testid="link-students-browse-classes">تصفح الحصص</Link>
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
