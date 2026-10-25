import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Phone, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    
    setLoading(true);
    
    try {
      await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone || undefined,
        password: formData.password
      });
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-ivory pt-20 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl font-bold text-obsidian mb-2">Create Account</h1>
          <p className="text-obsidian/70">Join Nepal's trusted vehicle marketplace</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-medium p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-obsidian mb-2">
                  First Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-obsidian/40" />
                  <input
                    id="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-ivory border border-obsidian/10 rounded-xl focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
                    placeholder="Ram"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-obsidian mb-2">
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-ivory border border-obsidian/10 rounded-xl focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
                  placeholder="Bahadur"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-obsidian mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-obsidian/40" />
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-ivory border border-obsidian/10 rounded-xl focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-obsidian mb-2">
                Phone (Optional)
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-obsidian/40" />
                <input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-ivory border border-obsidian/10 rounded-xl focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
                  placeholder="+977-98XXXXXXXX"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-obsidian mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-obsidian/40" />
                <input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  minLength={8}
                  className="w-full pl-10 pr-4 py-3 bg-ivory border border-obsidian/10 rounded-xl focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-obsidian mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-obsidian/40" />
                <input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-ivory border border-obsidian/10 rounded-xl focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-gold to-gold-dark text-obsidian font-semibold rounded-xl shadow-gold hover:shadow-lg transition-all disabled:opacity-50"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-obsidian/70">
              Already have an account?{' '}
              <Link to="/login" className="text-gold-dark font-semibold hover:text-gold transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </motion.div>
    </main>
  );
}
