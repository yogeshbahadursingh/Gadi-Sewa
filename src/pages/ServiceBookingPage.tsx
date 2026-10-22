import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Wrench, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { api, Workshop, OwnedVehicle } from '../services/api';

export default function ServiceBookingPage() {
  const navigate = useNavigate();
  const { workshopId } = useParams();
  const { user, isAuthenticated } = useAuth();

  const [workshop, setWorkshop] = useState<Workshop | null>(null);
  const [ownedVehicles, setOwnedVehicles] = useState<OwnedVehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    ownedVehicleId: '',
    serviceType: '',
    scheduledDate: '',
    scheduledTime: '',
    description: '',
    estimatedCost: '',
    customerNotes: '',
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (workshopId) {
      loadData();
    }
  }, [workshopId, isAuthenticated]);

  const loadData = async () => {
    try {
      const workshopData = await api.getWorkshopById(workshopId!);
      setWorkshop(workshopData);

      const vehiclesData = await api.getMyOwnedVehicles();
      setOwnedVehicles(vehiclesData);
    } catch (err: any) {
      setError(err.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.ownedVehicleId || !formData.serviceType || !formData.scheduledDate) {
      setError('Please fill in all required fields');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      await api.createServiceBooking({
        ownedVehicleId: formData.ownedVehicleId,
        workshopId: workshopId!,
        serviceType: formData.serviceType,
        scheduledDate: formData.scheduledDate,
        scheduledTime: formData.scheduledTime || undefined,
        description: formData.description || undefined,
        estimatedCost: formData.estimatedCost ? parseInt(formData.estimatedCost) : undefined,
        customerNotes: formData.customerNotes || undefined,
      });
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Failed to create booking');
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
              Booking Confirmed!
            </h1>
            <p className="text-slate-warm mb-6">
              Your service appointment has been booked successfully. The workshop will contact you to confirm the details.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/my-bookings"
                className="px-6 py-3 bg-obsidian text-ivory text-sm font-medium rounded-full hover:bg-emerald transition-colors"
              >
                View My Bookings
              </Link>
              <Link
                to="/workshops"
                className="px-6 py-3 border border-obsidian/10 text-obsidian text-sm font-medium rounded-full hover:bg-obsidian/5 transition-colors"
              >
                Browse More Workshops
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
    );
  }

  if (!workshop) {
    return (
      <main className="min-h-screen bg-ivory pt-20 lg:pt-24 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="font-display text-2xl font-bold text-obsidian mb-4">Workshop Not Found</h1>
          <p className="text-slate-warm mb-6">{error || 'The workshop you\'re looking for doesn\'t exist.'}</p>
          <Link to="/workshops" className="px-6 py-3 bg-obsidian text-ivory text-sm font-medium rounded-full">
            Back to Workshops
          </Link>
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
          <button
            onClick={() => navigate(`/workshops/${workshopId}`)}
            className="flex items-center gap-2 text-obsidian/60 hover:text-obsidian mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back to Workshop</span>
          </button>
          <h1 className="font-display text-3xl font-bold text-obsidian">Book a Service</h1>
          <p className="text-slate-warm mt-2">{workshop.name}</p>
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

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-obsidian/[0.04] p-6 lg:p-8"
        >
          <div className="space-y-6">
            {/* Select Vehicle */}
            <div>
              <label className="block text-sm font-medium text-obsidian mb-2">
                Select Vehicle *
              </label>
              {ownedVehicles.length === 0 ? (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                  <p className="text-sm text-amber-800 mb-2">
                    You don't have any vehicles in your garage yet.
                  </p>
                  <Link to="/garage/add" className="text-sm font-medium text-gold-dark hover:text-gold">
                    Add a vehicle first →
                  </Link>
                </div>
              ) : (
                <select
                  value={formData.ownedVehicleId}
                  onChange={(e) => setFormData({ ...formData, ownedVehicleId: e.target.value })}
                  className="w-full px-4 py-3 bg-ivory border border-obsidian/[0.06] rounded-xl text-sm outline-none focus:border-gold/40 transition-colors"
                  required
                >
                  <option value="">Choose your vehicle</option>
                  {ownedVehicles.map((vehicle) => (
                    <option key={vehicle.id} value={vehicle.id}>
                      {vehicle.year} {vehicle.make} {vehicle.model} {vehicle.registrationNumber ? `(${vehicle.registrationNumber})` : ''}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Service Type */}
            <div>
              <label className="block text-sm font-medium text-obsidian mb-2">
                Service Type *
              </label>
              <select
                value={formData.serviceType}
                onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                className="w-full px-4 py-3 bg-ivory border border-obsidian/[0.06] rounded-xl text-sm outline-none focus:border-gold/40 transition-colors"
                required
              >
                <option value="">Select service</option>
                {workshop.services.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>

            {/* Date and Time */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-obsidian mb-2">
                  Preferred Date *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-warm" />
                  <input
                    type="date"
                    value={formData.scheduledDate}
                    onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full pl-10 pr-4 py-3 bg-ivory border border-obsidian/[0.06] rounded-xl text-sm outline-none focus:border-gold/40 transition-colors"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-obsidian mb-2">
                  Preferred Time
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-warm" />
                  <input
                    type="time"
                    value={formData.scheduledTime}
                    onChange={(e) => setFormData({ ...formData, scheduledTime: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-ivory border border-obsidian/[0.06] rounded-xl text-sm outline-none focus:border-gold/40 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-obsidian mb-2">
                Describe the Issue (Optional)
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                placeholder="Please describe the service you need or any issues you're experiencing..."
                className="w-full px-4 py-3 bg-ivory border border-obsidian/[0.06] rounded-xl text-sm outline-none focus:border-gold/40 transition-colors resize-none"
              />
            </div>

            {/* Estimated Cost */}
            <div>
              <label className="block text-sm font-medium text-obsidian mb-2">
                Estimated Budget (NPR, Optional)
              </label>
              <input
                type="number"
                value={formData.estimatedCost}
                onChange={(e) => setFormData({ ...formData, estimatedCost: e.target.value })}
                placeholder="e.g. 5000"
                min="0"
                className="w-full px-4 py-3 bg-ivory border border-obsidian/[0.06] rounded-xl text-sm outline-none focus:border-gold/40 transition-colors"
              />
            </div>

            {/* Customer Notes */}
            <div>
              <label className="block text-sm font-medium text-obsidian mb-2">
                Additional Notes (Optional)
              </label>
              <textarea
                value={formData.customerNotes}
                onChange={(e) => setFormData({ ...formData, customerNotes: e.target.value })}
                rows={2}
                placeholder="Any special instructions or preferences..."
                className="w-full px-4 py-3 bg-ivory border border-obsidian/[0.06] rounded-xl text-sm outline-none focus:border-gold/40 transition-colors resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting || ownedVehicles.length === 0}
              className="w-full py-4 bg-obsidian text-ivory text-sm font-semibold rounded-xl hover:bg-emerald transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Booking...' : 'Confirm Booking'}
              {!submitting && <Wrench className="w-4 h-4" />}
            </button>

            <p className="text-xs text-slate-warm text-center">
              By booking this service, you agree to the workshop's terms and conditions. The workshop will contact you to confirm the appointment.
            </p>
          </div>
        </motion.form>
      </div>
    </main>
  );
}
