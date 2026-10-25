import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Shield, CheckCircle, Calendar, MapPin, Car, Eye, Download, Share2, 
  Camera, FileText, Award, Clock, User, QrCode, ArrowLeft, AlertCircle
} from 'lucide-react';
import { api, Passport } from '../services/api';

export default function PassportDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [passport, setPassport] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      loadPassport();
    }
  }, [id]);

  const loadPassport = async () => {
    try {
      const data = await api.getPassportDetails(id!);
      setPassport(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load passport');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PUBLISHED': return 'bg-emerald/10 text-emerald border-emerald/20';
      case 'PENDING': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'EXPIRED': return 'bg-obsidian/10 text-obsidian/60 border-obsidian/20';
      case 'REVOKED': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getGradeColor = (grade: string) => {
    if (!grade) return 'bg-obsidian/5 text-obsidian/40';
    switch (grade.toUpperCase()) {
      case 'A':
      case 'A+':
        return 'bg-emerald/10 text-emerald';
      case 'B':
      case 'B+':
        return 'bg-green-50 text-green-700';
      case 'C':
      case 'C+':
        return 'bg-amber-50 text-amber-700';
      case 'D':
        return 'bg-orange-50 text-orange-700';
      case 'F':
        return 'bg-red-50 text-red-700';
      default:
        return 'bg-obsidian/5 text-obsidian/60';
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-ivory flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-obsidian/70">Loading passport...</p>
        </div>
      </main>
    );
  }

  if (error || !passport) {
    return (
      <main className="min-h-screen bg-ivory flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="font-display text-2xl font-bold text-obsidian mb-4">Passport Not Found</h1>
          <p className="text-obsidian/70 mb-6">{error || 'The passport you\'re looking for doesn\'t exist.'}</p>
          <Link to="/listings" className="px-6 py-3 bg-obsidian text-ivory text-sm font-medium rounded-full">
            Back to Listings
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-ivory">
      {/* Premium Header */}
      <section className="bg-gradient-to-br from-obsidian via-obsidian-light to-obsidian relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh-luxury opacity-20"></div>
        <div className="container-luxury relative z-10 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-ivory/60 hover:text-ivory mb-6 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Back</span>
            </button>

            <div className="flex items-start justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald to-emerald-light rounded-2xl flex items-center justify-center shadow-emerald">
                    <Shield className="w-8 h-8 text-ivory" />
                  </div>
                  <div>
                    <span className="badge-luxury badge-emerald mb-2 inline-flex">
                      <CheckCircle className="w-4 h-4" />
                      Verified Passport
                    </span>
                    <p className="text-ivory/60 text-sm font-mono">{passport.passportNumber}</p>
                  </div>
                </div>

                <h1 className="font-display text-4xl md:text-5xl font-bold text-ivory mb-2 tracking-tight">
                  {passport.vehicle?.year} {passport.vehicle?.make} {passport.vehicle?.model}
                </h1>
                {passport.vehicle?.variant && (
                  <p className="text-xl text-ivory/70 mb-4">{passport.vehicle.variant}</p>
                )}

                <div className="flex items-center gap-4 text-ivory/70">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Inspected: {formatDate(passport.inspectionDate || passport.publishedAt)}
                  </span>
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(passport.status)}`}>
                    {passport.status}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2">
                <button className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-ivory text-sm font-medium rounded-xl hover:bg-white/20 transition-colors">
                  <Download className="w-4 h-4" />
                  Download PDF
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-ivory text-sm font-medium rounded-xl hover:bg-white/20 transition-colors">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container-luxury py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Vehicle Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card-luxury p-8"
            >
              <h2 className="font-display text-2xl font-bold text-obsidian mb-6 flex items-center gap-3">
                <div className="w-1 h-8 bg-gradient-to-b from-gold to-gold-dark rounded-full"></div>
                Vehicle Information
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-xs text-obsidian/60 uppercase tracking-wider mb-1">Make</p>
                  <p className="text-lg font-semibold text-obsidian">{passport.vehicle?.make}</p>
                </div>
                <div>
                  <p className="text-xs text-obsidian/60 uppercase tracking-wider mb-1">Model</p>
                  <p className="text-lg font-semibold text-obsidian">{passport.vehicle?.model}</p>
                </div>
                <div>
                  <p className="text-xs text-obsidian/60 uppercase tracking-wider mb-1">Year</p>
                  <p className="text-lg font-semibold text-obsidian">{passport.vehicle?.year}</p>
                </div>
                {passport.vehicle?.mileage && (
                  <div>
                    <p className="text-xs text-obsidian/60 uppercase tracking-wider mb-1">Mileage</p>
                    <p className="text-lg font-semibold text-obsidian">{passport.vehicle.mileage.toLocaleString()} km</p>
                  </div>
                )}
                <div>
                  <p className="text-xs text-obsidian/60 uppercase tracking-wider mb-1">Location</p>
                  <p className="text-lg font-semibold text-obsidian">{passport.vehicle?.city}</p>
                </div>
                <div>
                  <p className="text-xs text-obsidian/60 uppercase tracking-wider mb-1">Category</p>
                  <p className="text-lg font-semibold text-obsidian capitalize">{passport.vehicle?.category}</p>
                </div>
              </div>
            </motion.div>

            {/* Overall Condition */}
            {passport.overallRating && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="card-luxury p-8"
              >
                <h2 className="font-display text-2xl font-bold text-obsidian mb-6 flex items-center gap-3">
                  <div className="w-1 h-8 bg-gradient-to-b from-gold to-gold-dark rounded-full"></div>
                  Overall Condition
                </h2>

                <div className="flex items-center gap-4">
                  <span className={`px-6 py-3 rounded-xl text-lg font-semibold capitalize ${getGradeColor(passport.overallRating)}`}>
                    {passport.overallRating.replace('_', ' ')}
                  </span>
                  {passport.estimatedValue && (
                    <span className="text-sm text-obsidian/70">
                      Estimated Value: <span className="font-semibold text-obsidian">रू {passport.estimatedValue.toLocaleString()}</span>
                    </span>
                  )}
                </div>
              </motion.div>
            )}

            {/* Inspection Checklist */}
            {passport.checklist && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="card-luxury p-8"
              >
                <h2 className="font-display text-2xl font-bold text-obsidian mb-6 flex items-center gap-3">
                  <div className="w-1 h-8 bg-gradient-to-b from-gold to-gold-dark rounded-full"></div>
                  Inspection Checklist
                </h2>

                <div className="space-y-3">
                  {Object.entries(passport.checklist).map(([section, data]: [string, any]) => (
                    <div key={section} className="flex items-start justify-between pb-3 border-b border-obsidian/[0.04] last:border-0 last:pb-0">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-obsidian capitalize">{section}</p>
                        {data.notes && (
                          <p className="text-xs text-obsidian/60 mt-1">{data.notes}</p>
                        )}
                      </div>
                      <span className={`px-3 py-1 rounded-lg text-xs font-medium capitalize ${getGradeColor(data.status)}`}>
                        {data.status?.replace('_', ' ')}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Inspector's Findings */}
            {passport.findings && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="card-luxury p-8"
              >
                <h2 className="font-display text-2xl font-bold text-obsidian mb-6 flex items-center gap-3">
                  <div className="w-1 h-8 bg-gradient-to-b from-gold to-gold-dark rounded-full"></div>
                  Inspector's Findings
                </h2>

                <p className="text-obsidian/70 leading-relaxed whitespace-pre-wrap">
                  {passport.findings}
                </p>
              </motion.div>
            )}

            {/* Issues & Concerns */}
            {passport.issues && passport.issues.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="card-luxury p-8"
              >
                <h2 className="font-display text-2xl font-bold text-obsidian mb-6 flex items-center gap-3">
                  <div className="w-1 h-8 bg-gradient-to-b from-gold to-gold-dark rounded-full"></div>
                  Issues & Concerns
                </h2>

                <ul className="space-y-2">
                  {passport.issues.map((issue: string, index: number) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-obsidian/70">
                      <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Evidence Photos */}
            {passport.photos && passport.photos.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="card-luxury p-8"
              >
                <h2 className="font-display text-2xl font-bold text-obsidian mb-6 flex items-center gap-3">
                  <div className="w-1 h-8 bg-gradient-to-b from-gold to-gold-dark rounded-full"></div>
                  Evidence Photos ({passport.photos.length})
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {passport.photos.map((photo: string, index: number) => (
                    <div key={index} className="aspect-square bg-ivory-dark rounded-xl overflow-hidden">
                      <img
                        src={photo}
                        alt={`Evidence ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6 sticky top-24">
              {/* Verification Status */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="card-luxury p-6"
              >
                <h3 className="font-display text-lg font-bold text-obsidian mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-emerald" />
                  Verification Status
                </h3>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-obsidian/70">Status</span>
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getStatusColor(passport.status)}`}>
                      {passport.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-obsidian/70">Inspection Date</span>
                    <span className="text-sm font-medium text-obsidian">
                      {passport.inspectionDate ? formatDate(passport.inspectionDate) : 'N/A'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-obsidian/70">Published</span>
                    <span className="text-sm font-medium text-obsidian">
                      {passport.publishedAt ? formatDate(passport.publishedAt) : 'N/A'}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* QR Code */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="card-luxury p-6"
              >
                <h3 className="font-display text-lg font-bold text-obsidian mb-4 flex items-center gap-2">
                  <QrCode className="w-5 h-5 text-gold" />
                  Verification QR Code
                </h3>

                <div className="bg-white p-4 rounded-xl">
                  <div className="aspect-square bg-obsidian/5 rounded-lg flex items-center justify-center">
                    <QrCode className="w-32 h-32 text-obsidian/20" />
                  </div>
                </div>

                <p className="text-xs text-obsidian/60 mt-3 text-center">
                  Scan to verify passport authenticity
                </p>
              </motion.div>

              {/* Inspector Information */}
              {passport.inspector && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="card-luxury p-6"
                >
                  <h3 className="font-display text-lg font-bold text-obsidian mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-gold" />
                    Inspector
                  </h3>

                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-gold to-gold-dark rounded-full flex items-center justify-center">
                      <span className="text-lg font-bold text-obsidian">
                        {passport.inspector.firstName?.[0]}{passport.inspector.lastName?.[0]}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-obsidian">
                        {passport.inspector.firstName} {passport.inspector.lastName}
                      </p>
                      <p className="text-xs text-obsidian/60">Certified Inspector</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="card-luxury p-6"
              >
                <h3 className="font-display text-lg font-bold text-obsidian mb-4">
                  Actions
                </h3>

                <div className="space-y-3">
                  {passport.vehicle && (
                    <Link
                      to={`/vehicle/${passport.vehicle.id}`}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-obsidian text-ivory text-sm font-medium rounded-xl hover:bg-emerald transition-colors"
                    >
                      <Car className="w-4 h-4" />
                      View Vehicle Listing
                    </Link>
                  )}
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-obsidian/10 text-obsidian text-sm font-medium rounded-xl hover:bg-obsidian/5 transition-colors">
                    <Download className="w-4 h-4" />
                    Download Report
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-obsidian/10 text-obsidian text-sm font-medium rounded-xl hover:bg-obsidian/5 transition-colors">
                    <Share2 className="w-4 h-4" />
                    Share Passport
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
