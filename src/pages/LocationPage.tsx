import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MapPin, Car, CheckCircle2, Shield, Zap, Heart } from 'lucide-react';
import { listings, vehicles, formatPrice, formatMileage, getVehicleById } from '../store/data';
import { useAppState } from '../context/AppContext';
import { Badge } from '../components/Layout';
import SEO, { generateBreadcrumbSchema } from '../components/SEO';

const LOCATION_DATA: Record<string, {
  name: string;
  description: string;
  stats: { vehicles: number; dealers: number; inspections: number; avgPrice: string };
  popularMakes: string[];
  popularModels: string[];
  services: string[];
  faqs: { q: string; a: string }[];
}> = {
  'kathmandu': {
    name: 'Kathmandu',
    description: 'Find verified used cars, motorcycles, and electric vehicles in Kathmandu. Browse vehicles from local sellers with professional inspections and complete Vehicle Passports. Nepal\'s capital city has the largest vehicle marketplace with options for every budget.',
    stats: { vehicles: 450, dealers: 28, inspections: 1200, avgPrice: 'Rs. 35 Lakh' },
    popularMakes: ['Toyota', 'Hyundai', 'Honda', 'Tata', 'BYD'],
    popularModels: ['Fortuner', 'Creta', 'City', 'Nexon EV', 'Atto 3'],
    services: ['Vehicle Inspection', 'EV Battery Check', 'Ownership Transfer', 'Finance Assistance'],
    faqs: [
      { q: 'How many used cars are available in Kathmandu?', a: 'There are currently 450+ verified vehicles listed in Kathmandu, including cars, motorcycles, and electric vehicles.' },
      { q: 'Can I get a vehicle inspection in Kathmandu?', a: 'Yes, we have certified inspectors available across Kathmandu Valley. Book an inspection online and get a detailed report within 24 hours.' },
      { q: 'What is the average price of used cars in Kathmandu?', a: 'The average price of used cars in Kathmandu is approximately Rs. 35 Lakh, varying by make, model, year, and condition.' },
      { q: 'Are electric vehicles available in Kathmandu?', a: 'Yes, Kathmandu has a growing EV market with models like BYD Atto 3, Tata Nexon EV, and MG ZS EV available from verified sellers.' },
    ],
  },
  'lalitpur': {
    name: 'Lalitpur',
    description: 'Browse verified used vehicles in Lalitpur (Patan). Find cars, bikes, and EVs from trusted local sellers. Professional inspection services and Vehicle Passports available for all vehicles.',
    stats: { vehicles: 280, dealers: 18, inspections: 850, avgPrice: 'Rs. 38 Lakh' },
    popularMakes: ['Hyundai', 'Toyota', 'Tata', 'MG', 'Kia'],
    popularModels: ['Creta', 'Fortuner', 'Nexon EV', 'ZS EV', 'Seltos'],
    services: ['Vehicle Inspection', 'EV Battery Check', 'Document Verification', 'Insurance Assistance'],
    faqs: [
      { q: 'How many vehicles are listed in Lalitpur?', a: 'There are 280+ verified vehicles currently listed in Lalitpur, including cars, motorcycles, and electric vehicles.' },
      { q: 'Are there EV dealers in Lalitpur?', a: 'Yes, Lalitpur has several authorized EV dealers and service centers, particularly in Pulchowk and Sanepa areas.' },
    ],
  },
  'bhaktapur': {
    name: 'Bhaktapur',
    description: 'Find quality used vehicles in Bhaktapur. Browse cars and motorcycles from verified local sellers with inspection reports and Vehicle Passports.',
    stats: { vehicles: 120, dealers: 8, inspections: 320, avgPrice: 'Rs. 22 Lakh' },
    popularMakes: ['Maruti Suzuki', 'Honda', 'Toyota', 'Hyundai'],
    popularModels: ['Swift', 'City', 'Corolla', 'Creta'],
    services: ['Vehicle Inspection', 'Ownership Transfer', 'Document Verification'],
    faqs: [
      { q: 'What types of vehicles are available in Bhaktapur?', a: 'Bhaktapur has a variety of used cars and motorcycles, with popular models including Maruti Suzuki Swift, Honda City, and Toyota Corolla.' },
    ],
  },
  'pokhara': {
    name: 'Pokhara',
    description: 'Discover verified used vehicles in Pokhara. Find cars, bikes, and SUVs perfect for Nepal\'s terrain. Professional inspection and Vehicle Passport services available.',
    stats: { vehicles: 180, dealers: 12, inspections: 520, avgPrice: 'Rs. 28 Lakh' },
    popularMakes: ['Toyota', 'Mahindra', 'Tata', 'Hyundai'],
    popularModels: ['Fortuner', 'Scorpio', 'Nexon', 'Creta'],
    services: ['Vehicle Inspection', '4x4 Specialist Inspection', 'Ownership Transfer'],
    faqs: [
      { q: 'Are SUVs popular in Pokhara?', a: 'Yes, SUVs like Toyota Fortuner, Mahindra Scorpio, and Tata Nexon are very popular in Pokhara due to the hilly terrain and road conditions.' },
    ],
  },
  'chitwan': {
    name: 'Chitwan',
    description: 'Browse verified vehicles in Chitwan (Bharatpur). Find cars, motorcycles, and commercial vehicles from trusted local sellers.',
    stats: { vehicles: 95, dealers: 6, inspections: 240, avgPrice: 'Rs. 20 Lakh' },
    popularMakes: ['Toyota', 'Tata', 'Mahindra', 'Maruti Suzuki'],
    popularModels: ['Innova', 'Nexon', 'Scorpio', 'Swift'],
    services: ['Vehicle Inspection', 'Commercial Vehicle Inspection'],
    faqs: [
      { q: 'What vehicles are most popular in Chitwan?', a: 'Toyota Innova, Tata Nexon, and Mahindra Scorpio are among the most popular vehicles in Chitwan.' },
    ],
  },
};

