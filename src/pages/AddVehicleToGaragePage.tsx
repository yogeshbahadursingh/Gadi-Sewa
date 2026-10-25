import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Car, Calendar, DollarSign, MapPin, Hash } from 'lucide-react';
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
    <main className="min-h-screen bg-ivory">
      {/* Premium Header */}
      <section className="bg-gradient-to-br from-obsidian via-obsidian-light to-obsidian relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh-luxury opacity-20"></div>
        <div className="container-luxury relative z-10 py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <button
              onClick={() => navigate('/garage')}
              className="flex items-center gap-2 text-ivory/60 hover:text-ivory mb-6 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Back to Garage</span>
            </button>

            <span className="badge-luxury badge-gold mb-4 inline-flex">
              <Car className="w-4 h-4" />
              Add Vehicle
            </span>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-ivory mb-4 tracking-tight">
              Add Vehicle to
              <span className="block text-gradient-gold mt-2">Your Garage</span>
            </h1>
            <p className="text-xl text-ivory/70 max-w-2xl">
              Track maintenance, expenses, and documents for your vehicle
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container-luxury py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="card-luxury p-8">
            {/* Form Header */}
            <div className="mb-8 pb-6 border-b border-obsidian/5">
              <h2 className="font-display text-2xl font-bold text-obsidian mb-2 flex items-center gap-3">
                <div className="w-1 h-8 bg-gradient-to-b from-gold to-gold-dark rounded-full"></div>
                Vehicle Information
              </h2>
              <p className="text-obsidian/70">Fill in the details below to add your vehicle</p>
            </div>

            <div className="space-y-6">
              {/* Basic Info Section */}
              <div>
                <h3 className="text-sm font-semibold text-obsidian/60 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Car className="w-4 h-4 text-gold" />
                  Basic Information
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-obsidian mb-2">Make *</label>
                    <input
                      type="text"
                      value={formData.make}
                      onChange={(e) => setFormData({ ...formData, make: e.target.value })}
                      placeholder="e.g. Toyota"
                      className="input-luxury w-full px-4 py-3 rounded-xl"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-obsidian mb-2">Model *</label>
                    <input
                      type="text"
                      value={formData.model}
                      onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                      placeholder="e.g. Fortuner"
                      className="input-luxury w-full px-4 py-3 rounded-xl"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Year & Registration */}
              <div>
                <h3 className="text-sm font-semibold text-obsidian/60 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Hash className="w-4 h-4 text-gold" />
                  Identification
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-obsidian mb-2">Year *</label>
                    <input
                      type="number"
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      placeholder="e.g. 2022"
                      min="1900"
                      max="2030"
                      className="input-luxury w-full px-4 py-3 rounded-xl"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-obsidian mb-2">Registration Number</label>
                    <input
                      type="text"
                      value={formData.registrationNumber}
                      onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                      placeholder="e.g. Ba 1 Pa 1234"
                      className="input-luxury w-full px-4 py-3 rounded-xl"
                    />
                  </div>
                </div>
              </div>

              {/* VIN */}
              <div>
                <label className="block text-sm font-semibold text-obsidian mb-2">VIN (Vehicle Identification Number)</label>
                <input
                  type="text"
                  value={formData.vin}
                  onChange={(e) => setFormData({ ...formData, vin: e.target.value })}
                  placeholder="Optional - 17 character VIN"
                  className="input-luxury w-full px-4 py-3 rounded-xl"
                />
              </div>

              {/* Purchase Info */}
              <div>
                <h3 className="text-sm font-semibold text-obsidian/60 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gold" />
                  Purchase Information
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-obsidian mb-2">Purchase Date</label>
                    <input
                      type="date"
                      value={formData.purchaseDate}
                      onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
                      className="input-luxury w-full px-4 py-3 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-obsidian mb-2">Purchase Price (NPR)</label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold" />
                      <input
                        type="number"
                        value={formData.purchasePrice}
                        onChange={(e) => setFormData({ ...formData, purchasePrice: e.target.value })}
                        placeholder="e.g. 5000000"
                        min="0"
                        className="input-luxury w-full pl-12 pr-4 py-3 rounded-xl"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Current Mileage */}
              <div>
                <h3 className="text-sm font-semibold text-obsidian/60 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gold" />
                  Current Status
                </h3>
                <div>
                  <label className="block text-sm font-semibold text-obsidian mb-2">Current Mileage (km)</label>
                  <input
                    type="number"
                    value={formData.currentMileage}
                    onChange={(e) => setFormData({ ...formData, currentMileage: e.target.value })}
                    placeholder="e.g. 50000"
                    min="0"
                    className="input-luxury w-full px-4 py-3 rounded-xl"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-6 border-t border-obsidian/5">
                <button
                  type="button"
                  onClick={() => navigate('/garage')}
                  className="flex-1 py-4 border-2 border-obsidian/10 text-obsidian font-semibold rounded-xl hover:bg-obsidian/5 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-luxury btn-gold flex-1 py-4 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-obsidian border-t-transparent rounded-full animate-spin"></div>
                      <span>Adding...</span>
                    </>
                  ) : (
                    <>
                      <span>Add Vehicle</span>
                      <Save className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </main>
  );
}
