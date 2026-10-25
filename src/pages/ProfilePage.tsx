import { useState, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Lock, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [profileStatus, setProfileStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [passwordStatus, setPasswordStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated]);

  const handleProfileUpdate = async (e: FormEvent) => {
    e.preventDefault();
    setProfileStatus('saving');
    setError('');
    
    try {
      await api.updateProfile({
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone || undefined
      });
      setProfileStatus('saved');
      setTimeout(() => setProfileStatus('idle'), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
      setProfileStatus('error');
    }
  };

  const handlePasswordChange = async (e: FormEvent) => {
    e.preventDefault();
    setPasswordStatus('saving');
    setError('');
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('Passwords do not match');
      setPasswordStatus('error');
      return;
    }
    
    if (passwordData.newPassword.length < 8) {
      setError('New password must be at least 8 characters');
      setPasswordStatus('error');
      return;
    }
    
    try {
      await api.changePassword(passwordData.currentPassword, passwordData.newPassword);
      setPasswordStatus('saved');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setTimeout(() => setPasswordStatus('idle'), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to change password');
      setPasswordStatus('error');
    }
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-ivory pt-8 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-4xl font-bold text-obsidian mb-2">My Profile</h1>
          <p className="text-obsidian/70 mb-8">Manage your account settings</p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {/* Profile Information */}
          <div className="bg-white rounded-2xl shadow-soft p-8 mb-6">
            <h2 className="font-display text-xl font-bold text-obsidian mb-6">Profile Information</h2>
            
            <form onSubmit={handleProfileUpdate} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-obsidian mb-2">First Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-obsidian/40" />
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-ivory border border-obsidian/10 rounded-xl focus:border-gold focus:ring-2 focus:ring-gold/20"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-obsidian mb-2">Last Name</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-ivory border border-obsidian/10 rounded-xl focus:border-gold focus:ring-2 focus:ring-gold/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-obsidian mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-obsidian/40" />
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    className="w-full pl-10 pr-4 py-3 bg-ivory-dark border border-obsidian/10 rounded-xl text-obsidian/50 cursor-not-allowed"
                  />
                </div>
                <p className="text-xs text-obsidian/40 mt-1">Email cannot be changed</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-obsidian mb-2">Phone</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-obsidian/40" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-ivory border border-obsidian/10 rounded-xl focus:border-gold focus:ring-2 focus:ring-gold/20"
                    placeholder="+977-98XXXXXXXX"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={profileStatus === 'saving'}
                className="w-full py-3 bg-gradient-to-r from-gold to-gold-dark text-obsidian font-semibold rounded-xl shadow-gold hover:shadow-lg transition-all disabled:opacity-50"
              >
                {profileStatus === 'saving' ? 'Saving...' : profileStatus === 'saved' ? '✓ Saved' : 'Save Changes'}
              </button>

              {profileStatus === 'saved' && (
                <div className="flex items-center gap-2 text-sm text-emerald">
                  <CheckCircle className="w-4 h-4" />
                  Profile updated successfully
                </div>
              )}
            </form>
          </div>

          {/* Change Password */}
          <div className="bg-white rounded-2xl shadow-soft p-8">
            <h2 className="font-display text-xl font-bold text-obsidian mb-6">Change Password</h2>
            
            <form onSubmit={handlePasswordChange} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-obsidian mb-2">Current Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-obsidian/40" />
                  <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-ivory border border-obsidian/10 rounded-xl focus:border-gold focus:ring-2 focus:ring-gold/20"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-obsidian mb-2">New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-obsidian/40" />
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    required
                    minLength={8}
                    className="w-full pl-10 pr-4 py-3 bg-ivory border border-obsidian/10 rounded-xl focus:border-gold focus:ring-2 focus:ring-gold/20"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-obsidian mb-2">Confirm New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-obsidian/40" />
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-ivory border border-obsidian/10 rounded-xl focus:border-gold focus:ring-2 focus:ring-gold/20"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={passwordStatus === 'saving'}
                className="w-full py-3 bg-gradient-to-r from-gold to-gold-dark text-obsidian font-semibold rounded-xl shadow-gold hover:shadow-lg transition-all disabled:opacity-50"
              >
                {passwordStatus === 'saving' ? 'Changing...' : passwordStatus === 'saved' ? '✓ Password Changed' : 'Change Password'}
              </button>

              {passwordStatus === 'saved' && (
                <div className="flex items-center gap-2 text-sm text-emerald">
                  <CheckCircle className="w-4 h-4" />
                  Password changed successfully
                </div>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
