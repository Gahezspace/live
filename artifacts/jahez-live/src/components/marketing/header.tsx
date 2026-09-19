import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { CalendarClock, Menu, X } from 'lucide-react';
import { Logo } from '@/components/marketing/signal-mark';
import { primaryNav } from '@/lib/routes';
import { LAUNCH_DATE, openWaitlist } from '@/lib/waitlist';

export function Header() {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path: string) => (path === '/' ? location === '/' : location.startsWith(path));

  return (
    <>
      {/* Registration opens with the launch; until then every way in leads to the waiting list. */}
      <button className="launch-bar" onClick={() => openWaitlist()} data-testid="button-launch-bar">
        <CalendarClock size={15} aria-hidden="true" />
        <span>
          جاهز Live بينطلق يوم <strong>{LAUNCH_DATE}</strong>. سيب بياناتك ونبلّغك أول ما التسجيل يفتح.
        </span>
      </button>
      <header className="topbar">
        <div className="container-wide topbar-inner">
          <Link href="/" className="brand-link" data-testid="link-brand-home">
            <Logo />
          </Link>
          <nav className="nav-links" aria-label="التنقل الرئيسي">
            {primaryNav.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
                data-testid={`link-nav-${item.path.replace(/\//g, '') || 'home'}`}
              >
                {item.navLabel}
              </Link>
            ))}
          </nav>
          <div className="topbar-actions">
            <button className="header-signup" onClick={() => openWaitlist()} data-testid="button-header-waitlist">
              <CalendarClock size={15} /> احجز مكانك
            </button>
            <button
              className="icon-button mobile-menu"
              aria-label={menuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              data-testid="button-mobile-menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="mobile-panel" role="dialog" aria-label="قائمة التنقل">
            {primaryNav.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setMenuOpen(false)}
                data-testid={`mobile-link-${item.path.replace(/\//g, '') || 'home'}`}
              >
                {item.navLabel}
              </Link>
            ))}
            <button
              onClick={() => {
                setMenuOpen(false);
                openWaitlist();
              }}
              data-testid="mobile-button-waitlist"
            >
              احجز مكانك قبل الإطلاق
            </button>
          </div>
        )}
      </header>
    </>
  );
}
