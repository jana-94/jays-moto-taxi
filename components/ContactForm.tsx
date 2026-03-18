'use client';
import { useState, useMemo } from 'react';
import { z } from 'zod';
import { useLanguage } from '@/app/context/LanguageContext';

export default function ContactForm() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const ContactSchema = useMemo(() => z.object({
    name: z.string().min(2, t('contact_form.errors.name_required')),
    email: z.string().email(t('contact_form.errors.email_required')),
    message: z.string().min(10, t('contact_form.errors.message_min'))
  }), [t]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    setStatus('loading');
    
    // Capture the form before any await calls
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData);
    const parsed = ContactSchema.safeParse(payload);
    
    if (!parsed.success) {
      const err: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (err[i.path[0] as string] = i.message));
      setErrors(err);
      setStatus('idle');
      return;
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data)
      });
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to submit');
      }
      
      setStatus('success');
      form.reset();
    } catch (err: any) {
      console.error('Contact form error:', err);
      setStatus('error');
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm text-ink">{t('contact_form.labels.name')}</label>
        <input
          name="name"
          className="mt-1 w-full rounded-md border border-base-border bg-base p-3 text-ink outline-none focus:ring-2 focus:ring-brand"
          placeholder={t('contact_form.placeholders.name')}
        />
        {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
      </div>
      <div>
        <label className="block text-sm text-ink">{t('contact_form.labels.email')}</label>
        <input
          name="email"
          type="email"
          className="mt-1 w-full rounded-md border border-base-border bg-base p-3 text-ink outline-none focus:ring-2 focus:ring-brand"
          placeholder={t('contact_form.placeholders.email')}
        />
        {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
      </div>
      <div>
        <label className="block text-sm text-ink">{t('contact_form.labels.message')}</label>
        <textarea
          name="message"
          rows={5}
          className="mt-1 w-full rounded-md border border-base-border bg-base p-3 text-ink outline-none focus:ring-2 focus:ring-brand"
          placeholder={t('contact_form.placeholders.message')}
        />
        {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
      </div>
      <button
        type="submit"
        className="btn btn-primary"
        disabled={status === 'loading'}
      >
        {status === 'loading' ? t('contact_form.sending') : t('contact_form.submit')}
      </button>
      {status === 'success' && (
        <p className="text-sm text-green-500">{t('contact_form.success')}</p>
      )}
      {status === 'error' && (
        <p className="text-sm text-red-500">{t('contact_form.errors.submit_failed')}</p>
      )}
    </form>
  );
}
