import { useState, useMemo } from 'react';
import { TrendingUp, Car, Gauge, Calendar, MapPin, CheckCircle2, Info, ArrowRight, Battery, Zap, AlertTriangle } from 'lucide-react';
import { vehicles, listings, formatPrice, getVehicleById } from '../store/data';
import { Badge } from '../components/Layout';

interface ValuationInput {
  make: string;
  model: string;
  year: number;
  mileage: number;
  condition: string;
  fuelType: string;
  district: string;
  batterySOH?: number;
  isInspected: boolean;
  hasPassport: boolean;
}

// Market data based on actual listings
const MARKET_DATA: Record<string, { avgPrice: number; minPrice: number; maxPrice: number; count: number }> = {
  'Toyota-Fortuner': { avgPrice: 12000000, minPrice: 9500000, maxPrice: 15000000, count: 8 },
  'Toyota-Innova': { avgPrice: 6500000, minPrice: 5000000, maxPrice: 8500000, count: 12 },
  'Hyundai-Creta': { avgPrice: 6800000, minPrice: 5200000, maxPrice: 8500000, count: 15 },
  'Honda-City': { avgPrice: 3500000, minPrice: 2500000, maxPrice: 4800000, count: 20 },
  'Honda-Activa': { avgPrice: 145000, minPrice: 110000, maxPrice: 180000, count: 25 },
  'BYD-Atto': { avgPrice: 5500000, minPrice: 4800000, maxPrice: 6200000, count: 6 },
  'Tata-Nexon': { avgPrice: 4200000, minPrice: 3500000, maxPrice: 5000000, count: 10 },
  'Kia-Seltos': { avgPrice: 5000000, minPrice: 4000000, maxPrice: 6200000, count: 11 },
  'MG-ZS': { avgPrice: 4000000, minPrice: 3500000, maxPrice: 4800000, count: 7 },
  'Maruti-Suzuki-Swift': { avgPrice: 1800000, minPrice: 1200000, maxPrice: 2400000, count: 18 },
  'Royal-Enfield-Classic': { avgPrice: 450000, minPrice: 350000, maxPrice: 580000, count: 14 },
  'Yamaha-MT': { avgPrice: 500000, minPrice: 420000, maxPrice: 600000, count: 9 },
};

const CONDITION_MULTIPLIERS: Record<string, number> = {
  'excellent': 1.08,
  'very-good': 1.03,
  'good': 1.0,
  'fair': 0.92,
  'needs-repair': 0.78,
};

const MILEAGE_PENALTY_PER_10K = 0.02; // 2% reduction per 10k km over average

