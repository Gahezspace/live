import { type FormEvent, useEffect, useState } from 'react';
import { LogIn, UserPlus, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { SignalMark } from '@/components/marketing/signal-mark';

export type AuthMode = 'signup' | 'login';

export function AuthDialog({
  mode,
  onClose,
  onSwitch,
}: {
  mode: AuthMode;
  onClose: () => void;
  onSwitch: (mode: AuthMode) => void;
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast({
      title: mode === 'signup' ? 'تم استلام طلبك' : 'أهلاً بعودتك',
      description:
        mode === 'signup'
          ? 'سنجهّز لك أول حصة مباشرة قريباً.'
          : 'هذه نسخة تجريبية بدون حفظ بيانات.',
    });
    onClose();
  };

  return (
    <div
      className="auth-overlay"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section className="auth-dialog" role="dialog" aria-modal="true" aria-labelledby="auth-title" dir="rtl">
        <button className="auth-close" onClick={onClose} aria-label="إغلاق" data-testid="button-close-auth">
          <X size={18} />
        </button>
        <div className="auth-dialog-mark"><SignalMark compact /></div>
        <p className="section-kicker">{mode === 'signup' ? 'خطوتك الأولى' : 'مرحباً بعودتك'}</p>
        <h2 id="auth-title">{mode === 'signup' ? 'ابدأ مذاكرتك من مكانك' : 'سجّل دخولك إلى جاهز Live'}</h2>
        <p className="auth-subtitle">
          {mode === 'signup'
            ? 'أنشئ حساباً مجانياً وتعرّف على المدرسين الذين يشرحون بالطريقة التي تناسبك.'
            : 'تابع معلميك وحصصك المحفوظة من أي مكان.'}
        </p>
        <form onSubmit={submit} className="auth-form">
          {mode === 'signup' && (
            <label>
              الاسم الكامل
              <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="مثال: سارة أحمد" autoFocus data-testid="input-auth-name" />
            </label>
          )}
          <label>
            البريد الإلكتروني
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoFocus={mode === 'login'} data-testid="input-auth-email" />
          </label>
          <button className="button-primary auth-submit" type="submit" data-testid="button-submit-auth">
            {mode === 'signup' ? <><UserPlus size={17} /> إنشاء حساب مجاني</> : <><LogIn size={17} /> تسجيل الدخول</>}
          </button>
        </form>
        <p className="auth-switch">
          {mode === 'signup' ? 'لديك حساب بالفعل؟' : 'أول مرة هنا؟'}{' '}
          <button onClick={() => onSwitch(mode === 'signup' ? 'login' : 'signup')} data-testid="button-switch-auth">
            {mode === 'signup' ? 'تسجيل الدخول' : 'أنشئ حساباً مجانياً'}
          </button>
        </p>
        <small className="auth-note">نسخة تجريبية: لا يتم حفظ بياناتك أو إرسالها الآن.</small>
      </section>
    </div>
  );
}
