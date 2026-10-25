import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ClipboardCheck, Calendar, MapPin, Eye, CheckCircle, Clock, AlertCircle, ArrowRight, Filter, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { api, Inspection } from '../services/api';

export default function InspectionHistoryPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [inspections, setInspections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'completed'>('all');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    loadInspections();
  }, [isAuthenticated]);

  const loadInspections = async () => {
    try {
      const data = await api.getMyInspectionRequests();
      setInspections(data);
    } catch (error) {
      console.error('Failed to load inspections:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredInspections = inspections.filter(i => {
    if (activeTab === 'pending') return ['REQUESTED', 'SCHEDULED', 'IN_PROGRESS'].includes(i.status);
    if (activeTab === 'completed') return ['COMPLETED', 'APPROVED'].includes(i.status);
    return true;
  });

  const stats = {
    total: inspections.length,
    pending: inspections.filter(i => ['REQUESTED', 'SCHEDULED', 'IN_PROGRESS'].includes(i.status)).length,
    completed: inspections.filter(i => ['COMPLETED', 'APPROVED'].includes(i.status)).length,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'REQUESTED': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'SCHEDULED': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'IN_PROGRESS': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'COMPLETED': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'APPROVED': return 'bg-green-50 text-green-700 border-green-200';
      case 'REJECTED': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
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
              <ClipboardCheck className="w-4 h-4" />
              Inspection History
            </span>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-ivory mb-4 tracking-tight">
              My Inspections
            </h1>
            <p className="text-xl text-ivory/70 max-w-2xl">
              Track all your vehicle inspection requests and reports
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
          {inspections.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="card-luxury p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-gold/10 to-gold/5 rounded-2xl flex items-center justify-center">
                    <ClipboardCheck className="w-7 h-7 text-gold" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-obsidian/20" />
                </div>
                <p className="text-3xl font-bold text-obsidian mb-1">{stats.total}</p>
                <p className="text-sm text-obsidian/60">Total Inspections</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="card-luxury p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-amber-500/10 to-amber-500/5 rounded-2xl flex items-center justify-center">
                    <Clock className="w-7 h-7 text-amber-600" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-obsidian/20" />
                </div>
                <p className="text-3xl font-bold text-obsidian mb-1">{stats.pending}</p>
                <p className="text-sm text-obsidian/60">Pending</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="card-luxury p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald/10 to-emerald/5 rounded-2xl flex items-center justify-center">
                    <CheckCircle className="w-7 h-7 text-emerald" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-obsidian/20" />
                </div>
                <p className="text-3xl font-bold text-obsidian mb-1">{stats.completed}</p>
                <p className="text-sm text-obsidian/60">Completed</p>
              </motion.div>
            </div>
          )}

          {/* Content */}
          {loading ? (
            <div className="card-luxury p-12 text-center">
              <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-obsidian/70">Loading inspections...</p>
            </div>
          ) : inspections.length === 0 ? (
            <div className="card-luxury p-16 text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-obsidian/5 rounded-full flex items-center justify-center">
                <ClipboardCheck className="w-10 h-10 text-obsidian/20" />
              </div>
              <h3 className="font-display text-2xl font-bold text-obsidian mb-3">No inspections yet</h3>
              <p className="text-obsidian/70 mb-6 max-w-md mx-auto">
                You haven't requested any vehicle inspections yet. Book your first inspection to get started.
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
                  All Inspections
                </h2>
              </div>

              {/* Tabs */}
              <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
                {[
                  { id: 'all', label: 'All', count: stats.total },
                  { id: 'pending', label: 'Pending', count: stats.pending },
                  { id: 'completed', label: 'Completed', count: stats.completed },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-6 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                      activeTab === tab.id
                        ? 'bg-obsidian text-ivory shadow-medium'
                        : 'bg-white text-obsidian/70 hover:bg-obsidian/5'
                    }`}
                  >
                    {tab.label} ({tab.count})
                  </button>
                ))}
              </div>

              {/* Inspections List */}
              <div className="space-y-4 stagger-children">
                {filteredInspections.map((inspection, index) => (
                  <motion.div
                    key={inspection.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="card-luxury p-6 hover:shadow-ultra transition-all duration-300"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(inspection.status)}`}>
                            {inspection.status.replace('_', ' ')}
                          </span>
                          <span className="flex items-center gap-1.5 text-sm text-obsidian/60">
                            <Calendar className="w-4 h-4" />
                            {new Date(inspection.createdAt).toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </span>
                        </div>

                        {inspection.vehicle && (
                          <div className="mb-3">
                            <h3 className="font-display text-xl font-bold text-obsidian mb-1">
                              {inspection.vehicle.year} {inspection.vehicle.make} {inspection.vehicle.model}
                            </h3>
                            {inspection.vehicle.variant && (
                              <p className="text-sm text-obsidian/60">{inspection.vehicle.variant}</p>
                            )}
                          </div>
                        )}

                        <div className="flex items-center gap-4 text-sm text-obsidian/70">
                          {inspection.preferredDate && (
                            <span className="flex items-center gap-1.5">
                              <Calendar className="w-4 h-4" />
                              Preferred: {new Date(inspection.preferredDate).toLocaleDateString('en-GB')}
                            </span>
                          )}
                        </div>

                        {inspection.notes && (
                          <p className="text-sm text-obsidian/60 mt-3 italic">
                            "{inspection.notes}"
                          </p>
                        )}
                      </div>

                      <div className="flex flex-col gap-2">
                        {inspection.vehicle && (
                          <Link
                            to={`/vehicle/${inspection.vehicle.id}`}
                            className="flex items-center gap-2 px-4 py-2 bg-ivory text-obsidian text-sm font-medium rounded-xl hover:bg-obsidian/5 transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                            View Vehicle
                          </Link>
                        )}
                        {(inspection.status === 'COMPLETED' || inspection.status === 'APPROVED') && inspection.passportId && (
                          <Link
                            to={`/passport/${inspection.passportId}`}
                            className="flex items-center gap-2 px-4 py-2 bg-emerald text-ivory text-sm font-medium rounded-xl hover:bg-emerald-light transition-colors"
                          >
                            <Shield className="w-4 h-4" />
                            View Passport
                          </Link>
                        )}
                      </div>
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