export default function ValuationPage() {
  const [input, setInput] = useState<ValuationInput>({
    make: '',
    model: '',
    year: new Date().getFullYear() - 3,
    mileage: 30000,
    condition: 'good',
    fuelType: 'petrol',
    district: 'Kathmandu',
    batterySOH: undefined,
    isInspected: false,
    hasPassport: false,
  });

  const [showResult, setShowResult] = useState(false);

  const valuation = useMemo(() => {
    if (!input.make || !input.model) return null;

    const key = `${input.make}-${input.model}`;
    const market = MARKET_DATA[key];

    if (!market) {
      // Estimate based on similar vehicles
      const similarMakes = Object.keys(MARKET_DATA).filter(k => k.startsWith(input.make.split(' ')[0]));
      if (similarMakes.length === 0) return null;

      const avgMarket = similarMakes.reduce((sum, k) => sum + MARKET_DATA[k].avgPrice, 0) / similarMakes.length;
      return calculateValuation(avgMarket, avgMarket * 0.7, avgMarket * 1.3, input);
    }

    return calculateValuation(market.avgPrice, market.minPrice, market.maxPrice, input);
  }, [input]);

  const handleCalculate = () => {
    if (input.make && input.model) {
      setShowResult(true);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <TrendingUp className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Vehicle Valuation</h1>
        <p className="text-gray-500 mt-2">Get an instant market-based estimate for your vehicle's value</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Vehicle Details</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Make</label>
                <select
                  value={input.make}
                  onChange={e => setInput({ ...input, make: e.target.value, model: '' })}
                  className="w-full py-2.5 px-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500"
                >
                  <option value="">Select</option>
                  <option value="Toyota">Toyota</option>
                  <option value="Hyundai">Hyundai</option>
                  <option value="Honda">Honda</option>
                  <option value="BYD">BYD</option>
                  <option value="Tata">Tata</option>
                  <option value="Kia">Kia</option>
                  <option value="MG">MG</option>
                  <option value="Maruti Suzuki">Maruti Suzuki</option>
                  <option value="Royal Enfield">Royal Enfield</option>
                  <option value="Yamaha">Yamaha</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Model</label>
                <select
                  value={input.model}
                  onChange={e => setInput({ ...input, model: e.target.value })}
                  disabled={!input.make}
                  className="w-full py-2.5 px-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500 disabled:bg-gray-50"
                >
                  <option value="">Select</option>
                  {input.make === 'Toyota' && <><option value="Fortuner">Fortuner</option><option value="Innova">Innova</option><option value="Corolla">Corolla</option></>}
                  {input.make === 'Hyundai' && <><option value="Creta">Creta</option><option value="Tucson">Tucson</option><option value="Venue">Venue</option></>}
                  {input.make === 'Honda' && <><option value="City">City</option><option value="Activa">Activa</option><option value="CR-V">CR-V</option></>}
                  {input.make === 'BYD' && <option value="Atto">Atto 3</option>}
                  {input.make === 'Tata' && <><option value="Nexon">Nexon</option><option value="Punch">Punch</option></>}
                  {input.make === 'Kia' && <option value="Seltos">Seltos</option>}
                  {input.make === 'MG' && <option value="ZS">ZS EV</option>}
                  {input.make === 'Maruti Suzuki' && <option value="Swift">Swift</option>}
                  {input.make === 'Royal Enfield' && <option value="Classic">Classic 350</option>}
                  {input.make === 'Yamaha' && <option value="MT">MT-15</option>}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Year</label>
                <input
                  type="number"
                  value={input.year}
                  onChange={e => setInput({ ...input, year: Number(e.target.value) })}
                  min={2000}
                  max={new Date().getFullYear() + 1}
                  className="w-full py-2.5 px-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Mileage (km)</label>
                <input
                  type="number"
                  value={input.mileage}
                  onChange={e => setInput({ ...input, mileage: Number(e.target.value) })}
                  className="w-full py-2.5 px-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1.5">Condition</label>
              <select
                value={input.condition}
                onChange={e => setInput({ ...input, condition: e.target.value })}
                className="w-full py-2.5 px-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500"
              >
                <option value="excellent">Excellent - Like new, no issues</option>
                <option value="very-good">Very Good - Minor wear only</option>
                <option value="good">Good - Normal wear, well maintained</option>
                <option value="fair">Fair - Some issues, needs attention</option>
                <option value="needs-repair">Needs Repair - Major work required</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1.5">Fuel Type</label>
              <select
                value={input.fuelType}
                onChange={e => setInput({ ...input, fuelType: e.target.value })}
                className="w-full py-2.5 px-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500"
              >
                <option value="petrol">Petrol</option>
                <option value="diesel">Diesel</option>
                <option value="electric">Electric</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>

            {input.fuelType === 'electric' && (
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Battery State of Health (%)</label>
                <input
                  type="number"
                  value={input.batterySOH || ''}
                  onChange={e => setInput({ ...input, batterySOH: Number(e.target.value) })}
                  placeholder="e.g., 95"
                  min={0}
                  max={100}
                  className="w-full py-2.5 px-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">Get this verified through an inspection for accurate valuation</p>
              </div>
            )}

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1.5">Location</label>
              <select
                value={input.district}
                onChange={e => setInput({ ...input, district: e.target.value })}
                className="w-full py-2.5 px-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500"
              >
                <option value="Kathmandu">Kathmandu</option>
                <option value="Lalitpur">Lalitpur</option>
                <option value="Bhaktapur">Bhaktapur</option>
                <option value="Pokhara">Pokhara</option>
                <option value="Chitwan">Chitwan</option>
              </select>
            </div>

            <div className="space-y-2 pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={input.isInspected}
                  onChange={e => setInput({ ...input, isInspected: e.target.checked })}
                  className="rounded border-gray-300 text-blue-600"
                />
                <span className="text-sm text-gray-700">Professionally inspected</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={input.hasPassport}
                  onChange={e => setInput({ ...input, hasPassport: e.target.checked })}
                  className="rounded border-gray-300 text-blue-600"
                />
                <span className="text-sm text-gray-700">Has Vehicle Passport</span>
              </label>
            </div>

            <button
              onClick={handleCalculate}
              disabled={!input.make || !input.model}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              Get Valuation <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Result */}
        <div>
          {!showResult || !valuation ? (
            <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center h-full flex flex-col items-center justify-center">
              <TrendingUp className="w-12 h-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900">Enter Vehicle Details</h3>
              <p className="text-sm text-gray-500 mt-1">Fill in the form to get an instant market-based valuation</p>
            </div>
          ) : (
            <div className="space-y-4 animate-fade-in">
              {/* Main Value */}
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white">
                <p className="text-sm text-blue-200 mb-1">Estimated Market Value</p>
                <p className="text-4xl font-bold">{formatPrice(valuation.estimated)}</p>
                <div className="mt-4 flex items-center gap-4 text-sm">
                  <div>
                    <p className="text-blue-200">Range</p>
                    <p className="font-medium">{formatPrice(valuation.low)} — {formatPrice(valuation.high)}</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/20 flex items-center gap-2">
                  <Info className="w-4 h-4 text-blue-200" />
                  <p className="text-xs text-blue-100">Based on {valuation.dataPoints} similar vehicles in the market</p>
                </div>
              </div>

              {/* Breakdown */}
              <div className="bg-white rounded-2xl border border-gray-200 p-5">
                <h3 className="font-semibold text-gray-900 mb-3">Valuation Breakdown</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Base market price</span>
                    <span className="text-sm font-medium">{formatPrice(valuation.basePrice)}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Condition adjustment</span>
                    <span className={`text-sm font-medium ${valuation.conditionAdj >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {valuation.conditionAdj >= 0 ? '+' : ''}{formatPrice(valuation.conditionAdj)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Mileage adjustment</span>
                    <span className={`text-sm font-medium ${valuation.mileageAdj >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {valuation.mileageAdj >= 0 ? '+' : ''}{formatPrice(valuation.mileageAdj)}
                    </span>
                  </div>
                  {valuation.inspectionBonus > 0 && (
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-600 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> Inspection bonus</span>
                      <span className="text-sm font-medium text-green-600">+{formatPrice(valuation.inspectionBonus)}</span>
                    </div>
                  )}
                  {valuation.passportBonus > 0 && (
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-600 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-blue-500" /> Passport bonus</span>
                      <span className="text-sm font-medium text-blue-600">+{formatPrice(valuation.passportBonus)}</span>
                    </div>
                  )}
                  {valuation.batteryBonus !== 0 && (
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-600 flex items-center gap-1"><Battery className="w-3.5 h-3.5 text-emerald-500" /> Battery health</span>
                      <span className={`text-sm font-medium ${valuation.batteryBonus >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {valuation.batteryBonus >= 0 ? '+' : ''}{formatPrice(valuation.batteryBonus)}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Confidence */}
              <div className="bg-white rounded-2xl border border-gray-200 p-5">
                <h3 className="font-semibold text-gray-900 mb-3">Confidence Level</h3>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${valuation.confidence >= 80 ? 'bg-green-500' : valuation.confidence >= 60 ? 'bg-amber-500' : 'bg-red-500'}`}
                      style={{ width: `${valuation.confidence}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-gray-900">{valuation.confidence}%</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {valuation.confidence >= 80
                    ? 'High confidence — many similar vehicles in market'
                    : valuation.confidence >= 60
                    ? 'Medium confidence — limited comparable data'
                    : 'Low confidence — few similar vehicles. Consider professional inspection.'}
                </p>
              </div>

              {/* Recommendations */}
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
                <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                  <Info className="w-4 h-4" /> Recommendations
                </h3>
                <ul className="space-y-1.5 text-sm text-blue-700">
                  {!input.isInspected && (
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>Get a professional inspection to increase value by 3-5%</span>
                    </li>
                  )}
                  {!input.hasPassport && (
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>Obtain a Vehicle Passport for buyer confidence</span>
                    </li>
                  )}
                  {input.fuelType === 'electric' && !input.batterySOH && (
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>Verify battery SOH through inspection for accurate EV valuation</span>
                    </li>
                  )}
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>List at {formatPrice(valuation.estimated)} for competitive pricing</span>
                  </li>
                </ul>
              </div>

              {/* Disclaimer */}
              <p className="text-xs text-gray-500 text-center px-4">
                This is an estimate based on current market data. Actual sale price may vary based on buyer demand, 
                negotiation, and vehicle-specific factors. For precise valuation, book a professional inspection.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function calculateValuation(basePrice: number, minPrice: number, maxPrice: number, input: ValuationInput) {
  // Condition adjustment
  const conditionMult = CONDITION_MULTIPLIERS[input.condition] || 1.0;
  const conditionAdj = basePrice * (conditionMult - 1);

  // Mileage adjustment (average is 15k km/year)
  const vehicleAge = new Date().getFullYear() - input.year;
  const avgMileage = vehicleAge * 15000;
  const mileageDiff = input.mileage - avgMileage;
  const mileageAdj = -(mileageDiff / 10000) * basePrice * MILEAGE_PENALTY_PER_10K;

  // Year adjustment
  const yearAdj = (input.year - (new Date().getFullYear() - 3)) * basePrice * 0.03;

  // Inspection bonus
  const inspectionBonus = input.isInspected ? basePrice * 0.04 : 0;

  // Passport bonus
  const passportBonus = input.hasPassport ? basePrice * 0.03 : 0;

  // Battery bonus for EVs
  let batteryBonus = 0;
  if (input.fuelType === 'electric' && input.batterySOH) {
    if (input.batterySOH >= 95) batteryBonus = basePrice * 0.05;
    else if (input.batterySOH >= 90) batteryBonus = basePrice * 0.02;
    else if (input.batterySOH >= 85) batteryBonus = 0;
    else if (input.batterySOH >= 80) batteryBonus = -basePrice * 0.03;
    else batteryBonus = -basePrice * 0.08;
  }

  const estimated = Math.round(basePrice + conditionAdj + mileageAdj + yearAdj + inspectionBonus + passportBonus + batteryBonus);
  const low = Math.round(minPrice * conditionMult + mileageAdj * 0.5);
  const high = Math.round(maxPrice * conditionMult + mileageAdj * 0.5);

  // Confidence based on data availability
  const key = `${input.make}-${input.model}`;
  const market = MARKET_DATA[key];
  const confidence = market ? Math.min(95, 60 + market.count * 2) : 45;

  return {
    estimated,
    low: Math.max(low, estimated * 0.85),
    high: Math.min(high, estimated * 1.15),
    basePrice: Math.round(basePrice),
    conditionAdj: Math.round(conditionAdj),
    mileageAdj: Math.round(mileageAdj),
    inspectionBonus: Math.round(inspectionBonus),
    passportBonus: Math.round(passportBonus),
    batteryBonus: Math.round(batteryBonus),
    confidence,
    dataPoints: market?.count || 5,
  };
}
