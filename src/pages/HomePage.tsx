import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Shield, Gauge, Battery, Car, TrendingUp, CheckCircle2, ArrowRight, Star, MapPin, Clock, Zap } from 'lucide-react';
import { listings, vehicles, formatPrice, formatMileage, getVehicleById } from '../store/data';

export default function HomePage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const featuredListings = listings.filter(l => l.isFeatured && l.status === 'ACTIVE').slice(0, 6);
  const evListings = listings.filter(l => {
    const v = getVehicleById(l.vehicleId);
    return v?.isEV;
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?q=${searchQuery}${vehicleType ? `&type=${vehicleType}` : ''}`);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 25% 50%, rgba(59,130,246,0.3) 0%, transparent 50%), radial-gradient(circle at 75% 50%, rgba(99,102,241,0.3) 0%, transparent 50%)' }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Nepal's Trusted<br />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Vehicle Ecosystem</span>
            </h1>
            <p className="mt-4 md:mt-6 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              Buy, sell, inspect, and verify vehicles with confidence. Vehicle Passports, professional inspections, and complete ownership history — all in one platform.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="mt-8 md:mt-10 max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-3 bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/20">
                <div className="flex-1 flex items-center gap-2 bg-white rounded-xl px-4">
                  <Search className="w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by make, model, or keyword..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full py-3 text-gray-900 placeholder-gray-400 outline-none text-sm"
                  />
                </div>
                <select
                  value={vehicleType}
                  onChange={e => setVehicleType(e.target.value)}
                  className="py-3 px-4 rounded-xl text-gray-900 text-sm outline-none bg-white"
                >
                  <option value="">All Types</option>
                  <option value="car">Cars</option>
                  <option value="motorbike">Motorbikes</option>
                  <option value="scooter">Scooters</option>
                  <option value="ev">Electric Vehicles</option>
                </select>
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium text-sm transition-colors">
                  Search
                </button>
              </div>
            </form>

            {/* Quick stats */}
            <div className="mt-8 flex flex-wrap justify-center gap-6 md:gap-10">
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold">{listings.filter(l => l.status === 'ACTIVE').length}+</p>
                <p className="text-sm text-gray-400">Active Listings</p>
              </div>
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold">{vehicles.length}</p>
                <p className="text-sm text-gray-400">Vehicle Passports</p>
              </div>
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold">500+</p>
                <p className="text-sm text-gray-400">Inspections Done</p>
              </div>
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold">4.8★</p>
                <p className="text-sm text-gray-400">User Rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-3">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Verified Vehicles</p>
                <p className="text-xs text-gray-500">Inspected & Passport</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <Gauge className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Odometer History</p>
                <p className="text-xs text-gray-500">Tamper detection</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3">
              <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                <Battery className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">EV Battery SOH</p>
                <p className="text-xs text-gray-500">Verified health data</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3">
              <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Ownership Transfer</p>
                <p className="text-xs text-gray-500">Complete support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Featured Vehicles</h2>
            <p className="text-sm text-gray-500 mt-1">Handpicked verified vehicles</p>
          </div>
          <Link to="/search" className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredListings.map(listing => {
            const vehicle = getVehicleById(listing.vehicleId);
            if (!vehicle) return null;
            return (
              <Link key={listing.id} to={`/listing/${listing.id}`} className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
                  <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute top-3 left-3 flex gap-2">
                    {listing.isInspected && <span className="bg-green-600 text-white text-xs font-medium px-2 py-1 rounded-md flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Inspected</span>}
                    {listing.hasPassport && <span className="bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded-md">Passport</span>}
                  </div>
                  {vehicle.isEV && <div className="absolute top-3 right-3"><span className="bg-emerald-500 text-white text-xs font-medium px-2 py-1 rounded-md flex items-center gap-1"><Zap className="w-3 h-3" /> EV</span></div>}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">{listing.title}</h3>
                  <p className="text-xl font-bold text-blue-600 mt-2">{formatPrice(listing.price)}</p>
                  <div className="flex items-center gap-3 mt-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{listing.district}</span>
                    <span>{formatMileage(vehicle.mileage)}</span>
                    <span>{vehicle.year}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{vehicle.fuelType}</span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{vehicle.transmission}</span>
                    {vehicle.batterySOH && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">SOH: {vehicle.batterySOH}%</span>}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* EV Section */}
      <section className="bg-gradient-to-br from-emerald-50 to-teal-50 border-y border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><Zap className="w-6 h-6 text-emerald-600" /> Electric Vehicles</h2>
              <p className="text-sm text-gray-500 mt-1">Verified battery health, real range data</p>
            </div>
            <Link to="/search?ev=true" className="text-sm font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
              View all EVs <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {evListings.map(listing => {
              const vehicle = getVehicleById(listing.vehicleId);
              if (!vehicle) return null;
              return (
                <Link key={listing.id} to={`/listing/${listing.id}`} className="group bg-white rounded-xl border border-emerald-200 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
                    <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute top-3 left-3">
                      <span className="bg-emerald-500 text-white text-xs font-medium px-2 py-1 rounded-md flex items-center gap-1"><Zap className="w-3 h-3" /> Electric</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors line-clamp-1">{listing.title}</h3>
                    <p className="text-xl font-bold text-emerald-600 mt-2">{formatPrice(listing.price)}</p>
                    <div className="flex items-center gap-3 mt-3 text-xs text-gray-500">
                      <span>{formatMileage(vehicle.mileage)}</span>
                      <span>{vehicle.year}</span>
                    </div>
                    {vehicle.batterySOH && (
                      <div className="mt-3 flex items-center gap-2">
                        <div className="flex-1 bg-gray-100 rounded-full h-2">
                          <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${vehicle.batterySOH}%` }} />
                        </div>
                        <span className="text-xs font-medium text-emerald-700">{vehicle.batterySOH}% SOH</span>
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">How GadiBazar Works</h2>
          <p className="text-gray-500 mt-2">A complete vehicle ecosystem built for Nepal</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Search, title: 'Find Your Vehicle', desc: 'Search thousands of verified listings with advanced filters for make, model, price, EV, and more.' },
            { icon: Gauge, title: 'Get it Inspected', desc: 'Professional multi-point inspection with detailed reports, photos, and OBD diagnostics.' },
            { icon: Shield, title: 'Vehicle Passport', desc: 'Permanent digital passport tracking ownership, odometer, service history, and verification.' },
            { icon: TrendingUp, title: 'Buy with Confidence', desc: 'Verified data, transparent history, secure offers, and ownership transfer support.' },
          ].map((step, i) => (
            <div key={i} className="text-center p-6 rounded-xl bg-white border border-gray-100 hover:border-blue-200 hover:shadow-sm transition-all">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                <step.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900">{step.title}</h3>
              <p className="text-sm text-gray-500 mt-2">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white">Ready to sell your vehicle?</h2>
          <p className="text-blue-100 mt-2 max-w-lg mx-auto">List your vehicle, get it inspected, and receive a Vehicle Passport. Reach thousands of verified buyers.</p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/sell" className="bg-white text-blue-600 px-6 py-3 rounded-xl font-medium hover:bg-blue-50 transition-colors">Start Selling</Link>
            <Link to="/inspect" className="border border-white/30 text-white px-6 py-3 rounded-xl font-medium hover:bg-white/10 transition-colors">Book an Inspection</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
