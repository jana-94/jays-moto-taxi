'use client';
/// <reference path="../../types/google.d.ts" />

import { useState } from 'react';
import Script from 'next/script';
import { motion } from 'framer-motion';
import { useLanguage } from '@/app/context/LanguageContext';
import BookingForm from './BookingForm';
import RouteMap from './RouteMap';

export default function BookingSection() {
    const { t } = useLanguage();
    const [origin, setOrigin] = useState<google.maps.LatLngLiteral | null>(null);
    const [destination, setDestination] = useState<google.maps.LatLngLiteral | null>(null);
    const [routeInfo, setRouteInfo] = useState<{ distance: string; duration: string } | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

    const handleRouteUpdate = (o: google.maps.LatLngLiteral | null, d: google.maps.LatLngLiteral | null) => {
        setOrigin(o);
        setDestination(d);
    };

    return (
        <section id="book-your-motorcycle" className="section bg-card py-20 overflow-hidden">
            <Script
                src={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`}
                onLoad={() => setIsLoaded(true)}
            />

            <div className="container py-10 md:py-20">
                <div className="text-center mb-10 md:mb-16">
                    <motion.h2
                        className="heading-section text-ink"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        {t('booking.section_title')}
                    </motion.h2>
                    <motion.p
                        className="mt-4 subheading"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        {t('booking.section_subtitle')}
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10 items-start">
                    {/* Form Column */}
                    <motion.div
                        className="lg:col-span-5 bg-base p-6 md:p-8 rounded-2xl border border-base-border shadow-soft"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <BookingForm onRouteUpdate={handleRouteUpdate} routeInfo={routeInfo} />
                    </motion.div>

                    {/* Map Column */}
                    <motion.div
                        className="lg:col-span-7 h-[350px] md:h-[600px]"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        {isLoaded ? (
                            <RouteMap
                                origin={origin}
                                destination={destination}
                                onRouteInfo={setRouteInfo}
                            />
                        ) : (
                            <div className="w-full h-full bg-base-light rounded-2xl flex items-center justify-center text-ink-softer border border-base-border">
                                {apiKey ? t('booking.map_loading') : 'Google Maps API Key not configured.'}
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
