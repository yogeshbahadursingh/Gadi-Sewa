import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle, Phone, MapPin, Clock, CheckCircle, XCircle, Truck } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { api, OwnedVehicle, RoadsideAssistanceRequest } from '../services/api';

export default function RoadsideAssistancePage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [ownedVehicles, setOwnedVehicles] = useState<OwnedVehicle[]>([]);
  const [requests, setRequests] = useState<RoadsideAssistanceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    ownedVehicleId: '',
    requestType: '',
    description: '',
    location: '',
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    loadData();
  }, [isAuthenticated]);

  const loadData = async () => {
    try {
      const [vehicles, assistanceRequests] = await Promise.all([
        api.getMyOwnedVehicles(),
        api.getMyAssistanceRequests(),
      ]);
      setOwnedVehicles(vehicles);
      setRequests(assistanceRequests);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.ownedVehicleId || !formData.requestType || !formData.description || !formData.location) {
      setError('Please fill in all required fields');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      await api.createAssistanceRequest({
        ownedVehicleId: formData.ownedVehicleId,
        requestType: formData.requestType as any,
        description: formData.description,
        location: formData.location,
      });
      setShowRequestForm(false);
      setFormData({
        ownedVehicleId: '',
        requestType: '',
        description: '',
        location: '',
      });
      await loadData();
    } catch (err: any) {
      setError(err.message || 'Failed to create request');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = async (requestId: string) => {
    if (!confirm('Are you sure you want to cancel this request?')) return;

    try {
      await api.cancelAssistanceRequest(requestId);
      await loadData();
    } catch (error) {
      console.error('Failed to cancel request:', error);
      alert('Failed to cancel request');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'ASSIGNED':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'EN_ROUTE':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'IN_PROGRESS':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'COMPLETED':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'CANCELLED':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getRequestTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      TOWING: 'Towing',
      BATTERY_JUMP_START: 'Battery Jump Start',
      TYRE_CHANGE: 'Tyre Change',
      FUEL_DELIVERY: 'Fuel Delivery',
      LOCKOUT_SERVICE: 'Lockout Service',
      MECHANICAL_BREAKDOWN: 'Mechanical Breakdown',
      ACCIDENT_RECOVERY: 'Accident Recovery',
      OTHER: 'Other',
    };
    return labels[type] || type;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
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

  return (
    <main className="min-h-screen bg-ivory pt-20 lg:pt-24">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-display text-3xl font-bold text-obsidian">Roadside Assistance</h1>
          <p className="text-slate-warm mt-1">Emergency help when you need it most</p>
        </motion.div>

        {/* Emergency Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8"
        >
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0" />
            <div className="flex-1">
              <h2 className="font-display text-xl font-bold text-red-900 mb-2">Emergency?</h2>
              <p className="text-sm text-red-800 mb-4">
                If you're in a dangerous situation, call emergency services first. For non-life-threatening roadside assistance, submit a request below.
              </p>
              <button
                onClick={() => setShowRequestForm(true)}
                className="px-6 py-3 bg-red-600 text-ivory text-sm font-semibold rounded-full hover:bg-red-700 transition-colors"
              >
                Request Assistance Now
              </button>
            </div>
          </div>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3"
          >
            <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-800">{error}</p>
          </motion.div>
        )}

        {/* Request Form Modal */}
        {showRequestForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-obsidian/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b border-obsidian/[0.04] p-6 flex items-center justify-between">
                <h2 className="font-display text-2xl font-bold text-obsidian">Request Assistance</h2>
                <button
                  onClick={() => setShowRequestForm(false)}
                  className="p-2 hover:bg-obsidian/5 rounded-lg transition-colors"
                >
                  <XCircle className="w-5 h-5 text-obsidian" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-medium text-obsidian mb-2">Vehicle *</label>
                  <select
                    value={formData.ownedVehicleId}
                    onChange={(e) => setFormData({ ...formData, ownedVehicleId: e.target.value })}
                    className="w-full px-4 py-3 bg-ivory border border-obsidian/[0.06] rounded-xl text-sm outline-none focus:border-gold/40"
                    required
                  >
                    <option value="">Select vehicle</option>
                    {ownedVehicles.map((vehicle) => (
                      <option key={vehicle.id} value={vehicle.id}>
                        {vehicle.year} {vehicle.make} {vehicle.model}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-obsidian mb-2">Type of Assistance *</label>
                  <select
                    value={formData.requestType}
                    onChange={(e) => setFormData({ ...formData, requestType: e.target.value })}
                    className="w-full px-4 py-3 bg-ivory border border-obsidian/[0.06] rounded-xl text-sm outline-none focus:border-gold/40"
                    required
                  >
                    <option value="">Select type</option>
                    <option value="TOWING">Towing</option>
                    <option value="BATTERY_JUMP_START">Battery Jump Start</option>
                    <option value="TYRE_CHANGE">Tyre Change</option>
                    <option value="FUEL_DELIVERY">Fuel Delivery</option>
                    <option value="LOCKOUT_SERVICE">Lockout Service</option>
                    <option value="MECHANICAL_BREAKDOWN">Mechanical Breakdown</option>
                    <option value="ACCIDENT_RECOVERY">Accident Recovery</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-obsidian mb-2">Your Location *</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-warm" />
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g. Near Koteshwor, Kathmandu"
                      className="w-full pl-10 pr-4 py-3 bg-ivory border border-obsidian/[0.06] rounded-xl text-sm outline-none focus:border-gold/40"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-obsidian mb-2">Describe the Issue *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    placeholder="Please describe your situation in detail..."
                    className="w-full px-4 py-3 bg-ivory border border-obsidian/[0.06] rounded-xl text-sm outline-none focus:border-gold/40 resize-none"
                    required
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowRequestForm(false)}
                    className="flex-1 py-3 border border-obsidian/10 text-obsidian text-sm font-medium rounded-xl hover:bg-obsidian/5 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 py-3 bg-red-600 text-ivory text-sm font-semibold rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Submitting...' : 'Submit Request'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}

        {/* Active Requests */}
        {requests.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="font-display text-xl font-semibold text-obsidian mb-4">Your Requests</h2>
            <div className="space-y-4">
              {requests.map((request) => (
                <div key={request.id} className="bg-white rounded-2xl border border-obsidian/[0.04] p-5">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getStatusColor(request.status)}`}>
                          {request.status}
                        </span>
                        <span className="text-xs text-slate-warm">{formatDate(request.createdAt)}</span>
                      </div>
                      <h3 className="font-semibold text-obsidian text-lg">{getRequestTypeLabel(request.requestType)}</h3>
                      <p className="text-sm text-obsidian/70 mt-1">{request.description}</p>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-obsidian/70">
                      <MapPin className="w-4 h-4" />
                      <span>{request.location}</span>
                    </div>
                  </div>

                  {request.provider && (
                    <div className="mt-3 p-3 bg-ivory-warm rounded-xl">
                      <p className="text-xs text-obsidian/60 mb-1">Assigned Provider:</p>
                      <p className="text-sm font-medium text-obsidian">{request.provider.name}</p>
                      {request.provider.phone && (
                        <a href={`tel:${request.provider.phone}`} className="text-xs text-gold-dark hover:text-gold flex items-center gap-1 mt-1">
                          <Phone className="w-3 h-3" />
                          {request.provider.phone}
                        </a>
                      )}
                    </div>
                  )}

                  {['PENDING', 'ASSIGNED'].includes(request.status) && (
                    <div className="mt-4 pt-4 border-t border-obsidian/[0.04]">
                      <button
                        onClick={() => handleCancel(request.id)}
                        className="flex items-center gap-2 px-4 py-2 border border-red-200 text-red-700 text-sm font-medium rounded-xl hover:bg-red-50 transition-colors"
                      >
                        <XCircle className="w-4 h-4" />
                        Cancel Request
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {requests.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl border border-obsidian/[0.04] p-12 text-center"
          >
            <Truck className="w-16 h-16 text-obsidian/10 mx-auto mb-4" />
            <h3 className="font-display text-xl font-semibold text-obsidian mb-2">No active requests</h3>
            <p className="text-slate-warm">You don't have any roadside assistance requests</p>
          </motion.div>
        )}
      </div>
    </main>
  );
}
