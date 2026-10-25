import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building2, FileText, Calculator, Shield, ArrowRight } from 'lucide-react';
import { api, FinanceProvider, FinanceProduct } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

export default function FinancePage() {
  const { isAuthenticated } = useAuth();
  const [providers, setProviders] = useState<FinanceProvider[]>([]);
  const [products, setProducts] = useState<FinanceProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'providers' | 'products'>('providers');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [providersData, productsData] = await Promise.all([
        api.getFinanceProviders(),
        api.getFinanceProducts()
      ]);
      setProviders(providersData);
      setProducts(productsData);
    } catch (error) {
      console.error('Failed to load finance data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `रू ${(amount / 10000000).toFixed(2)} Crore`;
    if (amount >= 100000) return `रू ${(amount / 100000).toFixed(2)} Lakh`;
    return `रू ${amount.toLocaleString('en-NP')}`;
  };

  const stats = {
    totalProviders: providers.length,
    verifiedProviders: providers.filter(p => p.verified).length,
    totalProducts: products.length,
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-ivory flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-obsidian/70">Loading finance options...</p>
        </div>
      </main>
    );
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
              <Calculator className="w-4 h-4" />
              Financial Services
            </span>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-ivory mb-4 tracking-tight">
              Finance & Insurance
            </h1>
            <p className="text-xl text-ivory/70 max-w-2xl">
              Compare and apply for vehicle loans, insurance, and warranty products from trusted providers
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container-luxury py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Info Banner */}
          <div className="card-luxury p-6 mb-12 bg-blue-50 border border-blue-200">
            <div className="flex items-start gap-3">
              <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-1">Important Information</h3>
                <p className="text-sm text-blue-800">
                  Gadi-Sewa connects you with licensed financial institutions. We do not directly provide loans or insurance. All applications are subject to approval by the respective providers.
                </p>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card-luxury p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-gold/10 to-gold/5 rounded-2xl flex items-center justify-center">
                  <Building2 className="w-7 h-7 text-gold" />
                </div>
                <ArrowRight className="w-5 h-5 text-obsidian/20" />
              </div>
              <p className="text-3xl font-bold text-obsidian mb-1">{stats.totalProviders}</p>
              <p className="text-sm text-obsidian/60">Finance Providers</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card-luxury p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald/10 to-emerald/5 rounded-2xl flex items-center justify-center">
                  <Shield className="w-7 h-7 text-emerald" />
                </div>
                <ArrowRight className="w-5 h-5 text-obsidian/20" />
              </div>
              <p className="text-3xl font-bold text-obsidian mb-1">{stats.verifiedProviders}</p>
              <p className="text-sm text-obsidian/60">Verified Providers</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="card-luxury p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-gold/10 to-gold/5 rounded-2xl flex items-center justify-center">
                  <FileText className="w-7 h-7 text-gold" />
                </div>
                <ArrowRight className="w-5 h-5 text-obsidian/20" />
              </div>
              <p className="text-3xl font-bold text-obsidian mb-1">{stats.totalProducts}</p>
              <p className="text-sm text-obsidian/60">Available Products</p>
            </motion.div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            <button
              onClick={() => setActiveTab('providers')}
              className={`px-6 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === 'providers'
                  ? 'bg-obsidian text-ivory shadow-medium'
                  : 'bg-white text-obsidian/70 hover:bg-obsidian/5'
              }`}
            >
              <Building2 className="w-4 h-4 inline mr-2" />
              Providers ({providers.length})
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`px-6 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === 'products'
                  ? 'bg-obsidian text-ivory shadow-medium'
                  : 'bg-white text-obsidian/70 hover:bg-obsidian/5'
              }`}
            >
              <FileText className="w-4 h-4 inline mr-2" />
              Products ({products.length})
            </button>
          </div>

          {/* Providers Tab */}
          {activeTab === 'providers' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
              {providers.map((provider) => (
                <motion.div
                  key={provider.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="card-luxury p-6 hover:shadow-ultra transition-all duration-300"
                >
                  <div className="flex items-start gap-4 mb-4">
                    {provider.logo ? (
                      <img src={provider.logo} alt={provider.name} className="w-16 h-16 rounded-xl object-cover" />
                    ) : (
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-obsidian/10 to-obsidian/5 flex items-center justify-center">
                        <Building2 className="w-8 h-8 text-obsidian/30" />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-display text-lg font-bold text-obsidian mb-1">{provider.name}</h3>
                      <span className="badge-luxury badge-gold text-xs">
                        {provider.type.replace('_', ' ')}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-obsidian/70 line-clamp-2 mb-4">{provider.description}</p>

                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex items-center gap-2 text-obsidian/70">
                      <span className="font-medium">Products:</span>
                      <span>{provider.products?.length || 0} available</span>
                    </div>
                    {provider.verified && (
                      <div className="flex items-center gap-2 text-emerald">
                        <Shield className="w-4 h-4" />
                        <span className="text-sm font-semibold">Verified Provider</span>
                      </div>
                    )}
                  </div>

                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-obsidian text-ivory text-sm font-medium rounded-xl hover:bg-obsidian-light transition-colors">
                    <Calculator className="w-4 h-4" />
                    View Products
                  </button>
                </motion.div>
              ))}
            </div>
          )}

          {/* Products Tab */}
          {activeTab === 'products' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
              {products.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="card-luxury p-6 hover:shadow-ultra transition-all duration-300"
                >
                  <div className="mb-4">
                    <span className="badge-luxury badge-gold text-xs mb-2 inline-block">
                      {product.type.replace('_', ' ')}
                    </span>
                    <h3 className="font-display text-lg font-bold text-obsidian">{product.name}</h3>
                    <p className="text-sm text-obsidian/70 mt-1">{product.provider?.name}</p>
                  </div>

                  <p className="text-sm text-obsidian/70 line-clamp-2 mb-4">{product.description}</p>

                  <div className="space-y-2 text-sm border-t border-obsidian/5 pt-4 mb-4">
                    {product.minAmount && product.maxAmount && (
                      <div className="flex justify-between">
                        <span className="text-obsidian/70">Amount Range:</span>
                        <span className="font-medium text-obsidian">
                          {formatCurrency(product.minAmount)} - {formatCurrency(product.maxAmount)}
                        </span>
                      </div>
                    )}
                    {product.interestRateMin && product.interestRateMax && (
                      <div className="flex justify-between">
                        <span className="text-obsidian/70">Interest Rate:</span>
                        <span className="font-medium text-obsidian">
                          {product.interestRateMin}% - {product.interestRateMax}%
                        </span>
                      </div>
                    )}
                    {product.minTenure && product.maxTenure && (
                      <div className="flex justify-between">
                        <span className="text-obsidian/70">Tenure:</span>
                        <span className="font-medium text-obsidian">
                          {product.minTenure} - {product.maxTenure} months
                        </span>
                      </div>
                    )}
                    {product.processingFee && (
                      <div className="flex justify-between">
                        <span className="text-obsidian/70">Processing Fee:</span>
                        <span className="font-medium text-obsidian">{product.processingFee}%</span>
                      </div>
                    )}
                  </div>

                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-gold to-gold-dark text-obsidian text-sm font-semibold rounded-xl shadow-gold hover:shadow-lg transition-all">
                    <Calculator className="w-4 h-4" />
                    Apply Now
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </main>
  );
}
