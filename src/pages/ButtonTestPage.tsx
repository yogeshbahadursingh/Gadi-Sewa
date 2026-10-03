import { useState } from 'react';
import { useAuth } from '../context/AppContext';
import { useToast } from '../components/Toast';

export default function ButtonTestPage() {
  const { switchRole, currentUser } = useAuth();
  const { showToast } = useToast();
  const [clickCount, setClickCount] = useState(0);
  const [testValue, setTestValue] = useState('Initial');

  const handleRegularClick = () => {
    console.log('Regular button clicked!');
    setClickCount(prev => prev + 1);
    showToast({
      type: 'success',
      title: 'Button Works!',
      message: `Clicked ${clickCount + 1} times`,
    });
  };

  const handleRoleSwitch = (role: string) => {
    console.log('Switching role to:', role);
    switchRole(role);
    showToast({
      type: 'info',
      title: 'Role Changed',
      message: `Switched to ${role}`,
    });
  };

  const handleStateChange = () => {
    console.log('Changing state...');
    setTestValue(prev => prev === 'Initial' ? 'Changed' : 'Initial');
    showToast({
      type: 'info',
      title: 'State Changed',
      message: `Value is now: ${testValue}`,
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Button Click Test</h1>
      
      <div className="space-y-6">
        {/* Test 1: Regular Button */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Test 1: Regular Button Click</h2>
          <button
            onClick={handleRegularClick}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors"
          >
            Click Me (Count: {clickCount})
          </button>
          <p className="text-sm text-gray-500 mt-2">
            This button should increment the counter and show a toast notification
          </p>
        </div>

        {/* Test 2: Role Switcher */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Test 2: Role Switcher</h2>
          <p className="text-sm text-gray-600 mb-3">Current role: {currentUser?.role || 'None'}</p>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => handleRoleSwitch('SUPER_ADMIN')}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Switch to Admin
            </button>
            <button
              onClick={() => handleRoleSwitch('PRIVATE_SELLER')}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Switch to Seller
            </button>
            <button
              onClick={() => handleRoleSwitch('BUYER')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Switch to Buyer
            </button>
            <button
              onClick={() => handleRoleSwitch('INSPECTOR')}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
            >
              Switch to Inspector
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            These buttons should switch your role and show a toast notification
          </p>
        </div>

        {/* Test 3: State Change */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Test 3: State Change</h2>
          <p className="text-sm text-gray-600 mb-3">Current value: {testValue}</p>
          <button
            onClick={handleStateChange}
            className="bg-orange-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-orange-700 transition-colors"
          >
            Toggle State
          </button>
          <p className="text-sm text-gray-500 mt-2">
            This button should toggle the state value and show a toast notification
          </p>
        </div>

        {/* Test 4: Link Navigation */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Test 4: Link Navigation</h2>
          <a
            href="/search"
            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-700 transition-colors"
          >
            Go to Search Page
          </a>
          <p className="text-sm text-gray-500 mt-2">
            This link should navigate to the search page
          </p>
        </div>

        {/* Test 5: Form Submission */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Test 5: Form Submission</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            console.log('Form submitted!');
            showToast({
              type: 'success',
              title: 'Form Submitted',
              message: 'Form submission works!',
            });
          }}>
            <input
              type="text"
              placeholder="Type something..."
              className="w-full px-4 py-2 border border-gray-200 rounded-lg mb-3"
            />
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-green-700 transition-colors"
            >
              Submit Form
            </button>
          </form>
          <p className="text-sm text-gray-500 mt-2">
            This form should submit without reloading the page and show a toast
          </p>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-semibold text-blue-900 mb-2">Instructions</h3>
          <ul className="space-y-1 text-sm text-blue-700">
            <li>1. Click each button and observe if it responds</li>
            <li>2. Check if toast notifications appear</li>
            <li>3. Open browser console (F12) to see console.log messages</li>
            <li>4. Report which buttons are not working</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
