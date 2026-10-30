'use client';
/// <reference path="../../types/google.d.ts" />

import { useEffect, useRef, useState } from 'react';
import { FiMapPin } from 'react-icons/fi';

interface LocationInputProps {
    id?: string;
    name?: string;
    label: string;
    placeholder: string;
    onPlaceSelected: (place: google.maps.places.PlaceResult) => void;
    onValueChange?: (val: string) => void;
    value?: string;
}

export default function LocationInput({
    id,
    name,
    label,
    placeholder,
    onPlaceSelected,
    onValueChange,
    value = ''
}: LocationInputProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const autoCompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
    const [internalValue, setInternalValue] = useState(value);

    useEffect(() => {
        setInternalValue(value);
    }, [value]);

    useEffect(() => {
        if (!inputRef.current) return;

        let isMounted = true;
        let timer: NodeJS.Timeout | null = null;

        const initAutocomplete = () => {
            if (!isMounted || !inputRef.current) return false;

            // Ensure Google Maps Places API is fully loaded
            if (typeof window !== 'undefined' && window.google?.maps?.places?.Autocomplete) {
                try {
                    autoCompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
                        types: ['establishment', 'geocode'],
                        componentRestrictions: { country: 'fr' },
                        fields: ['formatted_address', 'geometry', 'name', 'place_id'],
                    });

                    autoCompleteRef.current.addListener('place_changed', () => {
                        const autocomplete = autoCompleteRef.current;
                        if (!autocomplete) return;
                        const place = autocomplete.getPlace() as google.maps.places.PlaceResult & { name?: string };
                        if (place) {
                            const displayValue = place.name
                                ? `${place.name}, ${place.formatted_address}`
                                : place.formatted_address || '';

                            setInternalValue(displayValue);
                            onValueChange?.(displayValue);
                            onPlaceSelected(place);
                        }
                    });

                    return true;
                } catch (e) {
                    console.error('Error initializing Google Places Autocomplete:', e);
                    return false;
                }
            }
            return false;
        };

        const ready = initAutocomplete();
        if (!ready) {
            timer = setInterval(() => {
                if (initAutocomplete()) {
                    if (timer) clearInterval(timer);
                }
            }, 200);
        }

        return () => {
            isMounted = false;
            if (timer) clearInterval(timer);
            if (window.google?.maps?.event && inputRef.current) {
                window.google.maps.event.clearInstanceListeners(inputRef.current);
            }
        };
    }, [onPlaceSelected, onValueChange]);

    return (
        <div className="space-y-2">
            <label htmlFor={id} className="text-sm font-bold text-ink">{label}</label>
            <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-softer">
                    <FiMapPin />
                </div>
                <input
                    id={id}
                    name={name}
                    ref={inputRef}
                    type="text"
                    value={internalValue}
                    onChange={(e) => { setInternalValue(e.target.value); onValueChange?.(e.target.value); }}
                    placeholder={placeholder}
                    className="w-full pl-10 pr-4 py-3 rounded border border-base-border bg-base focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all text-sm text-ink"
                />
            </div>
        </div>
    );
}
