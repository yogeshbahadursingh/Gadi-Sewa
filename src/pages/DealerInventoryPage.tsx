import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Car, Plus, Edit, Eye, Trash2, Filter, Search, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { DashboardLayout } from '../components/Layout';
import { Badge } from '../components/Layout';
import { useAuth } from '../context/AppContext';

// Mock dealer inventory data
const mockDealerInventory = [
  {
    id: 'inv1',
    listingId: 'l2',
    vehicle: {
      make: 'Hyundai',
      model: 'Creta',
      variant: '1.5 CRDi Premium',
      year: 2023,
      mileage: 18500,
      fuelType: 'Diesel',
      transmission: 'Automatic',
      color: 'Polar White',
      image: 'https://images.unsplash.com/photo-1614200187524-dc4b010773ae?w=400',
    },
    price: 7200000,
    status: 'active',
    views: 2100,
    enquiries: 45,
    daysListed: 45,
    isFeatured: true,
  },
  {
    id: 'inv2',
    listingId: 'l6',
    vehicle: {
      make: 'Tata',
      model: 'Nexon EV',
      variant: 'Max',
      year: 2024,
      mileage: 5400,
      fuelType: 'Electric',
      transmission: 'Automatic',
      color: 'Daytona Grey',
      image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800',
    },
    price: 4500000,
    status: 'active',
    views: 1890,
    enquiries: 34,
    daysListed: 30,
    isFeatured: true,
  },
  {
    id: 'inv3',
    listingId: 'l9',
    vehicle: {
      make: 'MG',
      model: 'ZS EV',
      variant: 'Excite',
      year: 2024,
      mileage: 11000,
      fuelType: 'Electric',
      transmission: 'Automatic',
      color: 'Candy White',
      image: 'https://images.unsplash.com/photo-1617788138016-969c19ba27bb?w=800',
    },
    price: 4200000,
    status: 'active',
    views: 1560,
    enquiries: 29,
    daysListed: 25,
    isFeatured: true,
  },
  {
    id: 'inv4',
    listingId: 'l10',
    vehicle: {
      make: 'Toyota',
      model: 'Corolla',
      variant: 'Altis 1.8G',
      year: 2022,
      mileage: 35000,
      fuelType: 'Petrol',
      transmission: 'Automatic',
      color: 'Silver Metallic',
      image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e9fb?w=400',
    },
    price: 3800000,
    status: 'sold',
    views: 980,
    enquiries: 18,
    daysListed: 60,
    isFeatured: false,
  },
  {
    id: 'inv5',
    listingId: 'l11',
    vehicle: {
      make: 'Honda',
      model: 'City',
      variant: '1.5V CVT',
      year: 2021,
      mileage: 42000,
      fuelType: 'Petrol',
      transmission: 'CVT',
      color: 'Meteoroid Gray',
      image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800',
    },
    price: 3200000,
    status: 'pending',
    views: 0,
    enquiries: 0,
    daysListed: 0,
    isFeatured: false,
  },
];

