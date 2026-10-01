import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, CheckCircle2, AlertCircle, ArrowRight, Shield, User, Calendar, MapPin, Upload, Clock, Info } from 'lucide-react';
import { Badge } from '../components/Layout';

export default function OwnershipTransferPage() {
  const [step, setStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const steps = [
    { id: 1, title: 'Required Documents', desc: 'Gather all necessary documents' },
    { id: 2, title: 'Submit Application', desc: 'Fill in transfer details' },
    { id: 3, title: 'Verification', desc: 'Document verification by our team' },
    { id: 4, title: 'Government Office', desc: 'Visit transport office for completion' },
    { id: 5, title: 'Transfer Complete', desc: 'Passport updated with new ownership' },
  ];

  const requiredDocuments = [
    { name: 'Original Bluebook (Registration Certificate)', status: 'pending', note: 'Must be original, not photocopy' },
    { name: 'Citizenship Certificate (Seller)', status: 'pending', note: 'Original + photocopy' },
    { name: 'Citizenship Certificate (Buyer)', status: 'pending', note: 'Original + photocopy' },
    { name: 'Valid Insurance Certificate', status: 'pending', note: 'Must be transferred to buyer name' },
    { name: 'Tax Clearance Certificate', status: 'pending', note: 'Current year tax paid receipt' },
    { name: 'Sale Agreement / Transfer Letter', status: 'pending', note: 'Signed by both parties' },
    { name: 'Passport-size Photos (2 each)', status: 'pending', note: 'Buyer and seller, recent photos' },
    { name: 'Previous Ownership Documents', status: 'pending', note: 'If applicable' },
  ];

  const [docStatus, setDocStatus] = useState<Record<number, boolean>>({});

  const toggleDoc = (index: number) => {
    setDocStatus(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const completedDocs = Object.values(docStatus).filter(Boolean).length;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Shield className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Ownership Transfer Support</h1>
        <p className="text-gray-500 mt-2">Complete guidance and assistance for vehicle ownership transfer in Nepal</p>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8 flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-blue-800">Important Notice</p>
          <p className="text-sm text-blue-700 mt-1">
            GadiBazar provides guidance and document preparation support for ownership transfer. 
            The actual transfer must be completed at the Department of Transport Management (DoTM). 
            We are not a government authority and cannot process transfers directly.
          </p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <h2 className="font-semibold text-gray-900 mb-4">Transfer Process</h2>
        <div className="space-y-3">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                step > s.id ? 'bg-green-100' : step === s.id ? 'bg-blue-100' : 'bg-gray-100'
              }`}>
                {step > s.id ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                ) : (
                  <span className={`text-sm font-medium ${step === s.id ? 'text-blue-600' : 'text-gray-400'}`}>{s.id}</span>
                )}
              </div>
              <div className="flex-1 pb-3">
                <p className={`text-sm font-medium ${step >= s.id ? 'text-gray-900' : 'text-gray-400'}`}>{s.title}</p>
                <p className="text-xs text-gray-500">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Step 1: Documents Checklist */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" /> Required Documents
          </h2>
          <Badge variant={completedDocs === requiredDocuments.length ? 'success' : 'warning'}>
            {completedDocs}/{requiredDocuments.length} Ready
          </Badge>
        </div>
        <div className="space-y-2">
          {requiredDocuments.map((doc, i) => (
            <label key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="checkbox"
                checked={docStatus[i] || false}
                onChange={() => toggleDoc(i)}
                className="mt-0.5 rounded border-gray-300 text-blue-600"
              />
              <div className="flex-1">
                <p className={`text-sm ${docStatus[i] ? 'text-gray-500 line-through' : 'text-gray-900 font-medium'}`}>
                  {doc.name}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">{doc.note}</p>
              </div>
            </label>
          ))}
        </div>
        {completedDocs === requiredDocuments.length && (
          <div className="mt-4 p-3 bg-green-50 rounded-lg flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <p className="text-sm font-medium text-green-700">All documents ready! Proceed to application.</p>
          </div>
        )}
      </div>

      {/* Step 2: Application Form */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-blue-600" /> Transfer Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">Vehicle Registration Number</label>
            <input type="text" placeholder="e.g., BA 23 PA 4567" className="w-full py-2.5 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">Vehicle Passport ID (if available)</label>
            <input type="text" placeholder="e.g., NP-VP-00018427" className="w-full py-2.5 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">Seller Full Name</label>
            <input type="text" placeholder="As per citizenship" className="w-full py-2.5 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">Buyer Full Name</label>
            <input type="text" placeholder="As per citizenship" className="w-full py-2.5 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">Sale Price (Rs.)</label>
            <input type="number" placeholder="Actual transaction price" className="w-full py-2.5 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">Transfer Date</label>
            <input type="date" className="w-full py-2.5 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500" />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-700 block mb-1.5">Transport Office</label>
            <select className="w-full py-2.5 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500">
              <option>Select transport office</option>
              <option>DoTM Kathmandu (Bhrikutimandap)</option>
              <option>DoTM Lalitpur</option>
              <option>DoTM Bhaktapur</option>
              <option>DoTM Pokhara</option>
              <option>DoTM Chitwan</option>
            </select>
          </div>
        </div>
      </div>

      {/* Document Upload */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Upload className="w-5 h-5 text-blue-600" /> Upload Documents
        </h2>
        <p className="text-sm text-gray-500 mb-4">Upload scanned copies or clear photos of required documents</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {['Bluebook', 'Seller Citizenship', 'Buyer Citizenship', 'Insurance', 'Tax Receipt', 'Sale Agreement', 'Photos', 'Other'].map((doc, i) => (
            <div key={i} className="aspect-square border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors">
              <Upload className="w-5 h-5 text-gray-400" />
              <span className="text-xs text-gray-500 mt-1 text-center px-2">{doc}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-3 flex items-center gap-1">
          <Shield className="w-3 h-3" /> Documents are stored securely and only accessible to authorized personnel
        </p>
      </div>

      {/* Fees */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <h2 className="font-semibold text-gray-900 mb-4">Estimated Fees</h2>
        <div className="space-y-2">
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <span className="text-sm text-gray-600">Transfer Fee (Government)</span>
            <span className="text-sm font-medium">Rs. 1,000 - 5,000*</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <span className="text-sm text-gray-600">GadiBazar Service Fee</span>
            <span className="text-sm font-medium">Rs. 2,000</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <span className="text-sm text-gray-600">Document Verification</span>
            <span className="text-sm font-medium">Included</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm font-medium text-gray-900">Total (estimated)</span>
            <span className="text-sm font-bold text-blue-600">Rs. 3,000 - 7,000</span>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-3">*Government fees vary based on vehicle type and engine capacity</p>
      </div>

      {/* Submit */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 flex items-center justify-center gap-2">
          Submit Transfer Request <ArrowRight className="w-4 h-4" />
        </button>
        <Link to="/" className="px-6 py-3 border border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50 text-center">
          Cancel
        </Link>
      </div>

      {/* FAQ */}
      <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-4">Frequently Asked Questions</h3>
        <div className="space-y-4">
          {[
            { q: 'How long does the transfer process take?', a: 'Typically 3-7 working days after all documents are submitted at the transport office.' },
            { q: 'Do both buyer and seller need to be present?', a: 'Yes, both parties must visit the transport office together with original citizenship certificates.' },
            { q: 'What if the vehicle has a loan?', a: 'The loan must be cleared and a NOC (No Objection Certificate) from the bank is required before transfer.' },
            { q: 'Will my Vehicle Passport be updated?', a: 'Yes, once the transfer is complete, your Vehicle Passport will be updated with the new ownership record.' },
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
