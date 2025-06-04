
import { useState } from 'react';
import { Zap, Target, AlertTriangle, Shield, Skull } from 'lucide-react';

interface NanoKillerProps {
  targetDevice?: any;
}

const NanoKiller = ({ targetDevice }: NanoKillerProps) => {
  const [isArmed, setIsArmed] = useState(false);
  const [killerMode, setKillerMode] = useState<'selective' | 'broadcast' | 'emp'>('selective');
  const [isExecuting, setIsExecuting] = useState(false);
  const [authCode, setAuthCode] = useState('');

  const executeNanoKiller = async () => {
    if (!isArmed || authCode !== 'ABYSS') {
      alert('Authentication required. Enter ABYSS authorization code.');
      return;
    }

    setIsExecuting(true);
    console.log(`Executing nano-killer protocol: ${killerMode}`);
    
    // Simulate nano-killer execution
    setTimeout(() => {
      alert(`Nano-killer ${killerMode} protocol executed successfully!`);
      setIsExecuting(false);
      setIsArmed(false);
      setAuthCode('');
    }, 3000);
  };

  const getModeDescription = (mode: string) => {
    switch (mode) {
      case 'selective':
        return 'Target specific nano devices with precision frequency disruption';
      case 'broadcast':
        return 'Wide-spectrum nano disruption affecting all detected devices';
      case 'emp':
        return 'Electromagnetic pulse to disable all electronic nano components';
      default:
        return '';
    }
  };

  const getModeColor = (mode: string) => {
    switch (mode) {
      case 'selective': return 'from-yellow-500 to-orange-600';
      case 'broadcast': return 'from-red-500 to-pink-600';
      case 'emp': return 'from-purple-500 to-violet-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white/5 rounded-xl border border-red-500/30 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
            <Skull className="w-6 h-6 text-red-400" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Nano-Killer Protocol</h3>
            <p className="text-gray-400 text-sm">BLE Nanonet Neutralization System</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-gray-300 text-sm mb-2 block">Killer Mode</label>
              <select 
                value={killerMode} 
                onChange={(e) => setKillerMode(e.target.value as any)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
              >
                <option value="selective">Selective Targeting</option>
                <option value="broadcast">Broadcast Disruption</option>
                <option value="emp">EMP Burst</option>
              </select>
              <p className="text-gray-400 text-xs mt-1">{getModeDescription(killerMode)}</p>
            </div>

            <div>
              <label className="text-gray-300 text-sm mb-2 block">Target Information</label>
              <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                {targetDevice ? (
                  <div className="text-sm">
                    <div className="text-white font-mono">{targetDevice.mac}</div>
                    <div className="text-gray-300">{targetDevice.name}</div>
                    <div className="text-gray-400">Type: {targetDevice.nanoType || 'BLE Device'}</div>
                  </div>
                ) : (
                  <div className="text-gray-400 text-sm">No target selected</div>
                )}
              </div>
            </div>

            <div>
              <label className="text-gray-300 text-sm mb-2 block">Authorization Code</label>
              <input
                type="password"
                value={authCode}
                onChange={(e) => setAuthCode(e.target.value)}
                placeholder="Enter ABYSS code"
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-400"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                <span className="text-red-400 font-medium">Critical Warning</span>
              </div>
              <p className="text-gray-300 text-sm">
                Nano-killer protocols will permanently disable target nanotechnology. 
                This operation cannot be reversed and may affect biological systems.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-300">Protocol Status</span>
                <span className={`px-2 py-1 rounded ${isArmed ? 'bg-red-500/20 text-red-400' : 'bg-gray-500/20 text-gray-400'}`}>
                  {isArmed ? 'ARMED' : 'DISARMED'}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-300">Biofield Framework</span>
                <span className="text-cyan-400">ABYSS v3.2.1</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-300">Blue Fish Protocol</span>
                <span className="text-green-400">Active</span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => setIsArmed(!isArmed)}
                className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
                  isArmed
                    ? 'bg-gray-600 hover:bg-gray-700 text-white'
                    : 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white'
                }`}
              >
                {isArmed ? 'Disarm Protocol' : 'Arm Nano-Killer'}
              </button>

              <button
                onClick={executeNanoKiller}
                disabled={!isArmed || isExecuting || authCode !== 'ABYSS'}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                  !isArmed || isExecuting || authCode !== 'ABYSS'
                    ? 'bg-gray-600 cursor-not-allowed text-gray-400'
                    : `bg-gradient-to-r ${getModeColor(killerMode)} hover:opacity-90 text-white`
                }`}
              >
                {isExecuting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Executing...</span>
                  </div>
                ) : (
                  `Execute ${killerMode.toUpperCase()} Protocol`
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white/5 rounded-xl border border-white/10 p-6">
        <h4 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
          <Target className="w-5 h-5 text-cyan-400" />
          <span>Nano-Killer Specifications</span>
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-white/5 rounded-lg">
            <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <div className="text-white font-medium">Frequency Range</div>
            <div className="text-gray-300 text-sm">0.1 Hz - 100 GHz</div>
          </div>
          
          <div className="text-center p-4 bg-white/5 rounded-lg">
            <Shield className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <div className="text-white font-medium">Protection Level</div>
            <div className="text-gray-300 text-sm">Biofield Shielded</div>
          </div>
          
          <div className="text-center p-4 bg-white/5 rounded-lg">
            <Target className="w-8 h-8 text-red-400 mx-auto mb-2" />
            <div className="text-white font-medium">Precision Mode</div>
            <div className="text-gray-300 text-sm">Sub-cellular targeting</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NanoKiller;
