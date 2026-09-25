import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, CheckCircle2, MessageSquare, DollarSign, FileCheck, Gauge, AlertTriangle, Heart, Car, Check, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AppContext';
import { notifications as allNotifications } from '../store/data';

export default function NotificationsPage() {
  const { currentUser } = useAuth();
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const userNotifications = currentUser
    ? allNotifications.filter(n => n.userId === currentUser.id)
    : [];

  const filtered = filter === 'unread' ? userNotifications.filter(n => !n.read) : userNotifications;
  const unreadCount = userNotifications.filter(n => !n.read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case 'offer_received':
      case 'offer_countered':
      case 'offer_accepted':
        return <DollarSign className="w-4 h-4" />;
      case 'new_enquiry':
      case 'listing_views':
        return <MessageSquare className="w-4 h-4" />;
      case 'inspection_scheduled':
      case 'inspection_completed':
        return <Gauge className="w-4 h-4" />;
      case 'passport_updated':
        return <FileCheck className="w-4 h-4" />;
      case 'reservation_confirmed':
      case 'reservation_status':
        return <FileCheck className="w-4 h-4" />;
      case 'price_changed':
        return <Car className="w-4 h-4" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  const getColor = (type: string) => {
    if (type.includes('offer')) return 'bg-blue-100 text-blue-600';
    if (type.includes('inspection')) return 'bg-green-100 text-green-600';
    if (type.includes('reservation')) return 'bg-purple-100 text-purple-600';
    if (type.includes('passport')) return 'bg-indigo-100 text-indigo-600';
    return 'bg-gray-100 text-gray-600';
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="text-sm text-gray-500">{unreadCount} unread</p>
        </div>
        {unreadCount > 0 && (
          <button className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1">
            <Check className="w-4 h-4" /> Mark all as read
          </button>
        )}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'all' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
        >
          All ({userNotifications.length})
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'unread' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
        >
          Unread ({unreadCount})
        </button>
      </div>

      {/* Notifications list */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <Bell className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">
              {filter === 'unread' ? 'No unread notifications' : 'No notifications yet'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filtered.map(notification => (
              <Link
                key={notification.id}
                to={notification.link || '#'}
                className={`block p-4 hover:bg-gray-50 transition-colors ${!notification.read ? 'bg-blue-50/50' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${getColor(notification.type)}`}>
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className={`text-sm ${!notification.read ? 'font-semibold text-gray-900' : 'font-medium text-gray-700'}`}>
                        {notification.title}
                      </p>
                      {!notification.read && (
                        <span className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-1.5" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-0.5 line-clamp-2">{notification.message}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(notification.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Notification preferences */}
      <div className="mt-6 bg-white border border-gray-200 rounded-xl p-5">
        <h3 className="font-semibold text-gray-900 mb-3">Notification Preferences</h3>
        <div className="space-y-3">
          {[
            { label: 'New offers and enquiries', enabled: true },
            { label: 'Price changes on saved vehicles', enabled: true },
            { label: 'Inspection updates', enabled: true },
            { label: 'Reservation status', enabled: true },
            { label: 'Marketing and promotions', enabled: false },
          ].map((pref, i) => (
            <label key={i} className="flex items-center justify-between cursor-pointer">
              <span className="text-sm text-gray-700">{pref.label}</span>
              <div className={`w-10 h-6 rounded-full transition-colors ${pref.enabled ? 'bg-blue-600' : 'bg-gray-200'}`}>
                <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform mt-0.5 ${pref.enabled ? 'translate-x-4.5 ml-[18px]' : 'ml-0.5'}`} />
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
