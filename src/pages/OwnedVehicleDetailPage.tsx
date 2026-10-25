import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Wrench, FileText, DollarSign, Bell, Plus, Edit, Trash2 } from 'lucide-react';
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
    <main className="min-h-screen bg-ivory pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <button
                onClick={() => navigate('/garage')}
                className="flex items-center gap-2 text-obsidian/60 hover:text-obsidian mb-4 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="text-sm font-medium">Back to Garage</span>
              </button>
              <h1 className="font-display text-4xl font-bold text-obsidian">
                {vehicle.year} {vehicle.make} {vehicle.model}
              </h1>
              {vehicle.registrationNumber && (
                <p className="text-obsidian/70 mt-1">{vehicle.registrationNumber}</p>
              )}
            </div>
            <button
              onClick={handleDelete}
              className="p-3 text-red-500 hover:bg-red-50 rounded-full transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>

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
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.id ? 'bg-obsidian text-ivory' : 'bg-white text-obsidian/70 hover:bg-obsidian/5'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="bg-white rounded-2xl shadow-soft p-8">
              <h2 className="font-display text-2xl font-bold text-obsidian mb-6">Vehicle Information</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-obsidian/60 uppercase tracking-wider mb-3">Basic Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-obsidian/70">Make:</span>
                      <span className="font-medium text-obsidian">{vehicle.make}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-obsidian/70">Model:</span>
                      <span className="font-medium text-obsidian">{vehicle.model}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-obsidian/70">Year:</span>
                      <span className="font-medium text-obsidian">{vehicle.year}</span>
                    </div>
                    {vehicle.registrationNumber && (
                      <div className="flex justify-between">
                        <span className="text-obsidian/70">Registration:</span>
                        <span className="font-medium text-obsidian">{vehicle.registrationNumber}</span>
                      </div>
                    )}
                    {vehicle.vin && (
                      <div className="flex justify-between">
                        <span className="text-obsidian/70">VIN:</span>
                        <span className="font-medium text-obsidian font-mono text-sm">{vehicle.vin}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-obsidian/60 uppercase tracking-wider mb-3">Ownership</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-obsidian/70">Current Mileage:</span>
                      <span className="font-medium text-obsidian">{vehicle.currentMileage.toLocaleString()} km</span>
                    </div>
                    {vehicle.purchaseDate && (
                      <div className="flex justify-between">
                        <span className="text-obsidian/70">Purchase Date:</span>
                        <span className="font-medium text-obsidian">{new Date(vehicle.purchaseDate).toLocaleDateString()}</span>
                      </div>
                    )}
                    {vehicle.purchasePrice && (
                      <div className="flex justify-between">
                        <span className="text-obsidian/70">Purchase Price:</span>
                        <span className="font-medium text-obsidian">रू {vehicle.purchasePrice.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-obsidian/70">Status:</span>
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                        vehicle.status === 'ACTIVE' ? 'bg-emerald/10 text-emerald' : 'bg-obsidian/10 text-obsidian/60'
                      }`}>
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
                <h2 className="font-display text-2xl font-bold text-obsidian">Maintenance Records</h2>
                <button className="flex items-center gap-2 px-4 py-2 bg-obsidian text-ivory text-sm font-medium rounded-xl hover:bg-obsidian-light transition-colors">
                  <Plus className="w-4 h-4" />
                  Add Record
                </button>
              </div>
              {vehicle.maintenanceRecords?.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-soft p-12 text-center">
                  <Wrench className="w-16 h-16 text-obsidian/10 mx-auto mb-4" />
                  <h3 className="font-display text-xl font-bold text-obsidian mb-2">No maintenance records</h3>
                  <p className="text-obsidian/70">Add your first service record to track maintenance history</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {vehicle.maintenanceRecords?.map((record: any) => (
                    <div key={record.id} className="bg-white rounded-2xl shadow-soft p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-obsidian">{record.serviceType}</h3>
                          <p className="text-sm text-obsidian/70">{new Date(record.serviceDate).toLocaleDateString()}</p>
                        </div>
                        {record.cost && (
                          <span className="text-lg font-bold text-obsidian">रू {record.cost.toLocaleString()}</span>
                        )}
                      </div>
                      {record.description && (
                        <p className="text-sm text-obsidian/70 mb-2">{record.description}</p>
                      )}
                      {record.mileageAtService && (
                        <p className="text-xs text-obsidian/70">Mileage: {record.mileageAtService.toLocaleString()} km</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'documents' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl font-bold text-obsidian">Documents</h2>
                <button className="flex items-center gap-2 px-4 py-2 bg-obsidian text-ivory text-sm font-medium rounded-xl hover:bg-obsidian-light transition-colors">
                  <Plus className="w-4 h-4" />
                  Upload Document
                </button>
              </div>
              {vehicle.documents?.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-soft p-12 text-center">
                  <FileText className="w-16 h-16 text-obsidian/10 mx-auto mb-4" />
                  <h3 className="font-display text-xl font-bold text-obsidian mb-2">No documents</h3>
                  <p className="text-obsidian/70">Upload your vehicle documents for safe keeping</p>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {vehicle.documents?.map((doc: any) => (
                    <div key={doc.id} className="bg-white rounded-2xl shadow-soft p-5">
                      <div className="flex items-start gap-3 mb-3">
                        <FileText className="w-8 h-8 text-gold flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-obsidian truncate">{doc.title}</h3>
                          <p className="text-xs text-obsidian/70">{doc.documentType}</p>
                        </div>
                      </div>
                      {doc.expiryDate && (
                        <p className="text-xs text-obsidian/70">
                          Expires: {new Date(doc.expiryDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'expenses' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl font-bold text-obsidian">Expenses</h2>
                <button className="flex items-center gap-2 px-4 py-2 bg-obsidian text-ivory text-sm font-medium rounded-xl hover:bg-obsidian-light transition-colors">
                  <Plus className="w-4 h-4" />
                  Add Expense
                </button>
              </div>
              {vehicle.expenses?.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-soft p-12 text-center">
                  <DollarSign className="w-16 h-16 text-obsidian/10 mx-auto mb-4" />
                  <h3 className="font-display text-xl font-bold text-obsidian mb-2">No expenses</h3>
                  <p className="text-obsidian/70">Track your vehicle expenses to monitor costs</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {vehicle.expenses?.map((expense: any) => (
                    <div key={expense.id} className="bg-white rounded-2xl shadow-soft p-5">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-obsidian">{expense.expenseType}</h3>
                          <p className="text-sm text-obsidian/70">{new Date(expense.date).toLocaleDateString()}</p>
                        </div>
                        <span className="text-lg font-bold text-obsidian">रू {expense.amount.toLocaleString()}</span>
                      </div>
                      {expense.description && (
                        <p className="text-sm text-obsidian/70">{expense.description}</p>
                      )}
                      {expense.vendor && (
                        <p className="text-xs text-obsidian/70 mt-1">Vendor: {expense.vendor}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'reminders' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl font-bold text-obsidian">Reminders</h2>
                <button className="flex items-center gap-2 px-4 py-2 bg-obsidian text-ivory text-sm font-medium rounded-xl hover:bg-obsidian-light transition-colors">
                  <Plus className="w-4 h-4" />
                  Add Reminder
                </button>
              </div>
              {vehicle.reminders?.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-soft p-12 text-center">
                  <Bell className="w-16 h-16 text-obsidian/10 mx-auto mb-4" />
                  <h3 className="font-display text-xl font-bold text-obsidian mb-2">No reminders</h3>
                  <p className="text-obsidian/70">Set reminders for service, insurance, tax, and more</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {vehicle.reminders?.map((reminder: any) => (
                    <div key={reminder.id} className={`bg-white rounded-2xl shadow-soft p-5 ${
                      reminder.status === 'COMPLETED' ? 'opacity-60' : ''
                    }`}>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-start gap-3">
                          {reminder.status === 'COMPLETED' ? (
                            <div className="w-5 h-5 rounded-full bg-emerald/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <div className="w-2 h-2 rounded-full bg-emerald"></div>
                            </div>
                          ) : (
                            <Bell className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                          )}
                          <div>
                            <h3 className="font-semibold text-obsidian">{reminder.title}</h3>
                            <p className="text-xs text-obsidian/70">{reminder.reminderType}</p>
                          </div>
                        </div>
                        {reminder.status === 'PENDING' && (
                          <button className="px-3 py-1 text-xs font-medium text-emerald hover:text-emerald-light transition-colors">
                            Mark Complete
                          </button>
                        )}
                      </div>
                      {reminder.description && (
                        <p className="text-sm text-obsidian/70 mb-2">{reminder.description}</p>
                      )}
                      {reminder.dueDate && (
                        <p className="text-xs text-obsidian/70">
                          Due: {new Date(reminder.dueDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
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
