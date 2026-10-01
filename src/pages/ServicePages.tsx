import { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Car, Upload, Shield, CheckCircle2, Camera, FileText, MapPin, ArrowRight, Zap, Info } from 'lucide-react';
import { useAuth } from '../context/AppContext';
import { Badge } from '../components/Layout';
import SEO from '../components/SEO';

export function SellPage() {
  const { currentUser } = useAuth();
  const [step, setStep] = useState(1);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <SEO
        title="Sell Your Car or Bike in Nepal"
        description="List your vehicle on Nepal's trusted marketplace. Reach thousands of verified buyers. Get professional inspection, Vehicle Passport, and sell faster with GadiBazar."
        keywords="sell car Nepal, sell bike Nepal, list vehicle Nepal, sell my car, sell my bike, vehicle selling Nepal"
        canonical="https://gadibazar.com/sell"
      />
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Sell Your Vehicle</h1>
        <p className="text-gray-500 mt-2">List your vehicle and reach thousands of verified buyers</p>
      </div>

      {/* Steps */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {['Vehicle Details', 'Photos & Docs', 'Pricing', 'Review'].map((s, i) => (
          <Fragment key={i}>
            <div className={`flex items-center gap-2 ${step > i ? 'text-blue-600' : step === i + 1 ? 'text-gray-900' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step > i ? 'bg-blue-600 text-white' : step === i + 1 ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
                {step > i ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
              </div>
              <span className="text-sm font-medium hidden sm:block">{s}</span>
            </div>
            {i < 3 && <div className={`w-8 h-0.5 ${step > i + 1 ? 'bg-blue-600' : 'bg-gray-200'}`} />}
          </Fragment>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Vehicle Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Vehicle Type</label>
                <select className="w-full py-3 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500">
                  <option>Select type</option>
                  <option>Car</option>
                  <option>Motorbike</option>
                  <option>Scooter</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Make</label>
                <select className="w-full py-3 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500">
                  <option>Select make</option>
                  <option>Toyota</option>
                  <option>Hyundai</option>
                  <option>Honda</option>
                  <option>BYD</option>
                  <option>Tata</option>
                  <option>Kia</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Model</label>
                <input type="text" placeholder="e.g., Fortuner" className="w-full py-3 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Year</label>
                <input type="number" placeholder="e.g., 2022" className="w-full py-3 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Mileage (km)</label>
                <input type="number" placeholder="e.g., 42000" className="w-full py-3 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Fuel Type</label>
                <select className="w-full py-3 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500">
                  <option>Select fuel type</option>
                  <option>Petrol</option>
                  <option>Diesel</option>
                  <option>Electric</option>
                  <option>Hybrid</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Transmission</label>
                <select className="w-full py-3 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500">
                  <option>Select transmission</option>
                  <option>Manual</option>
                  <option>Automatic</option>
                  <option>CVT</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Registration Number</label>
                <input type="text" placeholder="e.g., BA 23 PA 4567" className="w-full py-3 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500" />
              </div>
            </div>
            <div className="flex justify-end">
              <button onClick={() => setStep(2)} className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 flex items-center gap-2">
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Photos & Documents</h2>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">Vehicle Photos</label>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                <div className="aspect-square border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors">
                  <Camera className="w-6 h-6 text-gray-400" />
                  <span className="text-xs text-gray-500 mt-1">Add Photo</span>
                </div>
                {[1,2,3].map(i => (
                  <div key={i} className="aspect-square bg-gray-100 rounded-xl flex items-center justify-center">
                    <Car className="w-8 h-8 text-gray-300" />
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">Upload at least 5 photos: front, back, both sides, interior, odometer</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">Documents</label>
              <div className="space-y-2">
                {['Bluebook (Registration Certificate)', 'Insurance Certificate', 'Citizenship Copy (for verification)'].map(doc => (
                  <div key={doc} className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl">
                    <FileText className="w-5 h-5 text-gray-400" />
                    <span className="text-sm text-gray-700 flex-1">{doc}</span>
                    <button className="text-xs text-blue-600 font-medium hover:text-blue-700">Upload</button>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between">
              <button onClick={() => setStep(1)} className="border border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-50">Back</button>
              <button onClick={() => setStep(3)} className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 flex items-center gap-2">
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Pricing & Location</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Asking Price (Rs.)</label>
                <input type="number" placeholder="e.g., 12500000" className="w-full py-3 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Location</label>
                <select className="w-full py-3 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500">
                  <option>Select district</option>
                  <option>Kathmandu</option>
                  <option>Lalitpur</option>
                  <option>Bhaktapur</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700 block mb-1">Detailed Address</label>
                <input type="text" placeholder="e.g., Baneshwor, Kathmandu" className="w-full py-3 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500" />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700 block mb-1">Description</label>
                <textarea placeholder="Describe your vehicle, its condition, maintenance history..." className="w-full py-3 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500 resize-none h-32" />
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
              <Shield className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-blue-800">Get a Vehicle Passport</p>
                <p className="text-xs text-blue-600">Book an inspection to get your vehicle a verified passport, increasing buyer confidence</p>
              </div>
              <Link to="/inspect" className="ml-auto text-sm font-medium text-blue-600 hover:text-blue-700 whitespace-nowrap">Book Now</Link>
            </div>
            <div className="flex justify-between">
              <button onClick={() => setStep(2)} className="border border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-50">Back</button>
              <button onClick={() => setStep(4)} className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 flex items-center gap-2">
                Review Listing <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Review & Submit</h2>
            <div className="p-6 bg-gray-50 rounded-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Vehicle</span>
                <span className="text-sm font-medium">Toyota Fortuner 2022</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Price</span>
                <span className="text-sm font-bold text-blue-600">Rs. 1.25 Crore</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Location</span>
                <span className="text-sm font-medium">Kathmandu</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Photos</span>
                <span className="text-sm font-medium">5 uploaded</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Documents</span>
                <Badge variant="warning">Pending Verification</Badge>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-xl border border-amber-200">
              <Info className="w-5 h-5 text-amber-600" />
              <p className="text-sm text-amber-700">Your listing will be reviewed by our team within 24 hours before going live.</p>
            </div>
            <div className="flex justify-between">
              <button onClick={() => setStep(3)} className="border border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-50">Back</button>
              <button className="bg-green-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-green-700 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Submit Listing
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Default export for lazy loading
export default {
  SellPage,
  InspectPage,
  FinancePage,
  InsurancePage,
  MessagesPage,
};

export function InspectPage() {
  const [selectedPackage, setSelectedPackage] = useState('');

  const packages = [
    { id: 'basic', name: 'Basic Inspection', price: 3500, items: ['Visual inspection (30 points)', 'Odometer verification', 'Basic photo report', 'Digital report'] },
    { id: 'standard', name: 'Standard Inspection', price: 5500, items: ['Comprehensive inspection (100+ points)', 'OBD diagnostics', 'Paint depth measurement', 'Tyre tread measurement', 'Photo evidence report', 'Road test'] },
    { id: 'premium', name: 'Premium + Passport', price: 8500, items: ['Everything in Standard', 'Vehicle Passport creation', 'Battery health check (EV)', 'Supervisor review', 'Priority scheduling', 'Detailed PDF report'] },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <SEO
        title="Professional Vehicle Inspection Service in Nepal"
        description="Book certified vehicle inspections in Nepal. 100+ point inspection with OBD diagnostics, paint depth measurement, and EV battery health check. Get Vehicle Passport with premium package."
        keywords="vehicle inspection Nepal, car inspection Nepal, used car inspection, pre-purchase inspection, vehicle check Nepal, EV battery health check"
        canonical="https://gadibazar.com/inspect"
      />
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Book a Vehicle Inspection</h1>
        <p className="text-gray-500 mt-2">Professional multi-point inspection by certified inspectors</p>
      </div>

      {/* Info banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8">
        <p className="text-sm text-blue-700 flex items-center gap-2">
          <Info className="w-4 h-4" />
          You can book an inspection for any vehicle — whether it's listed on GadiBazar, Facebook Marketplace, Hamrobazar, at a dealership, or owned by a friend.
        </p>
      </div>

      {/* Packages */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {packages.map(pkg => (
          <div
            key={pkg.id}
            onClick={() => setSelectedPackage(pkg.id)}
            className={`cursor-pointer rounded-2xl border-2 p-6 transition-all ${
              selectedPackage === pkg.id ? 'border-blue-600 bg-blue-50 shadow-md' : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            {pkg.id === 'premium' && <Badge variant="info">Most Popular</Badge>}
            <h3 className="text-lg font-semibold text-gray-900 mt-2">{pkg.name}</h3>
            <p className="text-2xl font-bold text-blue-600 mt-2">Rs. {pkg.price.toLocaleString()}</p>
            <ul className="mt-4 space-y-2">
              {pkg.items.map(item => (
                <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Booking form */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Vehicle & Location Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Vehicle Type</label>
            <select className="w-full py-3 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500">
              <option>Select type</option>
              <option>Car</option>
              <option>Motorbike</option>
              <option>Scooter</option>
              <option>Electric Vehicle</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Make & Model</label>
            <input type="text" placeholder="e.g., Toyota Fortuner" className="w-full py-3 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Registration Number (if known)</label>
            <input type="text" placeholder="e.g., BA 23 PA 4567" className="w-full py-3 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Seller Contact (optional)</label>
            <input type="text" placeholder="Name or phone" className="w-full py-3 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Inspection Location</label>
            <input type="text" placeholder="Address where vehicle is located" className="w-full py-3 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Preferred Date</label>
            <input type="date" className="w-full py-3 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500" />
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-blue-700 flex items-center gap-2">
            Book Inspection <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function FinancePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Vehicle Finance</h1>
        <p className="text-gray-500 mt-2">Get pre-approved for vehicle loans from our partner banks and financial institutions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 text-center">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Car className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-900">EMI Calculator</h3>
          <p className="text-sm text-gray-500 mt-1">Calculate your monthly payments</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-6 text-center">
          <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mx-auto mb-3">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="font-semibold text-gray-900">Pre-Approval</h3>
          <p className="text-sm text-gray-500 mt-1">Get pre-approved in minutes</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-6 text-center">
          <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Shield className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="font-semibold text-gray-900">Compare Rates</h3>
          <p className="text-sm text-gray-500 mt-1">Compare offers from multiple banks</p>
        </div>
      </div>

      {/* EMI Calculator */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">EMI Calculator</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Vehicle Price (Rs.)</label>
              <input type="number" defaultValue={5000000} className="w-full py-3 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Down Payment (Rs.)</label>
              <input type="number" defaultValue={1000000} className="w-full py-3 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Loan Tenure (Years)</label>
              <select className="w-full py-3 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500">
                <option>3 Years</option>
                <option>5 Years</option>
                <option>7 Years</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Interest Rate (%)</label>
              <input type="number" defaultValue={12} className="w-full py-3 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500" />
            </div>
          </div>
          <div className="bg-blue-50 rounded-xl p-6 flex flex-col justify-center">
            <p className="text-sm text-blue-600 font-medium">Estimated Monthly EMI</p>
            <p className="text-4xl font-bold text-blue-700 mt-2">Rs. 31,620</p>
            <p className="text-sm text-blue-500 mt-2">Total payable: Rs. 53,75,400</p>
            <p className="text-sm text-blue-500">Total interest: Rs. 13,75,400</p>
            <button className="mt-4 bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700">Apply for Finance</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function InsurancePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Vehicle Insurance</h1>
        <p className="text-gray-500 mt-2">Get quotes from trusted insurance partners in Nepal</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Get an Insurance Quote</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Vehicle Type</label>
            <select className="w-full py-3 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500">
              <option>Car</option>
              <option>Motorbike</option>
              <option>Commercial Vehicle</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Registration Number</label>
            <input type="text" placeholder="e.g., BA 23 PA 4567" className="w-full py-3 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Vehicle Value (Rs.)</label>
            <input type="number" placeholder="Estimated market value" className="w-full py-3 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Insurance Type</label>
            <select className="w-full py-3 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500">
              <option>Third Party (Required)</option>
              <option>Comprehensive</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Your Name</label>
            <input type="text" placeholder="Full name" className="w-full py-3 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Phone Number</label>
            <input type="tel" placeholder="98XXXXXXXX" className="w-full py-3 px-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500" />
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <Link to="/insurance/apply" className="bg-blue-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-blue-700">Get Quotes</Link>
        </div>
      </div>

      {/* Partner logos */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500 mb-4">Trusted by leading insurance partners</p>
        <div className="flex flex-wrap justify-center gap-6">
          {['Shikhar Insurance', 'Nepal Insurance', 'Himalayan General', 'Prime Insurance'].map(name => (
            <div key={name} className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-600">{name}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function MessagesPage() {
  const { currentUser } = useAuth();
  const [selectedConversation, setSelectedConversation] = useState<string | null>('c1');

  const myConversations = currentUser
    ? [
        { id: 'c1', name: 'Ramesh Thapa', listing: 'Toyota Fortuner', lastMessage: 'Thank you for the offer. Let me check and get back to you.', time: '2:30 PM', unread: 1 },
        { id: 'c2', name: 'Sunil Shakya', listing: 'BYD Atto 3', lastMessage: 'I can do 57 lakh as a final price.', time: 'Yesterday', unread: 0 },
        { id: 'c3', name: 'Sujal Motors', listing: 'Hyundai Creta', lastMessage: 'The price is fixed at 72 lakh for this condition.', time: '2 days ago', unread: 0 },
      ]
    : [];

  const selected = myConversations.find(c => c.id === selectedConversation);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Messages</h1>
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden" style={{ height: '600px' }}>
        <div className="flex h-full">
          {/* Conversation list */}
          <div className="w-80 border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-100">
              <input type="text" placeholder="Search messages..." className="w-full py-2 px-3 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none" />
            </div>
            <div className="flex-1 overflow-y-auto">
              {myConversations.map(conv => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv.id)}
                  className={`w-full text-left p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors ${selectedConversation === conv.id ? 'bg-blue-50' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-blue-700">{conv.name.charAt(0)}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">{conv.name}</p>
                        <span className="text-xs text-gray-400">{conv.time}</span>
                      </div>
                      <p className="text-xs text-gray-500 truncate">{conv.listing}</p>
                      <p className="text-xs text-gray-600 truncate mt-0.5">{conv.lastMessage}</p>
                    </div>
                    {conv.unread > 0 && <span className="w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">{conv.unread}</span>}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Message area */}
          <div className="flex-1 flex flex-col">
            {selected ? (
              <>
                <div className="p-4 border-b border-gray-100 flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-blue-700">{selected.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{selected.name}</p>
                    <p className="text-xs text-gray-500">Re: {selected.listing}</p>
                  </div>
                </div>
                <div className="flex-1 p-4 space-y-3 overflow-y-auto">
                  <div className="flex justify-end">
                    <div className="bg-blue-600 text-white px-4 py-2 rounded-2xl rounded-br-md max-w-xs">
                      <p className="text-sm">Hi, is the vehicle still available?</p>
                      <p className="text-xs text-blue-200 mt-1">10:00 AM</p>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-gray-100 px-4 py-2 rounded-2xl rounded-bl-md max-w-xs">
                      <p className="text-sm text-gray-900">Yes, it is available. Would you like to schedule a viewing?</p>
                      <p className="text-xs text-gray-500 mt-1">11:30 AM</p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-blue-600 text-white px-4 py-2 rounded-2xl rounded-br-md max-w-xs">
                      <p className="text-sm">I have made an offer. Please check.</p>
                      <p className="text-xs text-blue-200 mt-1">2:00 PM</p>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-gray-100 px-4 py-2 rounded-2xl rounded-bl-md max-w-xs">
                      <p className="text-sm text-gray-900">{selected.lastMessage}</p>
                      <p className="text-xs text-gray-500 mt-1">{selected.time}</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <input type="text" placeholder="Type a message..." className="flex-1 py-3 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500" />
                    <button className="bg-blue-600 text-white px-4 py-3 rounded-xl font-medium hover:bg-blue-700">Send</button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-400">
                <p>Select a conversation</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
