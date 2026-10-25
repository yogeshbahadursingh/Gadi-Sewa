import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Upload, CheckCircle, AlertCircle, ArrowRight, Camera, FileText } from 'lucide-react';
import { api, Inspection, Vehicle } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { formatPrice } from '../data/vehicles';

export default function CompleteInspectionPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isAuthenticated, user } = useAuth();
  
  const [inspection, setInspection] = useState<any>(null);
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    findings: '',
    overallRating: '',
    estimatedValue: '',
    issues: '',
    photos: [] as string[]
  });

  const [checklist, setChecklist] = useState({
    engine: { status: '', notes: '' },
    transmission: { status: '', notes: '' },
    brakes: { status: '', notes: '' },
    suspension: { status: '', notes: '' },
    electrical: { status: '', notes: '' },
    body: { status: '', notes: '' },
    interior: { status: '', notes: '' },
    tyres: { status: '', notes: '' }
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!user?.roles.includes('INSPECTOR') && !user?.roles.includes('ADMIN')) {
      navigate('/dashboard');
      return;
    }

    if (id) {
      loadInspection();
    }
  }, [id, isAuthenticated, user]);

  const loadInspection = async () => {
    try {
      const inspections = await api.getAllInspections();
      const insp = inspections.find((i: any) => i.id === id);
      
      if (!insp) {
        setError('Inspection not found');
        setLoading(false);
        return;
      }
      
      // Verify inspector owns this inspection
      if (insp.inspectorId && insp.inspectorId !== user?.id && !user?.roles.includes('ADMIN')) {
        setError('Not authorized to complete this inspection');
        setLoading(false);
        return;
      }
      
      setInspection(insp);
      if (insp.vehicle) {
        setVehicle(insp.vehicle);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load inspection');
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      const newPhotos: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!file.type.startsWith('image/')) {
          alert('Please upload only image files');
          continue;
        }
        if (file.size > 5 * 1024 * 1024) {
          alert('Image size must be less than 5MB');
          continue;
        }
        const base64 = await api.uploadImage(file);
        newPhotos.push(base64);
      }
      setFormData(prev => ({ ...prev, photos: [...prev.photos, ...newPhotos] }));
    } catch (err) {
      alert('Failed to upload images');
    }
  };

  const removePhoto = (index: number) => {
    setFormData(prev => ({ ...prev, photos: prev.photos.filter((_, i) => i !== index) }));
  };

  const updateChecklist = (section: string, field: string, value: string) => {
    setChecklist(prev => ({
      ...prev,
      [section]: { ...prev[section as keyof typeof prev], [field]: value }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!id) return;

    // Validation
    if (!formData.findings.trim()) {
      setError('Please provide inspection findings');
      return;
    }
    if (!formData.overallRating) {
      setError('Please provide an overall rating');
      return;
    }
    if (formData.photos.length === 0) {
      setError('Please upload at least one photo');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      await api.submitInspection(id, {
        checklist,
        findings: formData.findings,
        photos: formData.photos,
        overallRating: formData.overallRating,
        estimatedValue: formData.estimatedValue ? parseInt(formData.estimatedValue) : undefined,
        issues: formData.issues ? formData.issues.split('\n').filter(i => i.trim()) : []
      });
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Failed to submit inspection');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-ivory pt-20 lg:pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-obsidian/60">Loading inspection...</p>
        </div>
      </main>
    );
  }

  if (success) {
    return (
      <main className="min-h-screen bg-ivory pt-20 lg:pt-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-obsidian/[0.04] p-8 text-center"
          >
            <div className="w-16 h-16 bg-emerald/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-emerald" />
            </div>
            <h1 className="font-display text-2xl font-bold text-obsidian mb-3">
              Inspection Submitted
            </h1>
            <p className="text-slate-warm mb-6">
              Your inspection report has been submitted successfully and is now pending review.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/inspect/dashboard"
                className="px-6 py-3 bg-obsidian text-ivory text-sm font-medium rounded-full hover:bg-emerald transition-colors"
              >
                Back to Dashboard
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
    );
  }

  if (!inspection || !vehicle) {
    return (
      <main className="min-h-screen bg-ivory pt-20 lg:pt-24 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="font-display text-2xl font-bold text-obsidian mb-4">Inspection Not Found</h1>
          <p className="text-slate-warm mb-6">{error || 'The inspection you\'re looking for doesn\'t exist.'}</p>
          <Link to="/inspect/dashboard" className="px-6 py-3 bg-obsidian text-ivory text-sm font-medium rounded-full">
            Back to Dashboard
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-ivory pt-20 lg:pt-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-display text-3xl font-bold text-obsidian">Complete Inspection</h1>
          <p className="text-slate-warm mt-2">
            {vehicle.year} {vehicle.make} {vehicle.model}
          </p>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-800">{error}</p>
          </motion.div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Vehicle Info */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-obsidian/[0.04] overflow-hidden sticky top-28">
                <div className="aspect-[4/3] bg-ivory-dark">
                  {vehicle.images && vehicle.images.length > 0 ? (
                    <img
                      src={vehicle.images[0].url}
                      alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-obsidian/20">
                      <FileText className="w-16 h-16" />
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h2 className="font-display text-lg font-semibold text-obsidian mb-2">
                    {vehicle.year} {vehicle.make} {vehicle.model}
                  </h2>
                  {vehicle.variant && (
                    <p className="text-sm text-slate-warm mb-3">{vehicle.variant}</p>
                  )}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-warm">Price:</span>
                      <span className="font-semibold text-obsidian">{formatPrice(vehicle.price)}</span>
                    </div>
                    {vehicle.mileage && (
                      <div className="flex justify-between">
                        <span className="text-slate-warm">Mileage:</span>
                        <span className="text-obsidian">{vehicle.mileage.toLocaleString()} km</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Inspection Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Checklist */}
              <div className="bg-white rounded-2xl border border-obsidian/[0.04] p-6">
                <h2 className="font-display text-xl font-semibold text-obsidian mb-6">Inspection Checklist</h2>
                <div className="space-y-4">
                  {Object.entries(checklist).map(([section, data]) => (
                    <div key={section} className="border-b border-obsidian/[0.04] pb-4 last:border-0 last:pb-0">
                      <label className="block text-sm font-medium text-obsidian mb-2 capitalize">
                        {section}
                      </label>
                      <div className="grid sm:grid-cols-2 gap-3">
                        <select
                          value={data.status}
                          onChange={(e) => updateChecklist(section, 'status', e.target.value)}
                          className="px-4 py-2.5 bg-ivory border border-obsidian/[0.06] rounded-xl text-sm outline-none focus:border-gold/40"
                          required
                        >
                          <option value="">Select status</option>
                          <option value="excellent">Excellent</option>
                          <option value="good">Good</option>
                          <option value="fair">Fair</option>
                          <option value="poor">Poor</option>
                          <option value="needs_repair">Needs Repair</option>
                        </select>
                        <input
                          type="text"
                          value={data.notes}
                          onChange={(e) => updateChecklist(section, 'notes', e.target.value)}
                          placeholder="Notes (optional)"
                          className="px-4 py-2.5 bg-ivory border border-obsidian/[0.06] rounded-xl text-sm outline-none focus:border-gold/40"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Findings */}
              <div className="bg-white rounded-2xl border border-obsidian/[0.04] p-6">
                <h2 className="font-display text-xl font-semibold text-obsidian mb-4">Overall Findings</h2>
                <textarea
                  value={formData.findings}
                  onChange={(e) => setFormData({ ...formData, findings: e.target.value })}
                  rows={5}
                  placeholder="Provide a detailed summary of the vehicle's condition..."
                  className="w-full px-4 py-3 bg-ivory border border-obsidian/[0.06] rounded-xl text-sm outline-none focus:border-gold/40 resize-none"
                  required
                />
              </div>

              {/* Rating & Value */}
              <div className="bg-white rounded-2xl border border-obsidian/[0.04] p-6">
                <h2 className="font-display text-xl font-semibold text-obsidian mb-4">Assessment</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-obsidian mb-2">Overall Rating *</label>
                    <select
                      value={formData.overallRating}
                      onChange={(e) => setFormData({ ...formData, overallRating: e.target.value })}
                      className="w-full px-4 py-3 bg-ivory border border-obsidian/[0.06] rounded-xl text-sm outline-none focus:border-gold/40"
                      required
                    >
                      <option value="">Select rating</option>
                      <option value="excellent">Excellent - Like new condition</option>
                      <option value="very_good">Very Good - Minor wear only</option>
                      <option value="good">Good - Normal wear for age</option>
                      <option value="fair">Fair - Some issues present</option>
                      <option value="poor">Poor - Significant issues</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-obsidian mb-2">Estimated Value (NPR)</label>
                    <input
                      type="number"
                      value={formData.estimatedValue}
                      onChange={(e) => setFormData({ ...formData, estimatedValue: e.target.value })}
                      placeholder="Optional"
                      className="w-full px-4 py-3 bg-ivory border border-obsidian/[0.06] rounded-xl text-sm outline-none focus:border-gold/40"
                    />
                  </div>
                </div>
              </div>

              {/* Issues */}
              <div className="bg-white rounded-2xl border border-obsidian/[0.04] p-6">
                <h2 className="font-display text-xl font-semibold text-obsidian mb-4">Issues & Concerns</h2>
                <textarea
                  value={formData.issues}
                  onChange={(e) => setFormData({ ...formData, issues: e.target.value })}
                  rows={4}
                  placeholder="List any issues or concerns (one per line)..."
                  className="w-full px-4 py-3 bg-ivory border border-obsidian/[0.06] rounded-xl text-sm outline-none focus:border-gold/40 resize-none"
                />
              </div>

              {/* Photos */}
              <div className="bg-white rounded-2xl border border-obsidian/[0.04] p-6">
                <h2 className="font-display text-xl font-semibold text-obsidian mb-4">Evidence Photos *</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                  {formData.photos.map((photo, index) => (
                    <div key={index} className="relative aspect-square bg-ivory-dark rounded-xl overflow-hidden group">
                      <img src={photo} alt={`Evidence ${index + 1}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removePhoto(index)}
                        className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <AlertCircle className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  ))}
                  <label className="aspect-square border-2 border-dashed border-obsidian/10 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-gold/30 hover:bg-gold/[0.02] transition-colors">
                    <Upload className="w-8 h-8 text-obsidian/20 mb-2" />
                    <span className="text-xs text-obsidian/40">Upload Photos</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handlePhotoUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </label>
                </div>
                <p className="text-xs text-slate-warm">
                  Upload clear photos showing the vehicle's condition. Minimum 1 photo required.
                </p>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-obsidian text-ivory text-sm font-semibold rounded-xl hover:bg-emerald transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Submitting...' : 'Submit Inspection Report'}
                {!submitting && <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
