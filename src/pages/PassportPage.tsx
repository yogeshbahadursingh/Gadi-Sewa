import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ShieldCheck, Shield, FileText, Camera, Fingerprint, QrCode,
  CheckCircle2, ArrowRight, Clock, Eye, Lock, RefreshCw,
  AlertTriangle, BadgeCheck, ScanLine, ClipboardCheck
} from 'lucide-react';

export default function PassportPage() {
  return (
    <main className="min-h-screen bg-ivory pt-20 lg:pt-24">
      {/* Hero */}
      <section className="relative py-20 lg:py-32 overflow-hidden bg-obsidian">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-96 h-96 bg-emerald rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gold rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald/20 border border-emerald/30 rounded-full text-emerald-light text-xs font-medium mb-6">
                <ShieldCheck className="w-3.5 h-3.5" />
                Flagship Trust Product
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-ivory leading-tight mb-6"
            >
              The Gadi-Sewa
              <br />
              <span className="text-gradient-gold">Vehicle Passport</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-ivory/60 leading-relaxed mb-10 max-w-2xl"
            >
              Nepal's first independent digital vehicle verification system. Every passport is backed by 
              evidence-based inspection, professional quality review, and tamper-evident records. 
              Know exactly what you're buying.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/inspect"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-obsidian text-sm font-bold rounded-full hover:bg-gold-light transition-colors"
              >
                Book an Inspection <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/listings?passport=yes"
                className="inline-flex items-center gap-2 px-8 py-4 border border-ivory/20 text-ivory text-sm font-medium rounded-full hover:border-gold/40 transition-colors"
              >
                Browse Verified Vehicles
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 lg:py-28 bg-ivory">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-xs font-semibold text-gold uppercase tracking-wider">Comprehensive Report</span>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-obsidian mt-2">
              What's in a Vehicle Passport
            </h2>
            <p className="text-slate-warm mt-3 max-w-lg mx-auto">
              Every passport contains detailed, evidence-backed findings from a professional inspection.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Fingerprint className="w-6 h-6" />,
                title: 'Vehicle Identity',
                description: 'Chassis and engine number verification against documentation.'
              },
              {
                icon: <ClipboardCheck className="w-6 h-6" />,
                title: '150+ Point Inspection',
                description: 'Engine, transmission, brakes, suspension, steering, electrical systems and more.'
              },
              {
                icon: <Camera className="w-6 h-6" />,
                title: 'Photographic Evidence',
                description: 'Timestamped photos documenting condition, defects and odometer readings.'
              },
              {
                icon: <FileText className="w-6 h-6" />,
                title: 'Document Verification',
                description: 'Bluebook, ownership documents and registration status review.'
              },
              {
                icon: <ScanLine className="w-6 h-6" />,
                title: 'Diagnostics',
                description: 'OBD diagnostic scan results where available for modern vehicles.'
              },
              {
                icon: <BadgeCheck className="w-6 h-6" />,
                title: 'Condition Grading',
                description: 'Professional grading of exterior, interior, mechanical and electrical condition.'
              },
              {
                icon: <Clock className="w-6 h-6" />,
                title: 'Service History',
                description: 'Available service records with source attribution and completeness assessment.'
              },
              {
                icon: <AlertTriangle className="w-6 h-6" />,
                title: 'Safety Findings',
                description: 'Critical safety issues clearly highlighted with severity ratings.'
              },
              {
                icon: <QrCode className="w-6 h-6" />,
                title: 'QR Verification',
                description: 'Instant verification via QR code for authenticity confirmation.'
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-white rounded-2xl border border-obsidian/[0.04] p-6 hover:border-gold/20 hover:shadow-[var(--shadow-gold)] transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald/10 flex items-center justify-center text-emerald mb-4">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-obsidian mb-2">{item.title}</h3>
                <p className="text-sm text-slate-warm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrity */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-xs font-semibold text-gold uppercase tracking-wider">Trust & Integrity</span>
                <h2 className="font-display text-3xl lg:text-4xl font-bold text-obsidian mt-2 mb-6">
                  Built on Evidence,
                  <br />Not Assumptions
                </h2>
                <p className="text-slate-warm leading-relaxed mb-8">
                  A Vehicle Passport never invents information. It clearly distinguishes between 
                  seller-supplied claims, inspector observations, evidence-backed findings, and 
                  independently verified records. What isn't known is stated as unavailable.
                </p>
              </motion.div>

              <div className="space-y-4">
                {[
                  { icon: <Lock className="w-4 h-4" />, text: 'Tamper-evident audit logging' },
                  { icon: <Eye className="w-4 h-4" />, text: 'Independent quality review before publication' },
                  { icon: <RefreshCw className="w-4 h-4" />, text: 'Freshness warnings for aging reports' },
                  { icon: <ShieldCheck className="w-4 h-4" />, text: 'Inspector accountability and segregation of duties' },
                  { icon: <FileText className="w-4 h-4" />, text: 'Immutable published report versions' },
                ].map((item, i) => (
                  <motion.div
                    key={item.text}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center text-gold flex-shrink-0">
                      {item.icon}
                    </div>
                    <span className="text-sm text-obsidian/70">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Visual */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="bg-obsidian rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gold/5 rounded-full blur-2xl" />
                
                {/* Sample passport preview */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald/20 flex items-center justify-center">
                        <ShieldCheck className="w-5 h-5 text-emerald-light" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-ivory">Vehicle Passport</p>
                        <p className="text-xs text-ivory/40 font-mono">GS-VP-2024-00847</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 bg-emerald/20 text-emerald-light text-[11px] font-semibold rounded-full">
                      Published
                    </span>
                  </div>

                  {/* Condition Summary */}
                  <div className="bg-obsidian-light/50 rounded-xl p-4">
                    <p className="text-xs text-ivory/40 mb-3">Condition Summary</p>
                    <div className="space-y-2">
                      {[
                        { label: 'Engine & Transmission', grade: 'A', color: 'text-emerald-light' },
                        { label: 'Exterior & Body', grade: 'A-', color: 'text-emerald-light' },
                        { label: 'Interior & Electronics', grade: 'A', color: 'text-emerald-light' },
                        { label: 'Brakes & Safety', grade: 'B+', color: 'text-gold' },
                        { label: 'Tyres', grade: 'B', color: 'text-gold' },
                      ].map((item) => (
                        <div key={item.label} className="flex items-center justify-between">
                          <span className="text-xs text-ivory/60">{item.label}</span>
                          <span className={`text-sm font-bold ${item.color}`}>{item.grade}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Findings */}
                  <div className="bg-obsidian-light/50 rounded-xl p-4">
                    <p className="text-xs text-ivory/40 mb-3">Key Findings</p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-light mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-ivory/60">No structural damage observed</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-light mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-ivory/60">Odometer consistent with condition</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-400 mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-ivory/60">Minor tyre wear — recommend replacement within 5,000 km</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[10px] text-ivory/30">Inspector: Certified Gadi-Sewa Inspector</span>
                    <span className="text-[10px] text-ivory/30">15 Nov 2024</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 lg:py-28 bg-ivory">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-xs font-semibold text-gold uppercase tracking-wider">The Process</span>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-obsidian mt-2">
              How a Passport is Created
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                title: 'Book',
                description: 'Request an inspection for any vehicle. Choose a time and location convenient for you.'
              },
              {
                step: '2',
                title: 'Inspect',
                description: 'A certified inspector conducts a thorough 150+ point examination with photographic evidence.'
              },
              {
                step: '3',
                title: 'Review',
                description: 'An independent quality reviewer verifies the report for accuracy, completeness and consistency.'
              },
              {
                step: '4',
                title: 'Publish',
                description: 'The verified Vehicle Passport is published with a unique ID and QR code for instant verification.'
              }
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.15 }}
                className="relative text-center"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-obsidian flex items-center justify-center">
                  <span className="font-display text-xl font-bold text-gold">{item.step}</span>
                </div>
                {i < 3 && (
                  <div className="hidden md:block absolute top-7 left-[60%] w-[80%] h-[1px] bg-gradient-to-r from-gold/30 to-transparent" />
                )}
                <h3 className="font-semibold text-obsidian mb-2">{item.title}</h3>
                <p className="text-sm text-slate-warm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-obsidian">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <ShieldCheck className="w-12 h-12 text-emerald-light mx-auto mb-6" />
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-ivory mb-4">
              Get Your Vehicle Passport Today
            </h2>
            <p className="text-ivory/60 max-w-lg mx-auto mb-8">
              Whether you're buying or selling, a Vehicle Passport gives both parties confidence 
              backed by professional evidence.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/inspect"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-obsidian text-sm font-bold rounded-full hover:bg-gold-light transition-colors"
              >
                Book an Inspection <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/listings?passport=yes"
                className="inline-flex items-center gap-2 px-8 py-4 border border-ivory/20 text-ivory text-sm font-medium rounded-full hover:border-gold/40 transition-colors"
              >
                Browse Passport Vehicles
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
