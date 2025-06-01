
import { useState, useEffect } from 'react';
import { Wifi, WifiOff, AlertTriangle, CheckCircle, Signal } from 'lucide-react';

const ScanPanel = ({ onDeviceSelect }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [devices, setDevices] = useState([]);

  // Simulate BLE device scanning
  useEffect(() => {
    if (isScanning) {
      const interval = setInterval(() => {
        const newDevice = {
          id: Math.random().toString(36).substr(2, 9),
          mac: generateMacAddress(),
          name: generateDeviceName(),
          rssi: Math.floor(Math.random() * 100) - 100,
          threatLevel: Math.random() > 0.7 ? 'high' : Math.random() > 0.5 ? 'medium' : 'low',
          timestamp: new Date().toLocaleTimeString(),
        };
        
        setDevices(prev => [newDevice, ...prev.slice(0, 19)]);
      }, 2000 + Math.random() * 3000);

      return () => clearInterval(interval);
    }
  }, [isScanning]);

  const generateMacAddress = () => {
    return Array.from({length: 6}, () => 
      Math.floor(Math.random() * 256).toString(16).padStart(2, '0').toUpperCase()
    ).join(':');
  };

  const generateDeviceName = () => {
    const names = ['Unknown Device', 'BLE Sensor', 'SmartWatch', 'IoT Node', 'Nano Beacon', 'Health Monitor'];
    return names[Math.floor(Math.random() * names.length)];
  };

  const getThreatColor = (level) => {
    switch (level) {
      case 'high': return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      default: return 'text-green-400 bg-green-500/20 border-green-500/30';
    }
  };

  const getThreatIcon = (level) => {
    switch (level) {
      case 'high': return <AlertTriangle className="w-4 h-4" />;
      case 'medium': return <Signal className="w-4 h-4" />;
      default: return <CheckCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">BLE Device Scanner</h2>
          <p className="text-gray-300">Real-time Bluetooth Low Energy device detection and analysis</p>
        </div>
        
        <button
          onClick={() => setIsScanning(!isScanning)}
          className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
            isScanning
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white'
          }`}
        >
          {isScanning ? <WifiOff className="w-5 h-5" /> : <Wifi className="w-5 h-5" />}
          <span>{isScanning ? 'Stop Scan' : 'Start Scan'}</span>
        </button>
      </div>

      {isScanning && (
        <div className="mb-6 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
            <span className="text-cyan-400 font-medium">Scanning for BLE devices...</span>
          </div>
        </div>
      )}

      <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
        <div className="p-4 bg-white/5 border-b border-white/10">
          <h3 className="text-lg font-semibold text-white">Detected Devices ({devices.length})</h3>
        </div>
        
        <div className="max-h-96 overflow-y-auto">
          {devices.length === 0 ? (
            <div className="p-8 text-center text-gray-400">
              {isScanning ? 'Searching for devices...' : 'Start scanning to detect BLE devices'}
            </div>
          ) : (
            <div className="divide-y divide-white/10">
              {devices.map((device) => (
                <div 
                  key={device.id}
                  onClick={() => onDeviceSelect(device)}
                  className="p-4 hover:bg-white/5 cursor-pointer transition-colors duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="font-mono text-white font-medium">{device.mac}</span>
                        <span className={`px-2 py-1 rounded text-xs border ${getThreatColor(device.threatLevel)} flex items-center space-x-1`}>
                          {getThreatIcon(device.threatLevel)}
                          <span className="capitalize">{device.threatLevel}</span>
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-300">
                        <span>{device.name}</span>
                        <span>RSSI: {device.rssi} dBm</span>
                        <span>{device.timestamp}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${
                        device.rssi > -50 ? 'bg-green-400' : 
                        device.rssi > -70 ? 'bg-yellow-400' : 'bg-red-400'
                      }`}></div>
                    </div>
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

export default ScanPanel;
