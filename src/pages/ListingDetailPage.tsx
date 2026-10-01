import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, Share2, MapPin, Calendar, Gauge, Fuel, Settings, CheckCircle2, Shield, Zap, MessageSquare, Phone, AlertCircle, ChevronRight, ArrowLeft, Eye, TrendingUp } from 'lucide-react';
import { getListingById, getVehicleById, getUserById, getPassportByVehicleId, getInspectionByListingId } from '../store/data';
import { useAppState, useAuth } from '../context/AppContext';
import { formatPrice, formatMileage } from '../store/data';

export default function ListingDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { state, toggleFavorite, addRecentlyViewed } = useAppState();
  const { currentUser } = useAuth();
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [offerAmount, setOfferAmount] = useState('');
  const [offerMessage, setOfferMessage] = useState('');

  const listing = getListingById(id || '');
  const vehicle = listing ? getVehicleById(listing.vehicleId) : null;
  const seller = listing ? getUserById(listing.sellerId) : null;
  const passport = vehicle ? getPassportByVehicleId(vehicle.id) : null;
  const inspection = getInspectionByListingId(listing?.id || '');

  useEffect(() => {
    if (id) addRecentlyViewed(id);
  }, [id]);

  if (!listing || !vehicle) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-medium text-gray-900">Listing not found</h2>
        <Link to="/search" className="mt-4 inline-block text-blue-600 hover:text-blue-700">
          Back to search
        </Link>
      </div>
    );
  }

  const isFav = state.favorites.includes(listing.id);
  const passResult = inspection?.sections.flatMap((s) => s.items).filter((i) => i.result === 'PASS').length || 0;
  const advisoryResult = inspection?.sections.flatMap((s) => s.items).filter((i) => i.result === 'ADVISORY').length || 0;
  const failResult = inspection?.sections.flatMap((s) => s.items).filter((i) => i.result === 'FAIL').length || 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <Link to="/" className="hover:text-blue-600">
          Home
        </Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/search" className="hover:text-blue-600">
          Search
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gray-900">
          {vehicle.make} {vehicle.model}
        </span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image Gallery */}
          <div className="relative rounded-xl overflow-hidden bg-gray-100 aspect-[16/10]">
            <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover" />
            <div className="absolute top-4 left-4 flex gap-2">
              {listing.isInspected && (
                <span className="bg-green-600 text-white text-xs font-medium px-2.5 py-1 rounded-lg flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Professionally Inspected
                </span>
              )}
              {listing.hasPassport && (
                <span className="bg-blue-600 text-white text-xs font-medium px-2.5 py-1 rounded-lg flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5" /> Vehicle Passport
                </span>
              )}
            </div>
            <div className="absolute bottom-4 right-4 flex gap-2">
              <button className="w-9 h-9 bg-white/90 rounded-full flex items-center justify-center hover:bg-white">
                <Heart className={`w-4 h-4 ${isFav ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} onClick={() => toggleFavorite(listing.id)} />
              </button>
              <button className="w-9 h-9 bg-white/90 rounded-full flex items-center justify-center hover:bg-white">
                <Share2 className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Title & Price */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{listing.title}</h1>
            <div className="flex items-center gap-4 mt-3">
              <p className="text-3xl font-bold text-blue-600">{formatPrice(listing.price)}</p>
              {listing.negotiable && <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded">Negotiable</span>}
            </div>
            <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {listing.location}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Listed {new Date(listing.createdAt).toLocaleDateString()}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {listing.views} views
              </span>
            </div>
          </div>

          {/* Key Specs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <Gauge className="w-5 h-5 text-gray-400 mx-auto" />
              <p className="text-lg font-bold text-gray-900 mt-2">{formatMileage(vehicle.mileage)}</p>
              <p className="text-xs text-gray-500">Odometer</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <Fuel className="w-5 h-5 text-gray-400 mx-auto" />
              <p className="text-lg font-bold text-gray-900 mt-2">{vehicle.fuelType}</p>
              <p className="text-xs text-gray-500">Fuel Type</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <Settings className="w-5 h-5 text-gray-400 mx-auto" />
              <p className="text-lg font-bold text-gray-900 mt-2">{vehicle.transmission}</p>
              <p className="text-xs text-gray-500">Transmission</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <Calendar className="w-5 h-5 text-gray-400 mx-auto" />
              <p className="text-lg font-bold text-gray-900 mt-2">{vehicle.year}</p>
              <p className="text-xs text-gray-500">Year</p>
            </div>
          </div>

          {/* EV Battery Section */}
          {vehicle.isEV && vehicle.batterySOH && (
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-5 h-5 text-emerald-600" />
                <h3 className="font-semibold text-gray-900">EV Battery Health</h3>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">Verified</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-gray-500">State of Health</p>
                  <p className="text-2xl font-bold text-emerald-600">{vehicle.batterySOH}%</p>
                  <div className="mt-1 bg-gray-200 rounded-full h-2">
                    <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${vehicle.batterySOH}%` }} />
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Battery Capacity</p>
                  <p className="text-lg font-bold text-gray-900">{vehicle.batteryCapacity} kWh</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Verification</p>
                  <p className="text-sm font-medium text-gray-900">Physically Verified</p>
                  <p className="text-xs text-gray-500">by Inspector</p>
                </div>
              </div>
            </div>
          )}

          {/* Vehicle Passport Summary */}
          {passport && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-gray-900">Vehicle Passport</h3>
                </div>
                <Link to={`/passport/${passport.passportId}`} className="text-sm font-medium text-blue-600 hover:text-blue-700">
                  View Full Passport →
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-white rounded-lg p-3">
                  <p className="text-xs text-gray-500">Passport ID</p>
                  <p className="text-sm font-mono font-medium text-gray-900">{passport.passportId}</p>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <p className="text-xs text-gray-500">Odometer Records</p>
                  <p className="text-sm font-bold text-gray-900">{passport.odometerHistory.length}</p>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <p className="text-xs text-gray-500">Inspections</p>
                  <p className="text-sm font-bold text-gray-900">{passport.inspectionHistory.length}</p>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <p className="text-xs text-gray-500">Status</p>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">{passport.status}</span>
                </div>
              </div>
            </div>
          )}

          {/* Inspection Report Summary */}
          {inspection && (
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <h3 className="font-semibold text-gray-900">Inspection Report</h3>
                </div>
                <span
                  className={`text-xs px-2 py-0.5 rounded ${
                    inspection.overallResult === 'PASS'
                      ? 'bg-green-100 text-green-700'
                      : inspection.overallResult === 'FAIL'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  Overall: {inspection.overallResult}
                </span>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <span className="text-sm text-gray-600">{passResult} Pass</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 bg-amber-500 rounded-full" />
                  <span className="text-sm text-gray-600">{advisoryResult} Advisory</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <span className="text-sm text-gray-600">{failResult} Fail</span>
                </div>
              </div>
              <div className="space-y-2">
                {inspection.sections.map((section) => (
                  <div key={section.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <span className="text-sm text-gray-700">{section.name}</span>
                    <div className="flex items-center gap-1">
                      {section.items.every((i) => i.result === 'PASS') && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">All Pass</span>
                      )}
                      {section.items.some((i) => i.result === 'FAIL') && (
                        <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">Has Failures</span>
                      )}
                      {section.items.some((i) => i.result === 'ADVISORY') && !section.items.some((i) => i.result === 'FAIL') && (
                        <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded">Advisory</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {inspection.recommendation && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs font-medium text-gray-500 mb-1">Inspector's Recommendation</p>
                  <p className="text-sm text-gray-700">{inspection.recommendation}</p>
                </div>
              )}
            </div>
          )}

          {/* Description */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="font-semibold text-gray-900 mb-3">Description</h3>
            <p className="text-sm text-gray-700 leading-relaxed">{listing.description}</p>
          </div>

          {/* Vehicle Details */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="font-semibold text-gray-900 mb-4">Vehicle Details</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                ['Make', vehicle.make],
                ['Model', vehicle.model],
                ['Variant', vehicle.variant],
                ['Year', vehicle.year],
                ['Fuel Type', vehicle.fuelType],
                ['Transmission', vehicle.transmission],
                ['Body Style', vehicle.bodyStyle],
                ['Mileage', formatMileage(vehicle.mileage)],
                ['Color', vehicle.color],
                ['Engine', vehicle.engineCC ? `${vehicle.engineCC} CC` : 'N/A'],
                ['Registration', vehicle.registrationNumber || 'N/A'],
                ['District', vehicle.registeredDistrict || 'N/A'],
              ].map(([label, value]) => (
                <div key={label as string} className="flex justify-between py-2 border-b border-gray-50">
                  <span className="text-sm text-gray-500">{label}</span>
                  <span className="text-sm font-medium text-gray-900">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Seller Info */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 sticky top-20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-lg font-bold text-blue-700">{seller?.fullName.charAt(0)}</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">{seller?.fullName}</p>
                <p className="text-xs text-gray-500">{seller?.role === 'DEALER_OWNER' ? 'Verified Dealer' : 'Private Seller'}</p>
              </div>
            </div>
            {seller?.identityVerified && (
              <div className="flex items-center gap-1.5 mb-4">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span className="text-xs text-green-600 font-medium">Identity Verified</span>
              </div>
            )}
            <div className="space-y-3">
              <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                <MessageSquare className="w-4 h-4" /> Send Message
              </button>
              <button className="w-full border border-blue-600 text-blue-600 py-3 rounded-xl font-medium hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" /> Show Phone
              </button>
              <button
                onClick={() => setShowOfferModal(true)}
                className="w-full border border-gray-200 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                Make an Offer
              </button>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 space-y-2 text-xs text-gray-500">
              <p className="flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5" /> {listing.views} views
              </p>
              <p className="flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5" /> {listing.favourites} favourites
              </p>
              <p className="flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5" /> {listing.enquiries} enquiries
              </p>
            </div>
          </div>

          {/* Safety Tips */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <h4 className="text-sm font-medium text-amber-800">Safety Tips</h4>
            </div>
            <ul className="text-xs text-amber-700 space-y-1">
              <li>• Meet in a public place for test drives</li>
              <li>• Verify documents before payment</li>
              <li>• Use Vehicle Passport for verification</li>
              <li>• Never pay in advance without seeing the vehicle</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Offer Modal */}
      {showOfferModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Make an Offer</h3>
            <p className="text-sm text-gray-500 mb-4">Listing price: {formatPrice(listing.price)}</p>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Your Offer (Rs.)</label>
                <input
                  type="number"
                  value={offerAmount}
                  onChange={(e) => setOfferAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full py-3 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Message (optional)</label>
                <textarea
                  value={offerMessage}
                  onChange={(e) => setOfferMessage(e.target.value)}
                  placeholder="Add a message..."
                  className="w-full py-3 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500 resize-none h-20"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowOfferModal(false)}
                  className="flex-1 border border-gray-200 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowOfferModal(false)}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-xl text-sm font-medium hover:bg-blue-700"
                >
                  Submit Offer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
