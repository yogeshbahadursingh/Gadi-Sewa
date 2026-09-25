import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Car, DollarSign, CheckCircle2, XCircle, AlertCircle, Eye } from 'lucide-react';
import { useAuth } from '../context/AppContext';
import { listings, vehicles, getVehicleById, formatPrice, formatMileage } from '../store/data';
import { Badge } from '../components/Layout';

// Mock reservation data
const mockReservations = [
  {
    id: 'res1',
    listingId: 'l4',
    buyerId: 'u3',
    depositAmount: 50000,
    status: 'confirmed',
    createdAt: '2026-01-10',
    expiresAt: '2026-01-20',
    vehicle: {
      make: 'Honda',
      model: 'City',
      variant: '1.5 V CVT',
      year: 2021,
      mileage: 55000,
      image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=400',
    },
    seller: {
      name: 'Ramesh Thapa',
      phone: '9841000002',
      location: 'Kalanki, Kathmandu',
    },
  },
  {
    id: 'res2',
    listingId: 'l2',
    buyerId: 'u3',
    depositAmount: 100000,
    status: 'pending',
    createdAt: '2026-01-14',
    expiresAt: '2026-01-24',
    vehicle: {
      make: 'Hyundai',
      model: 'Creta',
      variant: '1.5 CRDi Premium',
      year: 2023,
      mileage: 18500,
      image: 'https://images.unsplash.com/photo-1614200187524-dc4b010773ae?w=400',
    },
    seller: {
      name: 'Sujal Motors',
      phone: '9801000004',
      location: 'Pulchowk, Lalitpur',
    },
  },
];

export default function ReservationsPage() {
  const { currentUser } = useAuth();
  const [filter, setFilter] = useState('all');

  const reservations = mockReservations.filter(r => r.buyerId === currentUser?.id);
  
  const filteredReservations = filter === 'all' 
    ? reservations 
    : reservations.filter(r => r.status === filter);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge variant="success">Confirmed</Badge>;
      case 'pending':
        return <Badge variant="warning">Pending</Badge>;
      case 'expired':
        return <Badge variant="default">Expired</Badge>;
      case 'cancelled':
        return <Badge variant="danger">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'border-green-200 bg-green-50';
      case 'pending':
        return 'border-amber-200 bg-amber-50';
      case 'expired':
        return 'border-gray-200 bg-gray-50';
      case 'cancelled':
        return 'border-red-200 bg-red-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const daysUntilExpiry = (expiresAt: string) => {
    const expiry = new Date(expiresAt);
    const now = new Date();
    const diff = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Reservations</h1>
        <p className="text-gray-500 mt-2">Manage your vehicle reservations</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-sm text-gray-500">Total Reservations</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{reservations.length}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-sm text-gray-500">Confirmed</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {reservations.filter(r => r.status === 'confirmed').length}
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-sm text-gray-500">Pending</p>
          <p className="text-2xl font-bold text-amber-600 mt-1">
            {reservations.filter(r => r.status === 'pending').length}
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-sm text-gray-500">Total Deposits</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">
            Rs. {reservations.reduce((sum, r) => sum + r.depositAmount, 0).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {['all', 'confirmed', 'pending', 'expired', 'cancelled'].map(status => (
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

      {/* Reservations List */}
      {filteredReservations.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
          <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No reservations found</h3>
          <p className="text-sm text-gray-500 mt-1">
            {filter === 'all' 
              ? "You haven't made any reservations yet"
              : `No ${filter} reservations`}
          </p>
          <Link to="/search" className="mt-4 inline-block text-blue-600 hover:text-blue-700 font-medium">
            Browse vehicles
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredReservations.map(reservation => {
            const daysLeft = daysUntilExpiry(reservation.expiresAt);
            
            return (
              <div
                key={reservation.id}
                className={`bg-white border-2 rounded-2xl p-6 ${getStatusColor(reservation.status)}`}
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Vehicle Image */}
                  <div className="md:w-48 flex-shrink-0">
                    <img
                      src={reservation.vehicle.image}
                      alt={`${reservation.vehicle.make} ${reservation.vehicle.model}`}
                      className="w-full h-32 md:h-48 rounded-xl object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {reservation.vehicle.year} {reservation.vehicle.make} {reservation.vehicle.model}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">{reservation.vehicle.variant}</p>
                      </div>
                      {getStatusBadge(reservation.status)}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Car className="w-4 h-4" />
                        <span>{formatMileage(reservation.vehicle.mileage)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{reservation.seller.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <DollarSign className="w-4 h-4" />
                        <span>Deposit: Rs. {reservation.depositAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>Booked: {new Date(reservation.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>

                    {/* Expiry Warning */}
                    {reservation.status === 'confirmed' && daysLeft > 0 && daysLeft <= 3 && (
                      <div className="p-3 bg-amber-100 border border-amber-300 rounded-lg mb-4 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                        <p className="text-sm text-amber-800">
                          <strong>Expires in {daysLeft} day{daysLeft !== 1 ? 's' : ''}</strong> - Complete purchase before expiry
                        </p>
                      </div>
                    )}

                    {/* Seller Info */}
                    <div className="p-3 bg-white rounded-lg border border-gray-200 mb-4">
                      <p className="text-xs text-gray-500 mb-1">Seller</p>
                      <p className="text-sm font-medium text-gray-900">{reservation.seller.name}</p>
                      <p className="text-xs text-gray-500 mt-1">{reservation.seller.phone}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <Link
                        to={`/listing/${reservation.listingId}`}
                        className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 text-center flex items-center justify-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        View Listing
                      </Link>
                      {reservation.status === 'confirmed' && (
                        <button className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50">
                          Contact Seller
                        </button>
                      )}
                      {reservation.status === 'pending' && (
                        <button className="px-4 py-2.5 border border-red-200 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50">
                          Cancel
                        </button>
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
        <h3 className="font-semibold text-blue-900 mb-2">About Reservations</h3>
        <ul className="space-y-1 text-sm text-blue-700">
          <li>• Reservations hold the vehicle for you while you complete the purchase</li>
          <li>• Deposits are refundable if the vehicle doesn't match the listing description</li>
          <li>• Contact the seller to schedule final inspection and ownership transfer</li>
          <li>• Reservations expire after the specified date if not completed</li>
        </ul>
      </div>
    </div>
  );
}
