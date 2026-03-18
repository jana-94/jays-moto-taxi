'use client';
/// <reference path="../../types/google.d.ts" />

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/app/context/LanguageContext';

interface RouteMapProps {
    origin: google.maps.LatLngLiteral | null;
    destination: google.maps.LatLngLiteral | null;
    onRouteInfo: (info: { distance: string; duration: string }) => void;
}

export default function RouteMap({ origin, destination, onRouteInfo }: RouteMapProps) {
    const mapRef = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);
    const { t } = useLanguage();

    // Initialize Map
    useEffect(() => {
        if (!mapRef.current || !window.google || map) return;

        const initialMap = new window.google.maps.Map(mapRef.current, {
            center: { lat: 48.8566, lng: 2.3522 }, // Paris
            zoom: 12,
            styles: [
                {
                    featureType: 'all',
                    elementType: 'labels.text.fill',
                    stylers: [{ saturation: 36 }, { color: '#333333' }, { lightness: 40 }]
                },
                // Subtle dark-ish theme if possible, otherwise default
            ],
            disableDefaultUI: true,
            zoomControl: true,
        });

        const renderer = new window.google.maps.DirectionsRenderer({
            map: initialMap,
            suppressMarkers: false,
            polylineOptions: {
                strokeColor: '#F2A900', // Brand color
                strokeWeight: 5,
            },
        });

        setMap(initialMap);
        setDirectionsRenderer(renderer);

        // Try to get user location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    initialMap.setCenter(pos);
                },
                () => {
                    // Fallback to Paris handled in initialMap options
                }
            );
        }
    }, [map]);

    // Handle Routing
    useEffect(() => {
        if (!map || !directionsRenderer || !origin || !destination) return;

        const directionsService = new window.google.maps.DirectionsService();

        directionsService.route(
            {
                origin,
                destination,
                travelMode: window.google.maps.TravelMode.DRIVING,
            },
            (result: google.maps.DirectionsResult | null, status: google.maps.DirectionsStatus) => {
                if (status === window.google.maps.DirectionsStatus.OK && result) {
                    directionsRenderer.setDirections(result);

                    const route = result.routes[0].legs[0];
                    if (route && route.distance && route.duration) {
                        onRouteInfo({
                            distance: route.distance.text,
                            duration: route.duration.text,
                        });
                    }
                }
            }
        );
    }, [map, directionsRenderer, origin, destination, onRouteInfo]);

    return (
        <div className="relative w-full h-full min-h-[400px] rounded-xl overflow-hidden border border-card shadow-soft">
            {!window.google && (
                <div className="absolute inset-0 flex items-center justify-center bg-base-light text-ink-softer">
                    {t('booking.map_loading')}
                </div>
            )}
            <div ref={mapRef} className="w-full h-full" />
        </div>
    );
}
