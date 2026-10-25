import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Car, Plus, Eye, Edit, Trash2, CheckCircle, Clock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { api, Vehicle } from '../services/api';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
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
      setMyVehicles(data);
    } catch (error) {
      console.error('Failed to load vehicles:', error);
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

  const formatPrice = (price: number) => {
    if (price >= 10000000) return `रू ${(price / 10000000).toFixed(2)} Crore`;
    if (price >= 100000) return `रू ${(price / 100000).toFixed(2)} Lakh`;
    return `रू ${price.toLocaleString('en-NP')}`;
  };

  const stats = {
    total: myVehicles.length,
    published: myVehicles.filter(v => v.status === 'PUBLISHED').length,
    drafts: myVehicles.filter(v => v.status === 'DRAFT').length,
    sold: myVehicles.filter(v => v.status === 'SOLD').length
  };

  return (
    <main className="min-h-screen bg-ivory pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-4xl font-bold text-obsidian">
                Welcome, {user?.firstName}
              </h1>
              <p className="text-obsidian/70 mt-1">Manage your vehicles and account</p>
            </div>
            <Link
              to="/sell"
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gold to-gold-dark text-obsidian font-semibold rounded-full shadow-gold hover:shadow-lg transition-all"
            >
              <Plus className="w-5 h-5" />
              List Vehicle
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Total Listings', value: stats.total, icon: Car },
              { label: 'Published', value: stats.published, icon: CheckCircle },
              { label: 'Drafts', value: stats.drafts, icon: Clock },
              { label: 'Sold', value: stats.sold, icon: CheckCircle },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-2xl p-6 shadow-soft">
                <stat.icon className="w-8 h-8 text-gold mb-2" />
                <p className="text-3xl font-bold text-obsidian">{stat.value}</p>
                <p className="text-sm text-obsidian/70 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* My Vehicles */}
          <div>
            <h2 className="font-display text-2xl font-bold text-obsidian mb-4">My Vehicles</h2>
            
            {loading ? (
              <div className="text-center py-12">
                <p className="text-obsidian/70">Loading your vehicles...</p>
              </div>
            ) : myVehicles.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center shadow-soft">
                <Car className="w-16 h-16 text-obsidian/20 mx-auto mb-4" />
                <h3 className="font-display text-xl font-bold text-obsidian mb-2">No vehicles yet</h3>
                <p className="text-obsidian/70 mb-6">Start by listing your first vehicle</p>
                <Link
                  to="/sell"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gold to-gold-dark text-obsidian font-semibold rounded-full shadow-gold hover:shadow-lg transition-all"
                >
                  <Plus className="w-5 h-5" />
                  List Your First Vehicle
                </Link>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
                <div className="divide-y divide-obsidian/5">
                  {myVehicles.map((vehicle) => (
                    <div key={vehicle.id} className="p-6 hover:bg-ivory/50 transition-colors">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-obsidian text-lg">
                              {vehicle.year} {vehicle.make} {vehicle.model}
                            </h3>
                            <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                              vehicle.status === 'PUBLISHED' ? 'bg-emerald/10 text-emerald' :
                              vehicle.status === 'SOLD' ? 'bg-obsidian/10 text-obsidian/60' :
                              'bg-gold/10 text-gold-dark'
                            }`}>
                              {vehicle.status}
                            </span>
                          </div>
                          <p className="text-sm text-obsidian/70 mb-2">
                            {vehicle.variant && `${vehicle.variant} · `}
                            {vehicle.city}, {vehicle.province}
                          </p>
                          <p className="text-xl font-bold text-obsidian">
                            {formatPrice(vehicle.price)}
                          </p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-obsidian/70">
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
                          <Link
                            to={`/vehicle/${vehicle.id}`}
                            className="p-2 text-obsidian/40 hover:text-obsidian transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(vehicle.id)}
                            className="p-2 text-obsidian/40 hover:text-red-600 transition-colors"
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
          </div>
        </motion.div>
      </div>
    </main>
  );
}
