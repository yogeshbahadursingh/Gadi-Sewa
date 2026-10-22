import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Phone, Mail, Globe, Star, Clock, Wrench, Award, Calendar } from 'lucide-react';
import { api, Workshop, WorkshopReview } from '../services/api';

export default function WorkshopDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [workshop, setWorkshop] = useState<Workshop | null>(null);
  const [reviews, setReviews] = useState<WorkshopReview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadWorkshop(id);
    }
  }, [id]);

  const loadWorkshop = async (workshopId: string) => {
    try {
      const data = await api.getWorkshopById(workshopId);
      setWorkshop(data);
      
      const reviewsData = await api.getWorkshopReviews(workshopId);
      setReviews(reviewsData);
    } catch (error) {
      console.error('Failed to load workshop:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-ivory pt-20 lg:pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-obsidian/60">Loading workshop...</p>
        </div>
      </main>
    );
  }

  if (!workshop) {
    return (
      <main className="min-h-screen bg-ivory pt-20 lg:pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-obsidian mb-4">Workshop Not Found</h1>
          <p className="text-slate-warm mb-6">The workshop you're looking for doesn't exist.</p>
          <Link to="/workshops" className="px-6 py-3 bg-obsidian text-ivory text-sm font-medium rounded-full">
            Back to Workshops
          </Link>
        </div>
      </main>
    );
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-gold text-gold' : 'text-obsidian/20'}`}
      />
    ));
  };

  return (
    <main className="min-h-screen bg-ivory pt-20 lg:pt-24">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/workshops')}
          className="flex items-center gap-2 text-obsidian/60 hover:text-obsidian mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Back to Workshops</span>
        </motion.button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border border-obsidian/[0.04] overflow-hidden"
            >
              {/* Image */}
              <div className="h-64 bg-ivory-dark overflow-hidden">
                {workshop.logo ? (
                  <img
                    src={workshop.logo}
                    alt={workshop.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-obsidian/20">
                    <Wrench className="w-24 h-24" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
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
                    <div className="flex items-center gap-2 text-sm text-slate-warm">
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
                      <div className="flex">{renderStars(workshop.averageRating)}</div>
                      <span className="text-2xl font-bold text-obsidian">{workshop.averageRating.toFixed(1)}</span>
                    </div>
                    <span className="text-sm text-slate-warm">
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
                    {workshop.services.map((service) => (
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
                {workshop.specializations.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-obsidian mb-3">Specializations</h3>
                    <div className="flex flex-wrap gap-2">
                      {workshop.specializations.map((spec) => (
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
            </motion.div>

            {/* Reviews */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl border border-obsidian/[0.04] p-6"
            >
              <h2 className="font-display text-xl font-semibold text-obsidian mb-6">Customer Reviews</h2>
              
              {reviews.length === 0 ? (
                <div className="text-center py-8">
                  <Star className="w-12 h-12 text-obsidian/10 mx-auto mb-3" />
                  <p className="text-slate-warm">No reviews yet. Be the first to review!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="p-4 bg-ivory-warm rounded-xl">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="flex">{renderStars(review.rating)}</div>
                          {review.verified && (
                            <span className="px-2 py-0.5 bg-emerald/10 text-emerald text-xs font-medium rounded-full">
                              Verified
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-slate-warm">
                          {new Date(review.createdAt).toLocaleDateString('en-GB')}
                        </span>
                      </div>
                      {review.title && (
                        <h4 className="font-semibold text-obsidian mb-1">{review.title}</h4>
                      )}
                      <p className="text-sm text-obsidian/70">{review.comment}</p>
                      {review.serviceType && (
                        <p className="text-xs text-slate-warm mt-2">Service: {review.serviceType}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl border border-obsidian/[0.04] p-6 sticky top-28"
            >
              <h3 className="font-display text-lg font-semibold text-obsidian mb-4">Contact Information</h3>
              
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
                <div className="mt-6 pt-6 border-t border-obsidian/[0.04]">
                  <h4 className="font-semibold text-obsidian mb-3 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gold" />
                    Opening Hours
                  </h4>
                  <div className="space-y-1 text-sm">
                    {Object.entries(workshop.openingHours).map(([day, hours]) => (
                      <div key={day} className="flex justify-between">
                        <span className="text-slate-warm capitalize">{day}</span>
                        <span className="text-obsidian">{String(hours)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Book Service Button */}
              <Link
                to={`/workshops/${workshop.id}/book`}
                className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-3 bg-obsidian text-ivory text-sm font-semibold rounded-xl hover:bg-emerald transition-colors"
              >
                <Calendar className="w-4 h-4" />
                Book a Service
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
