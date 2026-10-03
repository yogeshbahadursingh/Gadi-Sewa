import { useState } from 'react';
import { Search, Filter, Users, Shield, CheckCircle2, XCircle, Edit, MoreVertical, Mail, Phone, Calendar } from 'lucide-react';
import { users } from '../store/data';
import { Badge } from '../components/Layout';
import { DashboardLayout } from '../components/Layout';

export default function AdminUsersPage() {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const filteredUsers = users.filter(u => {
    if (filter !== 'all' && u.role.toLowerCase() !== filter.toLowerCase()) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        u.fullName.toLowerCase().includes(query) ||
        u.email.toLowerCase().includes(query) ||
        u.phone.includes(query)
      );
    }
    return true;
  });

  const roleCounts = {
    all: users.length,
    admin: users.filter(u => u.role === 'SUPER_ADMIN' || u.role === 'ADMIN').length,
    seller: users.filter(u => u.role === 'PRIVATE_SELLER').length,
    buyer: users.filter(u => u.role === 'BUYER').length,
    dealer: users.filter(u => u.role.includes('DEALER')).length,
    inspector: users.filter(u => u.role === 'INSPECTOR').length,
  };

  const getRoleBadge = (role: string) => {
    const variants: Record<string, 'default' | 'success' | 'warning' | 'danger' | 'info' | 'purple'> = {
      'SUPER_ADMIN': 'danger',
      'ADMIN': 'danger',
      'PRIVATE_SELLER': 'info',
      'BUYER': 'success',
      'DEALER_OWNER': 'purple',
      'DEALER_MANAGER': 'purple',
      'DEALER_STAFF': 'purple',
      'INSPECTOR': 'warning',
      'INSPECTION_MANAGER': 'warning',
      'FRAUD_REVIEWER': 'warning',
      'SUPPORT': 'info',
    };
    return <Badge variant={variants[role] || 'default'}>{role.replace(/_/g, ' ')}</Badge>;
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Users Management</h1>
        <p className="text-sm text-gray-500">Manage all platform users and their roles</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-6">
        {[
          { label: 'All Users', count: roleCounts.all, color: 'bg-gray-100 text-gray-700' },
          { label: 'Admins', count: roleCounts.admin, color: 'bg-red-100 text-red-700' },
          { label: 'Sellers', count: roleCounts.seller, color: 'bg-blue-100 text-blue-700' },
          { label: 'Buyers', count: roleCounts.buyer, color: 'bg-green-100 text-green-700' },
          { label: 'Dealers', count: roleCounts.dealer, color: 'bg-purple-100 text-purple-700' },
          { label: 'Inspectors', count: roleCounts.inspector, color: 'bg-amber-100 text-amber-700' },
        ].map(stat => (
          <button
            key={stat.label}
            onClick={() => setFilter(stat.label.toLowerCase().includes('all') ? 'all' : stat.label.toLowerCase())}
            className={`p-3 rounded-xl text-center transition-all ${
              (filter === 'all' && stat.label === 'All Users') || filter === stat.label.toLowerCase()
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
              placeholder="Search by name, email, or phone..."
              className="w-full py-2.5 pl-10 pr-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500"
            />
          </div>
          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="py-2.5 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500"
          >
            <option value="all">All Roles</option>
            <option value="super_admin">Super Admin</option>
            <option value="admin">Admin</option>
            <option value="private_seller">Private Seller</option>
            <option value="buyer">Buyer</option>
            <option value="dealer_owner">Dealer Owner</option>
            <option value="inspector">Inspector</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">User</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Contact</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Role</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Joined</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map(user => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-blue-700">{user.fullName.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{user.fullName}</p>
                        <p className="text-xs text-gray-500">ID: {user.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-900 flex items-center gap-1">
                        <Mail className="w-3 h-3" /> {user.email}
                      </p>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <Phone className="w-3 h-3" /> {user.phone}
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {getRoleBadge(user.role)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-1">
                      {user.emailVerified && (
                        <span className="text-xs text-green-600 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Email
                        </span>
                      )}
                      {user.phoneVerified && (
                        <span className="text-xs text-green-600 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Phone
                        </span>
                      )}
                      {user.identityVerified && (
                        <span className="text-xs text-green-600 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Identity
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm text-gray-900 flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button 
                        onClick={() => alert(`Edit user: ${user.fullName}\n\nEdit form would open here.`)}
                        className="p-1.5 hover:bg-gray-100 rounded-lg" 
                        title="Edit"
                      >
                        <Edit className="w-4 h-4 text-gray-600" />
                      </button>
                      <button 
                        onClick={() => alert(`More options for: ${user.fullName}\n\n- View Details\n- Change Role\n- Suspend Account\n- Delete User`)}
                        className="p-1.5 hover:bg-gray-100 rounded-lg" 
                        title="More"
                      >
                        <MoreVertical className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No users found</p>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
        <p>Showing {filteredUsers.length} of {users.length} users</p>
      </div>
    </DashboardLayout>
  );
}
