
import { useState } from 'react';
import { AlertTriangle, Shield, Lock, Fingerprint } from 'lucide-react';

const CommandCenter = () => {
  const [isArmed, setIsArmed] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [authStep, setAuthStep] = useState(0);
  const [pin, setPin] = useState('');

  const handleSelfDestruct = () => {
    if (!isArmed) {
      setIsArmed(true);
      return;
    }
    setShowConfirmation(true);
  };

  const handleConfirmDestruct = () => {
    if (authStep === 0) {
      setAuthStep(1);
    } else if (authStep === 1 && pin === '1234') {
      setAuthStep(2);
      // Simulate self-destruct command
      setTimeout(() => {
        alert('Self-destruct command sent successfully!');
        setShowConfirmation(false);
        setAuthStep(0);
        setPin('');
        setIsArmed(false);
      }, 2000);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Command Center</h2>
        <p className="text-gray-300">Secure remote device control and self-destruct protocols</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">Self-Destruct Protocol</h3>
              <p className="text-gray-400 text-sm">Emergency device neutralization</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                <span className="text-red-400 font-medium">Warning</span>
              </div>
              <p className="text-gray-300 text-sm">
                This action will permanently disable the selected device. This operation cannot be undone.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Protocol Status</span>
                <span className={`px-2 py-1 rounded text-xs ${
                  isArmed ? 'bg-red-500/20 text-red-400' : 'bg-gray-500/20 text-gray-400'
                }`}>
                  {isArmed ? 'ARMED' : 'DISARMED'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Target Device</span>
                <span className="text-white font-mono text-sm">AA:BB:CC:DD:EE:FF</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Authentication</span>
                <span className="text-cyan-400 text-sm">Multi-factor required</span>
              </div>
            </div>

            <button
              onClick={handleSelfDestruct}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                isArmed
                  ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white'
                  : 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white'
              }`}
            >
              {isArmed ? 'Execute Self-Destruct' : 'Arm Self-Destruct Protocol'}
            </button>
          </div>
        </div>

        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">Security Controls</h3>
              <p className="text-gray-400 text-sm">Device protection and monitoring</p>
            </div>
          </div>

          <div className="space-y-4">
            <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-3 px-4 rounded-lg transition-all duration-200 font-medium">
              Enable Device Isolation
            </button>
            <button className="w-full bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white py-3 px-4 rounded-lg transition-all duration-200 font-medium">
              Start Deep Scan
            </button>
            <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3 px-4 rounded-lg transition-all duration-200 font-medium">
              Whitelist Device
            </button>
          </div>

          <div className="mt-6 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
            <h4 className="text-sm font-medium text-cyan-400 mb-2">Active Protections</h4>
            <div className="space-y-1 text-sm text-gray-300">
              <div className="flex items-center justify-between">
                <span>Real-time monitoring</span>
                <span className="text-green-400">Active</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Threat detection</span>
                <span className="text-green-400">Active</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Auto-quarantine</span>
                <span className="text-green-400">Enabled</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-900 p-8 rounded-2xl border border-red-500/30 max-w-md w-full mx-4">
            <div className="text-center mb-6">
              <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Confirm Self-Destruct</h3>
              <p className="text-gray-300">This action will permanently disable the target device</p>
            </div>

            {authStep === 0 && (
              <div className="space-y-4">
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <p className="text-red-400 text-sm text-center">
                    Place your finger on the sensor to proceed
                  </p>
                </div>
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center animate-pulse">
                    <Fingerprint className="w-8 h-8 text-red-400" />
                  </div>
                </div>
                <button
                  onClick={handleConfirmDestruct}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg transition-colors duration-200"
                >
                  Simulate Fingerprint Scan
                </button>
              </div>
            )}

            {authStep === 1 && (
              <div className="space-y-4">
                <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                  <div className="flex items-center space-x-2 justify-center">
                    <Lock className="w-5 h-5 text-yellow-400" />
                    <span className="text-yellow-400 text-sm">Enter Security PIN</span>
                  </div>
                </div>
                <input
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="Enter PIN (hint: 1234)"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400"
                />
                <button
                  onClick={handleConfirmDestruct}
                  disabled={pin.length < 4}
                  className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg transition-colors duration-200"
                >
                  Confirm PIN
                </button>
              </div>
            )}

            {authStep === 2 && (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                  <div className="w-8 h-8 border-2 border-green-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <p className="text-green-400">Sending self-destruct command...</p>
              </div>
            )}

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowConfirmation(false);
                  setAuthStep(0);
                  setPin('');
                }}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommandCenter;
