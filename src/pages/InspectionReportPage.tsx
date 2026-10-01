import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, AlertTriangle, XCircle, Minus, HelpCircle, MapPin, Calendar, User, Camera, Gauge, Shield, Printer } from 'lucide-react';
import { inspections, vehicles, users, formatMileage } from '../store/data';
import { Badge } from '../components/Layout';

export default function InspectionReportPage() {
  const { id } = useParams<{ id: string }>();
  const inspection = inspections.find(i => i.id === id);
  const vehicle = inspection ? vehicles.find(v => v.id === inspection.vehicleId) : null;
  const inspector = inspection ? users.find(u => u.id === inspection.inspectorId) : null;

  if (!inspection || !vehicle) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-medium text-gray-900">Inspection report not found</h2>
        <Link to="/" className="mt-4 inline-block text-blue-600">Go to homepage</Link>
      </div>
    );
  }

  const totalItems = inspection.sections.flatMap(s => s.items).length;
  const passItems = inspection.sections.flatMap(s => s.items).filter(i => i.result === 'PASS').length;
  const advisoryItems = inspection.sections.flatMap(s => s.items).filter(i => i.result === 'ADVISORY').length;
  const failItems = inspection.sections.flatMap(s => s.items).filter(i => i.result === 'FAIL').length;
  const naItems = inspection.sections.flatMap(s => s.items).filter(i => i.result === 'NOT_APPLICABLE' || i.result === 'UNABLE_TO_INSPECT').length;

  const getResultIcon = (result: string) => {
    switch (result) {
      case 'PASS': return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case 'ADVISORY': return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      case 'FAIL': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'NOT_APPLICABLE': return <Minus className="w-4 h-4 text-gray-400" />;
      default: return <HelpCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getResultColor = (result: string) => {
    switch (result) {
      case 'PASS': return 'bg-green-50 border-green-200';
      case 'ADVISORY': return 'bg-amber-50 border-amber-200';
      case 'FAIL': return 'bg-red-50 border-red-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link to="/" className="p-2 hover:bg-gray-100 rounded-lg"><ArrowLeft className="w-5 h-5 text-gray-600" /></Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Inspection Report</h1>
            <p className="text-sm text-gray-500">{vehicle.year} {vehicle.make} {vehicle.model} {vehicle.variant}</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 no-print">
          <Printer className="w-4 h-4" /> Print
        </button>
      </div>

      {/* Report Header Card */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-600">GadiBazar Verified Inspection</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900">{vehicle.year} {vehicle.make} {vehicle.model}</h2>
            <p className="text-sm text-gray-500">{vehicle.variant} • {vehicle.color}</p>
          </div>
          <div className={`px-4 py-2 rounded-xl text-center ${
            inspection.overallResult === 'PASS' ? 'bg-green-100' :
            inspection.overallResult === 'FAIL' ? 'bg-red-100' : 'bg-amber-100'
          }`}>
            <p className="text-xs text-gray-500">Overall Result</p>
            <p className={`text-lg font-bold ${
              inspection.overallResult === 'PASS' ? 'text-green-700' :
              inspection.overallResult === 'FAIL' ? 'text-red-700' : 'text-amber-700'
            }`}>{inspection.overallResult}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-100">
          <div>
            <p className="text-xs text-gray-500">Inspection Date</p>
            <p className="text-sm font-medium text-gray-900">{inspection.completedDate ? new Date(inspection.completedDate).toLocaleDateString() : 'N/A'}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Inspector</p>
            <p className="text-sm font-medium text-gray-900">{inspector?.fullName || 'N/A'}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Location</p>
            <p className="text-sm font-medium text-gray-900">{inspection.location}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Odometer</p>
            <p className="text-sm font-medium text-gray-900">{formatMileage(vehicle.mileage)}</p>
          </div>
        </div>
      </div>

      {/* Summary Bar */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <span className="text-sm text-gray-600">{passItems} Pass</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-amber-500 rounded-full" />
            <span className="text-sm text-gray-600">{advisoryItems} Advisory</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <span className="text-sm text-gray-600">{failItems} Fail</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-300 rounded-full" />
            <span className="text-sm text-gray-600">{naItems} N/A</span>
          </div>
          <div className="ml-auto">
            <span className="text-sm text-gray-500">{totalItems} total items checked</span>
          </div>
        </div>
        <div className="mt-3 flex h-2 rounded-full overflow-hidden">
          <div className="bg-green-500" style={{ width: `${(passItems / totalItems) * 100}%` }} />
          <div className="bg-amber-500" style={{ width: `${(advisoryItems / totalItems) * 100}%` }} />
          <div className="bg-red-500" style={{ width: `${(failItems / totalItems) * 100}%` }} />
          <div className="bg-gray-300" style={{ width: `${(naItems / totalItems) * 100}%` }} />
        </div>
      </div>

      {/* Detailed Sections */}
      <div className="space-y-4 mb-6">
        {inspection.sections.map(section => {
          const sectionPass = section.items.filter(i => i.result === 'PASS').length;
          const sectionAdvisory = section.items.filter(i => i.result === 'ADVISORY').length;
          const sectionFail = section.items.filter(i => i.result === 'FAIL').length;

          return (
            <div key={section.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">{section.name}</h3>
                <div className="flex items-center gap-2">
                  {sectionPass > 0 && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">{sectionPass} pass</span>}
                  {sectionAdvisory > 0 && <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">{sectionAdvisory} advisory</span>}
                  {sectionFail > 0 && <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">{sectionFail} fail</span>}
                </div>
              </div>
              <div className="divide-y divide-gray-50">
                {section.items.map(item => (
                  <div key={item.id} className={`px-5 py-3 flex items-start gap-3 ${getResultColor(item.result)} border-l-4 ${
                    item.result === 'PASS' ? 'border-l-green-500' :
                    item.result === 'ADVISORY' ? 'border-l-amber-500' :
                    item.result === 'FAIL' ? 'border-l-red-500' : 'border-l-gray-300'
                  }`}>
                    <div className="mt-0.5">{getResultIcon(item.result)}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900">{item.name}</span>
                        {item.severity && (
                          <Badge variant={item.severity === 'MAJOR' ? 'danger' : item.severity === 'MODERATE' ? 'warning' : 'default'}>
                            {item.severity}
                          </Badge>
                        )}
                      </div>
                      {item.comment && <p className="text-sm text-gray-600 mt-0.5">{item.comment}</p>}
                      {item.measurement && <p className="text-xs text-gray-500 mt-0.5">Measurement: {item.measurement}</p>}
                    </div>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                      item.result === 'PASS' ? 'bg-green-100 text-green-700' :
                      item.result === 'ADVISORY' ? 'bg-amber-100 text-amber-700' :
                      item.result === 'FAIL' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'
                    }`}>{item.result.replace(/_/g, ' ')}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Recommendation */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6">
        <h3 className="font-semibold text-blue-900 mb-2">Inspector's Recommendation</h3>
        <p className="text-sm text-blue-700">{inspection.recommendation}</p>
      </div>

      {/* Get Repair Quotes */}
      {advisoryItems > 0 || failItems > 0 ? (
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-5 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-orange-900 mb-1">Need Repairs?</h3>
              <p className="text-sm text-orange-700">
                {advisoryItems + failItems} item(s) need attention. Get quotes from verified partners.
              </p>
            </div>
            <Link to={`/repair-quotes/${inspection.id}`} className="bg-orange-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-orange-700 transition-colors whitespace-nowrap">
              Get Repair Quotes
            </Link>
          </div>
        </div>
      ) : null}

      {/* Notes */}
      {inspection.notes && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-6">
          <h3 className="font-semibold text-gray-900 mb-2">Additional Notes</h3>
          <p className="text-sm text-gray-700">{inspection.notes}</p>
        </div>
      )}

      {/* Supervisor Review */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="w-4 h-4 text-purple-600" />
          <h3 className="font-semibold text-gray-900">Quality Assurance</h3>
        </div>
        <div className="flex items-center gap-2">
          {inspection.supervisorReviewed ? (
            <Badge variant="success">Supervisor Reviewed ✓</Badge>
          ) : (
            <Badge variant="warning">Pending Supervisor Review</Badge>
          )}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
        <p className="text-xs text-gray-500 leading-relaxed">
          <strong>Disclaimer:</strong> This inspection report reflects the condition of the vehicle at the time and location of inspection. 
          It is based on visual inspection, diagnostic scanning, and road testing where applicable. It does not constitute a guarantee 
          of future condition or performance. The inspector can only assess what is observable and accessible during the inspection. 
          Hidden defects, intermittent issues, or future failures cannot be predicted. Always conduct your own due diligence.
        </p>
      </div>
    </div>
  );
}
