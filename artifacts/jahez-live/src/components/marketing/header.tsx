import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { LogIn, Menu, UserPlus, X } from 'lucide-react';
import { Logo } from '@/components/marketing/signal-mark';
import { AuthDialog, type AuthMode } from '@/components/marketing/auth-dialog';
import { primaryNav } from '@/lib/routes';

export function Header() {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode | null>(null);

  const isActive = (path: string) => (path === '/' ? location === '/' : location.startsWith(path));

  return (
    <>
      <header className="topbar">
        <div className="container-wide topbar-inner">
          <Link href="/" className="brand-link" data-testid="link-brand-home"><Logo /></Link>
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
            <button className="header-login" onClick={() => setAuthMode('login')} data-testid="button-header-login">
              <LogIn size={15} /> تسجيل الدخول
            </button>
            <button className="header-signup" onClick={() => setAuthMode('signup')} data-testid="button-header-signup">
              <UserPlus size={15} /> ابدأ دلوقتي
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
              <Link key={item.path} href={item.path} onClick={() => setMenuOpen(false)} data-testid={`mobile-link-${item.path.replace(/\//g, '') || 'home'}`}>
                {item.navLabel}
              </Link>
            ))}
            <button onClick={() => { setMenuOpen(false); setAuthMode('login'); }} data-testid="mobile-button-login">تسجيل الدخول</button>
            <button onClick={() => { setMenuOpen(false); setAuthMode('signup'); }} data-testid="mobile-button-signup">ابدأ دلوقتي</button>
          </div>
        )}
      </header>
      {authMode && (
        <AuthDialog mode={authMode} onClose={() => setAuthMode(null)} onSwitch={setAuthMode} />
      )}
    </>
  );
}
