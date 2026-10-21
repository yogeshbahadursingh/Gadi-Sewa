import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageCircle, Send, Inbox } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { api, Enquiry } from '../services/api';
import { formatPrice } from '../data/vehicles';

export default function EnquiriesPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [sentEnquiries, setSentEnquiries] = useState<Enquiry[]>([]);
  const [receivedEnquiries, setReceivedEnquiries] = useState<Enquiry[]>([]);
  const [activeTab, setActiveTab] = useState<'sent' | 'received'>('sent');
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
      const [sent, received] = await Promise.all([
        api.getMyEnquiries(),
        api.getEnquiriesForMyVehicles()
      ]);
      setSentEnquiries(sent || []);
      setReceivedEnquiries(received || []);
    } catch (error) {
      console.error('Failed to load enquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  const enquiries = activeTab === 'sent' ? sentEnquiries : receivedEnquiries;

  return (
    <main className="min-h-screen bg-ivory pt-20 lg:pt-24">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-3xl font-bold text-obsidian flex items-center gap-3">
                <MessageCircle className="w-8 h-8 text-gold" />
                My Enquiries
              </h1>
              <p className="text-slate-warm mt-1">Manage your vehicle enquiries</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setActiveTab('sent')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                activeTab === 'sent'
                  ? 'bg-obsidian text-ivory'
                  : 'bg-white text-obsidian/70 hover:bg-obsidian/5'
              }`}
            >
              <Send className="w-4 h-4" />
              Sent ({sentEnquiries.length})
            </button>
            <button
              onClick={() => setActiveTab('received')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                activeTab === 'received'
                  ? 'bg-obsidian text-ivory'
                  : 'bg-white text-obsidian/70 hover:bg-obsidian/5'
              }`}
            >
              <Inbox className="w-4 h-4" />
              Received ({receivedEnquiries.length})
            </button>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-slate-warm">Loading enquiries...</p>
            </div>
          ) : enquiries.length === 0 ? (
            <div className="bg-white rounded-2xl border border-obsidian/[0.04] p-12 text-center">
              <MessageCircle className="w-16 h-16 text-obsidian/10 mx-auto mb-4" />
              <h3 className="font-display text-xl font-semibold text-obsidian mb-2">
                {activeTab === 'sent' ? 'No enquiries sent' : 'No enquiries received'}
              </h3>
              <p className="text-slate-warm mb-6">
                {activeTab === 'sent'
                  ? 'Start browsing and enquire about vehicles you\'re interested in'
                  : 'When buyers enquire about your vehicles, you\'ll see them here'}
              </p>
              {activeTab === 'sent' && (
                <Link
                  to="/listings"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-obsidian text-ivory text-sm font-medium rounded-full hover:bg-emerald transition-colors"
                >
                  Browse Vehicles
                </Link>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {enquiries.map((enquiry) => (
                <div key={enquiry.id} className="bg-white rounded-2xl border border-obsidian/[0.04] p-5 hover:shadow-[var(--shadow-soft)] transition-shadow">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                          enquiry.status === 'NEW'
                            ? 'bg-gold/10 text-gold-dark'
                            : enquiry.status === 'READ'
                            ? 'bg-obsidian/10 text-obsidian/60'
                            : enquiry.status === 'REPLIED'
                            ? 'bg-emerald/10 text-emerald'
                            : 'bg-obsidian/5 text-obsidian/40'
                        }`}>
                          {enquiry.status}
                        </span>
                        <span className="text-xs text-slate-warm">
                          {new Date(enquiry.createdAt).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </span>
                      </div>

                      {enquiry.vehicle && (
                        <Link
                          to={`/vehicle/${enquiry.vehicle.id}`}
                          className="block mb-3"
                        >
                          <h3 className="font-semibold text-obsidian hover:text-emerald transition-colors">
                            {enquiry.vehicle.year} {enquiry.vehicle.make} {enquiry.vehicle.model}
                          </h3>
                          <p className="text-sm text-slate-warm">
                            {formatPrice(enquiry.vehicle.price)}
                          </p>
                        </Link>
                      )}

                      <div className="bg-ivory rounded-xl p-3 mb-3">
                        <p className="text-sm text-obsidian/80">{enquiry.message}</p>
                        {enquiry.offerAmount && (
                          <p className="text-sm font-semibold text-gold-dark mt-2">
                            Offer: {formatPrice(enquiry.offerAmount)}
                          </p>
                        )}
                      </div>

                      {activeTab === 'sent' && enquiry.buyer && (
                        <p className="text-xs text-slate-warm">
                          Sent to seller
                        </p>
                      )}
                      {activeTab === 'received' && enquiry.buyer && (
                        <p className="text-xs text-slate-warm">
                          From: {enquiry.buyer.firstName} {enquiry.buyer.lastName} ({enquiry.buyer.email})
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </main>
  );
}
