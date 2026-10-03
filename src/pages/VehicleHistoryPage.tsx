import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Gauge, CheckCircle2, AlertTriangle, FileText, User, TrendingUp, Shield, Wrench } from 'lucide-react';
import { vehiclePassports, getVehicleById, inspections, formatMileage } from '../store/data';
import { Badge } from '../components/Layout';

export default function VehicleHistoryPage() {
  const { passportId } = useParams<{ passportId: string }>();
  const passport = vehiclePassports.find(p => p.passportId === passportId);
  const vehicle = passport ? getVehicleById(passport.vehicleId) : null;

  if (!passport || !vehicle) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-medium text-gray-900">Vehicle history not found</h2>
        <Link to="/" className="mt-4 inline-block text-blue-600">Go to homepage</Link>
      </div>
    );
  }

  // Build timeline events
  type TimelineEvent = {
    id: string;
    date: string;
    type: 'ownership' | 'odometer' | 'inspection' | 'service' | 'document' | 'listing';
    title: string;
    description: string;
    icon: any;
    color: string;
    details?: any;
  };

  const events: TimelineEvent[] = [];

  // Add ownership events
  passport.ownershipHistory.forEach(oh => {
    events.push({
      id: `own-${oh.id}`,
      date: oh.startDate,
      type: 'ownership',
      title: oh.isCurrent ? 'Current Owner' : 'Ownership Started',
      description: `${oh.ownerName} became the owner`,
      icon: User,
      color: 'bg-blue-100 text-blue-600',
      details: { verified: oh.verificationSource }
    });
  });

  // Add odometer events
  passport.odometerHistory.forEach(od => {
    events.push({
      id: `odo-${od.id}`,
      date: od.date,
      type: 'odometer',
      title: 'Odometer Reading',
      description: `${formatMileage(od.mileage)} recorded`,
      icon: Gauge,
      color: 'bg-green-100 text-green-600',
      details: { source: od.source, confidence: od.confidence, verifier: od.verifier }
    });
  });

  // Add inspection events
  passport.inspectionHistory.forEach(inspId => {
    const insp = inspections.find(i => i.id === inspId);
    if (insp) {
      events.push({
        id: `insp-${insp.id}`,
        date: insp.completedDate || insp.scheduledDate,
        type: 'inspection',
        title: 'Vehicle Inspection',
        description: `Overall result: ${insp.overallResult}`,
        icon: CheckCircle2,
        color: insp.overallResult === 'PASS' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600',
        details: { inspector: 'Anil Karki', location: insp.location }
      });
    }
  });

  // Add document verification events
  passport.documentVerifications.forEach(dv => {
    events.push({
      id: `doc-${dv.id}`,
      date: dv.verifiedDate || passport.issuedDate,
      type: 'document',
      title: `${dv.documentType} Verified`,
      description: `Status: ${dv.status}`,
      icon: FileText,
      color: dv.status === 'VERIFIED' ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-600',
      details: { source: dv.verificationSource }
    });
  });

  // Sort by date descending
  events.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
      <div className="flex items-center gap-3 mb-6">
        <Link to={`/passport/${passport.passportId}`} className="p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Vehicle History Timeline</h1>
          <p className="text-sm text-gray-500">{vehicle.year} {vehicle.make} {vehicle.model} • {passport.passportId}</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-blue-600">{passport.ownershipHistory.length}</p>
          <p className="text-xs text-gray-500 mt-1">Owners</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-green-600">{passport.odometerHistory.length}</p>
          <p className="text-xs text-gray-500 mt-1">Odometer Records</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-purple-600">{passport.inspectionHistory.length}</p>
          <p className="text-xs text-gray-500 mt-1">Inspections</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-amber-600">{passport.documentVerifications.length}</p>
          <p className="text-xs text-gray-500 mt-1">Documents Verified</p>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <h2 className="font-semibold text-gray-900 mb-6">Complete History</h2>
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200" />

          <div className="space-y-6">
            {events.map((event, i) => (
              <div key={event.id} className="relative flex gap-4">
                {/* Icon */}
                <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${event.color}`}>
                  <event.icon className="w-5 h-5" />
                </div>

                {/* Content */}
                <div className="flex-1 pb-6">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-medium text-gray-900">{event.title}</h3>
                      <p className="text-sm text-gray-600 mt-0.5">{event.description}</p>
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </span>
                  </div>

                  {/* Details */}
                  {event.details && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {event.details.verified && (
                        <Badge variant="info">{event.details.verified.replace(/_/g, ' ')}</Badge>
                      )}
                      {event.details.source && (
                        <Badge variant="info">{event.details.source.replace(/_/g, ' ')}</Badge>
                      )}
                      {event.details.confidence && (
                        <Badge variant={event.details.confidence === 'HIGH' ? 'success' : event.details.confidence === 'MEDIUM' ? 'warning' : 'danger'}>
                          {event.details.confidence} confidence
                        </Badge>
                      )}
                      {event.details.verifier && (
                        <span className="text-xs text-gray-500">by {event.details.verifier}</span>
                      )}
                      {event.details.inspector && (
                        <span className="text-xs text-gray-500">Inspector: {event.details.inspector}</span>
                      )}
                      {event.details.location && (
                        <span className="text-xs text-gray-500 flex items-center gap-0.5">
                          <MapPin className="w-3 h-3" /> {event.details.location}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 bg-gray-50 rounded-xl p-5 border border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-3">Timeline Legend</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: User, label: 'Ownership', color: 'bg-blue-100 text-blue-600' },
            { icon: Gauge, label: 'Odometer', color: 'bg-green-100 text-green-600' },
            { icon: CheckCircle2, label: 'Inspection', color: 'bg-green-100 text-green-600' },
            { icon: FileText, label: 'Document', color: 'bg-purple-100 text-purple-600' },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${item.color}`}>
                <item.icon className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs text-gray-600">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
        <p className="text-xs text-amber-700 leading-relaxed">
          <strong>Note:</strong> This timeline shows all recorded events for this vehicle. History is preserved permanently 
          and cannot be deleted. All entries include verification sources to help you assess reliability.
        </p>
      </div>
    </div>
  );
}
