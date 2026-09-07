import { Link } from 'wouter';
import { ContentPage } from '@/components/marketing/content-page';
import { useSeo } from '@/hooks/use-seo';
import { routes } from '@/lib/routes';
import { breadcrumbJsonLd } from '@/lib/structured-data';

export default function RefundPolicy() {
  useSeo({
    title: routes.refundPolicy.title,
    description: routes.refundPolicy.description,
    path: routes.refundPolicy.path,
    jsonLd: breadcrumbJsonLd([{ label: 'الرئيسية', path: '/' }, { label: 'سياسة الاسترجاع' }]),
  });

  return (
    <ContentPage
      title="سياسة الاسترجاع"
      subtitle="إمتى تقدر تسترجع قيمة حصة، وإزاي."
      crumbs={[{ label: 'الرئيسية', path: '/' }, { label: 'سياسة الاسترجاع' }]}
    >
      <div className="mp-prose">
        <h2>لو الحصة اتلغت</h2>
        <p>لو المدرس ألغى الحصة قبل ميعادها، بيتم استرجاع قيمتها بالكامل تلقائيًا.</p>

        <h2>لو مقدرتش تدخل الحصة لمشكلة تقنية من عندنا</h2>
        <p>لو حصلت مشكلة تقنية في المنصة نفسها منعتك من دخول الحصة اللي اتحجزت، تقدر تطلب الاسترجاع من صفحة "تواصل معنا" وهنراجع الحالة.</p>

        <h2>لو غيّرت رأيك قبل ميعاد الحصة</h2>
        <p>الحصص اللي لسه معلنة (Premiere) وميعادها ما جاش، ممكن تسترجع قيمتها خلال فترة محددة قبل الميعاد — التفاصيل بتظهر وقت الحجز.</p>

        <h2>بعد ما الحصة تبدأ أو تنتهي</h2>
        <p>الحصص المباشرة اللي بدأت أو خلصت، أو اللي اتفرجت على الـ Replay بتاعها، مش مؤهلة للاسترجاع — إلا في حالات استثنائية بنقيّمها case by case.</p>

        <h2>مدة معالجة الاسترجاع</h2>
        <p>بعد الموافقة على الاسترجاع، المبلغ بيرجعلك بنفس طريقة الدفع اللي استخدمتها، وممكن ياخد وقت حسب مزود الدفع (المتجر أو بوابة الدفع).</p>

        <h2>طلب استرجاع</h2>
        <p>لطلب استرجاع، تواصل معانا من <Link href={routes.contact.path}>صفحة "تواصل معنا"</Link> وحدد اسم الحصة وتاريخ الحجز.</p>
      </div>
    </ContentPage>
  );
}
