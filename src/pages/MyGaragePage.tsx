import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Car, Plus, Wrench, FileText, DollarSign, Bell, ArrowRight, TrendingUp, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';

export default function MyGaragePage() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [ownedVehicles, setOwnedVehicles] = useState<any[]>([]);
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
      const data = await api.getMyOwnedVehicles();
      setOwnedVehicles(data);
    } catch (error) {
      console.error('Failed to load vehicles:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    if (price >= 10000000) return `रू ${(price / 10000000).toFixed(2)} Crore`;
    if (price >= 100000) return `रू ${(price / 100000).toFixed(2)} Lakh`;
    return `रू ${price.toLocaleString('en-NP')}`;
  };

  const stats = {
    totalVehicles: ownedVehicles.length,
    totalServices: ownedVehicles.reduce((sum, v) => sum + (v.maintenanceRecords?.length || 0), 0),
    totalExpenses: ownedVehicles.reduce((sum, v) => sum + (v.expenses?.reduce((s: number, e: any) => s + e.amount, 0) || 0), 0),
    pendingReminders: ownedVehicles.reduce((sum, v) => sum + (v.reminders?.filter((r: any) => r.status === 'PENDING').length || 0), 0),
  };

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
                <Car className="w-4 h-4" />
                Vehicle Ownership
              </span>
              <h1 className="font-display text-5xl md:text-6xl font-bold text-ivory mb-2 tracking-tight">
                My Garage
              </h1>
              <p className="text-xl text-ivory/70">
                Manage your vehicles, maintenance, and documents in one place
              </p>
            </div>
            <Link
              to="/garage/add"
              className="btn-luxury btn-gold px-8 py-4 text-base font-semibold rounded-full flex items-center gap-3 group"
            >
              <Plus className="w-5 h-5" />
              <span>Add Vehicle</span>
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
          {/* Stats Grid */}
          {ownedVehicles.length > 0 && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                { label: 'Total Vehicles', value: stats.totalVehicles, icon: Car, color: 'from-gold/10 to-gold/5', iconColor: 'text-gold' },
                { label: 'Service Records', value: stats.totalServices, icon: Wrench, color: 'from-emerald/10 to-emerald/5', iconColor: 'text-emerald' },
                { label: 'Total Expenses', value: formatPrice(stats.totalExpenses), icon: DollarSign, color: 'from-obsidian/10 to-obsidian/5', iconColor: 'text-obsidian' },
                { label: 'Pending Reminders', value: stats.pendingReminders, icon: Bell, color: 'from-gold/10 to-gold/5', iconColor: 'text-gold' },
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
          )}

          {/* Content */}
          {loading ? (
            <div className="card-luxury p-12 text-center">
              <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-obsidian/70">Loading your garage...</p>
            </div>
          ) : ownedVehicles.length === 0 ? (
            <div className="card-luxury p-16 text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-obsidian/5 rounded-full flex items-center justify-center">
                <Car className="w-10 h-10 text-obsidian/20" />
              </div>
              <h3 className="font-display text-2xl font-bold text-obsidian mb-3">No vehicles yet</h3>
              <p className="text-obsidian/70 mb-6 max-w-md mx-auto">
                Add your first vehicle to start tracking maintenance, expenses, and documents
              </p>
              <Link
                to="/garage/add"
                className="btn-luxury btn-gold px-8 py-4 rounded-full font-semibold inline-flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Your First Vehicle
              </Link>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-3xl font-bold text-obsidian flex items-center gap-3">
                  <div className="w-1 h-8 bg-gradient-to-b from-gold to-gold-dark rounded-full"></div>
                  Your Vehicles
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
                {ownedVehicles.map((vehicle) => (
                  <motion.div
                    key={vehicle.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="group"
                  >
                    <Link
                      to={`/garage/vehicle/${vehicle.id}`}
                      className="block card-luxury p-6 hover:shadow-ultra transition-all duration-300"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-display text-xl font-bold text-obsidian mb-1 group-hover:text-gradient-gold transition-all duration-300">
                            {vehicle.year} {vehicle.make} {vehicle.model}
                          </h3>
                          {vehicle.registrationNumber && (
                            <p className="text-sm text-obsidian/60 font-mono">{vehicle.registrationNumber}</p>
                          )}
                        </div>
                        <span className={`badge-luxury ${
                          vehicle.status === 'ACTIVE' ? 'badge-emerald' : 'badge-obsidian'
                        } text-xs`}>
                          {vehicle.status}
                        </span>
                      </div>

                      {/* Vehicle Stats */}
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-obsidian/5 rounded-lg flex items-center justify-center">
                              <TrendingUp className="w-4 h-4 text-gold" />
                            </div>
                            <span className="text-sm text-obsidian/70">Mileage</span>
                          </div>
                          <span className="text-sm font-semibold text-obsidian">{vehicle.currentMileage.toLocaleString()} km</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-obsidian/5 rounded-lg flex items-center justify-center">
                              <Wrench className="w-4 h-4 text-emerald" />
                            </div>
                            <span className="text-sm text-obsidian/70">Services</span>
                          </div>
                          <span className="text-sm font-semibold text-obsidian">{vehicle.maintenanceRecords?.length || 0}</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-obsidian/5 rounded-lg flex items-center justify-center">
                              <FileText className="w-4 h-4 text-obsidian" />
                            </div>
                            <span className="text-sm text-obsidian/70">Documents</span>
                          </div>
                          <span className="text-sm font-semibold text-obsidian">{vehicle.documents?.length || 0}</span>
                        </div>
                      </div>

                      {/* Reminders */}
                      <div className="pt-4 border-t border-obsidian/5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Bell className="w-4 h-4 text-gold" />
                          <span className="text-sm text-obsidian/70">
                            {vehicle.reminders?.filter((r: any) => r.status === 'PENDING').length || 0} pending
                          </span>
                        </div>
                        <span className="text-xs text-gold font-semibold group-hover:translate-x-1 transition-transform">
                          View Details →
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </motion.div>
      </div>
    </main>
  );
}
