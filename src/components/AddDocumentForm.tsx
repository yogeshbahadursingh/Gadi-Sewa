import { useState } from 'react';
import { X } from 'lucide-react';
import { api } from '../services/api';

interface AddDocumentFormProps {
  vehicleId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function AddDocumentForm({ vehicleId, onSuccess, onCancel }: AddDocumentFormProps) {
  const [formData, setFormData] = useState({
    documentType: '',
    title: '',
    documentNumber: '',
    issueDate: '',
    expiryDate: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.documentType || !formData.title) {
      setError('Please fill in document type and title');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await api.addVehicleDocument(vehicleId, {
        documentType: formData.documentType as any,
        title: formData.title,
        documentNumber: formData.documentNumber || undefined,
        issueDate: formData.issueDate || undefined,
        expiryDate: formData.expiryDate || undefined,
        fileUrl: '', // In real implementation, this would be uploaded file URL
      });
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Failed to add document');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-obsidian/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-obsidian/[0.04] p-6 flex items-center justify-between">
          <h2 className="font-display text-2xl font-bold text-obsidian">Upload Document</h2>
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
            <label className="block text-sm font-medium text-obsidian mb-2">Document Type *</label>
            <select
              value={formData.documentType}
              onChange={(e) => setFormData({ ...formData, documentType: e.target.value })}
              className="w-full px-4 py-3 bg-ivory border border-obsidian/[0.06] rounded-xl text-sm outline-none focus:border-gold/40"
              required
            >
              <option value="">Select document type</option>
              <option value="BLUEBOOK">Bluebook (Vehicle Registration)</option>
              <option value="INSURANCE">Insurance Policy</option>
              <option value="TAX_RECEIPT">Tax Receipt</option>
              <option value="REGISTRATION">Registration Certificate</option>
              <option value="POLLUTION_CERTIFICATE">Pollution Certificate</option>
              <option value="SERVICE_RECORD">Service Record</option>
              <option value="INVOICE">Invoice</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-obsidian mb-2">Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Insurance Policy 2024"
              className="w-full px-4 py-3 bg-ivory border border-obsidian/[0.06] rounded-xl text-sm outline-none focus:border-gold/40"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-obsidian mb-2">Document Number</label>
            <input
              type="text"
              value={formData.documentNumber}
              onChange={(e) => setFormData({ ...formData, documentNumber: e.target.value })}
              placeholder="e.g. POL-2024-12345"
              className="w-full px-4 py-3 bg-ivory border border-obsidian/[0.06] rounded-xl text-sm outline-none focus:border-gold/40"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-obsidian mb-2">Issue Date</label>
              <input
                type="date"
                value={formData.issueDate}
                onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                className="w-full px-4 py-3 bg-ivory border border-obsidian/[0.06] rounded-xl text-sm outline-none focus:border-gold/40"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-obsidian mb-2">Expiry Date</label>
              <input
                type="date"
                value={formData.expiryDate}
                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                className="w-full px-4 py-3 bg-ivory border border-obsidian/[0.06] rounded-xl text-sm outline-none focus:border-gold/40"
              />
            </div>
          </div>

          <div className="p-4 bg-ivory-warm rounded-xl border border-obsidian/[0.06]">
            <p className="text-xs text-obsidian/60">
              <strong>Note:</strong> In the demo mode, file upload is not available. In production, you would be able to upload PDF, images, and other document files here.
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
              {loading ? 'Saving...' : 'Add Document'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
