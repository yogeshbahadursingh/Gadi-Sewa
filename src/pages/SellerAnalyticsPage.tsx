import { useState } from 'react';
import { TrendingUp, Eye, Heart, MessageSquare, Calendar, DollarSign, BarChart3, ArrowUp, ArrowDown } from 'lucide-react';
import { listings, vehicles, getVehicleById, formatPrice, getListingsBySeller } from '../store/data';
import { useAuth } from '../context/AppContext';
import { DashboardLayout, StatCard } from '../components/Layout';

export default function SellerAnalyticsPage() {
  const { currentUser } = useAuth();
  const [timeRange, setTimeRange] = useState('30');

  const myListings = currentUser ? getListingsBySeller(currentUser.id) : [];
  
  // Calculate analytics
  const totalViews = myListings.reduce((sum, l) => sum + l.views, 0);
  const totalFavorites = myListings.reduce((sum, l) => sum + l.favourites, 0);
  const totalEnquiries = myListings.reduce((sum, l) => sum + l.enquiries, 0);
  const avgPrice = myListings.length > 0 
    ? myListings.reduce((sum, l) => sum + l.price, 0) / myListings.length 
    : 0;

  // Mock performance data
  const performanceData = [
    { date: 'Jan 1', views: 45, enquiries: 3 },
    { date: 'Jan 5', views: 62, enquiries: 5 },
    { date: 'Jan 10', views: 78, enquiries: 7 },
    { date: 'Jan 15', views: 95, enquiries: 9 },
    { date: 'Jan 20', views: 112, enquiries: 12 },
    { date: 'Jan 25', views: 134, enquiries: 15 },
    { date: 'Jan 30', views: 156, enquiries: 18 },
  ];

  const maxViews = Math.max(...performanceData.map(d => d.views));

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-sm text-gray-500">Track your listing performance</p>
        </div>
        <select
          value={timeRange}
          onChange={e => setTimeRange(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500"
        >
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 90 days</option>
        </select>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total Views"
          value={totalViews.toLocaleString()}
          change="+23% from last month"
          icon={Eye}
          color="blue"
        />
        <StatCard
          title="Total Favorites"
          value={totalFavorites}
          change="+15% from last month"
          icon={Heart}
          color="red"
        />
        <StatCard
          title="Total Enquiries"
          value={totalEnquiries}
          change="+8% from last month"
          icon={MessageSquare}
          color="green"
        />
        <StatCard
          title="Avg. Listing Price"
          value={formatPrice(avgPrice)}
          icon={DollarSign}
          color="purple"
        />
      </div>

      {/* Performance Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-gray-900">Performance Trend</h3>
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded" />
              Views
            </span>
            <span className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded" />
              Enquiries
            </span>
          </div>
        </div>
        
        {/* Simple Bar Chart */}
        <div className="flex items-end justify-between gap-2 h-48">
          {performanceData.map((data, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full flex flex-col gap-1" style={{ height: '160px' }}>
                <div
                  className="w-full bg-blue-500 rounded-t transition-all hover:bg-blue-600"
                  style={{ height: `${(data.views / maxViews) * 100}%` }}
                  title={`${data.views} views`}
                />
                <div
                  className="w-full bg-green-500 rounded-b transition-all hover:bg-green-600"
                  style={{ height: `${(data.enquiries / maxViews) * 100}%` }}
                  title={`${data.enquiries} enquiries`}
                />
              </div>
              <span className="text-xs text-gray-500">{data.date}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top Performing Listings */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h3 className="font-semibold text-gray-900 mb-4">Top Performing Listings</h3>
        <div className="space-y-3">
          {myListings
            .sort((a, b) => b.views - a.views)
            .slice(0, 5)
            .map((listing, index) => {
              const vehicle = getVehicleById(listing.vehicleId);
              if (!vehicle) return null;
              
              return (
                <div key={listing.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-blue-700">#{index + 1}</span>
                  </div>
                  <img
                    src={listing.images[0]}
                    alt=""
                    className="w-16 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {vehicle.make} {vehicle.model}
                    </p>
                    <p className="text-xs text-gray-500">{formatPrice(listing.price)}</p>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="text-center">
                      <p className="font-bold text-gray-900">{listing.views}</p>
                      <p className="text-xs text-gray-500">Views</p>
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-gray-900">{listing.favourites}</p>
                      <p className="text-xs text-gray-500">Favorites</p>
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-gray-900">{listing.enquiries}</p>
                      <p className="text-xs text-gray-500">Enquiries</p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            Performance Insights
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-sm text-gray-700">Most viewed listing</span>
              <span className="text-sm font-medium text-green-700">
                {myListings.sort((a, b) => b.views - a.views)[0]?.views || 0} views
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <span className="text-sm text-gray-700">Most favorited listing</span>
              <span className="text-sm font-medium text-blue-700">
                {myListings.sort((a, b) => b.favourites - a.favourites)[0]?.favourites || 0} favorites
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <span className="text-sm text-gray-700">Most enquired listing</span>
              <span className="text-sm font-medium text-purple-700">
                {myListings.sort((a, b) => b.enquiries - a.enquiries)[0]?.enquiries || 0} enquiries
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            Recommendations
          </h3>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-900 font-medium">Boost your top listing</p>
              <p className="text-xs text-blue-700 mt-1">
                Your most viewed listing could benefit from premium placement
              </p>
            </div>
            <div className="p-3 bg-amber-50 rounded-lg">
              <p className="text-sm text-amber-900 font-medium">Add more photos</p>
              <p className="text-xs text-amber-700 mt-1">
                Listings with 5+ photos get 40% more enquiries
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-sm text-green-900 font-medium">Get inspected</p>
              <p className="text-xs text-green-700 mt-1">
                Inspected vehicles sell 2x faster
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
