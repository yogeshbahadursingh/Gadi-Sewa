import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DollarSign, MessageSquare, Clock, CheckCircle2, XCircle, AlertCircle, Eye } from 'lucide-react';
import { useAuth } from '../context/AppContext';
import { formatPrice } from '../store/data';
import { Badge } from '../components/Layout';

// Mock offers data
const mockOffers = [
  {
    id: 'offer1',
    listingId: 'l1',
    buyerId: 'u3',
    amount: 11800000,
    message: 'Would you consider Rs. 1,18,00,000? I can arrange payment immediately.',
    status: 'pending',
    createdAt: '2026-01-12',
    sellerResponse: null,
    vehicle: {
      make: 'Toyota',
      model: 'Fortuner',
      variant: '2.8 GD-6 4WD',
      year: 2022,
      image: 'https://images.unsplash.com/photo-1625231334401-4abc05e17e38?w=400',
      askingPrice: 12500000,
    },
    seller: {
      name: 'Ramesh Thapa',
    },
  },
  {
    id: 'offer2',
    listingId: 'l3',
    buyerId: 'u3',
    amount: 5500000,
    message: 'I am very interested in this EV. Can we discuss the price?',
    status: 'countered',
    createdAt: '2026-01-10',
    sellerResponse: {
      amount: 5700000,
      message: 'I can do Rs. 57,00,000 as the battery health is excellent.',
      date: '2026-01-11',
    },
    vehicle: {
      make: 'BYD',
      model: 'Atto 3',
      variant: 'Extended Range',
      year: 2024,
      image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400',
      askingPrice: 5800000,
    },
    seller: {
      name: 'Sunil Shakya',
    },
  },
  {
    id: 'offer3',
    listingId: 'l7',
    buyerId: 'u3',
    amount: 1750000,
    message: 'Looking for a good hatchback. Is the price negotiable?',
    status: 'rejected',
    createdAt: '2026-01-08',
    sellerResponse: {
      amount: null,
      message: 'Sorry, the price is fixed. The car is in excellent condition.',
      date: '2026-01-09',
    },
    vehicle: {
      make: 'Maruti Suzuki',
      model: 'Swift',
      variant: 'ZXi+',
      year: 2022,
      image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400',
      askingPrice: 1850000,
    },
    seller: {
      name: 'Sunil Shakya',
    },
  },
];

