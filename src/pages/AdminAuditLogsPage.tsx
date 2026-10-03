import { useState } from 'react';
import { Calendar, User, FileText, Search, Filter, Eye } from 'lucide-react';
import { DashboardLayout } from '../components/Layout';
import { Badge } from '../components/Layout';

// Mock audit log data
const mockAuditLogs = [
  {
    id: 'log1',
    userId: 'u1',
    userName: 'Rajesh Shrestha',
    action: 'USER_LOGIN',
    resource: 'user',
    resourceId: 'u1',
    timestamp: '2026-01-15T14:30:00',
    ipAddress: '192.168.1.100',
    details: 'User logged in successfully',
  },
  {
    id: 'log2',
    userId: 'u2',
    userName: 'Ramesh Thapa',
    action: 'LISTING_CREATED',
    resource: 'listing',
    resourceId: 'l1',
    timestamp: '2026-01-15T10:15:00',
    ipAddress: '192.168.1.101',
    details: 'Created new listing for Toyota Fortuner',
  },
  {
    id: 'log3',
    userId: 'u5',
    userName: 'Anil Karki',
    action: 'INSPECTION_COMPLETED',
    resource: 'inspection',
    resourceId: 'ins1',
    timestamp: '2026-01-14T16:45:00',
    ipAddress: '192.168.1.102',
    details: 'Completed inspection for vehicle v1',
  },
  {
    id: 'log4',
    userId: 'u3',
    userName: 'Sita Maharjan',
    action: 'OFFER_MADE',
    resource: 'offer',
    resourceId: 'o1',
    timestamp: '2026-01-14T14:20:00',
    ipAddress: '192.168.1.103',
    details: 'Made offer of Rs. 1,18,00,000 on listing l1',
  },
  {
    id: 'log5',
    userId: 'u1',
    userName: 'Rajesh Shrestha',
    action: 'LISTING_APPROVED',
    resource: 'listing',
    resourceId: 'l1',
    timestamp: '2026-01-14T11:30:00',
    ipAddress: '192.168.1.100',
    details: 'Approved listing for Toyota Fortuner',
  },
  {
    id: 'log6',
    userId: 'u7',
    userName: 'Sunil Shakya',
    action: 'PASSPORT_REQUESTED',
    resource: 'vehicle_passport',
    resourceId: 'vp3',
    timestamp: '2026-01-13T09:45:00',
    ipAddress: '192.168.1.104',
    details: 'Requested Vehicle Passport for BYD Atto 3',
  },
  {
    id: 'log7',
    userId: 'u1',
    userName: 'Rajesh Shrestha',
    action: 'RISK_FLAG_CREATED',
    resource: 'risk_event',
    resourceId: 'r1',
    timestamp: '2026-01-13T08:20:00',
    ipAddress: '192.168.1.100',
    details: 'Created risk flag for mileage inconsistency',
  },
  {
    id: 'log8',
    userId: 'u4',
    userName: 'Biraj Rajbhandari',
    action: 'PAYMENT_RECEIVED',
    resource: 'payment',
    resourceId: 'p4',
    timestamp: '2026-01-12T15:10:00',
    ipAddress: '192.168.1.105',
    details: 'Received dealer subscription payment of Rs. 15,000',
  },
];

