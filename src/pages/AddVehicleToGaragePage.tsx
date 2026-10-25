import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Save } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';

export default function AddVehicleToGaragePage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    registrationNumber: '',
    vin: '',
    purchaseDate: '',
    purchasePrice: '',
    currentMileage: ''
  });

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-ivory pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-obsidian mb-4">Sign in required</h1>
          <p className="text-obsidian/70 mb-6">You need to be signed in to add vehicles to your garage.</p>
          <Link to="/login" className="px-6 py-3 bg-obsidian text-ivory rounded-full">
            Sign In
          </Link>
        </div>
      </main>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.make || !formData.model || !formData.year) {
      alert('Please fill in make, model, and year');
      return;
    }

    setLoading(true);

    try {
      await api.addOwnedVehicle({
        make: formData.make,
        model: formData.model,
        year: parseInt(formData.year),
        registrationNumber: formData.registrationNumber || undefined,
        vin: formData.vin || undefined,
        purchaseDate: formData.purchaseDate || undefined,
        purchasePrice: formData.purchasePrice ? parseInt(formData.purchasePrice) : undefined,
        currentMileage: formData.currentMileage ? parseInt(formData.currentMileage) : 0
      });
      
      navigate('/garage');
    } catch (error: any) {
      alert('Failed to add vehicle: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-ivory pt-8 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <button
            onClick={() => navigate('/garage')}
            className="flex items-center gap-2 text-obsidian/60 hover:text-obsidian mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back to Garage</span>
          </button>

          <h1 className="font-display text-4xl font-bold text-obsidian mb-2">Add Vehicle to Garage</h1>
          <p className="text-obsidian/70 mb-8">Add your vehicle to track maintenance, expenses, and documents</p>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-soft p-8">
            <div className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-obsidian mb-2">Make *</label>
                  <input
                    type="text"
                    value={formData.make}
                    onChange={(e) => setFormData({ ...formData, make: e.target.value })}
                    placeholder="e.g. Toyota"
                    className="w-full px-4 py-3 bg-ivory border border-obsidian/10 rounded-xl focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-obsidian mb-2">Model *</label>
                  <input
                    type="text"
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    placeholder="e.g. Fortuner"
                    className="w-full px-4 py-3 bg-ivory border border-obsidian/10 rounded-xl focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
                    required
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-obsidian mb-2">Year *</label>
                  <input
                    type="number"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    placeholder="e.g. 2022"
                    min="1900"
                    max="2030"
                    className="w-full px-4 py-3 bg-ivory border border-obsidian/10 rounded-xl focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-obsidian mb-2">Registration Number</label>
                  <input
                    type="text"
                    value={formData.registrationNumber}
                    onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                    placeholder="e.g. Ba 1 Pa 1234"
                    className="w-full px-4 py-3 bg-ivory border border-obsidian/10 rounded-xl focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-obsidian mb-2">VIN (Vehicle Identification Number)</label>
                <input
                  type="text"
                  value={formData.vin}
                  onChange={(e) => setFormData({ ...formData, vin: e.target.value })}
                  placeholder="Optional"
                  className="w-full px-4 py-3 bg-ivory border border-obsidian/10 rounded-xl focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-obsidian mb-2">Purchase Date</label>
                  <input
                    type="date"
                    value={formData.purchaseDate}
                    onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
                    className="w-full px-4 py-3 bg-ivory border border-obsidian/10 rounded-xl focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-obsidian mb-2">Purchase Price (NPR)</label>
                  <input
                    type="number"
                    value={formData.purchasePrice}
                    onChange={(e) => setFormData({ ...formData, purchasePrice: e.target.value })}
                    placeholder="e.g. 5000000"
                    min="0"
                    className="w-full px-4 py-3 bg-ivory border border-obsidian/10 rounded-xl focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-obsidian mb-2">Current Mileage (km)</label>
                <input
                  type="number"
                  value={formData.currentMileage}
                  onChange={(e) => setFormData({ ...formData, currentMileage: e.target.value })}
                  placeholder="e.g. 50000"
                  min="0"
                  className="w-full px-4 py-3 bg-ivory border border-obsidian/10 rounded-xl focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => navigate('/garage')}
                  className="flex-1 py-3 border border-obsidian/10 text-obsidian font-medium rounded-xl hover:bg-obsidian/5 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 bg-gradient-to-r from-gold to-gold-dark text-obsidian font-semibold rounded-xl shadow-gold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? 'Adding...' : 'Add Vehicle'}
                  {!loading && <Save className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </main>
  );
}
