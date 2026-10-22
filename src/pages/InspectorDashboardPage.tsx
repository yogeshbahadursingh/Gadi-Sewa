import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, FileCheck, Eye, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { api, Inspection, Vehicle } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { formatPrice } from '../data/vehicles';

export default function InspectorDashboardPage() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [inspections, setInspections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'assigned' | 'completed'>('assigned');

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
      const data = await api.getAllInspections();
      setInspections(data);
    } catch (error) {
      console.error('Failed to load inspections:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredInspections = inspections.filter(i => {
    if (filter === 'assigned') {
      return i.inspectorId === user?.id && !['COMPLETED', 'APPROVED', 'REJECTED'].includes(i.status);
    }
    if (filter === 'completed') {
      return i.inspectorId === user?.id && ['COMPLETED', 'APPROVED', 'REJECTED'].includes(i.status);
    }
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'REQUESTED': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'SCHEDULED': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'IN_PROGRESS': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'COMPLETED': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'APPROVED': return 'bg-green-50 text-green-700 border-green-200';
      case 'REJECTED': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-ivory pt-20 lg:pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-obsidian/60">Loading inspections...</p>
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
          <h1 className="font-display text-3xl font-bold text-obsidian">Inspector Dashboard</h1>
          <p className="text-slate-warm mt-1">Manage your assigned inspections</p>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setFilter('assigned')}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              filter === 'assigned'
                ? 'bg-obsidian text-ivory'
                : 'bg-white text-obsidian/70 hover:bg-obsidian/5'
            }`}
          >
            My Assignments ({inspections.filter(i => i.inspectorId === user?.id && !['COMPLETED', 'APPROVED', 'REJECTED'].includes(i.status)).length})
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              filter === 'completed'
                ? 'bg-obsidian text-ivory'
                : 'bg-white text-obsidian/70 hover:bg-obsidian/5'
            }`}
          >
            Completed ({inspections.filter(i => i.inspectorId === user?.id && ['COMPLETED', 'APPROVED', 'REJECTED'].includes(i.status)).length})
          </button>
          {user?.roles.includes('ADMIN') && (
            <button
              onClick={() => setFilter('all')}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-obsidian text-ivory'
                  : 'bg-white text-obsidian/70 hover:bg-obsidian/5'
              }`}
            >
              All Inspections ({inspections.length})
            </button>
          )}
        </div>

        {/* Inspections List */}
        {filteredInspections.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-obsidian/[0.04] p-12 text-center"
          >
            <FileCheck className="w-16 h-16 text-obsidian/10 mx-auto mb-4" />
            <h3 className="font-display text-xl font-semibold text-obsidian mb-2">
              {filter === 'assigned' ? 'No assigned inspections' : 'No completed inspections'}
            </h3>
            <p className="text-slate-warm">
              {filter === 'assigned' 
                ? 'You have no inspections assigned to you yet.'
                : 'You have not completed any inspections yet.'}
            </p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {filteredInspections.map((inspection, index) => (
              <motion.div
                key={inspection.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl border border-obsidian/[0.04] p-5 hover:shadow-[var(--shadow-soft)] transition-shadow"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getStatusColor(inspection.status)}`}>
                        {inspection.status}
                      </span>
                      <span className="text-xs text-slate-warm">
                        {new Date(inspection.createdAt).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                    </div>

                    {inspection.vehicle && (
                      <div className="mb-3">
                        <h3 className="font-semibold text-obsidian text-lg">
                          {inspection.vehicle.year} {inspection.vehicle.make} {inspection.vehicle.model}
                        </h3>
                        {inspection.vehicle.variant && (
                          <p className="text-sm text-slate-warm">{inspection.vehicle.variant}</p>
                        )}
                        <div className="flex items-center gap-4 mt-2 text-sm text-obsidian/70">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {inspection.vehicle.city}, {inspection.vehicle.province}
                          </span>
                          <span className="font-semibold text-obsidian">
                            {formatPrice(inspection.vehicle.price)}
                          </span>
                        </div>
                      </div>
                    )}

                    {inspection.preferredDate && (
                      <div className="flex items-center gap-2 text-sm text-obsidian/70 mb-2">
                        <Calendar className="w-4 h-4" />
                        <span>Preferred: {new Date(inspection.preferredDate).toLocaleDateString('en-GB')}</span>
                      </div>
                    )}

                    {inspection.notes && (
                      <p className="text-sm text-obsidian/60 mt-2">
                        <span className="font-medium">Notes:</span> {inspection.notes}
                      </p>
                    )}

                    {inspection.buyer && (
                      <p className="text-xs text-slate-warm mt-2">
                        Requested by: {inspection.buyer.firstName} {inspection.buyer.lastName}
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
                    {inspection.inspectorId === user?.id && !['COMPLETED', 'APPROVED', 'REJECTED'].includes(inspection.status) && (
                      <Link
                        to={`/inspect/complete/${inspection.id}`}
                        className="flex items-center gap-2 px-4 py-2 bg-emerald text-ivory text-sm font-medium rounded-xl hover:bg-emerald-light transition-colors"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Complete Inspection
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
