import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Shield, CheckCircle2, AlertTriangle, QrCode, Search, FileText, Gauge, User, Calendar, MapPin } from 'lucide-react';
import { vehiclePassports, getVehicleById, formatMileage } from '../store/data';
import { Badge } from '../components/Layout';

export default function VerifyPassportPage() {
  const { passportId } = useParams<{ passportId: string }>();
  const [searchInput, setSearchInput] = useState(passportId || '');
  const [searched, setSearched] = useState(!!passportId);

  const passport = vehiclePassports.find(p => p.passportId === searchInput);
  const vehicle = passport ? getVehicleById(passport.vehicleId) : null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Shield className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Verify Vehicle Passport</h1>
        <p className="text-gray-500 mt-2">Enter the passport ID or scan the QR code to verify authenticity</p>
      </div>

      {/* Search */}
      {!passport && (
        <form onSubmit={handleSearch} className="max-w-md mx-auto mb-8">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <QrCode className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchInput}
                onChange={e => { setSearchInput(e.target.value); setSearched(false); }}
                placeholder="Enter Passport ID (e.g., NP-VP-00018427)"
                className="w-full py-3 pl-10 pr-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500"
              />
            </div>
            <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700">
              Verify
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Try: NP-VP-00018427 or NP-VP-00020156
          </p>
        </form>
      )}

      {/* Not Found */}
      {searched && !passport && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Passport Not Found</h2>
          <p className="text-gray-500 mt-2">No vehicle passport exists with ID "{searchInput}"</p>
          <p className="text-sm text-gray-400 mt-1">This passport may be fake or the ID may be incorrect.</p>
          <button onClick={() => { setSearchInput(''); setSearched(false); }} className="mt-4 text-blue-600 hover:text-blue-700 font-medium text-sm">
            Try another ID
          </button>
        </div>
      )}

      {/* Verified Passport */}
      {passport && vehicle && (
        <div className="animate-fade-in">
          {/* Success Banner */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
            <div>
              <p className="font-medium text-green-800">✓ Passport Verified</p>
              <p className="text-sm text-green-600">This is a genuine GadiBazar Vehicle Passport</p>
            </div>
          </div>

          {/* Passport Card */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white mb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-blue-200 mb-1">Vehicle Passport</p>
                <h2 className="text-2xl font-bold">{vehicle.year} {vehicle.make} {vehicle.model}</h2>
                <p className="text-blue-200">{vehicle.variant}</p>
              </div>
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
                <QrCode className="w-6 h-6" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/20">
              <div>
                <p className="text-xs text-blue-200">Passport ID</p>
                <p className="font-mono font-medium">{passport.passportId}</p>
              </div>
              <div>
                <p className="text-xs text-blue-200">Status</p>
                <span className="inline-flex items-center gap-1 bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full text-xs font-medium">
                  <CheckCircle2 className="w-3 h-3" /> {passport.status}
                </span>
              </div>
              <div>
                <p className="text-xs text-blue-200">Issued</p>
                <p className="font-medium">{new Date(passport.issuedDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-xs text-blue-200">Last Inspection</p>
                <p className="font-medium">{passport.lastInspectionDate ? new Date(passport.lastInspectionDate).toLocaleDateString() : 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" /> Vehicle Summary
            </h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500">Registration</p>
                <p className="font-medium text-gray-900">{vehicle.registrationNumber || 'N/A'}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500">Odometer</p>
                <p className="font-medium text-gray-900">{formatMileage(vehicle.mileage)}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500">Fuel Type</p>
                <p className="font-medium text-gray-900">{vehicle.fuelType}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500">Transmission</p>
                <p className="font-medium text-gray-900">{vehicle.transmission}</p>
              </div>
            </div>

            {vehicle.isEV && vehicle.batterySOH && (
              <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                <p className="text-xs text-emerald-600 mb-1">Battery State of Health</p>
                <p className="text-2xl font-bold text-emerald-700">{vehicle.batterySOH}%</p>
                <div className="mt-1 bg-emerald-200 rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${vehicle.batterySOH}%` }} />
                </div>
              </div>
            )}
          </div>

          {/* History Summary */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 mt-4">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Gauge className="w-4 h-4 text-blue-600" /> History Summary
            </h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-700">{passport.ownershipHistory.length}</p>
                <p className="text-xs text-blue-600">Owners</p>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-700">{passport.odometerHistory.length}</p>
                <p className="text-xs text-green-600">Odometer Records</p>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <p className="text-2xl font-bold text-purple-700">{passport.inspectionHistory.length}</p>
                <p className="text-xs text-purple-600">Inspections</p>
              </div>
            </div>
          </div>

          {/* Risk Status */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 mt-4">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-600" /> Risk Status
            </h3>
            {passport.riskFlags.length === 0 ? (
              <div className="p-3 bg-green-50 rounded-lg flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-green-700">No risk flags detected</span>
              </div>
            ) : (
              <div className="space-y-2">
                {passport.riskFlags.map(flag => (
                  <div key={flag.id} className="p-3 bg-red-50 rounded-lg flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                    <span className="text-sm text-red-700">{flag.description}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-6">
            <Link to={`/passport/${passport.passportId}`} className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-medium text-center hover:bg-blue-700 text-sm">
              View Full Passport
            </Link>
            <button onClick={() => { setSearchInput(''); setSearched(false); }} className="px-6 py-3 border border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50 text-sm">
              Verify Another
            </button>
          </div>
        </div>
      )}

      {/* Info */}
      <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-200">
        <h4 className="text-sm font-medium text-gray-900 mb-2">What is a Vehicle Passport?</h4>
        <p className="text-xs text-gray-600 leading-relaxed">
          A GadiBazar Vehicle Passport is a permanent digital record that tracks a vehicle's complete history including 
          ownership, odometer readings, inspections, and document verifications. Each passport has a unique ID and QR code 
          that can be used to verify authenticity. The passport follows the vehicle, not the seller, and preserves history 
          across ownership changes.
        </p>
      </div>
    </div>
  );
}
