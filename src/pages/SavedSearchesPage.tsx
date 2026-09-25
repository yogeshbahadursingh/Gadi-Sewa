import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell, BellOff, Trash2, Plus, MapPin, Car, Calendar, TrendingUp, X, Save, AlertCircle } from 'lucide-react';
import { listings, vehicles, formatPrice, formatMileage, getVehicleById, districts, makes } from '../store/data';
import { Badge } from '../components/Layout';
import { useAuth } from '../context/AppContext';

interface SavedSearch {
  id: string;
  name: string;
  filters: {
    query?: string;
    make?: string;
    priceMin?: number;
    priceMax?: number;
    yearMin?: number;
    fuelType?: string;
    district?: string;
    isEV?: boolean;
    isInspected?: boolean;
  };
  alertsEnabled: boolean;
  createdAt: string;
  lastMatchCount: number;
  lastNewMatch?: string;
}

// Demo saved searches
const DEMO_SAVED_SEARCHES: SavedSearch[] = [
  {
    id: 'ss1',
    name: 'EVs under 50 Lakh',
    filters: { priceMax: 5000000, isEV: true },
    alertsEnabled: true,
    createdAt: '2026-01-10',
    lastMatchCount: 3,
    lastNewMatch: '2 hours ago',
  },
  {
    id: 'ss2',
    name: 'Toyota SUV Kathmandu',
    filters: { make: 'Toyota', district: 'Kathmandu' },
    alertsEnabled: true,
    createdAt: '2026-01-08',
    lastMatchCount: 5,
    lastNewMatch: '1 day ago',
  },
  {
    id: 'ss3',
    name: 'Inspected Sedans',
    filters: { isInspected: true },
    alertsEnabled: false,
    createdAt: '2026-01-05',
    lastMatchCount: 2,
  },
];

