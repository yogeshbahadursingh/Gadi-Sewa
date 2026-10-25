import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Car, Shield, CheckCircle, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';

export default function InspectionBookingPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const vehicleId = searchParams.get('vehicleId');
  const { isAuthenticated, user } = useAuth();
  
  const [ownedVehicles, setOwnedVehicles] = useState<any[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<string>(vehicleId || '');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    loadVehicles();
  }, [isAuthenticated]);

  const loadVehicles = async () => {
    setLoading(true);
    try {
      const data = await api.getMyOwnedVehicles();
      setOwnedVehicles(data);
      if (vehicleId && data.find(v => v.id === vehicleId)) {
        setSelectedVehicle(vehicleId);
      }
    } catch (error) {
      console.error('Failed to load vehicles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedVehicle) {
      setError('Please select a vehicle');
      return;
    }
    if (!preferredDate) {
      setError('Please select a preferred date');
      return;
    }
    if (!location) {
      setError('Please enter inspection location');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      await api.requestInspection(selectedVehicle, preferredDate, notes);
      setSuccess(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
    } catch (error: any) {
      setError(error.message || 'Failed to book inspection');
    } finally {
      setSubmitting(false);
    }
  };

  const selectedVehicleData = ownedVehicles.find(v => v.id === selectedVehicle);

  if (loading) {
    return (
      <main className="min-h-screen bg-ivory flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-obsidian/70">Loading...</p>
        </div>
      </main>
    );
  }

  if (success) {
    return (
      <main className="min-h-screen bg-ivory flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card-luxury p-12 text-center max-w-md"
        >
          <div className="w-20 h-20 mx-auto mb-6 bg-emerald/10 rounded-full flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-emerald" />
          </div>
          <h2 className="font-display text-3xl font-bold text-obsidian mb-3">
            Inspection Booked!
          </h2>
          <p className="text-obsidian/70 mb-6">
            Your inspection request has been submitted successfully. An inspector will be assigned shortly.
          </p>
          <p className="text-sm text-obsidian/60">
            Redirecting to dashboard...
          </p>
        </motion.div>
      </main>
    );
  }

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
              <Shield className="w-4 h-4" />
              Vehicle Inspection
            </span>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-ivory mb-4 tracking-tight">
              Book an
              <span className="block text-gradient-gold mt-2">Inspection</span>
            </h1>
            <p className="text-xl text-ivory/70 max-w-2xl">
              Get your vehicle professionally inspected by certified inspectors
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container-luxury py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Booking Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="card-luxury p-8">
                <h2 className="font-display text-2xl font-bold text-obsidian mb-6 flex items-center gap-3">
                  <div className="w-1 h-8 bg-gradient-to-b from-gold to-gold-dark rounded-full"></div>
                  Inspection Details
                </h2>

                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-800">{error}</p>
                  </div>
                )}

                <div className="space-y-6">
                  {/* Vehicle Selection */}
                  <div>
                    <label className="block text-sm font-medium text-obsidian mb-3">
                      Select Vehicle *
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {ownedVehicles.map((vehicle) => (
                        <button
                          key={vehicle.id}
                          type="button"
                          onClick={() => setSelectedVehicle(vehicle.id)}
                          className={`p-4 rounded-xl border-2 transition-all text-left ${
                            selectedVehicle === vehicle.id
                              ? 'border-gold bg-gold/5'
                              : 'border-obsidian/10 hover:border-obsidian/20'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <Car className={`w-6 h-6 flex-shrink-0 ${
                              selectedVehicle === vehicle.id ? 'text-gold' : 'text-obsidian/40'
                            }`} />
                            <div className="flex-1">
                              <p className="font-semibold text-obsidian">
                                {vehicle.year} {vehicle.make} {vehicle.model}
                              </p>
                              {vehicle.registrationNumber && (
                                <p className="text-xs text-obsidian/60 mt-1">
                                  {vehicle.registrationNumber}
                                </p>
                              )}
                              <p className="text-xs text-obsidian/60 mt-1">
                                {vehicle.currentMileage.toLocaleString()} km
                              </p>
                            </div>
                            {selectedVehicle === vehicle.id && (
                              <CheckCircle className="w-5 h-5 text-gold" />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Date and Time */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-obsidian mb-2">
                        Preferred Date *
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-obsidian/40" />
                        <input
                          type="date"
                          value={preferredDate}
                          onChange={(e) => setPreferredDate(e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                          className="input-luxury w-full pl-10 pr-4 py-3 rounded-xl"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-obsidian mb-2">
                        Preferred Time
                      </label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-obsidian/40" />
                        <input
                          type="time"
                          value={preferredTime}
                          onChange={(e) => setPreferredTime(e.target.value)}
                          className="input-luxury w-full pl-10 pr-4 py-3 rounded-xl"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-sm font-medium text-obsidian mb-2">
                      Inspection Location *
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-obsidian/40" />
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="e.g. Kathmandu, Lalitpur"
                        className="input-luxury w-full pl-10 pr-4 py-3 rounded-xl"
                        required
                      />
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-sm font-medium text-obsidian mb-2">
                      Additional Notes
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={4}
                      placeholder="Any specific concerns or areas you'd like the inspector to focus on..."
                      className="input-luxury w-full px-4 py-3 rounded-xl resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-luxury btn-gold w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {submitting ? 'Booking...' : 'Book Inspection'}
                    {!submitting && <ArrowRight className="w-5 h-5" />}
                  </button>
                </div>
              </form>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="card-luxury p-6 sticky top-24">
                <h3 className="font-display text-lg font-bold text-obsidian mb-4">
                  What's Included
                </h3>
                <div className="space-y-3">
                  {[
                    '150+ point inspection checklist',
                    'Professional certified inspector',
                    'Detailed photo documentation',
                    'Comprehensive condition report',
                    'Digital Vehicle Passport (if approved)',
                    'Independent verification'
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-obsidian/70">{item}</span>
                    </div>
                  ))}
                </div>

                {selectedVehicleData && (
                  <div className="mt-6 pt-6 border-t border-obsidian/10">
                    <h4 className="font-semibold text-obsidian mb-3">Selected Vehicle</h4>
                    <div className="bg-ivory rounded-xl p-4">
                      <p className="font-semibold text-obsidian">
                        {selectedVehicleData.year} {selectedVehicleData.make} {selectedVehicleData.model}
                      </p>
                      {selectedVehicleData.registrationNumber && (
                        <p className="text-xs text-obsidian/60 mt-1">
                          {selectedVehicleData.registrationNumber}
                        </p>
                      )}
                      <p className="text-xs text-obsidian/60 mt-1">
                        {selectedVehicleData.currentMileage.toLocaleString()} km
                      </p>
                    </div>
                  </div>
                )}

                <div className="mt-6 pt-6 border-t border-obsidian/10">
                  <h4 className="font-semibold text-obsidian mb-3">Need Help?</h4>
                  <p className="text-sm text-obsidian/70 mb-3">
                    Our support team is available to assist you with the inspection booking process.
                  </p>
                  <button className="w-full py-2.5 border border-obsidian/10 text-obsidian text-sm font-medium rounded-xl hover:bg-obsidian/5 transition-colors">
                    Contact Support
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
