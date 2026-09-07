import { useMemo, useState } from 'react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { TeacherDirectoryCard } from '@/components/marketing/teacher-card';
import { EmptyState } from '@/components/marketing/empty-state';
import { SeoContentSection } from '@/components/marketing/seo-content-section';
import { useSeo } from '@/hooks/use-seo';
import { routes } from '@/lib/routes';
import { breadcrumbJsonLd } from '@/lib/structured-data';
import { subjects, teachers } from '@/data/classes';

export default function Teachers() {
  useSeo({
    title: routes.teachers.title,
    description: routes.teachers.description,
    path: routes.teachers.path,
    jsonLd: breadcrumbJsonLd([{ label: 'الرئيسية', path: '/' }, { label: 'المدرسين' }]),
  });

  const [subject, setSubject] = useState('الكل');
  const [followed, setFollowed] = useState<Set<string>>(new Set());
  const [toast, setToast] = useState('');

  const notify = (m: string) => {
    setToast(m);
    window.setTimeout(() => setToast(''), 2700);
  };

  const filtered = useMemo(
    () => teachers.filter((t) => subject === 'الكل' || t.subject === subject),
    [subject],
  );

  const toggleFollow = (id: string, name: string) =>
    setFollowed((current) => {
      const next = new Set(current);
      if (next.has(id)) { next.delete(id); notify(`ألغيت متابعة ${name}`); } else { next.add(id); notify(`أصبحت تتابع ${name}`); }
      return next;
    });

  return (
    <div className="app-shell" dir="rtl">
      <Header />
      <main>
        <section className="classes-hero">
          <div className="container-wide">
            <p className="section-kicker fade-up">المدرسين</p>
            <h1 className="classes-hero-title fade-up">اكتشف مدرسك الجاي.</h1>
            <p className="classes-hero-copy fade-up delay-1">قارن بين المدرسين، شوف التقييمات، تابع اللي يناسبك، واعرف حصصهم الجاية.</p>
          </div>
        </section>

        <section className="section" style={{ paddingTop: 0 }}>
          <div className="container-wide">
            <div className="filter-row" aria-label="تصفية حسب المادة">
              {subjects.map((item) => (
                <button key={item} className={`filter-pill ${subject === item ? 'active' : ''}`} onClick={() => setSubject(item)} data-testid={`filter-teacher-subject-${item}`}>
                  {item}
                </button>
              ))}
            </div>
            {filtered.length === 0 ? (
              <EmptyState title="مفيش مدرسين في المادة دي دلوقتي" copy="جرّب مادة تانية." />
            ) : (
              <div className="teacher-directory-grid">
                {filtered.map((teacher) => (
                  <TeacherDirectoryCard key={teacher.id} teacher={teacher} followed={followed.has(teacher.id)} onFollow={() => toggleFollow(teacher.id, teacher.name)} />
                ))}
              </div>
            )}
          </div>
        </section>

        <SeoContentSection
          blocks={[
            {
              heading: 'إزاي تقارن بين المدرسين؟',
              paragraphs: [
                'كل مدرس على جاهز Live له تقييم من الطلاب اللي حضروا حصصه فعلاً، وعدد متابعين، وعدد حصص. قارن بين أكتر من مدرس في نفس المادة قبل ما تحجز.',
              ],
            },
            {
              heading: 'يعني إيه "مدرس موثّق"؟',
              paragraphs: [
                'علامة التوثيق بتظهر على حسابات المدرسين اللي جاهز Live أكّد بياناتهم. غياب العلامة مايعنيش إن المدرس مش كويس — بس التوثيق بيديك طبقة تأكيد إضافية.',
              ],
            },
          ]}
        />
      </main>
      <Footer />
      {toast && <div className="toast" role="status" data-testid="status-toast">{toast}</div>}
    </div>
  );
}
