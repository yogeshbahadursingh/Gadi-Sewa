import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Shield, CheckCircle2, XCircle, Eye, Clock, Users, Car, FileWarning, TrendingUp, Search, Filter } from 'lucide-react';
import { DashboardLayout, StatCard, Badge } from '../components/Layout';

const riskEvents = [
  { id: 'r1', type: 'MILEAGE_INCONSISTENCY', severity: 'HIGH', vehicle: 'NP-VP-00024567', description: 'Odometer reading decreased from 35,000 km to 28,000 km between records', status: 'OPEN', createdAt: '2026-01-14', affectedListing: 'l7' },
  { id: 'r2', type: 'DUPLICATE_PHOTOS', severity: 'MEDIUM', vehicle: 'Multiple', description: 'Same vehicle photos detected across 3 different listings from different sellers', status: 'REVIEWED', createdAt: '2026-01-12', affectedListing: null },
  { id: 'r3', type: 'SUSPICIOUS_PRICE', severity: 'LOW', vehicle: 'NP-VP-00026789', description: 'Price 40% below market average for similar vehicle', status: 'OPEN', createdAt: '2026-01-10', affectedListing: 'l8' },
  { id: 'r4', type: 'CONDITION_CONFLICT', severity: 'HIGH', vehicle: 'NP-VP-00018427', description: 'Previous inspection noted structural repair, current seller claims "never damaged"', status: 'REVIEWED', createdAt: '2026-01-08', affectedListing: 'l1' },
  { id: 'r5', type: 'MULTIPLE_ACCOUNTS', severity: 'MEDIUM', vehicle: 'N/A', description: 'Same phone number used across 3 different seller accounts', status: 'DISMISSED', createdAt: '2026-01-05', affectedListing: null },
  { id: 'r6', type: 'DOCUMENT_MISMATCH', severity: 'CRITICAL', vehicle: 'NP-VP-00029012', description: 'Registration number on uploaded document does not match declared registration', status: 'OPEN', createdAt: '2026-01-15', affectedListing: 'l11' },
];

export default function AdminRiskPage() {
  const [filter, setFilter] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  const filteredEvents = filter === 'all' ? riskEvents : riskEvents.filter(e => e.status === filter.toUpperCase());
  const openCount = riskEvents.filter(e => e.status === 'OPEN').length;
  const reviewedCount = riskEvents.filter(e => e.status === 'REVIEWED').length;
  const criticalCount = riskEvents.filter(e => e.severity === 'CRITICAL' || e.severity === 'HIGH').length;

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Risk & Fraud Management</h1>
        <p className="text-sm text-gray-500">Monitor and review risk events across the platform</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Open Alerts" value={openCount} icon={AlertTriangle} color="red" />
        <StatCard title="Under Review" value={reviewedCount} icon={Eye} color="orange" />
        <StatCard title="High/Critical" value={criticalCount} icon={Shield} color="red" />
        <StatCard title="Total Events" value={riskEvents.length} icon={FileWarning} color="blue" />
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select value={filter} onChange={e => setFilter(e.target.value)} className="text-sm outline-none bg-transparent">
            <option value="all">All Events</option>
            <option value="open">Open</option>
            <option value="reviewed">Under Review</option>
            <option value="resolved">Resolved</option>
            <option value="dismissed">Dismissed</option>
          </select>
        </div>
      </div>

      {/* Risk Events */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="divide-y divide-gray-100">
          {filteredEvents.map(event => (
            <div key={event.id} className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${selectedEvent === event.id ? 'bg-blue-50' : ''}`} onClick={() => setSelectedEvent(selectedEvent === event.id ? null : event.id)}>
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  event.severity === 'CRITICAL' ? 'bg-red-100' :
                  event.severity === 'HIGH' ? 'bg-orange-100' :
                  event.severity === 'MEDIUM' ? 'bg-amber-100' : 'bg-gray-100'
                }`}>
                  <AlertTriangle className={`w-5 h-5 ${
                    event.severity === 'CRITICAL' ? 'text-red-600' :
                    event.severity === 'HIGH' ? 'text-orange-600' :
                    event.severity === 'MEDIUM' ? 'text-amber-600' : 'text-gray-600'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-medium text-gray-900">{event.type.replace(/_/g, ' ')}</span>
                    <Badge variant={
                      event.severity === 'CRITICAL' ? 'danger' :
                      event.severity === 'HIGH' ? 'danger' :
                      event.severity === 'MEDIUM' ? 'warning' : 'default'
                    }>{event.severity}</Badge>
                    <Badge variant={
                      event.status === 'OPEN' ? 'danger' :
                      event.status === 'REVIEWED' ? 'warning' :
                      event.status === 'RESOLVED' ? 'success' : 'default'
                    }>{event.status}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                    <span>Vehicle: {event.vehicle}</span>
                    <span>Date: {event.createdAt}</span>
                    {event.affectedListing && <Link to={`/listing/${event.affectedListing}`} className="text-blue-600 hover:text-blue-700">View listing →</Link>}
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  {event.status === 'OPEN' && (
                    <>
                      <button className="p-1.5 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 text-xs" title="Mark as reviewed">
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1.5 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 text-xs" title="Dismiss">
                        <XCircle className="w-3.5 h-3.5" />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Expanded details */}
              {selectedEvent === event.id && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg animate-fade-in">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Investigation Notes</h4>
                  <textarea placeholder="Add investigation notes..." className="w-full py-2 px-3 border border-gray-200 rounded-lg text-sm outline-none resize-none h-20" />
                  <div className="flex gap-2 mt-3">
                    <button className="px-3 py-1.5 bg-green-600 text-white text-xs font-medium rounded-lg hover:bg-green-700">Resolve</button>
                    <button className="px-3 py-1.5 bg-amber-600 text-white text-xs font-medium rounded-lg hover:bg-amber-700">Escalate</button>
                    <button className="px-3 py-1.5 bg-gray-200 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-300">Dismiss</button>
                    <button className="px-3 py-1.5 bg-red-100 text-red-600 text-xs font-medium rounded-lg hover:bg-red-200">Suspend Listing</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Risk Detection Methods */}
      <div className="mt-6 bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-900 mb-4">Active Detection Methods</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: 'Mileage Analysis', desc: 'Detects impossible odometer reductions', status: 'Active', icon: TrendingUp },
            { name: 'Duplicate Detection', desc: 'Identifies reused photos and listings', status: 'Active', icon: Car },
            { name: 'Price Anomaly', desc: 'Flags prices significantly below market', status: 'Active', icon: Shield },
            { name: 'Document Verification', desc: 'Cross-checks uploaded documents', status: 'Active', icon: FileWarning },
            { name: 'Account Pattern', desc: 'Detects multiple account abuse', status: 'Active', icon: Users },
            { name: 'Condition History', desc: 'Compares current claims vs past inspections', status: 'Active', icon: AlertTriangle },
          ].map(method => (
            <div key={method.name} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <method.icon className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">{method.name}</p>
                <p className="text-xs text-gray-500">{method.desc}</p>
              </div>
              <Badge variant="success" >{method.status}</Badge>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
