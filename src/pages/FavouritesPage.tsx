import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { api, Vehicle } from '../services/api';

export default function FavouritesPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [favourites, setFavourites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    loadFavourites();
  }, [isAuthenticated]);

  const loadFavourites = async () => {
    try {
      const data = await api.getMyFavourites();
      setFavourites(data);
    } catch (error) {
      console.error('Failed to load favourites:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (vehicleId: string) => {
    try {
      await api.removeFavourite(vehicleId);
      setFavourites(prev => prev.filter(v => v.id !== vehicleId));
    } catch (error) {
      alert('Failed to remove from favourites');
    }
  };

  return (
    <main className="min-h-screen bg-ivory pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-4xl font-bold text-obsidian mb-8">My Favourites</h1>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-obsidian/70">Loading your favourites...</p>
            </div>
          ) : favourites.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center shadow-soft">
              <Heart className="w-16 h-16 text-obsidian/10 mx-auto mb-4" />
              <h3 className="font-display text-xl font-bold text-obsidian mb-2">No favourites yet</h3>
              <p className="text-obsidian/70 mb-6">Start browsing and save vehicles you're interested in</p>
              <Link to="/listings" className="inline-flex items-center gap-2 px-6 py-3 bg-obsidian text-ivory rounded-full">
                Browse Vehicles
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favourites.map((vehicle) => (
                <div key={vehicle.id} className="relative">
                  <Link to={`/vehicle/${vehicle.id}`} className="block bg-white rounded-2xl shadow-soft overflow-hidden card-premium">
                    <div className="aspect-[4/3] bg-ivory-dark">
                      {vehicle.images && vehicle.images.length > 0 ? (
                        <img src={vehicle.images[0].url} alt={`${vehicle.make} ${vehicle.model}`} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-obsidian/20">
                          <Heart className="w-16 h-16" />
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="font-display text-lg font-bold text-obsidian">{vehicle.year} {vehicle.make} {vehicle.model}</h3>
                      <p className="text-2xl font-bold text-obsidian mt-2">
                        रू {vehicle.price.toLocaleString('en-NP')}
                      </p>
                    </div>
                  </Link>
                  <button
                    onClick={() => handleRemove(vehicle.id)}
                    className="absolute top-3 right-3 p-2 bg-white/90 rounded-full shadow-soft hover:bg-white transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </main>
  );
}
