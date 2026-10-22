import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, FileCheck, ArrowRight, CheckCircle, AlertCircle, Shield } from 'lucide-react';
import { api, Vehicle } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { formatPrice } from '../data/vehicles';

export default function InspectionBookingPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isAuthenticated, user } = useAuth();
  const vehicleId = searchParams.get('vehicleId');
  
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    preferredDate: '',
    notes: ''
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (vehicleId) {
      loadVehicle();
    } else {
      setLoading(false);
    }
  }, [vehicleId, isAuthenticated]);

  const loadVehicle = async () => {
    try {
      const v = await api.getVehicleById(vehicleId!);
      setVehicle(v);
    } catch (err: any) {
      setError('Failed to load vehicle details');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!vehicleId) {
      setError('No vehicle selected');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      await api.requestInspection(
        vehicleId,
        formData.preferredDate || undefined,
        formData.notes || undefined
      );
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Failed to request inspection');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-ivory pt-20 lg:pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-obsidian/60">Loading...</p>
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
              Inspection Requested
            </h1>
            <p className="text-slate-warm mb-6">
              Your inspection request has been submitted successfully. Our team will review and assign an inspector shortly.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/dashboard"
                className="px-6 py-3 bg-obsidian text-ivory text-sm font-medium rounded-full hover:bg-emerald transition-colors"
              >
                View My Requests
              </Link>
              <Link
                to="/listings"
                className="px-6 py-3 border border-obsidian/10 text-obsidian text-sm font-medium rounded-full hover:bg-obsidian/5 transition-colors"
              >
                Browse More Vehicles
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-ivory pt-20 lg:pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-display text-3xl lg:text-4xl font-bold text-obsidian">
            Request Vehicle Inspection
          </h1>
          <p className="text-slate-warm mt-2">
            Get an independent inspection before you buy
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

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Vehicle Info */}
          {vehicle && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-1"
            >
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
                      <FileCheck className="w-16 h-16" />
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
                    <div className="flex items-center gap-2 text-obsidian/70">
                      <MapPin className="w-4 h-4" />
                      <span>{vehicle.city}, {vehicle.province}</span>
                    </div>
                    {vehicle.mileage && (
                      <div className="flex items-center gap-2 text-obsidian/70">
                        <FileCheck className="w-4 h-4" />
                        <span>{vehicle.mileage.toLocaleString()} km</span>
                      </div>
                    )}
                  </div>
                  <div className="mt-4 pt-4 border-t border-obsidian/[0.04]">
                    <p className="text-xl font-bold text-obsidian">
                      {formatPrice(vehicle.price)}
                    </p>
                    {vehicle.negotiable && (
                      <p className="text-xs text-emerald mt-1">Negotiable</p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={vehicle ? 'lg:col-span-2' : 'lg:col-span-3'}
          >
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-obsidian/[0.04] p-6 lg:p-8">
              <h2 className="font-display text-xl font-semibold text-obsidian mb-6">
                Inspection Details
              </h2>

              <div className="space-y-5">
                {/* Preferred Date */}
                <div>
                  <label className="block text-sm font-medium text-obsidian mb-2">
                    Preferred Date (Optional)
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-warm" />
                    <input
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full pl-10 pr-4 py-3 bg-ivory border border-obsidian/[0.06] rounded-xl text-sm outline-none focus:border-gold/40 transition-colors"
                    />
                  </div>
                  <p className="text-xs text-slate-warm mt-1">
                    Leave blank for earliest availability
                  </p>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-obsidian mb-2">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={4}
                    placeholder="Any specific concerns or areas you'd like the inspector to focus on..."
                    className="w-full px-4 py-3 bg-ivory border border-obsidian/[0.06] rounded-xl text-sm outline-none focus:border-gold/40 transition-colors resize-none"
                  />
                </div>

                {/* What's Included */}
                <div className="bg-ivory-warm rounded-xl p-5">
                  <h3 className="text-sm font-semibold text-obsidian mb-3 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-gold" />
                    What's Included
                  </h3>
                  <ul className="space-y-2 text-sm text-obsidian/70">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald flex-shrink-0 mt-0.5" />
                      <span>150+ point professional inspection</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald flex-shrink-0 mt-0.5" />
                      <span>Photographic evidence of condition</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald flex-shrink-0 mt-0.5" />
                      <span>Detailed condition report</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald flex-shrink-0 mt-0.5" />
                      <span>Independent verification</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald flex-shrink-0 mt-0.5" />
                      <span>Digital Vehicle Passport (if approved)</span>
                    </li>
                  </ul>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-obsidian text-ivory text-sm font-semibold rounded-xl hover:bg-emerald transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Submitting...' : 'Request Inspection'}
                  {!submitting && <ArrowRight className="w-4 h-4" />}
                </button>

                <p className="text-xs text-slate-warm text-center">
                  By requesting an inspection, you agree to our inspection terms and conditions.
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
