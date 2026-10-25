import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Car, Plus, Wrench, FileText, DollarSign, Bell } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';

export default function MyGaragePage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
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

  return (
    <main className="min-h-screen bg-ivory pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-4xl font-bold text-obsidian">My Garage</h1>
              <p className="text-obsidian/70 mt-1">Manage your vehicles, maintenance, and documents</p>
            </div>
            <Link
              to="/garage/add"
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gold to-gold-dark text-obsidian font-semibold rounded-full shadow-gold hover:shadow-lg transition-all"
            >
              <Plus className="w-5 h-5" />
              Add Vehicle
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Vehicles', value: ownedVehicles.length, icon: Car },
              { label: 'Services', value: ownedVehicles.reduce((sum, v) => sum + (v.maintenanceRecords?.length || 0), 0), icon: Wrench },
              { label: 'Expenses', value: formatPrice(ownedVehicles.reduce((sum, v) => sum + (v.expenses?.reduce((s: number, e: any) => s + e.amount, 0) || 0), 0)), icon: DollarSign },
              { label: 'Reminders', value: ownedVehicles.reduce((sum, v) => sum + (v.reminders?.filter((r: any) => r.status === 'PENDING').length || 0), 0), icon: Bell },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-2xl p-6 shadow-soft">
                <stat.icon className="w-8 h-8 text-gold mb-2" />
                <p className="text-2xl font-bold text-obsidian">{stat.value}</p>
                <p className="text-sm text-obsidian/70 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Vehicles List */}
          {loading ? (
            <div className="text-center py-12">
              <p className="text-obsidian/70">Loading your garage...</p>
            </div>
          ) : ownedVehicles.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center shadow-soft">
              <Car className="w-16 h-16 text-obsidian/10 mx-auto mb-4" />
              <h3 className="font-display text-xl font-bold text-obsidian mb-2">No vehicles yet</h3>
              <p className="text-obsidian/70 mb-6">Add your first vehicle to start tracking maintenance and expenses</p>
              <Link
                to="/garage/add"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gold to-gold-dark text-obsidian font-semibold rounded-full shadow-gold hover:shadow-lg transition-all"
              >
                <Plus className="w-5 h-5" />
                Add Your First Vehicle
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ownedVehicles.map((vehicle) => (
                <Link
                  key={vehicle.id}
                  to={`/garage/vehicle/${vehicle.id}`}
                  className="block bg-white rounded-2xl shadow-soft p-6 card-premium"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-display text-lg font-bold text-obsidian">
                        {vehicle.year} {vehicle.make} {vehicle.model}
                      </h3>
                      {vehicle.registrationNumber && (
                        <p className="text-xs text-obsidian/70 mt-1">{vehicle.registrationNumber}</p>
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
                      <span className="text-obsidian/70">Mileage:</span>
                      <span className="font-medium text-obsidian">{vehicle.currentMileage.toLocaleString()} km</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-obsidian/70">Services:</span>
                      <span className="font-medium text-obsidian">{vehicle.maintenanceRecords?.length || 0}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-obsidian/70">Documents:</span>
                      <span className="font-medium text-obsidian">{vehicle.documents?.length || 0}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-obsidian/5 flex items-center justify-between">
                    <span className="text-xs text-obsidian/70">
                      {vehicle.reminders?.filter((r: any) => r.status === 'PENDING').length || 0} pending reminders
                    </span>
                    <span className="text-xs text-gold font-medium">View Details →</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </main>
  );
}
