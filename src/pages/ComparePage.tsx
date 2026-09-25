import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, XCircle, AlertTriangle, Zap, Gauge, Fuel, Settings, Calendar, MapPin, Shield, Battery, Star, ArrowRightLeft } from 'lucide-react';
import { listings, vehicles, getVehicleById, formatPrice, formatMileage, getPassportByVehicleId, getInspectionByListingId } from '../store/data';
import { Badge } from '../components/Layout';

export default function ComparePage() {
  const [searchParams] = useSearchParams();
  const initialIds = searchParams.get('vehicles')?.split(',') || ['l1', 'l3'];
  const [selectedIds, setSelectedIds] = useState<string[]>(initialIds);
  const [showPicker, setShowPicker] = useState(false);

  const selectedListings = selectedIds.map(id => listings.find(l => l.id === id)).filter(Boolean);
  const selectedVehicles = selectedListings.map(l => getVehicleById(l!.vehicleId)).filter(Boolean);

  const addVehicle = (id: string) => {
    if (selectedIds.length < 4 && !selectedIds.includes(id)) {
      setSelectedIds([...selectedIds, id]);
    }
    setShowPicker(false);
  };

  const removeVehicle = (id: string) => {
    setSelectedIds(selectedIds.filter(i => i !== id));
  };

  const availableListings = listings.filter(l => l.status === 'ACTIVE' && !selectedIds.includes(l.id));

  const comparisonRows = [
    { label: 'Price', key: 'price', format: (l: any, v: any) => formatPrice(l.price) },
    { label: 'Make', key: 'make', format: (l: any, v: any) => v.make },
    { label: 'Model', key: 'model', format: (l: any, v: any) => v.model },
    { label: 'Variant', key: 'variant', format: (l: any, v: any) => v.variant },
    { label: 'Year', key: 'year', format: (l: any, v: any) => v.year },
    { label: 'Mileage', key: 'mileage', format: (l: any, v: any) => formatMileage(v.mileage) },
    { label: 'Fuel Type', key: 'fuel', format: (l: any, v: any) => v.fuelType },
    { label: 'Transmission', key: 'trans', format: (l: any, v: any) => v.transmission },
    { label: 'Body Style', key: 'body', format: (l: any, v: any) => v.bodyStyle },
    { label: 'Engine', key: 'engine', format: (l: any, v: any) => v.engineCC ? `${v.engineCC} CC` : 'Electric' },
    { label: 'Color', key: 'color', format: (l: any, v: any) => v.color },
    { label: 'Condition', key: 'condition', format: (l: any, v: any) => v.condition },
    { label: 'Inspected', key: 'inspected', format: (l: any, v: any) => l.isInspected ? 'Yes ✓' : 'No' },
    { label: 'Passport', key: 'passport', format: (l: any, v: any) => l.hasPassport ? 'Yes ✓' : 'No' },
    { label: 'Location', key: 'location', format: (l: any, v: any) => l.district },
    { label: 'Negotiable', key: 'nego', format: (l: any, v: any) => l.negotiable ? 'Yes' : 'Fixed' },
  ];

  if (selectedVehicles.some(v => v?.isEV)) {
    comparisonRows.push(
      { label: 'Battery SOH', key: 'soh', format: (l: any, v: any) => v.batterySOH ? `${v.batterySOH}%` : 'N/A' },
      { label: 'Battery Capacity', key: 'cap', format: (l: any, v: any) => v.batteryCapacity ? `${v.batteryCapacity} kWh` : 'N/A' },
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <div className="flex items-center gap-3 mb-6">
        <Link to="/search" className="p-2 hover:bg-gray-100 rounded-lg"><ArrowLeft className="w-5 h-5 text-gray-600" /></Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Compare Vehicles</h1>
          <p className="text-sm text-gray-500">Side-by-side comparison of {selectedListings.length} vehicles</p>
        </div>
      </div>

      {selectedListings.length === 0 ? (
        <div className="text-center py-16">
          <ArrowRightLeft className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No vehicles selected</h3>
          <p className="text-sm text-gray-500 mt-1">Add vehicles to compare them side by side</p>
          <button onClick={() => setShowPicker(true)} className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700">
            Select Vehicles
          </button>
        </div>
      ) : (
        <>
          {/* Vehicle cards */}
          <div className={`grid gap-4 mb-6`} style={{ gridTemplateColumns: `repeat(${selectedListings.length}, minmax(0, 1fr))` }}>
            {selectedListings.map((listing, i) => {
              const vehicle = selectedVehicles[i];
              if (!listing || !vehicle) return null;
              return (
                <div key={listing.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <div className="relative aspect-[16/10] bg-gray-100">
                    <img src={listing.images[0]} alt="" className="w-full h-full object-cover" />
                    <button onClick={() => removeVehicle(listing.id)} className="absolute top-2 right-2 w-7 h-7 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 text-xs">×</button>
                    {vehicle.isEV && <span className="absolute top-2 left-2 bg-emerald-500 text-white text-xs px-2 py-0.5 rounded flex items-center gap-1"><Zap className="w-3 h-3" /> EV</span>}
                  </div>
                  <div className="p-3">
                    <p className="font-semibold text-gray-900 text-sm line-clamp-1">{vehicle.make} {vehicle.model}</p>
                    <p className="text-lg font-bold text-blue-600">{formatPrice(listing.price)}</p>
                    <Link to={`/listing/${listing.id}`} className="text-xs text-blue-600 hover:text-blue-700 mt-1 inline-block">View full details →</Link>
                  </div>
                </div>
              );
            })}
            {selectedIds.length < 4 && (
              <button onClick={() => setShowPicker(true)} className="border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center min-h-[200px] hover:border-blue-400 hover:bg-blue-50 transition-colors">
                <span className="text-2xl text-gray-400">+</span>
                <span className="text-sm text-gray-500 mt-1">Add vehicle</span>
              </button>
            )}
          </div>

          {/* Comparison table */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr key={row.key} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-4 py-3 text-sm font-medium text-gray-500 w-40 border-r border-gray-100">{row.label}</td>
                      {selectedListings.map((listing, j) => {
                        const vehicle = selectedVehicles[j];
                        if (!listing || !vehicle) return <td key={j} className="px-4 py-3 text-sm text-gray-400">-</td>;
                        const value = row.format(listing, vehicle);
                        return (
                          <td key={j} className="px-4 py-3 text-sm text-gray-900 font-medium border-r border-gray-50 last:border-0">
                            {value}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Vehicle picker modal */}
      {showPicker && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[80vh] overflow-hidden flex flex-col">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Select Vehicle to Compare</h3>
              <button onClick={() => setShowPicker(false)} className="text-gray-400 hover:text-gray-600 text-xl">×</button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {availableListings.map(listing => {
                const vehicle = getVehicleById(listing.vehicleId);
                if (!vehicle) return null;
                return (
                  <button key={listing.id} onClick={() => addVehicle(listing.id)} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 text-left transition-colors">
                    <img src={listing.images[0]} alt="" className="w-16 h-12 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{vehicle.make} {vehicle.model} {vehicle.variant}</p>
                      <p className="text-sm font-bold text-blue-600">{formatPrice(listing.price)}</p>
                      <p className="text-xs text-gray-500">{formatMileage(vehicle.mileage)} • {vehicle.year}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
