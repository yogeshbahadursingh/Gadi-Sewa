import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Car, Plus, Eye, Edit, Trash2, CheckCircle, Clock, TrendingUp, DollarSign, Star, ArrowRight, Settings, Bell, MapPin } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { api, Vehicle } from '../services/api';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [myVehicles, setMyVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'published' | 'drafts' | 'sold'>('all');

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

  const handleMarkSold = async (id: string) => {
    try {
      await api.markAsSold(id);
      await loadVehicles();
    } catch (error) {
      alert('Failed to mark as sold');
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
    sold: myVehicles.filter(v => v.status === 'SOLD').length,
    totalViews: myVehicles.reduce((sum, v) => sum + (v.views || 0), 0),
    totalValue: myVehicles.filter(v => v.status === 'PUBLISHED').reduce((sum, v) => sum + v.price, 0)
  };

  const filteredVehicles = myVehicles.filter(v => {
    if (activeTab === 'all') return true;
    if (activeTab === 'published') return v.status === 'PUBLISHED';
    if (activeTab === 'drafts') return v.status === 'DRAFT';
    if (activeTab === 'sold') return v.status === 'SOLD';
    return true;
  });

  return (
    <main className="min-h-screen bg-ivory">
      {/* Premium Header */}
      <section className="bg-gradient-to-br from-obsidian via-obsidian-light to-obsidian relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh-luxury opacity-20"></div>
        <div className="container-luxury relative z-10 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between"
          >
            <div>
              <span className="badge-luxury badge-gold mb-4 inline-flex">
                Seller Dashboard
              </span>
              <h1 className="font-display text-5xl md:text-6xl font-bold text-ivory mb-2 tracking-tight">
                Welcome back,
                <span className="block text-gradient-gold mt-2">{user?.firstName}</span>
              </h1>
              <p className="text-xl text-ivory/70">
                Manage your vehicles, track performance, and grow your business
              </p>
            </div>
            <Link
              to="/sell"
              className="btn-luxury btn-gold px-8 py-4 text-base font-semibold rounded-full flex items-center gap-3 group"
            >
              <Plus className="w-5 h-5" />
              <span>List New Vehicle</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      <div className="container-luxury py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Premium Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { label: 'Total Listings', value: stats.total, icon: Car, color: 'from-gold/10 to-gold/5', iconColor: 'text-gold' },
              { label: 'Published', value: stats.published, icon: CheckCircle, color: 'from-emerald/10 to-emerald/5', iconColor: 'text-emerald' },
              { label: 'Total Views', value: stats.totalViews, icon: Eye, color: 'from-obsidian/10 to-obsidian/5', iconColor: 'text-obsidian' },
              { label: 'Portfolio Value', value: formatPrice(stats.totalValue), icon: DollarSign, color: 'from-gold/10 to-gold/5', iconColor: 'text-gold' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="card-luxury p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center`}>
                    <stat.icon className={`w-7 h-7 ${stat.iconColor}`} />
                  </div>
                  <ArrowRight className="w-5 h-5 text-obsidian/20" />
                </div>
                <p className="text-3xl font-bold text-obsidian mb-1">{stat.value}</p>
                <p className="text-sm text-obsidian/60">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="card-luxury p-8 mb-12">
            <h2 className="font-display text-2xl font-bold text-obsidian mb-6 flex items-center gap-3">
              <div className="w-1 h-8 bg-gradient-to-b from-gold to-gold-dark rounded-full"></div>
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link to="/sell" className="group flex flex-col items-center gap-3 p-6 bg-ivory rounded-xl hover:bg-gold/5 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-gold to-gold-dark rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Plus className="w-6 h-6 text-obsidian" />
                </div>
                <span className="text-sm font-semibold text-obsidian">List Vehicle</span>
              </Link>
              <Link to="/profile" className="group flex flex-col items-center gap-3 p-6 bg-ivory rounded-xl hover:bg-gold/5 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald to-emerald-light rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Settings className="w-6 h-6 text-ivory" />
                </div>
                <span className="text-sm font-semibold text-obsidian">Settings</span>
              </Link>
              <Link to="/enquiries" className="group flex flex-col items-center gap-3 p-6 bg-ivory rounded-xl hover:bg-gold/5 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-obsidian to-obsidian-light rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Bell className="w-6 h-6 text-ivory" />
                </div>
                <span className="text-sm font-semibold text-obsidian">Enquiries</span>
              </Link>
              <Link to="/favourites" className="group flex flex-col items-center gap-3 p-6 bg-ivory rounded-xl hover:bg-gold/5 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-gold to-gold-dark rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Star className="w-6 h-6 text-obsidian" />
                </div>
                <span className="text-sm font-semibold text-obsidian">Favourites</span>
              </Link>
            </div>
          </div>

          {/* My Vehicles Section */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-3xl font-bold text-obsidian flex items-center gap-3">
                <div className="w-1 h-8 bg-gradient-to-b from-gold to-gold-dark rounded-full"></div>
                My Vehicles
              </h2>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
              {[
                { id: 'all', label: 'All Vehicles', count: stats.total },
                { id: 'published', label: 'Published', count: stats.published },
                { id: 'drafts', label: 'Drafts', count: stats.drafts },
                { id: 'sold', label: 'Sold', count: stats.sold },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-6 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? 'bg-obsidian text-ivory shadow-medium'
                      : 'bg-white text-obsidian/70 hover:bg-obsidian/5'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>
            
            {loading ? (
              <div className="card-luxury p-12 text-center">
                <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-obsidian/70">Loading your vehicles...</p>
              </div>
            ) : filteredVehicles.length === 0 ? (
              <div className="card-luxury p-16 text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-obsidian/5 rounded-full flex items-center justify-center">
                  <Car className="w-10 h-10 text-obsidian/20" />
                </div>
                <h3 className="font-display text-2xl font-bold text-obsidian mb-3">
                  {activeTab === 'all' ? 'No vehicles yet' : `No ${activeTab} vehicles`}
                </h3>
                <p className="text-obsidian/70 mb-6">
                  {activeTab === 'all' 
                    ? 'Start by listing your first vehicle'
                    : `You don't have any ${activeTab} vehicles yet`}
                </p>
                {activeTab === 'all' && (
                  <Link
                    to="/sell"
                    className="btn-luxury btn-gold px-8 py-4 rounded-full font-semibold inline-flex items-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    List Your First Vehicle
                  </Link>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
                {filteredVehicles.map((vehicle) => (
                  <motion.div
                    key={vehicle.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="card-luxury overflow-hidden group"
                  >
                    {/* Vehicle Image */}
                    <div className="aspect-[4/3] bg-obsidian/5 relative overflow-hidden">
                      {vehicle.images && vehicle.images.length > 0 ? (
                        <img
                          src={vehicle.images[0].url}
                          alt={`${vehicle.make} ${vehicle.model}`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-obsidian/20">
                          <Car className="w-16 h-16" />
                        </div>
                      )}
                      
                      {/* Status Badge */}
                      <div className="absolute top-4 left-4">
                        <span className={`badge-luxury ${
                          vehicle.status === 'PUBLISHED' ? 'badge-emerald' :
                          vehicle.status === 'SOLD' ? 'badge-obsidian' :
                          'badge-gold'
                        } text-xs`}>
                          {vehicle.status === 'PUBLISHED' && <CheckCircle className="w-3 h-3" />}
                          {vehicle.status === 'DRAFT' && <Clock className="w-3 h-3" />}
                          {vehicle.status}
                        </span>
                      </div>

                      {/* Views Counter */}
                      <div className="absolute top-4 right-4 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5 text-obsidian/60" />
                        <span className="text-xs font-semibold text-obsidian">{vehicle.views}</span>
                      </div>
                    </div>

                    {/* Vehicle Info */}
                    <div className="p-6">
                      <h3 className="font-display text-xl font-bold text-obsidian mb-1 group-hover:text-gradient-gold transition-all duration-300">
                        {vehicle.year} {vehicle.make} {vehicle.model}
                      </h3>
                      {vehicle.variant && (
                        <p className="text-sm text-obsidian/60 mb-3">{vehicle.variant}</p>
                      )}
                      
                      <div className="flex items-center gap-2 text-sm text-obsidian/70 mb-4">
                        <MapPin className="w-4 h-4" />
                        <span>{vehicle.city}, {vehicle.province}</span>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-obsidian/5 mb-4">
                        <div>
                          <p className="text-xs text-obsidian/60 uppercase tracking-wider mb-1">Price</p>
                          <p className="text-2xl font-bold text-obsidian">{formatPrice(vehicle.price)}</p>
                        </div>
                        {vehicle.negotiable && (
                          <span className="text-xs text-emerald font-semibold">Negotiable</span>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/vehicle/${vehicle.id}`}
                          className="flex-1 py-2.5 bg-obsidian/5 text-obsidian text-sm font-medium rounded-xl hover:bg-obsidian/10 transition-colors flex items-center justify-center gap-2"
                        >
                          <Eye className="w-4 h-4" />
                          View
                        </Link>
                        <Link
                          to={`/vehicle/${vehicle.id}/edit`}
                          className="flex-1 py-2.5 bg-gold/10 text-gold-dark text-sm font-medium rounded-xl hover:bg-gold/20 transition-colors flex items-center justify-center gap-2"
                        >
                          <Edit className="w-4 h-4" />
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(vehicle.id)}
                          className="p-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                          aria-label="Delete vehicle"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