export default function DealerInventoryPage() {
  const { currentUser } = useAuth();
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const filteredInventory = mockDealerInventory.filter(item => {
    if (filter !== 'all' && item.status !== filter) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        item.vehicle.make.toLowerCase().includes(query) ||
        item.vehicle.model.toLowerCase().includes(query) ||
        item.vehicle.variant.toLowerCase().includes(query)
      );
    }
    return true;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price_high':
        return b.price - a.price;
      case 'price_low':
        return a.price - b.price;
      case 'views':
        return b.views - a.views;
      case 'enquiries':
        return b.enquiries - a.enquiries;
      default:
        return b.daysListed - a.daysListed;
    }
  });

  const totalInventory = mockDealerInventory.length;
  const activeListings = mockDealerInventory.filter(i => i.status === 'active').length;
  const soldVehicles = mockDealerInventory.filter(i => i.status === 'sold').length;
  const totalViews = mockDealerInventory.reduce((sum, i) => sum + i.views, 0);
  const totalEnquiries = mockDealerInventory.reduce((sum, i) => sum + i.enquiries, 0);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="success">Active</Badge>;
      case 'sold':
        return <Badge variant="info">Sold</Badge>;
      case 'pending':
        return <Badge variant="warning">Pending</Badge>;
      case 'expired':
        return <Badge variant="default">Expired</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `Rs. ${(price / 10000000).toFixed(2)} Crore`;
    } else if (price >= 100000) {
      return `Rs. ${(price / 100000).toFixed(2)} Lakh`;
    }
    return `Rs. ${price.toLocaleString()}`;
  };

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
          <p className="text-gray-500 mt-2">Manage your vehicle inventory and listings</p>
        </div>
        <Link
          to="/sell"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Vehicle
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Car className="w-5 h-5 text-blue-600" />
            <p className="text-sm text-gray-500">Total Inventory</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">{totalInventory}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <p className="text-sm text-gray-500">Active Listings</p>
          </div>
          <p className="text-2xl font-bold text-green-600">{activeListings}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Minus className="w-5 h-5 text-purple-600" />
            <p className="text-sm text-gray-500">Sold</p>
          </div>
          <p className="text-2xl font-bold text-purple-600">{soldVehicles}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Eye className="w-5 h-5 text-amber-600" />
            <p className="text-sm text-gray-500">Total Views</p>
          </div>
          <p className="text-2xl font-bold text-amber-600">{totalViews.toLocaleString()}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-indigo-600" />
            <p className="text-sm text-gray-500">Total Enquiries</p>
          </div>
          <p className="text-2xl font-bold text-indigo-600">{totalEnquiries}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by make, model, or variant..."
              className="w-full py-2.5 pl-10 pr-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500"
            />
          </div>
          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="py-2.5 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="sold">Sold</option>
            <option value="pending">Pending</option>
            <option value="expired">Expired</option>
          </select>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="py-2.5 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500"
          >
            <option value="newest">Newest First</option>
            <option value="price_high">Price: High to Low</option>
            <option value="price_low">Price: Low to High</option>
            <option value="views">Most Viewed</option>
            <option value="enquiries">Most Enquiries</option>
          </select>
        </div>
      </div>

      {/* Inventory Grid */}
      {filteredInventory.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
          <Car className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No vehicles found</h3>
          <p className="text-sm text-gray-500 mt-1">
            {filter === 'all' 
              ? "You haven't added any vehicles yet"
              : `No ${filter} vehicles`}
          </p>
          <Link
            to="/sell"
            className="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Your First Vehicle
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInventory.map(item => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative">
                <img
                  src={item.vehicle.image}
                  alt={`${item.vehicle.make} ${item.vehicle.model}`}
                  className="w-full h-48 object-cover"
                />
                {item.isFeatured && (
                  <div className="absolute top-3 left-3">
                    <Badge variant="warning">Featured</Badge>
                  </div>
                )}
                <div className="absolute top-3 right-3">
                  {getStatusBadge(item.status)}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900">
                  {item.vehicle.year} {item.vehicle.make} {item.vehicle.model}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{item.vehicle.variant}</p>
                
                <div className="mt-3 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Price</span>
                    <span className="font-bold text-blue-600">{formatPrice(item.price)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Mileage</span>
                    <span className="text-gray-900">{item.vehicle.mileage.toLocaleString()} km</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Fuel</span>
                    <span className="text-gray-900">{item.vehicle.fuelType}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Transmission</span>
                    <span className="text-gray-900">{item.vehicle.transmission}</span>
                  </div>
                </div>

                {item.status === 'active' && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1 text-gray-500">
                        <Eye className="w-4 h-4" />
                        <span>{item.views} views</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        <TrendingUp className="w-4 h-4" />
                        <span>{item.enquiries} enquiries</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">Listed {item.daysListed} days ago</p>
                  </div>
                )}

                <div className="mt-4 flex gap-2">
                  <Link
                    to={`/listing/${item.listingId}`}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </Link>
                  <button 
                    onClick={() => alert(`Edit listing: ${item.vehicle.make} ${item.vehicle.model}\n\nEdit form would open here.`)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  {item.status !== 'sold' && (
                    <button 
                      onClick={() => {
                        if (confirm(`Delete listing: ${item.vehicle.make} ${item.vehicle.model}?\n\nThis action cannot be undone.`)) {
                          alert('Listing deleted successfully.');
                        }
                      }}
                      className="px-3 py-2 border border-red-200 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Info Box */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-5">
        <h3 className="font-semibold text-blue-900 mb-2">Inventory Management Tips</h3>
        <ul className="space-y-1 text-sm text-blue-700">
          <li>• Keep your inventory updated to attract more buyers</li>
          <li>• Add high-quality photos to increase engagement</li>
          <li>• Use featured listings to highlight premium vehicles</li>
          <li>• Respond to enquiries quickly to improve conversion</li>
          <li>• Mark vehicles as sold promptly to maintain accuracy</li>
        </ul>
      </div>
    </DashboardLayout>
  );
}
