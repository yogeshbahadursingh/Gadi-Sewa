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
    <main className="min-h-screen bg-ivory">
      {/* Premium Header */}
      <section className="bg-gradient-to-br from-obsidian via-obsidian-light to-obsidian relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh-luxury opacity-20"></div>
        <div className="container-luxury relative z-10 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="badge-luxury badge-gold mb-4 inline-flex">
              <User className="w-4 h-4" />
              Account Settings
            </span>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-ivory mb-4 tracking-tight">
              My Profile
            </h1>
            <p className="text-xl text-ivory/70">
              Manage your account settings and preferences
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container-luxury py-12">
        <div className="max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-800 font-medium">{error}</p>
              </motion.div>
            )}

            {/* Profile Information */}
            <div className="card-luxury p-8 mb-8">
              <h2 className="font-display text-2xl font-bold text-obsidian mb-6 flex items-center gap-3">
                <div className="w-1 h-8 bg-gradient-to-b from-gold to-gold-dark rounded-full"></div>
                Profile Information
              </h2>
              
              <form onSubmit={handleProfileUpdate} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-obsidian mb-2">First Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold" />
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        required
                        className="input-luxury w-full pl-12 pr-4 py-3 rounded-xl"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-obsidian mb-2">Last Name</label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      required
                      className="input-luxury w-full px-4 py-3 rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-obsidian mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold" />
                    <input
                      type="email"
                      value={user.email}
                      disabled
                      className="input-luxury w-full pl-12 pr-4 py-3 rounded-xl bg-ivory-dark text-obsidian/50 cursor-not-allowed"
                    />
                  </div>
                  <p className="text-xs text-obsidian/60 mt-1">Email cannot be changed</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-obsidian mb-2">Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="input-luxury w-full pl-12 pr-4 py-3 rounded-xl"
                      placeholder="+977-98XXXXXXXX"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={profileStatus === 'saving'}
                  className="btn-luxury btn-gold w-full py-3 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {profileStatus === 'saving' ? (
                    <>
                      <div className="w-5 h-5 border-2 border-obsidian border-t-transparent rounded-full animate-spin"></div>
                      <span>Saving...</span>
                    </>
                  ) : profileStatus === 'saved' ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      <span>Saved</span>
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </button>

                {profileStatus === 'saved' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-sm text-emerald font-medium"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Profile updated successfully
                  </motion.div>
                )}
              </form>
            </div>

            {/* Change Password */}
            <div className="card-luxury p-8">
              <h2 className="font-display text-2xl font-bold text-obsidian mb-6 flex items-center gap-3">
                <div className="w-1 h-8 bg-gradient-to-b from-gold to-gold-dark rounded-full"></div>
                Change Password
              </h2>
              
              <form onSubmit={handlePasswordChange} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-obsidian mb-2">Current Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold" />
                    <input
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                      required
                      className="input-luxury w-full pl-12 pr-4 py-3 rounded-xl"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-obsidian mb-2">New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold" />
                    <input
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      required
                      minLength={8}
                      className="input-luxury w-full pl-12 pr-4 py-3 rounded-xl"
                      placeholder="••••••••"
                    />
                  </div>
                  <p className="text-xs text-obsidian/60 mt-1">Minimum 8 characters</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-obsidian mb-2">Confirm New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold" />
                    <input
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                      required
                      className="input-luxury w-full pl-12 pr-4 py-3 rounded-xl"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={passwordStatus === 'saving'}
                  className="btn-luxury btn-gold w-full py-3 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {passwordStatus === 'saving' ? (
                    <>
                      <div className="w-5 h-5 border-2 border-obsidian border-t-transparent rounded-full animate-spin"></div>
                      <span>Changing...</span>
                    </>
                  ) : passwordStatus === 'saved' ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      <span>Password Changed</span>
                    </>
                  ) : (
                    'Change Password'
                  )}
                </button>

                {passwordStatus === 'saved' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-sm text-emerald font-medium"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Password changed successfully
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
