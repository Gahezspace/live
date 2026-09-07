import { Link } from 'wouter';
import { Apple, Globe, Smartphone } from 'lucide-react';
import { ContentPage } from '@/components/marketing/content-page';
import { FaqAccordion } from '@/components/marketing/faq-accordion';
import { useSeo } from '@/hooks/use-seo';
import { routes } from '@/lib/routes';
import { breadcrumbJsonLd } from '@/lib/structured-data';

const paymentFaq = [
  {
    id: 'payments',
    label: '',
    items: [
      { q: 'دفعت ومش لاقي الحصة، أعمل إيه؟', a: 'تأكد الأول إنك داخل بنفس الحساب اللي دفعت بيه. لو المشكلة مستمرة، تواصل معانا من صفحة "تواصل معنا" وهنراجع عملية الدفع.' },
      { q: 'هل أقدر أسترجع قيمة الحصة؟', a: 'أيوه، في حالات معينة موضحة بالتفصيل في سياسة الاسترجاع.' },
      { q: 'هل الدفع من الموبايل مختلف عن الويب؟', a: 'أيوه — على الموبايل الدفع بيتم من خلال نظام المتجر (Google Play أو App Store)، وعلى الويب هتشوف طرق الدفع المتاحة وقت الحجز.' },
      { q: 'إيه اللي بيحصل بعد الدفع؟', a: 'بمجرد ما الدفع يتأكد، هيظهرلك تأكيد فوري والحصة هتتضاف لقائمة "حصصي" في حسابك.' },
    ],
  },
];

export default function Payments() {
  useSeo({
    title: routes.payments.title,
    description: routes.payments.description,
    path: routes.payments.path,
    jsonLd: breadcrumbJsonLd([{ label: 'الرئيسية', path: '/' }, { label: 'الدفع' }]),
  });

  return (
    <ContentPage
      eyebrow="الدفع والحجز"
      title="الدفع بسيط وآمن."
      subtitle="طريقة الدفع بتختلف شوية حسب الجهاز اللي بتستخدمه — إليك التفاصيل."
      crumbs={[{ label: 'الرئيسية', path: '/' }, { label: 'الدفع' }]}
    >
      <div className="mp-payment-methods">
        <div className="mp-payment-card">
          <Smartphone size={22} />
          <h2>Android</h2>
          <p>على Android، شراء الحصص الرقمية داخل التطبيق يتم من خلال نظام الدفع الخاص بـ Google Play، وفقاً للمتاح والقواعد المطبقة على التطبيق.</p>
        </div>
        <div className="mp-payment-card">
          <Apple size={22} />
          <h2>iPhone</h2>
          <p>على iPhone، شراء الحصص الرقمية داخل التطبيق يتم من خلال نظام Apple In-App Purchase / StoreKit، وفقاً للقواعد المطبقة على التطبيق.</p>
        </div>
        <div className="mp-payment-card">
          <Globe size={22} />
          <h2>الويب</h2>
          <p>من الويب، طرق الدفع المتاحة هتظهر لك أثناء إتمام الحجز حسب بوابة الدفع المفعّلة.</p>
        </div>
      </div>

      <div className="mp-prose">
        <h2>إيه اللي بيحصل بعد الدفع؟</h2>
        <p>بمجرد ما الدفع يتأكد، الوصول للحصة بيتفتح فورًا وهتلاقيها في قائمة حصصك. لو الحصة لسه معلنة (Premiere)، هتفضل محجوزة ليك لحد ميعادها ويوصلك تنبيه قبل ما تبدأ.</p>
        <h2>لو الدفع فشل</h2>
        <p>لو حصلت مشكلة أثناء الدفع، مبيتخصمش منك حاجة من غير ما تتأكد الحصة. لو اتخصم مبلغ ومحجزتش الحصة، تواصل معانا وهنراجعها.</p>
      </div>

      <FaqAccordion categories={paymentFaq} />

      <p className="mp-inline-link">
        عايز تعرف أكتر عن الاسترجاع؟ <Link href={routes.refundPolicy.path}>سياسة الاسترجاع</Link>
      </p>
    </ContentPage>
  );
}
