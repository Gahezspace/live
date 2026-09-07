import { Link } from 'wouter';
import { Instagram, Music2, Twitter, Youtube } from 'lucide-react';
import { Logo } from '@/components/marketing/signal-mark';
import { footerGroup } from '@/lib/routes';
import { isConfigured, siteConfig } from '@/lib/site-config';

const socialLinks = [
  { key: 'instagram', href: siteConfig.social.instagram, icon: Instagram, label: 'انستجرام' },
  { key: 'tiktok', href: siteConfig.social.tiktok, icon: Music2, label: 'تيك توك' },
  { key: 'x', href: siteConfig.social.x, icon: Twitter, label: 'إكس' },
  { key: 'youtube', href: siteConfig.social.youtube, icon: Youtube, label: 'يوتيوب' },
].filter((s) => isConfigured(s.href));

function FooterColumn({ heading, group }: { heading: string; group: 'platform' | 'help' | 'legal' }) {
  const links = footerGroup(group);
  if (!links.length) return null;
  return (
    <div className="footer-col">
      <h3 className="footer-col-title">{heading}</h3>
      <ul className="footer-col-list">
        {links.map((r) => (
          <li key={r.path}><Link href={r.path}>{r.footerLabel}</Link></li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container-wide site-footer-top">
        <div className="footer-brand-col">
          <Logo />
          <p className="footer-tagline">جزء من منظومة جاهز التعليمية — مدرسين حقيقيين بيشرحوا لايف.</p>
          {socialLinks.length > 0 && (
            <div className="footer-social">
              {socialLinks.map(({ key, href, icon: Icon, label }) => (
                <a key={key} href={href} target="_blank" rel="noreferrer noopener" aria-label={label} className="icon-button">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          )}
        </div>
        <FooterColumn heading="المنصة" group="platform" />
        <FooterColumn heading="المساعدة" group="help" />
        <FooterColumn heading="قانوني" group="legal" />
      </div>
      <div className="container-wide site-footer-bottom">
        <span className="footer-copy">© {year} جاهز Live</span>
      </div>
    </footer>
  );
}
