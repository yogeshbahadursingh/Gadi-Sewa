import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, AlertCircle } from 'lucide-react';
import { api, Vehicle } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { categories, brands } from '../data/vehicles';

export default function EditVehiclePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);

  const provinces = ['Bagmati', 'Gandaki', 'Lumbini', 'Koshi', 'Madhesh', 'Sudurpashchim', 'Karnali'];

  const [formData, setFormData] = useState({
    category: '',
    make: '',
    model: '',
    variant: '',
    year: '',
    price: '',
    negotiable: false,
    province: '',
    district: '',
    city: '',
    mileage: '',
    fuelType: '',
    transmission: '',
    engineCC: '',
    condition: '',
    description: '',
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    loadVehicle();
  }, [id, isAuthenticated]);

  const loadVehicle = async () => {
    if (!id) return;

    try {
      const data = await api.getVehicleById(id);
      if (data) {
        setVehicle(data);
        // Pre-populate form
        setFormData({
          category: data.category,
          make: data.make,
          model: data.model,
          variant: data.variant || '',
          year: data.year.toString(),
          price: data.price.toString(),
          negotiable: data.negotiable,
          province: data.province,
          district: data.district,
          city: data.city,
          mileage: data.mileage?.toString() || '',
          fuelType: data.fuelType || '',
          transmission: data.transmission || '',
          engineCC: data.engineCC?.toString() || '',
          condition: data.condition || '',
          description: data.description || '',
        });
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load vehicle');
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!id) return;

    // Validation
    if (!formData.category || !formData.make || !formData.model || !formData.year || !formData.price || !formData.province || !formData.city) {
      setError('Please fill in all required fields');
      return;
    }

    setSaving(true);
    setError('');

    try {
      const vehicleData = {
        category: formData.category,
        make: formData.make,
        model: formData.model,
        variant: formData.variant || undefined,
        year: parseInt(formData.year),
        price: parseInt(formData.price),
        negotiable: formData.negotiable,
        province: formData.province,
        district: formData.district || formData.province,
        city: formData.city,
        mileage: formData.mileage ? parseInt(formData.mileage) : undefined,
        fuelType: formData.fuelType || undefined,
        transmission: formData.transmission || undefined,
        engineCC: formData.engineCC ? parseInt(formData.engineCC) : undefined,
        condition: formData.condition || undefined,
        description: formData.description || undefined,
      };

      await api.updateVehicle(id, vehicleData);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to save vehicle');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-ivory pt-20 lg:pt-24 flex items-center justify-center">
        <p className="text-slate-warm">Loading vehicle...</p>
      </main>
    );
  }

  if (!vehicle) {
    return (
      <main className="min-h-screen bg-ivory pt-20 lg:pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-obsidian mb-4">Vehicle Not Found</h1>
          <p className="text-slate-warm mb-6">The vehicle you're trying to edit doesn't exist.</p>
          <Link to="/dashboard" className="px-6 py-3 bg-obsidian text-ivory text-sm font-medium rounded-full">
            Back to Dashboard
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-ivory pt-20 lg:pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="p-2 hover:bg-obsidian/5 rounded-lg transition-colors"
            aria-label="Back to dashboard"
          >
            <ArrowLeft className="w-5 h-5 text-obsidian" />
          </button>
          <div>
            <h1 className="font-display text-3xl font-bold text-obsidian">Edit Vehicle</h1>
            <p className="text-slate-warm mt-1">Update your vehicle listing</p>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-obsidian/[0.04] p-6 lg:p-8"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            {/* Category */}
            <div>
              <label className="text-xs font-medium text-obsidian/60 uppercase tracking-wider mb-2 block">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => updateField('category', e.target.value)}
                className="w-full px-4 py-3 bg-ivory border border-obsidian/[0.06] rounded-xl text-sm outline-none focus:border-gold/40"
              >
                <option value="">Select category</option>
                {categories.map(c => <option key={c.id} value={c.id.toUpperCase()}>{c.label}</option>)}
              </select>
            </div>

            {/* Make */}
            <div>
              <label className="text-xs font-medium text-obsidian/60 uppercase tracking-wider mb-2 block">Brand *</label>
              <select
                value={formData.make}
                onChange={(e) => updateField('make', e.target.value)}
                className="w-full px-4 py-3 bg-ivory border border-obsidian/[0.06] rounded-xl text-sm outline-none focus:border-gold/40"
              >
                <option value="">Select brand</option>
                {brands.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>

            {/* Model */}
            <div>
              <label className="text-xs font-medium text-obsidian/60 uppercase tracking-wider mb-2 block">Model *</label>
              <input
                type="text"
                value={formData.model}
                onChange={(e) => updateField('model', e.target.value)}
                className="w-full px-4 py-3 bg-ivory border border-obsidian/[0.06] rounded-xl text-sm outline-none focus:border-gold/40"
              />
            </div>

            {/* Variant */}
            <div>
              <label className="text-xs font-medium text-obsidian/60 uppercase tracking-wider mb-2 block">Variant</label>
              <input
                type="text"
                value={formData.variant}
                onChange={(e) => updateField('variant', e.target.value)}
                className="w-full px-4 py-3 bg-ivory border border-obsidian/[0.06] rounded-xl text-sm outline-none focus:border-gold/40"
              />
            </div>

            {/* Year */}
            <div>
              <label className="text-xs font-medium text-obsidian/60 uppercase tracking-wider mb-2 block">Year *</label>
              <input
                type="number"
                value={formData.year}
                onChange={(e) => updateField('year', e.target.value)}
                className="w-full px-4 py-3 bg-ivory border border-obsidian/[0.06] rounded-xl text-sm outline-none focus:border-gold/40"
              />
            </div>

            {/* Price */}
            <div>
              <label className="text-xs font-medium text-obsidian/60 uppercase tracking-wider mb-2 block">Price (NPR) *</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => updateField('price', e.target.value)}
                className="w-full px-4 py-3 bg-ivory border border-obsidian/[0.06] rounded-xl text-sm outline-none focus:border-gold/40"
              />
            </div>

            {/* Province */}
            <div>
              <label className="text-xs font-medium text-obsidian/60 uppercase tracking-wider mb-2 block">Province *</label>
              <select
                value={formData.province}
                onChange={(e) => updateField('province', e.target.value)}
                className="w-full px-4 py-3 bg-ivory border border-obsidian/[0.06] rounded-xl text-sm outline-none focus:border-gold/40"
              >
                <option value="">Select province</option>
                {provinces.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>

            {/* City */}
            <div>
              <label className="text-xs font-medium text-obsidian/60 uppercase tracking-wider mb-2 block">City *</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => updateField('city', e.target.value)}
                className="w-full px-4 py-3 bg-ivory border border-obsidian/[0.06] rounded-xl text-sm outline-none focus:border-gold/40"
              />
            </div>

            {/* Mileage */}
            <div>
              <label className="text-xs font-medium text-obsidian/60 uppercase tracking-wider mb-2 block">Mileage (km)</label>
              <input
                type="number"
                value={formData.mileage}
                onChange={(e) => updateField('mileage', e.target.value)}
                className="w-full px-4 py-3 bg-ivory border border-obsidian/[0.06] rounded-xl text-sm outline-none focus:border-gold/40"
              />
            </div>

            {/* Fuel Type */}
            <div>
              <label className="text-xs font-medium text-obsidian/60 uppercase tracking-wider mb-2 block">Fuel Type</label>
              <select
                value={formData.fuelType}
                onChange={(e) => updateField('fuelType', e.target.value)}
                className="w-full px-4 py-3 bg-ivory border border-obsidian/[0.06] rounded-xl text-sm outline-none focus:border-gold/40"
              >
                <option value="">Select fuel type</option>
                <option>Petrol</option>
                <option>Diesel</option>
                <option>Electric</option>
                <option>Hybrid</option>
              </select>
            </div>

            {/* Transmission */}
            <div>
              <label className="text-xs font-medium text-obsidian/60 uppercase tracking-wider mb-2 block">Transmission</label>
              <select
                value={formData.transmission}
                onChange={(e) => updateField('transmission', e.target.value)}
                className="w-full px-4 py-3 bg-ivory border border-obsidian/[0.06] rounded-xl text-sm outline-none focus:border-gold/40"
              >
                <option value="">Select transmission</option>
                <option>Automatic</option>
                <option>Manual</option>
              </select>
            </div>

            {/* Condition */}
            <div>
              <label className="text-xs font-medium text-obsidian/60 uppercase tracking-wider mb-2 block">Condition</label>
              <select
                value={formData.condition}
                onChange={(e) => updateField('condition', e.target.value)}
                className="w-full px-4 py-3 bg-ivory border border-obsidian/[0.06] rounded-xl text-sm outline-none focus:border-gold/40"
              >
                <option value="">Select condition</option>
                <option>Like New</option>
                <option>Excellent</option>
                <option>Very Good</option>
                <option>Good</option>
                <option>Fair</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="mt-5">
            <label className="text-xs font-medium text-obsidian/60 uppercase tracking-wider mb-2 block">Description</label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) => updateField('description', e.target.value)}
              className="w-full px-4 py-3 bg-ivory border border-obsidian/[0.06] rounded-xl text-sm outline-none focus:border-gold/40 resize-none"
            />
          </div>

          {/* Negotiable */}
          <div className="mt-5 flex items-center gap-3">
            <input
              type="checkbox"
              id="negotiable"
              checked={formData.negotiable}
              onChange={(e) => updateField('negotiable', e.target.checked)}
              className="w-4 h-4 rounded border-obsidian/20 text-gold focus:ring-gold"
            />
            <label htmlFor="negotiable" className="text-sm text-obsidian/70">Price is negotiable</label>
          </div>

          {/* Save button */}
          <div className="mt-8 flex gap-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex-1 py-3 border border-obsidian/10 text-obsidian text-sm font-medium rounded-xl hover:bg-obsidian/5 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 py-3 bg-obsidian text-ivory text-sm font-semibold rounded-xl hover:bg-emerald transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : 'Save Changes'}
              {!saving && <Save className="w-4 h-4" />}
            </button>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
