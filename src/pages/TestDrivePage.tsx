import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, MapPin, CheckCircle2, Car, User, Phone, MessageSquare, AlertCircle } from 'lucide-react';
import { getListingById, getVehicleById, getUserById, formatPrice } from '../store/data';
import { Badge } from '../components/Layout';

export default function TestDrivePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const listing = getListingById(id || '');
  const vehicle = listing ? getVehicleById(listing.vehicleId) : null;
  const seller = listing ? getUserById(listing.sellerId) : null;

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    location: 'seller',
    notes: '',
    hasLicense: false,
    agreeTerms: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.fullName || !formData.email || !formData.phone || !formData.date || !formData.time) {
      setError('Please fill in all required fields');
      return;
    }
    if (!formData.hasLicense) {
      setError('You must have a valid driving license to book a test drive');
      return;
    }
    if (!formData.agreeTerms) {
      setError('Please agree to the test drive terms');
      return;
    }

    setSubmitted(true);
  };

  if (!listing || !vehicle) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-medium text-gray-900">Listing not found</h2>
        <Link to="/search" className="mt-4 inline-block text-blue-600">Back to search</Link>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Test Drive Booked!</h1>
        <p className="text-gray-500 mt-2">Your test drive request has been sent to the seller.</p>

        <div className="mt-6 bg-white border border-gray-200 rounded-2xl p-6 text-left">
          <h3 className="font-semibold text-gray-900 mb-4">Booking Details</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Car className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">{vehicle.year} {vehicle.make} {vehicle.model}</p>
                <p className="text-xs text-gray-500">{vehicle.variant}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Calendar className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">{new Date(formData.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p className="text-xs text-gray-500">at {formData.time}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <MapPin className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">{formData.location === 'seller' ? listing.location : 'Public meeting place'}</p>
                <p className="text-xs text-gray-500">{formData.location === 'seller' ? "Seller's location" : 'Safe public location'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-xl text-left">
          <h4 className="text-sm font-medium text-blue-900 mb-2">What happens next?</h4>
          <ul className="space-y-1 text-sm text-blue-700">
            <li>• The seller will confirm your booking within 24 hours</li>
            <li>• You'll receive a confirmation message with exact details</li>
            <li>• Bring your valid driving license and citizenship ID</li>
            <li>• The seller or their representative will accompany you</li>
          </ul>
        </div>

        <div className="mt-6 flex gap-3">
          <Link to={`/listing/${listing.id}`} className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 text-center">
            Back to Listing
          </Link>
          <Link to="/search" className="flex-1 py-3 border border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50 text-center">
            Continue Browsing
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
      <Link to={`/listing/${listing.id}`} className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to listing
      </Link>

      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
          <Car className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Book a Test Drive</h1>
          <p className="text-sm text-gray-500">{vehicle.year} {vehicle.make} {vehicle.model}</p>
        </div>
      </div>

      {/* Vehicle Preview */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6 flex items-center gap-4">
        <img src={listing.images[0]} alt="" className="w-24 h-16 rounded-lg object-cover" />
        <div className="flex-1">
          <p className="font-medium text-gray-900">{vehicle.make} {vehicle.model} {vehicle.variant}</p>
          <p className="text-lg font-bold text-blue-600">{formatPrice(listing.price)}</p>
          <p className="text-xs text-gray-500 flex items-center gap-1"><MapPin className="w-3 h-3" />{listing.location}</p>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-2xl p-6 space-y-5">
        <h2 className="font-semibold text-gray-900">Your Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">Full Name *</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={e => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="Your full name"
              className="w-full py-2.5 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">Email *</label>
            <input
              type="email"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              placeholder="you@example.com"
              className="w-full py-2.5 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">Phone *</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={e => setFormData({ ...formData, phone: e.target.value })}
              placeholder="98XXXXXXXX"
              className="w-full py-2.5 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <hr className="border-gray-100" />

        <h2 className="font-semibold text-gray-900">Schedule</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">Preferred Date *</label>
            <input
              type="date"
              value={formData.date}
              onChange={e => setFormData({ ...formData, date: e.target.value })}
              min={new Date().toISOString().split('T')[0]}
              className="w-full py-2.5 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">Preferred Time *</label>
            <select
              value={formData.time}
              onChange={e => setFormData({ ...formData, time: e.target.value })}
              className="w-full py-2.5 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500"
            >
              <option value="">Select time</option>
              {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-2">Meeting Location</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.location === 'seller' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
              <input
                type="radio"
                name="location"
                value="seller"
                checked={formData.location === 'seller'}
                onChange={e => setFormData({ ...formData, location: e.target.value })}
                className="mt-0.5"
              />
              <div>
                <p className="text-sm font-medium text-gray-900">At Seller's Location</p>
                <p className="text-xs text-gray-500 mt-0.5">{listing.location}</p>
              </div>
            </label>
            <label className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.location === 'public' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
              <input
                type="radio"
                name="location"
                value="public"
                checked={formData.location === 'public'}
                onChange={e => setFormData({ ...formData, location: e.target.value })}
                className="mt-0.5"
              />
              <div>
                <p className="text-sm font-medium text-gray-900">Public Meeting Place</p>
                <p className="text-xs text-gray-500 mt-0.5">Safe public location (mall, parking lot)</p>
              </div>
            </label>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1.5">Additional Notes</label>
          <textarea
            value={formData.notes}
            onChange={e => setFormData({ ...formData, notes: e.target.value })}
            placeholder="Any specific questions or requests..."
            className="w-full py-2.5 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500 resize-none h-20"
          />
        </div>

        <hr className="border-gray-100" />

        <div className="space-y-3">
          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.hasLicense}
              onChange={e => setFormData({ ...formData, hasLicense: e.target.checked })}
              className="mt-0.5 rounded border-gray-300"
            />
            <span className="text-sm text-gray-700">I have a valid driving license</span>
          </label>
          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.agreeTerms}
              onChange={e => setFormData({ ...formData, agreeTerms: e.target.checked })}
              className="mt-0.5 rounded border-gray-300"
            />
            <span className="text-xs text-gray-600">
              I agree to the test drive terms and conditions. I understand that I am responsible for any damage caused during the test drive and will follow all traffic rules.
            </span>
          </label>
        </div>

        <div className="flex gap-3 pt-2">
          <Link to={`/listing/${listing.id}`} className="flex-1 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 text-center">
            Cancel
          </Link>
          <button type="submit" className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> Book Test Drive
          </button>
        </div>
      </form>

      {/* Safety Tips */}
      <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
        <h4 className="text-sm font-medium text-amber-900 mb-2 flex items-center gap-2">
          <AlertCircle className="w-4 h-4" /> Test Drive Safety Tips
        </h4>
        <ul className="space-y-1 text-xs text-amber-700">
          <li>• Always bring your valid driving license and citizenship ID</li>
          <li>• Meet in a public place if you prefer</li>
          <li>• Bring a friend or family member along</li>
          <li>• Check the vehicle's documents before driving</li>
          <li>• Test the vehicle on various road conditions</li>
          <li>• Never pay any money before deciding to purchase</li>
        </ul>
      </div>
    </div>
  );
}
