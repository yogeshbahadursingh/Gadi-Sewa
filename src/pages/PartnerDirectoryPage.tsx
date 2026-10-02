import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Wrench, MapPin, Phone, Star, Search, Filter, Car, Zap, Shield, CheckCircle2, Clock, Award } from 'lucide-react';
import { Badge } from '../components/Layout';

interface Partner {
  id: string;
  name: string;
  type: 'garage' | 'service' | 'ev-specialist' | 'tyre' | 'detailing' | 'body-shop';
  address: string;
  district: string;
  phone: string;
  rating: number;
  reviews: number;
  verified: boolean;
  specialties: string[];
  description: string;
  openHours: string;
  image: string;
}

const PARTNERS: Partner[] = [
  {
    id: 'p1',
    name: 'Everest Auto Workshop',
    type: 'garage',
    address: 'Pulchowk, Lalitpur',
    district: 'Lalitpur',
    phone: '01-5551234',
    rating: 4.8,
    reviews: 156,
    verified: true,
    specialties: ['General Repair', 'Engine Overhaul', 'AC Service', 'Denting/Painting'],
    description: 'Full-service auto workshop with 15+ years experience. Specializing in Japanese and Korean vehicles.',
    openHours: 'Sun-Fri: 9AM-6PM',
    image: 'https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=400',
  },
  {
    id: 'p2',
    name: 'Kathmandu EV Care Center',
    type: 'ev-specialist',
    address: 'Sanepa, Lalitpur',
    district: 'Lalitpur',
    phone: '01-4445678',
    rating: 4.9,
    reviews: 89,
    verified: true,
    specialties: ['Battery Diagnostics', 'BMS Service', 'Charging Systems', 'EV Maintenance'],
    description: 'Nepal\'s first dedicated EV service center. Certified technicians for BYD, Tata, MG electric vehicles.',
    openHours: 'Sun-Sat: 8AM-7PM',
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400',
  },
  {
    id: 'p3',
    name: 'Himalayan Tyre House',
    type: 'tyre',
    address: 'Ring Road, Kathmandu',
    district: 'Kathmandu',
    phone: '01-4223344',
    rating: 4.6,
    reviews: 234,
    verified: true,
    specialties: ['All Tyre Brands', 'Wheel Alignment', 'Balancing', 'Puncture Repair'],
    description: 'Authorized dealer for Michelin, Bridgestone, MRF. Complete tyre solutions for all vehicles.',
    openHours: 'Sun-Sat: 7AM-8PM',
    image: 'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=400',
  },
  {
    id: 'p4',
    name: 'Pokhara Auto Care',
    type: 'service',
    address: 'Lakeside, Pokhara',
    district: 'Pokhara',
    phone: '061-554433',
    rating: 4.7,
    reviews: 178,
    verified: true,
    specialties: ['Periodic Service', 'Oil Change', 'Brake Service', 'Suspension'],
    description: 'Trusted service center in Pokhara. Authorized service for Hyundai, Kia, and Tata vehicles.',
    openHours: 'Sun-Fri: 9AM-6PM',
    image: 'https://images.unsplash.com/photo-1486006920555-c77dcf18193c?w=400',
  },
  {
    id: 'p5',
    name: 'Sparkle Detailing Studio',
    type: 'detailing',
    address: 'Baluwatar, Kathmandu',
    district: 'Kathmandu',
    phone: '01-4443322',
    rating: 4.9,
    reviews: 312,
    verified: true,
    specialties: ['Ceramic Coating', 'PPF', 'Interior Detailing', 'Paint Correction'],
    description: 'Premium detailing studio. Professional ceramic coating and paint protection film services.',
    openHours: 'Sun-Sat: 9AM-7PM',
    image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=400',
  },
  {
    id: 'p6',
    name: 'Chitwan Motor Works',
    type: 'garage',
    address: 'Narayangadh, Chitwan',
    district: 'Chitwan',
    phone: '056-550011',
    rating: 4.5,
    reviews: 98,
    verified: true,
    specialties: ['Diesel Engine', 'Transmission', 'Electrical', 'General Repair'],
    description: 'Reliable garage in Chitwan. Expert in diesel vehicles and commercial transport.',
    openHours: 'Sun-Fri: 8AM-6PM',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
  },
];

