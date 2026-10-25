import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Building2, FileText, Calculator } from 'lucide-react';
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
    return `रू ${amount.toLocaleString('en-NP')}`;
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-ivory pt-20 flex items-center justify-center">
        <p className="text-obsidian/70">Loading finance options...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-ivory pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-4xl font-bold text-obsidian mb-2">Finance & Insurance</h1>
          <p className="text-obsidian/70 mb-8">Compare and apply for vehicle loans, insurance, and warranty products</p>

          {/* Info Banner */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
            <p className="text-sm text-blue-800">
              <strong>Important:</strong> Gadi-Sewa connects you with licensed financial institutions. We do not directly provide loans or insurance. All applications are subject to approval by the respective providers.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setActiveTab('providers')}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                activeTab === 'providers' ? 'bg-obsidian text-ivory' : 'bg-white text-obsidian/70'
              }`}
            >
              <Building2 className="w-4 h-4 inline mr-2" />
              Providers ({providers.length})
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                activeTab === 'products' ? 'bg-obsidian text-ivory' : 'bg-white text-obsidian/70'
              }`}
            >
              <FileText className="w-4 h-4 inline mr-2" />
              Products ({products.length})
            </button>
          </div>

          {/* Providers Tab */}
          {activeTab === 'providers' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {providers.map((provider) => (
                <div key={provider.id} className="bg-white rounded-2xl shadow-soft p-6">
                  <div className="flex items-start gap-4 mb-4">
                    {provider.logo ? (
                      <img src={provider.logo} alt={provider.name} className="w-16 h-16 rounded-xl object-cover" />
                    ) : (
                      <div className="w-16 h-16 rounded-xl bg-obsidian/5 flex items-center justify-center">
                        <Building2 className="w-8 h-8 text-obsidian/20" />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-display text-lg font-bold text-obsidian">{provider.name}</h3>
                      <span className="inline-block px-2 py-0.5 bg-gold/10 text-gold-dark text-xs font-medium rounded-full mt-1">
                        {provider.type.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-obsidian/70 mb-4 line-clamp-2">{provider.description}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-obsidian/70">
                      <span className="font-medium">Products:</span>
                      <span>{provider.products?.length || 0} available</span>
                    </div>
                    {provider.verified && (
                      <div className="flex items-center gap-2 text-emerald">
                        <span className="text-sm font-medium">✓ Verified Provider</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Products Tab */}
          {activeTab === 'products' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-2xl shadow-soft p-6">
                  <div className="mb-4">
                    <span className="inline-block px-2 py-0.5 bg-gold/10 text-gold-dark text-xs font-medium rounded-full mb-2">
                      {product.type.replace('_', ' ')}
                    </span>
                    <h3 className="font-display text-lg font-bold text-obsidian">{product.name}</h3>
                    <p className="text-sm text-obsidian/70 mt-1">{product.provider?.name}</p>
                  </div>
                  <p className="text-sm text-obsidian/70 mb-4 line-clamp-2">{product.description}</p>
                  <div className="space-y-2 text-sm border-t border-obsidian/5 pt-4">
                    {product.minAmount && product.maxAmount && (
                      <div className="flex justify-between">
                        <span className="text-obsidian/70">Amount:</span>
                        <span className="font-medium text-obsidian">
                          {formatCurrency(product.minAmount)} - {formatCurrency(product.maxAmount)}
                        </span>
                      </div>
                    )}
                    {product.interestRateMin && product.interestRateMax && (
                      <div className="flex justify-between">
                        <span className="text-obsidian/70">Interest:</span>
                        <span className="font-medium text-obsidian">
                          {product.interestRateMin}% - {product.interestRateMax}%
                        </span>
                      </div>
                    )}
                  </div>
                  <button className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-obsidian text-ivory text-sm font-medium rounded-xl hover:bg-obsidian-light transition-colors">
                    <Calculator className="w-4 h-4" />
                    Apply Now
                  </button>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </main>
  );
}
