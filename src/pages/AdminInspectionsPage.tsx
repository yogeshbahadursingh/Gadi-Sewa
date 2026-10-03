import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, CheckCircle2, XCircle, Eye, Clock, AlertTriangle, MapPin, Calendar, User } from 'lucide-react';
import { inspections, vehicles, users, getVehicleById } from '../store/data';
import { Badge } from '../components/Layout';
import { DashboardLayout } from '../components/Layout';

export default function AdminInspectionsPage() {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredInspections = inspections.filter(i => {
    if (filter !== 'all' && i.status.toLowerCase() !== filter.toLowerCase()) return false;
    if (searchQuery) {
      const vehicle = getVehicleById(i.vehicleId);
      const query = searchQuery.toLowerCase();
      return (
        i.id.toLowerCase().includes(query) ||
        i.location.toLowerCase().includes(query) ||
        (vehicle && (
          vehicle.make.toLowerCase().includes(query) ||
          vehicle.model.toLowerCase().includes(query)
        ))
      );
    }
    return true;
  });

  const statusCounts = {
    all: inspections.length,
    scheduled: inspections.filter(i => i.status === 'SCHEDULED').length,
    in_progress: inspections.filter(i => i.status === 'IN_PROGRESS').length,
    completed: inspections.filter(i => i.status === 'COMPLETED').length,
    reviewed: inspections.filter(i => i.status === 'REVIEWED').length,
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Inspections Management</h1>
        <p className="text-sm text-gray-500">Review and manage all vehicle inspections</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
        {[
          { label: 'All', count: statusCounts.all, color: 'bg-gray-100 text-gray-700' },
          { label: 'Scheduled', count: statusCounts.scheduled, color: 'bg-blue-100 text-blue-700' },
          { label: 'In Progress', count: statusCounts.in_progress, color: 'bg-amber-100 text-amber-700' },
          { label: 'Completed', count: statusCounts.completed, color: 'bg-green-100 text-green-700' },
          { label: 'Reviewed', count: statusCounts.reviewed, color: 'bg-purple-100 text-purple-700' },
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
              placeholder="Search by ID, vehicle, or location..."
              className="w-full py-2.5 pl-10 pr-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500"
            />
          </div>
          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="py-2.5 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500"
          >
            <option value="all">All Status</option>
            <option value="scheduled">Scheduled</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="reviewed">Reviewed</option>
          </select>
        </div>
      </div>

      {/* Inspections List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Inspection</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Vehicle</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Inspector</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Location</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredInspections.map(inspection => {
                const vehicle = getVehicleById(inspection.vehicleId);
                const inspector = users.find(u => u.id === inspection.inspectorId);
                if (!vehicle) return null;

                return (
                  <tr key={inspection.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <p className="text-sm font-mono text-gray-900">{inspection.id}</p>
                      <p className="text-xs text-gray-500">{inspection.templateType}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-gray-900">
                        {vehicle.year} {vehicle.make} {vehicle.model}
                      </p>
                      <p className="text-xs text-gray-500">{vehicle.registrationNumber}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm text-gray-900 flex items-center gap-1">
                        <User className="w-3 h-3" /> {inspector?.fullName || 'Unassigned'}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm text-gray-900 flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {inspection.location}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm text-gray-900 flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> 
                        {new Date(inspection.scheduledDate).toLocaleDateString()}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={
                        inspection.status === 'SCHEDULED' ? 'info' :
                        inspection.status === 'IN_PROGRESS' ? 'warning' :
                        inspection.status === 'COMPLETED' ? 'success' :
                        inspection.status === 'REVIEWED' ? 'success' : 'default'
                      }>
                        {inspection.status.replace(/_/g, ' ')}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          to={`/inspection/${inspection.id}`}
                          className="p-1.5 hover:bg-gray-100 rounded-lg"
                          title="View Report"
                        >
                          <Eye className="w-4 h-4 text-gray-600" />
                        </Link>
                        {inspection.status === 'COMPLETED' && (
                          <button
                            className="p-1.5 hover:bg-green-100 rounded-lg"
                            title="Mark as Reviewed"
                          >
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredInspections.length === 0 && (
          <div className="text-center py-12">
            <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No inspections found</p>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
        <p>Showing {filteredInspections.length} of {inspections.length} inspections</p>
      </div>
    </DashboardLayout>
  );
}
