import type { ReactNode } from 'react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { Breadcrumbs, type Crumb } from '@/components/marketing/breadcrumbs';

/**
 * Shared shell for content-forward pages (legal, FAQ, contact, about,
 * payments…) — the "more functional" half of the brand per
 * DESIGN_SYSTEM.md. Leans on Tailwind utilities + shadcn/ui components
 * rather than bespoke CSS; still on-brand since both read the same color
 * and font tokens.
 */
export function ContentPage({
  eyebrow,
  title,
  subtitle,
  crumbs,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  crumbs: Crumb[];
  children: ReactNode;
}) {
  return (
    <div className="app-shell" dir="rtl">
      <Header />
      <main>
        <section className="mp-page-hero">
          <div className="container-wide">
            <Breadcrumbs items={crumbs} />
            {eyebrow && <p className="section-kicker">{eyebrow}</p>}
            <h1 className="mp-page-title fade-up">{title}</h1>
            {subtitle && <p className="mp-page-subtitle fade-up delay-1">{subtitle}</p>}
          </div>
        </section>
        <section className="mp-page-body">
          <div className="container-wide mp-page-body-inner">{children}</div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
