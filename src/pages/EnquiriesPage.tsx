import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
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

  return (
    <main className="min-h-screen bg-ivory pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-4xl font-bold text-obsidian mb-8">My Enquiries</h1>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-obsidian/70">Loading enquiries...</p>
            </div>
          ) : enquiries.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center shadow-soft">
              <MessageCircle className="w-16 h-16 text-obsidian/10 mx-auto mb-4" />
              <h3 className="font-display text-xl font-bold text-obsidian mb-2">No enquiries yet</h3>
              <p className="text-obsidian/70 mb-6">When you enquire about vehicles, you'll see them here</p>
              <Link to="/listings" className="inline-flex items-center gap-2 px-6 py-3 bg-obsidian text-ivory rounded-full">
                Browse Vehicles
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {enquiries.map((enquiry) => (
                <div key={enquiry.id} className="bg-white rounded-2xl shadow-soft p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                          enquiry.status === 'NEW' ? 'bg-gold/10 text-gold-dark' :
                          enquiry.status === 'READ' ? 'bg-obsidian/10 text-obsidian/60' :
                          'bg-emerald/10 text-emerald'
                        }`}>
                          {enquiry.status}
                        </span>
                        <span className="text-xs text-obsidian/70">
                          {new Date(enquiry.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      {enquiry.vehicle && (
                        <Link to={`/vehicle/${enquiry.vehicle.id}`} className="block mb-2">
                          <h3 className="font-semibold text-obsidian hover:text-gold transition-colors">
                            {enquiry.vehicle.year} {enquiry.vehicle.make} {enquiry.vehicle.model}
                          </h3>
                        </Link>
                      )}
                      <p className="text-sm text-obsidian/70">{enquiry.message}</p>
                      {enquiry.offerAmount && (
                        <p className="text-sm font-semibold text-gold-dark mt-2">
                          Offer: रू {enquiry.offerAmount.toLocaleString('en-NP')}
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
