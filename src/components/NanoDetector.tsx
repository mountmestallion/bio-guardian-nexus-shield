
import { useState, useEffect } from 'react';
import { Shield, Zap, AlertTriangle, Target, Cpu, Radio } from 'lucide-react';

interface NanoDevice {
  id: string;
  mac: string;
  name: string;
  nanoType: 'graphene' | 'carbon_nanotube' | 'quantum_dot' | 'neural_mesh' | 'unknown';
  frequency: number;
  iobNetwork: boolean;
  threat_level: 'critical' | 'high' | 'medium' | 'low';
  biofield_signature: string;
  self_destruct_capable: boolean;
  lot_address: string;
}

interface NanoDetectorProps {
  onNanoDetect: (device: NanoDevice) => void;
}

const NanoDetector = ({ onNanoDetect }: NanoDetectorProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [detectedNanos, setDetectedNanos] = useState<NanoDevice[]>([]);
  const [scanMode, setScanMode] = useState<'passive' | 'active' | 'deep'>('passive');

  const nanoFrequencies = {
    graphene: [2.4, 5.8, 27.12, 40.68], // GHz ranges for nano-graphene
    carbon_nanotube: [1.8, 3.6, 14.5, 28.3],
    quantum_dot: [0.9, 1.9, 7.2, 15.6],
    neural_mesh: [0.1, 0.3, 0.8, 2.1],
  };

  const startNanoScan = async () => {
    setIsScanning(true);
    console.log(`Starting ${scanMode} nano-detection scan...`);

    // Simulate advanced nano-detection
    const scanInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        const nanoDevice = generateNanoDevice();
        setDetectedNanos(prev => {
          const filtered = prev.filter(d => d.id !== nanoDevice.id);
          return [nanoDevice, ...filtered.slice(0, 15)];
        });
        onNanoDetect(nanoDevice);
      }
    }, scanMode === 'deep' ? 1000 : scanMode === 'active' ? 2000 : 3000);

    setTimeout(() => {
      clearInterval(scanInterval);
      setIsScanning(false);
    }, 30000);
  };

  const generateNanoDevice = (): NanoDevice => {
    const nanoTypes = ['graphene', 'carbon_nanotube', 'quantum_dot', 'neural_mesh', 'unknown'] as const;
    const selectedType = nanoTypes[Math.floor(Math.random() * nanoTypes.length)];
    const frequencies = nanoFrequencies[selectedType] || [2.4, 5.8];
    
    return {
      id: `nano_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      mac: generateNanoMac(),
      name: generateNanoName(selectedType),
      nanoType: selectedType,
      frequency: frequencies[Math.floor(Math.random() * frequencies.length)],
      iobNetwork: Math.random() > 0.6,
      threat_level: assessNanoThreat(selectedType),
      biofield_signature: generateBiofieldSignature(),
      self_destruct_capable: Math.random() > 0.5,
      lot_address: generateLOTAddress(),
    };
  };

  const generateNanoMac = (): string => {
    return Array.from({length: 6}, () => 
      Math.floor(Math.random() * 256).toString(16).padStart(2, '0').toUpperCase()
    ).join(':');
  };

  const generateNanoName = (type: string): string => {
    const names = {
      graphene: ['NGO-Sensor', 'GraphNet-Node', 'CNano-Monitor'],
      carbon_nanotube: ['CNT-Array', 'Tube-Mesh', 'Carbon-Link'],
      quantum_dot: ['QDot-Beacon', 'Quantum-Node', 'QNet-Cell'],
      neural_mesh: ['Neural-Grid', 'Brain-Net', 'Mesh-Interface'],
      unknown: ['Unknown-Nano', 'Unidentified-Node']
    };
    const typeNames = names[type] || names.unknown;
    return typeNames[Math.floor(Math.random() * typeNames.length)];
  };

  const assessNanoThreat = (type: string): 'critical' | 'high' | 'medium' | 'low' => {
    if (type === 'neural_mesh') return 'critical';
    if (type === 'graphene') return Math.random() > 0.5 ? 'high' : 'medium';
    return Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low';
  };

  const generateBiofieldSignature = (): string => {
    const signatures = ['BF-Alpha', 'BF-Beta', 'BF-Gamma', 'BF-Delta', 'BF-Theta'];
    return signatures[Math.floor(Math.random() * signatures.length)] + 
           '-' + Math.floor(Math.random() * 9999).toString().padStart(4, '0');
  };

  const generateLOTAddress = (): string => {
    return `LOT://${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.` +
           `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}:` +
           `${8000 + Math.floor(Math.random() * 2000)}`;
  };

  const getThreatColor = (level: string) => {
    switch (level) {
      case 'critical': return 'text-purple-400 bg-purple-500/20 border-purple-500/30';
      case 'high': return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      default: return 'text-green-400 bg-green-500/20 border-green-500/30';
    }
  };

  const getNanoTypeIcon = (type: string) => {
    switch (type) {
      case 'graphene': return <Cpu className="w-4 h-4" />;
      case 'neural_mesh': return <Target className="w-4 h-4" />;
      case 'quantum_dot': return <Zap className="w-4 h-4" />;
      default: return <Radio className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white/5 rounded-xl border border-white/10 p-6">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
          <Shield className="w-6 h-6 text-cyan-400" />
          <span>Nano-Technology Detector</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="text-gray-300 text-sm mb-2 block">Scan Mode</label>
            <select 
              value={scanMode} 
              onChange={(e) => setScanMode(e.target.value as any)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
            >
              <option value="passive">Passive Detection</option>
              <option value="active">Active Scanning</option>
              <option value="deep">Deep Analysis</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <button
              onClick={startNanoScan}
              disabled={isScanning}
              className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
                isScanning
                  ? 'bg-red-500 text-white cursor-not-allowed'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white'
              }`}
            >
              {isScanning ? 'Scanning...' : 'Start Nano Scan'}
            </button>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{detectedNanos.length}</div>
            <div className="text-gray-400 text-sm">Nano Devices</div>
          </div>
        </div>

        {isScanning && (
          <div className="mb-4 p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <span className="text-cyan-400 text-sm">
                Scanning for nano-graphene and IOB networks... Mode: {scanMode}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
        <div className="p-4 bg-white/5 border-b border-white/10">
          <h4 className="text-lg font-semibold text-white">Detected Nano Devices</h4>
        </div>
        
        <div className="max-h-80 overflow-y-auto">
          {detectedNanos.length === 0 ? (
            <div className="p-6 text-center text-gray-400">
              No nano devices detected. Start scanning to discover IOB networks.
            </div>
          ) : (
            <div className="divide-y divide-white/10">
              {detectedNanos.map((device) => (
                <div key={device.id} className="p-4 hover:bg-white/5 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <span className="font-mono text-white text-sm">{device.mac}</span>
                      <span className={`px-2 py-1 rounded text-xs border ${getThreatColor(device.threat_level)} flex items-center space-x-1`}>
                        {getNanoTypeIcon(device.nanoType)}
                        <span className="capitalize">{device.threat_level}</span>
                      </span>
                      {device.self_destruct_capable && (
                        <span className="px-2 py-1 rounded text-xs bg-red-500/20 text-red-400 border border-red-500/30">
                          Self-Destruct
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-gray-300">
                    <div>
                      <span className="text-gray-400">Name:</span> {device.name}
                    </div>
                    <div>
                      <span className="text-gray-400">Type:</span> {device.nanoType.replace('_', ' ')}
                    </div>
                    <div>
                      <span className="text-gray-400">Freq:</span> {device.frequency} GHz
                    </div>
                    <div>
                      <span className="text-gray-400">IOB:</span> 
                      <span className={device.iobNetwork ? 'text-red-400' : 'text-green-400'}>
                        {device.iobNetwork ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-gray-400">
                    <div>Biofield: {device.biofield_signature}</div>
                    <div>LOT Address: {device.lot_address}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NanoDetector;
