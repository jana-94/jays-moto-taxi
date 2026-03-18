'use client';
/// <reference path="../../types/google.d.ts" />

import { useEffect, useRef, useState } from 'react';
import { FiMapPin } from 'react-icons/fi';

interface LocationInputProps {
    label: string;
    placeholder: string;
    onPlaceSelected: (place: google.maps.places.PlaceResult) => void;
    onValueChange?: (val: string) => void;
    value?: string;
}

export default function LocationInput({
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
        if (!inputRef.current || !window.google) return;

        autoCompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
            types: ['address'],
            componentRestrictions: { country: 'fr' } // Restricting to France as per requirements (Paris & IDF)
        });

        if (!autoCompleteRef.current) return;
        autoCompleteRef.current.addListener('place_changed', () => {
            const autocomplete = autoCompleteRef.current;
            if (!autocomplete) return;
            const place = autocomplete.getPlace();
            if (place) {
                const addr = place.formatted_address || '';
                setInternalValue(addr);
                onValueChange?.(addr);
                onPlaceSelected(place);
            }
        });

        return () => {
            if (window.google?.maps?.event && inputRef.current) {
                window.google.maps.event.clearInstanceListeners(inputRef.current);
            }
        };
    }, [onPlaceSelected]);

    return (
        <div className="space-y-2">
            <label className="text-sm font-bold text-ink">{label}</label>
            <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-softer">
                    <FiMapPin />
                </div>
                <input
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
