import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Camera, Upload, X, Car, ArrowRight } from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

export default function SellPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [step, setStep] = useState(1);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    category: '', make: '', model: '', variant: '', year: '',
    price: '', negotiable: false, province: '', district: '', city: '',
    mileage: '', fuelType: '', transmission: '', engineCC: '',
    condition: '', description: ''
  });

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-ivory pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-obsidian mb-4">Sign in required</h1>
          <p className="text-obsidian/70 mb-6">You need to be signed in to list a vehicle.</p>
          <button onClick={() => navigate('/login')} className="px-6 py-3 bg-obsidian text-ivory rounded-full">
            Sign In
          </button>
        </div>
      </main>
    );
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    setLoading(true);
    try {
      const newImages: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!file.type.startsWith('image/')) continue;
        if (file.size > 5 * 1024 * 1024) {
          alert('Image size must be less than 5MB');
          continue;
        }
        const base64 = await api.uploadImage(file);
        newImages.push(base64);
      }
      setImages(prev => [...prev, ...newImages]);
    } catch (error) {
      alert('Failed to upload images');
    } finally {
      setLoading(false);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const vehicleData: any = {
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
        images: images.map((url, index) => ({
          url,
          order: index,
          isPrimary: index === 0
        }))
      };
      
      await api.createVehicle(vehicleData);
      alert('Vehicle saved as draft! You can publish it from your dashboard.');
      navigate('/dashboard');
    } catch (error: any) {
      alert('Failed to save vehicle: ' + error.message);
    } finally {
      setLoading(false);
    }
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
          >
            <span className="badge-luxury badge-gold mb-4 inline-flex">
              <Car className="w-4 h-4" />
              Sell Your Vehicle
            </span>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-ivory mb-4 tracking-tight">
              List Your
              <span className="block text-gradient-gold mt-2">Vehicle</span>
            </h1>
            <p className="text-xl text-ivory/70 max-w-2xl">
              Reach thousands of verified buyers on Nepal's premier automotive marketplace
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
          <div className="card-luxury p-8">
            {/* Form Header */}
            <div className="mb-8 pb-6 border-b border-obsidian/5">
              <h2 className="font-display text-2xl font-bold text-obsidian mb-2 flex items-center gap-3">
                <div className="w-1 h-8 bg-gradient-to-b from-gold to-gold-dark rounded-full"></div>
                Vehicle Information
              </h2>
              <p className="text-obsidian/70">Fill in the details below to list your vehicle</p>
            </div>

            {/* Step 1: Basic Info */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-obsidian mb-2">Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="input-luxury w-full px-4 py-3 rounded-xl"
                >
                  <option value="">Select category</option>
                  <option value="car">Car</option>
                  <option value="suv">SUV</option>
                  <option value="motorcycle">Motorcycle</option>
                  <option value="scooter">Scooter</option>
                  <option value="electric">Electric</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-obsidian mb-2">Make *</label>
                  <input
                    type="text"
                    value={formData.make}
                    onChange={(e) => setFormData({ ...formData, make: e.target.value })}
                    placeholder="e.g. Toyota"
                    className="input-luxury w-full px-4 py-3 rounded-xl"
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
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-obsidian mb-2">Year *</label>
                  <input
                    type="number"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    placeholder="e.g. 2022"
                    className="input-luxury w-full px-4 py-3 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-obsidian mb-2">Price (NPR) *</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="e.g. 5000000"
                    className="input-luxury w-full px-4 py-3 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-obsidian mb-2">Province *</label>
                  <select
                    value={formData.province}
                    onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                    className="input-luxury w-full px-4 py-3 rounded-xl"
                  >
                    <option value="">Select</option>
                    <option value="Bagmati">Bagmati</option>
                    <option value="Gandaki">Gandaki</option>
                    <option value="Lumbini">Lumbini</option>
                    <option value="Koshi">Koshi</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-obsidian mb-2">District</label>
                  <input
                    type="text"
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    placeholder="e.g. Kathmandu"
                    className="input-luxury w-full px-4 py-3 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-obsidian mb-2">City *</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g. Kathmandu"
                    className="input-luxury w-full px-4 py-3 rounded-xl"
                  />
                </div>
              </div>

              {/* Images */}
              <div>
                <label className="block text-sm font-semibold text-obsidian mb-2">Photos</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {images.map((img, index) => (
                    <div key={index} className="relative aspect-square bg-ivory-dark rounded-xl overflow-hidden group">
                      <img src={img} alt={`Vehicle ${index + 1}`} className="w-full h-full object-cover" />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-medium"
                        aria-label="Remove image"
                      >
                        <X className="w-4 h-4 text-obsidian" />
                      </button>
                      {index === 0 && (
                        <div className="absolute bottom-2 left-2 px-2 py-1 bg-gold/90 backdrop-blur-sm rounded-full">
                          <span className="text-xs font-semibold text-obsidian">Primary</span>
                        </div>
                      )}
                    </div>
                  ))}
                  <label className="aspect-square border-2 border-dashed border-obsidian/20 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-gold/50 hover:bg-gold/5 transition-all duration-300 group">
                    {loading ? (
                      <div className="w-10 h-10 border-3 border-gold border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Upload className="w-10 h-10 text-obsidian/30 mb-2 group-hover:text-gold transition-colors" />
                        <span className="text-sm font-medium text-obsidian/50 group-hover:text-obsidian/70 transition-colors">Upload Photos</span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={loading}
                    />
                  </label>
                </div>
                {images.length > 0 && (
                  <p className="text-xs text-obsidian/60 mt-2">
                    {images.length} photo{images.length !== 1 ? 's' : ''} uploaded. First photo will be the primary image.
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-obsidian mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  placeholder="Describe your vehicle's condition, features, and history..."
                  className="input-luxury w-full px-4 py-3 rounded-xl resize-none"
                />
              </div>

              <div className="pt-6 border-t border-obsidian/5">
                <button
                  onClick={handleSubmit}
                  disabled={loading || !formData.category || !formData.make || !formData.model || !formData.year || !formData.price || !formData.province || !formData.city}
                  className="btn-luxury btn-gold w-full py-4 rounded-xl font-semibold text-base disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-obsidian border-t-transparent rounded-full animate-spin"></div>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <span>Save as Draft</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
                <p className="text-xs text-obsidian/60 mt-3 text-center">
                  Your listing will be saved as a draft. You can publish it from your dashboard.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