export default function LocationPage() {
  const { location } = useParams<{ location: string }>();
  const { state, toggleFavorite } = useAppState();

  const locationData = location ? LOCATION_DATA[location.toLowerCase()] : null;

  const locationListings = useMemo(() => {
    if (!locationData) return [];
    return listings.filter(l => 
      l.status === 'ACTIVE' && 
      l.district.toLowerCase() === locationData.name.toLowerCase()
    );
  }, [locationData]);

  if (!locationData) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Location not found</h1>
        <p className="text-gray-500 mt-2">We don't have data for this location yet.</p>
        <Link to="/search" className="mt-4 inline-block text-blue-600 hover:text-blue-700 font-medium">
          Browse all vehicles
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <SEO
        title={`Used Cars for Sale in ${locationData.name} | GadiBazar`}
        description={locationData.description}
        keywords={`used cars ${locationData.name}, second hand cars ${locationData.name}, vehicles for sale ${locationData.name}, ${locationData.name} car market, buy car ${locationData.name}`}
        canonical={`https://gadibazar.com/cars/${location}`}
        structuredData={generateBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Cars', url: '/search' },
          { name: locationData.name, url: `/cars/${location}` },
        ])}
      />

      {/* Header */}
      <div className="mb-8">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <Link to="/search" className="hover:text-blue-600">Cars</Link>
          <span>/</span>
          <span className="text-gray-900">{locationData.name}</span>
        </nav>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Used Cars for Sale in {locationData.name}
        </h1>
        <p className="text-gray-600 mt-2 max-w-3xl">{locationData.description}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <Car className="w-6 h-6 text-blue-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">{locationData.stats.vehicles}+</p>
          <p className="text-sm text-gray-500">Vehicles Listed</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <Shield className="w-6 h-6 text-green-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">{locationData.stats.inspections}+</p>
          <p className="text-sm text-gray-500">Inspections Done</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <Car className="w-6 h-6 text-purple-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">{locationData.stats.dealers}+</p>
          <p className="text-sm text-gray-500">Verified Dealers</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-gray-900">{locationData.stats.avgPrice}</p>
          <p className="text-sm text-gray-500">Average Price</p>
        </div>
      </div>

      {/* Available Vehicles */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Available Vehicles in {locationData.name}
        </h2>
        {locationListings.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
            <Car className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No vehicles currently listed in {locationData.name}</p>
            <Link to="/search" className="mt-3 inline-block text-blue-600 hover:text-blue-700 font-medium">
              Browse all vehicles
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {locationListings.map(listing => {
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
                      alt={`${vehicle.year} ${vehicle.make} ${vehicle.model} in ${locationData.name}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      {listing.isInspected && (
                        <span className="bg-green-600 text-white text-xs font-medium px-2 py-1 rounded-md flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Inspected
                        </span>
                      )}
                      {vehicle.isEV && (
                        <span className="bg-emerald-500 text-white text-xs font-medium px-2 py-1 rounded-md flex items-center gap-1">
                          <Zap className="w-3 h-3" /> EV
                        </span>
                      )}
                    </div>
                    <button
                      onClick={(e) => { e.preventDefault(); toggleFavorite(listing.id); }}
                      className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white"
                    >
                      <Heart className={`w-4 h-4 ${isFav ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </h3>
                    <p className="text-lg font-bold text-blue-600 mt-1">{formatPrice(listing.price)}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                      <span>{formatMileage(vehicle.mileage)}</span>
                      <span>•</span>
                      <span>{vehicle.fuelType}</span>
                      <span>•</span>
                      <span>{vehicle.transmission}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      {listing.hasPassport && <Badge variant="info">Passport</Badge>}
                      {vehicle.batterySOH && <Badge variant="success">SOH {vehicle.batterySOH}%</Badge>}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* Popular Makes */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Popular Makes in {locationData.name}</h2>
        <div className="flex flex-wrap gap-3">
          {locationData.popularMakes.map(make => (
            <Link
              key={make}
              to={`/search?make=${make.toLowerCase()}&district=${locationData.name}`}
              className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:border-blue-500 hover:text-blue-600 transition-colors"
            >
              {make}
            </Link>
          ))}
        </div>
      </div>

      {/* Popular Models */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Popular Models in {locationData.name}</h2>
        <div className="flex flex-wrap gap-3">
          {locationData.popularModels.map(model => (
            <Link
              key={model}
              to={`/search?q=${model}&district=${locationData.name}`}
              className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:border-blue-500 hover:text-blue-600 transition-colors"
            >
              {model}
            </Link>
          ))}
        </div>
      </div>

      {/* Services Available */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Services Available in {locationData.name}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {locationData.services.map(service => (
            <div key={service} className="bg-white border border-gray-200 rounded-xl p-4 text-center">
              <CheckCircle2 className="w-6 h-6 text-green-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">{service}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQs */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Frequently Asked Questions - Cars in {locationData.name}
        </h2>
        <div className="space-y-4">
          {locationData.faqs.map((faq, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
              <p className="text-sm text-gray-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Other Locations */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Browse Vehicles in Other Cities</h2>
        <div className="flex flex-wrap gap-3">
          {Object.entries(LOCATION_DATA)
            .filter(([key]) => key !== location)
            .map(([key, data]) => (
              <Link
                key={key}
                to={`/cars/${key}`}
                className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:border-blue-500 hover:text-blue-600 transition-colors flex items-center gap-2"
              >
                <MapPin className="w-4 h-4" />
                {data.name}
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
