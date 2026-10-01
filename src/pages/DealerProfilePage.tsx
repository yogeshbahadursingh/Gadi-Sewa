import { useParams, Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Globe, Star, Car, Calendar, CheckCircle2, Shield } from 'lucide-react';
import { dealers, listings, getVehicleById, formatPrice, formatMileage } from '../store/data';
import { Badge } from '../components/Layout';
import SEO, { generateBreadcrumbSchema, generateOrganizationSchema } from '../components/SEO';
import Breadcrumb from '../components/Breadcrumb';

export default function DealerProfilePage() {
  const { dealerId } = useParams<{ dealerId: string }>();
  
  // Find dealer by ID or slug
  const dealer = dealers.find(d => 
    d.id === dealerId || 
    d.companyName.toLowerCase().replace(/\s+/g, '-') === dealerId
  );

  if (!dealer) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Dealer Not Found</h1>
        <p className="text-gray-600 mt-2">The dealer you're looking for doesn't exist or has been removed.</p>
        <Link to="/partners" className="mt-4 inline-block text-blue-600 hover:text-blue-700 font-medium">
          Browse all dealers
        </Link>
      </div>
    );
  }

  // Get dealer's listings
  const dealerListings = listings.filter(l => l.sellerId === dealer.userId && l.status === 'ACTIVE');
  
  // Calculate statistics
  const totalListings = dealerListings.length;
  const avgPrice = dealerListings.length > 0
    ? dealerListings.reduce((sum, l) => sum + l.price, 0) / dealerListings.length
    : 0;
  const inspectedCount = dealerListings.filter(l => l.isInspected).length;

  const dealerSlug = dealer.companyName.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <SEO
        title={`${dealer.companyName} - Verified Car Dealer in ${dealer.address}`}
        description={`${dealer.companyName} is a verified car dealer in ${dealer.address}. Browse ${totalListings} vehicles for sale with ${inspectedCount} professionally inspected. Contact: ${dealer.phone}.`}
        keywords={`${dealer.companyName}, car dealer ${dealer.address}, used cars ${dealer.address}, verified dealer Nepal`}
        canonical={`https://gadibazar.com/dealers/${dealerSlug}`}
        structuredData={[
          generateOrganizationSchema(),
          generateBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Dealers', url: '/partners' },
            { name: dealer.companyName, url: `/dealers/${dealerSlug}` },
          ]),
        ]}
      />

      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Dealers', href: '/partners' },
          { label: dealer.companyName },
        ]}
      />

      {/* Dealer Header */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Dealer Logo/Avatar */}
          <div className="flex-shrink-0">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
              <span className="text-3xl font-bold text-white">
                {dealer.companyName.charAt(0)}
              </span>
            </div>
          </div>

          {/* Dealer Info */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-2xl font-bold text-gray-900">{dealer.companyName}</h1>
                  {dealer.verified && (
                    <Badge variant="success">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Verified Dealer
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="font-medium">{dealer.rating.toFixed(1)}</span>
                  <span className="text-gray-500">(Verified Dealer)</span>
                </div>
              </div>
            </div>

            <p className="text-gray-600 mb-4">{dealer.description}</p>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span>{dealer.address}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="w-4 h-4 text-gray-400" />
                <a href={`tel:${dealer.phone}`} className="hover:text-blue-600">
                  {dealer.phone}
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="w-4 h-4 text-gray-400" />
                <a href={`mailto:${dealer.email}`} className="hover:text-blue-600">
                  {dealer.email}
                </a>
              </div>
              {dealer.website && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Globe className="w-4 h-4 text-gray-400" />
                  <a href={dealer.website} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                    Website
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <Car className="w-6 h-6 text-blue-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">{totalListings}</p>
          <p className="text-sm text-gray-500">Active Listings</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <CheckCircle2 className="w-6 h-6 text-green-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">{inspectedCount}</p>
          <p className="text-sm text-gray-500">Inspected Vehicles</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <Calendar className="w-6 h-6 text-purple-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">2+</p>
          <p className="text-sm text-gray-500">Years on Platform</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <Shield className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">95%</p>
          <p className="text-sm text-gray-500">Verification Score</p>
        </div>
      </div>

      {/* Dealer Inventory */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Current Inventory</h2>
          <span className="text-sm text-gray-500">{totalListings} vehicles</span>
        </div>

        {dealerListings.length === 0 ? (
          <div className="text-center py-12">
            <Car className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No vehicles currently available</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dealerListings.map(listing => {
              const vehicle = getVehicleById(listing.vehicleId);
              if (!vehicle) return null;

              return (
                <Link
                  key={listing.id}
                  to={`/listing/${listing.id}`}
                  className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
                    <img
                      src={listing.images[0]}
                      alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 flex gap-1.5">
                      {listing.isInspected && (
                        <Badge variant="success">Inspected</Badge>
                      )}
                      {vehicle.isEV && (
                        <Badge variant="success">EV</Badge>
                      )}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">{vehicle.variant}</p>
                    <p className="text-lg font-bold text-blue-600 mt-2">{formatPrice(listing.price)}</p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                      <span>{formatMileage(vehicle.mileage)}</span>
                      <span>•</span>
                      <span>{vehicle.fuelType}</span>
                      <span>•</span>
                      <span>{vehicle.transmission}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* Dealer Information */}
      <div className="mt-6 bg-white border border-gray-200 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">About {dealer.companyName}</h2>
        <div className="prose prose-sm text-gray-600 space-y-3">
          <p>
            {dealer.companyName} is a verified car dealer located in {dealer.address}. 
            With a rating of {dealer.rating.toFixed(1)} stars, they have established themselves 
            as a trusted name in the Nepal automotive market.
          </p>
          <p>
            The dealer has successfully sold {dealer.totalSold} vehicles and currently maintains 
            {dealer.totalListings} active listings on GadiBazar.
          </p>
          {dealer.verified && (
            <p>
              <strong>Verified Dealer:</strong> This dealer has completed our verification process, 
              including business registration verification, identity verification, and physical 
              location verification. All listings are monitored for quality and accuracy.
            </p>
          )}
        </div>
      </div>

      {/* Contact CTA */}
      <div className="mt-6 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white">
        <h2 className="text-xl font-bold mb-2">Interested in their vehicles?</h2>
        <p className="text-blue-100 mb-4">
          Contact {dealer.companyName} directly to schedule a viewing or ask questions.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={`tel:${dealer.phone}`}
            className="flex-1 bg-white text-blue-600 px-6 py-3 rounded-xl font-medium hover:bg-blue-50 transition-colors text-center"
          >
            Call Now
          </a>
          <a
            href={`mailto:${dealer.email}`}
            className="flex-1 border-2 border-white text-white px-6 py-3 rounded-xl font-medium hover:bg-white/10 transition-colors text-center"
          >
            Send Email
          </a>
        </div>
      </div>
    </div>
  );
}
