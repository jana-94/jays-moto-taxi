'use client';
/// <reference path="../../types/google.d.ts" />

import { useState } from 'react';
import { FiCalendar, FiClock, FiLayers } from 'react-icons/fi';
import { useLanguage } from '@/app/context/LanguageContext';
import LocationInput from './LocationInput';

interface BookingFormProps {
    onRouteUpdate: (origin: google.maps.LatLngLiteral | null, destination: google.maps.LatLngLiteral | null) => void;
    routeInfo: { distance: string; duration: string } | null;
}

export default function BookingForm({ onRouteUpdate, routeInfo }: BookingFormProps) {
    const { t } = useLanguage();
    const [origin, setOrigin] = useState<google.maps.LatLngLiteral | null>(null);
    const [destination, setDestination] = useState<google.maps.LatLngLiteral | null>(null);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [motoType, setMotoType] = useState('Standard');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleOriginSelected = (place: google.maps.places.PlaceResult) => {
        if (place.geometry?.location) {
            const loc = {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
            };
            setOrigin(loc);
            onRouteUpdate(loc, destination);
        }
    };

    const handleDestinationSelected = (place: google.maps.places.PlaceResult) => {
        if (place.geometry?.location) {
            const loc = {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
            };
            setDestination(loc);
            onRouteUpdate(origin, loc);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!origin || !destination) {
            setError(t('booking.validation.address_required'));
            return;
        }
        setError('');

        // Simulate booking submission
        console.log('Booking submitted:', {
            origin,
            destination,
            date,
            time,
            motoType,
            routeInfo
        });

        setSuccess(true);
        setTimeout(() => setSuccess(false), 5000);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
                <LocationInput
                    label={t('booking.labels.start')}
                    placeholder={t('booking.placeholders.start')}
                    onPlaceSelected={handleOriginSelected}
                />
                <LocationInput
                    label={t('booking.labels.end')}
                    placeholder={t('booking.placeholders.end')}
                    onPlaceSelected={handleDestinationSelected}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-ink">{t('booking.labels.date')}</label>
                    <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-softer">
                            <FiCalendar />
                        </div>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded border border-base-border bg-base focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all text-sm text-ink"
                            required
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-ink">{t('booking.labels.time')}</label>
                    <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-softer">
                            <FiClock />
                        </div>
                        <input
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded border border-base-border bg-base focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all text-sm text-ink"
                            required
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-bold text-ink">{t('booking.labels.moto_type')}</label>
                <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-softer">
                        <FiLayers />
                    </div>
                    <select
                        value={motoType}
                        onChange={(e) => setMotoType(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded border border-base-border bg-base focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all text-sm text-ink appearance-none"
                    >
                        {Array.isArray(t('booking.moto_types')) && (t('booking.moto_types') as string[]).map((type: string) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {routeInfo && (
                <div className="bg-brand/10 border border-brand/20 p-4 rounded-lg">
                    <p className="text-sm font-medium text-ink text-center">
                        {t('booking.route_info', { distance: routeInfo.distance, duration: routeInfo.duration })}
                    </p>
                </div>
            )}

            {error && <p className="text-sm text-red-500 font-medium">{error}</p>}
            {success && (
                <p className="text-sm text-green-500 font-medium bg-green-500/10 p-3 rounded border border-green-500/20 text-center">
                    Booking request sent successfully! We will contact you shortly.
                </p>
            )}

            <button
                type="submit"
                className="w-full bg-brand hover:bg-brand-dark text-black font-bold py-4 rounded shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
            >
                {t('booking.book_now')}
            </button>
        </form>
    );
}
