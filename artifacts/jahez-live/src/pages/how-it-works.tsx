import { Link } from 'wouter';
import {
  BarChart3, BellRing, CalendarPlus, CheckCircle2, CirclePlay, Eye, Rocket,
  Star, UserPlus, Users, Wallet,
} from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { CTASection } from '@/components/marketing/cta-section';
import { useSeo } from '@/hooks/use-seo';
import { routes } from '@/lib/routes';
import { breadcrumbJsonLd } from '@/lib/structured-data';

const studentSteps = [
  { icon: <UserPlus size={20} />, title: 'اعمل حساب', copy: 'حساب مجاني في دقيقة واحدة.' },
  { icon: <Eye size={20} />, title: 'اكتشف الحصة', copy: 'دوّر بالمادة، الصف، أو اسم المدرس.' },
  { icon: <Star size={20} />, title: 'شوف المدرس والتقييمات', copy: 'راجع تقييمات طلاب حضروا فعلاً.' },
  { icon: <Wallet size={20} />, title: 'ادفع', copy: 'ادفع قيمة الحصة وضمن مكانك.' },
  { icon: <CirclePlay size={20} />, title: 'ادخل الحصة', copy: 'لما الميعاد يجي، ادخل واتعلم لايف.' },
  { icon: <CalendarPlus size={20} />, title: 'تابع الحصص الجاية', copy: 'اتابع مدرسينك وهتوصلك حصصهم الجديدة.' },
  { icon: <CheckCircle2 size={20} />, title: 'قيّم تجربتك', copy: 'رأيك بيساعد طلاب تانيين يختاروا صح.' },
];

const teacherSteps = [
  { icon: <UserPlus size={20} />, title: 'أنشئ حساب مدرس', copy: 'حساب مخصص لإدارة حصصك.' },
  { icon: <CheckCircle2 size={20} />, title: 'أكمل بياناتك', copy: 'المادة، الخبرة، وصورة البروفايل.' },
  { icon: <CirclePlay size={20} />, title: 'أنشئ حصتك', copy: 'العنوان، الوصف، والصورة المصغّرة.' },
  { icon: <CalendarPlus size={20} />, title: 'حدد الميعاد والسعر', copy: 'حصة فورية أو Premiere قبلها بأيام.' },
  { icon: <Rocket size={20} />, title: 'انشر الحصة', copy: 'الطلاب هيقدروا يكتشفوها من فوره.' },
  { icon: <Users size={20} />, title: 'الطلاب يحجزوا', copy: 'تابع عدد الحجوزات لحظة بلحظة.' },
  { icon: <BellRing size={20} />, title: 'ابدأ اللايف', copy: 'ادخل الحصة في ميعادها المحدد.' },
  { icon: <BarChart3 size={20} />, title: 'تابع أداءك وأرباحك', copy: 'مشاهدات، حضور، تقييمات، وأرباح — كل حاجة في مكان واحد.' },
];

function Timeline({ items }: { items: { icon: React.ReactNode; title: string; copy: string }[] }) {
  return (
    <ol className="hiw-timeline">
      {items.map((item, i) => (
        <li key={item.title} className="hiw-timeline-item fade-up" style={{ '--index': i } as React.CSSProperties}>
          <span className="hiw-timeline-icon">{item.icon}</span>
          <div>
            <h3>{item.title}</h3>
            <p>{item.copy}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export default function HowItWorks() {
  useSeo({
    title: routes.howItWorks.title,
    description: routes.howItWorks.description,
    path: routes.howItWorks.path,
    jsonLd: breadcrumbJsonLd([{ label: 'الرئيسية', path: '/' }, { label: 'إزاي بتشتغل؟' }]),
  });

  return (
    <div className="app-shell" dir="rtl">
      <Header />
      <main>
        <section className="classes-hero">
          <div className="container-wide">
            <p className="section-kicker fade-up">الدليل</p>
            <h1 className="classes-hero-title fade-up">إزاي المنصة بتشتغل؟</h1>
            <p className="classes-hero-copy fade-up delay-1">خطوة بخطوة — سواء كنت طالب بتدور على حصة، أو مدرس عايز يفتح حصته الأولى.</p>
          </div>
        </section>

        <section className="section stagger-children">
          <div className="container-wide">
            <h2 className="section-title" style={{ marginBottom: 26 }}>رحلة الطالب</h2>
            <Timeline items={studentSteps} />
          </div>
        </section>

        <section className="section hiw-teacher-section">
          <div className="container-wide">
            <h2 className="section-title" style={{ marginBottom: 26 }}>رحلة المدرس</h2>
            <Timeline items={teacherSteps} />
          </div>
        </section>

        <CTASection kicker="جاهز تبدأ؟" title="اختار طريقك." copy="سواء عايز تتعلم أو تعلّم، الخطوة الأولى بسيطة.">
          <div className="final-cta-actions">
            <Link href={routes.classes.path} className="button-secondary" data-testid="link-hiw-browse">تصفح الحصص</Link>
            <Link href={routes.forTeachers.path} className="button-secondary" data-testid="link-hiw-teacher">ابدأ كمدرس</Link>
          </div>
        </CTASection>
      </main>
      <Footer />
    </div>
  );
}
