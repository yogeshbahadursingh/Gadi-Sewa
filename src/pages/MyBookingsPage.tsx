import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { api, ServiceBooking } from '../services/api';

export default function MyBookingsPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [bookings, setBookings] = useState<ServiceBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'completed' | 'cancelled'>('all');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    loadBookings();
  }, [isAuthenticated]);

  const loadBookings = async () => {
    try {
      const data = await api.getMyServiceBookings();
      setBookings(data);
    } catch (error) {
      console.error('Failed to load bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId: string) => {
    if (!confirm('Are you sure you want to cancel this booking?')) return;

    try {
      await api.updateServiceBookingStatus(bookingId, 'CANCELLED', 'Cancelled by user');
      await loadBookings();
    } catch (error) {
      console.error('Failed to cancel booking:', error);
      alert('Failed to cancel booking');
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    if (filter === 'upcoming') {
      return ['PENDING', 'CONFIRMED', 'IN_PROGRESS'].includes(booking.status);
    }
    if (filter === 'completed') {
      return booking.status === 'COMPLETED';
    }
    if (filter === 'cancelled') {
      return booking.status === 'CANCELLED';
    }
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'CONFIRMED':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'IN_PROGRESS':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'COMPLETED':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'CANCELLED':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `रू ${(price / 10000000).toFixed(2)} Crore`;
    }
    if (price >= 100000) {
      return `रू ${(price / 100000).toFixed(2)} Lakh`;
    }
    return `रू ${price.toLocaleString('en-NP')}`;
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-ivory pt-20 lg:pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-obsidian/60">Loading bookings...</p>
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
          <h1 className="font-display text-3xl font-bold text-obsidian">My Service Bookings</h1>
          <p className="text-slate-warm mt-1">Manage your workshop appointments</p>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {[
            { id: 'all', label: 'All', count: bookings.length },
            {
              id: 'upcoming',
              label: 'Upcoming',
              count: bookings.filter((b) => ['PENDING', 'CONFIRMED', 'IN_PROGRESS'].includes(b.status)).length,
            },
            {
              id: 'completed',
              label: 'Completed',
              count: bookings.filter((b) => b.status === 'COMPLETED').length,
            },
            {
              id: 'cancelled',
              label: 'Cancelled',
              count: bookings.filter((b) => b.status === 'CANCELLED').length,
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                filter === tab.id ? 'bg-obsidian text-ivory' : 'bg-white text-obsidian/70 hover:bg-obsidian/5'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-obsidian/[0.04] p-12 text-center"
          >
            <Calendar className="w-16 h-16 text-obsidian/10 mx-auto mb-4" />
            <h3 className="font-display text-xl font-semibold text-obsidian mb-2">No bookings found</h3>
            <p className="text-slate-warm mb-6">
              {filter === 'all'
                ? "You haven't booked any services yet"
                : `No ${filter} bookings`}
            </p>
            <Link
              to="/workshops"
              className="inline-flex items-center gap-2 px-6 py-3 bg-obsidian text-ivory text-sm font-medium rounded-full hover:bg-emerald transition-colors"
            >
              Browse Workshops
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((booking, index) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl border border-obsidian/[0.04] p-5 hover:shadow-[var(--shadow-soft)] transition-shadow"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                      <span className="text-xs text-slate-warm">
                        Booked on {formatDate(booking.createdAt)}
                      </span>
                    </div>
                    <h3 className="font-semibold text-obsidian text-lg">{booking.serviceType}</h3>
                    {booking.description && (
                      <p className="text-sm text-obsidian/70 mt-1">{booking.description}</p>
                    )}
                  </div>
                  {booking.estimatedCost && (
                    <div className="text-right">
                      <p className="text-xs text-slate-warm">Estimated</p>
                      <p className="text-lg font-bold text-obsidian">{formatPrice(booking.estimatedCost)}</p>
                    </div>
                  )}
                </div>

                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2 text-obsidian/70">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(booking.scheduledDate)}</span>
                    {booking.scheduledTime && (
                      <>
                        <Clock className="w-4 h-4 ml-2" />
                        <span>{booking.scheduledTime}</span>
                      </>
                    )}
                  </div>
                  {booking.ownedVehicle && (
                    <div className="flex items-center gap-2 text-obsidian/70">
                      <span className="font-medium">Vehicle:</span>
                      <span>
                        {booking.ownedVehicle.year} {booking.ownedVehicle.make} {booking.ownedVehicle.model}
                      </span>
                    </div>
                  )}
                </div>

                {booking.workshopNotes && (
                  <div className="mt-3 p-3 bg-ivory-warm rounded-xl">
                    <p className="text-xs text-obsidian/60 mb-1">Workshop Notes:</p>
                    <p className="text-sm text-obsidian/80">{booking.workshopNotes}</p>
                  </div>
                )}

                {['PENDING', 'CONFIRMED'].includes(booking.status) && (
                  <div className="mt-4 pt-4 border-t border-obsidian/[0.04] flex gap-2">
                    <button
                      onClick={() => handleCancel(booking.id)}
                      className="flex items-center gap-2 px-4 py-2 border border-red-200 text-red-700 text-sm font-medium rounded-xl hover:bg-red-50 transition-colors"
                    >
                      <XCircle className="w-4 h-4" />
                      Cancel Booking
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
