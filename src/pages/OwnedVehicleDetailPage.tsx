import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Car, Wrench, FileText, DollarSign, Bell, Plus, Edit, Trash2, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { api, OwnedVehicle, MaintenanceRecord, VehicleDocument, VehicleExpense, VehicleReminder } from '../services/api';
import AddMaintenanceRecordForm from '../components/AddMaintenanceRecordForm';
import AddDocumentForm from '../components/AddDocumentForm';
import AddExpenseForm from '../components/AddExpenseForm';
import AddReminderForm from '../components/AddReminderForm';

type TabType = 'overview' | 'maintenance' | 'documents' | 'expenses' | 'reminders';

export default function VehicleDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  const [vehicle, setVehicle] = useState<OwnedVehicle | null>(null);
  const [maintenanceRecords, setMaintenanceRecords] = useState<MaintenanceRecord[]>([]);
  const [documents, setDocuments] = useState<VehicleDocument[]>([]);
  const [expenses, setExpenses] = useState<VehicleExpense[]>([]);
  const [reminders, setReminders] = useState<VehicleReminder[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [showAddForm, setShowAddForm] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (id) {
      loadVehicleData();
    }
  }, [id, isAuthenticated]);

  const loadVehicleData = async () => {
    try {
      const vehicles = await api.getMyOwnedVehicles();
      const foundVehicle = vehicles.find((v: OwnedVehicle) => v.id === id);
      
      if (foundVehicle) {
        setVehicle(foundVehicle);
        setMaintenanceRecords(foundVehicle.maintenanceRecords || []);
        setDocuments(foundVehicle.documents || []);
        setExpenses(foundVehicle.expenses || []);
        setReminders(foundVehicle.reminders || []);
      }
    } catch (error) {
      console.error('Failed to load vehicle:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `रू ${(price / 10000000).toFixed(2)} Crore`;
    }
    if (price >= 100000) {
      return `रू ${(price / 100000).toFixed(2)} Lakh`;
    }
    return `रू ${price.toLocaleString('en-NP')}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const handleCompleteReminder = async (reminderId: string) => {
    try {
      await api.completeReminder(reminderId);
      await loadVehicleData();
    } catch (error) {
      console.error('Failed to complete reminder:', error);
    }
  };

  const handleDeleteVehicle = async () => {
    if (!confirm('Are you sure you want to remove this vehicle from your garage?')) return;
    
    try {
      await api.deleteOwnedVehicle(id!);
      navigate('/garage');
    } catch (error) {
      console.error('Failed to delete vehicle:', error);
      alert('Failed to delete vehicle');
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-ivory pt-20 lg:pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-obsidian/60">Loading vehicle...</p>
        </div>
      </main>
    );
  }

  if (!vehicle) {
    return (
      <main className="min-h-screen bg-ivory pt-20 lg:pt-24 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="font-display text-2xl font-bold text-obsidian mb-4">Vehicle Not Found</h1>
          <p className="text-slate-warm mb-6">The vehicle you're looking for doesn't exist.</p>
          <Link to="/garage" className="px-6 py-3 bg-obsidian text-ivory text-sm font-medium rounded-full">
            Back to Garage
          </Link>
        </div>
      </main>
    );
  }

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const pendingReminders = reminders.filter(r => r.status === 'PENDING').length;

  return (
    <main className="min-h-screen bg-ivory pt-20 lg:pt-24">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => navigate('/garage')}
              className="p-2 hover:bg-obsidian/5 rounded-lg transition-colors"
              aria-label="Back to garage"
            >
              <ArrowLeft className="w-5 h-5 text-obsidian" />
            </button>
            <div className="flex-1">
              <h1 className="font-display text-3xl lg:text-4xl font-bold text-obsidian">
                {vehicle.year} {vehicle.make} {vehicle.model}
              </h1>
              {vehicle.registrationNumber && (
                <p className="text-slate-warm mt-1">{vehicle.registrationNumber}</p>
              )}
            </div>
            <button
              onClick={handleDeleteVehicle}
              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              aria-label="Delete vehicle"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl border border-obsidian/[0.04] p-4">
              <div className="flex items-center gap-2 mb-1">
                <Car className="w-4 h-4 text-gold" />
                <span className="text-xs text-slate-warm">Mileage</span>
              </div>
              <p className="text-lg font-bold text-obsidian">{vehicle.currentMileage.toLocaleString()} km</p>
            </div>
            <div className="bg-white rounded-xl border border-obsidian/[0.04] p-4">
              <div className="flex items-center gap-2 mb-1">
                <Wrench className="w-4 h-4 text-gold" />
                <span className="text-xs text-slate-warm">Services</span>
              </div>
              <p className="text-lg font-bold text-obsidian">{maintenanceRecords.length}</p>
            </div>
            <div className="bg-white rounded-xl border border-obsidian/[0.04] p-4">
              <div className="flex items-center gap-2 mb-1">
                <DollarSign className="w-4 h-4 text-gold" />
                <span className="text-xs text-slate-warm">Expenses</span>
              </div>
              <p className="text-lg font-bold text-obsidian">{formatPrice(totalExpenses)}</p>
            </div>
            <div className="bg-white rounded-xl border border-obsidian/[0.04] p-4">
              <div className="flex items-center gap-2 mb-1">
                <Bell className="w-4 h-4 text-gold" />
                <span className="text-xs text-slate-warm">Reminders</span>
              </div>
              <p className="text-lg font-bold text-obsidian">{pendingReminders}</p>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {[
            { id: 'overview', label: 'Overview', icon: Car },
            { id: 'maintenance', label: 'Maintenance', icon: Wrench },
            { id: 'documents', label: 'Documents', icon: FileText },
            { id: 'expenses', label: 'Expenses', icon: DollarSign },
            { id: 'reminders', label: 'Reminders', icon: Bell },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'bg-obsidian text-ivory'
                    : 'bg-white text-obsidian/70 hover:bg-obsidian/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="bg-white rounded-2xl border border-obsidian/[0.04] p-6">
              <h2 className="font-display text-xl font-semibold text-obsidian mb-6">Vehicle Information</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-obsidian/60 uppercase tracking-wider mb-3">Basic Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-warm">Make</span>
                      <span className="text-sm font-medium text-obsidian">{vehicle.make}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-warm">Model</span>
                      <span className="text-sm font-medium text-obsidian">{vehicle.model}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-warm">Year</span>
                      <span className="text-sm font-medium text-obsidian">{vehicle.year}</span>
                    </div>
                    {vehicle.registrationNumber && (
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-warm">Registration</span>
                        <span className="text-sm font-medium text-obsidian">{vehicle.registrationNumber}</span>
                      </div>
                    )}
                    {vehicle.vin && (
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-warm">VIN</span>
                        <span className="text-sm font-medium text-obsidian font-mono text-xs">{vehicle.vin}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-obsidian/60 uppercase tracking-wider mb-3">Ownership</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-warm">Current Mileage</span>
                      <span className="text-sm font-medium text-obsidian">{vehicle.currentMileage.toLocaleString()} km</span>
                    </div>
                    {vehicle.purchaseDate && (
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-warm">Purchase Date</span>
                        <span className="text-sm font-medium text-obsidian">{formatDate(vehicle.purchaseDate)}</span>
                      </div>
                    )}
                    {vehicle.purchasePrice && (
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-warm">Purchase Price</span>
                        <span className="text-sm font-medium text-obsidian">{formatPrice(vehicle.purchasePrice)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-warm">Status</span>
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

          {/* Maintenance Tab */}
          {activeTab === 'maintenance' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-xl font-semibold text-obsidian">Maintenance Records</h2>
                <button
                  onClick={() => setShowAddForm('maintenance')}
                  className="flex items-center gap-2 px-4 py-2 bg-obsidian text-ivory text-sm font-medium rounded-full hover:bg-emerald transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Record
                </button>
              </div>

              {maintenanceRecords.length === 0 ? (
                <div className="bg-white rounded-2xl border border-obsidian/[0.04] p-12 text-center">
                  <Wrench className="w-16 h-16 text-obsidian/10 mx-auto mb-4" />
                  <h3 className="font-display text-xl font-semibold text-obsidian mb-2">No maintenance records</h3>
                  <p className="text-slate-warm">Add your first service record to track maintenance history</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {maintenanceRecords.map((record) => (
                    <div key={record.id} className="bg-white rounded-xl border border-obsidian/[0.04] p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-obsidian">{record.serviceType}</h3>
                          <p className="text-sm text-slate-warm">{formatDate(record.serviceDate)}</p>
                        </div>
                        {record.cost && (
                          <span className="text-lg font-bold text-obsidian">{formatPrice(record.cost)}</span>
                        )}
                      </div>
                      {record.description && (
                        <p className="text-sm text-obsidian/70 mb-2">{record.description}</p>
                      )}
                      {record.mileageAtService && (
                        <p className="text-xs text-slate-warm">Mileage: {record.mileageAtService.toLocaleString()} km</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Documents Tab */}
          {activeTab === 'documents' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-xl font-semibold text-obsidian">Documents</h2>
                <button
                  onClick={() => setShowAddForm('document')}
                  className="flex items-center gap-2 px-4 py-2 bg-obsidian text-ivory text-sm font-medium rounded-full hover:bg-emerald transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Upload Document
                </button>
              </div>

              {documents.length === 0 ? (
                <div className="bg-white rounded-2xl border border-obsidian/[0.04] p-12 text-center">
                  <FileText className="w-16 h-16 text-obsidian/10 mx-auto mb-4" />
                  <h3 className="font-display text-xl font-semibold text-obsidian mb-2">No documents</h3>
                  <p className="text-slate-warm">Upload your vehicle documents for safe keeping</p>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {documents.map((doc) => (
                    <div key={doc.id} className="bg-white rounded-xl border border-obsidian/[0.04] p-5">
                      <div className="flex items-start gap-3 mb-3">
                        <FileText className="w-8 h-8 text-gold flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-obsidian truncate">{doc.title}</h3>
                          <p className="text-xs text-slate-warm">{doc.documentType}</p>
                        </div>
                      </div>
                      {doc.expiryDate && (
                        <p className="text-xs text-slate-warm">
                          Expires: {formatDate(doc.expiryDate)}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Expenses Tab */}
          {activeTab === 'expenses' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-xl font-semibold text-obsidian">Expenses</h2>
                <button
                  onClick={() => setShowAddForm('expense')}
                  className="flex items-center gap-2 px-4 py-2 bg-obsidian text-ivory text-sm font-medium rounded-full hover:bg-emerald transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Expense
                </button>
              </div>

              {expenses.length === 0 ? (
                <div className="bg-white rounded-2xl border border-obsidian/[0.04] p-12 text-center">
                  <DollarSign className="w-16 h-16 text-obsidian/10 mx-auto mb-4" />
                  <h3 className="font-display text-xl font-semibold text-obsidian mb-2">No expenses</h3>
                  <p className="text-slate-warm">Track your vehicle expenses to monitor costs</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {expenses.map((expense) => (
                    <div key={expense.id} className="bg-white rounded-xl border border-obsidian/[0.04] p-5">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-obsidian">{expense.expenseType}</h3>
                          <p className="text-sm text-slate-warm">{formatDate(expense.date)}</p>
                        </div>
                        <span className="text-lg font-bold text-obsidian">{formatPrice(expense.amount)}</span>
                      </div>
                      {expense.description && (
                        <p className="text-sm text-obsidian/70">{expense.description}</p>
                      )}
                      {expense.vendor && (
                        <p className="text-xs text-slate-warm mt-1">Vendor: {expense.vendor}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Reminders Tab */}
          {activeTab === 'reminders' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-xl font-semibold text-obsidian">Reminders</h2>
                <button
                  onClick={() => setShowAddForm('reminder')}
                  className="flex items-center gap-2 px-4 py-2 bg-obsidian text-ivory text-sm font-medium rounded-full hover:bg-emerald transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Reminder
                </button>
              </div>

              {reminders.length === 0 ? (
                <div className="bg-white rounded-2xl border border-obsidian/[0.04] p-12 text-center">
                  <Bell className="w-16 h-16 text-obsidian/10 mx-auto mb-4" />
                  <h3 className="font-display text-xl font-semibold text-obsidian mb-2">No reminders</h3>
                  <p className="text-slate-warm">Set reminders for service, insurance, tax, and more</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {reminders.map((reminder) => (
                    <div key={reminder.id} className={`bg-white rounded-xl border p-5 ${
                      reminder.status === 'COMPLETED' ? 'border-emerald/20 opacity-60' : 'border-obsidian/[0.04]'
                    }`}>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-start gap-3">
                          {reminder.status === 'COMPLETED' ? (
                            <CheckCircle className="w-5 h-5 text-emerald flex-shrink-0 mt-0.5" />
                          ) : (
                            <Bell className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                          )}
                          <div>
                            <h3 className="font-semibold text-obsidian">{reminder.title}</h3>
                            <p className="text-xs text-slate-warm">{reminder.reminderType}</p>
                          </div>
                        </div>
                        {reminder.status === 'PENDING' && (
                          <button
                            onClick={() => handleCompleteReminder(reminder.id)}
                            className="px-3 py-1 text-xs font-medium text-emerald hover:text-emerald-light transition-colors"
                          >
                            Mark Complete
                          </button>
                        )}
                      </div>
                      {reminder.description && (
                        <p className="text-sm text-obsidian/70 mb-2">{reminder.description}</p>
                      )}
                      {reminder.dueDate && (
                        <p className="text-xs text-slate-warm">
                          Due: {formatDate(reminder.dueDate)}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </motion.div>

        {/* Add Forms */}
        {showAddForm === 'maintenance' && (
          <AddMaintenanceRecordForm
            vehicleId={id!}
            onSuccess={() => {
              setShowAddForm(null);
              loadVehicleData();
            }}
            onCancel={() => setShowAddForm(null)}
          />
        )}

        {showAddForm === 'document' && (
          <AddDocumentForm
            vehicleId={id!}
            onSuccess={() => {
              setShowAddForm(null);
              loadVehicleData();
            }}
            onCancel={() => setShowAddForm(null)}
          />
        )}

        {showAddForm === 'expense' && (
          <AddExpenseForm
            vehicleId={id!}
            onSuccess={() => {
              setShowAddForm(null);
              loadVehicleData();
            }}
            onCancel={() => setShowAddForm(null)}
          />
        )}

        {showAddForm === 'reminder' && (
          <AddReminderForm
            vehicleId={id!}
            onSuccess={() => {
              setShowAddForm(null);
              loadVehicleData();
            }}
            onCancel={() => setShowAddForm(null)}
          />
        )}
      </div>
    </main>
  );
}
