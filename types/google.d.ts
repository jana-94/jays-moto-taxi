declare namespace google.maps {
    namespace places {
        interface PlaceResult {
            geometry?: {
                location?: {
                    lat: () => number;
                    lng: () => number;
                };
            };
            formatted_address?: string;
        }
        class Autocomplete {
            constructor(inputField: HTMLInputElement, opts?: any);
            addListener(eventName: string, handler: () => void): void;
            getPlace(): PlaceResult;
        }
    }
    class Map {
        constructor(el: HTMLElement, opts?: any);
        setCenter(latlng: LatLngLiteral): void;
    }
    interface LatLngLiteral {
        lat: number;
        lng: number;
    }
    class DirectionsRenderer {
        constructor(opts?: any);
        setDirections(directions: DirectionsResult): void;
    }
    class DirectionsService {
        route(request: DirectionsRequest, callback: (result: DirectionsResult, status: DirectionsStatus) => void): void;
    }
    interface DirectionsRequest {
        origin: LatLngLiteral | string;
        destination: LatLngLiteral | string;
        travelMode: TravelMode;
    }
    enum TravelMode {
        DRIVING = 'DRIVING'
    }
    enum DirectionsStatus {
        OK = 'OK'
    }
    interface DirectionsResult {
        routes: Array<{
            legs: Array<{
                distance: { text: string };
                duration: { text: string };
            }>;
        }>;
    }
    namespace event {
        function clearInstanceListeners(instance: any): void;
    }
}

interface Window {
    google: any;
}
