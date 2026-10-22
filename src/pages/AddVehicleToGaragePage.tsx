import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';

export default function AddVehicleToGaragePage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  
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

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.make || !formData.model || !formData.year) {
      setError('Please fill in make, model, and year');
      return;
    }

    setSaving(true);
    setError('');

    try {
      const vehicleData = {
        make: formData.make,
        model: formData.model,
        year: parseInt(formData.year),
        registrationNumber: formData.registrationNumber || undefined,
        vin: formData.vin || undefined,
        purchaseDate: formData.purchaseDate || undefined,
        purchasePrice: formData.purchasePrice ? parseInt(formData.purchasePrice) : undefined,
        currentMileage: formData.currentMileage ? parseInt(formData.currentMileage) : 0
      };

      await api.addOwnedVehicle(vehicleData);
      navigate('/garage');
    } catch (err: any) {
      setError(err.message || 'Failed to add vehicle');
    } finally {
      setSaving(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-ivory pt-20 lg:pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-obsidian mb-4">Sign in required</h1>
          <p className="text-slate-warm mb-6">You need to be signed in to add vehicles to your garage.</p>
          <Link to="/login" className="px-6 py-3 bg-obsidian text-ivory text-sm font-medium rounded-full">
            Sign In
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-ivory pt-20 lg:pt-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/garage')}
            className="p-2 hover:bg-obsidian/5 rounded-lg transition-colors"
            aria-label="Back to garage"
          >
            <ArrowLeft className="w-5 h-5 text-obsidian" />
          </button>
          <div>
            <h1 className="font-display text-3xl font-bold text-obsidian">Add Vehicle to Garage</h1>
            <p className="text-slate-warm mt-1">Add your vehicle to track maintenance and expenses</p>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-obsidian/[0.04] p-6 lg:p-8"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="text-xs font-medium text-obsidian/60 uppercase tracking-wider mb-2 block">Make *</label>
              <input
                type="text"
                value={formData.make}
                onChange={(e) => updateField('make', e.target.value)}
                placeholder="e.g. Toyota"
                className="w-full px-4 py-3 bg-ivory border border-obsidian/[0.06] rounded-xl text-sm outline-none focus:border-gold/40"
                required
              />
            </div>

            <div>
              <label className="text-xs font-medium text-obsidian/60 uppercase tracking-wider mb-2 block">Model *</label>
              <input
                type="text"
                value={formData.model}
                onChange={(e) => updateField('model', e.target.value)}
                placeholder="e.g. Fortuner"
                className="w-full px-4 py-3 bg-ivory border border-obsidian/[0.06] rounded-xl text-sm outline-none focus:border-gold/40"
                required
              />
            </div>

            <div>
              <label className="text-xs font-medium text-obsidian/60 uppercase tracking-wider mb-2 block">Year *</label>
              <input
                type="number"
                value={formData.year}
                onChange={(e) => updateField('year', e.target.value)}
                placeholder="e.g. 2022"
                min="1900"
                max="2030"
                className="w-full px-4 py-3 bg-ivory border border-obsidian/[0.06] rounded-xl text-sm outline-none focus:border-gold/40"
                required
              />
            </div>

            <div>
              <label className="text-xs font-medium text-obsidian/60 uppercase tracking-wider mb-2 block">Registration Number</label>
              <input
                type="text"
                value={formData.registrationNumber}
                onChange={(e) => updateField('registrationNumber', e.target.value)}
                placeholder="e.g. Ba 1 Pa 1234"
                className="w-full px-4 py-3 bg-ivory border border-obsidian/[0.06] rounded-xl text-sm outline-none focus:border-gold/40"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-obsidian/60 uppercase tracking-wider mb-2 block">VIN (Optional)</label>
              <input
                type="text"
                value={formData.vin}
                onChange={(e) => updateField('vin', e.target.value)}
                placeholder="Vehicle Identification Number"
                className="w-full px-4 py-3 bg-ivory border border-obsidian/[0.06] rounded-xl text-sm outline-none focus:border-gold/40"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-obsidian/60 uppercase tracking-wider mb-2 block">Current Mileage (km)</label>
              <input
                type="number"
                value={formData.currentMileage}
                onChange={(e) => updateField('currentMileage', e.target.value)}
                placeholder="e.g. 50000"
                min="0"
                className="w-full px-4 py-3 bg-ivory border border-obsidian/[0.06] rounded-xl text-sm outline-none focus:border-gold/40"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-obsidian/60 uppercase tracking-wider mb-2 block">Purchase Date</label>
              <input
                type="date"
                value={formData.purchaseDate}
                onChange={(e) => updateField('purchaseDate', e.target.value)}
                className="w-full px-4 py-3 bg-ivory border border-obsidian/[0.06] rounded-xl text-sm outline-none focus:border-gold/40"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-obsidian/60 uppercase tracking-wider mb-2 block">Purchase Price (NPR)</label>
              <input
                type="number"
                value={formData.purchasePrice}
                onChange={(e) => updateField('purchasePrice', e.target.value)}
                placeholder="e.g. 5000000"
                min="0"
                className="w-full px-4 py-3 bg-ivory border border-obsidian/[0.06] rounded-xl text-sm outline-none focus:border-gold/40"
              />
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            <button
              type="button"
              onClick={() => navigate('/garage')}
              className="flex-1 py-3 border border-obsidian/10 text-obsidian text-sm font-medium rounded-xl hover:bg-obsidian/5 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-3 bg-obsidian text-ivory text-sm font-semibold rounded-xl hover:bg-emerald transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : 'Add Vehicle'}
              {!saving && <Save className="w-4 h-4" />}
            </button>
          </div>
        </motion.form>
      </div>
    </main>
  );
}
