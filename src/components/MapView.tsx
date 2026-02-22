import React, { useEffect, useRef } from 'react';
import './MapView.css';

interface Listing {
  id: number;
  title: string;
  latitude: number;
  longitude: number;
  price: number;
}

interface MapViewProps {
  listings: Listing[];
  onMarkerClick?: (listing: Listing) => void;
}

const MapView: React.FC<MapViewProps> = ({ listings, onMarkerClick }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const markers = useRef<any[]>([]);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialiser la carte avec Leaflet (alternative gratuite à Google Maps)
    // Pour Google Maps, remplacer par votre clé API
    
    const initMap = () => {
      // Créer une carte simple avec les coordonnées de Paris
      const mapElement = mapRef.current;
      if (!mapElement) return;

      // Utiliser une div simple pour la démo
      mapElement.innerHTML = `
        <div style="width: 100%; height: 100%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 18px;">
          <div style="text-align: center;">
            <div style="font-size: 48px; margin-bottom: 20px;">🗺️</div>
            <div>Carte Google Maps</div>
            <div style="font-size: 14px; margin-top: 10px; opacity: 0.8;">
              ${listings.length} annonces affichées
            </div>
          </div>
        </div>
      `;
    };

    initMap();
  }, [listings]);

  return (
    <div className="map-view">
      <div ref={mapRef} className="map-container"></div>
      <div className="map-info">
        <h3>Annonces sur la carte</h3>
        <p>{listings.length} annonces trouvées</p>
        <div className="map-listings">
          {listings.map(listing => (
            <div
              key={listing.id}
              className="map-listing-item"
              onClick={() => onMarkerClick?.(listing)}
            >
              <div className="map-listing-title">{listing.title}</div>
              <div className="map-listing-price">{listing.price.toLocaleString('fr-FR')} €</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapView;
