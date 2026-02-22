import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ListingCard from './components/ListingCard';
import MapView from './components/MapView';
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

  const fetchListings = async (searchLocation: string = '') => {
    setLoading(true);
    setError(null);
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'https://omnivation-api-81002a93597c.herokuapp.com';
      
      // Construire l'URL avec les paramètres de recherche
      let url = `${apiUrl}/api/search`;
      if (searchLocation) {
        url += `?location=${encodeURIComponent(searchLocation)}`;
      }
      
      const response = await fetch(url);
      if (!response.ok) throw new Error('Erreur lors du chargement des annonces');
      const data = await response.json();
      
      // Transformer les données pour ajouter les champs manquants
      const transformedListings = (data.listings || []).map((listing: any) => ({
        ...listing,
        image: listing.image || `https://via.placeholder.com/300x200?text=${encodeURIComponent(listing.title)}`,
        agency: 'Agence Immobilière',
      }));
      
      setListings(transformedListings);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      // Données de démonstration
      setListings([
        {
          id: 1,
          title: 'Appartement 2 pièces Cannes',
          price: 450000,
          location: 'Cannes, France',
          bedrooms: 2,
          bathrooms: 1,
          area: 65,
          image: 'https://via.placeholder.com/300x200?text=Cannes',
          agency: 'Agence Immobilière',
        },
        {
          id: 2,
          title: 'Villa 4 pièces Antibes',
          price: 850000,
          location: 'Antibes, France',
          bedrooms: 4,
          bathrooms: 3,
          area: 200,
          image: 'https://via.placeholder.com/300x200?text=Antibes',
          agency: 'Agence Immobilière',
        },
        {
          id: 3,
          title: 'Studio Paris 5e',
          price: 350000,
          location: 'Paris 5e, France',
          bedrooms: 1,
          bathrooms: 1,
          area: 25,
          image: 'https://via.placeholder.com/300x200?text=Paris',
          agency: 'Agence Immobilière',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Quand le terme de recherche change, faire une nouvelle requête à l'API
  useEffect(() => {
    if (searchTerm) {
      fetchListings(searchTerm);
    } else {
      fetchListings();
    }
  }, [searchTerm]);

  const filteredListings = listings;

  const handleMarkerClick = (listing: any) => {
    console.log('Clicked listing:', listing);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <SearchBar onSearch={handleSearch} />
        
        {error && <div className="error-message">{error}</div>}
        
        {!loading && filteredListings.length > 0 && (
          <MapView listings={filteredListings as any} onMarkerClick={handleMarkerClick} />
        )}
        
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
