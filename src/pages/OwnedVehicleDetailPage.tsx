import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Wrench, FileText, DollarSign, Bell, Plus, Edit, Trash2, Car, MapPin, Calendar } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';

export default function OwnedVehicleDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [vehicle, setVehicle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'maintenance' | 'documents' | 'expenses' | 'reminders'>('overview');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    loadVehicle();
  }, [isAuthenticated, id]);

  const loadVehicle = async () => {
    try {
      const vehicles = await api.getMyOwnedVehicles();
      const found = vehicles.find((v: any) => v.id === id);
      setVehicle(found);
    } catch (error) {
      console.error('Failed to load vehicle:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to remove this vehicle from your garage?')) return;
    
    try {
      await api.deleteOwnedVehicle(id!);
      navigate('/garage');
    } catch (error) {
      alert('Failed to delete vehicle');
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-ivory pt-20 flex items-center justify-center">
        <p className="text-obsidian/70">Loading vehicle...</p>
      </main>
    );
  }

  if (!vehicle) {
    return (
      <main className="min-h-screen bg-ivory pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-obsidian mb-4">Vehicle Not Found</h1>
          <Link to="/garage" className="px-6 py-3 bg-obsidian text-ivory rounded-full">
            Back to Garage
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-ivory">
      {/* Premium Header */}
      <section className="bg-gradient-to-br from-obsidian via-obsidian-light to-obsidian relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh-luxury opacity-20"></div>
        <div className="container-luxury relative z-10 py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <button
              onClick={() => navigate('/garage')}
              className="flex items-center gap-2 text-ivory/60 hover:text-ivory mb-6 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Back to Garage</span>
            </button>

            <div className="flex items-start justify-between gap-6">
              <div className="flex-1">
                <span className="badge-luxury badge-gold mb-4 inline-flex">
                  <Car className="w-4 h-4" />
                  Vehicle Details
                </span>
                <h1 className="font-display text-5xl md:text-6xl font-bold text-ivory mb-2 tracking-tight">
                  {vehicle.year} {vehicle.make} {vehicle.model}
                </h1>
                {vehicle.registrationNumber && (
                  <p className="text-xl text-ivory/70 font-mono">{vehicle.registrationNumber}</p>
                )}
              </div>
              <button
                onClick={handleDelete}
                className="p-3 bg-white/10 backdrop-blur-sm text-red-400 hover:bg-red-500/20 rounded-full transition-all"
                aria-label="Delete vehicle"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container-luxury py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Tabs */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {[
              { id: 'overview', label: 'Overview', icon: FileText },
              { id: 'maintenance', label: 'Maintenance', icon: Wrench },
              { id: 'documents', label: 'Documents', icon: FileText },
              { id: 'expenses', label: 'Expenses', icon: DollarSign },
              { id: 'reminders', label: 'Reminders', icon: Bell }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-obsidian text-ivory shadow-medium'
                    : 'bg-white text-obsidian/70 hover:bg-obsidian/5'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="card-luxury p-8">
              <h2 className="font-display text-2xl font-bold text-obsidian mb-6 flex items-center gap-3">
                <div className="w-1 h-8 bg-gradient-to-b from-gold to-gold-dark rounded-full"></div>
                Vehicle Information
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-obsidian/60 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Car className="w-4 h-4 text-gold" />
                    Basic Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-obsidian/5">
                      <span className="text-obsidian/70">Make:</span>
                      <span className="font-semibold text-obsidian">{vehicle.make}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-obsidian/5">
                      <span className="text-obsidian/70">Model:</span>
                      <span className="font-semibold text-obsidian">{vehicle.model}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-obsidian/5">
                      <span className="text-obsidian/70">Year:</span>
                      <span className="font-semibold text-obsidian">{vehicle.year}</span>
                    </div>
                    {vehicle.registrationNumber && (
                      <div className="flex justify-between py-2 border-b border-obsidian/5">
                        <span className="text-obsidian/70">Registration:</span>
                        <span className="font-semibold text-obsidian font-mono">{vehicle.registrationNumber}</span>
                      </div>
                    )}
                    {vehicle.vin && (
                      <div className="flex justify-between py-2">
                        <span className="text-obsidian/70">VIN:</span>
                        <span className="font-semibold text-obsidian font-mono text-sm">{vehicle.vin}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-obsidian/60 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gold" />
                    Ownership
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-obsidian/5">
                      <span className="text-obsidian/70">Current Mileage:</span>
                      <span className="font-semibold text-obsidian">{vehicle.currentMileage.toLocaleString()} km</span>
                    </div>
                    {vehicle.purchaseDate && (
                      <div className="flex justify-between py-2 border-b border-obsidian/5">
                        <span className="text-obsidian/70">Purchase Date:</span>
                        <span className="font-semibold text-obsidian">{new Date(vehicle.purchaseDate).toLocaleDateString()}</span>
                      </div>
                    )}
                    {vehicle.purchasePrice && (
                      <div className="flex justify-between py-2 border-b border-obsidian/5">
                        <span className="text-obsidian/70">Purchase Price:</span>
                        <span className="font-semibold text-obsidian">रू {vehicle.purchasePrice.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between py-2">
                      <span className="text-obsidian/70">Status:</span>
                      <span className={`badge-luxury ${
                        vehicle.status === 'ACTIVE' ? 'badge-emerald' : 'badge-obsidian'
                      } text-xs`}>
                        {vehicle.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'maintenance' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl font-bold text-obsidian flex items-center gap-3">
                  <div className="w-1 h-8 bg-gradient-to-b from-gold to-gold-dark rounded-full"></div>
                  Maintenance Records
                </h2>
                <button className="btn-luxury btn-gold px-6 py-3 rounded-xl font-semibold flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add Record
                </button>
              </div>
              {vehicle.maintenanceRecords?.length === 0 ? (
                <div className="card-luxury p-12 text-center">
                  <div className="w-20 h-20 mx-auto mb-6 bg-obsidian/5 rounded-full flex items-center justify-center">
                    <Wrench className="w-10 h-10 text-obsidian/20" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-obsidian mb-3">No maintenance records</h3>
                  <p className="text-obsidian/70">Add your first service record to track maintenance history</p>
                </div>
              ) : (
                <div className="space-y-4 stagger-children">
                  {vehicle.maintenanceRecords?.map((record: any, index: number) => (
                    <motion.div
                      key={record.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="card-luxury p-6 hover:shadow-ultra transition-all duration-300"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-obsidian text-lg">{record.serviceType}</h3>
                          <p className="text-sm text-obsidian/70 flex items-center gap-2 mt-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(record.serviceDate).toLocaleDateString()}
                          </p>
                        </div>
                        {record.cost && (
                          <span className="text-xl font-bold text-gradient-gold">रू {record.cost.toLocaleString()}</span>
                        )}
                      </div>
                      {record.description && (
                        <p className="text-sm text-obsidian/70 mb-2">{record.description}</p>
                      )}
                      {record.mileageAtService && (
                        <p className="text-xs text-obsidian/70 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          Mileage: {record.mileageAtService.toLocaleString()} km
                        </p>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'documents' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl font-bold text-obsidian flex items-center gap-3">
                  <div className="w-1 h-8 bg-gradient-to-b from-gold to-gold-dark rounded-full"></div>
                  Documents
                </h2>
                <button className="btn-luxury btn-gold px-6 py-3 rounded-xl font-semibold flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Upload Document
                </button>
              </div>
              {vehicle.documents?.length === 0 ? (
                <div className="card-luxury p-12 text-center">
                  <div className="w-20 h-20 mx-auto mb-6 bg-obsidian/5 rounded-full flex items-center justify-center">
                    <FileText className="w-10 h-10 text-obsidian/20" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-obsidian mb-3">No documents</h3>
                  <p className="text-obsidian/70">Upload your vehicle documents for safe keeping</p>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger-children">
                  {vehicle.documents?.map((doc: any, index: number) => (
                    <motion.div
                      key={doc.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="card-luxury p-5 hover:shadow-ultra transition-all duration-300"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-gold/10 to-gold/5 rounded-xl flex items-center justify-center flex-shrink-0">
                          <FileText className="w-6 h-6 text-gold" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-obsidian truncate">{doc.title}</h3>
                          <span className="badge-luxury badge-gold text-xs mt-1 inline-block">
                            {doc.documentType}
                          </span>
                        </div>
                      </div>
                      {doc.expiryDate && (
                        <p className="text-xs text-obsidian/70 flex items-center gap-1 pt-3 border-t border-obsidian/5">
                          <Calendar className="w-3 h-3" />
                          Expires: {new Date(doc.expiryDate).toLocaleDateString()}
                        </p>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'expenses' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl font-bold text-obsidian flex items-center gap-3">
                  <div className="w-1 h-8 bg-gradient-to-b from-gold to-gold-dark rounded-full"></div>
                  Expenses
                </h2>
                <button className="btn-luxury btn-gold px-6 py-3 rounded-xl font-semibold flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add Expense
                </button>
              </div>
              {vehicle.expenses?.length === 0 ? (
                <div className="card-luxury p-12 text-center">
                  <div className="w-20 h-20 mx-auto mb-6 bg-obsidian/5 rounded-full flex items-center justify-center">
                    <DollarSign className="w-10 h-10 text-obsidian/20" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-obsidian mb-3">No expenses</h3>
                  <p className="text-obsidian/70">Track your vehicle expenses to monitor costs</p>
                </div>
              ) : (
                <div className="space-y-3 stagger-children">
                  {vehicle.expenses?.map((expense: any, index: number) => (
                    <motion.div
                      key={expense.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="card-luxury p-5 hover:shadow-ultra transition-all duration-300"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-obsidian text-lg">{expense.expenseType}</h3>
                          <p className="text-sm text-obsidian/70 flex items-center gap-2 mt-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(expense.date).toLocaleDateString()}
                          </p>
                        </div>
                        <span className="text-xl font-bold text-gradient-gold">रू {expense.amount.toLocaleString()}</span>
                      </div>
                      {expense.description && (
                        <p className="text-sm text-obsidian/70 mt-2">{expense.description}</p>
                      )}
                      {expense.vendor && (
                        <p className="text-xs text-obsidian/70 mt-2 pt-2 border-t border-obsidian/5">
                          Vendor: {expense.vendor}
                        </p>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'reminders' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl font-bold text-obsidian flex items-center gap-3">
                  <div className="w-1 h-8 bg-gradient-to-b from-gold to-gold-dark rounded-full"></div>
                  Reminders
                </h2>
                <button className="btn-luxury btn-gold px-6 py-3 rounded-xl font-semibold flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add Reminder
                </button>
              </div>
              {vehicle.reminders?.length === 0 ? (
                <div className="card-luxury p-12 text-center">
                  <div className="w-20 h-20 mx-auto mb-6 bg-obsidian/5 rounded-full flex items-center justify-center">
                    <Bell className="w-10 h-10 text-obsidian/20" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-obsidian mb-3">No reminders</h3>
                  <p className="text-obsidian/70">Set reminders for service, insurance, tax, and more</p>
                </div>
              ) : (
                <div className="space-y-3 stagger-children">
                  {vehicle.reminders?.map((reminder: any, index: number) => (
                    <motion.div
                      key={reminder.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`card-luxury p-5 hover:shadow-ultra transition-all duration-300 ${
                        reminder.status === 'COMPLETED' ? 'opacity-60' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-start gap-3">
                          {reminder.status === 'COMPLETED' ? (
                            <div className="w-6 h-6 rounded-full bg-emerald/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <div className="w-3 h-3 rounded-full bg-emerald"></div>
                            </div>
                          ) : (
                            <div className="w-6 h-6 bg-gradient-to-br from-gold/10 to-gold/5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Bell className="w-4 h-4 text-gold" />
                            </div>
                          )}
                          <div>
                            <h3 className="font-semibold text-obsidian text-lg">{reminder.title}</h3>
                            <span className="badge-luxury badge-gold text-xs mt-1 inline-block">
                              {reminder.reminderType}
                            </span>
                          </div>
                        </div>
                        {reminder.status === 'PENDING' && (
                          <button className="px-4 py-2 text-xs font-semibold text-emerald hover:text-emerald-light transition-colors border border-emerald/20 rounded-lg hover:bg-emerald/5">
                            Mark Complete
                          </button>
                        )}
                      </div>
                      {reminder.description && (
                        <p className="text-sm text-obsidian/70 mt-3">{reminder.description}</p>
                      )}
                      {reminder.dueDate && (
                        <p className="text-xs text-obsidian/70 mt-3 pt-3 border-t border-obsidian/5 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Due: {new Date(reminder.dueDate).toLocaleDateString()}
                        </p>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </main>
  );
}
