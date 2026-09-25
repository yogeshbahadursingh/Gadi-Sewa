import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Search, HelpCircle } from 'lucide-react';
import SEO, { generateBreadcrumbSchema } from '../components/SEO';
import Breadcrumb from '../components/Breadcrumb';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  // Buying
  {
    category: 'Buying',
    question: 'How do I buy a vehicle on GadiBazar?',
    answer: 'Browse listings, contact the seller, schedule a viewing, and negotiate the price. We recommend getting a professional inspection before purchase and verifying the Vehicle Passport for complete history.',
  },
  {
    category: 'Buying',
    question: 'What is a Vehicle Passport?',
    answer: 'A Vehicle Passport is a comprehensive digital record of a vehicle\'s history, including ownership records, odometer readings, inspection reports, and document verification. It follows the vehicle, not the seller, ensuring transparency across ownership changes.',
  },
  {
    category: 'Buying',
    question: 'Should I get a vehicle inspection before buying?',
    answer: 'Absolutely! A professional inspection reveals the true condition of the vehicle, including hidden issues. Our 100+ point inspection covers engine, transmission, body, electrical systems, and more. For EVs, we also check battery health and charging systems.',
  },
  {
    category: 'Buying',
    question: 'How do I verify a vehicle\'s history?',
    answer: 'Use our Vehicle Passport system to view complete ownership history, odometer records, inspection reports, and document verification. You can also book an independent inspection for additional peace of mind.',
  },
  {
    category: 'Buying',
    question: 'What payment methods are accepted?',
    answer: 'Payment methods are agreed between buyer and seller. Common methods include bank transfer, eSewa, Khalti, and cash. For high-value transactions, we recommend bank transfers with proper documentation.',
  },
  {
    category: 'Buying',
    question: 'Can I finance my vehicle purchase?',
    answer: 'Yes! We partner with leading banks and financial institutions in Nepal. Use our finance calculator to estimate EMIs and apply for pre-approval directly through our platform.',
  },

  // Selling
  {
    category: 'Selling',
    question: 'How do I list my vehicle for sale?',
    answer: 'Click "Sell" in the navigation, fill in vehicle details, upload photos, set your price, and publish. You can also book an inspection and get a Vehicle Passport to increase buyer confidence.',
  },
  {
    category: 'Selling',
    question: 'How much does it cost to sell on GadiBazar?',
    answer: 'Basic listings are free. Premium features like featured placement, inspection packages, and Vehicle Passport creation have additional costs. Check our pricing page for details.',
  },
  {
    category: 'Selling',
    question: 'How do I get the best price for my vehicle?',
    answer: 'Get a professional inspection, obtain a Vehicle Passport, take high-quality photos, write a detailed description, and price competitively. Use our valuation tool to determine market value.',
  },
  {
    category: 'Selling',
    question: 'How long does it take to sell a vehicle?',
    answer: 'Selling time varies based on vehicle condition, pricing, and market demand. Well-maintained vehicles with inspection reports and Vehicle Passports typically sell 2-3x faster.',
  },
  {
    category: 'Selling',
    question: 'Can I edit my listing after publishing?',
    answer: 'Yes, you can edit most listing details including price, description, and photos. Go to your seller dashboard and click "Edit" on the listing you want to modify.',
  },
  {
    category: 'Selling',
    question: 'How do I mark my vehicle as sold?',
    answer: 'Go to your seller dashboard, find the listing, and click "Mark as Sold". The listing will be removed from public view but preserved in your history.',
  },

  // Inspection
  {
    category: 'Inspection',
    question: 'What does a vehicle inspection include?',
    answer: 'Our standard inspection includes 100+ checkpoints: engine, transmission, brakes, suspension, electrical systems, body condition, interior, tires, and road test. EV inspections also include battery health and charging system checks.',
  },
  {
    category: 'Inspection',
    question: 'How much does an inspection cost?',
    answer: 'Inspection packages start at Rs. 3,500 for basic inspection, Rs. 5,500 for standard (100+ points), and Rs. 8,500 for premium with Vehicle Passport creation.',
  },
  {
    category: 'Inspection',
    question: 'How long does an inspection take?',
    answer: 'A standard inspection takes 2-3 hours. Premium inspections with Vehicle Passport creation may take 3-4 hours. We\'ll provide an estimated time when you book.',
  },
  {
    category: 'Inspection',
    question: 'Can I inspect a vehicle before buying?',
    answer: 'Yes! You can book an inspection for any vehicle, even if it\'s not listed on GadiBazar. This is highly recommended for high-value purchases.',
  },
  {
    category: 'Inspection',
    question: 'What if the inspection reveals problems?',
    answer: 'The inspection report will detail all findings with photos. You can use this information to negotiate the price, request repairs, or decide not to proceed with the purchase.',
  },

  // Vehicle Passport
  {
    category: 'Vehicle Passport',
    question: 'What is included in a Vehicle Passport?',
    answer: 'A Vehicle Passport includes complete ownership history, odometer readings with verification, inspection reports, document verification status, service history (if available), and risk assessment.',
  },
  {
    category: 'Vehicle Passport',
    question: 'How do I get a Vehicle Passport for my vehicle?',
    answer: 'Book a premium inspection package that includes Vehicle Passport creation. Our inspector will verify all documents, conduct a thorough inspection, and generate the passport.',
  },
  {
    category: 'Vehicle Passport',
    question: 'Does the Vehicle Passport transfer with the vehicle?',
    answer: 'Yes! The Vehicle Passport follows the vehicle, not the owner. When you sell your vehicle, the passport transfers to the new owner with complete history intact.',
  },
  {
    category: 'Vehicle Passport',
    question: 'How do I verify a Vehicle Passport?',
    answer: 'Every Vehicle Passport has a unique QR code and ID. Scan the QR code or enter the passport ID on our verification page to view the complete history.',
  },

  // EV Specific
  {
    category: 'Electric Vehicles',
    question: 'How do you check EV battery health?',
    answer: 'Our EV inspection includes battery State of Health (SOH) testing, charging system verification, range estimation, and battery management system diagnostics. We use professional diagnostic tools for accurate readings.',
  },
  {
    category: 'Electric Vehicles',
    question: 'What is battery SOH?',
    answer: 'State of Health (SOH) indicates the current capacity of the battery compared to its original capacity. A 90% SOH means the battery can hold 90% of its original charge. Higher SOH = better battery condition.',
  },
  {
    category: 'Electric Vehicles',
    question: 'Are EVs more expensive to maintain?',
    answer: 'Generally, EVs have lower maintenance costs than petrol/diesel vehicles. They have fewer moving parts, no oil changes, and regenerative braking reduces brake wear. Battery replacement is the main long-term cost.',
  },

  // Ownership Transfer
  {
    category: 'Ownership Transfer',
    question: 'How do I transfer vehicle ownership in Nepal?',
    answer: 'Visit the nearest Transport Management Office with required documents: original bluebook, citizenship copies of both parties, tax clearance receipt, and transfer fee. Both buyer and seller must be present.',
  },
  {
    category: 'Ownership Transfer',
    question: 'How much does ownership transfer cost?',
    answer: 'Transfer fees vary by vehicle type and engine capacity. Generally ranges from Rs. 5,000 to Rs. 15,000. Additional costs include tax clearance and documentation fees.',
  },
  {
    category: 'Ownership Transfer',
    question: 'How long does ownership transfer take?',
    answer: 'The process typically takes 1-3 working days if all documents are in order. Delays can occur during peak seasons or if documents need verification.',
  },

  // General
  {
    category: 'General',
    question: 'Is GadiBazar free to use?',
    answer: 'Yes, browsing and basic listings are free. Premium features like featured placement, inspection packages, and dealer subscriptions have additional costs.',
  },
  {
    category: 'General',
    question: 'How do I contact customer support?',
    answer: 'You can reach us via email at support@gadibazar.com, call +977 1-234-5678, or use the support form on our Contact page. We respond within 24 hours.',
  },
  {
    category: 'General',
    question: 'Is my personal information safe?',
    answer: 'Yes. We use industry-standard encryption and security measures. Your personal information is never shared without consent. Read our Privacy Policy for details.',
  },
  {
    category: 'General',
    question: 'Can I trust the sellers on GadiBazar?',
    answer: 'We verify all dealers and provide verification badges. For private sellers, we recommend checking their Vehicle Passport, getting an inspection, and meeting in safe public locations.',
  },
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const categories = Array.from(new Set(faqs.map(faq => faq.category)));

  const filteredFaqs = searchQuery
    ? faqs.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqs;

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
      <SEO
        title="Frequently Asked Questions - GadiBazar Nepal"
        description="Find answers to common questions about buying, selling, and inspecting vehicles on GadiBazar. Learn about Vehicle Passports, inspections, ownership transfer, and more."
        keywords="FAQ, frequently asked questions, car buying Nepal, vehicle inspection, Vehicle Passport, ownership transfer"
        canonical="https://gadibazar.com/faq"
        structuredData={generateBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'FAQ', url: '/faq' },
        ])}
      />

      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'FAQ' },
        ]}
      />

      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <HelpCircle className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Frequently Asked Questions</h1>
        <p className="text-gray-600">Find answers to common questions about GadiBazar</p>
      </div>

      {/* Search */}
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

      {/* FAQ Categories */}
      {!searchQuery && (
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(category => (
            <a
              key={category}
              href={`#${category.toLowerCase().replace(/\s+/g, '-')}`}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors"
            >
              {category}
            </a>
          ))}
        </div>
      )}

      {/* FAQ Items */}
      <div className="space-y-8">
        {categories.map(category => {
          const categoryFaqs = filteredFaqs.filter(faq => faq.category === category);
          if (categoryFaqs.length === 0) return null;

          return (
            <div key={category} id={category.toLowerCase().replace(/\s+/g, '-')}>
              <h2 className="text-xl font-bold text-gray-900 mb-4">{category}</h2>
              <div className="space-y-3">
                {categoryFaqs.map((faq, index) => {
                  const globalIndex = faqs.indexOf(faq);
                  const isOpen = openItems.has(globalIndex);

                  return (
                    <div
                      key={globalIndex}
                      className="bg-white border border-gray-200 rounded-xl overflow-hidden"
                    >
                      <button
                        onClick={() => toggleItem(globalIndex)}
                        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-medium text-gray-900 pr-4">{faq.question}</span>
                        <ChevronDown
                          className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-4">
                          <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* No Results */}
      {filteredFaqs.length === 0 && (
        <div className="text-center py-12 bg-white border border-gray-200 rounded-xl">
          <HelpCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No questions found matching your search</p>
        </div>
      )}

      {/* Contact CTA */}
      <div className="mt-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-2">Still have questions?</h2>
        <p className="text-blue-100 mb-6">
          Can't find what you're looking for? Our support team is here to help.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/contact"
            className="bg-white text-blue-600 px-6 py-3 rounded-xl font-medium hover:bg-blue-50 transition-colors"
          >
            Contact Support
          </Link>
          <Link
            to="/support"
            className="border-2 border-white text-white px-6 py-3 rounded-xl font-medium hover:bg-white/10 transition-colors"
          >
            Visit Support Center
          </Link>
        </div>
      </div>
    </div>
  );
}
