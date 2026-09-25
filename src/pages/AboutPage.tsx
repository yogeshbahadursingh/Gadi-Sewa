import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Users, Target, Award, Globe } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to home
      </Link>

      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About GadiBazar</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Nepal's most trusted vehicle ecosystem, bringing transparency and confidence to every transaction.
        </p>
      </div>

      {/* Mission */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white mb-12">
        <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
        <p className="text-lg text-blue-100 leading-relaxed">
          To revolutionize vehicle trading in Nepal by providing complete transparency, verified information, 
          and professional services that protect both buyers and sellers. We believe every vehicle transaction 
          should be confident, informed, and fair.
        </p>
      </div>

      {/* What We Do */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">What We Do</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              icon: Shield,
              title: 'Vehicle Passports',
              description: 'Permanent digital records that track ownership, odometer history, inspections, and verifications. Every passport is unique and follows the vehicle throughout its lifetime.'
            },
            {
              icon: Award,
              title: 'Professional Inspections',
              description: 'Multi-point inspections by certified inspectors using standardized checklists. We check everything from engine condition to EV battery health.'
            },
            {
              icon: Users,
              title: 'Verified Marketplace',
              description: 'Connect buyers and sellers with confidence. All listings are reviewed, and verified vehicles carry special badges for trust.'
            },
            {
              icon: Target,
              title: 'Complete Services',
              description: 'From valuation to financing, insurance to ownership transfer - we provide end-to-end support for every step of your vehicle journey.'
            },
          ].map((item, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl p-6">
              <item.icon className="w-10 h-10 text-blue-600 mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-gray-50 rounded-2xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Choose GadiBazar?</h2>
        <div className="space-y-4">
          {[
            { title: 'Transparency First', desc: 'Every piece of information is labeled with its verification source. You always know what\'s verified and what\'s seller-declared.' },
            { title: 'Nepal-Focused', desc: 'Built specifically for Nepal\'s market with local payment integration, district-based search, and Nepal-specific vehicle data.' },
            { title: 'Professional Standards', desc: 'Our inspections follow international standards adapted for Nepal. Every inspector is certified and supervised.' },
            { title: 'Complete Ecosystem', desc: 'We\'re not just a classifieds site. We provide valuations, inspections, financing, insurance, and ownership transfer support.' },
            { title: 'Trust & Safety', desc: 'Advanced fraud detection, risk management, and dispute resolution protect you from scams and misinformation.' },
            { title: 'EV Expertise', desc: 'Specialized knowledge and tools for electric vehicles, including battery health verification and charging infrastructure guidance.' },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-blue-600">{i + 1}</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {[
          { value: '10,000+', label: 'Vehicles Listed' },
          { value: '5,000+', label: 'Inspections Done' },
          { value: '8,000+', label: 'Happy Users' },
          { value: '50+', label: 'Service Partners' },
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 text-center">
            <p className="text-3xl font-bold text-blue-600">{stat.value}</p>
            <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Contact */}
      <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Get in Touch</h2>
        <p className="text-gray-600 mb-6">Have questions? We're here to help.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/support" className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700">
            Contact Support
          </Link>
          <a href="mailto:support@gadibazar.com" className="px-6 py-3 border border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50">
            Email Us
          </a>
        </div>
      </div>
    </div>
  );
}
