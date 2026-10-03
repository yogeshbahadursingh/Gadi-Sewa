import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Car, CheckCircle2, Shield, Zap, Heart, TrendingUp } from 'lucide-react';
import { listings, vehicles, formatPrice, formatMileage, getVehicleById } from '../store/data';
import { useAppState } from '../context/AppContext';
import { Badge } from '../components/Layout';
import SEO, { generateBreadcrumbSchema } from '../components/SEO';

const MAKE_DATA: Record<string, {
  name: string;
  description: string;
  country: string;
  founded: string;
  stats: { totalListings: number; avgPrice: string; popularModels: string[] };
  models: string[];
  faqs: { q: string; a: string }[];
}> = {
  'toyota': {
    name: 'Toyota',
    description: 'Browse verified used Toyota vehicles in Nepal. Toyota is known for reliability, durability, and excellent resale value. Find popular models like Fortuner, Innova, Corolla, and Land Cruiser with complete Vehicle Passports and inspection reports.',
    country: 'Japan',
    founded: '1937',
    stats: { totalListings: 156, avgPrice: 'Rs. 45 Lakh', popularModels: ['Fortuner', 'Innova', 'Corolla', 'Land Cruiser'] },
    models: ['Fortuner', 'Innova', 'Corolla', 'Land Cruiser', 'Hilux', 'RAV4', 'Prado'],
    faqs: [
      { q: 'Why are Toyota vehicles popular in Nepal?', a: 'Toyota vehicles are popular in Nepal due to their reliability, durability, excellent resale value, and widespread service network. They perform well in Nepal\'s diverse terrain and climate conditions.' },
      { q: 'What is the average price of used Toyota cars in Nepal?', a: 'The average price of used Toyota cars in Nepal is approximately Rs. 45 Lakh, varying by model, year, and condition. Popular models like Fortuner and Innova command higher prices.' },
      { q: 'Are Toyota spare parts easily available in Nepal?', a: 'Yes, Toyota spare parts are widely available in Nepal through authorized dealers and aftermarket suppliers. The extensive service network makes maintenance convenient.' },
    ],
  },
  'hyundai': {
    name: 'Hyundai',
    description: 'Find verified used Hyundai vehicles in Nepal. Hyundai offers modern features, competitive pricing, and growing popularity. Browse models like Creta, Tucson, Venue, and i20 with professional inspections.',
    country: 'South Korea',
    founded: '1967',
    stats: { totalListings: 124, avgPrice: 'Rs. 32 Lakh', popularModels: ['Creta', 'Tucson', 'Venue', 'i20'] },
    models: ['Creta', 'Tucson', 'Venue', 'i20', 'Verna', 'Santa Fe', 'Elantra'],
    faqs: [
      { q: 'Why choose Hyundai in Nepal?', a: 'Hyundai vehicles offer modern features, competitive pricing, good fuel efficiency, and a growing service network in Nepal. They provide excellent value for money.' },
      { q: 'What is the most popular Hyundai model in Nepal?', a: 'The Hyundai Creta is the most popular Hyundai model in Nepal, known for its SUV styling, features, and practicality for Nepali roads.' },
    ],
  },
  'honda': {
    name: 'Honda',
    description: 'Discover verified used Honda vehicles in Nepal. Honda is renowned for engine reliability, fuel efficiency, and refined driving experience. Find models like City, CR-V, Civic, and Activa.',
    country: 'Japan',
    founded: '1948',
    stats: { totalListings: 98, avgPrice: 'Rs. 28 Lakh', popularModels: ['City', 'CR-V', 'Civic', 'Activa'] },
    models: ['City', 'CR-V', 'Civic', 'Activa', 'BR-V', 'WR-V', 'Amaze'],
    faqs: [
      { q: 'Why are Honda vehicles preferred in Nepal?', a: 'Honda vehicles are preferred in Nepal for their reliable engines, fuel efficiency, refined driving experience, and strong brand reputation.' },
    ],
  },
  'tata': {
    name: 'Tata',
    description: 'Explore verified used Tata vehicles in Nepal. Tata offers robust build quality, excellent safety features, and leading EV technology. Browse models like Nexon, Nexon EV, Punch, and Harrier.',
    country: 'India',
    founded: '1945',
    stats: { totalListings: 87, avgPrice: 'Rs. 25 Lakh', popularModels: ['Nexon', 'Nexon EV', 'Punch', 'Harrier'] },
    models: ['Nexon', 'Nexon EV', 'Punch', 'Harrier', 'Safari', 'Altroz', 'Tigor'],
    faqs: [
      { q: 'Why choose Tata vehicles in Nepal?', a: 'Tata vehicles offer robust build quality, excellent safety ratings, competitive pricing, and leading EV technology. The Nexon EV is particularly popular for its range and features.' },
      { q: 'Are Tata EVs suitable for Nepal?', a: 'Yes, Tata EVs like the Nexon EV are well-suited for Nepal with adequate range for city driving, fast charging capability, and growing charging infrastructure.' },
    ],
  },
  'byd': {
    name: 'BYD',
    description: 'Find verified used BYD electric vehicles in Nepal. BYD is a leading EV manufacturer offering advanced battery technology and competitive pricing. Browse models like Atto 3, Dolphin, and Seal.',
    country: 'China',
    founded: '1995',
    stats: { totalListings: 45, avgPrice: 'Rs. 55 Lakh', popularModels: ['Atto 3', 'Dolphin', 'Seal'] },
    models: ['Atto 3', 'Dolphin', 'Seal', 'Han', 'Tang'],
    faqs: [
      { q: 'Why choose BYD electric vehicles in Nepal?', a: 'BYD offers advanced battery technology, competitive pricing, good range, and growing service network in Nepal. Their vehicles are well-suited for Nepal\'s push towards electric mobility.' },
      { q: 'What is the battery warranty for BYD vehicles?', a: 'BYD typically offers 8-year battery warranty, providing peace of mind for EV owners in Nepal.' },
    ],
  },
  'maruti-suzuki': {
    name: 'Maruti Suzuki',
    description: 'Browse verified used Maruti Suzuki vehicles in Nepal. Maruti Suzuki is known for fuel efficiency, low maintenance costs, and excellent resale value. Find popular models like Swift, Baleno, and Dzire.',
    country: 'India',
    founded: '1981',
    stats: { totalListings: 134, avgPrice: 'Rs. 18 Lakh', popularModels: ['Swift', 'Baleno', 'Dzire', 'Alto'] },
    models: ['Swift', 'Baleno', 'Dzire', 'Alto', 'Brezza', 'Ertiga', 'XL6'],
    faqs: [
      { q: 'Why are Maruti Suzuki vehicles popular in Nepal?', a: 'Maruti Suzuki vehicles are popular in Nepal for their excellent fuel efficiency, low maintenance costs, widespread service network, and strong resale value.' },
    ],
  },
};

