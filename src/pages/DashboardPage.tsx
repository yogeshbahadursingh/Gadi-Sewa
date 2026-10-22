import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Car, Plus, Eye, Edit, Trash2, CheckCircle, Clock, AlertCircle, LogOut, Heart, MessageCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { api, Vehicle } from '../services/api';
import { formatPrice } from '../data/vehicles';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const [myVehicles, setMyVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    loadVehicles();
  }, [isAuthenticated]);

  const loadVehicles = async () => {
    try {
      const data = await api.getMyVehicles();
      // Handle both demo mode (direct array) and API mode (wrapped response)
      const vehicles = Array.isArray(data) ? data : (data.data || []);
      setMyVehicles(vehicles);
    } catch (error) {
      console.error('Failed to load vehicles:', error);
      setMyVehicles([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this vehicle?')) return;
    
    try {
      await api.deleteVehicle(id);
      setMyVehicles(prev => prev.filter(v => v.id !== id));
    } catch (error) {
      alert('Failed to delete vehicle');
    }
  };

  const handlePublish = async (id: string) => {
    try {
      await api.publishVehicle(id);
      await loadVehicles();
    } catch (error) {
      alert('Failed to publish vehicle');
    }
  };

  const handleMarkSold = async (id: string) => {
    try {
      await api.markAsSold(id);
      await loadVehicles();
    } catch (error) {
      alert('Failed to mark as sold');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const [enquiriesCount, setEnquiriesCount] = useState(0);
  const [favouritesCount, setFavouritesCount] = useState(0);

  useEffect(() => {
    const loadCounts = async () => {
      try {
        const [enquiries, favourites] = await Promise.all([
          api.getEnquiriesForMyVehicles(),
          api.getMyFavourites()
        ]);
        setEnquiriesCount(enquiries?.length || 0);
        setFavouritesCount(favourites?.length || 0);
      } catch (error) {
        console.error('Failed to load counts:', error);
      }
    };
    loadCounts();
  }, []);

  const stats = {
    total: myVehicles.length,
    published: myVehicles.filter(v => v.status === 'PUBLISHED').length,
    drafts: myVehicles.filter(v => v.status === 'DRAFT').length,
    sold: myVehicles.filter(v => v.status === 'SOLD').length
  };

  return (
    <main className="min-h-screen bg-ivory pt-20 lg:pt-24">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="font-display text-3xl font-bold text-obsidian">
              Welcome, {user?.firstName}
            </h1>
            <p className="text-slate-warm mt-1">Manage your vehicles and account</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/favourites"
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-obsidian/10 text-obsidian text-sm font-medium rounded-full hover:bg-obsidian/5 transition-colors"
            >
              <Heart className="w-4 h-4" />
              Favourites ({favouritesCount})
            </Link>
            <Link
              to="/enquiries"
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-obsidian/10 text-obsidian text-sm font-medium rounded-full hover:bg-obsidian/5 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Enquiries ({enquiriesCount})
            </Link>
            <Link
              to="/sell"
              className="flex items-center gap-2 px-5 py-2.5 bg-obsidian text-ivory text-sm font-medium rounded-full hover:bg-emerald transition-colors"
            >
              <Plus className="w-4 h-4" />
              List Vehicle
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2.5 border border-obsidian/10 text-obsidian text-sm font-medium rounded-full hover:bg-obsidian/5 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: 'Total Listings', value: stats.total, icon: <Car className="w-5 h-5" /> },
            { label: 'Published', value: stats.published, icon: <CheckCircle className="w-5 h-5" /> },
            { label: 'Drafts', value: stats.drafts, icon: <Clock className="w-5 h-5" /> },
            { label: 'Sold', value: stats.sold, icon: <AlertCircle className="w-5 h-5" /> },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl border border-obsidian/[0.04] p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-obsidian/40">{stat.icon}</span>
              </div>
              <p className="text-2xl font-bold text-obsidian">{stat.value}</p>
              <p className="text-sm text-slate-warm mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* My Vehicles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="font-display text-xl font-semibold text-obsidian mb-4">My Vehicles</h2>
          
          {loading ? (
            <div className="text-center py-12">
              <p className="text-slate-warm">Loading your vehicles...</p>
            </div>
          ) : myVehicles.length === 0 ? (
            <div className="bg-white rounded-2xl border border-obsidian/[0.04] p-12 text-center">
              <Car className="w-12 h-12 text-obsidian/20 mx-auto mb-4" />
              <h3 className="font-display text-lg font-semibold text-obsidian mb-2">No vehicles yet</h3>
              <p className="text-slate-warm mb-6">Start by listing your first vehicle</p>
              <Link
                to="/sell"
                className="inline-flex items-center gap-2 px-6 py-3 bg-obsidian text-ivory text-sm font-medium rounded-full hover:bg-emerald transition-colors"
              >
                <Plus className="w-4 h-4" />
                List Your First Vehicle
              </Link>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-obsidian/[0.04] overflow-hidden">
              <div className="divide-y divide-obsidian/[0.04]">
                {myVehicles.map((vehicle) => (
                  <div key={vehicle.id} className="p-5 hover:bg-ivory/50 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-obsidian truncate">
                            {vehicle.year} {vehicle.make} {vehicle.model}
                          </h3>
                          <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                            vehicle.status === 'PUBLISHED'
                              ? 'bg-emerald/10 text-emerald'
                              : vehicle.status === 'SOLD'
                              ? 'bg-obsidian/10 text-obsidian/60'
                              : 'bg-gold/10 text-gold-dark'
                          }`}>
                            {vehicle.status}
                          </span>
                        </div>
                        <p className="text-sm text-slate-warm mb-2">
                          {vehicle.variant && `${vehicle.variant} · `}
                          {vehicle.province}, {vehicle.district}
                        </p>
                        <p className="text-lg font-bold text-obsidian">
                          {formatPrice(vehicle.price)}
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-slate-warm">
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {vehicle.views} views
                          </span>
                          <span>Created {new Date(vehicle.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {vehicle.status === 'DRAFT' && (
                          <button
                            onClick={() => handlePublish(vehicle.id)}
                            className="px-3 py-1.5 bg-emerald text-ivory text-xs font-medium rounded-lg hover:bg-emerald-light transition-colors"
                          >
                            Publish
                          </button>
                        )}
                        {vehicle.status === 'PUBLISHED' && (
                          <button
                            onClick={() => handleMarkSold(vehicle.id)}
                            className="px-3 py-1.5 bg-obsidian text-ivory text-xs font-medium rounded-lg hover:bg-emerald transition-colors"
                          >
                            Mark Sold
                          </button>
                        )}
                        <Link
                          to={`/vehicle/${vehicle.id}`}
                          className="p-2 text-obsidian/40 hover:text-obsidian transition-colors"
                          aria-label="View vehicle"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          to={`/vehicle/${vehicle.id}/edit`}
                          className="p-2 text-obsidian/40 hover:text-obsidian transition-colors"
                          aria-label="Edit vehicle"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(vehicle.id)}
                          className="p-2 text-obsidian/40 hover:text-red-600 transition-colors"
                          aria-label="Delete vehicle"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </main>
  );
}
