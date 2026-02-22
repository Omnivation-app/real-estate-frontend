import React from 'react';
import './ListingCard.css';

interface Listing {
  id: number;
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
  agency: string;
}

interface ListingCardProps {
  listing: Listing;
}

const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="listing-card">
      <div className="listing-image">
        <img src={listing.image} alt={listing.title} />
        <div className="listing-price">{formatPrice(listing.price)}</div>
      </div>
      <div className="listing-content">
        <h3 className="listing-title">{listing.title}</h3>
        <p className="listing-location">📍 {listing.location}</p>
        
        <div className="listing-features">
          <div className="feature">
            <span className="feature-icon">🛏️</span>
            <span>{listing.bedrooms} chambre{listing.bedrooms > 1 ? 's' : ''}</span>
          </div>
          <div className="feature">
            <span className="feature-icon">🚿</span>
            <span>{listing.bathrooms} salle{listing.bathrooms > 1 ? 's' : ''}</span>
          </div>
          <div className="feature">
            <span className="feature-icon">📐</span>
            <span>{listing.area} m²</span>
          </div>
        </div>
        
        <p className="listing-agency">Agence: {listing.agency}</p>
        
        <button className="listing-button">Voir les détails</button>
      </div>
    </div>
  );
};

export default ListingCard;
