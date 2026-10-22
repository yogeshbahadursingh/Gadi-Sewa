import { useState } from 'react';
import { X } from 'lucide-react';
import { api } from '../services/api';

interface AddReminderFormProps {
  vehicleId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function AddReminderForm({ vehicleId, onSuccess, onCancel }: AddReminderFormProps) {
  const [formData, setFormData] = useState({
    reminderType: '',
    title: '',
    description: '',
    dueDate: '',
    mileageDue: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.reminderType || !formData.title) {
      setError('Please fill in reminder type and title');
      return;
    }

    if (!formData.dueDate && !formData.mileageDue) {
      setError('Please set either a due date or mileage trigger');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await api.addVehicleReminder(vehicleId, {
        reminderType: formData.reminderType as any,
        title: formData.title,
        description: formData.description || undefined,
        dueDate: formData.dueDate || undefined,
        mileageDue: formData.mileageDue ? parseInt(formData.mileageDue) : undefined,
      });
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Failed to add reminder');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-obsidian/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-obsidian/[0.04] p-6 flex items-center justify-between">
          <h2 className="font-display text-2xl font-bold text-obsidian">Add Reminder</h2>
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
            <label className="block text-sm font-medium text-obsidian mb-2">Reminder Type *</label>
            <select
              value={formData.reminderType}
              onChange={(e) => setFormData({ ...formData, reminderType: e.target.value })}
              className="w-full px-4 py-3 bg-ivory border border-obsidian/[0.06] rounded-xl text-sm outline-none focus:border-gold/40"
              required
            >
              <option value="">Select reminder type</option>
              <option value="SERVICE">Service Due</option>
              <option value="INSURANCE">Insurance Renewal</option>
              <option value="TAX">Tax Payment</option>
              <option value="BLUEBOOK_RENEWAL">Bluebook Renewal</option>
              <option value="POLLUTION_CERTIFICATE">Pollution Certificate</option>
              <option value="CUSTOM">Custom Reminder</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-obsidian mb-2">Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Annual Service Due"
              className="w-full px-4 py-3 bg-ivory border border-obsidian/[0.06] rounded-xl text-sm outline-none focus:border-gold/40"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-obsidian mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Additional details about this reminder..."
              rows={3}
              className="w-full px-4 py-3 bg-ivory border border-obsidian/[0.06] rounded-xl text-sm outline-none focus:border-gold/40 resize-none"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-obsidian mb-2">Due Date</label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="w-full px-4 py-3 bg-ivory border border-obsidian/[0.06] rounded-xl text-sm outline-none focus:border-gold/40"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-obsidian mb-2">Mileage Trigger (km)</label>
              <input
                type="number"
                value={formData.mileageDue}
                onChange={(e) => setFormData({ ...formData, mileageDue: e.target.value })}
                placeholder="e.g. 60000"
                min="0"
                className="w-full px-4 py-3 bg-ivory border border-obsidian/[0.06] rounded-xl text-sm outline-none focus:border-gold/40"
              />
            </div>
          </div>

          <div className="p-4 bg-ivory-warm rounded-xl border border-obsidian/[0.06]">
            <p className="text-xs text-obsidian/60">
              <strong>Note:</strong> Set either a due date or mileage trigger (or both). You'll be reminded when the date arrives or when the vehicle reaches the specified mileage.
            </p>
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
              {loading ? 'Saving...' : 'Add Reminder'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
