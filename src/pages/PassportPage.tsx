import { motion } from 'framer-motion';
import { Shield, CheckCircle, FileText, Camera, Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PassportPage() {
  return (
    <main className="min-h-screen bg-ivory">
      {/* Premium Cinematic Header */}
      <section className="bg-gradient-to-br from-obsidian via-obsidian-light to-obsidian relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh-luxury opacity-20"></div>
        <div className="container-luxury relative z-10 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-emerald to-emerald-light rounded-3xl mb-8 shadow-emerald">
              <Shield className="w-12 h-12 text-ivory" />
            </div>
            <span className="badge-luxury badge-emerald mb-6 inline-flex">
              <Shield className="w-4 h-4" />
              Independent Verification
            </span>
            <h1 className="font-display text-6xl md:text-7xl font-bold text-ivory mb-6 tracking-tight">
              Vehicle Passport
            </h1>
            <p className="text-xl text-ivory/70 max-w-3xl mx-auto leading-relaxed">
              Nepal's first independent digital vehicle verification system. Every passport is backed by 
              evidence-based inspection, professional quality review, and tamper-evident records.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container-luxury py-16">
        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <span className="badge-luxury badge-gold mb-4 inline-flex">
              Key Features
            </span>
            <h2 className="font-display text-4xl font-bold text-obsidian mb-4">
              Why Choose Vehicle Passport?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: FileText,
                title: '150+ Point Inspection',
                description: 'Comprehensive checklist covering engine, transmission, brakes, suspension, electrical, body, interior, and tyres.',
                color: 'from-gold/10 to-gold/5',
                iconColor: 'text-gold'
              },
              {
                icon: Camera,
                title: 'Photographic Evidence',
                description: 'Timestamped photos documenting condition, defects, odometer readings, and chassis numbers.',
                color: 'from-emerald/10 to-emerald/5',
                iconColor: 'text-emerald'
              },
              {
                icon: Award,
                title: 'Independent Review',
                description: 'Every report is independently reviewed by a quality assurance specialist before publication.',
                color: 'from-obsidian/10 to-obsidian/5',
                iconColor: 'text-obsidian'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-luxury p-8 hover:shadow-ultra transition-all duration-300"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6`}>
                  <feature.icon className={`w-8 h-8 ${feature.iconColor}`} />
                </div>
                <h3 className="font-display text-2xl font-bold text-obsidian mb-3">{feature.title}</h3>
                <p className="text-obsidian/70 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* How It Works Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="card-luxury p-12">
            <div className="text-center mb-12">
              <span className="badge-luxury badge-obsidian mb-4 inline-flex">
                Simple Process
              </span>
              <h2 className="font-display text-4xl font-bold text-obsidian mb-4">
                How It Works
              </h2>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: '01', title: 'Request', description: 'Buyer or seller requests an inspection for a vehicle.', icon: FileText },
                { step: '02', title: 'Inspect', description: 'Certified inspector conducts 150+ point examination.', icon: Camera },
                { step: '03', title: 'Review', description: 'Independent quality reviewer verifies the report.', icon: Award },
                { step: '04', title: 'Publish', description: 'Verified passport is published with unique ID and QR code.', icon: Shield }
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center relative"
                >
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-gold to-gold-dark rounded-2xl flex items-center justify-center shadow-gold">
                    <span className="font-display text-3xl font-bold text-obsidian">{item.step}</span>
                  </div>
                  <item.icon className="w-8 h-8 text-gold mx-auto mb-4" />
                  <h3 className="font-display text-xl font-bold text-obsidian mb-2">{item.title}</h3>
                  <p className="text-sm text-obsidian/70">{item.description}</p>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-10 -right-4 w-8 h-px bg-gradient-to-r from-gold to-transparent"></div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* What's Included Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="card-luxury p-12 bg-gradient-to-br from-emerald/5 to-emerald/10 border-emerald/20">
            <div className="text-center mb-12">
              <span className="badge-luxury badge-emerald mb-4 inline-flex">
                <CheckCircle className="w-4 h-4" />
                Comprehensive Coverage
              </span>
              <h2 className="font-display text-4xl font-bold text-obsidian mb-4">
                What's Included in a Passport
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
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
              ].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start gap-3 p-4 bg-white/50 rounded-xl"
                >
                  <div className="w-6 h-6 bg-emerald/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4 text-emerald" />
                  </div>
                  <span className="text-obsidian/80 font-medium">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card-obsidian p-12 text-center"
        >
          <h2 className="font-display text-4xl font-bold text-ivory mb-4">
            Ready to Get a Vehicle Passport?
          </h2>
          <p className="text-ivory/70 mb-8 max-w-2xl mx-auto text-lg">
            Whether you're buying or selling, a Vehicle Passport gives both parties confidence 
            backed by professional evidence.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/listings?passport=yes"
              className="btn-luxury btn-gold px-8 py-4 rounded-full font-semibold inline-flex items-center gap-2 group"
            >
              <span>Browse Passport Vehicles</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/listings"
              className="px-8 py-4 border-2 border-ivory/30 text-ivory font-semibold rounded-full hover:bg-ivory/10 hover:border-ivory/50 transition-all inline-flex items-center gap-2"
            >
              <span>Request Inspection</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
