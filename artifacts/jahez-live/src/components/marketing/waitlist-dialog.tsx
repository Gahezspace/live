import { type FormEvent, useEffect, useState } from 'react';
import { CalendarClock, CheckCircle2, X } from 'lucide-react';
import { GahezMark } from '@/components/marketing/signal-mark';
import { joinWaitlist, LAUNCH_DATE, onOpenWaitlist, type WaitlistRole } from '@/lib/waitlist';

const ROLES: { value: WaitlistRole; label: string }[] = [
  { value: 'student', label: 'طالب' },
  { value: 'teacher', label: 'مدرس' },
  { value: 'parent', label: 'ولي أمر' },
];

const ERRORS = {
  invalid: 'اكتب اسمك وإيميل صحيح.',
  busy: 'وصلنا طلبات كتير من نفس الجهاز. جرّب تاني بعد شوية.',
  failed: 'مقدرناش نبعت بياناتك دلوقتي. جرّب تاني بعد شوية.',
} as const;

/**
 * Registration opens with the launch; until then everyone who wants in
 * leaves their details here, and the team hears about each one by email.
 * Mounted once in App and opened from anywhere with `openWaitlist`.
 */
export function WaitlistDialog() {
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState<WaitlistRole>('student');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gotcha, setGotcha] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'done' | keyof typeof ERRORS>('idle');

  useEffect(
    () =>
      onOpenWaitlist((asRole) => {
        if (asRole) setRole(asRole);
        setState((s) => (s === 'done' ? s : 'idle'));
        setOpen(true);
      }),
    [],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  if (!open) return null;

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState('sending');
    const result = await joinWaitlist({ name, email, phone, role, _gotcha: gotcha });
    setState(result === 'ok' ? 'done' : result);
  };

  return (
    <div
      className="auth-overlay"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) setOpen(false);
      }}
    >
      <section className="auth-dialog" role="dialog" aria-modal="true" aria-labelledby="waitlist-title" dir="rtl">
        <button className="auth-close" onClick={() => setOpen(false)} aria-label="إغلاق" data-testid="button-close-waitlist">
          <X size={18} />
        </button>
        <div className="auth-dialog-mark">
          <GahezMark />
        </div>

        {state === 'done' ? (
          <div className="waitlist-done" aria-live="polite">
            <CheckCircle2 size={40} />
            <h2 id="waitlist-title">مكانك محجوز</h2>
            <p className="auth-subtitle">
              هنبعتلك على <strong dir="ltr">{email}</strong> أول ما التسجيل يفتح يوم {LAUNCH_DATE}.
            </p>
            <button className="button-primary auth-submit" onClick={() => setOpen(false)}>
              تمام
            </button>
          </div>
        ) : (
          <>
            <p className="section-kicker">
              <CalendarClock size={14} /> الإطلاق {LAUNCH_DATE}
            </p>
            <h2 id="waitlist-title">التسجيل بيفتح يوم الإطلاق</h2>
            <p className="auth-subtitle">
              جاهز Live لسه بيتجهّز. سيب بياناتك، وأول ما التسجيل يفتح هنبعتلك على إيميلك قبل أي حد.
            </p>
            <form onSubmit={submit} className="auth-form">
              <fieldset className="waitlist-roles">
                <legend>أنا</legend>
                {ROLES.map((option) => (
                  <label key={option.value} className={role === option.value ? 'selected' : ''}>
                    <input
                      type="radio"
                      name="role"
                      value={option.value}
                      checked={role === option.value}
                      onChange={() => setRole(option.value)}
                    />
                    {option.label}
                  </label>
                ))}
              </fieldset>
              <label>
                الاسم
                <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="مثال: سارة أحمد" autoFocus data-testid="input-waitlist-name" />
              </label>
              <label>
                الإيميل
                <input required type="email" dir="ltr" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" data-testid="input-waitlist-email" />
              </label>
              <label>
                رقم الموبايل (اختياري)
                <input type="tel" dir="ltr" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="01xxxxxxxxx" data-testid="input-waitlist-phone" />
              </label>
              {/* Hidden from people; a bot that fills every field fills this one too. */}
              <input
                className="waitlist-trap"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value={gotcha}
                onChange={(e) => setGotcha(e.target.value)}
                name="company"
              />
              {state in ERRORS ? <p className="waitlist-error">{ERRORS[state as keyof typeof ERRORS]}</p> : null}
              <button className="button-primary auth-submit" type="submit" disabled={state === 'sending'} data-testid="button-submit-waitlist">
                {state === 'sending' ? 'جارٍ الإرسال…' : 'احجز مكاني'}
              </button>
            </form>
          </>
        )}
      </section>
    </div>
  );
}
