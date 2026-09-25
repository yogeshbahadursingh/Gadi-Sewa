import { Link } from 'react-router-dom';
import { Clock, Heart, Trash2 } from 'lucide-react';
import { listings, vehicles, getVehicleById, formatPrice, formatMileage } from '../store/data';
import { useAppState } from '../context/AppContext';
import { Badge } from '../components/Layout';

export default function RecentlyViewedPage() {
  const { state } = useAppState();
  
  const recentlyViewedListings = state.recentlyViewed
    .map(id => listings.find(l => l.id === id))
    .filter(Boolean) as typeof listings;

  const clearHistory = () => {
    // In a real app, this would clear the state
    alert('History cleared');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Recently Viewed</h1>
          <p className="text-sm text-gray-500">{recentlyViewedListings.length} vehicles</p>
        </div>
        {recentlyViewedListings.length > 0 && (
          <button
            onClick={clearHistory}
            className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Clear History
          </button>
        )}
      </div>

      {recentlyViewedListings.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
          <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No recently viewed vehicles</h3>
          <p className="text-sm text-gray-500 mt-1">Vehicles you view will appear here</p>
          <Link to="/search" className="mt-4 inline-block text-blue-600 hover:text-blue-700 font-medium">
            Browse vehicles
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {recentlyViewedListings.map(listing => {
            const vehicle = getVehicleById(listing.vehicleId);
            if (!vehicle) return null;
            
            return (
              <Link
                key={listing.id}
                to={`/listing/${listing.id}`}
                className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                  <img
                    src={listing.images[0]}
                    alt={`${vehicle.make} ${vehicle.model}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {listing.isInspected && (
                    <div className="absolute top-2 left-2">
                      <Badge variant="success">Inspected</Badge>
                    </div>
                  )}
                  {listing.hasPassport && (
                    <div className="absolute top-2 right-2">
                      <Badge variant="info">Passport</Badge>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                    {vehicle.year} {vehicle.make} {vehicle.model}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">{vehicle.variant}</p>
                  <div className="flex items-center justify-between mt-3">
                    <p className="text-lg font-bold text-blue-600">{formatPrice(listing.price)}</p>
                  </div>
                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                    <span>{formatMileage(vehicle.mileage)}</span>
                    <span>•</span>
                    <span>{vehicle.fuelType}</span>
                    <span>•</span>
                    <span>{listing.location}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* Info Box */}
      {recentlyViewedListings.length > 0 && (
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-5">
          <h3 className="font-semibold text-blue-900 mb-2">About Recently Viewed</h3>
          <p className="text-sm text-blue-700">
            Your recently viewed vehicles are stored locally and help you keep track of vehicles you've been interested in. 
            This history is private and only visible to you.
          </p>
        </div>
      )}
    </div>
  );
}