const TYPE_LABELS: Record<string, { label: string; icon: any; color: string }> = {
  'garage': { label: 'General Garage', icon: Wrench, color: 'bg-blue-100 text-blue-600' },
  'service': { label: 'Authorized Service', icon: Shield, color: 'bg-green-100 text-green-600' },
  'ev-specialist': { label: 'EV Specialist', icon: Zap, color: 'bg-emerald-100 text-emerald-600' },
  'tyre': { label: 'Tyre Center', icon: Car, color: 'bg-orange-100 text-orange-600' },
  'detailing': { label: 'Detailing', icon: Award, color: 'bg-purple-100 text-purple-600' },
  'body-shop': { label: 'Body Shop', icon: Wrench, color: 'bg-red-100 text-red-600' },
};

export default function PartnerDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');

  const filteredPartners = PARTNERS.filter(p => {
    if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase()) && !p.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))) return false;
    if (selectedType && p.type !== selectedType) return false;
    if (selectedDistrict && p.district !== selectedDistrict) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Wrench className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Service Partners</h1>
        <p className="text-gray-500 mt-2">Find verified garages, service centers, and specialists near you</p>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by name or specialty..."
              className="w-full py-2.5 pl-10 pr-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500"
            />
          </div>
          <select
            value={selectedType}
            onChange={e => setSelectedType(e.target.value)}
            className="py-2.5 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500"
          >
            <option value="">All Types</option>
            <option value="garage">General Garage</option>
            <option value="service">Authorized Service</option>
            <option value="ev-specialist">EV Specialist</option>
            <option value="tyre">Tyre Center</option>
            <option value="detailing">Detailing</option>
            <option value="body-shop">Body Shop</option>
          </select>
          <select
            value={selectedDistrict}
            onChange={e => setSelectedDistrict(e.target.value)}
            className="py-2.5 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500"
          >
            <option value="">All Locations</option>
            <option value="Kathmandu">Kathmandu</option>
            <option value="Lalitpur">Lalitpur</option>
            <option value="Pokhara">Pokhara</option>
            <option value="Chitwan">Chitwan</option>
          </select>
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-gray-500 mb-4">{filteredPartners.length} partners found</p>

      {/* Partners Grid */}
      {filteredPartners.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
          <Wrench className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No partners found</h3>
          <p className="text-sm text-gray-500 mt-1">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPartners.map(partner => {
            const typeInfo = TYPE_LABELS[partner.type];
            return (
              <div key={partner.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative aspect-[16/9] bg-gray-100">
                  <img src={partner.image} alt={partner.name} className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium ${typeInfo.color}`}>
                      <typeInfo.icon className="w-3.5 h-3.5" />
                      {typeInfo.label}
                    </span>
                  </div>
                  {partner.verified && (
                    <div className="absolute top-3 right-3">
                      <span className="inline-flex items-center gap-1 bg-green-600 text-white px-2 py-1 rounded-lg text-xs font-medium">
                        <CheckCircle2 className="w-3 h-3" /> Verified
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 text-lg">{partner.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span className="text-sm font-medium text-gray-900">{partner.rating}</span>
                    </div>
                    <span className="text-xs text-gray-500">({partner.reviews} reviews)</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">{partner.description}</p>
                  <div className="mt-3 space-y-1.5">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{partner.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{partner.openHours}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{partner.phone}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {partner.specialties.slice(0, 3).map(s => (
                      <span key={s} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{s}</span>
                    ))}
                    {partner.specialties.length > 3 && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">+{partner.specialties.length - 3}</span>
                    )}
                  </div>
                  <div className="flex gap-2 mt-4">
                    <a href={`tel:${partner.phone}`} className="flex-1 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 text-center">
                      Call Now
                    </a>
                    <button 
                      onClick={() => alert(`Quote request sent to ${partner.name}!\n\nThey will contact you within 24 hours with a quote.`)}
                      className="flex-1 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Get Quote
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Become a Partner CTA */}
      <div className="mt-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-8 text-white text-center">
        <h2 className="text-2xl font-bold">Are You a Service Provider?</h2>
        <p className="mt-2 text-orange-100 max-w-lg mx-auto">
          Join Nepal's trusted vehicle service network. Get verified, receive leads, and grow your business.
        </p>
        <button 
          onClick={() => window.location.href = '/dealer-application'}
          className="mt-6 bg-white text-orange-600 px-8 py-3 rounded-xl font-medium hover:bg-orange-50 transition-colors"
        >
          Apply to Become a Partner
        </button>
      </div>
    </div>
  );
}
