import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Phone, Mail, Globe, Star, Clock, Wrench, Award } from 'lucide-react';
import { api } from '../services/api';

export default function WorkshopDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [workshop, setWorkshop] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWorkshop();
  }, [id]);

  const loadWorkshop = async () => {
    try {
      const workshops = await api.getWorkshops();
      const found = workshops.find((w: any) => w.id === id);
      setWorkshop(found);
    } catch (error) {
      console.error('Failed to load workshop:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-ivory pt-20 flex items-center justify-center">
        <p className="text-obsidian/70">Loading workshop...</p>
      </main>
    );
  }

  if (!workshop) {
    return (
      <main className="min-h-screen bg-ivory pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-obsidian mb-4">Workshop Not Found</h1>
          <Link to="/workshops" className="px-6 py-3 bg-obsidian text-ivory rounded-full">
            Back to Workshops
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-ivory pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <button
            onClick={() => navigate('/workshops')}
            className="flex items-center gap-2 text-obsidian/60 hover:text-obsidian mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back to Workshops</span>
          </button>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Header */}
              <div className="bg-white rounded-2xl shadow-soft overflow-hidden mb-6">
                {workshop.logo && (
                  <div className="aspect-[21/9] bg-ivory-dark">
                    <img src={workshop.logo} alt={workshop.name} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h1 className="font-display text-3xl font-bold text-obsidian">{workshop.name}</h1>
                        {workshop.verified && (
                          <span className="px-3 py-1 bg-emerald/10 text-emerald text-xs font-semibold rounded-full flex items-center gap-1">
                            <Award className="w-3 h-3" />
                            Verified
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-obsidian/70">
                        <MapPin className="w-4 h-4" />
                        <span>{workshop.address}, {workshop.city}, {workshop.district}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-obsidian/70 mb-6">{workshop.description}</p>

                  {/* Rating */}
                  {workshop.averageRating && (
                    <div className="flex items-center gap-4 mb-6 p-4 bg-ivory-warm rounded-xl">
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-5 h-5 ${
                                star <= Math.floor(workshop.averageRating)
                                  ? 'fill-gold text-gold'
                                  : 'text-obsidian/20'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-2xl font-bold text-obsidian">{workshop.averageRating.toFixed(1)}</span>
                      </div>
                      <span className="text-obsidian/70">
                        ({workshop.totalReviews} review{workshop.totalReviews !== 1 ? 's' : ''})
                      </span>
                    </div>
                  )}

                  {/* Services */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-obsidian mb-3 flex items-center gap-2">
                      <Wrench className="w-5 h-5 text-gold" />
                      Services Offered
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {workshop.services.map((service: string) => (
                        <span
                          key={service}
                          className="px-3 py-1.5 bg-ivory-dark text-obsidian/70 text-sm rounded-full"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Specializations */}
                  {workshop.specializations && workshop.specializations.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-obsidian mb-3">Specializations</h3>
                      <div className="flex flex-wrap gap-2">
                        {workshop.specializations.map((spec: string) => (
                          <span
                            key={spec}
                            className="px-3 py-1.5 bg-gold/10 text-gold-dark text-sm font-medium rounded-full"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-soft p-6 sticky top-24">
                <h3 className="font-display text-lg font-bold text-obsidian mb-4">Contact Information</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gold" />
                    <a href={`tel:${workshop.phone}`} className="text-sm text-obsidian hover:text-gold transition-colors">
                      {workshop.phone}
                    </a>
                  </div>
                  
                  {workshop.email && (
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-gold" />
                      <a href={`mailto:${workshop.email}`} className="text-sm text-obsidian hover:text-gold transition-colors">
                        {workshop.email}
                      </a>
                    </div>
                  )}
                  
                  {workshop.website && (
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-gold" />
                      <a href={workshop.website} target="_blank" rel="noopener noreferrer" className="text-sm text-obsidian hover:text-gold transition-colors">
                        Visit Website
                      </a>
                    </div>
                  )}
                </div>

                {/* Opening Hours */}
                {workshop.openingHours && (
                  <div className="mt-6 pt-6 border-t border-obsidian/5">
                    <h4 className="font-semibold text-obsidian mb-3 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gold" />
                      Opening Hours
                    </h4>
                    <div className="space-y-1 text-sm">
                      {Object.entries(workshop.openingHours).map(([day, hours]) => (
                        <div key={day} className="flex justify-between">
                          <span className="text-obsidian/70 capitalize">{day}</span>
                          <span className="text-obsidian">{String(hours)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Book Service Button */}
                <button className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-gold to-gold-dark text-obsidian font-semibold rounded-xl shadow-gold hover:shadow-lg transition-all">
                  <Clock className="w-5 h-5" />
                  Book a Service
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
