'use client';
/// <reference path="../types/google.d.ts" />

import { motion, AnimatePresence } from 'framer-motion';
import {
  FiCalendar,
  FiClock,
  FiBriefcase,
  FiUser,
  FiMail,
  FiPhone,
  FiMessageSquare,
  FiCheckCircle,
  FiArrowRight,
} from 'react-icons/fi';
import { useState, useCallback } from 'react';
import Image from 'next/image';
import Script from 'next/script';
import { useLanguage } from '@/app/context/LanguageContext';
import LocationInput from './booking/LocationInput';
import RouteMap from './booking/RouteMap';

// ─── Pricing helpers ─────────────────────────────────────────────────────────
function parseKm(distanceText: string): number {
  // distanceText may be "12.3 km" or "1,234 km" or "800 m"
  const lower = distanceText.toLowerCase();
  if (lower.includes('m') && !lower.includes('km')) {
    // metres
    const m = parseFloat(lower.replace(/[^0-9.]/g, ''));
    return m / 1000;
  }
  const km = parseFloat(lower.replace(/[^0-9.]/g, ''));
  return isNaN(km) ? 0 : km;
}

function calculateFare(km: number, luggage: number, roundTrip: boolean): number {
  const base = 25;
  const perKm = km * 2;
  const luggageFee = luggage > 0 ? 20 : 0;
  const subtotal = base + perKm + luggageFee;
  return roundTrip ? subtotal * 2 : subtotal;
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function ReservationSection() {
  const { t } = useLanguage();
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

  // Google Maps load state
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // Step 1 — Fare Estimator state
  const [originLatLng, setOriginLatLng] = useState<google.maps.LatLngLiteral | null>(null);
  const [destinationLatLng, setDestinationLatLng] = useState<google.maps.LatLngLiteral | null>(null);
  const [originText, setOriginText] = useState('');
  const [destinationText, setDestinationText] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [luggage, setLuggage] = useState(0); // 0 or 1
  const [tripType, setTripType] = useState<'single' | 'round-trip'>('single');
  const [routeInfo, setRouteInfo] = useState<{ distance: string; duration: string } | null>(null);
  const [estimatedFare, setEstimatedFare] = useState<number | null>(null);
  const [fareCalculated, setFareCalculated] = useState(false);

  // Step 2 — Booking form state
  const [step, setStep] = useState<1 | 2>(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [description, setDescription] = useState('');
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Route update callbacks (memoised to avoid re-render loops in RouteMap)
  const handleOriginSelected = useCallback(
    (place: google.maps.places.PlaceResult) => {
      if (place.geometry?.location) {
        const loc = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };
        setOriginLatLng(loc);
        // reset fare when route changes
        setFareCalculated(false);
        setEstimatedFare(null);
      }
    },
    []
  );

  const handleDestinationSelected = useCallback(
    (place: google.maps.places.PlaceResult) => {
      if (place.geometry?.location) {
        const loc = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };
        setDestinationLatLng(loc);
        setFareCalculated(false);
        setEstimatedFare(null);
      }
    },
    []
  );

  const handleRouteInfo = useCallback((info: { distance: string; duration: string }) => {
    setRouteInfo(info);
  }, []);

  // Step 1 → Fare Estimate
  const handleEstimate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!routeInfo) return;
    const km = parseKm(routeInfo.distance);
    const fare = calculateFare(km, luggage, tripType === 'round-trip');
    setEstimatedFare(Math.round(fare * 100) / 100);
    setFareCalculated(true);
  };

  // Transition to Step 2
  const handleGoToBooking = () => {
    setStep(2);
  };

  // Step 2 → Submit booking
  const handleBookNow = async (e: React.FormEvent) => {
    e.preventDefault();
    setBookingStatus('loading');

    const bookingDetails = [
      `Type of Service: ${tripType === 'round-trip' ? 'Round Trip' : 'Single Trip'}`,
      `Start Address: ${originText}`,
      `End Address: ${destinationText}`,
      `Date of Pick-up: ${date}`,
      `Time of Pick-up: ${time}`,
      `No. of Luggage: ${luggage}`,
      routeInfo ? `Distance: ${routeInfo.distance}` : '',
      routeInfo ? `Estimated Duration: ${routeInfo.duration}` : '',
      `Estimated Fare: €${estimatedFare}`,
      `Customer Email: ${email}`,
      `Mobile: ${mobile}`,
      description ? `Description: ${description}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, type: 'booking', bookingDetails }),
      });
      if (!res.ok) throw new Error('Failed');
      setBookingStatus('success');
    } catch {
      setBookingStatus('error');
    }
  };

  const canSubmitBooking = name.trim() && email.trim() && mobile.trim();
  const canEstimate = !!routeInfo; // need a valid route from Google Maps

  return (
    <section id="reservation" className="section bg-base py-0">
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`}
        onLoad={() => setIsMapLoaded(true)}
      />

      <div className="container max-w-6xl mx-auto shadow-2xl rounded-2xl overflow-hidden my-6 md:my-12 bg-card border border-card">
        <div className="flex flex-col lg:flex-row min-h-[600px]">

          {/* ── Left Panel: Image + Branding ─────────────────────────────── */}
          <div className="relative lg:w-5/12 text-white p-6 md:p-12 flex flex-col justify-end min-h-[250px] md:min-h-0">
            <div className="absolute inset-0 z-0">
              <Image src="/images/home/hero5.jpg" alt="Taxi Moto" fill className="object-cover" />
              <div className="absolute inset-0 bg-black/55" />
            </div>
            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-0.5 w-8 bg-brand" />
                <span className="text-brand font-bold tracking-wider text-sm uppercase">
                  {t('reservation.brand_title')}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold leading-tight">
                {t('reservation.main_title')}
              </h2>
              <p className="text-gray-200 text-xs md:text-sm pt-2 md:pt-4">
                {t('reservation.inquiries_text')}
              </p>

              {/* Fare summary for Step 2 */}
              {step === 2 && estimatedFare !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 bg-white/10 border border-white/20 rounded-xl p-4 backdrop-blur-sm"
                >
                  <p className="text-xs text-gray-300 uppercase tracking-wide mb-1">{t('reservation.fare_summary_label')}</p>
                  <p className="text-3xl font-black text-brand">€{estimatedFare}</p>
                  <p className="text-xs text-gray-300 mt-1">
                    {tripType === 'round-trip' ? t('reservation.round_trip_label') : t('reservation.single_trip')} ·{' '}
                    {routeInfo?.distance} · {luggage} {t('reservation.luggage_count')}
                  </p>
                </motion.div>
              )}
            </div>
          </div>

          {/* ── Right Panel ───────────────────────────────────────────────── */}
          <div className="lg:w-7/12 flex flex-col bg-card">
            <AnimatePresence mode="wait">

              {/* ─── STEP 1: Fare Estimator + Map ─────────────────────── */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col"
                >
                  {/* Header */}
                  <div className="px-6 md:px-10 pt-8 pb-4 text-center border-b border-base-border">
                    <h3 className="text-xl md:text-2xl font-bold text-brand mb-2">
                      {t('reservation.form_title')}
                    </h3>
                    <div className="inline-flex items-center gap-2 border border-card px-4 py-2 rounded-lg bg-base-light">
                      <span className="font-black text-base text-ink">JAY&apos;S</span>
                      <span className="font-black text-base text-ink">TAXI MOTO</span>
                    </div>
                    <p className="mt-3 text-xs text-ink-softer">{t('reservation.subtitle')}</p>
                  </div>

                  {/* Form + Map stacked, parent scrolls */}
                  <div className="flex flex-col">

                    {/* Form */}
                    <div className="px-6 md:px-10 py-5 space-y-4">
                      <form onSubmit={handleEstimate} className="space-y-4">

                        {/* Trip Type */}
                        <div className="flex justify-center gap-6">
                          {(['single', 'round-trip'] as const).map((type) => (
                            <label key={type} className="flex items-center gap-2 cursor-pointer group">
                              <div
                                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${tripType === type ? 'border-brand' : 'border-base-border'
                                  }`}
                              >
                                {tripType === type && <div className="w-2 h-2 rounded-full bg-brand" />}
                              </div>
                              <input
                                type="radio"
                                name="tripType"
                                className="hidden"
                                checked={tripType === type}
                                onChange={() => { setTripType(type); setFareCalculated(false); setEstimatedFare(null); }}
                              />
                              <span className="text-sm text-ink-softer group-hover:text-ink transition-colors capitalize">
                                {type === 'single' ? t('reservation.labels.one_way') : t('reservation.labels.round_trip')}
                              </span>
                            </label>
                          ))}
                        </div>

                        {/* Addresses */}
                        {isMapLoaded && (
                          <>
                            <LocationInput
                              label={t('reservation.labels.start_address')}
                              placeholder={t('reservation.placeholders.location')}
                              onPlaceSelected={handleOriginSelected}
                              onValueChange={setOriginText}
                            />
                            <LocationInput
                              label={t('reservation.labels.end_address')}
                              placeholder={t('reservation.placeholders.location')}
                              onPlaceSelected={handleDestinationSelected}
                              onValueChange={setDestinationText}
                            />
                          </>
                        )}
                        {!isMapLoaded && (
                          <div className="space-y-3">
                            <div className="h-12 rounded border border-base-border bg-base-light animate-pulse" />
                            <div className="h-12 rounded border border-base-border bg-base-light animate-pulse" />
                          </div>
                        )}

                        {/* Date & Time */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-sm font-bold text-ink">{t('reservation.labels.date_time').split(' ')[0] || t('reservation.date_pickup')}</label>
                            <div className="relative">
                              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-softer">
                                <FiCalendar size={14} />
                              </div>
                              <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                                className="w-full pl-9 pr-3 py-3 rounded border border-base-border bg-base focus:border-brand focus:ring-1 focus:ring-brand outline-none text-sm text-ink"
                              />
                            </div>
                          </div>
                          <div className="space-y-1">
                            <label className="text-sm font-bold text-ink">{t('reservation.time_label')}</label>
                            <div className="relative">
                              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-softer">
                                <FiClock size={14} />
                              </div>
                              <input
                                type="time"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                required
                                className="w-full pl-9 pr-3 py-3 rounded border border-base-border bg-base focus:border-brand focus:ring-1 focus:ring-brand outline-none text-sm text-ink"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Luggage — max 1 */}
                        <div className="space-y-1">
                          <label className="text-sm font-bold text-ink block">
                            {t('reservation.labels.luggage')}
                            <span className="ml-1 text-xs font-normal text-ink-softer">(max 1)</span>
                          </label>
                          <div className="flex items-center gap-3">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <div
                                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${luggage === 0 ? 'border-brand bg-brand/10' : 'border-base-border'
                                  }`}
                                onClick={() => { setLuggage(0); setFareCalculated(false); setEstimatedFare(null); }}
                              >
                                {luggage === 0 && <div className="w-2.5 h-2.5 rounded-sm bg-brand" />}
                              </div>
                              <FiBriefcase size={14} className="text-ink-softer" />
                              <span className="text-sm text-ink">0</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                              <div
                                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${luggage === 1 ? 'border-brand bg-brand/10' : 'border-base-border'
                                  }`}
                                onClick={() => { setLuggage(1); setFareCalculated(false); setEstimatedFare(null); }}
                              >
                                {luggage === 1 && <div className="w-2.5 h-2.5 rounded-sm bg-brand" />}
                              </div>
                              <FiBriefcase size={14} className="text-ink-softer" />
                              <span className="text-sm text-ink">1</span>
                            </label>
                          </div>
                        </div>

                        {/* Route distance info */}
                        {routeInfo && (
                          <div className="bg-brand/10 border border-brand/20 rounded-lg px-4 py-2 flex items-center justify-between text-sm">
                            <span className="text-ink font-medium">📍 {routeInfo.distance}</span>
                            <span className="text-ink-softer">🕐 {routeInfo.duration}</span>
                          </div>
                        )}

                        {/* Estimated Fare badge */}
                        <AnimatePresence>
                          {fareCalculated && estimatedFare !== null && (
                            <motion.div
                              key="fare"
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.9 }}
                              className="bg-brand/10 border border-brand/30 rounded-xl p-4 text-center"
                            >
                              <p className="text-xs text-ink-softer uppercase tracking-wide mb-1">{t('reservation.estimated_fare')}</p>
                              <p className="text-3xl font-black text-brand">€{estimatedFare}</p>
                              <p className="text-xs text-ink-softer mt-1">
                                Base €25 + {parseKm(routeInfo?.distance || '0 km').toFixed(1)} km × €2
                                {luggage > 0 ? t('reservation.fare_luggage') : ''}
                                {tripType === 'round-trip' ? t('reservation.fare_round_trip') : ''}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* CTA Button */}
                        {!fareCalculated ? (
                          <button
                            type="submit"
                            disabled={!canEstimate}
                            className="w-full bg-brand hover:bg-brand-dark disabled:opacity-40 disabled:cursor-not-allowed text-black font-bold py-4 rounded shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                          >
                            {t('reservation.submit')}
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={handleGoToBooking}
                            className="w-full bg-brand hover:bg-brand-dark text-black font-bold py-4 rounded shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                          >
                            {t('reservation.book_now')} <FiArrowRight size={16} />
                          </button>
                        )}
                      </form>
                    </div>

                    {/* Map — tall, scrollable into view */}
                    <div className="h-[450px] border-t border-base-border md:ml-8">
                      {isMapLoaded ? (
                        <RouteMap
                          origin={originLatLng}
                          destination={destinationLatLng}
                          onRouteInfo={handleRouteInfo}
                        />
                      ) : (
                        <div className="w-full h-full bg-base-light flex items-center justify-center text-ink-softer text-sm">
                          {apiKey ? t('reservation.map_loading') : t('reservation.map_no_key')}
                        </div>
                      )}
                    </div>

                  </div>
                </motion.div>
              )}

              {/* ─── STEP 2: Booking Details Form ─────────────────────── */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col h-full overflow-y-auto"
                >
                  <div className="px-6 md:px-10 pt-8 pb-4 border-b border-base-border">
                    <button
                      onClick={() => { setStep(1); setBookingStatus('idle'); }}
                      className="text-xs text-ink-softer hover:text-brand transition-colors mb-3 flex items-center gap-1"
                    >
                      {t('reservation.back_to_estimator')}
                    </button>
                    <h3 className="text-xl md:text-2xl font-bold text-brand">{t('reservation.step2_title')}</h3>
                    <p className="text-xs text-ink-softer mt-1">{t('reservation.step2_subtitle')}</p>
                  </div>

                  <form onSubmit={handleBookNow} className="px-6 md:px-10 py-6 space-y-4 flex-1">

                    {/* Pre-filled read-only fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <ReadonlyField label={t('reservation.service_type')} value={tripType === 'round-trip' ? t('reservation.round_trip_label') : t('reservation.single_trip')} />
                      <ReadonlyField label={t('reservation.date_pickup')} value={date} />
                      <ReadonlyField label={t('reservation.time_pickup')} value={time} />
                      <ReadonlyField label={t('reservation.luggage_count')} value={String(luggage)} />
                    </div>
                    <ReadonlyField label={t('reservation.labels.start_address')} value={originText} />
                    <ReadonlyField label={t('reservation.labels.end_address')} value={destinationText} />

                    <div className="border-t border-base-border pt-4 space-y-4">

                      {/* Name */}
                      <div className="space-y-1">
                        <label className="text-sm font-bold text-ink flex items-center gap-1">
                          <FiUser size={13} /> {t('reservation.your_name')} <span className="text-brand">*</span>
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder={t('reservation.your_name_placeholder')}
                          required
                          className="w-full px-4 py-3 rounded border border-base-border bg-base focus:border-brand focus:ring-1 focus:ring-brand outline-none text-sm text-ink"
                        />
                      </div>

                      {/* Email */}
                      <div className="space-y-1">
                        <label className="text-sm font-bold text-ink flex items-center gap-1">
                          <FiMail size={13} /> {t('reservation.email_address')} <span className="text-brand">*</span>
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder={t('reservation.email_placeholder')}
                          required
                          className="w-full px-4 py-3 rounded border border-base-border bg-base focus:border-brand focus:ring-1 focus:ring-brand outline-none text-sm text-ink"
                        />
                      </div>

                      {/* Mobile */}
                      <div className="space-y-1">
                        <label className="text-sm font-bold text-ink flex items-center gap-1">
                          <FiPhone size={13} /> {t('reservation.mobile_number')} <span className="text-brand">*</span>
                        </label>
                        <input
                          type="tel"
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value)}
                          placeholder={t('reservation.mobile_placeholder')}
                          required
                          className="w-full px-4 py-3 rounded border border-base-border bg-base focus:border-brand focus:ring-1 focus:ring-brand outline-none text-sm text-ink"
                        />
                      </div>

                      {/* Description */}
                      <div className="space-y-1">
                        <label className="text-sm font-bold text-ink flex items-center gap-1">
                          <FiMessageSquare size={13} /> {t('reservation.description')}
                        </label>
                        <textarea
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder={t('reservation.description_placeholder')}
                          rows={3}
                          className="w-full px-4 py-3 rounded border border-base-border bg-base focus:border-brand focus:ring-1 focus:ring-brand outline-none text-sm text-ink resize-none"
                        />
                      </div>
                    </div>

                    {/* Status messages */}
                    <AnimatePresence>
                      {bookingStatus === 'success' && (
                        <motion.div
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-lg px-4 py-3 text-sm text-green-600"
                        >
                          <FiCheckCircle size={16} />
                          {t('reservation.success_msg')}
                        </motion.div>
                      )}
                      {bookingStatus === 'error' && (
                        <motion.div
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-sm text-red-500"
                        >
                          {t('reservation.error_msg')}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={!canSubmitBooking || bookingStatus === 'loading' || bookingStatus === 'success'}
                      className="w-full bg-brand hover:bg-brand-dark disabled:opacity-40 disabled:cursor-not-allowed text-black font-bold py-4 rounded shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                    >
                      {bookingStatus === 'loading'
                        ? t('reservation.sending')
                        : bookingStatus === 'success'
                          ? t('reservation.booking_sent')
                          : <>{t('reservation.book_now')} <FiArrowRight size={16} /></>}
                    </button>
                  </form>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Readonly field helper ─────────────────────────────────────────────────────
function ReadonlyField({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-semibold text-ink-softer uppercase tracking-wide">{label}</label>
      <div className="w-full px-4 py-2.5 rounded border border-base-border bg-base-light text-sm text-ink font-medium truncate">
        {value || '—'}
      </div>
    </div>
  );
}
