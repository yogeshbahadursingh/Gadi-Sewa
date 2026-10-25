import { useState } from 'react';
import { X } from 'lucide-react';
import { api } from '../services/api';

interface AddExpenseFormProps {
  vehicleId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function AddExpenseForm({ vehicleId, onSuccess, onCancel }: AddExpenseFormProps) {
  const [formData, setFormData] = useState({
    expenseType: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
    vendor: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.expenseType || !formData.amount || !formData.date) {
      setError('Please fill in expense type, amount, and date');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await api.addVehicleExpense(vehicleId, {
        expenseType: formData.expenseType as any,
        amount: parseInt(formData.amount),
        date: formData.date,
        description: formData.description || undefined,
        vendor: formData.vendor || undefined,
      });
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Failed to add expense');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-obsidian/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-obsidian/[0.04] p-6 flex items-center justify-between">
          <h2 className="font-display text-2xl font-bold text-obsidian">Add Expense</h2>
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
            <label className="block text-sm font-medium text-obsidian mb-2">Expense Type *</label>
            <select
              value={formData.expenseType}
              onChange={(e) => setFormData({ ...formData, expenseType: e.target.value })}
              className="w-full px-4 py-3 bg-ivory border border-obsidian/[0.06] rounded-xl text-sm outline-none focus:border-gold/40"
              required
            >
              <option value="">Select expense type</option>
              <option value="FUEL">Fuel</option>
              <option value="MAINTENANCE">Maintenance</option>
              <option value="REPAIR">Repair</option>
              <option value="INSURANCE">Insurance</option>
              <option value="TAX">Tax</option>
              <option value="PARKING">Parking</option>
              <option value="TOLL">Toll</option>
              <option value="ACCESSORIES">Accessories</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-obsidian mb-2">Amount (NPR) *</label>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                placeholder="e.g. 5000"
                min="0"
                className="w-full px-4 py-3 bg-ivory border border-obsidian/[0.06] rounded-xl text-sm outline-none focus:border-gold/40"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-obsidian mb-2">Date *</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-3 bg-ivory border border-obsidian/[0.06] rounded-xl text-sm outline-none focus:border-gold/40"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-obsidian mb-2">Vendor</label>
            <input
              type="text"
              value={formData.vendor}
              onChange={(e) => setFormData({ ...formData, vendor: e.target.value })}
              placeholder="e.g. Shell Petrol Pump, XYZ Garage"
              className="w-full px-4 py-3 bg-ivory border border-obsidian/[0.06] rounded-xl text-sm outline-none focus:border-gold/40"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-obsidian mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Additional details about this expense..."
              rows={3}
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
              {loading ? 'Saving...' : 'Add Expense'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
