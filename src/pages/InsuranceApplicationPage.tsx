import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, CheckCircle2, FileText, User, Car, Calendar, AlertCircle } from 'lucide-react';
import { Badge } from '../components/Layout';

export default function InsuranceApplicationPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    // Personal info
    fullName: '',
    email: '',
    phone: '',
    citizenshipNumber: '',
    
    // Vehicle info
    registrationNumber: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: '',
    engineCC: '',
    vehicleValue: '',
    
    // Insurance details
    insuranceType: 'comprehensive',
    previousInsurance: '',
    previousInsuranceExpiry: '',
    claimHistory: 'none',
    
    // Documents
    hasBluebook: false,
    hasPreviousInsurance: false,
    hasCitizenship: false,
    agreeTerms: false,
  });

  const insurancePartners = [
    'Shikhar Insurance',
    'Nepal Insurance',
    'Himalayan General Insurance',
    'Prime Insurance',
    'Sagarmatha Insurance',
    'Nepal Reinsurance',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Quote Request Submitted!</h1>
        <p className="text-gray-500 mt-2">Your insurance quote request has been sent to our partner companies.</p>

        <div className="mt-6 bg-white border border-gray-200 rounded-2xl p-6 text-left">
          <h3 className="font-semibold text-gray-900 mb-4">Request Summary</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">Applicant</span>
              <span className="text-sm font-medium">{formData.fullName || 'N/A'}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">Vehicle</span>
              <span className="text-sm font-medium">{formData.vehicleMake} {formData.vehicleModel}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">Registration</span>
              <span className="text-sm font-medium font-mono">{formData.registrationNumber || 'N/A'}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">Insurance Type</span>
              <span className="text-sm font-medium">{formData.insuranceType === 'comprehensive' ? 'Comprehensive' : 'Third Party'}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-xl text-left">
          <h4 className="text-sm font-medium text-blue-900 mb-2">What happens next?</h4>
          <ul className="space-y-1 text-sm text-blue-700">
            <li>• Insurance partners will review your request within 24 hours</li>
            <li>• You'll receive quotes via email and SMS</li>
            <li>• Compare quotes and select the best option</li>
            <li>• Complete the policy issuance process</li>
          </ul>
        </div>

        <div className="mt-6 p-4 bg-amber-50 rounded-xl text-left">
          <p className="text-xs text-amber-700">
            <strong>Reference ID:</strong> INS-{Date.now().toString().slice(-8)}<br />
            <strong>Note:</strong> Quotes are estimates based on the information provided. Final premium may vary based on detailed vehicle inspection and underwriting.
          </p>
        </div>

        <Link to="/" className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <Link to="/insurance" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Insurance
      </Link>

      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Get Insurance Quotes</h1>
        <p className="text-gray-500 mt-2">Compare quotes from multiple insurance providers</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {['Personal Info', 'Vehicle Details', 'Documents & Submit'].map((label, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step > i + 1 ? 'bg-green-500 text-white' : step === i + 1 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              {step > i + 1 ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
            </div>
            <span className={`text-sm font-medium hidden sm:block ${step === i + 1 ? 'text-green-600' : 'text-gray-500'}`}>{label}</span>
            {i < 2 && <div className={`w-8 h-0.5 ${step > i + 1 ? 'bg-green-500' : 'bg-gray-200'}`} />}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
        {step === 1 && (
          <div className="space-y-5">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <User className="w-5 h-5 text-green-600" /> Personal Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Full Name *</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="As per citizenship"
                  className="w-full py-2.5 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-green-500"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@example.com"
                  className="w-full py-2.5 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-green-500"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Phone *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="98XXXXXXXX"
                  className="w-full py-2.5 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-green-500"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Citizenship Number *</label>
                <input
                  type="text"
                  value={formData.citizenshipNumber}
                  onChange={e => setFormData({ ...formData, citizenshipNumber: e.target.value })}
                  placeholder="Citizenship number"
                  className="w-full py-2.5 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-green-500"
                  required
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <Car className="w-5 h-5 text-green-600" /> Vehicle & Insurance Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Registration Number *</label>
                <input
                  type="text"
                  value={formData.registrationNumber}
                  onChange={e => setFormData({ ...formData, registrationNumber: e.target.value })}
                  placeholder="e.g., BA 23 PA 4567"
                  className="w-full py-2.5 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-green-500"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Vehicle Make *</label>
                <input
                  type="text"
                  value={formData.vehicleMake}
                  onChange={e => setFormData({ ...formData, vehicleMake: e.target.value })}
                  placeholder="e.g., Toyota"
                  className="w-full py-2.5 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-green-500"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Vehicle Model *</label>
                <input
                  type="text"
                  value={formData.vehicleModel}
                  onChange={e => setFormData({ ...formData, vehicleModel: e.target.value })}
                  placeholder="e.g., Fortuner"
                  className="w-full py-2.5 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-green-500"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Year *</label>
                <input
                  type="number"
                  value={formData.vehicleYear}
                  onChange={e => setFormData({ ...formData, vehicleYear: e.target.value })}
                  placeholder="e.g., 2022"
                  className="w-full py-2.5 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-green-500"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Engine CC</label>
                <input
                  type="number"
                  value={formData.engineCC}
                  onChange={e => setFormData({ ...formData, engineCC: e.target.value })}
                  placeholder="e.g., 2000"
                  className="w-full py-2.5 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-green-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Vehicle Value (Rs.) *</label>
                <input
                  type="number"
                  value={formData.vehicleValue}
                  onChange={e => setFormData({ ...formData, vehicleValue: e.target.value })}
                  placeholder="Estimated market value"
                  className="w-full py-2.5 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-green-500"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Insurance Type *</label>
                <select
                  value={formData.insuranceType}
                  onChange={e => setFormData({ ...formData, insuranceType: e.target.value })}
                  className="w-full py-2.5 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-green-500"
                >
                  <option value="comprehensive">Comprehensive (Full Coverage)</option>
                  <option value="third_party">Third Party (Minimum Required)</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Previous Insurance Company</label>
                <select
                  value={formData.previousInsurance}
                  onChange={e => setFormData({ ...formData, previousInsurance: e.target.value })}
                  className="w-full py-2.5 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-green-500"
                >
                  <option value="">Select (if applicable)</option>
                  {insurancePartners.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Previous Insurance Expiry</label>
                <input
                  type="date"
                  value={formData.previousInsuranceExpiry}
                  onChange={e => setFormData({ ...formData, previousInsuranceExpiry: e.target.value })}
                  className="w-full py-2.5 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-green-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Claim History</label>
                <select
                  value={formData.claimHistory}
                  onChange={e => setFormData({ ...formData, claimHistory: e.target.value })}
                  className="w-full py-2.5 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-green-500"
                >
                  <option value="none">No claims in last 3 years</option>
                  <option value="1">1 claim in last 3 years</option>
                  <option value="2+">2+ claims in last 3 years</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-green-600" /> Documents & Review
            </h2>

            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <p className="text-sm text-amber-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                Please keep these documents ready for verification
              </p>
            </div>

            <div className="space-y-3">
              {[
                { key: 'hasBluebook', label: 'Vehicle Bluebook (Registration Certificate)' },
                { key: 'hasPreviousInsurance', label: 'Previous Insurance Policy (if renewing)' },
                { key: 'hasCitizenship', label: 'Citizenship Certificate Copy' },
              ].map(doc => (
                <label key={doc.key} className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={(formData as any)[doc.key]}
                    onChange={e => setFormData({ ...formData, [doc.key]: e.target.checked })}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm text-gray-700">{doc.label}</span>
                </label>
              ))}
            </div>

            {/* Summary */}
            <div className="p-4 bg-gray-50 rounded-xl">
              <h3 className="font-medium text-gray-900 mb-3">Request Summary</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-gray-500">Applicant</p>
                  <p className="font-medium">{formData.fullName || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-gray-500">Vehicle</p>
                  <p className="font-medium">{formData.vehicleMake} {formData.vehicleModel}</p>
                </div>
                <div>
                  <p className="text-gray-500">Registration</p>
                  <p className="font-medium font-mono">{formData.registrationNumber || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-gray-500">Insurance Type</p>
                  <p className="font-medium">{formData.insuranceType === 'comprehensive' ? 'Comprehensive' : 'Third Party'}</p>
                </div>
              </div>
            </div>

            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.agreeTerms}
                onChange={e => setFormData({ ...formData, agreeTerms: e.target.checked })}
                className="mt-0.5 rounded border-gray-300"
                required
              />
              <span className="text-xs text-gray-600">
                I consent to sharing my information with partner insurance companies for quote generation. I understand that quotes are estimates and final premium may vary.
              </span>
            </label>
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-3 mt-6 pt-6 border-t border-gray-100">
          {step > 1 && (
            <button type="button" onClick={() => setStep(step - 1)} className="px-6 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50">
              Back
            </button>
          )}
          <button type="submit" className="flex-1 bg-green-600 text-white py-3 rounded-xl font-medium hover:bg-green-700 flex items-center justify-center gap-2">
            {step < 3 ? 'Continue' : 'Get Quotes'}
          </button>
        </div>
      </form>
    </div>
  );
}
