import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Car, Plus, FileText, Wrench, DollarSign, Bell, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';

interface OwnedVehicle {
  id: string;
  make?: string;
  model?: string;
  year?: number;
  registrationNumber?: string;
  currentMileage: number;
  status: string;
  maintenanceRecords?: any[];
  documents?: any[];
  expenses?: any[];
  reminders?: any[];
}

export default function MyGaragePage() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [ownedVehicles, setOwnedVehicles] = useState<OwnedVehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    loadOwnedVehicles();
  }, [isAuthenticated]);

  const loadOwnedVehicles = async () => {
    try {
      const data = await api.getMyOwnedVehicles();
      setOwnedVehicles(data);
    } catch (error) {
      console.error('Failed to load owned vehicles:', error);
    } finally {
      setLoading(false);
    }
  };

  const getUpcomingReminders = () => {
    const allReminders = ownedVehicles.flatMap(v => v.reminders || []);
    return allReminders
      .filter(r => r.status === 'PENDING')
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
      .slice(0, 5);
  };

  const getTotalExpenses = () => {
    return ownedVehicles.reduce((total, v) => {
      const vehicleExpenses = v.expenses || [];
      return total + vehicleExpenses.reduce((sum, e) => sum + e.amount, 0);
    }, 0);
  };

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `रू ${(price / 10000000).toFixed(2)} Crore`;
    }
    if (price >= 100000) {
      return `रू ${(price / 100000).toFixed(2)} Lakh`;
    }
    return `रू ${price.toLocaleString('en-NP')}`;
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-ivory pt-20 lg:pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-obsidian/60">Loading your garage...</p>
        </div>
      </main>
    );
  }

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
            <h1 className="font-display text-3xl lg:text-4xl font-bold text-obsidian">My Garage</h1>
            <p className="text-slate-warm mt-1">Manage your vehicles, maintenance, and documents</p>
          </div>
          <Link
            to="/garage/add"
            className="flex items-center gap-2 px-5 py-2.5 bg-obsidian text-ivory text-sm font-medium rounded-full hover:bg-emerald transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Vehicle
          </Link>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl border border-obsidian/[0.04] p-5"
          >
            <div className="flex items-center justify-between mb-2">
              <Car className="w-5 h-5 text-gold" />
            </div>
            <p className="text-2xl font-bold text-obsidian">{ownedVehicles.length}</p>
            <p className="text-sm text-slate-warm mt-1">Vehicles</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl border border-obsidian/[0.04] p-5"
          >
            <div className="flex items-center justify-between mb-2">
              <Wrench className="w-5 h-5 text-gold" />
            </div>
            <p className="text-2xl font-bold text-obsidian">
              {ownedVehicles.reduce((sum, v) => sum + (v.maintenanceRecords?.length || 0), 0)}
            </p>
            <p className="text-sm text-slate-warm mt-1">Service Records</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl border border-obsidian/[0.04] p-5"
          >
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-5 h-5 text-gold" />
            </div>
            <p className="text-2xl font-bold text-obsidian">{formatPrice(getTotalExpenses())}</p>
            <p className="text-sm text-slate-warm mt-1">Total Expenses</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl border border-obsidian/[0.04] p-5"
          >
            <div className="flex items-center justify-between mb-2">
              <Bell className="w-5 h-5 text-gold" />
            </div>
            <p className="text-2xl font-bold text-obsidian">
              {ownedVehicles.reduce((sum, v) => sum + (v.reminders?.filter(r => r.status === 'PENDING').length || 0), 0)}
            </p>
            <p className="text-sm text-slate-warm mt-1">Pending Reminders</p>
          </motion.div>
        </div>

        {/* Upcoming Reminders */}
        {getUpcomingReminders().length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl border border-obsidian/[0.04] p-6 mb-8"
          >
            <h2 className="font-display text-xl font-semibold text-obsidian mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5 text-gold" />
              Upcoming Reminders
            </h2>
            <div className="space-y-3">
              {getUpcomingReminders().map((reminder) => (
                <div key={reminder.id} className="flex items-center justify-between p-3 bg-ivory rounded-xl">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600" />
                    <div>
                      <p className="text-sm font-medium text-obsidian">{reminder.title}</p>
                      <p className="text-xs text-slate-warm">
                        Due: {new Date(reminder.dueDate).toLocaleDateString('en-GB')}
                      </p>
                    </div>
                  </div>
                  <button className="px-3 py-1.5 text-xs font-medium text-emerald hover:text-emerald-light transition-colors">
                    Mark Complete
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Vehicles List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="font-display text-xl font-semibold text-obsidian mb-4">Your Vehicles</h2>
          
          {ownedVehicles.length === 0 ? (
            <div className="bg-white rounded-2xl border border-obsidian/[0.04] p-12 text-center">
              <Car className="w-16 h-16 text-obsidian/10 mx-auto mb-4" />
              <h3 className="font-display text-xl font-semibold text-obsidian mb-2">No vehicles yet</h3>
              <p className="text-slate-warm mb-6">Add your first vehicle to start tracking maintenance and expenses</p>
              <Link
                to="/garage/add"
                className="inline-flex items-center gap-2 px-6 py-3 bg-obsidian text-ivory text-sm font-medium rounded-full hover:bg-emerald transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Your First Vehicle
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {ownedVehicles.map((vehicle, index) => (
                <motion.div
                  key={vehicle.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Link
                    to={`/garage/vehicle/${vehicle.id}`}
                    className="block bg-white rounded-2xl border border-obsidian/[0.04] p-5 hover:shadow-[var(--shadow-elevated)] transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-display text-lg font-semibold text-obsidian">
                          {vehicle.year} {vehicle.make} {vehicle.model}
                        </h3>
                        {vehicle.registrationNumber && (
                          <p className="text-xs text-slate-warm mt-1">{vehicle.registrationNumber}</p>
                        )}
                      </div>
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                        vehicle.status === 'ACTIVE' ? 'bg-emerald/10 text-emerald' : 'bg-obsidian/10 text-obsidian/60'
                      }`}>
                        {vehicle.status}
                      </span>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-warm">Mileage:</span>
                        <span className="font-medium text-obsidian">{vehicle.currentMileage.toLocaleString()} km</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-warm">Services:</span>
                        <span className="font-medium text-obsidian">{vehicle.maintenanceRecords?.length || 0}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-warm">Documents:</span>
                        <span className="font-medium text-obsidian">{vehicle.documents?.length || 0}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-obsidian/[0.04] flex items-center justify-between">
                      <span className="text-xs text-slate-warm">
                        {vehicle.reminders?.filter(r => r.status === 'PENDING').length || 0} pending reminders
                      </span>
                      <span className="text-xs text-gold font-medium">View Details →</span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </main>
  );
}
