import { useState } from 'react';
import { DollarSign, Calendar, User, CreditCard, CheckCircle2, Clock, XCircle, Search, Filter } from 'lucide-react';
import { DashboardLayout } from '../components/Layout';
import { Badge } from '../components/Layout';

// Mock payment data
const mockPayments = [
  {
    id: 'pay1',
    userId: 'u3',
    userName: 'Sita Maharjan',
    userEmail: 'sita@gmail.com',
    amount: 50000,
    purpose: 'reservation_deposit',
    status: 'completed',
    method: 'esewa',
    reference: 'ESW2026011001',
    createdAt: '2026-01-10T14:30:00',
    description: 'Reservation deposit for Honda City',
  },
  {
    id: 'pay2',
    userId: 'u2',
    userName: 'Ramesh Thapa',
    userEmail: 'ramesh@gmail.com',
    amount: 5000,
    purpose: 'premium_listing',
    status: 'completed',
    method: 'khalti',
    reference: 'KLT2026010802',
    createdAt: '2026-01-08T10:15:00',
    description: 'Premium listing for Toyota Fortuner',
  },
  {
    id: 'pay3',
    userId: 'u7',
    userName: 'Sunil Shakya',
    userEmail: 'sunil@gmail.com',
    amount: 3500,
    purpose: 'inspection',
    status: 'completed',
    method: 'esewa',
    reference: 'ESW2026010503',
    createdAt: '2026-01-05T16:45:00',
    description: 'Standard inspection package',
  },
  {
    id: 'pay4',
    userId: 'u4',
    userName: 'Biraj Rajbhandari',
    userEmail: 'biraj@sujalmotors.com',
    amount: 15000,
    purpose: 'dealer_subscription',
    status: 'completed',
    method: 'bank_transfer',
    reference: 'BNK2026010104',
    createdAt: '2026-01-01T09:00:00',
    description: 'Monthly dealer subscription - January',
  },
  {
    id: 'pay5',
    userId: 'u6',
    userName: 'Priya Joshi',
    userEmail: 'priya@gmail.com',
    amount: 5500,
    purpose: 'inspection',
    status: 'failed',
    method: 'khalti',
    reference: 'KLT2025122805',
    createdAt: '2025-12-28T11:20:00',
    description: 'Standard inspection package - Payment failed',
  },
];

export default function AdminPaymentsPage() {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPayments = mockPayments.filter(p => {
    if (filter !== 'all' && p.status !== filter) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        p.userName.toLowerCase().includes(query) ||
        p.userEmail.toLowerCase().includes(query) ||
        p.reference.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      );
    }
    return true;
  });

  const totalRevenue = mockPayments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

  const completedCount = mockPayments.filter(p => p.status === 'completed').length;
  const failedCount = mockPayments.filter(p => p.status === 'failed').length;
  const pendingCount = mockPayments.filter(p => p.status === 'pending').length;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="success">Completed</Badge>;
      case 'pending':
        return <Badge variant="warning">Pending</Badge>;
      case 'failed':
        return <Badge variant="danger">Failed</Badge>;
      case 'refunded':
        return <Badge variant="info">Refunded</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getPurposeLabel = (purpose: string) => {
    switch (purpose) {
      case 'reservation_deposit':
        return 'Reservation Deposit';
      case 'premium_listing':
        return 'Premium Listing';
      case 'inspection':
        return 'Inspection Fee';
      case 'dealer_subscription':
        return 'Dealer Subscription';
      default:
        return purpose;
    }
  };

  const getMethodLabel = (method: string) => {
    switch (method) {
      case 'esewa':
        return 'eSewa';
      case 'khalti':
        return 'Khalti';
      case 'bank_transfer':
        return 'Bank Transfer';
      default:
        return method;
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Payments</h1>
        <p className="text-gray-500 mt-2">Manage and track all platform payments</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            <p className="text-sm text-gray-500">Total Revenue</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">Rs. {totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <p className="text-sm text-gray-500">Completed</p>
          </div>
          <p className="text-2xl font-bold text-green-600">{completedCount}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-amber-600" />
            <p className="text-sm text-gray-500">Pending</p>
          </div>
          <p className="text-2xl font-bold text-amber-600">{pendingCount}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <XCircle className="w-5 h-5 text-red-600" />
            <p className="text-sm text-gray-500">Failed</p>
          </div>
          <p className="text-2xl font-bold text-red-600">{failedCount}</p>
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
              placeholder="Search by user, reference, or description..."
              className="w-full py-2.5 pl-10 pr-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500"
            />
          </div>
          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="py-2.5 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
          </select>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Payment ID</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">User</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Purpose</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Method</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredPayments.map(payment => (
                <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <p className="text-sm font-mono text-gray-900">{payment.reference}</p>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{payment.userName}</p>
                      <p className="text-xs text-gray-500">{payment.userEmail}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm font-bold text-gray-900">Rs. {payment.amount.toLocaleString()}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm text-gray-700">{getPurposeLabel(payment.purpose)}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{payment.description}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-gray-700">{getMethodLabel(payment.method)}</span>
                  </td>
                  <td className="px-4 py-3">
                    {getStatusBadge(payment.status)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(payment.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {new Date(payment.createdAt).toLocaleTimeString()}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPayments.length === 0 && (
          <div className="text-center py-12">
            <CreditCard className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No payments found</p>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
        <p>Showing {filteredPayments.length} of {mockPayments.length} payments</p>
      </div>
    </DashboardLayout>
  );
}
