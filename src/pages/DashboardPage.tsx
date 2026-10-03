import { Link } from 'react-router-dom';
import { useAuth } from '../context/AppContext';
import { BarChart3, Car, Users, FileCheck, Gauge, Shield, AlertTriangle, TrendingUp, Eye, MessageSquare, DollarSign, CheckCircle2, Heart, MapPin } from 'lucide-react';
import { listings, vehicles, users, inspections, offers, payments, formatPrice, getListingsBySeller, getOffersByUser } from '../store/data';

export default function DashboardPage() {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-medium text-gray-900">Please sign in to view your dashboard</h2>
      </div>
    );
  }

  switch (currentUser.role) {
    case 'SUPER_ADMIN':
    case 'ADMIN':
      return <AdminDashboard />;
    case 'PRIVATE_SELLER':
      return <SellerDashboard />;
    case 'BUYER':
      return <BuyerDashboard />;
    case 'INSPECTOR':
      return <InspectorDashboard />;
    case 'DEALER_OWNER':
    case 'DEALER_MANAGER':
      return <DealerDashboard />;
    default:
      return <BuyerDashboard />;
  }
}

function AdminDashboard() {
  const totalListings = listings.filter((l) => l.status === 'ACTIVE').length;
  const totalUsers = users.length;
  const totalVehicles = vehicles.length;
  const totalInspections = inspections.length;
  const totalRevenue = payments.filter((p) => p.status === 'SUCCEEDED').reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-sm text-gray-500">Platform overview and management</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Listings</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{totalListings}</p>
              <p className="text-xs text-green-600 mt-1">+12% this month</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Car className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Users</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{totalUsers}</p>
              <p className="text-xs text-green-600 mt-1">+8 new this week</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Vehicles</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{totalVehicles}</p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <FileCheck className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Inspections</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{totalInspections}</p>
              <p className="text-xs text-green-600 mt-1">+5 this week</p>
            </div>
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Gauge className="w-5 h-5 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Listings */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Recent Listings</h3>
            <Link to="/admin/listings" className="text-sm text-blue-600 hover:text-blue-700">
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {listings.slice(0, 5).map((listing) => {
              const vehicle = vehicles.find((v) => v.id === listing.vehicleId);
              return (
                <div key={listing.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <img src={listing.images[0]} alt="" className="w-12 h-12 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{vehicle?.make} {vehicle?.model}</p>
                    <p className="text-xs text-gray-500">{formatPrice(listing.price)}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded ${listing.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                    {listing.status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Recent Activity</h3>
          </div>
          <div className="space-y-3">
            {[
              { icon: CheckCircle2, text: 'Inspection completed for Toyota Fortuner', time: '2 hours ago', color: 'text-green-600' },
              { icon: Users, text: 'New user registration: Priya Joshi', time: '5 hours ago', color: 'text-blue-600' },
              { icon: DollarSign, text: 'Payment received: Rs. 50,000 (eSewa)', time: '1 day ago', color: 'text-purple-600' },
              { icon: FileCheck, text: 'New listing created: BYD Atto 3', time: '2 days ago', color: 'text-orange-600' },
              { icon: AlertTriangle, text: 'Risk flag raised: Mileage inconsistency', time: '3 days ago', color: 'text-red-600' },
            ].map((activity, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <activity.icon className={`w-4 h-4 mt-0.5 ${activity.color}`} />
                <div className="flex-1">
                  <p className="text-sm text-gray-700">{activity.text}</p>
                  <p className="text-xs text-gray-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Revenue Overview</h3>
          <p className="text-3xl font-bold text-gray-900">{formatPrice(totalRevenue)}</p>
          <p className="text-sm text-green-600 mt-1">+23% from last month</p>
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Premium Listings</span>
              <span className="font-medium">Rs. 5,000</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Inspection Bookings</span>
              <span className="font-medium">Rs. 3,500</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Reservation Deposits</span>
              <span className="font-medium">Rs. 50,000</span>
            </div>
          </div>
        </div>

        {/* Risk Alerts */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Risk Alerts</h3>
            <Link to="/admin/risk" className="text-sm text-blue-600">Review</Link>
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-red-50 rounded-lg border border-red-100">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <span className="text-sm font-medium text-red-700">Mileage Inconsistency</span>
              </div>
              <p className="text-xs text-red-600 mt-1">Vehicle NP-VP-00024567 shows suspicious odometer reading</p>
            </div>
            <div className="p-3 bg-amber-50 rounded-lg border border-amber-100">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <span className="text-sm font-medium text-amber-700">Duplicate Listing Check</span>
              </div>
              <p className="text-xs text-amber-600 mt-1">Similar images detected across multiple listings</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg border border-green-100">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-green-700">All Clear</span>
              </div>
              <p className="text-xs text-green-600 mt-1">No critical issues in the last 24 hours</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SellerDashboard() {
  const { currentUser } = useAuth();
  const myListings = currentUser ? getListingsBySeller(currentUser.id) : [];
  const myOffers = currentUser ? getOffersByUser(currentUser.id) : [];
  const totalViews = myListings.reduce((sum, l) => sum + l.views, 0);
  const totalEnquiries = myListings.reduce((sum, l) => sum + l.enquiries, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Seller Dashboard</h1>
          <p className="text-sm text-gray-500">Manage your listings and offers</p>
        </div>
        <Link
          to="/sell"
          className="bg-blue-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700 flex items-center gap-2"
        >
          <Car className="w-4 h-4" /> New Listing
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Listings</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{myListings.filter((l) => l.status === 'ACTIVE').length}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Car className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Views</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{totalViews.toLocaleString()}</p>
              <p className="text-xs text-green-600 mt-1">+15% this week</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Eye className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Enquiries</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{totalEnquiries}</p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pending Offers</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{myOffers.filter((o) => o.status === 'PENDING').length}</p>
            </div>
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* My Listings */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
        <h3 className="font-semibold text-gray-900 mb-4">My Listings</h3>
        <div className="space-y-3">
          {myListings.map((listing) => {
            const vehicle = vehicles.find((v) => v.id === listing.vehicleId);
            return (
              <div key={listing.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <img src={listing.images[0]} alt="" className="w-20 h-14 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{vehicle?.make} {vehicle?.model} {vehicle?.variant}</p>
                  <p className="text-sm font-bold text-blue-600">{formatPrice(listing.price)}</p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                    <span>
                      <Eye className="w-3 h-3 inline" /> {listing.views}
                    </span>
                    <span>❤ {listing.favourites}</span>
                    <span>
                      <MessageSquare className="w-3 h-3 inline" /> {listing.enquiries}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded ${listing.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                    {listing.status}
                  </span>
                  {listing.isInspected && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">Inspected</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Offers */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-900 mb-4">Recent Offers</h3>
        {myOffers.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-4">No offers received yet</p>
        ) : (
          <div className="space-y-3">
            {myOffers.map((offer) => {
              const listing = listings.find((l) => l.id === offer.listingId);
              const buyer = users.find((u) => u.id === offer.buyerId);
              return (
                <div key={offer.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{buyer?.fullName}</p>
                    <p className="text-xs text-gray-500">for {listing?.title.substring(0, 40)}...</p>
                    <p className="text-sm font-bold text-blue-600 mt-1">{formatPrice(offer.amount)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs px-2 py-0.5 rounded ${
                        offer.status === 'PENDING'
                          ? 'bg-amber-100 text-amber-700'
                          : offer.status === 'ACCEPTED'
                          ? 'bg-green-100 text-green-700'
                          : offer.status === 'REJECTED'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {offer.status}
                    </span>
                    {offer.status === 'PENDING' && (
                      <div className="flex gap-1">
                        <button className="p-1.5 bg-green-100 text-green-600 rounded-lg hover:bg-green-200">
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200">
                          <AlertTriangle className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function BuyerDashboard() {
  const { currentUser } = useAuth();
  const myOffers = currentUser ? getOffersByUser(currentUser.id) : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Dashboard</h1>
        <p className="text-sm text-gray-500">Your vehicle buying journey</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Saved Vehicles</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">2</p>
            </div>
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">My Offers</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{myOffers.length}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Reservations</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">1</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <FileCheck className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Inspections Booked</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">0</p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Gauge className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Offers */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 mb-4">My Offers</h3>
          <div className="space-y-3">
            {myOffers.map((offer) => {
              const listing = listings.find((l) => l.id === offer.listingId);
              return (
                <div key={offer.id} className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">{listing?.title.substring(0, 40)}...</p>
                    <span
                      className={`text-xs px-2 py-0.5 rounded ${
                        offer.status === 'PENDING'
                          ? 'bg-amber-100 text-amber-700'
                          : offer.status === 'COUNTERED'
                          ? 'bg-blue-100 text-blue-700'
                          : offer.status === 'ACCEPTED'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {offer.status}
                    </span>
                  </div>
                  <p className="text-sm font-bold text-blue-600 mt-1">{formatPrice(offer.amount)}</p>
                  {offer.counterAmount && <p className="text-xs text-gray-500 mt-1">Counter: {formatPrice(offer.counterAmount)}</p>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Active Reservation */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Active Reservations</h3>
          <div className="p-4 bg-green-50 rounded-xl border border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-green-700">Confirmed</span>
            </div>
            <p className="text-sm font-medium text-gray-900">Honda City 1.5V CVT</p>
            <p className="text-xs text-gray-500 mt-1">Deposit: Rs. 50,000 • Expires: Jan 20, 2026</p>
            <Link to="/listing/l4" className="text-xs text-blue-600 mt-2 inline-block hover:text-blue-700">
              View Listing →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function InspectorDashboard() {
  const { currentUser } = useAuth();
  const myInspections = inspections.filter((i) => i.inspectorId === currentUser?.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Inspector Dashboard</h1>
        <p className="text-sm text-gray-500">Manage your inspection jobs</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Completed</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {myInspections.filter((i) => i.status === 'COMPLETED' || i.status === 'REVIEWED').length}
              </p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Scheduled</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{myInspections.filter((i) => i.status === 'SCHEDULED').length}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">In Progress</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{myInspections.filter((i) => i.status === 'IN_PROGRESS').length}</p>
            </div>
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Gauge className="w-5 h-5 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">This Month</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{myInspections.length}</p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Inspection Jobs */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-900 mb-4">Inspection Jobs</h3>
        <div className="space-y-3">
          {inspections.map((inspection) => {
            const vehicle = vehicles.find((v) => v.id === inspection.vehicleId);
            return (
              <div key={inspection.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    inspection.status === 'REVIEWED'
                      ? 'bg-green-100'
                      : inspection.status === 'COMPLETED'
                      ? 'bg-blue-100'
                      : inspection.status === 'IN_PROGRESS'
                      ? 'bg-orange-100'
                      : 'bg-gray-100'
                  }`}
                >
                  <Gauge
                    className={`w-5 h-5 ${
                      inspection.status === 'REVIEWED'
                        ? 'text-green-600'
                        : inspection.status === 'COMPLETED'
                        ? 'text-blue-600'
                        : inspection.status === 'IN_PROGRESS'
                        ? 'text-orange-600'
                        : 'text-gray-600'
                    }`}
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {vehicle?.year} {vehicle?.make} {vehicle?.model}
                  </p>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {inspection.location}
                  </p>
                  <p className="text-xs text-gray-400">Scheduled: {new Date(inspection.scheduledDate).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <span
                    className={`text-xs px-2 py-0.5 rounded ${
                      inspection.status === 'REVIEWED'
                        ? 'bg-green-100 text-green-700'
                        : inspection.status === 'COMPLETED'
                        ? 'bg-blue-100 text-blue-700'
                        : inspection.status === 'IN_PROGRESS'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {inspection.status}
                  </span>
                  {inspection.overallResult && <p className="text-xs text-gray-500 mt-1">Result: {inspection.overallResult}</p>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function DealerDashboard() {
  const { currentUser } = useAuth();
  const dealerListings = listings.filter((l) => l.sellerId === currentUser?.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dealer Dashboard</h1>
          <p className="text-sm text-gray-500">Manage your inventory and leads</p>
        </div>
        <Link
          to="/sell"
          className="bg-blue-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700 flex items-center gap-2"
        >
          <Car className="w-4 h-4" /> Add Vehicle
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Inventory</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{dealerListings.length}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Car className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Sold</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">234</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Rating</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">4.7★</p>
            </div>
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Leads</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">12</p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Inventory */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-900 mb-4">Current Inventory</h3>
        <div className="space-y-3">
          {dealerListings.map((listing) => {
            const vehicle = vehicles.find((v) => v.id === listing.vehicleId);
            return (
              <div key={listing.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <img src={listing.images[0]} alt="" className="w-20 h-14 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{vehicle?.make} {vehicle?.model}</p>
                  <p className="text-sm font-bold text-blue-600">{formatPrice(listing.price)}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-500">{vehicle?.mileage.toLocaleString()} km</span>
                    <span className="text-xs text-gray-500">•</span>
                    <span className="text-xs text-gray-500">{vehicle?.year}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded ${listing.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                    {listing.status}
                  </span>
                  {listing.isInspected && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">Inspected</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
