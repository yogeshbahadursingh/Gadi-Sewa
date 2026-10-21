import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  Car, Camera, MapPin, FileText, CheckCircle2, ChevronRight,
  ArrowRight, Upload, Shield, AlertCircle, Info
} from 'lucide-react';
import { categories, brands } from '../data/vehicles';
import { api } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const steps = [
  { id: 1, label: 'Vehicle Info', icon: <Car className="w-4 h-4" /> },
  { id: 2, label: 'Photos', icon: <Camera className="w-4 h-4" /> },
  { id: 3, label: 'Details', icon: <FileText className="w-4 h-4" /> },
  { id: 4, label: 'Review', icon: <CheckCircle2 className="w-4 h-4" /> },
];

export default function SellPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    category: '', make: '', model: '', variant: '', year: '',
    price: '', negotiable: false, province: '', district: '', city: '',
    mileage: '', fuelType: '', transmission: '', engineCC: '',
    condition: '', description: '', hasPassport: false,
  });

  const provinces = ['Bagmati', 'Gandaki', 'Lumbini', 'Koshi', 'Madhesh', 'Sudurpashchim', 'Karnali'];

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-ivory pt-20 lg:pt-24 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center">
          <h1 className="font-display text-2xl font-bold text-obsidian mb-4">Sign in required</h1>
          <p className="text-slate-warm mb-6">You need to be signed in to list a vehicle.</p>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-6 py-3 bg-obsidian text-ivory text-sm font-medium rounded-full hover:bg-emerald transition-colors"
          >
            Sign In
          </Link>
        </div>
      </main>
    );
  }

  const updateField = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <main className="min-h-screen bg-ivory pt-20 lg:pt-24">
      {/* Header */}
      <div className="bg-white border-b border-obsidian/[0.04]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-display text-3xl lg:text-4xl font-bold text-obsidian">
              List Your Vehicle
            </h1>
            <p className="text-slate-warm mt-2">
              Reach thousands of genuine buyers on Nepal's most trusted vehicle platform.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-10">
          <div className="flex items-center justify-between">
            {steps.map((step, i) => (
              <div key={step.id} className="flex items-center flex-1">
                <button
                  onClick={() => setCurrentStep(step.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                    currentStep === step.id
                      ? 'bg-obsidian text-ivory'
                      : currentStep > step.id
                      ? 'bg-emerald/10 text-emerald'
                      : 'bg-ivory-dark text-obsidian/40'
                  }`}
                >
                  {currentStep > step.id ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    step.icon
                  )}
                  <span className="hidden sm:inline">{step.label}</span>
                </button>
                {i < steps.length - 1 && (
                  <div className={`flex-1 h-[2px] mx-2 rounded ${
                    currentStep > step.id ? 'bg-emerald/30' : 'bg-obsidian/[0.06]'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentStep === 1 && (
              <div className="bg-white rounded-2xl border border-obsidian/[0.04] p-6 lg:p-8">
                <h2 className="font-display text-xl font-semibold text-obsidian mb-6">Vehicle Information</h2>
                
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-medium text-obsidian/60 uppercase tracking-wider mb-2 block">Category *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => updateField('category', e.target.value)}
                      className="w-full px-4 py-3 bg-ivory border border-obsidian/[0.06] rounded-xl text-sm outline-none focus:border-gold/40"
                    >
                      <option value="">Select category</option>
                      {categories.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                    </select>
                  </div>
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
                  <div>
                    <label className="text-xs font-medium text-obsidian/60 uppercase tracking-wider mb-2 block">Model *</label>
                    <input
                      type="text"
                      value={formData.model}
                      onChange={(e) => updateField('model', e.target.value)}
                      placeholder="e.g. Fortuner, CB500X"
                      className="w-full px-4 py-3 bg-ivory border border-obsidian/[0.06] rounded-xl text-sm outline-none focus:border-gold/40"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-obsidian/60 uppercase tracking-wider mb-2 block">Variant</label>
                    <input
                      type="text"
                      value={formData.variant}
                      onChange={(e) => updateField('variant', e.target.value)}
                      placeholder="e.g. Legender 4x4"
                      className="w-full px-4 py-3 bg-ivory border border-obsidian/[0.06] rounded-xl text-sm outline-none focus:border-gold/40"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-obsidian/60 uppercase tracking-wider mb-2 block">Year *</label>
                    <input
                      type="number"
                      value={formData.year}
                      onChange={(e) => updateField('year', e.target.value)}
                      placeholder="e.g. 2022"
                      className="w-full px-4 py-3 bg-ivory border border-obsidian/[0.06] rounded-xl text-sm outline-none focus:border-gold/40"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-obsidian/60 uppercase tracking-wider mb-2 block">Price (NPR) *</label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => updateField('price', e.target.value)}
                      placeholder="e.g. 5000000"
                      className="w-full px-4 py-3 bg-ivory border border-obsidian/[0.06] rounded-xl text-sm outline-none focus:border-gold/40"
                    />
                  </div>
                </div>

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
              </div>
            )}

            {currentStep === 2 && (
              <div className="bg-white rounded-2xl border border-obsidian/[0.04] p-6 lg:p-8">
                <h2 className="font-display text-xl font-semibold text-obsidian mb-2">Vehicle Photos</h2>
                <p className="text-sm text-slate-warm mb-6">Upload clear photos from multiple angles. Good photos help sell faster.</p>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  <div className="aspect-square border-2 border-dashed border-obsidian/10 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-gold/30 hover:bg-gold/[0.02] transition-colors">
                    <Upload className="w-8 h-8 text-obsidian/20 mb-2" />
                    <span className="text-xs text-obsidian/40">Upload Photo</span>
                  </div>
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="aspect-square bg-ivory-dark rounded-2xl flex items-center justify-center">
                      <Camera className="w-6 h-6 text-obsidian/10" />
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-ivory-warm rounded-xl flex items-start gap-3">
                  <Info className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-obsidian">Photo Tips</p>
                    <ul className="text-xs text-obsidian/60 mt-1 space-y-1">
                      <li>• Take photos in good daylight</li>
                      <li>• Include front, back, both sides, interior and odometer</li>
                      <li>• Photograph any existing damage honestly</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="bg-white rounded-2xl border border-obsidian/[0.04] p-6 lg:p-8">
                <h2 className="font-display text-xl font-semibold text-obsidian mb-6">Additional Details</h2>
                
                <div className="grid sm:grid-cols-2 gap-5">
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
                  <div>
                    <label className="text-xs font-medium text-obsidian/60 uppercase tracking-wider mb-2 block">City *</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => updateField('city', e.target.value)}
                      placeholder="e.g. Kathmandu"
                      className="w-full px-4 py-3 bg-ivory border border-obsidian/[0.06] rounded-xl text-sm outline-none focus:border-gold/40"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-obsidian/60 uppercase tracking-wider mb-2 block">Mileage (km)</label>
                    <input
                      type="number"
                      value={formData.mileage}
                      onChange={(e) => updateField('mileage', e.target.value)}
                      placeholder="e.g. 25000"
                      className="w-full px-4 py-3 bg-ivory border border-obsidian/[0.06] rounded-xl text-sm outline-none focus:border-gold/40"
                    />
                  </div>
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
                  <div>
                    <label className="text-xs font-medium text-obsidian/60 uppercase tracking-wider mb-2 block">Engine (cc)</label>
                    <input
                      type="number"
                      value={formData.engineCC}
                      onChange={(e) => updateField('engineCC', e.target.value)}
                      placeholder="e.g. 1500"
                      className="w-full px-4 py-3 bg-ivory border border-obsidian/[0.06] rounded-xl text-sm outline-none focus:border-gold/40"
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <label className="text-xs font-medium text-obsidian/60 uppercase tracking-wider mb-2 block">Description</label>
                  <textarea
                    rows={4}
                    value={formData.description}
                    onChange={(e) => updateField('description', e.target.value)}
                    placeholder="Describe your vehicle, its history, any modifications or defects..."
                    className="w-full px-4 py-3 bg-ivory border border-obsidian/[0.06] rounded-xl text-sm outline-none focus:border-gold/40 resize-none"
                  />
                </div>

                {/* Passport option */}
                <div className="mt-6 p-4 bg-emerald/[0.04] border border-emerald/20 rounded-xl">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-emerald flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-obsidian">Add Vehicle Passport</p>
                      <p className="text-xs text-obsidian/60 mt-1">
                        Vehicles with a Gadi-Sewa Vehicle Passport attract more serious buyers and build trust. 
                        Book an independent inspection to get yours.
                      </p>
                      <Link to="/inspect" className="inline-flex items-center gap-1 text-xs font-medium text-emerald mt-2 hover:text-emerald-light">
                        Learn about Vehicle Passport <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="bg-white rounded-2xl border border-obsidian/[0.04] p-6 lg:p-8">
                <h2 className="font-display text-xl font-semibold text-obsidian mb-6">Review Your Listing</h2>
                
                <div className="bg-ivory rounded-xl p-6 mb-6">
                  <div className="flex items-start justify-between mb-4 gap-4">
                    <div>
                      <h3 className="font-display text-lg font-semibold text-obsidian">
                        {formData.make && formData.model ? `${formData.make} ${formData.model}` : 'Vehicle listing'}
                      </h3>
                      <p className="text-sm text-slate-warm">
                        {[formData.year, formData.variant].filter(Boolean).join(' · ') || 'Details to be confirmed'}
                      </p>
                    </div>
                    <p className="font-display text-xl font-bold text-obsidian text-right">
                      {formData.price ? `रू ${Number(formData.price).toLocaleString('en-NP')}` : '—'}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
                    <div><span className="text-obsidian/40">Category:</span> <span className="text-obsidian">{formData.category || '—'}</span></div>
                    <div><span className="text-obsidian/40">Fuel:</span> <span className="text-obsidian">{formData.fuelType || '—'}</span></div>
                    <div><span className="text-obsidian/40">Transmission:</span> <span className="text-obsidian">{formData.transmission || '—'}</span></div>
                    <div><span className="text-obsidian/40">Condition:</span> <span className="text-obsidian">{formData.condition || '—'}</span></div>
                    <div><span className="text-obsidian/40">Location:</span> <span className="text-obsidian">{formData.city || formData.province || '—'}</span></div>
                    <div><span className="text-obsidian/40">Mileage:</span> <span className="text-obsidian">{formData.mileage ? `${Number(formData.mileage).toLocaleString()} km` : '—'}</span></div>
                  </div>
                </div>

                <div className="p-4 bg-gold/5 border border-gold/20 rounded-xl mb-6">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-gold" />
                    <p className="text-sm text-obsidian/70">
                      By publishing, you confirm that the information provided is accurate to the best of your knowledge.
                    </p>
                  </div>
                </div>

                <button
                  onClick={async () => {
                    setSaving(true);
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
                      
                      const vehicle = await api.createVehicle(vehicleData);
                      alert('Vehicle saved as draft! You can publish it from your dashboard.');
                      navigate('/dashboard');
                    } catch (error: any) {
                      alert('Failed to save vehicle: ' + error.message);
                    } finally {
                      setSaving(false);
                    }
                  }}
                  disabled={saving}
                  className="w-full py-4 bg-obsidian text-ivory text-sm font-bold rounded-xl hover:bg-emerald transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? 'Saving...' : 'Save as Draft'}
                  {!saving && <ArrowRight className="w-4 h-4" />}
                </button>
                <p className="text-center text-xs text-slate-warm mt-3">
                  Your listing will be saved as a draft. You can publish it from your dashboard.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="px-6 py-3 text-sm font-medium text-obsidian/60 hover:text-obsidian disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            ← Back
          </button>
          {currentStep < 4 && (
            <button
              onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
              className="px-6 py-3 bg-obsidian text-ivory text-sm font-medium rounded-xl hover:bg-emerald transition-colors flex items-center gap-2"
            >
              Continue <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
