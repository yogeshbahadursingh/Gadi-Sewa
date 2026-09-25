import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to home
      </Link>

      <div className="bg-white border border-gray-200 rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Service</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: January 2026</p>

        <div className="prose prose-sm max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              By accessing or using GadiBazar ("Platform"), you agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use our services. We reserve the right to 
              modify these terms at any time, and your continued use constitutes acceptance of any modifications.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Eligibility</h2>
            <p className="text-gray-700 leading-relaxed">
              You must be at least 18 years old and have the legal capacity to enter into binding agreements 
              to use our platform. By creating an account, you represent and warrant that you meet these 
              requirements and that all information you provide is accurate and complete.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. User Accounts</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              You are responsible for maintaining the confidentiality of your account credentials and for 
              all activities that occur under your account. You must:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Provide accurate and complete registration information</li>
              <li>Update your information to keep it current</li>
              <li>Notify us immediately of any unauthorized access</li>
              <li>Not share your account with others</li>
              <li>Not create multiple accounts for the same purpose</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Listings and Content</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              When creating listings or uploading content, you agree that:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>You have the legal right to sell or represent the vehicle</li>
              <li>All information provided is accurate and not misleading</li>
              <li>Photos are original or you have permission to use them</li>
              <li>You will not list stolen or illegally obtained vehicles</li>
              <li>You will not engage in price manipulation or fake bidding</li>
              <li>You understand that false information may result in account suspension</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Vehicle Inspections</h2>
            <p className="text-gray-700 leading-relaxed">
              Our inspection services provide professional assessments based on visual inspection and 
              diagnostic testing at the time of inspection. Inspections do not guarantee future performance 
              or reveal hidden defects. Inspection reports reflect conditions at the time of inspection only. 
              We are not liable for issues that develop after the inspection date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Vehicle Passports</h2>
            <p className="text-gray-700 leading-relaxed">
              Vehicle Passports are permanent records that track vehicle history. Information in passports 
              is gathered from various sources with different verification levels. We clearly label the 
              verification source for each data point. Passports cannot be deleted but can be corrected 
              through our audit process if errors are identified.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Transactions</h2>
            <p className="text-gray-700 leading-relaxed">
              GadiBazar facilitates connections between buyers and sellers but is not a party to any 
              vehicle sale transactions. You are responsible for:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-3">
              <li>Conducting your own due diligence before purchase</li>
              <li>Verifying vehicle documents and ownership</li>
              <li>Completing proper ownership transfer procedures</li>
              <li>Paying applicable taxes and fees</li>
              <li>Resolving any disputes directly with the other party</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Prohibited Activities</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              You agree not to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Use the platform for any illegal purposes</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Upload viruses or malicious code</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Scrape or collect data without permission</li>
              <li>Impersonate others or create fake identities</li>
              <li>Manipulate search results or ratings</li>
              <li>Use automated systems to access the platform</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Fees and Payments</h2>
            <p className="text-gray-700 leading-relaxed">
              Certain services require payment, including premium listings, inspection services, and 
              dealer subscriptions. All fees are clearly displayed before purchase. Payments are processed 
              through secure third-party providers (eSewa, Khalti, bank transfer). Refund policies vary 
              by service and are specified at the time of purchase.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed">
              To the maximum extent permitted by law, GadiBazar shall not be liable for any indirect, 
              incidental, special, consequential, or punitive damages, including but not limited to loss 
              of profits, data, or goodwill, arising from your use of the platform or any transactions 
              conducted through it. Our total liability shall not exceed the amount you paid to us in 
              the 12 months preceding the claim.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">11. Dispute Resolution</h2>
            <p className="text-gray-700 leading-relaxed">
              Any disputes arising from these terms or your use of the platform shall first be attempted 
              to be resolved through our support team. If unresolved, disputes shall be submitted to 
              mediation in Kathmandu, Nepal. If mediation fails, disputes shall be resolved through 
              arbitration under the rules of the Nepal Arbitration Association.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">12. Governing Law</h2>
            <p className="text-gray-700 leading-relaxed">
              These terms shall be governed by and construed in accordance with the laws of Nepal. 
              Any legal proceedings shall be subject to the exclusive jurisdiction of the courts in 
              Kathmandu, Nepal.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">13. Contact Information</h2>
            <p className="text-gray-700 leading-relaxed">
              For questions about these terms, please contact us at:<br />
              Email: legal@gadibazar.com<br />
              Phone: +977-1-XXXXXXX<br />
              Address: Kathmandu, Nepal
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
