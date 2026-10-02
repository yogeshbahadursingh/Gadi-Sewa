import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, AlertTriangle, XCircle, Camera, Gauge, FileText, MapPin, Clock, User, Save, Send, ChevronRight, ChevronDown, Info } from 'lucide-react';
import { inspections, vehicles, users, formatMileage } from '../store/data';
import { Badge } from '../components/Layout';

type ItemResult = 'PASS' | 'ADVISORY' | 'FAIL' | 'NOT_APPLICABLE' | 'UNABLE_TO_INSPECT';

interface ItemState {
  result: ItemResult;
  comment: string;
  measurement: string;
  photos: string[];
}

const DEFAULT_INSPECTION_TEMPLATE = {
  identity: [
    { id: 'id1', name: 'Chassis Number Match', required: true },
    { id: 'id2', name: 'Engine Number Match', required: true },
    { id: 'id3', name: 'Registration Plate', required: true },
    { id: 'id4', name: 'VIN Match', required: false },
  ],
  exterior: [
    { id: 'ex1', name: 'Front Bumper', required: false },
    { id: 'ex2', name: 'Rear Bumper', required: false },
    { id: 'ex3', name: 'Doors & Panels', required: false },
    { id: 'ex4', name: 'Paint Condition', required: false },
    { id: 'ex5', name: 'Glass/Windows', required: false },
    { id: 'ex6', name: 'Lights (All)', required: false },
  ],
  mechanical: [
    { id: 'me1', name: 'Engine Start', required: true },
    { id: 'me2', name: 'Engine Noise', required: true },
    { id: 'me3', name: 'Transmission', required: true },
    { id: 'me4', name: 'Brakes', required: true },
    { id: 'me5', name: 'Suspension', required: true },
    { id: 'me6', name: 'Steering', required: true },
    { id: 'me7', name: 'Exhaust', required: false },
  ],
  tyres: [
    { id: 'ty1', name: 'Front Left Tyre', required: true, measure: true },
    { id: 'ty2', name: 'Front Right Tyre', required: true, measure: true },
    { id: 'ty3', name: 'Rear Left Tyre', required: true, measure: true },
    { id: 'ty4', name: 'Rear Right Tyre', required: true, measure: true },
    { id: 'ty5', name: 'Spare Tyre', required: false },
  ],
  interior: [
    { id: 'in1', name: 'Seats', required: false },
    { id: 'in2', name: 'Dashboard/Controls', required: false },
    { id: 'in3', name: 'AC System', required: true },
    { id: 'in4', name: 'Infotainment', required: false },
    { id: 'in5', name: 'Power Windows', required: false },
  ],
  diagnostics: [
    { id: 'di1', name: 'OBD Scan', required: true },
    { id: 'di2', name: 'Battery Voltage', required: true, measure: true },
    { id: 'di3', name: 'Fluid Levels', required: true },
  ],
  roadtest: [
    { id: 'rt1', name: 'Steering Response', required: true },
    { id: 'rt2', name: 'Braking Performance', required: true },
    { id: 'rt3', name: 'Noise/Vibration', required: true },
    { id: 'rt4', name: 'Gear Shifts', required: true },
  ],
};

const EV_ADDITIONAL = {
  battery: [
    { id: 'ev1', name: 'Battery SOH Reading', required: true, measure: true },
    { id: 'ev2', name: 'BMS Scan', required: true },
    { id: 'ev3', name: 'AC Charging Test', required: true, measure: true },
    { id: 'ev4', name: 'DC Charging Test', required: true, measure: true },
    { id: 'ev5', name: 'Battery Enclosure', required: true },
    { id: 'ev6', name: 'Cell Balance', required: false },
  ],
  motor: [
    { id: 'mo1', name: 'Motor Operation', required: true },
    { id: 'mo2', name: 'Inverter Check', required: true },
    { id: 'mo3', name: 'Regenerative Braking', required: true },
    { id: 'mo4', name: 'Thermal Management', required: false },
  ],
};

const RESULT_OPTIONS: { value: ItemResult; label: string; color: string }[] = [
  { value: 'PASS', label: 'Pass', color: 'bg-green-100 text-green-700 border-green-300' },
  { value: 'ADVISORY', label: 'Advisory', color: 'bg-amber-100 text-amber-700 border-amber-300' },
  { value: 'FAIL', label: 'Fail', color: 'bg-red-100 text-red-700 border-red-300' },
  { value: 'NOT_APPLICABLE', label: 'N/A', color: 'bg-gray-100 text-gray-600 border-gray-300' },
  { value: 'UNABLE_TO_INSPECT', label: 'Unable', color: 'bg-gray-100 text-gray-600 border-gray-300' },
];

