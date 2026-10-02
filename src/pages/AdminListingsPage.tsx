import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, CheckCircle2, XCircle, Eye, Edit, Trash2, MoreVertical, AlertTriangle, Car, MapPin, Calendar, DollarSign } from 'lucide-react';
import { listings, vehicles, users, formatPrice, formatMileage } from '../store/data';
import { Badge } from '../components/Layout';
import { DashboardLayout } from '../components/Layout';

export default function AdminListingsPage() {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedListing, setSelectedListing] = useState<string | null>(null);

  const filteredListings = listings.filter(l => {
    if (filter !== 'all' && l.status.toLowerCase() !== filter) return false;
    if (searchQuery) {
      const vehicle = vehicles.find(v => v.id === l.vehicleId);
      const query = searchQuery.toLowerCase();
      return (
        l.title.toLowerCase().includes(query) ||
        vehicle?.make.toLowerCase().includes(query) ||
        vehicle?.model.toLowerCase().includes(query) ||
        l.location.toLowerCase().includes(query)
      );
    }
    return true;
  });

  const statusCounts = {
    all: listings.length,
    active: listings.filter(l => l.status === 'ACTIVE').length,
    pending_review: listings.filter(l => l.status === 'PENDING_REVIEW').length,
    sold: listings.filter(l => l.status === 'SOLD').length,
    withdrawn: listings.filter(l => l.status === 'WITHDRAWN').length,
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Listings Management</h1>
        <p className="text-sm text-gray-500">Review, approve, and manage all vehicle listings</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
        {[
          { label: 'All', count: statusCounts.all, color: 'bg-gray-100 text-gray-700' },
          { label: 'Active', count: statusCounts.active, color: 'bg-green-100 text-green-700' },
          { label: 'Pending', count: statusCounts.pending_review, color: 'bg-amber-100 text-amber-700' },
          { label: 'Sold', count: statusCounts.sold, color: 'bg-blue-100 text-blue-700' },
          { label: 'Withdrawn', count: statusCounts.withdrawn, color: 'bg-red-100 text-red-700' },
        ].map(stat => (
          <button
            key={stat.label}
            onClick={() => setFilter(stat.label.toLowerCase() === 'all' ? 'all' : stat.label.toLowerCase().replace(' ', '_'))}
            className={`p-3 rounded-xl text-center transition-all ${
              (filter === 'all' && stat.label === 'All') || filter === stat.label.toLowerCase().replace(' ', '_')
                ? 'ring-2 ring-blue-500 ring-offset-2'
                : ''
            } ${stat.color}`}
          >
            <p className="text-2xl font-bold">{stat.count}</p>
            <p className="text-xs font-medium">{stat.label}</p>
          </button>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by title, make, model, or location..."
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
            <option value="pending_review">Pending Review</option>
            <option value="sold">Sold</option>
            <option value="withdrawn">Withdrawn</option>
          </select>
        </div>
      </div>

      {/* Listings Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Vehicle</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Seller</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Location</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Stats</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredListings.map(listing => {
                const vehicle = vehicles.find(v => v.id === listing.vehicleId);
                const seller = users.find(u => u.id === listing.sellerId);
                if (!vehicle || !seller) return null;

                return (
                  <tr key={listing.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={listing.images[0]} alt="" className="w-12 h-12 rounded-lg object-cover" />
                        <div>
                          <p className="text-sm font-medium text-gray-900 line-clamp-1">{vehicle.make} {vehicle.model}</p>
                          <p className="text-xs text-gray-500">{vehicle.year} • {formatMileage(vehicle.mileage)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm text-gray-900">{seller.fullName}</p>
                      <p className="text-xs text-gray-500">{seller.role.replace(/_/g, ' ')}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-gray-900">{formatPrice(listing.price)}</p>
                      {listing.negotiable && <p className="text-xs text-gray-500">Negotiable</p>}
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm text-gray-900 flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {listing.district}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={
                        listing.status === 'ACTIVE' ? 'success' :
                        listing.status === 'PENDING_REVIEW' ? 'warning' :
                        listing.status === 'SOLD' ? 'info' : 'default'
                      }>
                        {listing.status.replace(/_/g, ' ')}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{listing.views}</span>
                        <span className="flex items-center gap-1">❤ {listing.favourites}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link to={`/listing/${listing.id}`} className="p-1.5 hover:bg-gray-100 rounded-lg" title="View">
                          <Eye className="w-4 h-4 text-gray-600" />
                        </Link>
                        {listing.status === 'PENDING_REVIEW' && (
                          <>
                            <button 
                              onClick={() => {
                                if (confirm(`Approve listing: ${listing.title}?`)) {
                                  alert('Listing approved successfully!');
                                }
                              }}
                              className="p-1.5 hover:bg-green-100 rounded-lg" 
                              title="Approve"
                            >
                              <CheckCircle2 className="w-4 h-4 text-green-600" />
                            </button>
                            <button 
                              onClick={() => {
                                if (confirm(`Reject listing: ${listing.title}?`)) {
                                  alert('Listing rejected.');
                                }
                              }}
                              className="p-1.5 hover:bg-red-100 rounded-lg" 
                              title="Reject"
                            >
                              <XCircle className="w-4 h-4 text-red-600" />
                            </button>
                          </>
                        )}
                        <button 
                          onClick={() => alert(`More options for: ${listing.title}\n\n- Edit\n- Delete\n- View Details\n- Contact Seller`)}
                          className="p-1.5 hover:bg-gray-100 rounded-lg" 
                          title="More"
                        >
                          <MoreVertical className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredListings.length === 0 && (
          <div className="text-center py-12">
            <Car className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No listings found</p>
          </div>
        )}
      </div>

      {/* Pagination placeholder */}
      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
        <p>Showing {filteredListings.length} of {listings.length} listings</p>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => alert('Previous page functionality would be implemented with actual pagination.')}
            className="px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            Previous
          </button>
          <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg">1</button>
          <button 
            onClick={() => alert('Next page functionality would be implemented with actual pagination.')}
            className="px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
