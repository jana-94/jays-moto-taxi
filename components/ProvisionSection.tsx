'use client';

import { FaWhatsapp } from 'react-icons/fa';
import { useLanguage } from '@/app/context/LanguageContext';

export default function ProvisionSection() {
    const { t } = useLanguage();

    const provisions = [
        { label: t('provision.items.one_hour'), price: ' €90' },
        { label: t('provision.items.half_day'), price: ' €300' },
        { label: t('provision.items.one_day'), price: ' €550' },
        { label: t('provision.items.personalized'), price: t('provision.items.price_request'), isMultiLine: true },
    ];

    return (
        <section className="section bg-base container">
            <div className="mx-auto max-w-md text-center">
                <h2 className="mb-12 text-4xl font-bold text-ink">{t('provision.title')}</h2>

                <div className="overflow-x-auto rounded-xl border border-card shadow-lg bg-card text-center">
                    <table className="w-full border-collapse min-w-[300px]">
                        <thead>
                            <tr className="bg-brand text-black">
                                <th className="py-3 md:py-4 px-4 md:px-6 text-base md:text-lg font-bold border-r border-black/10 w-1/2">{t('provision.headers.provision')}</th>
                                <th className="py-3 md:py-4 px-4 md:px-6 text-base md:text-lg font-bold w-1/2">{t('provision.headers.price')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {provisions.map((item, index) => (
                                <tr
                                    key={index}
                                    className="border-b border-base-border last:border-0"
                                >
                                    <td className="py-4 md:py-6 px-4 md:px-6 text-sm md:text-base text-ink font-medium border-r border-base-border">{item.label}</td>
                                    <td className={`py-4 md:py-6 px-4 md:px-6 text-sm md:text-base text-ink ${item.isMultiLine ? 'leading-tight' : ''}`}>
                                        {item.price}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <a
                    href="https://wa.me/33684406126"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-block w-full rounded bg-brand px-8 py-4 text-center text-lg font-bold text-black shadow-lg transition-transform hover:-translate-y-1 hover:shadow-xl"
                >
                    {t('provision.whatsapp_button')}
                </a>
            </div>
        </section>
    );
}