export default function OffersPage() {
  const { currentUser } = useAuth();
  const [filter, setFilter] = useState('all');

  const offers = mockOffers.filter(o => o.buyerId === currentUser?.id);
  
  const filteredOffers = filter === 'all' 
    ? offers 
    : offers.filter(o => o.status === filter);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="warning">Pending</Badge>;
      case 'accepted':
        return <Badge variant="success">Accepted</Badge>;
      case 'rejected':
        return <Badge variant="danger">Rejected</Badge>;
      case 'countered':
        return <Badge variant="info">Countered</Badge>;
      case 'withdrawn':
        return <Badge variant="default">Withdrawn</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'border-amber-200 bg-amber-50';
      case 'accepted':
        return 'border-green-200 bg-green-50';
      case 'rejected':
        return 'border-red-200 bg-red-50';
      case 'countered':
        return 'border-blue-200 bg-blue-50';
      case 'withdrawn':
        return 'border-gray-200 bg-gray-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const calculateDiscount = (offer: number, asking: number) => {
    const discount = ((asking - offer) / asking) * 100;
    return discount.toFixed(1);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Offers</h1>
        <p className="text-gray-500 mt-2">Track your offers on vehicles</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-sm text-gray-500">Total Offers</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{offers.length}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-sm text-gray-500">Pending</p>
          <p className="text-2xl font-bold text-amber-600 mt-1">
            {offers.filter(o => o.status === 'pending').length}
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-sm text-gray-500">Accepted</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {offers.filter(o => o.status === 'accepted').length}
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-sm text-gray-500">Total Offered</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">
            Rs. {offers.reduce((sum, o) => sum + o.amount, 0).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {['all', 'pending', 'accepted', 'rejected', 'countered', 'withdrawn'].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === status
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Offers List */}
      {filteredOffers.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
          <DollarSign className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No offers found</h3>
          <p className="text-sm text-gray-500 mt-1">
            {filter === 'all' 
              ? "You haven't made any offers yet"
              : `No ${filter} offers`}
          </p>
          <Link to="/search" className="mt-4 inline-block text-blue-600 hover:text-blue-700 font-medium">
            Browse vehicles
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOffers.map(offer => {
            const discount = calculateDiscount(offer.amount, offer.vehicle.askingPrice);
            
            return (
              <div
                key={offer.id}
                className={`bg-white border-2 rounded-2xl p-6 ${getStatusColor(offer.status)}`}
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Vehicle Image */}
                  <div className="md:w-48 flex-shrink-0">
                    <img
                      src={offer.vehicle.image}
                      alt={`${offer.vehicle.make} ${offer.vehicle.model}`}
                      className="w-full h-32 md:h-48 rounded-xl object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {offer.vehicle.year} {offer.vehicle.make} {offer.vehicle.model}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">{offer.vehicle.variant}</p>
                      </div>
                      {getStatusBadge(offer.status)}
                    </div>

                    {/* Price Comparison */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="p-3 bg-white rounded-lg border border-gray-200">
                        <p className="text-xs text-gray-500 mb-1">Asking Price</p>
                        <p className="text-lg font-bold text-gray-900">
                          {formatPrice(offer.vehicle.askingPrice)}
                        </p>
                      </div>
                      <div className="p-3 bg-blue-100 rounded-lg border border-blue-300">
                        <p className="text-xs text-blue-700 mb-1">Your Offer</p>
                        <p className="text-lg font-bold text-blue-900">
                          {formatPrice(offer.amount)}
                        </p>
                        <p className="text-xs text-blue-700 mt-1">
                          {discount}% below asking
                        </p>
                      </div>
                    </div>

                    {/* Your Message */}
                    {offer.message && (
                      <div className="p-3 bg-gray-50 rounded-lg mb-4">
                        <p className="text-xs text-gray-500 mb-1">Your Message</p>
                        <p className="text-sm text-gray-700">{offer.message}</p>
                      </div>
                    )}

                    {/* Seller Response */}
                    {offer.sellerResponse && (
                      <div className="p-3 bg-white rounded-lg border border-gray-200 mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <MessageSquare className="w-4 h-4 text-gray-500" />
                          <p className="text-xs text-gray-500">Seller Response</p>
                        </div>
                        {offer.sellerResponse.amount && (
                          <p className="text-sm font-medium text-gray-900 mb-1">
                            Counter Offer: {formatPrice(offer.sellerResponse.amount)}
                          </p>
                        )}
                        <p className="text-sm text-gray-700">{offer.sellerResponse.message}</p>
                        <p className="text-xs text-gray-500 mt-2">
                          {new Date(offer.sellerResponse.date).toLocaleDateString()}
                        </p>
                      </div>
                    )}

                    {/* Timeline */}
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>Offered: {new Date(offer.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>Seller: {offer.seller.name}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <Link
                        to={`/listing/${offer.listingId}`}
                        className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 text-center flex items-center justify-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        View Listing
                      </Link>
                      {offer.status === 'pending' && (
                        <button className="px-4 py-2.5 border border-red-200 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50">
                          Withdraw
                        </button>
                      )}
                      {offer.status === 'countered' && (
                        <>
                          <button className="flex-1 py-2.5 bg-green-600 text-white rounded-xl text-sm font-medium hover:bg-green-700">
                            Accept Counter
                          </button>
                          <button className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50">
                            Counter Again
                          </button>
                        </>
                      )}
                      {offer.status === 'accepted' && (
                        <Link
                          to="/payment"
                          className="flex-1 py-2.5 bg-green-600 text-white rounded-xl text-sm font-medium hover:bg-green-700 text-center"
                        >
                          Proceed to Payment
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Info Box */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-5">
        <h3 className="font-semibold text-blue-900 mb-2">About Offers</h3>
        <ul className="space-y-1 text-sm text-blue-700">
          <li>• Sellers typically respond within 24-48 hours</li>
          <li>• You can withdraw pending offers at any time</li>
          <li>• Counter offers allow for price negotiation</li>
          <li>• Accepted offers can proceed to reservation and payment</li>
          <li>• All offer history is preserved for transparency</li>
        </ul>
      </div>
    </div>
  );
}
