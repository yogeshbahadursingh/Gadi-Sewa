import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, AlertTriangle, CheckCircle2, Eye, FileText, Users, DollarSign, Car, Phone } from 'lucide-react';

export default function SafetyTipsPage() {
  const tips = [
    {
      icon: Eye,
      title: 'Inspect Before You Buy',
      color: 'bg-blue-100 text-blue-600',
      tips: [
        'Always view the vehicle in person before making any payment',
        'Bring a trusted mechanic or use our professional inspection service',
        'Check the vehicle at different times - some issues only appear when cold/hot',
        'Test drive on various road conditions if possible',
        'Verify the chassis and engine numbers match the bluebook',
      ],
    },
    {
      icon: FileText,
      title: 'Verify Documents',
      color: 'bg-green-100 text-green-600',
      tips: [
        'Always check the original bluebook (registration certificate)',
        'Verify the owner\'s citizenship matches the bluebook name',
        'Check if insurance is valid and transferable',
        'Ensure road tax is paid up to date',
        'Look for any loan or hypothecation marks on the bluebook',
        'Use our Vehicle Passport feature to check complete history',
      ],
    },
    {
      icon: DollarSign,
      title: 'Safe Payment Practices',
      color: 'bg-purple-100 text-purple-600',
      tips: [
        'Never pay in advance without seeing the vehicle',
        'Use secure payment methods with transaction records',
        'Get a proper receipt for any advance payment',
        'Complete ownership transfer before full payment',
        'Be wary of prices that seem too good to be true',
        'Use our reservation system for secure deposits',
      ],
    },
    {
      icon: Users,
      title: 'Meet Safely',
      color: 'bg-orange-100 text-orange-600',
      tips: [
        'Meet in public places during daylight hours',
        'Bring a friend or family member along',
        'Inform someone about your meeting details',
        'Share your live location with trusted contacts',
        'Trust your instincts - if something feels wrong, leave',
        'Never share personal financial information',
      ],
    },
    {
      icon: AlertTriangle,
      title: 'Red Flags to Watch For',
      color: 'bg-red-100 text-red-600',
      tips: [
        'Seller refuses to meet in person or show the vehicle',
        'Price is significantly below market value',
        'Seller pressures you to pay quickly',
        'Documents look tampered or inconsistent',
        'Vehicle identification numbers don\'t match',
        'Seller can\'t provide service history',
        'Mileage seems inconsistent with vehicle age',
        'Seller asks for payment before showing vehicle',
      ],
    },
    {
      icon: Car,
      title: 'Vehicle-Specific Checks',
      color: 'bg-indigo-100 text-indigo-600',
      tips: [
        'Check for rust, especially under the vehicle and in wheel wells',
        'Look for uneven gaps between body panels (sign of repair)',
        'Test all electronics: AC, lights, power windows',
        'Check tyre condition and tread depth',
        'Look under the hood for leaks or corrosion',
        'For EVs: Check battery health certificate and charging history',
        'Listen for unusual engine noises during test drive',
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to home
      </Link>

      {/* Header */}
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Safety Tips</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Protect yourself when buying or selling vehicles. Follow these guidelines for a safe transaction.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
          <CheckCircle2 className="w-10 h-10 text-green-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-green-700">10,000+</p>
          <p className="text-sm text-green-600">Safe Transactions</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
          <Shield className="w-10 h-10 text-blue-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-blue-700">5,000+</p>
          <p className="text-sm text-blue-600">Verified Vehicles</p>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 text-center">
          <Users className="w-10 h-10 text-purple-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-purple-700">8,000+</p>
          <p className="text-sm text-purple-600">Verified Users</p>
        </div>
      </div>

      {/* Tips Grid */}
      <div className="space-y-6">
        {tips.map((section, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-2xl p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${section.color}`}>
                <section.icon className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
              </div>
            </div>
            <ul className="space-y-2 ml-16">
              {section.tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Report Section */}
      <div className="mt-12 bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl p-8 text-white text-center">
        <AlertTriangle className="w-12 h-12 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">See Something Suspicious?</h2>
        <p className="text-red-100 mb-6 max-w-lg mx-auto">
          Help keep our community safe. Report suspicious listings or users immediately.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/support" className="px-6 py-3 bg-white text-red-600 rounded-xl font-medium hover:bg-red-50 transition-colors">
            Report to Support
          </Link>
          <a href="tel:100" className="px-6 py-3 border-2 border-white text-white rounded-xl font-medium hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
            <Phone className="w-4 h-4" /> Emergency: 100
          </a>
        </div>
      </div>

      {/* Additional Resources */}
      <div className="mt-12 bg-gray-50 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Additional Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link to="/blog" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-gray-900 mb-1">Read Our Blog</h3>
            <p className="text-sm text-gray-600">Expert guides and tips for buying and selling vehicles</p>
          </Link>
          <Link to="/inspect" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-gray-900 mb-1">Book an Inspection</h3>
            <p className="text-sm text-gray-600">Professional inspection by certified experts</p>
          </Link>
          <Link to="/verify" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-gray-900 mb-1">Verify a Passport</h3>
            <p className="text-sm text-gray-600">Check vehicle history and authenticity</p>
          </Link>
          <Link to="/support" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-gray-900 mb-1">Contact Support</h3>
            <p className="text-sm text-gray-600">Get help with any issues or concerns</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
