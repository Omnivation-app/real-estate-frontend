import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ListingCard from './components/ListingCard';
import Footer from './components/Footer';

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

const App: React.FC = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/listings');
      if (!response.ok) throw new Error('Erreur lors du chargement des annonces');
      const data = await response.json();
      setListings(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      // Données de démonstration
      setListings([
        {
          id: 1,
          title: 'Appartement 3 pièces à Paris',
          price: 450000,
          location: 'Paris 15e',
          bedrooms: 3,
          bathrooms: 1,
          area: 65,
          image: 'https://via.placeholder.com/300x200?text=Appartement+1',
          agency: 'Agence Immobilière Paris',
        },
        {
          id: 2,
          title: 'Maison 4 pièces en Île-de-France',
          price: 650000,
          location: 'Versailles',
          bedrooms: 4,
          bathrooms: 2,
          area: 120,
          image: 'https://via.placeholder.com/300x200?text=Maison+1',
          agency: 'Agence Versailles Immobilier',
        },
        {
          id: 3,
          title: 'Studio à Lyon',
          price: 180000,
          location: 'Lyon 2e',
          bedrooms: 1,
          bathrooms: 1,
          area: 35,
          image: 'https://via.placeholder.com/300x200?text=Studio+1',
          agency: 'Agence Lyon Immobilier',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredListings = listings.filter(listing =>
    listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    listing.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <SearchBar onSearch={setSearchTerm} />
        
        {error && <div className="error-message">{error}</div>}
        
        {loading ? (
          <div className="loading">Chargement des annonces...</div>
        ) : (
          <div className="listings-container">
            {filteredListings.length > 0 ? (
              <div className="listings-grid">
                {filteredListings.map(listing => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            ) : (
              <div className="no-results">
                Aucune annonce trouvée pour "{searchTerm}"
              </div>
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;
