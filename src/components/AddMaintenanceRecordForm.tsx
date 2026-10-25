import { useState } from 'react';
import { X } from 'lucide-react';
import { api } from '../services/api';

interface AddMaintenanceRecordFormProps {
  vehicleId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function AddMaintenanceRecordForm({ vehicleId, onSuccess, onCancel }: AddMaintenanceRecordFormProps) {
  const [formData, setFormData] = useState({
    serviceType: '',
    serviceDate: new Date().toISOString().split('T')[0],
    mileageAtService: '',
    cost: '',
    description: '',
    notes: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.serviceType || !formData.serviceDate) {
      setError('Please fill in service type and date');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await api.addMaintenanceRecord(vehicleId, {
        serviceType: formData.serviceType,
        serviceDate: formData.serviceDate,
        mileageAtService: formData.mileageAtService ? parseInt(formData.mileageAtService) : undefined,
        cost: formData.cost ? parseInt(formData.cost) : undefined,
        description: formData.description || undefined,
        notes: formData.notes || undefined,
      });
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Failed to add maintenance record');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-obsidian/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-obsidian/[0.04] p-6 flex items-center justify-between">
          <h2 className="font-display text-2xl font-bold text-obsidian">Add Maintenance Record</h2>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-obsidian/5 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-obsidian" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-obsidian mb-2">Service Type *</label>
            <select
              value={formData.serviceType}
              onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
              className="w-full px-4 py-3 bg-ivory border border-obsidian/[0.06] rounded-xl text-sm outline-none focus:border-gold/40"
              required
            >
              <option value="">Select service type</option>
              <option value="Oil Change">Oil Change</option>
              <option value="Tire Rotation">Tire Rotation</option>
              <option value="Brake Service">Brake Service</option>
              <option value="Battery Replacement">Battery Replacement</option>
              <option value="Air Filter">Air Filter</option>
              <option value="Transmission Service">Transmission Service</option>
              <option value="Coolant Flush">Coolant Flush</option>
              <option value="Spark Plugs">Spark Plugs</option>
              <option value="Timing Belt">Timing Belt</option>
              <option value="General Service">General Service</option>
              <option value="Repair">Repair</option>
              <option value="Inspection">Inspection</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-obsidian mb-2">Service Date *</label>
              <input
                type="date"
                value={formData.serviceDate}
                onChange={(e) => setFormData({ ...formData, serviceDate: e.target.value })}
                className="w-full px-4 py-3 bg-ivory border border-obsidian/[0.06] rounded-xl text-sm outline-none focus:border-gold/40"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-obsidian mb-2">Mileage (km)</label>
              <input
                type="number"
                value={formData.mileageAtService}
                onChange={(e) => setFormData({ ...formData, mileageAtService: e.target.value })}
                placeholder="e.g. 50000"
                min="0"
                className="w-full px-4 py-3 bg-ivory border border-obsidian/[0.06] rounded-xl text-sm outline-none focus:border-gold/40"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-obsidian mb-2">Cost (NPR)</label>
            <input
              type="number"
              value={formData.cost}
              onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
              placeholder="e.g. 5000"
              min="0"
              className="w-full px-4 py-3 bg-ivory border border-obsidian/[0.06] rounded-xl text-sm outline-none focus:border-gold/40"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-obsidian mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the service performed..."
              rows={3}
              className="w-full px-4 py-3 bg-ivory border border-obsidian/[0.06] rounded-xl text-sm outline-none focus:border-gold/40 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-obsidian mb-2">Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Additional notes..."
              rows={2}
              className="w-full px-4 py-3 bg-ivory border border-obsidian/[0.06] rounded-xl text-sm outline-none focus:border-gold/40 resize-none"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-3 border border-obsidian/10 text-obsidian text-sm font-medium rounded-xl hover:bg-obsidian/5 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 bg-obsidian text-ivory text-sm font-semibold rounded-xl hover:bg-emerald transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving...' : 'Add Record'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