export default function SavedSearchesPage() {
  const { currentUser } = useAuth();
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>(DEMO_SAVED_SEARCHES);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newSearch, setNewSearch] = useState({
    name: '',
    make: '',
    priceMin: '',
    priceMax: '',
    yearMin: '',
    fuelType: '',
    district: '',
    isEV: false,
    isInspected: false,
  });

  const toggleAlert = (id: string) => {
    setSavedSearches(prev => prev.map(s =>
      s.id === id ? { ...s, alertsEnabled: !s.alertsEnabled } : s
    ));
  };

  const deleteSearch = (id: string) => {
    setSavedSearches(prev => prev.filter(s => s.id !== id));
  };

  const createSearch = () => {
    if (!newSearch.name) return;
    const search: SavedSearch = {
      id: `ss${Date.now()}`,
      name: newSearch.name,
      filters: {
        make: newSearch.make || undefined,
        priceMin: newSearch.priceMin ? Number(newSearch.priceMin) : undefined,
        priceMax: newSearch.priceMax ? Number(newSearch.priceMax) : undefined,
        yearMin: newSearch.yearMin ? Number(newSearch.yearMin) : undefined,
        fuelType: newSearch.fuelType || undefined,
        district: newSearch.district || undefined,
        isEV: newSearch.isEV || undefined,
        isInspected: newSearch.isInspected || undefined,
      },
      alertsEnabled: true,
      createdAt: new Date().toISOString().split('T')[0],
      lastMatchCount: countMatches(newSearch),
    };
    setSavedSearches(prev => [search, ...prev]);
    setShowCreateModal(false);
    setNewSearch({ name: '', make: '', priceMin: '', priceMax: '', yearMin: '', fuelType: '', district: '', isEV: false, isInspected: false });
  };

  const countMatches = (filters: any): number => {
    return listings.filter(l => {
      if (l.status !== 'ACTIVE') return false;
      const v = getVehicleById(l.vehicleId);
      if (!v) return false;
      if (filters.make && v.make !== filters.make) return false;
      if (filters.priceMin && l.price < Number(filters.priceMin)) return false;
      if (filters.priceMax && l.price > Number(filters.priceMax)) return false;
      if (filters.yearMin && v.year < Number(filters.yearMin)) return false;
      if (filters.fuelType && v.fuelType.toLowerCase() !== filters.fuelType.toLowerCase()) return false;
      if (filters.district && l.district !== filters.district) return false;
      if (filters.isEV && !v.isEV) return false;
      if (filters.isInspected && !l.isInspected) return false;
      return true;
    }).length;
  };

  const getFilterSummary = (search: SavedSearch): string[] => {
    const parts: string[] = [];
    if (search.filters.make) parts.push(search.filters.make);
    if (search.filters.isEV) parts.push('Electric');
    if (search.filters.isInspected) parts.push('Inspected');
    if (search.filters.district) parts.push(search.filters.district);
    if (search.filters.priceMin || search.filters.priceMax) {
      const min = search.filters.priceMin ? formatPrice(search.filters.priceMin) : '0';
      const max = search.filters.priceMax ? formatPrice(search.filters.priceMax) : 'Any';
      parts.push(`${min} — ${max}`);
    }
    if (search.filters.yearMin) parts.push(`${search.filters.yearMin}+`);
    return parts;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Saved Searches</h1>
          <p className="text-sm text-gray-500">Get notified when new vehicles match your criteria</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> New Search
        </button>
      </div>

      {/* Saved Searches List */}
      {savedSearches.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
          <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No saved searches</h3>
          <p className="text-sm text-gray-500 mt-1 max-w-sm mx-auto">
            Save your search criteria to get notified when new vehicles matching your needs are listed
          </p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="mt-4 bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700"
          >
            Create Your First Search
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {savedSearches.map(search => {
            const summary = getFilterSummary(search);
            return (
              <div key={search.id} className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-sm transition-shadow">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{search.name}</h3>
                      {search.lastNewMatch && (
                        <Badge variant="info">New</Badge>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {summary.map((s, i) => (
                        <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{s}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Car className="w-3 h-3" /> {search.lastMatchCount} matches
                      </span>
                      <span>Created {new Date(search.createdAt).toLocaleDateString()}</span>
                      {search.lastNewMatch && (
                        <span className="text-green-600 font-medium">New {search.lastNewMatch}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleAlert(search.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        search.alertsEnabled
                          ? 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                          : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                      }`}
                      title={search.alertsEnabled ? 'Disable alerts' : 'Enable alerts'}
                    >
                      {search.alertsEnabled ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => deleteSearch(search.id)}
                      className="p-2 rounded-lg bg-gray-100 text-gray-400 hover:bg-red-100 hover:text-red-600 transition-colors"
                      title="Delete search"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* How it works */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-5">
        <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
          <AlertCircle className="w-4 h-4" /> How Search Alerts Work
        </h3>
        <ul className="space-y-2 text-sm text-blue-700">
          <li className="flex items-start gap-2">
            <span className="font-bold">1.</span>
            <span>Create a search with your desired filters (make, price, location, etc.)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">2.</span>
            <span>Enable alerts to get notified when new matching vehicles are listed</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">3.</span>
            <span>Receive notifications via email, SMS, or in-app alerts</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">4.</span>
            <span>Be the first to know about great deals before they're gone</span>
          </li>
        </ul>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">Save New Search</h3>
              <button onClick={() => setShowCreateModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Search Name</label>
                <input
                  type="text"
                  value={newSearch.name}
                  onChange={e => setNewSearch({ ...newSearch, name: e.target.value })}
                  placeholder="e.g., EVs under 50 Lakh"
                  className="w-full py-2.5 px-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1.5">Make</label>
                  <select
                    value={newSearch.make}
                    onChange={e => setNewSearch({ ...newSearch, make: e.target.value })}
                    className="w-full py-2.5 px-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500"
                  >
                    <option value="">Any</option>
                    {makes.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1.5">Location</label>
                  <select
                    value={newSearch.district}
                    onChange={e => setNewSearch({ ...newSearch, district: e.target.value })}
                    className="w-full py-2.5 px-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500"
                  >
                    <option value="">Anywhere</option>
                    {districts.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1.5">Min Price</label>
                  <input
                    type="number"
                    value={newSearch.priceMin}
                    onChange={e => setNewSearch({ ...newSearch, priceMin: e.target.value })}
                    placeholder="0"
                    className="w-full py-2.5 px-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1.5">Max Price</label>
                  <input
                    type="number"
                    value={newSearch.priceMax}
                    onChange={e => setNewSearch({ ...newSearch, priceMax: e.target.value })}
                    placeholder="Any"
                    className="w-full py-2.5 px-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Fuel Type</label>
                <select
                  value={newSearch.fuelType}
                  onChange={e => setNewSearch({ ...newSearch, fuelType: e.target.value })}
                  className="w-full py-2.5 px-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500"
                >
                  <option value="">Any</option>
                  <option value="petrol">Petrol</option>
                  <option value="diesel">Diesel</option>
                  <option value="electric">Electric</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newSearch.isEV}
                    onChange={e => setNewSearch({ ...newSearch, isEV: e.target.checked })}
                    className="rounded border-gray-300 text-blue-600"
                  />
                  <span className="text-sm text-gray-700">Electric vehicles only</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newSearch.isInspected}
                    onChange={e => setNewSearch({ ...newSearch, isInspected: e.target.checked })}
                    className="rounded border-gray-300 text-blue-600"
                  />
                  <span className="text-sm text-gray-700">Inspected vehicles only</span>
                </label>
              </div>

              {/* Preview */}
              {newSearch.name && (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Preview matches</p>
                  <p className="text-sm font-medium text-gray-900">
                    {countMatches(newSearch)} vehicles currently match this search
                  </p>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowCreateModal(false)} className="flex-1 border border-gray-200 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Cancel
                </button>
                <button
                  onClick={createSearch}
                  disabled={!newSearch.name}
                  className="flex-1 bg-blue-600 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" /> Save Search
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
