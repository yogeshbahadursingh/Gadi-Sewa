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
    <main className="min-h-screen bg-ivory">
      {/* Cinematic Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        {workshop.logo ? (
          <img
            src={workshop.logo}
            alt={workshop.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-obsidian to-obsidian-light flex items-center justify-center">
            <Wrench className="w-32 h-32 text-ivory/10" />
          </div>
        )}
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/60 to-transparent"></div>
        
        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 container-luxury pb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badges */}
            <div className="flex flex-wrap gap-3 mb-4">
              {workshop.verified && (
                <span className="badge-luxury badge-emerald">
                  <Award className="w-4 h-4" />
                  Verified Workshop
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-ivory mb-2 tracking-tight">
              {workshop.name}
            </h1>

            {/* Location & Rating */}
            <div className="flex flex-wrap items-center gap-6 text-ivory">
              <div className="flex items-center gap-2 text-ivory/80">
                <MapPin className="w-5 h-5" />
                <span className="text-lg">{workshop.address}, {workshop.city}</span>
              </div>
              {workshop.averageRating && (
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-5 h-5 ${
                          star <= Math.floor(workshop.averageRating)
                            ? 'fill-gold text-gold'
                            : 'text-ivory/30'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-lg font-bold text-ivory">{workshop.averageRating.toFixed(1)}</span>
                  <span className="text-ivory/70">({workshop.totalReviews} reviews)</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          onClick={() => navigate('/workshops')}
          className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-medium hover:bg-white transition-all"
        >
          <ArrowLeft className="w-5 h-5 text-obsidian" />
          <span className="text-sm font-medium text-obsidian">Back</span>
        </motion.button>
      </section>

      {/* Content Section */}
      <div className="container-luxury py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card-luxury p-8"
            >
              <h2 className="font-display text-2xl font-bold text-obsidian mb-6 flex items-center gap-3">
                <div className="w-1 h-8 bg-gradient-to-b from-gold to-gold-dark rounded-full"></div>
                About This Workshop
              </h2>
              <p className="text-obsidian/70 leading-relaxed text-lg">{workshop.description}</p>
            </motion.div>

            {/* Services Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="card-luxury p-8"
            >
              <h2 className="font-display text-2xl font-bold text-obsidian mb-6 flex items-center gap-3">
                <div className="w-1 h-8 bg-gradient-to-b from-gold to-gold-dark rounded-full"></div>
                Services Offered
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {workshop.services.map((service: string) => (
                  <div
                    key={service}
                    className="flex items-center gap-2 p-3 bg-ivory rounded-xl"
                  >
                    <Wrench className="w-4 h-4 text-gold flex-shrink-0" />
                    <span className="text-sm font-medium text-obsidian">{service}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Specializations Section */}
            {workshop.specializations && workshop.specializations.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="card-luxury p-8"
              >
                <h2 className="font-display text-2xl font-bold text-obsidian mb-6 flex items-center gap-3">
                  <div className="w-1 h-8 bg-gradient-to-b from-gold to-gold-dark rounded-full"></div>
                  Specializations
                </h2>
                <div className="flex flex-wrap gap-3">
                  {workshop.specializations.map((spec: string) => (
                    <span
                      key={spec}
                      className="px-4 py-2 bg-gold/10 text-gold-dark text-sm font-semibold rounded-xl"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6 sticky top-24">
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="card-luxury p-6"
              >
                <h3 className="font-display text-lg font-bold text-obsidian mb-4 flex items-center gap-2">
                  <Phone className="w-5 h-5 text-gold" />
                  Contact Information
                </h3>
                
                <div className="space-y-3">
                  <a href={`tel:${workshop.phone}`} className="flex items-center gap-3 p-3 bg-ivory rounded-xl hover:bg-ivory-dark transition-colors group">
                    <div className="w-10 h-10 bg-gradient-to-br from-gold to-gold-dark rounded-lg flex items-center justify-center">
                      <Phone className="w-5 h-5 text-obsidian" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-obsidian/60">Phone</p>
                      <p className="text-sm font-semibold text-obsidian group-hover:text-gold transition-colors">{workshop.phone}</p>
                    </div>
                  </a>
                  
                  {workshop.email && (
                    <a href={`mailto:${workshop.email}`} className="flex items-center gap-3 p-3 bg-ivory rounded-xl hover:bg-ivory-dark transition-colors group">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald to-emerald-light rounded-lg flex items-center justify-center">
                        <Mail className="w-5 h-5 text-ivory" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-obsidian/60">Email</p>
                        <p className="text-sm font-semibold text-obsidian group-hover:text-emerald transition-colors">{workshop.email}</p>
                      </div>
                    </a>
                  )}
                  
                  {workshop.website && (
                    <a href={workshop.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-ivory rounded-xl hover:bg-ivory-dark transition-colors group">
                      <div className="w-10 h-10 bg-gradient-to-br from-obsidian to-obsidian-light rounded-lg flex items-center justify-center">
                        <Globe className="w-5 h-5 text-ivory" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-obsidian/60">Website</p>
                        <p className="text-sm font-semibold text-obsidian group-hover:text-gold transition-colors">Visit Website</p>
                      </div>
                    </a>
                  )}
                </div>
              </motion.div>

              {/* Opening Hours */}
              {workshop.openingHours && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="card-luxury p-6"
                >
                  <h3 className="font-display text-lg font-bold text-obsidian mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-gold" />
                    Opening Hours
                  </h3>
                  <div className="space-y-2">
                    {Object.entries(workshop.openingHours).map(([day, hours]) => (
                      <div key={day} className="flex justify-between items-center py-2 border-b border-obsidian/5 last:border-0">
                        <span className="text-sm text-obsidian/70 capitalize">{day}</span>
                        <span className="text-sm font-semibold text-obsidian">{String(hours)}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Book Service CTA */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="card-luxury p-6"
              >
                <h3 className="font-display text-lg font-bold text-obsidian mb-4">
                  Ready to Book?
                </h3>
                <p className="text-sm text-obsidian/70 mb-4">
                  Schedule your vehicle service with our certified mechanics
                </p>
                <button className="btn-luxury btn-gold w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2">
                  <Clock className="w-5 h-5" />
                  Book a Service
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
