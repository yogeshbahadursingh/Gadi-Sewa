import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { api, Vehicle } from '../services/api';
import VehicleCard from '../components/VehicleCard';

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
      setFavourites(data || []);
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
    <main className="min-h-screen bg-ivory pt-20 lg:pt-24">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-3xl font-bold text-obsidian flex items-center gap-3">
                <Heart className="w-8 h-8 text-red-500" />
                My Favourites
              </h1>
              <p className="text-slate-warm mt-1">
                {favourites.length} {favourites.length === 1 ? 'vehicle' : 'vehicles'} saved
              </p>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-slate-warm">Loading your favourites...</p>
            </div>
          ) : favourites.length === 0 ? (
            <div className="bg-white rounded-2xl border border-obsidian/[0.04] p-12 text-center">
              <Heart className="w-16 h-16 text-obsidian/10 mx-auto mb-4" />
              <h3 className="font-display text-xl font-semibold text-obsidian mb-2">No favourites yet</h3>
              <p className="text-slate-warm mb-6">Start browsing and save vehicles you're interested in</p>
              <Link
                to="/listings"
                className="inline-flex items-center gap-2 px-6 py-3 bg-obsidian text-ivory text-sm font-medium rounded-full hover:bg-emerald transition-colors"
              >
                Browse Vehicles
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {favourites.map((vehicle, i) => (
                <div key={vehicle.id} className="relative">
                  <VehicleCard vehicle={vehicle} index={i} />
                  <button
                    onClick={() => handleRemove(vehicle.id)}
                    className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-all shadow-sm active:scale-95"
                    aria-label="Remove from favourites"
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
