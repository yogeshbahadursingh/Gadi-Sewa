import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Car, TrendingUp, Shield, CheckCircle2, Zap } from 'lucide-react';
import { listings, vehicles, formatPrice, formatMileage, getVehicleById } from '../store/data';

export default function HomePage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const featuredListings = listings.filter((l) => l.isFeatured && l.status === 'ACTIVE').slice(0, 6);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?q=${searchQuery}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Nepal's Trusted Vehicle Marketplace
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Buy, sell, and verify vehicles with complete transparency
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="flex gap-2 bg-white rounded-xl p-2 shadow-lg">
              <div className="flex-1 flex items-center gap-2 px-4">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by make, model, or keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-3 text-gray-900 placeholder-gray-400 outline-none"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Search
              </button>
            </div>
          </form>

          {/* Quick Stats */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <p className="text-3xl font-bold">{listings.filter((l) => l.status === 'ACTIVE').length}+</p>
              <p className="text-sm text-blue-200">Active Listings</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">{vehicles.length}</p>
              <p className="text-sm text-blue-200">Vehicle Passports</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">500+</p>
              <p className="text-sm text-blue-200">Inspections Done</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">4.8★</p>
              <p className="text-sm text-blue-200">User Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="bg-white py-12 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Verified Vehicles</p>
                <p className="text-sm text-gray-500">Inspected & Passport</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Complete History</p>
                <p className="text-sm text-gray-500">Ownership & Service</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">EV Battery SOH</p>
                <p className="text-sm text-gray-500">Verified Health Data</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Market Valuation</p>
                <p className="text-sm text-gray-500">Fair Price Analysis</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Featured Vehicles</h2>
            <p className="text-gray-500 mt-2">Handpicked verified vehicles</p>
          </div>
          <Link
            to="/search"
            className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
          >
            View all <Car className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredListings.map((listing) => {
            const vehicle = getVehicleById(listing.vehicleId);
            if (!vehicle) return null;

            return (
              <Link
                key={listing.id}
                to={`/listing/${listing.id}`}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group"
              >
                <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
                  <img
                    src={listing.images[0]}
                    alt={listing.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    {listing.isInspected && (
                      <span className="bg-green-600 text-white text-xs font-medium px-2 py-1 rounded-md flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Inspected
                      </span>
                    )}
                    {listing.hasPassport && (
                      <span className="bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded-md">
                        Passport
                      </span>
                    )}
                  </div>
                  {vehicle.isEV && (
                    <div className="absolute top-3 right-3">
                      <span className="bg-emerald-500 text-white text-xs font-medium px-2 py-1 rounded-md flex items-center gap-1">
                        <Zap className="w-3 h-3" /> EV
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                    {listing.title}
                  </h3>
                  <p className="text-xl font-bold text-blue-600 mt-2">{formatPrice(listing.price)}</p>
                  <div className="flex items-center gap-3 mt-3 text-xs text-gray-500">
                    <span>{formatMileage(vehicle.mileage)}</span>
                    <span>•</span>
                    <span>{vehicle.year}</span>
                    <span>•</span>
                    <span>{vehicle.fuelType}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                      {vehicle.transmission}
                    </span>
                    {vehicle.batterySOH && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                        SOH: {vehicle.batterySOH}%
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to sell your vehicle?</h2>
          <p className="text-blue-100 mb-6 max-w-lg mx-auto">
            List your vehicle, get it inspected, and receive a Vehicle Passport. Reach thousands of verified buyers.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/sell"
              className="bg-white text-blue-600 px-8 py-3 rounded-xl font-medium hover:bg-blue-50 transition-colors"
            >
              Start Selling
            </Link>
            <Link
              to="/inspect"
              className="border-2 border-white text-white px-8 py-3 rounded-xl font-medium hover:bg-white/10 transition-colors"
            >
              Book an Inspection
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
