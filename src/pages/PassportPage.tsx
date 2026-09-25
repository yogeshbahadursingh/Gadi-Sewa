import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Shield, CheckCircle2, AlertTriangle, XCircle, Clock, MapPin, FileText, Gauge, Battery, QrCode, ArrowLeft, History, TrendingUp, Car, User } from 'lucide-react';
import { vehiclePassports, getVehicleById, inspections, formatPrice, formatMileage } from '../store/data';
import { Badge } from '../components/Layout';

export default function PassportPage() {
  const { passportId } = useParams<{ passportId: string }>();
  const passport = vehiclePassports.find(p => p.passportId === passportId);
  const vehicle = passport ? getVehicleById(passport.vehicleId) : null;
  const inspection = passport ? inspections.find(i => passport.inspectionHistory.includes(i.id)) : null;

  if (!passport || !vehicle) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-medium text-gray-900">Vehicle Passport not found</h2>
        <Link to="/" className="mt-4 inline-block text-blue-600">Go to homepage</Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link to="/" className="p-2 hover:bg-gray-100 rounded-lg"><ArrowLeft className="w-5 h-5 text-gray-600" /></Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Vehicle Passport</h1>
          <p className="text-sm text-gray-500 font-mono">{passport.passportId}</p>
        </div>
      </div>

      {/* Passport Card */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-2xl p-6 md:p-8 text-white mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="relative">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-6 h-6" />
                <span className="text-sm font-medium text-blue-200">GadiBazar Vehicle Passport</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">{vehicle.year} {vehicle.make} {vehicle.model}</h2>
              <p className="text-blue-200 mt-1">{vehicle.variant}</p>
            </div>
            <div className="text-right">
              <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
                <QrCode className="w-8 h-8" />
              </div>
              <p className="text-xs text-blue-200 mt-1">Scan to verify</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div>
              <p className="text-xs text-blue-200">Registration</p>
              <p className="font-medium">{vehicle.registrationNumber || 'N/A'}</p>
            </div>
            <div>
              <p className="text-xs text-blue-200">Odometer</p>
              <p className="font-medium">{formatMileage(vehicle.mileage)}</p>
            </div>
            <div>
              <p className="text-xs text-blue-200">Fuel</p>
              <p className="font-medium">{vehicle.fuelType}</p>
            </div>
            <div>
              <p className="text-xs text-blue-200">Status</p>
              <span className="inline-flex items-center gap-1 bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full text-xs font-medium">
                <CheckCircle2 className="w-3 h-3" /> {passport.status}
              </span>
            </div>
          </div>
          {vehicle.isEV && vehicle.batterySOH && (
            <div className="mt-4 p-3 bg-white/10 rounded-xl">
              <div className="flex items-center gap-2">
                <Battery className="w-4 h-4" />
                <span className="text-sm font-medium">Battery State of Health</span>
                <span className="ml-auto text-lg font-bold">{vehicle.batterySOH}%</span>
              </div>
              <div className="mt-2 bg-white/10 rounded-full h-2">
                <div className="bg-green-400 h-2 rounded-full" style={{ width: `${vehicle.batterySOH}%` }} />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Ownership History */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <User className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-gray-900">Ownership History</h3>
          </div>
          <div className="space-y-3">
            {passport.ownershipHistory.map((record, i) => (
              <div key={record.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${record.isCurrent ? 'bg-blue-100' : 'bg-gray-200'}`}>
                  <User className={`w-4 h-4 ${record.isCurrent ? 'text-blue-600' : 'text-gray-500'}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-gray-900">{record.ownerName}</p>
                    {record.isCurrent && <Badge variant="info">Current</Badge>}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {new Date(record.startDate).toLocaleDateString()} — {record.endDate ? new Date(record.endDate).toLocaleDateString() : 'Present'}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">Source: {record.verificationSource.replace(/_/g, ' ')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Odometer History */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Gauge className="w-5 h-5 text-green-600" />
            <h3 className="font-semibold text-gray-900">Odometer History</h3>
          </div>
          <div className="space-y-3">
            {passport.odometerHistory.map((record, i) => (
              <div key={record.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-gray-900">{formatMileage(record.mileage)}</p>
                    <Badge variant={record.confidence === 'HIGH' ? 'success' : record.confidence === 'MEDIUM' ? 'warning' : 'danger'}>{record.confidence}</Badge>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{new Date(record.date).toLocaleDateString()}</p>
                  <p className="text-xs text-gray-400">Source: {record.source.replace(/_/g, ' ')} {record.verifier ? `• by ${record.verifier}` : ''}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 p-2 bg-green-50 rounded-lg">
            <p className="text-xs text-green-700 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> No odometer inconsistency detected</p>
          </div>
        </div>

        {/* Document Verifications */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-purple-600" />
            <h3 className="font-semibold text-gray-900">Document Verification</h3>
          </div>
          <div className="space-y-3">
            {passport.documentVerifications.map(doc => (
              <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">{doc.documentType}</p>
                  <p className="text-xs text-gray-500">Verified: {doc.verifiedDate ? new Date(doc.verifiedDate).toLocaleDateString() : 'N/A'}</p>
                  {doc.expiryDate && <p className="text-xs text-gray-400">Expires: {new Date(doc.expiryDate).toLocaleDateString()}</p>}
                </div>
                <Badge variant={doc.status === 'VERIFIED' ? 'success' : doc.status === 'PENDING' ? 'warning' : 'danger'}>{doc.status}</Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Inspection Summary */}
        {inspection && (
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-gray-900">Latest Inspection</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-700">Date</span>
                <span className="text-sm font-medium">{inspection.completedDate ? new Date(inspection.completedDate).toLocaleDateString() : 'N/A'}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-700">Inspector</span>
                <span className="text-sm font-medium">Anil Karki</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-700">Overall Result</span>
                <Badge variant={inspection.overallResult === 'PASS' ? 'success' : 'warning'}>{inspection.overallResult}</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-700">Supervisor Review</span>
                <Badge variant={inspection.supervisorReviewed ? 'success' : 'warning'}>{inspection.supervisorReviewed ? 'Reviewed' : 'Pending'}</Badge>
              </div>
            </div>
            {inspection.recommendation && (
              <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                <p className="text-xs font-medium text-blue-700 mb-1">Recommendation</p>
                <p className="text-xs text-blue-600">{inspection.recommendation}</p>
              </div>
            )}
          </div>
        )}

        {/* Risk Flags */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <h3 className="font-semibold text-gray-900">Risk Assessment</h3>
          </div>
          {passport.riskFlags.length === 0 ? (
            <div className="p-4 bg-green-50 rounded-lg text-center">
              <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <p className="text-sm font-medium text-green-700">No risk flags detected</p>
              <p className="text-xs text-green-600 mt-1">This vehicle has a clean risk profile</p>
            </div>
          ) : (
            <div className="space-y-2">
              {passport.riskFlags.map(flag => (
                <div key={flag.id} className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  <div>
                    <p className="text-sm font-medium text-red-700">{flag.description}</p>
                    <p className="text-xs text-red-500">{flag.type} • {flag.severity}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Verification Source Legend */}
      <div className="mt-8 bg-gray-50 border border-gray-200 rounded-xl p-5">
        <h3 className="font-semibold text-gray-900 mb-3">Verification Source Legend</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { source: 'SELLER_DECLARED', desc: 'Information provided by seller', color: 'bg-amber-100 text-amber-700' },
            { source: 'DOCUMENT_CHECKED', desc: 'Verified against documents', color: 'bg-blue-100 text-blue-700' },
            { source: 'PHYSICALLY_VERIFIED', desc: 'Confirmed during physical inspection', color: 'bg-green-100 text-green-700' },
            { source: 'GOVERNMENT_VERIFIED', desc: 'Verified via government records', color: 'bg-purple-100 text-purple-700' },
          ].map(item => (
            <div key={item.source} className="p-3 bg-white rounded-lg border border-gray-100">
              <span className={`text-xs font-medium px-2 py-0.5 rounded ${item.color}`}>{item.source.replace(/_/g, ' ')}</span>
              <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
        <p className="text-xs text-gray-500 leading-relaxed">
          <strong>Disclaimer:</strong> This Vehicle Passport represents information available at the time of issuance and last inspection. 
          It is based on physical inspection, document verification, and available records. It does not constitute a guarantee of vehicle condition. 
          Past inspection results reflect conditions at the time of inspection and may not represent current condition. 
          Always conduct your own due diligence before purchasing any vehicle.
        </p>
      </div>
    </div>
  );
}
