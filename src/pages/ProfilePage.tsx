import { useState } from 'react';
import { useAuth } from '../context/AppContext';
import { User, Mail, Phone, MapPin, Shield, Bell, Lock, Camera, CheckCircle2, Edit2 } from 'lucide-react';
import { Badge } from '../components/Layout';

export default function ProfilePage() {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notifications' | 'preferences'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  const [profileData, setProfileData] = useState({
    fullName: currentUser?.fullName || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    address: '',
    bio: '',
  });

  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [notificationPrefs, setNotificationPrefs] = useState({
    email: {
      newOffers: true,
      priceAlerts: true,
      inspectionUpdates: true,
      messages: true,
      marketing: false,
    },
    sms: {
      newOffers: true,
      priceAlerts: false,
      inspectionUpdates: true,
      messages: true,
      marketing: false,
    },
  });

  const handleSaveProfile = () => {
    setIsEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleSaveSecurity = () => {
    if (securityData.newPassword !== securityData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    setSecurityData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (!currentUser) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-500">Please sign in to view your profile</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
        <div className="flex items-start gap-6">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
              <span className="text-3xl font-bold text-white">{currentUser.fullName.charAt(0)}</span>
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">{currentUser.fullName}</h1>
            <p className="text-gray-500 mt-1">{currentUser.email}</p>
            <div className="flex items-center gap-2 mt-3">
              <Badge variant="info">{currentUser.role.replace(/_/g, ' ')}</Badge>
              {currentUser.identityVerified && (
                <Badge variant="success">
                  <CheckCircle2 className="w-3 h-3 inline mr-1" />
                  Verified
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        {[
          { id: 'profile', label: 'Profile', icon: User },
          { id: 'security', label: 'Security', icon: Shield },
          { id: 'notifications', label: 'Notifications', icon: Bell },
          { id: 'preferences', label: 'Preferences', icon: Edit2 },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
              activeTab === tab.id
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Success Message */}
      {saved && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-green-600" />
          <p className="text-sm text-green-700">Changes saved successfully</p>
        </div>
      )}

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Personal Information</h2>
            <button
              onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
            >
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1.5">Full Name</label>
              <input
                type="text"
                value={profileData.fullName}
                onChange={e => setProfileData({ ...profileData, fullName: e.target.value })}
                disabled={!isEditing}
                className="w-full py-2.5 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500 disabled:bg-gray-50"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1.5">Email</label>
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  value={profileData.email}
                  onChange={e => setProfileData({ ...profileData, email: e.target.value })}
                  disabled={!isEditing}
                  className="flex-1 py-2.5 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500 disabled:bg-gray-50"
                />
                {currentUser.emailVerified ? (
                  <Badge variant="success">Verified</Badge>
                ) : (
                  <button className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-xs font-medium hover:bg-blue-200">
                    Verify
                  </button>
                )}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1.5">Phone</label>
              <div className="flex items-center gap-2">
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={e => setProfileData({ ...profileData, phone: e.target.value })}
                  disabled={!isEditing}
                  className="flex-1 py-2.5 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500 disabled:bg-gray-50"
                />
                {currentUser.phoneVerified ? (
                  <Badge variant="success">Verified</Badge>
                ) : (
                  <button className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-xs font-medium hover:bg-blue-200">
                    Verify
                  </button>
                )}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1.5">Address</label>
              <input
                type="text"
                value={profileData.address}
                onChange={e => setProfileData({ ...profileData, address: e.target.value })}
                disabled={!isEditing}
                placeholder="Your address"
                className="w-full py-2.5 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500 disabled:bg-gray-50"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1.5">Bio</label>
              <textarea
                value={profileData.bio}
                onChange={e => setProfileData({ ...profileData, bio: e.target.value })}
                disabled={!isEditing}
                placeholder="Tell us about yourself..."
                rows={4}
                className="w-full py-2.5 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500 disabled:bg-gray-50 resize-none"
              />
            </div>
          </div>

          {/* Identity Verification */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Identity Verification</h3>
            {currentUser.identityVerified ? (
              <div className="p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-green-900">Identity Verified</p>
                  <p className="text-xs text-green-700">Your identity has been verified</p>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <p className="text-sm font-medium text-amber-900 mb-2">Identity Not Verified</p>
                <p className="text-xs text-amber-700 mb-3">
                  Verify your identity to build trust with other users and access all features
                </p>
                <button className="px-4 py-2 bg-amber-600 text-white rounded-lg text-sm font-medium hover:bg-amber-700">
                  Start Verification
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Security Settings</h2>

          {/* Change Password */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Change Password</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Current Password</label>
                <input
                  type="password"
                  value={securityData.currentPassword}
                  onChange={e => setSecurityData({ ...securityData, currentPassword: e.target.value })}
                  className="w-full py-2.5 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">New Password</label>
                <input
                  type="password"
                  value={securityData.newPassword}
                  onChange={e => setSecurityData({ ...securityData, newPassword: e.target.value })}
                  className="w-full py-2.5 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Confirm New Password</label>
                <input
                  type="password"
                  value={securityData.confirmPassword}
                  onChange={e => setSecurityData({ ...securityData, confirmPassword: e.target.value })}
                  className="w-full py-2.5 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500"
                />
              </div>
              <button
                onClick={handleSaveSecurity}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700"
              >
                Update Password
              </button>
            </div>
          </div>

          {/* Two-Factor Authentication */}
          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Two-Factor Authentication</h3>
            <div className="p-4 bg-gray-50 rounded-xl flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Add an extra layer of security</p>
                <p className="text-xs text-gray-500 mt-1">Receive a code via SMS or authenticator app</p>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                Enable
              </button>
            </div>
          </div>

          {/* Active Sessions */}
          <div className="pt-6 border-t border-gray-200 mt-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Active Sessions</h3>
            <div className="space-y-3">
              <div className="p-4 bg-gray-50 rounded-xl flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Current Session</p>
                  <p className="text-xs text-gray-500 mt-1">Chrome on macOS • Kathmandu, Nepal</p>
                </div>
                <Badge variant="success">Active</Badge>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Notification Preferences</h2>

          {/* Email Notifications */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Mail className="w-4 h-4" /> Email Notifications
            </h3>
            <div className="space-y-3">
              {Object.entries(notificationPrefs.email).map(([key, value]) => (
                <label key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl cursor-pointer">
                  <span className="text-sm text-gray-700">
                    {key === 'newOffers' && 'New offers on your listings'}
                    {key === 'priceAlerts' && 'Price alerts for saved searches'}
                    {key === 'inspectionUpdates' && 'Inspection updates'}
                    {key === 'messages' && 'New messages'}
                    {key === 'marketing' && 'Marketing and promotions'}
                  </span>
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={e => setNotificationPrefs({
                      ...notificationPrefs,
                      email: { ...notificationPrefs.email, [key]: e.target.checked }
                    })}
                    className="w-5 h-5 rounded border-gray-300 text-blue-600"
                  />
                </label>
              ))}
            </div>
          </div>

          {/* SMS Notifications */}
          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Phone className="w-4 h-4" /> SMS Notifications
            </h3>
            <div className="space-y-3">
              {Object.entries(notificationPrefs.sms).map(([key, value]) => (
                <label key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl cursor-pointer">
                  <span className="text-sm text-gray-700">
                    {key === 'newOffers' && 'New offers on your listings'}
                    {key === 'priceAlerts' && 'Price alerts for saved searches'}
                    {key === 'inspectionUpdates' && 'Inspection updates'}
                    {key === 'messages' && 'New messages'}
                    {key === 'marketing' && 'Marketing and promotions'}
                  </span>
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={e => setNotificationPrefs({
                      ...notificationPrefs,
                      sms: { ...notificationPrefs.sms, [key]: e.target.checked }
                    })}
                    className="w-5 h-5 rounded border-gray-300 text-blue-600"
                  />
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              setSaved(true);
              setTimeout(() => setSaved(false), 3000);
            }}
            className="mt-6 px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700"
          >
            Save Preferences
          </button>
        </div>
      )}

      {/* Preferences Tab */}
      {activeTab === 'preferences' && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Account Preferences</h2>

          <div className="space-y-6">
            {/* Language */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1.5">Language</label>
              <select className="w-full py-2.5 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500">
                <option>English</option>
                <option>नेपाली (Nepali)</option>
              </select>
            </div>

            {/* Currency */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1.5">Currency</label>
              <select className="w-full py-2.5 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500">
                <option>NPR (Rs.)</option>
                <option>USD ($)</option>
              </select>
            </div>

            {/* Default Location */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1.5">Default Location</label>
              <select className="w-full py-2.5 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500">
                <option>Kathmandu</option>
                <option>Lalitpur</option>
                <option>Bhaktapur</option>
                <option>Pokhara</option>
                <option>Chitwan</option>
              </select>
            </div>

            {/* Search Preferences */}
            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Search Preferences</h3>
              <div className="space-y-3">
                <label className="flex items-center justify-between p-3 bg-gray-50 rounded-xl cursor-pointer">
                  <span className="text-sm text-gray-700">Show inspected vehicles first</span>
                  <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-gray-300 text-blue-600" />
                </label>
                <label className="flex items-center justify-between p-3 bg-gray-50 rounded-xl cursor-pointer">
                  <span className="text-sm text-gray-700">Include dealer listings</span>
                  <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-gray-300 text-blue-600" />
                </label>
                <label className="flex items-center justify-between p-3 bg-gray-50 rounded-xl cursor-pointer">
                  <span className="text-sm text-gray-700">Show EV vehicles</span>
                  <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-gray-300 text-blue-600" />
                </label>
              </div>
            </div>

            <button
              onClick={() => {
                setSaved(true);
                setTimeout(() => setSaved(false), 3000);
              }}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700"
            >
              Save Preferences
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
