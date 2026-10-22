import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, CheckCircle, AlertCircle, Calendar, MapPin, FileCheck, Camera, Award } from 'lucide-react';
import { api, Passport, Vehicle } from '../services/api';
import { formatPrice, formatMileage } from '../data/vehicles';

export default function PassportDetailPage() {
  const { id } = useParams();
  const [passport, setPassport] = useState<any>(null);
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
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
      if (data.vehicle) {
        setVehicle(data.vehicle);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load passport');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-ivory pt-20 lg:pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-obsidian/60">Loading passport...</p>
        </div>
      </main>
    );
  }

  if (error || !passport) {
    return (
      <main className="min-h-screen bg-ivory pt-20 lg:pt-24 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="font-display text-2xl font-bold text-obsidian mb-4">Passport Not Found</h1>
          <p className="text-slate-warm mb-6">{error || 'The passport you\'re looking for doesn\'t exist.'}</p>
          <Link to="/listings" className="px-6 py-3 bg-obsidian text-ivory text-sm font-medium rounded-full">
            Browse Vehicles
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-ivory pt-20 lg:pt-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-emerald/10 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-emerald" />
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold text-obsidian">Vehicle Passport</h1>
              <p className="text-sm text-slate-warm font-mono">{passport.passportNumber}</p>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Vehicle Info */}
          {vehicle && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-1"
            >
              <div className="bg-white rounded-2xl border border-obsidian/[0.04] overflow-hidden sticky top-28">
                <div className="aspect-[4/3] bg-ivory-dark">
                  {vehicle.images && vehicle.images.length > 0 ? (
                    <img
                      src={vehicle.images[0].url}
                      alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-obsidian/20">
                      <FileCheck className="w-16 h-16" />
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h2 className="font-display text-lg font-semibold text-obsidian mb-2">
                    {vehicle.year} {vehicle.make} {vehicle.model}
                  </h2>
                  {vehicle.variant && (
                    <p className="text-sm text-slate-warm mb-3">{vehicle.variant}</p>
                  )}
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-obsidian/70">
                      <MapPin className="w-4 h-4" />
                      <span>{vehicle.city}, {vehicle.province}</span>
                    </div>
                    {vehicle.mileage && (
                      <div className="flex items-center gap-2 text-obsidian/70">
                        <FileCheck className="w-4 h-4" />
                        <span>{formatMileage(vehicle.mileage)}</span>
                      </div>
                    )}
                  </div>
                  <div className="mt-4 pt-4 border-t border-obsidian/[0.04]">
                    <p className="text-xl font-bold text-obsidian">
                      {formatPrice(vehicle.price)}
                    </p>
                  </div>
                  <Link
                    to={`/vehicle/${vehicle.id}`}
                    className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-obsidian text-ivory text-sm font-medium rounded-xl hover:bg-emerald transition-colors"
                  >
                    View Vehicle Listing
                  </Link>
                </div>
              </div>
            </motion.div>
          )}

          {/* Passport Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Status Card */}
            <div className="bg-emerald/5 border border-emerald/20 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-emerald/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-emerald" />
                </div>
                <div>
                  <h3 className="font-semibold text-emerald">Verified Vehicle</h3>
                  <p className="text-xs text-obsidian/60">Independently inspected and verified</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-obsidian/50">Inspection Date</p>
                  <p className="font-medium text-obsidian">
                    {passport.inspectionDate ? new Date(passport.inspectionDate).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    }) : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-obsidian/50">Published</p>
                  <p className="font-medium text-obsidian">
                    {passport.publishedAt ? new Date(passport.publishedAt).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    }) : 'N/A'}
                  </p>
                </div>
              </div>
            </div>

            {/* Overall Rating */}
            {passport.overallRating && (
              <div className="bg-white rounded-2xl border border-obsidian/[0.04] p-6">
                <h3 className="font-display text-xl font-semibold text-obsidian mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-gold" />
                  Overall Condition
                </h3>
                <div className="flex items-center gap-3">
                  <span className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize ${
                    passport.overallRating === 'excellent' ? 'bg-emerald/10 text-emerald' :
                    passport.overallRating === 'very_good' ? 'bg-green-50 text-green-700' :
                    passport.overallRating === 'good' ? 'bg-blue-50 text-blue-700' :
                    passport.overallRating === 'fair' ? 'bg-amber-50 text-amber-700' :
                    'bg-red-50 text-red-700'
                  }`}>
                    {passport.overallRating.replace('_', ' ')}
                  </span>
                  {passport.estimatedValue && (
                    <span className="text-sm text-obsidian/70">
                      Estimated Value: {formatPrice(passport.estimatedValue)}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Checklist Results */}
            {passport.checklist && (
              <div className="bg-white rounded-2xl border border-obsidian/[0.04] p-6">
                <h3 className="font-display text-xl font-semibold text-obsidian mb-4">Inspection Checklist</h3>
                <div className="space-y-3">
                  {Object.entries(passport.checklist).map(([section, data]: [string, any]) => (
                    <div key={section} className="flex items-start justify-between pb-3 border-b border-obsidian/[0.04] last:border-0 last:pb-0">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-obsidian capitalize">{section}</p>
                        {data.notes && (
                          <p className="text-xs text-obsidian/60 mt-1">{data.notes}</p>
                        )}
                      </div>
                      <span className={`px-3 py-1 rounded-lg text-xs font-medium capitalize ${
                        data.status === 'excellent' ? 'bg-emerald/10 text-emerald' :
                        data.status === 'good' ? 'bg-green-50 text-green-700' :
                        data.status === 'fair' ? 'bg-amber-50 text-amber-700' :
                        data.status === 'poor' || data.status === 'needs_repair' ? 'bg-red-50 text-red-700' :
                        'bg-gray-50 text-gray-700'
                      }`}>
                        {data.status?.replace('_', ' ')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Findings */}
            {passport.findings && (
              <div className="bg-white rounded-2xl border border-obsidian/[0.04] p-6">
                <h3 className="font-display text-xl font-semibold text-obsidian mb-4">Inspector's Findings</h3>
                <p className="text-sm text-obsidian/70 leading-relaxed whitespace-pre-wrap">
                  {passport.findings}
                </p>
              </div>
            )}

            {/* Issues */}
            {passport.issues && passport.issues.length > 0 && (
              <div className="bg-white rounded-2xl border border-obsidian/[0.04] p-6">
                <h3 className="font-display text-xl font-semibold text-obsidian mb-4">Issues & Concerns</h3>
                <ul className="space-y-2">
                  {passport.issues.map((issue: string, index: number) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-obsidian/70">
                      <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Photos */}
            {passport.photos && passport.photos.length > 0 && (
              <div className="bg-white rounded-2xl border border-obsidian/[0.04] p-6">
                <h3 className="font-display text-xl font-semibold text-obsidian mb-4 flex items-center gap-2">
                  <Camera className="w-5 h-5 text-gold" />
                  Evidence Photos ({passport.photos.length})
                </h3>
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
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  );
}
