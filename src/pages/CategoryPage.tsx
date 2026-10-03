import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronRight, Filter, Grid3X3, List, MapPin, Heart, CheckCircle2, Zap } from 'lucide-react';
import { listings, vehicles, getVehicleById, formatPrice, formatMileage } from '../store/data';
import { useAppState } from '../context/AppContext';
import { Badge } from '../components/Layout';
import SEO, { generateBreadcrumbSchema } from '../components/SEO';

type CategoryType = 'cars' | 'motorcycles' | 'electric-vehicles';

const categoryConfig: Record<CategoryType, { title: string; description: string; vehicleTypes: string[]; keywords: string }> = {
  'cars': {
    title: 'Cars',
    description: 'Browse cars for sale in Nepal',
    vehicleTypes: ['CAR'],
    keywords: 'cars for sale Nepal, used cars Nepal, second hand cars, buy car Nepal',
  },
  'motorcycles': {
    title: 'Motorcycles & Scooters',
    description: 'Browse motorcycles and scooters for sale in Nepal',
    vehicleTypes: ['MOTORBIKE', 'SCOOTER'],
    keywords: 'motorcycles Nepal, bikes for sale Nepal, used bikes, scooters Nepal',
  },
  'electric-vehicles': {
    title: 'Electric Vehicles',
    description: 'Browse electric vehicles for sale in Nepal',
    vehicleTypes: ['CAR', 'MOTORBIKE', 'SCOOTER'],
    keywords: 'electric vehicles Nepal, EV Nepal, electric cars, electric bikes Nepal',
  },
};

