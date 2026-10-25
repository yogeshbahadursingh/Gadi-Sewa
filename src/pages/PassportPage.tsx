import { motion } from 'framer-motion';
import { Shield, CheckCircle, FileText, Camera, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PassportPage() {
  return (
    <main className="min-h-screen bg-ivory pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Hero */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald/10 rounded-full mb-6">
              <Shield className="w-10 h-10 text-emerald" />
            </div>
            <h1 className="font-display text-5xl font-bold text-obsidian mb-4">
              Vehicle Passport
            </h1>
            <p className="text-xl text-obsidian/70 max-w-2xl mx-auto">
              Nepal's first independent digital vehicle verification system. Every passport is backed by 
              evidence-based inspection, professional quality review, and tamper-evident records.
            </p>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: FileText,
                title: '150+ Point Inspection',
                description: 'Comprehensive checklist covering engine, transmission, brakes, suspension, electrical, body, interior, and tyres.'
              },
              {
                icon: Camera,
                title: 'Photographic Evidence',
                description: 'Timestamped photos documenting condition, defects, odometer readings, and chassis numbers.'
              },
              {
                icon: Award,
                title: 'Independent Review',
                description: 'Every report is independently reviewed by a quality assurance specialist before publication.'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-soft p-8"
              >
                <feature.icon className="w-12 h-12 text-gold mb-4" />
                <h3 className="font-display text-xl font-bold text-obsidian mb-3">{feature.title}</h3>
                <p className="text-obsidian/70 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* How It Works */}
          <div className="bg-white rounded-2xl shadow-soft p-8 mb-16">
            <h2 className="font-display text-3xl font-bold text-obsidian mb-8 text-center">
              How It Works
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: '01', title: 'Request', description: 'Buyer or seller requests an inspection for a vehicle.' },
                { step: '02', title: 'Inspect', description: 'Certified inspector conducts 150+ point examination.' },
                { step: '03', title: 'Review', description: 'Independent quality reviewer verifies the report.' },
                { step: '04', title: 'Publish', description: 'Verified passport is published with unique ID and QR code.' }
              ].map((item, index) => (
                <div key={item.step} className="text-center">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-obsidian flex items-center justify-center">
                    <span className="font-display text-xl font-bold text-gold">{item.step}</span>
                  </div>
                  <h3 className="font-semibold text-obsidian mb-2">{item.title}</h3>
                  <p className="text-sm text-obsidian/70">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* What's Included */}
          <div className="bg-emerald/5 border border-emerald/20 rounded-2xl p-8 mb-16">
            <h2 className="font-display text-3xl font-bold text-obsidian mb-6">
              What's Included in a Passport
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                'Vehicle identity verification (chassis & engine)',
                'Odometer reading and history analysis',
                'Engine and transmission condition assessment',
                'Brakes and suspension inspection',
                'Steering and alignment check',
                'Exterior and structural condition',
                'Interior and electronics review',
                'Tyres and safety equipment check',
                'Diagnostic scan results (where available)',
                'Road test findings',
                'Service history verification',
                'Accident/repair evidence (if observed)',
                'Photographic documentation',
                'Condition grading (A-F scale)',
                'Repair recommendations',
                'Estimated repair costs'
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald flex-shrink-0 mt-0.5" />
                  <span className="text-obsidian/80">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold text-obsidian mb-4">
              Ready to Get a Vehicle Passport?
            </h2>
            <p className="text-obsidian/70 mb-8 max-w-2xl mx-auto">
              Whether you're buying or selling, a Vehicle Passport gives both parties confidence 
              backed by professional evidence.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/listings?passport=yes"
                className="px-8 py-4 bg-gradient-to-r from-gold to-gold-dark text-obsidian font-semibold rounded-full shadow-gold hover:shadow-lg transition-all"
              >
                Browse Passport Vehicles
              </Link>
              <Link
                to="/listings"
                className="px-8 py-4 border-2 border-obsidian text-obsidian font-semibold rounded-full hover:bg-obsidian hover:text-ivory transition-all"
              >
                Request Inspection
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
