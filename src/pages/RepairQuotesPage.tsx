import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Wrench, MapPin, Phone, Star, CheckCircle2, Clock, DollarSign, Send } from 'lucide-react';
import { inspections, vehicles, formatPrice } from '../store/data';
import { Badge } from '../components/Layout';

export default function RepairQuotesPage() {
  const { inspectionId } = useParams<{ inspectionId: string }>();
  const inspection = inspections.find(i => i.id === inspectionId);
  const vehicle = inspection ? vehicles.find(v => v.id === inspection.vehicleId) : null;

  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [requested, setRequested] = useState(false);

  // Get advisory/fail items from inspection
  const repairItems = inspection?.sections.flatMap(s => s.items).filter(i => i.result === 'ADVISORY' || i.result === 'FAIL') || [];

  // Mock partner garages
  const partners = [
    { id: 'g1', name: 'Everest Auto Workshop', location: 'Pulchowk, Lalitpur', rating: 4.8, reviews: 156, specialties: ['General Repair', 'Engine'], phone: '01-5551234' },
    { id: 'g2', name: 'Kathmandu Motor Service', location: 'Baneshwor, Kathmandu', rating: 4.6, reviews: 203, specialties: ['All Makes', 'AC Service'], phone: '01-4445678' },
    { id: 'g3', name: 'Pokhara Auto Care', location: 'Lakeside, Pokhara', rating: 4.7, reviews: 178, specialties: ['Japanese Cars', 'Suspension'], phone: '061-554433' },
  ];

  const toggleItem = (itemId: string) => {
    setSelectedItems(prev =>
      prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
    );
  };

  const selectAll = () => {
    if (selectedItems.length === repairItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(repairItems.map(i => i.id));
    }
  };

  if (!inspection || !vehicle) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-medium text-gray-900">Inspection not found</h2>
        <Link to="/" className="mt-4 inline-block text-blue-600">Go to homepage</Link>
      </div>
    );
  }

  if (requested) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Quotes Requested!</h1>
        <p className="text-gray-500 mt-2">Verified partners will send you quotes within 24 hours.</p>

        <div className="mt-6 bg-white border border-gray-200 rounded-2xl p-6 text-left">
          <h3 className="font-semibold text-gray-900 mb-4">What happens next?</h3>
          <div className="space-y-3">
            {[
              { step: '1', title: 'Partners Review', desc: 'Service partners review your repair requirements' },
              { step: '2', title: 'Receive Quotes', desc: 'Get detailed quotes with pricing and timeline' },
              { step: '3', title: 'Choose Partner', desc: 'Compare quotes and select the best option' },
              { step: '4', title: 'Book Service', desc: 'Schedule the repair work at your convenience' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-blue-600">{item.step}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{item.title}</p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <Link to={`/inspection/${inspection.id}`} className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 text-center">
            View Inspection Report
          </Link>
          <Link to="/partners" className="flex-1 py-3 border border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50 text-center">
            Browse Partners
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
      <Link to={`/inspection/${inspection.id}`} className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to inspection
      </Link>

      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
          <Wrench className="w-6 h-6 text-orange-600" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Get Repair Quotes</h1>
          <p className="text-sm text-gray-500">{vehicle.year} {vehicle.make} {vehicle.model}</p>
        </div>
      </div>

      {/* Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
        <p className="text-sm text-blue-700">
          Based on your inspection report, we've identified items that need attention. 
          Select the repairs you'd like quotes for, and verified partners will send you competitive offers.
        </p>
      </div>

      {/* Repair Items */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-900">Items Requiring Attention</h2>
          <button onClick={selectAll} className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            {selectedItems.length === repairItems.length ? 'Deselect All' : 'Select All'}
          </button>
        </div>

        {repairItems.length === 0 ? (
          <div className="text-center py-8">
            <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-3" />
            <p className="text-gray-900 font-medium">No repairs needed!</p>
            <p className="text-sm text-gray-500 mt-1">Your vehicle passed all inspection items.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {repairItems.map(item => (
              <label
                key={item.id}
                className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedItems.includes(item.id) ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => toggleItem(item.id)}
                  className="mt-0.5 rounded border-gray-300"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-gray-900">{item.name}</span>
                    <Badge variant={item.result === 'FAIL' ? 'danger' : 'warning'}>{item.result}</Badge>
                    {item.severity && (
                      <Badge variant={item.severity === 'MAJOR' ? 'danger' : item.severity === 'MODERATE' ? 'warning' : 'default'}>
                        {item.severity}
                      </Badge>
                    )}
                  </div>
                  {item.comment && <p className="text-xs text-gray-600">{item.comment}</p>}
                </div>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Partners */}
      {repairItems.length > 0 && (
        <>
          <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
            <h2 className="font-semibold text-gray-900 mb-4">Verified Service Partners</h2>
            <div className="space-y-3">
              {partners.map(partner => (
                <div key={partner.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Wrench className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-gray-900">{partner.name}</p>
                      <Badge variant="success">Verified</Badge>
                    </div>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3" /> {partner.location}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span className="text-xs font-medium text-gray-900">{partner.rating}</span>
                      <span className="text-xs text-gray-500">({partner.reviews} reviews)</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <a href={`tel:${partner.phone}`} className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                      <Phone className="w-4 h-4 text-gray-600" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-semibold text-gray-900">Request Quotes</h2>
                <p className="text-sm text-gray-500">{selectedItems.length} items selected</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Estimated Range</p>
                <p className="text-lg font-bold text-blue-600">
                  Rs. {(selectedItems.length * 2000).toLocaleString()} - {(selectedItems.length * 8000).toLocaleString()}
                </p>
              </div>
            </div>
            <button
              onClick={() => setRequested(true)}
              disabled={selectedItems.length === 0}
              className="w-full bg-orange-600 text-white py-3 rounded-xl font-medium hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" /> Request Quotes from Partners
            </button>
          </div>
        </>
      )}
    </div>
  );
}
