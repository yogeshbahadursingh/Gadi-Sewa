import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to home
      </Link>

      <div className="bg-white border border-gray-200 rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: January 2026</p>

        <div className="prose prose-sm max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Information We Collect</h2>
            <p className="text-gray-700 leading-relaxed mb-3">We collect information you provide directly:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Account information (name, email, phone, address)</li>
              <li>Vehicle information (make, model, year, mileage, VIN)</li>
              <li>Documents (registration, insurance, citizenship)</li>
              <li>Photos and videos of vehicles</li>
              <li>Payment information (processed securely by third parties)</li>
              <li>Communication records (messages, support tickets)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. How We Use Your Information</h2>
            <p className="text-gray-700 leading-relaxed mb-3">We use your information to:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Provide and improve our services</li>
              <li>Create and manage your account</li>
              <li>Process transactions and payments</li>
              <li>Conduct vehicle inspections and create passports</li>
              <li>Facilitate communication between users</li>
              <li>Detect and prevent fraud</li>
              <li>Comply with legal obligations</li>
              <li>Send important notifications about your account</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Information Sharing</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We do not sell your personal information. We may share information with:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>Other users:</strong> Limited profile information when you interact (name, contact for transactions)</li>
              <li><strong>Service providers:</strong> Payment processors, inspection partners, hosting services</li>
              <li><strong>Legal requirements:</strong> When required by law, court order, or government authority</li>
              <li><strong>Business transfers:</strong> In connection with merger, acquisition, or sale of assets</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Vehicle Passport Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              Vehicle Passports contain both public and private information:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-3">
              <li><strong>Public:</strong> Vehicle specifications, inspection results, odometer history</li>
              <li><strong>Private:</strong> Owner identity, contact information, document copies</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-3">
              Previous owner identities are not disclosed in passports. Only current ownership is visible 
              to authorized parties. Historical ownership shows only dates, not personal details.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Data Security</h2>
            <p className="text-gray-700 leading-relaxed">
              We implement industry-standard security measures to protect your information:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-3">
              <li>Encryption in transit (HTTPS/TLS)</li>
              <li>Encryption at rest for sensitive data</li>
              <li>Secure document storage with access controls</li>
              <li>Regular security audits and penetration testing</li>
              <li>Employee access controls and training</li>
              <li>Two-factor authentication available</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Document Storage</h2>
            <p className="text-gray-700 leading-relaxed">
              Uploaded documents (citizenship, registration, insurance) are stored securely with:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-3">
              <li>Encrypted storage with restricted access</li>
              <li>Signed URLs for temporary access only</li>
              <li>Audit logs of all document access</li>
              <li>Automatic deletion after retention period</li>
              <li>Option to request early deletion</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Your Rights</h2>
            <p className="text-gray-700 leading-relaxed mb-3">You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your account and data</li>
              <li>Opt out of marketing communications</li>
              <li>Export your data in a portable format</li>
              <li>Lodge complaints with data protection authorities</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Data Retention</h2>
            <p className="text-gray-700 leading-relaxed">
              We retain information for different periods:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-3">
              <li><strong>Account data:</strong> Until account deletion + 30 days</li>
              <li><strong>Vehicle passports:</strong> Permanently (historical record)</li>
              <li><strong>Transaction records:</strong> 7 years (legal requirement)</li>
              <li><strong>Documents:</strong> Until deletion request or 5 years</li>
              <li><strong>Messages:</strong> 2 years after last activity</li>
              <li><strong>Inspection reports:</strong> Permanently (vehicle history)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Cookies and Tracking</h2>
            <p className="text-gray-700 leading-relaxed">
              We use cookies and similar technologies to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-3">
              <li>Maintain your session and authentication</li>
              <li>Remember your preferences</li>
              <li>Analyze usage patterns and improve services</li>
              <li>Provide personalized recommendations</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-3">
              You can control cookies through your browser settings. Disabling cookies may limit functionality.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Children's Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              Our platform is not intended for users under 18 years of age. We do not knowingly collect 
              information from children. If you believe a child has provided us with information, please 
              contact us and we will delete it.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">11. International Transfers</h2>
            <p className="text-gray-700 leading-relaxed">
              Your information may be transferred to and processed in countries other than Nepal. We ensure 
              appropriate safeguards are in place to protect your information in accordance with this policy 
              and applicable laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">12. Changes to This Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this privacy policy from time to time. We will notify you of significant changes 
              by email or through the platform. Continued use after changes constitutes acceptance.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">13. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed">
              For privacy-related questions or requests:<br />
              Email: privacy@gadibazar.com<br />
              Phone: +977-1-XXXXXXX<br />
              Address: Kathmandu, Nepal
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
