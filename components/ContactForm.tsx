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
      
      // User-Provided Data Tracking for Google Tag Manager, GA4 & Google Ads
      if (typeof window !== 'undefined') {
        const submittedName = (parsed.data.name || '').trim();
        const submittedEmail = (parsed.data.email || '').trim();
        const submittedMessage = (parsed.data.message || '').trim();

        const nameParts = submittedName.split(/\s+/);
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';

        window.dataLayer = window.dataLayer || [];

        // 1. Primary DataLayer event with user_data & user_provided_data
        window.dataLayer.push({
          event: 'contact_form_submission',
          form_id: 'contact-form',
          form_name: 'Moto Taxi Contact Form',
          user_data: {
            email: submittedEmail,
            address: {
              first_name: firstName,
              last_name: lastName,
            },
          },
          user_provided_data: {
            email: submittedEmail,
            name: submittedName,
            first_name: firstName,
            last_name: lastName,
            message: submittedMessage,
          },
          customer_name: submittedName,
          customer_email: submittedEmail,
          customer_message: submittedMessage,
        });

        // 2. Standard GA4 generate_lead event
        window.dataLayer.push({
          event: 'generate_lead',
          lead_type: 'contact',
          currency: 'EUR',
          value: 0,
          user_data: {
            email: submittedEmail,
            address: {
              first_name: firstName,
              last_name: lastName,
            },
          },
        });

        // 3. Google Ads Conversion Event
        window.dataLayer.push({
          event: 'conversion',
          send_to: 'AW-18123000597/ea5oCKHepKwcEJWW3MFD',
          user_data: {
            email: submittedEmail,
            address: {
              first_name: firstName,
              last_name: lastName,
            },
          },
        });

        // 4. Safe gtag invocation if available
        if (typeof window.gtag === 'function') {
          window.gtag('set', 'user_data', {
            email: submittedEmail,
            address: {
              first_name: firstName,
              last_name: lastName,
            },
          });
          window.gtag('event', 'conversion', {
            send_to: 'AW-18123000597/ea5oCKHepKwcEJWW3MFD',
            user_data: {
              email: submittedEmail,
              address: {
                first_name: firstName,
                last_name: lastName,
              },
            },
          });
        }
      }

      setStatus('success');
      form.reset();
    } catch (err: any) {
      console.error('Contact form error:', err);
      setStatus('error');
    }
  }

  return (
    <form id="contact-form" name="contact-form" onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="contact-name" className="block text-sm text-ink">{t('contact_form.labels.name')}</label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          className="mt-1 w-full rounded-md border border-base-border bg-base p-3 text-ink outline-none focus:ring-2 focus:ring-brand"
          placeholder={t('contact_form.placeholders.name')}
        />
        {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="contact-email" className="block text-sm text-ink">{t('contact_form.labels.email')}</label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="mt-1 w-full rounded-md border border-base-border bg-base p-3 text-ink outline-none focus:ring-2 focus:ring-brand"
          placeholder={t('contact_form.placeholders.email')}
        />
        {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="contact-message" className="block text-sm text-ink">{t('contact_form.labels.message')}</label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          className="mt-1 w-full rounded-md border border-base-border bg-base p-3 text-ink outline-none focus:ring-2 focus:ring-brand"
          placeholder={t('contact_form.placeholders.message')}
        />
        {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
      </div>
      <button
        id="contact-submit-btn"
        type="submit"
        className="btn btn-primary"
        disabled={status === 'loading'}
      >
        {status === 'loading' ? t('contact_form.sending') : t('contact_form.submit')}
      </button>
      {status === 'success' && (
        <p id="contact-success-msg" className="text-sm text-green-500">{t('contact_form.success')}</p>
      )}
      {status === 'error' && (
        <p id="contact-error-msg" className="text-sm text-red-500">{t('contact_form.errors.submit_failed')}</p>
      )}
    </form>
  );
}