export default function AdminAuditLogsPage() {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLog, setSelectedLog] = useState<string | null>(null);

  const filteredLogs = mockAuditLogs.filter(log => {
    if (filter !== 'all' && !log.action.toLowerCase().includes(filter.toLowerCase())) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        log.userName.toLowerCase().includes(query) ||
        log.action.toLowerCase().includes(query) ||
        log.details.toLowerCase().includes(query) ||
        log.resourceId.toLowerCase().includes(query)
      );
    }
    return true;
  });

  const getActionBadge = (action: string) => {
    const actionType = action.split('_')[0].toLowerCase();
    switch (actionType) {
      case 'user':
        return <Badge variant="info">{action}</Badge>;
      case 'listing':
        return <Badge variant="success">{action}</Badge>;
      case 'inspection':
        return <Badge variant="purple">{action}</Badge>;
      case 'offer':
        return <Badge variant="warning">{action}</Badge>;
      case 'payment':
        return <Badge variant="success">{action}</Badge>;
      case 'risk':
        return <Badge variant="danger">{action}</Badge>;
      case 'passport':
        return <Badge variant="info">{action}</Badge>;
      default:
        return <Badge>{action}</Badge>;
    }
  };

  const actionTypes = [
    'all',
    'user',
    'listing',
    'inspection',
    'offer',
    'payment',
    'risk',
    'passport',
  ];

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Audit Logs</h1>
        <p className="text-gray-500 mt-2">Track all system activities and user actions</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <p className="text-sm text-gray-500">Total Logs</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">{mockAuditLogs.length}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <User className="w-5 h-5 text-green-600" />
            <p className="text-sm text-gray-500">Unique Users</p>
          </div>
          <p className="text-2xl font-bold text-green-600">
            {new Set(mockAuditLogs.map(l => l.userId)).size}
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-5 h-5 text-purple-600" />
            <p className="text-sm text-gray-500">Today</p>
          </div>
          <p className="text-2xl font-bold text-purple-600">
            {mockAuditLogs.filter(l => new Date(l.timestamp).toDateString() === new Date().toDateString()).length}
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Eye className="w-5 h-5 text-amber-600" />
            <p className="text-sm text-gray-500">Critical Actions</p>
          </div>
          <p className="text-2xl font-bold text-amber-600">
            {mockAuditLogs.filter(l => l.action.includes('RISK') || l.action.includes('APPROVED')).length}
          </p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by user, action, or details..."
              className="w-full py-2.5 pl-10 pr-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500"
            />
          </div>
          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="py-2.5 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500"
          >
            {actionTypes.map(type => (
              <option key={type} value={type}>
                {type === 'all' ? 'All Actions' : type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Audit Logs List */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="divide-y divide-gray-100">
          {filteredLogs.map(log => (
            <div
              key={log.id}
              className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                selectedLog === log.id ? 'bg-blue-50' : ''
              }`}
              onClick={() => setSelectedLog(selectedLog === log.id ? null : log.id)}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-blue-700">
                    {log.userName.charAt(0)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{log.userName}</p>
                      <div className="flex items-center gap-2 mt-1">
                        {getActionBadge(log.action)}
                        <span className="text-xs text-gray-500">
                          {log.resource}: {log.resourceId}
                        </span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-xs text-gray-500">
                        {new Date(log.timestamp).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(log.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{log.details}</p>
                  
                  {selectedLog === log.id && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg text-xs space-y-1">
                      <p><span className="font-medium">User ID:</span> {log.userId}</p>
                      <p><span className="font-medium">IP Address:</span> {log.ipAddress}</p>
                      <p><span className="font-medium">Timestamp:</span> {log.timestamp}</p>
                      <p><span className="font-medium">Resource:</span> {log.resource}</p>
                      <p><span className="font-medium">Resource ID:</span> {log.resourceId}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredLogs.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No audit logs found</p>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
        <p>Showing {filteredLogs.length} of {mockAuditLogs.length} logs</p>
      </div>

      {/* Info Box */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-5">
        <h3 className="font-semibold text-blue-900 mb-2">About Audit Logs</h3>
        <ul className="space-y-1 text-sm text-blue-700">
          <li>• All critical actions are logged for security and compliance</li>
          <li>• Logs include user, action, resource, timestamp, and IP address</li>
          <li>• Logs are immutable and cannot be deleted</li>
          <li>• Use audit logs for troubleshooting and security investigations</li>
          <li>• Logs are retained for 7 years as per legal requirements</li>
        </ul>
      </div>
    </DashboardLayout>
  );
}
