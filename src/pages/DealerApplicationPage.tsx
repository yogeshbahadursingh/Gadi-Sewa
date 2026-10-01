import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, CheckCircle2, Upload, Users, MapPin, Phone, Mail, Globe, FileText, Shield, AlertCircle } from 'lucide-react';
import { Badge } from '../components/Layout';

export default function DealerApplicationPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    registrationNumber: '',
    companyType: 'private',
    establishedYear: '',
    address: '',
    district: '',
    phone: '',
    email: '',
    website: '',
    contactPerson: '',
    contactPosition: '',
    contactPhone: '',
    contactEmail: '',
    specializations: [] as string[],
    inventorySize: '',
    description: '',
    panNumber: '',
    bankName: '',
    bankAccount: '',
    agreeTerms: false,
  });

  const vehicleTypes = ['Cars', 'Motorbikes', 'Scooters', 'Electric Vehicles', 'Commercial Vehicles', 'Trucks'];
  const districts = ['Kathmandu', 'Lalitpur', 'Bhaktapur', 'Pokhara', 'Chitwan', 'Birgunj', 'Biratnagar', 'Butwal', 'Nepalgunj', 'Dharan'];

  const toggleSpecialization = (type: string) => {
    setFormData(prev => ({
      ...prev,
      specializations: prev.specializations.includes(type)
        ? prev.specializations.filter(t => t !== type)
        : [...prev.specializations, type]
    }));
  };

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
        <h1 className="text-2xl font-bold text-gray-900">Application Submitted!</h1>
        <p className="text-gray-500 mt-2">Thank you for applying to become a GadiBazar dealer partner.</p>

        <div className="mt-6 bg-white border border-gray-200 rounded-2xl p-6 text-left">
          <h3 className="font-semibold text-gray-900 mb-4">What happens next?</h3>
          <div className="space-y-3">
            {[
              { step: '1', title: 'Application Review', desc: 'Our team will review your application within 3-5 business days' },
              { step: '2', title: 'Document Verification', desc: 'We will verify your business registration and documents' },
              { step: '3', title: 'Approval & Onboarding', desc: 'Once approved, you will receive access to the dealer dashboard' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-blue-600">{item.step}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{item.title}</p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-xl text-left">
          <p className="text-sm text-blue-700">
            <strong>Reference ID:</strong> GAD-DEALER-{Date.now().toString().slice(-8)}<br />
            <strong>Status:</strong> Under Review<br />
            <strong>Expected Response:</strong> Within 5 business days
          </p>
        </div>

        <Link to="/" className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Building2 className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Become a Dealer Partner</h1>
        <p className="text-gray-500 mt-2">Join Nepal's trusted vehicle marketplace and reach thousands of buyers</p>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[
          { icon: Users, title: 'Reach More Buyers', desc: 'Access thousands of verified buyers daily' },
          { icon: Shield, title: 'Verified Badge', desc: 'Build trust with verified dealer status' },
          { icon: FileText, title: 'Dealer Dashboard', desc: 'Manage inventory, leads, and analytics' },
        ].map((benefit, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 text-center">
            <benefit.icon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900">{benefit.title}</h3>
            <p className="text-xs text-gray-500 mt-1">{benefit.desc}</p>
          </div>
        ))}
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {['Company Info', 'Contact Details', 'Documents & Submit'].map((label, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step > i + 1 ? 'bg-green-500 text-white' : step === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              {step > i + 1 ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
            </div>
            <span className={`text-sm font-medium hidden sm:block ${step === i + 1 ? 'text-blue-600' : 'text-gray-500'}`}>{label}</span>
            {i < 2 && <div className={`w-8 h-0.5 ${step > i + 1 ? 'bg-green-500' : 'bg-gray-200'}`} />}
          </div>
        ))}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
        {step === 1 && (
          <div className="space-y-5">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-blue-600" /> Company Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Company Name *</label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                  placeholder="e.g., Sujal Motors Pvt. Ltd."
                  className="w-full py-2.5 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Company Registration No. *</label>
                <input
                  type="text"
                  value={formData.registrationNumber}
                  onChange={e => setFormData({ ...formData, registrationNumber: e.target.value })}
                  placeholder="OCR registration number"
                  className="w-full py-2.5 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Company Type</label>
                <select
                  value={formData.companyType}
                  onChange={e => setFormData({ ...formData, companyType: e.target.value })}
                  className="w-full py-2.5 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500"
                >
                  <option value="private">Private Limited</option>
                  <option value="public">Public Limited</option>
                  <option value="partnership">Partnership</option>
                  <option value="proprietor">Proprietorship</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Established Year</label>
                <input
                  type="number"
                  value={formData.establishedYear}
                  onChange={e => setFormData({ ...formData, establishedYear: e.target.value })}
                  placeholder="e.g., 2010"
                  min={1900}
                  max={new Date().getFullYear()}
                  className="w-full py-2.5 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Business Address *</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={e => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Full address"
                  className="w-full py-2.5 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">District *</label>
                <select
                  value={formData.district}
                  onChange={e => setFormData({ ...formData, district: e.target.value })}
                  className="w-full py-2.5 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500"
                  required
                >
                  <option value="">Select district</option>
                  {districts.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Website (optional)</label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={e => setFormData({ ...formData, website: e.target.value })}
                  placeholder="https://www.example.com"
                  className="w-full py-2.5 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">Vehicle Types You Deal In *</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {vehicleTypes.map(type => (
                  <label key={type} className={`flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    formData.specializations.includes(type) ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <input
                      type="checkbox"
                      checked={formData.specializations.includes(type)}
                      onChange={() => toggleSpecialization(type)}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm text-gray-700">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1.5">Current Inventory Size</label>
              <select
                value={formData.inventorySize}
                onChange={e => setFormData({ ...formData, inventorySize: e.target.value })}
                className="w-full py-2.5 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500"
              >
                <option value="">Select range</option>
                <option value="1-10">1-10 vehicles</option>
                <option value="11-50">11-50 vehicles</option>
                <option value="51-100">51-100 vehicles</option>
                <option value="100+">100+ vehicles</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1.5">Company Description</label>
              <textarea
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                placeholder="Tell us about your business, experience, and what makes you stand out..."
                className="w-full py-2.5 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500 resize-none h-24"
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" /> Contact Details
            </h2>

            <div className="p-4 bg-blue-50 rounded-xl">
              <p className="text-sm text-blue-700">
                <strong>Primary Contact:</strong> This will be the main point of contact for your dealer account.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Contact Person Name *</label>
                <input
                  type="text"
                  value={formData.contactPerson}
                  onChange={e => setFormData({ ...formData, contactPerson: e.target.value })}
                  placeholder="Full name"
                  className="w-full py-2.5 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Position</label>
                <input
                  type="text"
                  value={formData.contactPosition}
                  onChange={e => setFormData({ ...formData, contactPosition: e.target.value })}
                  placeholder="e.g., Owner, Manager"
                  className="w-full py-2.5 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Phone *</label>
                <input
                  type="tel"
                  value={formData.contactPhone}
                  onChange={e => setFormData({ ...formData, contactPhone: e.target.value })}
                  placeholder="98XXXXXXXX"
                  className="w-full py-2.5 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Email *</label>
                <input
                  type="email"
                  value={formData.contactEmail}
                  onChange={e => setFormData({ ...formData, contactEmail: e.target.value })}
                  placeholder="contact@company.com"
                  className="w-full py-2.5 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Company Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="01-XXXXXXX"
                  className="w-full py-2.5 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Company Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="info@company.com"
                  className="w-full py-2.5 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" /> Documents & Review
            </h2>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">Required Documents</label>
              <div className="space-y-2">
                {[
                  { name: 'Company Registration Certificate', required: true },
                  { name: 'PAN/VAT Certificate', required: true },
                  { name: 'Citizenship of Contact Person', required: true },
                  { name: 'Company Logo (PNG/SVG)', required: false },
                  { name: 'Showroom/Office Photos', required: false },
                ].map((doc, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl">
                    <Upload className="w-5 h-5 text-gray-400" />
                    <span className="text-sm text-gray-700 flex-1">{doc.name}</span>
                    {doc.required && <Badge variant="danger">Required</Badge>}
                    <button type="button" className="text-xs text-blue-600 font-medium hover:text-blue-700">Upload</button>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">PAN Number</label>
                <input
                  type="text"
                  value={formData.panNumber}
                  onChange={e => setFormData({ ...formData, panNumber: e.target.value })}
                  placeholder="Permanent Account Number"
                  className="w-full py-2.5 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Bank Name</label>
                <input
                  type="text"
                  value={formData.bankName}
                  onChange={e => setFormData({ ...formData, bankName: e.target.value })}
                  placeholder="For payment settlements"
                  className="w-full py-2.5 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Summary */}
            <div className="p-4 bg-gray-50 rounded-xl">
              <h3 className="font-medium text-gray-900 mb-3">Application Summary</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-gray-500">Company</p>
                  <p className="font-medium">{formData.companyName || 'Not provided'}</p>
                </div>
                <div>
                  <p className="text-gray-500">Location</p>
                  <p className="font-medium">{formData.district || 'Not provided'}</p>
                </div>
                <div>
                  <p className="text-gray-500">Contact</p>
                  <p className="font-medium">{formData.contactPerson || 'Not provided'}</p>
                </div>
                <div>
                  <p className="text-gray-500">Vehicle Types</p>
                  <p className="font-medium">{formData.specializations.length || 0} selected</p>
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
                I confirm that all information provided is accurate. I agree to the <a href="/terms" className="text-blue-600 hover:underline">Dealer Terms of Service</a> and understand that false information may result in rejection or termination of dealer status.
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
          <button type="submit" className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 flex items-center justify-center gap-2">
            {step < 3 ? 'Continue' : 'Submit Application'}
          </button>
        </div>
      </form>

      {/* FAQ */}
      <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-4">Frequently Asked Questions</h3>
        <div className="space-y-4">
          {[
            { q: 'What are the requirements to become a dealer?', a: 'You need a registered business, valid PAN/VAT certificate, and a physical showroom or office.' },
            { q: 'How much does it cost?', a: 'Dealer membership starts at Rs. 15,000/month with different tiers based on inventory size and features.' },
            { q: 'How long does approval take?', a: 'Typically 3-5 business days after submitting all required documents.' },
            { q: 'Can I manage multiple branches?', a: 'Yes, you can add multiple branches and assign staff to each location.' },
          ].map((faq, i) => (
            <div key={i}>
              <p className="text-sm font-medium text-gray-900">{faq.q}</p>
              <p className="text-sm text-gray-600 mt-1">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
