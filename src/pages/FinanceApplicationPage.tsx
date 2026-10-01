import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, DollarSign, FileText, User, Building2, Car, Calendar, AlertCircle } from 'lucide-react';
import { Badge } from '../components/Layout';

export default function FinanceApplicationPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    // Personal info
    fullName: '',
    email: '',
    phone: '',
    citizenshipNumber: '',
    dateOfBirth: '',
    occupation: '',
    monthlyIncome: '',
    
    // Vehicle info
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: '',
    vehiclePrice: '',
    downPayment: '',
    
    // Loan details
    loanAmount: '',
    loanTenure: '5',
    preferredBank: '',
    
    // Documents
    hasSalaryCertificate: false,
    hasBankStatement: false,
    hasCitizenshipCopy: false,
    agreeTerms: false,
  });

  const banks = [
    'Nabil Bank',
    'Global IME Bank',
    'NIC Asia Bank',
    'Nepal Investment Bank',
    'Standard Chartered Bank',
    'Himalayan Bank',
    'Prime Commercial Bank',
    'Any Bank (Best Rate)',
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
        <h1 className="text-2xl font-bold text-gray-900">Application Submitted!</h1>
        <p className="text-gray-500 mt-2">Your finance application has been sent to our partner banks.</p>

        <div className="mt-6 bg-white border border-gray-200 rounded-2xl p-6 text-left">
          <h3 className="font-semibold text-gray-900 mb-4">Application Summary</h3>
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
              <span className="text-sm text-gray-600">Loan Amount</span>
              <span className="text-sm font-medium">Rs. {Number(formData.loanAmount || 0).toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">Tenure</span>
              <span className="text-sm font-medium">{formData.loanTenure} years</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">Preferred Bank</span>
              <span className="text-sm font-medium">{formData.preferredBank || 'Best Rate'}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-xl text-left">
          <h4 className="text-sm font-medium text-blue-900 mb-2">What happens next?</h4>
          <ul className="space-y-1 text-sm text-blue-700">
            <li>• Our finance team will review your application within 24 hours</li>
            <li>• You'll be contacted for any additional documentation needed</li>
            <li>• Bank will process your application and provide an offer</li>
            <li>• Once approved, funds will be disbursed directly to the seller</li>
          </ul>
        </div>

        <div className="mt-6 p-4 bg-amber-50 rounded-xl text-left">
          <p className="text-xs text-amber-700">
            <strong>Reference ID:</strong> FIN-{Date.now().toString().slice(-8)}<br />
            <strong>Note:</strong> This is a finance enquiry, not a guaranteed approval. Loan approval is subject to bank's credit assessment and policies.
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
      <Link to="/finance" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Finance
      </Link>

      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <DollarSign className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Apply for Vehicle Finance</h1>
        <p className="text-gray-500 mt-2">Get pre-approved for a vehicle loan from our partner banks</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {['Personal Info', 'Vehicle & Loan', 'Documents & Submit'].map((label, i) => (
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

      <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
        {step === 1 && (
          <div className="space-y-5">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" /> Personal Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Full Name *</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="As per citizenship"
                  className="w-full py-2.5 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500"
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
                  className="w-full py-2.5 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500"
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
                  className="w-full py-2.5 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500"
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
                  className="w-full py-2.5 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Date of Birth *</label>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={e => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  className="w-full py-2.5 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Occupation *</label>
                <input
                  type="text"
                  value={formData.occupation}
                  onChange={e => setFormData({ ...formData, occupation: e.target.value })}
                  placeholder="e.g., Software Engineer"
                  className="w-full py-2.5 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Monthly Income (Rs.) *</label>
                <input
                  type="number"
                  value={formData.monthlyIncome}
                  onChange={e => setFormData({ ...formData, monthlyIncome: e.target.value })}
                  placeholder="Your monthly income"
                  className="w-full py-2.5 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500"
                  required
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <Car className="w-5 h-5 text-blue-600" /> Vehicle & Loan Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Vehicle Make *</label>
                <input
                  type="text"
                  value={formData.vehicleMake}
                  onChange={e => setFormData({ ...formData, vehicleMake: e.target.value })}
                  placeholder="e.g., Toyota"
                  className="w-full py-2.5 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500"
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
                  className="w-full py-2.5 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Vehicle Price (Rs.) *</label>
                <input
                  type="number"
                  value={formData.vehiclePrice}
                  onChange={e => setFormData({ ...formData, vehiclePrice: e.target.value })}
                  placeholder="Total vehicle price"
                  className="w-full py-2.5 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Down Payment (Rs.) *</label>
                <input
                  type="number"
                  value={formData.downPayment}
                  onChange={e => setFormData({ ...formData, downPayment: e.target.value })}
                  placeholder="Amount you'll pay upfront"
                  className="w-full py-2.5 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Loan Amount (Rs.)</label>
                <input
                  type="number"
                  value={formData.loanAmount || (Number(formData.vehiclePrice || 0) - Number(formData.downPayment || 0))}
                  onChange={e => setFormData({ ...formData, loanAmount: e.target.value })}
                  placeholder="Auto-calculated"
                  className="w-full py-2.5 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500 bg-gray-50"
                  readOnly
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Loan Tenure</label>
                <select
                  value={formData.loanTenure}
                  onChange={e => setFormData({ ...formData, loanTenure: e.target.value })}
                  className="w-full py-2.5 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500"
                >
                  <option value="3">3 Years</option>
                  <option value="5">5 Years</option>
                  <option value="7">7 Years</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Preferred Bank</label>
                <select
                  value={formData.preferredBank}
                  onChange={e => setFormData({ ...formData, preferredBank: e.target.value })}
                  className="w-full py-2.5 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500"
                >
                  <option value="">Any Bank (Best Rate)</option>
                  {banks.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
            </div>

            {/* EMI Preview */}
            {formData.loanAmount && (
              <div className="p-4 bg-blue-50 rounded-xl">
                <p className="text-sm text-blue-700 font-medium">Estimated EMI</p>
                <p className="text-2xl font-bold text-blue-800 mt-1">
                  Rs. {Math.round(Number(formData.loanAmount) / (Number(formData.loanTenure) * 12) * 1.12).toLocaleString()}/month
                </p>
                <p className="text-xs text-blue-600 mt-1">Approximate at 12% interest rate</p>
              </div>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" /> Documents & Review
            </h2>

            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <p className="text-sm text-amber-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                Please keep these documents ready for verification
              </p>
            </div>

            <div className="space-y-3">
              {[
                { key: 'hasSalaryCertificate', label: 'Salary Certificate / Income Proof' },
                { key: 'hasBankStatement', label: 'Bank Statement (Last 6 months)' },
                { key: 'hasCitizenshipCopy', label: 'Citizenship Certificate Copy' },
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
              <h3 className="font-medium text-gray-900 mb-3">Application Summary</h3>
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
                  <p className="text-gray-500">Loan Amount</p>
                  <p className="font-medium">Rs. {Number(formData.loanAmount || 0).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-500">Tenure</p>
                  <p className="font-medium">{formData.loanTenure} years</p>
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
                I consent to sharing my information with partner banks for loan processing. I understand that this is an application, not a guaranteed approval.
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
    </div>
  );
}
