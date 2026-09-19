/**
 * The waiting list, until registration opens with the launch.
 *
 * Every call to action on the site (the header, "start as a teacher", "book
 * a seat") opens one dialog through `openWaitlist`, so the launch date and
 * the form live in a single place. The day registration opens, this module
 * and the dialog are what change.
 */

export type WaitlistRole = 'student' | 'teacher' | 'parent';

/** Same date gahez.space announces for the whole Gahez family. */
export const LAUNCH_DATE = '1 يناير 2027';

type Listener = (role?: WaitlistRole) => void;
const listeners = new Set<Listener>();

export function openWaitlist(role?: WaitlistRole) {
  listeners.forEach((listener) => listener(role));
}

export function onOpenWaitlist(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export interface WaitlistEntry {
  name: string;
  email: string;
  phone: string;
  role: WaitlistRole;
  /** Honeypot: people never see it, bots fill it. */
  _gotcha?: string;
}

export type WaitlistResult = 'ok' | 'invalid' | 'busy' | 'failed';

export async function joinWaitlist(entry: WaitlistEntry): Promise<WaitlistResult> {
  try {
    const response = await fetch('/api/waitlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry),
    });
    if (response.ok) return 'ok';
    if (response.status === 422) return 'invalid';
    if (response.status === 429) return 'busy';
    return 'failed';
  } catch {
    return 'failed';
  }
}
