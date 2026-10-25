import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageCircle, ArrowRight, Eye, Calendar, DollarSign, Clock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';

export default function EnquiriesPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    loadEnquiries();
  }, [isAuthenticated]);

  const loadEnquiries = async () => {
    try {
      const data = await api.getMyEnquiries();
      setEnquiries(data);
    } catch (error) {
      console.error('Failed to load enquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    if (price >= 10000000) return `रू ${(price / 10000000).toFixed(2)} Crore`;
    if (price >= 100000) return `रू ${(price / 100000).toFixed(2)} Lakh`;
    return `रू ${price.toLocaleString('en-NP')}`;
  };

  const stats = {
    total: enquiries.length,
    new: enquiries.filter(e => e.status === 'NEW').length,
    replied: enquiries.filter(e => e.status === 'REPLIED').length,
    totalOffers: enquiries.reduce((sum, e) => sum + (e.offerAmount || 0), 0),
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
              <MessageCircle className="w-4 h-4" />
              Communication
            </span>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-ivory mb-4 tracking-tight">
              My Enquiries
            </h1>
            <p className="text-xl text-ivory/70 max-w-2xl">
              Track all your vehicle enquiries and offers in one place
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
          {/* Stats Grid */}
          {enquiries.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="card-luxury p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-gold/10 to-gold/5 rounded-2xl flex items-center justify-center">
                    <MessageCircle className="w-7 h-7 text-gold" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-obsidian/20" />
                </div>
                <p className="text-3xl font-bold text-obsidian mb-1">{stats.total}</p>
                <p className="text-sm text-obsidian/60">Total Enquiries</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="card-luxury p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald/10 to-emerald/5 rounded-2xl flex items-center justify-center">
                    <Eye className="w-7 h-7 text-emerald" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-obsidian/20" />
                </div>
                <p className="text-3xl font-bold text-obsidian mb-1">{stats.new}</p>
                <p className="text-sm text-obsidian/60">New Enquiries</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="card-luxury p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-obsidian/10 to-obsidian/5 rounded-2xl flex items-center justify-center">
                    <Clock className="w-7 h-7 text-obsidian" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-obsidian/20" />
                </div>
                <p className="text-3xl font-bold text-obsidian mb-1">{stats.replied}</p>
                <p className="text-sm text-obsidian/60">Replied</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="card-luxury p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-gold/10 to-gold/5 rounded-2xl flex items-center justify-center">
                    <DollarSign className="w-7 h-7 text-gold" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-obsidian/20" />
                </div>
                <p className="text-3xl font-bold text-obsidian mb-1">{formatPrice(stats.totalOffers)}</p>
                <p className="text-sm text-obsidian/60">Total Offers</p>
              </motion.div>
            </div>
          )}

          {/* Content */}
          {loading ? (
            <div className="card-luxury p-12 text-center">
              <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-obsidian/70">Loading enquiries...</p>
            </div>
          ) : enquiries.length === 0 ? (
            <div className="card-luxury p-16 text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-obsidian/5 rounded-full flex items-center justify-center">
                <MessageCircle className="w-10 h-10 text-obsidian/20" />
              </div>
              <h3 className="font-display text-2xl font-bold text-obsidian mb-3">No enquiries yet</h3>
              <p className="text-obsidian/70 mb-6 max-w-md mx-auto">
                When you enquire about vehicles, your messages and offers will appear here for easy tracking.
              </p>
              <Link
                to="/listings"
                className="btn-luxury btn-gold px-8 py-4 rounded-full font-semibold inline-flex items-center gap-2"
              >
                <span>Browse Vehicles</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-3xl font-bold text-obsidian flex items-center gap-3">
                  <div className="w-1 h-8 bg-gradient-to-b from-gold to-gold-dark rounded-full"></div>
                  All Enquiries
                </h2>
              </div>

              <div className="space-y-4 stagger-children">
                {enquiries.map((enquiry, index) => (
                  <motion.div
                    key={enquiry.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="card-luxury p-6 hover:shadow-ultra transition-all duration-300"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        {/* Status and Date */}
                        <div className="flex items-center gap-3 mb-3">
                          <span className={`badge-luxury ${
                            enquiry.status === 'NEW' ? 'badge-gold' :
                            enquiry.status === 'READ' ? 'badge-obsidian' :
                            'badge-emerald'
                          } text-xs`}>
                            {enquiry.status === 'NEW' && <Eye className="w-3 h-3" />}
                            {enquiry.status === 'REPLIED' && <MessageCircle className="w-3 h-3" />}
                            {enquiry.status}
                          </span>
                          <span className="flex items-center gap-1.5 text-sm text-obsidian/60">
                            <Calendar className="w-4 h-4" />
                            {new Date(enquiry.createdAt).toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </span>
                        </div>

                        {/* Vehicle Info */}
                        {enquiry.vehicle && (
                          <Link to={`/vehicle/${enquiry.vehicle.id}`} className="block mb-3 group">
                            <h3 className="font-display text-xl font-bold text-obsidian group-hover:text-gradient-gold transition-all duration-300">
                              {enquiry.vehicle.year} {enquiry.vehicle.make} {enquiry.vehicle.model}
                            </h3>
                            {enquiry.vehicle.variant && (
                              <p className="text-sm text-obsidian/60 mt-1">{enquiry.vehicle.variant}</p>
                            )}
                          </Link>
                        )}

                        {/* Message */}
                        <div className="bg-ivory rounded-xl p-4 mb-3">
                          <p className="text-sm text-obsidian/80 leading-relaxed">{enquiry.message}</p>
                        </div>

                        {/* Offer */}
                        {enquiry.offerAmount && (
                          <div className="flex items-center gap-2 pt-3 border-t border-obsidian/5">
                            <DollarSign className="w-4 h-4 text-gold" />
                            <span className="text-sm font-semibold text-gold-dark">
                              Offer: {formatPrice(enquiry.offerAmount)}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Vehicle Image */}
                      {enquiry.vehicle && enquiry.vehicle.images && enquiry.vehicle.images.length > 0 && (
                        <Link to={`/vehicle/${enquiry.vehicle.id}`} className="flex-shrink-0">
                          <div className="w-24 h-24 rounded-xl overflow-hidden bg-obsidian/5">
                            <img
                              src={enquiry.vehicle.images[0].url}
                              alt={`${enquiry.vehicle.make} ${enquiry.vehicle.model}`}
                              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                        </Link>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </motion.div>
      </div>
    </main>
  );
}
