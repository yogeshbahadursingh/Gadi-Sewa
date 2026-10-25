import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ClipboardCheck, Calendar, MapPin, Eye, CheckCircle, Clock, AlertCircle, TrendingUp, DollarSign, Star, ArrowRight, Filter } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { api, Inspection } from '../services/api';

export default function InspectorDashboardPage() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [inspections, setInspections] = useState<Inspection[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'pending' | 'in-progress' | 'completed'>('pending');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    // Check if user is inspector
    if (!user?.roles.includes('INSPECTOR') && !user?.roles.includes('ADMIN')) {
      navigate('/dashboard');
      return;
    }

    loadInspections();
  }, [isAuthenticated, user]);

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
    if (activeTab === 'pending') return i.status === 'REQUESTED' || i.status === 'SCHEDULED';
    if (activeTab === 'in-progress') return i.status === 'IN_PROGRESS';
    if (activeTab === 'completed') return i.status === 'COMPLETED' || i.status === 'APPROVED';
    return true;
  });

  const stats = {
    total: inspections.length,
    pending: inspections.filter(i => i.status === 'REQUESTED' || i.status === 'SCHEDULED').length,
    inProgress: inspections.filter(i => i.status === 'IN_PROGRESS').length,
    completed: inspections.filter(i => i.status === 'COMPLETED' || i.status === 'APPROVED').length,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'REQUESTED': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'SCHEDULED': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'IN_PROGRESS': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'COMPLETED': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'APPROVED': return 'bg-green-50 text-green-700 border-green-200';
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
            className="flex items-center justify-between"
          >
            <div>
              <span className="badge-luxury badge-gold mb-4 inline-flex">
                <ClipboardCheck className="w-4 h-4" />
                Inspector Dashboard
              </span>
              <h1 className="font-display text-5xl md:text-6xl font-bold text-ivory mb-2 tracking-tight">
                Welcome,
                <span className="block text-gradient-gold mt-2">{user?.firstName}</span>
              </h1>
              <p className="text-xl text-ivory/70">
                Manage your inspection assignments and track performance
              </p>
            </div>
            <Link
              to="/inspect/queue"
              className="btn-luxury btn-gold px-8 py-4 text-base font-semibold rounded-full flex items-center gap-3 group"
            >
              <span>View Queue</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
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
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { label: 'Total Inspections', value: stats.total, icon: ClipboardCheck, color: 'from-gold/10 to-gold/5', iconColor: 'text-gold' },
              { label: 'Pending', value: stats.pending, icon: Clock, color: 'from-amber-500/10 to-amber-500/5', iconColor: 'text-amber-600' },
              { label: 'In Progress', value: stats.inProgress, icon: AlertCircle, color: 'from-purple-500/10 to-purple-500/5', iconColor: 'text-purple-600' },
              { label: 'Completed', value: stats.completed, icon: CheckCircle, color: 'from-emerald/10 to-emerald/5', iconColor: 'text-emerald' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="card-luxury p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center`}>
                    <stat.icon className={`w-7 h-7 ${stat.iconColor}`} />
                  </div>
                  <ArrowRight className="w-5 h-5 text-obsidian/20" />
                </div>
                <p className="text-3xl font-bold text-obsidian mb-1">{stat.value}</p>
                <p className="text-sm text-obsidian/60">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="card-luxury p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-gold/10 to-gold/5 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <p className="text-xs text-obsidian/60 uppercase tracking-wider">Completion Rate</p>
                  <p className="text-2xl font-bold text-obsidian">
                    {stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}%
                  </p>
                </div>
              </div>
              <div className="w-full bg-obsidian/5 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-gold to-gold-dark h-2 rounded-full transition-all duration-500"
                  style={{ width: `${stats.total > 0 ? (stats.completed / stats.total) * 100 : 0}%` }}
                ></div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="card-luxury p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald/10 to-emerald/5 rounded-xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-emerald" />
                </div>
                <div>
                  <p className="text-xs text-obsidian/60 uppercase tracking-wider">Average Rating</p>
                  <p className="text-2xl font-bold text-obsidian">4.8</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className={`w-4 h-4 ${star <= 4 ? 'fill-gold text-gold' : 'text-obsidian/20'}`} />
                ))}
                <span className="text-sm text-obsidian/60 ml-2">(128 reviews)</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="card-luxury p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-gold/10 to-gold/5 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <p className="text-xs text-obsidian/60 uppercase tracking-wider">This Month</p>
                  <p className="text-2xl font-bold text-obsidian">रू 45,000</p>
                </div>
              </div>
              <p className="text-sm text-emerald font-semibold">+12% from last month</p>
            </motion.div>
          </div>

          {/* Inspection Queue */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-3xl font-bold text-obsidian flex items-center gap-3">
                <div className="w-1 h-8 bg-gradient-to-b from-gold to-gold-dark rounded-full"></div>
                Inspection Queue
              </h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-obsidian/10 rounded-xl text-sm font-medium text-obsidian/70 hover:bg-obsidian/5 transition-colors">
                <Filter className="w-4 h-4" />
                Filter
              </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
              {[
                { id: 'pending', label: 'Pending', count: stats.pending },
                { id: 'in-progress', label: 'In Progress', count: stats.inProgress },
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
            {loading ? (
              <div className="card-luxury p-12 text-center">
                <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-obsidian/70">Loading inspections...</p>
              </div>
            ) : filteredInspections.length === 0 ? (
              <div className="card-luxury p-16 text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-obsidian/5 rounded-full flex items-center justify-center">
                  <ClipboardCheck className="w-10 h-10 text-obsidian/20" />
                </div>
                <h3 className="font-display text-2xl font-bold text-obsidian mb-3">
                  No {activeTab} inspections
                </h3>
                <p className="text-obsidian/70">
                  {activeTab === 'pending' && 'You have no pending inspection requests'}
                  {activeTab === 'in-progress' && 'You have no inspections in progress'}
                  {activeTab === 'completed' && 'You have no completed inspections yet'}
                </p>
              </div>
            ) : (
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
                          <span className="text-sm text-obsidian/60">
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
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4" />
                            {inspection.vehicle?.city}, {inspection.vehicle?.province}
                          </span>
                          {inspection.preferredDate && (
                            <span className="flex items-center gap-1.5">
                              <Calendar className="w-4 h-4" />
                              {new Date(inspection.preferredDate).toLocaleDateString('en-GB')}
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
                        <Link
                          to={`/vehicle/${inspection.vehicleId}`}
                          className="flex items-center gap-2 px-4 py-2 bg-ivory text-obsidian text-sm font-medium rounded-xl hover:bg-obsidian/5 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                          View Vehicle
                        </Link>
                        {inspection.status === 'REQUESTED' && (
                          <button
                            onClick={() => {
                              // TODO: Implement accept inspection
                              alert('Accept inspection functionality coming soon');
                            }}
                            className="flex items-center gap-2 px-4 py-2 bg-emerald text-ivory text-sm font-medium rounded-xl hover:bg-emerald-light transition-colors"
                          >
                            <CheckCircle className="w-4 h-4" />
                            Accept
                          </button>
                        )}
                        {inspection.status === 'SCHEDULED' && (
                          <Link
                            to={`/inspect/complete/${inspection.id}`}
                            className="flex items-center gap-2 px-4 py-2 bg-gold text-obsidian text-sm font-semibold rounded-xl hover:bg-gold-dark transition-colors"
                          >
                            <ClipboardCheck className="w-4 h-4" />
                            Start Inspection
                          </Link>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