export default function MakePage() {
  const { make } = useParams<{ make: string }>();
  const { state, toggleFavorite } = useAppState();

  const makeData = make ? MAKE_DATA[make.toLowerCase()] : null;

  const makeListings = useMemo(() => {
    if (!makeData) return [];
    return listings.filter(l => {
      const vehicle = getVehicleById(l.vehicleId);
      return l.status === 'ACTIVE' && vehicle?.make.toLowerCase() === makeData.name.toLowerCase();
    });
  }, [makeData]);

  if (!makeData) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Make not found</h1>
        <p className="text-gray-500 mt-2">We don't have data for this vehicle make yet.</p>
        <Link to="/search" className="mt-4 inline-block text-blue-600 hover:text-blue-700 font-medium">
          Browse all vehicles
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <SEO
        title={`Used ${makeData.name} Cars for Sale in Nepal | GadiBazar`}
        description={makeData.description}
        keywords={`used ${makeData.name} Nepal, ${makeData.name} price Nepal, ${makeData.name} cars for sale, second hand ${makeData.name}, ${makeData.name} models Nepal`}
        canonical={`https://gadibazar.com/cars/${make}`}
        structuredData={generateBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Cars', url: '/search' },
          { name: makeData.name, url: `/cars/${make}` },
        ])}
      />

      {/* Header */}
      <div className="mb-8">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <Link to="/search" className="hover:text-blue-600">Cars</Link>
          <span>/</span>
          <span className="text-gray-900">{makeData.name}</span>
        </nav>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Used {makeData.name} Cars for Sale in Nepal
        </h1>
        <p className="text-gray-600 mt-2 max-w-3xl">{makeData.description}</p>
        
        {/* Make Info */}
        <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <Car className="w-4 h-4" />
            Country: {makeData.country}
          </span>
          <span className="flex items-center gap-1">
            <TrendingUp className="w-4 h-4" />
            Founded: {makeData.founded}
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <Car className="w-6 h-6 text-blue-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">{makeData.stats.totalListings}+</p>
          <p className="text-sm text-gray-500">Vehicles Listed</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-gray-900">{makeData.stats.avgPrice}</p>
          <p className="text-sm text-gray-500">Average Price</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <Shield className="w-6 h-6 text-green-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">{makeListings.filter(l => l.isInspected).length}</p>
          <p className="text-sm text-gray-500">Inspected Vehicles</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <Zap className="w-6 h-6 text-purple-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">{makeListings.filter(l => getVehicleById(l.vehicleId)?.isEV).length}</p>
          <p className="text-sm text-gray-500">Electric Vehicles</p>
        </div>
      </div>

      {/* Available Vehicles */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Available {makeData.name} Vehicles
        </h2>
        {makeListings.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
            <Car className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No {makeData.name} vehicles currently listed</p>
            <Link to="/search" className="mt-3 inline-block text-blue-600 hover:text-blue-700 font-medium">
              Browse all vehicles
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {makeListings.map(listing => {
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
                    <p className="text-sm text-gray-500 mt-1">{vehicle.variant}</p>
                    <p className="text-lg font-bold text-blue-600 mt-2">{formatPrice(listing.price)}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                      <span>{formatMileage(vehicle.mileage)}</span>
                      <span>•</span>
                      <span>{vehicle.fuelType}</span>
                      <span>•</span>
                      <span>{listing.district}</span>
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

      {/* Popular Models */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Popular {makeData.name} Models</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {makeData.models.map(model => (
            <Link
              key={model}
              to={`/search?make=${makeData.name.toLowerCase()}&q=${model}`}
              className="bg-white border border-gray-200 rounded-xl p-4 text-center hover:border-blue-500 hover:shadow-md transition-all"
            >
              <Car className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="font-medium text-gray-900">{model}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* FAQs */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Frequently Asked Questions - {makeData.name} in Nepal
        </h2>
        <div className="space-y-4">
          {makeData.faqs.map((faq, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
              <p className="text-sm text-gray-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Other Makes */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Browse Other Makes</h2>
        <div className="flex flex-wrap gap-3">
          {Object.entries(MAKE_DATA)
            .filter(([key]) => key !== make)
            .map(([key, data]) => (
              <Link
                key={key}
                to={`/cars/${key}`}
                className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:border-blue-500 hover:text-blue-600 transition-colors"
              >
                {data.name}
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
