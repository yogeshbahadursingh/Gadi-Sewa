import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CreditCard, Smartphone, Building2, CheckCircle2, Shield, Lock, AlertCircle, ArrowRight } from 'lucide-react';
import { Badge } from '../components/Layout';

interface PaymentPageProps {
  // These would come from route params in real app
}

type PaymentPurpose = 'inspection' | 'reservation' | 'premium_listing' | 'dealer_subscription';

const PAYMENT_DETAILS: Record<PaymentPurpose, { title: string; amount: number; description: string }> = {
  inspection: { title: 'Vehicle Inspection', amount: 5500, description: 'Standard inspection package (100+ points)' },
  reservation: { title: 'Reservation Deposit', amount: 50000, description: 'Refundable deposit to reserve vehicle' },
  premium_listing: { title: 'Premium Listing', amount: 2500, description: 'Featured listing for 30 days' },
  dealer_subscription: { title: 'Dealer Subscription', amount: 15000, description: 'Monthly dealer membership' },
};

export default function PaymentPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const purpose = (searchParams.get('purpose') || 'inspection') as PaymentPurpose;
  const referenceId = searchParams.get('ref') || `REF-${Date.now().toString().slice(-8)}`;
  
  const [step, setStep] = useState<'select' | 'processing' | 'success' | 'failed'>('select');
  const [selectedMethod, setSelectedMethod] = useState<'esewa' | 'khalti' | 'bank'>('esewa');
  const [processingError, setProcessingError] = useState('');

  const paymentDetails = PAYMENT_DETAILS[purpose];

  const paymentMethods = [
    {
      id: 'esewa' as const,
      name: 'eSewa',
      description: 'Pay with eSewa digital wallet',
      icon: '🟢',
      color: 'bg-green-50 border-green-200',
      activeColor: 'border-green-500 bg-green-50 ring-2 ring-green-200',
    },
    {
      id: 'khalti' as const,
      name: 'Khalti',
      description: 'Pay with Khalti digital wallet',
      icon: '🟣',
      color: 'bg-purple-50 border-purple-200',
      activeColor: 'border-purple-500 bg-purple-50 ring-2 ring-purple-200',
    },
    {
      id: 'bank' as const,
      name: 'Bank Transfer',
      description: 'Direct bank transfer (takes 1-2 days)',
      icon: '🏦',
      color: 'bg-blue-50 border-blue-200',
      activeColor: 'border-blue-500 bg-blue-50 ring-2 ring-blue-200',
    },
  ];

  const handlePayment = () => {
    setStep('processing');
    setProcessingError('');
    
    // Simulate payment processing
    setTimeout(() => {
      // 90% success rate for demo
      if (Math.random() > 0.1) {
        setStep('success');
      } else {
        setStep('failed');
      }
    }, 2500);
  };

  const handleRetry = () => {
    setStep('select');
  };

  if (step === 'processing') {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-6" />
        <h2 className="text-xl font-bold text-gray-900">Processing Payment</h2>
        <p className="text-gray-500 mt-2">Please wait while we process your payment...</p>
        <p className="text-xs text-gray-400 mt-4">Do not close this window</p>
      </div>
    );
  }

  if (step === 'success') {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Payment Successful!</h1>
        <p className="text-gray-500 mt-2">Your payment has been processed successfully.</p>

        <div className="mt-6 bg-white border border-gray-200 rounded-2xl p-6 text-left">
          <h3 className="font-semibold text-gray-900 mb-4">Payment Details</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Reference ID</span>
              <span className="text-sm font-mono font-medium">{referenceId}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Purpose</span>
              <span className="text-sm font-medium">{paymentDetails.title}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Amount</span>
              <span className="text-sm font-bold text-blue-600">Rs. {paymentDetails.amount.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Payment Method</span>
              <span className="text-sm font-medium">{selectedMethod === 'esewa' ? 'eSewa' : selectedMethod === 'khalti' ? 'Khalti' : 'Bank Transfer'}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-600">Status</span>
              <Badge variant="success">Succeeded</Badge>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-xl text-left">
          <p className="text-sm text-blue-700">
            <strong>What happens next?</strong><br />
            {purpose === 'inspection' && 'Your inspection has been confirmed. An inspector will be assigned and will contact you shortly.'}
            {purpose === 'reservation' && 'Your reservation is now confirmed. The seller has been notified and the vehicle is reserved for you.'}
            {purpose === 'premium_listing' && 'Your listing is now featured and will appear at the top of search results for 30 days.'}
            {purpose === 'dealer_subscription' && 'Your dealer subscription is now active. You have full access to the dealer dashboard.'}
          </p>
        </div>

        <div className="mt-6 flex gap-3">
          <button onClick={() => navigate('/dashboard')} className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700">
            Go to Dashboard
          </button>
          <button onClick={() => navigate('/')} className="flex-1 border border-gray-200 py-3 rounded-xl font-medium text-gray-700 hover:bg-gray-50">
            Go Home
          </button>
        </div>
      </div>
    );
  }

  if (step === 'failed') {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-10 h-10 text-red-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Payment Failed</h1>
        <p className="text-gray-500 mt-2">Your payment could not be processed. Please try again.</p>

        <div className="mt-6 p-4 bg-red-50 rounded-xl text-left">
          <p className="text-sm text-red-700">
            <strong>Possible reasons:</strong><br />
            • Insufficient balance in your account<br />
            • Network connectivity issue<br />
            • Payment provider temporarily unavailable<br />
            • Incorrect payment details
          </p>
        </div>

        <div className="mt-6 p-4 bg-amber-50 rounded-xl text-left">
          <p className="text-xs text-amber-700">
            <strong>Reference:</strong> {referenceId}<br />
            No amount has been charged to your account. If you believe you've been charged, please contact support.
          </p>
        </div>

        <div className="mt-6 flex gap-3">
          <button onClick={handleRetry} className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700">
            Try Again
          </button>
          <button onClick={() => navigate('/support')} className="flex-1 border border-gray-200 py-3 rounded-xl font-medium text-gray-700 hover:bg-gray-50">
            Contact Support
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <CreditCard className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Complete Payment</h1>
        <p className="text-gray-500 mt-1">{paymentDetails.description}</p>
      </div>

      {/* Payment Summary */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
        <h2 className="font-semibold text-gray-900 mb-4">Payment Summary</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <span className="text-sm text-gray-600">Service</span>
            <span className="text-sm font-medium">{paymentDetails.title}</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <span className="text-sm text-gray-600">Reference</span>
            <span className="text-sm font-mono">{referenceId}</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <span className="text-sm text-gray-600">Service Fee</span>
            <span className="text-sm">Rs. {paymentDetails.amount.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <span className="text-sm text-gray-600">Processing Fee</span>
            <span className="text-sm">Rs. 0</span>
          </div>
          <div className="flex items-center justify-between py-3">
            <span className="text-base font-semibold text-gray-900">Total</span>
            <span className="text-xl font-bold text-blue-600">Rs. {paymentDetails.amount.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
        <h2 className="font-semibold text-gray-900 mb-4">Select Payment Method</h2>
        <div className="space-y-3">
          {paymentMethods.map(method => (
            <button
              key={method.id}
              onClick={() => setSelectedMethod(method.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                selectedMethod === method.id ? method.activeColor : method.color + ' hover:border-gray-300'
              }`}
            >
              <span className="text-2xl">{method.icon}</span>
              <div className="text-left flex-1">
                <p className="font-medium text-gray-900">{method.name}</p>
                <p className="text-xs text-gray-500">{method.description}</p>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 ${
                selectedMethod === method.id ? 'border-blue-600 bg-blue-600' : 'border-gray-300'
              }`}>
                {selectedMethod === method.id && (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-start gap-3">
        <Lock className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-green-800">Secure Payment</p>
          <p className="text-xs text-green-700 mt-1">
            Your payment is processed securely through encrypted channels. We never store your payment credentials.
          </p>
        </div>
      </div>

      {/* Pay Button */}
      <button
        onClick={handlePayment}
        className="w-full bg-blue-600 text-white py-4 rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-lg"
      >
        Pay Rs. {paymentDetails.amount.toLocaleString()} <ArrowRight className="w-5 h-5" />
      </button>

      <p className="text-xs text-gray-500 text-center mt-4">
        By clicking pay, you agree to our <a href="/terms" className="text-blue-600 hover:underline">Terms of Service</a>
      </p>
    </div>
  );
}
