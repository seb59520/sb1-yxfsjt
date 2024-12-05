import { Loader } from '@googlemaps/js-api-loader';

let googleMapsLoader: Loader | null = null;
let googleMaps: typeof google.maps | null = null;

export async function initGoogleMaps() {
  if (!googleMapsLoader) {
    googleMapsLoader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
      version: 'weekly',
      libraries: ['places', 'geometry'],
    });
  }

  if (!googleMaps) {
    googleMaps = await googleMapsLoader.load();
  }

  return googleMaps;
}

export async function calculateDistance(origin: string, destination: string): Promise<number> {
  const maps = await initGoogleMaps();
  
  return new Promise((resolve, reject) => {
    const service = new maps.DistanceMatrixService();
    
    service.getDistanceMatrix(
      {
        origins: [origin],
        destinations: [destination],
        travelMode: maps.TravelMode.DRIVING,
        unitSystem: maps.UnitSystem.METRIC,
      },
      (response, status) => {
        if (status === 'OK' && response) {
          const distance = response.rows[0].elements[0].distance.value / 1000; // Convert to kilometers
          resolve(distance);
        } else {
          reject(new Error('Failed to calculate distance'));
        }
      }
    );
  });
}