export default function CategoryPage() {
  const { category } = useParams<{ category: CategoryType }>();
  const { state, toggleFavorite } = useAppState();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('newest');
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

  const config = categoryConfig[category || 'cars'];

  const filteredListings = useMemo(() => {
    let results = listings.filter(l => {
      if (l.status !== 'ACTIVE') return false;
      const vehicle = getVehicleById(l.vehicleId);
      if (!vehicle) return false;
      
      if (category === 'electric-vehicles') {
        return vehicle.isEV;
      }
      
      return config.vehicleTypes.includes(vehicle.type);
    });

    // Sort
    switch (sortBy) {
      case 'price_asc':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        results.sort((a, b) => b.price - a.price);
        break;
      case 'year_desc':
        results.sort((a, b) => {
          const va = getVehicleById(a.vehicleId);
          const vb = getVehicleById(b.vehicleId);
          return (vb?.year || 0) - (va?.year || 0);
        });
        break;
      case 'mileage_asc':
        results.sort((a, b) => {
          const va = getVehicleById(a.vehicleId);
          const vb = getVehicleById(b.vehicleId);
          return (va?.mileage || 0) - (vb?.mileage || 0);
        });
        break;
      default: // newest
        results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return results;
  }, [category, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredListings.length / itemsPerPage);
  const paginatedListings = filteredListings.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // Get unique makes for sidebar
  const makes = useMemo(() => {
    const makeSet = new Set<string>();
    filteredListings.forEach(l => {
      const v = getVehicleById(l.vehicleId);
      if (v) makeSet.add(v.make);
    });
    return Array.from(makeSet).sort();
  }, [filteredListings]);

  // Get unique locations
  const locations = useMemo(() => {
    const locSet = new Set<string>();
    filteredListings.forEach(l => {
      if (l.district) locSet.add(l.district);
    });
    return Array.from(locSet).sort();
  }, [filteredListings]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <SEO
        title={`${config.title} for Sale in Nepal`}
        description={`${config.description}. Find verified ${config.title.toLowerCase()} with professional inspections and Vehicle Passports. Browse ${filteredListings.length} listings on GadiBazar.`}
        keywords={config.keywords}
        canonical={`https://gadibazar.com/${category}`}
        structuredData={generateBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: config.title, url: `/${category}` },
        ])}
      />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gray-900 font-medium">{config.title}</span>
      </nav>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{config.title} for Sale in Nepal</h1>
        <p className="text-gray-600 mt-2">{config.description}</p>
        <p className="text-sm text-gray-500 mt-1">{filteredListings.length} vehicles available</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Filters */}
        <aside className="lg:w-64 flex-shrink-0">
          <div className="bg-white border border-gray-200 rounded-xl p-4 sticky top-20">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Filter className="w-4 h-4" /> Filters
            </h3>

            {/* Makes */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Make</h4>
              <div className="space-y-1">
                {makes.map(make => (
                  <Link
                    key={make}
                    to={`/${category}/${make.toLowerCase().replace(/\s+/g, '-')}`}
                    className="block text-sm text-gray-600 hover:text-blue-600 py-1"
                  >
                    {make}
                  </Link>
                ))}
              </div>
            </div>

            {/* Locations */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Location</h4>
              <div className="space-y-1">
                {locations.map(location => (
                  <Link
                    key={location}
                    to={`/${category}/location/${location.toLowerCase()}`}
                    className="block text-sm text-gray-600 hover:text-blue-600 py-1"
                  >
                    {location}
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Quick Links</h4>
              <div className="space-y-1">
                <Link to="/inspect" className="block text-sm text-blue-600 hover:text-blue-700 py-1">
                  Book Inspection
                </Link>
                <Link to="/valuation" className="block text-sm text-blue-600 hover:text-blue-700 py-1">
                  Vehicle Valuation
                </Link>
                <Link to="/finance" className="block text-sm text-blue-600 hover:text-blue-700 py-1">
                  Finance Options
                </Link>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Controls */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="py-2 px-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500"
              >
                <option value="newest">Newest First</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="year_desc">Year: Newest</option>
                <option value="mileage_asc">Mileage: Lowest</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:bg-gray-100'}`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:bg-gray-100'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Listings Grid */}
          {paginatedListings.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
              <p className="text-gray-500">No vehicles found in this category</p>
              <Link to="/search" className="mt-4 inline-block text-blue-600 hover:text-blue-700 font-medium">
                Try advanced search
              </Link>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedListings.map(listing => {
                const vehicle = getVehicleById(listing.vehicleId);
                if (!vehicle) return null;
                const isFav = state.favorites.includes(listing.id);

                return (
                  <Link
                    key={listing.id}
                    to={`/listing/${listing.id}`}
                    className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
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
                          <span className="bg-green-600 text-white text-[10px] font-medium px-1.5 py-0.5 rounded flex items-center gap-0.5">
                            <CheckCircle2 className="w-2.5 h-2.5" /> Inspected
                          </span>
                        )}
                        {vehicle.isEV && (
                          <span className="bg-emerald-500 text-white text-[10px] font-medium px-1.5 py-0.5 rounded flex items-center gap-0.5">
                            <Zap className="w-2.5 h-2.5" /> EV
                          </span>
                        )}
                      </div>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          toggleFavorite(listing.id);
                        }}
                        className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                      >
                        <Heart className={`w-4 h-4 ${isFav ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                      </button>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1 text-sm">
                        {vehicle.year} {vehicle.make} {vehicle.model}
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">{vehicle.variant}</p>
                      <p className="text-lg font-bold text-blue-600 mt-2">{formatPrice(listing.price)}</p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                        <span>{formatMileage(vehicle.mileage)}</span>
                        <span>•</span>
                        <span>{vehicle.fuelType}</span>
                        <span>•</span>
                        <span className="flex items-center gap-0.5">
                          <MapPin className="w-3 h-3" />
                          {listing.district}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-2">
                        <Badge variant="default">{vehicle.transmission}</Badge>
                        {listing.hasPassport && <Badge variant="info">Passport</Badge>}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="space-y-4">
              {paginatedListings.map(listing => {
                const vehicle = getVehicleById(listing.vehicleId);
                if (!vehicle) return null;
                const isFav = state.favorites.includes(listing.id);

                return (
                  <Link
                    key={listing.id}
                    to={`/listing/${listing.id}`}
                    className="flex bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="w-48 md:w-64 aspect-[16/10] md:aspect-auto bg-gray-100 flex-shrink-0">
                      <img
                        src={listing.images[0]}
                        alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-1 p-4 flex flex-col justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900 line-clamp-1">
                          {vehicle.year} {vehicle.make} {vehicle.model} {vehicle.variant}
                        </h3>
                        <p className="text-lg font-bold text-blue-600 mt-1">{formatPrice(listing.price)}</p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                          <span>{formatMileage(vehicle.mileage)}</span>
                          <span>•</span>
                          <span>{vehicle.fuelType}</span>
                          <span>•</span>
                          <span>{vehicle.transmission}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {listing.district}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        {listing.isInspected && <Badge variant="success">Inspected</Badge>}
                        {listing.hasPassport && <Badge variant="info">Passport</Badge>}
                        {vehicle.isEV && <Badge variant="success">EV</Badge>}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    page === pageNum
                      ? 'bg-blue-600 text-white'
                      : 'border border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {pageNum}
                </button>
              ))}
              <button
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}

          {/* Category Description */}
          <div className="mt-12 bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              {config.title} in Nepal
            </h2>
            <div className="prose prose-sm text-gray-600 space-y-3">
              {category === 'cars' && (
                <>
                  <p>
                    Looking for cars for sale in Nepal? GadiBazar offers a wide selection of verified used cars 
                    from trusted sellers across Kathmandu, Lalitpur, Pokhara, and other major cities.
                  </p>
                  <p>
                    All vehicles come with complete ownership history, odometer records, and optional professional 
                    inspections. Many listings include Vehicle Passports with verified documentation.
                  </p>
                  <p>
                    Popular makes include Toyota, Hyundai, Honda, Kia, and Tata. Whether you're looking for a 
                    compact hatchback, family SUV, or luxury sedan, you'll find it on GadiBazar.
                  </p>
                </>
              )}
              {category === 'motorcycles' && (
                <>
                  <p>
                    Browse motorcycles and scooters for sale in Nepal. From commuter bikes to premium motorcycles, 
                    GadiBazar has the largest selection of two-wheelers.
                  </p>
                  <p>
                    Find popular brands like Royal Enfield, Yamaha, Honda, and Bajaj. All listings include 
                    detailed specifications, mileage information, and seller contact details.
                  </p>
                  <p>
                    Whether you need a fuel-efficient scooter for daily commute or a powerful motorcycle for 
                    touring, you'll find the perfect ride on GadiBazar.
                  </p>
                </>
              )}
              {category === 'electric-vehicles' && (
                <>
                  <p>
                    Discover electric vehicles for sale in Nepal. EVs are gaining popularity with zero emissions, 
                    low running costs, and government incentives.
                  </p>
                  <p>
                    GadiBazar offers verified EV listings with battery health reports, charging infrastructure 
                    information, and range details. Popular models include BYD Atto 3, Tata Nexon EV, and MG ZS EV.
                  </p>
                  <p>
                    All EV listings include battery State of Health (SOH) verification, charging test results, 
                    and complete service history. Make an informed decision with our comprehensive EV data.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
