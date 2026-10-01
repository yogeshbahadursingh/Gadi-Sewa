import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, Send, CheckCircle2, Shield, Info } from 'lucide-react';
import { getListingById, getVehicleById } from '../store/data';

export default function ReportListingPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const listing = getListingById(id || '');
  const vehicle = listing ? getVehicleById(listing.vehicleId) : null;

  const [reason, setReason] = useState('');
  const [details, setDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const reasons = [
    { value: 'suspicious_price', label: 'Suspicious pricing (too low/high)' },
    { value: 'fake_listing', label: 'Suspected fake or scam listing' },
    { value: 'stolen_vehicle', label: 'Vehicle may be stolen' },
    { value: 'wrong_info', label: 'Incorrect vehicle information' },
    { value: 'duplicate', label: 'Duplicate listing' },
    { value: 'stolen_photos', label: 'Photos appear stolen from elsewhere' },
    { value: 'mileage_fraud', label: 'Suspected odometer tampering' },
    { value: 'inappropriate', label: 'Inappropriate content' },
    { value: 'other', label: 'Other' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Report Submitted</h1>
        <p className="text-gray-500 mt-2">Thank you for helping keep GadiBazar safe. Our team will review this report within 24 hours.</p>
        <div className="mt-6 p-4 bg-blue-50 rounded-xl text-left">
          <p className="text-sm text-blue-700">
            <strong>What happens next?</strong><br />
            Our trust & safety team will investigate the listing. If the report is valid, appropriate action will be taken. 
            You may be contacted for additional information.
          </p>
        </div>
        <button onClick={() => navigate(-1)} className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <Link to={id ? `/listing/${id}` : '/'} className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6">
        <ArrowLeft className="w-4 h-4" /> Back
      </Link>

      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Report Listing</h1>
          <p className="text-sm text-gray-500">Help us keep the platform safe and trustworthy</p>
        </div>
      </div>

      {/* Listing info */}
      {listing && vehicle && (
        <div className="bg-gray-50 rounded-xl p-4 mb-6 flex items-center gap-3">
          <img src={listing.images[0]} alt="" className="w-16 h-12 rounded-lg object-cover" />
          <div>
            <p className="text-sm font-medium text-gray-900">{vehicle.make} {vehicle.model}</p>
            <p className="text-xs text-gray-500">{listing.location}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-3">Why are you reporting this listing?</label>
          <div className="space-y-2">
            {reasons.map(r => (
              <label key={r.value} className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors">
                <input
                  type="radio"
                  name="reason"
                  value={r.value}
                  checked={reason === r.value}
                  onChange={e => setReason(e.target.value)}
                  className="text-blue-600"
                />
                <span className="text-sm text-gray-700">{r.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1.5">Additional Details (optional)</label>
          <textarea
            value={details}
            onChange={e => setDetails(e.target.value)}
            placeholder="Provide any additional information that may help our team..."
            className="w-full py-3 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500 resize-none h-24"
          />
        </div>

        <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-xl">
          <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-blue-700">
            Your report is confidential. The seller will not be notified about who reported the listing. 
            False reports may result in account restrictions.
          </p>
        </div>

        <button
          type="submit"
          disabled={!reason}
          className="w-full bg-amber-600 text-white py-3 rounded-xl font-medium hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Send className="w-4 h-4" /> Submit Report
        </button>
      </form>
    </div>
  );
}
