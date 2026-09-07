import { Link } from 'wouter';
import { ContentPage } from '@/components/marketing/content-page';
import { useSeo } from '@/hooks/use-seo';
import { routes } from '@/lib/routes';
import { breadcrumbJsonLd } from '@/lib/structured-data';

export default function About() {
  useSeo({
    title: routes.about.title,
    description: routes.about.description,
    path: routes.about.path,
    jsonLd: breadcrumbJsonLd([{ label: 'الرئيسية', path: '/' }, { label: 'عن جاهز Live' }]),
  });

  return (
    <ContentPage
      eyebrow="مين إحنا"
      title="بنقرّب المدرس من الطالب."
      crumbs={[{ label: 'الرئيسية', path: '/' }, { label: 'عن جاهز Live' }]}
    >
      <div className="mp-prose">
        <h2>الفكرة</h2>
        <p>إحنا بنحاول نخلي الوصول لمدرس كويس أسهل. بدل ما الطالب يبقى مربوط بسنتر واحد أو مدرس واحد قريب منه، جاهز Live بيفتح سوق مفتوح: مدرسين يقدروا يشرحوا لايف، وطلاب يقدروا يكتشفوا ويختاروا اللي فعلاً يناسبهم — من أي مكان.</p>

        <h2>ليه لايف بالذات؟</h2>
        <p>الشرح المسجّل بيفضل نفسه لكل الناس. الحصة المباشرة بتتفاعل مع اللي قدامها — تقدر تسأل، والمدرس يرد عليك في نفس اللحظة، وده اللي بيخلي الفكرة توصل أوضح.</p>

        <h2>إزاي إحنا مختلفين</h2>
        <p>مش منصة فيديوهات، ومش سنتر تقليدي، ومش سوق تسعير رخيص. جاهز Live مكان تكتشف فيه مدرسين حقيقيين، تشوف تقييمات حقيقية، وتحجز حصة حقيقية في ميعاد محدد.</p>

        <h2>دور التكنولوجيا</h2>
        <p>التكنولوجيا عندنا وسيلة مش غاية — بنستخدمها عشان نوصل المدرس الصح للطالب الصح بأسرع وأوضح طريقة ممكنة، من الاكتشاف لحد الدخول للحصة.</p>

        <h2>وإحنا رايحين فين</h2>
        <p>بنبني جاهز Live خطوة بخطوة، وبنسمع من المدرسين والطلاب اللي بيستخدموه عشان نطوّره باستمرار.</p>
      </div>

      <p className="mp-inline-link">
        عايز تبدأ؟ <Link href={routes.classes.path}>تصفح الحصص</Link> أو <Link href={routes.forTeachers.path}>ابدأ كمدرس</Link>.
      </p>
    </ContentPage>
  );
}