export default function InspectorFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const inspection = inspections.find(i => i.id === id);
  const vehicle = inspection ? vehicles.find(v => v.id === inspection.vehicleId) : null;
  const inspector = inspection ? users.find(u => u.id === inspection.inspectorId) : null;

  const [currentSection, setCurrentSection] = useState(0);
  const [itemStates, setItemStates] = useState<Record<string, ItemState>>({});
  const [odometerReading, setOdometerReading] = useState(vehicle?.mileage.toString() || '');
  const [overallNotes, setOverallNotes] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!inspection || !vehicle) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-medium text-gray-900">Inspection job not found</h2>
        <Link to="/inspector" className="mt-4 inline-block text-blue-600">Back to dashboard</Link>
      </div>
    );
  }

  // Build sections based on vehicle type
  const sections: { name: string; items: any[] }[] = [
    { name: 'Vehicle Identity', items: DEFAULT_INSPECTION_TEMPLATE.identity },
    { name: 'Exterior', items: DEFAULT_INSPECTION_TEMPLATE.exterior },
    { name: 'Mechanical', items: DEFAULT_INSPECTION_TEMPLATE.mechanical },
    { name: 'Tyres', items: DEFAULT_INSPECTION_TEMPLATE.tyres },
    { name: 'Interior', items: DEFAULT_INSPECTION_TEMPLATE.interior },
    { name: 'Diagnostics', items: DEFAULT_INSPECTION_TEMPLATE.diagnostics },
    { name: 'Road Test', items: DEFAULT_INSPECTION_TEMPLATE.roadtest },
  ];

  if (vehicle.isEV) {
    sections.push(
      { name: 'EV Battery', items: EV_ADDITIONAL.battery },
      { name: 'EV Motor & Drive', items: EV_ADDITIONAL.motor }
    );
  }

  const currentSectionData = sections[currentSection];
  const totalItems = sections.reduce((sum, s) => sum + s.items.length, 0);
  const completedItems = Object.keys(itemStates).length;
  const progress = Math.round((completedItems / totalItems) * 100);

  const updateItem = (itemId: string, updates: Partial<ItemState>) => {
    setItemStates(prev => {
      const existing = prev[itemId] || { result: 'PASS' as ItemResult, comment: '', measurement: '', photos: [] };
      return {
        ...prev,
        [itemId]: { ...existing, ...updates },
      };
    });
  };

  const requiredItemsMissing = sections.flatMap(s => s.items).filter(i => i.required && !itemStates[i.id]).length;
  const hasFailures = Object.values(itemStates).some(s => s.result === 'FAIL');

  const handleSubmit = () => {
    setSubmitted(true);
    setShowSubmitConfirm(false);
    setTimeout(() => navigate('/inspector'), 2000);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Inspection Submitted</h1>
        <p className="text-gray-500 mt-2">Your inspection report has been submitted for supervisor review.</p>
        <div className="mt-6 p-4 bg-blue-50 rounded-xl">
          <p className="text-sm text-blue-700">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Link to="/inspector" className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Conduct Inspection</h1>
            <p className="text-sm text-gray-500">{vehicle.year} {vehicle.make} {vehicle.model}</p>
          </div>
        </div>
        <Badge variant="info">{progress}% Complete</Badge>
      </div>

      {/* Job Info Card */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-xs text-gray-500">Customer</p>
            <p className="font-medium text-gray-900">Sunil Shakya</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Location</p>
            <p className="font-medium text-gray-900 flex items-center gap-1"><MapPin className="w-3 h-3" />{inspection.location}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Registration</p>
            <p className="font-medium text-gray-900 font-mono">{vehicle.registrationNumber}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Template</p>
            <p className="font-medium text-gray-900">{vehicle.isEV ? 'Electric Vehicle' : vehicle.fuelType}</p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm text-gray-500">{completedItems} / {totalItems} items</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-blue-600 rounded-full transition-all" style={{ width: `${progress}%` }} />
        </div>
        {requiredItemsMissing > 0 && (
          <p className="text-xs text-amber-600 mt-2 flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" />
            {requiredItemsMissing} required items remaining
          </p>
        )}
      </div>

      {/* Section Navigation */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 no-scrollbar">
        {sections.map((section, i) => {
          const sectionItems = section.items;
          const sectionCompleted = sectionItems.filter(item => itemStates[item.id]).length;
          const isComplete = sectionCompleted === sectionItems.length;
          return (
            <button
              key={i}
              onClick={() => setCurrentSection(i)}
              className={`flex-shrink-0 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                currentSection === i
                  ? 'bg-blue-600 text-white'
                  : isComplete
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {section.name}
              {isComplete && <CheckCircle2 className="w-3 h-3 inline ml-1" />}
            </button>
          );
        })}
      </div>

      {/* Current Section */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">{currentSectionData.name}</h2>
          <span className="text-xs text-gray-500">
            {currentSectionData.items.filter(i => itemStates[i.id]).length}/{currentSectionData.items.length}
          </span>
        </div>
        <div className="divide-y divide-gray-100">
          {currentSectionData.items.map(item => {
            const state = itemStates[item.id];
            return (
              <div key={item.id} className="p-4">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900">{item.name}</span>
                      {item.required && <span className="text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded font-medium">Required</span>}
                    </div>
                  </div>
                  {state && (
                    <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                      state.result === 'PASS' ? 'bg-green-100 text-green-700' :
                      state.result === 'ADVISORY' ? 'bg-amber-100 text-amber-700' :
                      state.result === 'FAIL' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'
                    }`}>{state.result}</span>
                  )}
                </div>

                {/* Result buttons */}
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {RESULT_OPTIONS.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => updateItem(item.id, { result: opt.value })}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                        state?.result === opt.value
                          ? opt.color + ' ring-2 ring-offset-1 ring-blue-400'
                          : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>

                {/* Measurement field */}
                {item.measure && state && (state.result === 'PASS' || state.result === 'ADVISORY') && (
                  <input
                    type="text"
                    placeholder="Measurement (e.g., 6mm, 12.6V)"
                    value={state.measurement}
                    onChange={e => updateItem(item.id, { measurement: e.target.value })}
                    className="w-full py-2 px-3 border border-gray-200 rounded-lg text-xs outline-none focus:border-blue-500 mb-2"
                  />
                )}

                {/* Comment field */}
                {state && (
                  <textarea
                    placeholder="Add notes or observations..."
                    value={state.comment}
                    onChange={e => updateItem(item.id, { comment: e.target.value })}
                    className="w-full py-2 px-3 border border-gray-200 rounded-lg text-xs outline-none focus:border-blue-500 resize-none h-16"
                  />
                )}

                {/* Photo button */}
                {state && (
                  <button 
                    onClick={() => alert('Photo upload feature coming soon!\n\nIn production, this would open a file picker or camera interface.')}
                    className="mt-2 flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-700 font-medium"
                  >
                    <Camera className="w-3.5 h-3.5" /> Add Photo
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Odometer verification */}
      {currentSection === 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-4 mt-4">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Gauge className="w-4 h-4 text-blue-600" /> Odometer Verification
          </h3>
          <div className="flex items-center gap-3">
            <input
              type="number"
              value={odometerReading}
              onChange={e => setOdometerReading(e.target.value)}
              placeholder="Current reading (km)"
              className="flex-1 py-2.5 px-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500"
            />
            <button 
              onClick={() => alert('Photo capture feature coming soon!\n\nIn production, this would open a camera interface to capture the odometer reading.')}
              className="flex items-center gap-1.5 px-3 py-2.5 bg-gray-100 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-200"
            >
              <Camera className="w-3.5 h-3.5" /> Photo
            </button>
          </div>
        </div>
      )}

      {/* Final section - Notes & Submit */}
      {currentSection === sections.length - 1 && (
        <div className="bg-white border border-gray-200 rounded-xl p-4 mt-4 space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Overall Notes</h3>
            <textarea
              value={overallNotes}
              onChange={e => setOverallNotes(e.target.value)}
              placeholder="General observations about the vehicle..."
              className="w-full py-2.5 px-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500 resize-none h-20"
            />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Recommendation</h3>
            <textarea
              value={recommendation}
              onChange={e => setRecommendation(e.target.value)}
              placeholder="Your professional recommendation for the buyer..."
              className="w-full py-2.5 px-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500 resize-none h-20"
            />
          </div>
          <div className="flex items-center gap-2 p-3 bg-amber-50 rounded-lg border border-amber-200">
            <Info className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <p className="text-xs text-amber-700">
              {hasFailures
                ? 'This inspection has FAIL items. A supervisor review will be required before publication.'
                : 'All items passed or have advisories. Standard review applies.'}
            </p>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6 gap-3">
        <button
          onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
          disabled={currentSection === 0}
          className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        {currentSection < sections.length - 1 ? (
          <button
            onClick={() => setCurrentSection(currentSection + 1)}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 flex items-center gap-2"
          >
            Next Section <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={() => setShowSubmitConfirm(true)}
            disabled={requiredItemsMissing > 0}
            className="px-6 py-2.5 bg-green-600 text-white rounded-xl text-sm font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Send className="w-4 h-4" /> Submit Inspection
          </button>
        )}
      </div>

      {/* Submit Confirmation Modal */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Submit Inspection?</h3>
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Items Completed</span>
                <span className="font-medium">{completedItems} / {totalItems}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Pass</span>
                <span className="font-medium text-green-600">{Object.values(itemStates).filter(s => s.result === 'PASS').length}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Advisory</span>
                <span className="font-medium text-amber-600">{Object.values(itemStates).filter(s => s.result === 'ADVISORY').length}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Fail</span>
                <span className="font-medium text-red-600">{Object.values(itemStates).filter(s => s.result === 'FAIL').length}</span>
              </div>
            </div>
            {requiredItemsMissing > 0 && (
              <div className="p-3 bg-red-50 rounded-lg mb-4">
                <p className="text-sm text-red-700">{requiredItemsMissing} required items are incomplete.</p>
              </div>
            )}
            <div className="flex gap-3">
              <button onClick={() => setShowSubmitConfirm(false)} className="flex-1 border border-gray-200 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50">
                Cancel
              </button>
              <button onClick={handleSubmit} disabled={requiredItemsMissing > 0} className="flex-1 bg-green-600 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-green-700 disabled:opacity-50">
                Confirm Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
