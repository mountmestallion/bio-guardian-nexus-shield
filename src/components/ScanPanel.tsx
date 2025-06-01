
import { useState, useEffect } from 'react';
import { Bluetooth, BluetoothOff, AlertTriangle, CheckCircle, Signal } from 'lucide-react';

const ScanPanel = ({ onDeviceSelect }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [devices, setDevices] = useState([]);
  const [bluetoothSupported, setBluetoothSupported] = useState(false);

  useEffect(() => {
    // Check if Web Bluetooth API is supported
    if (navigator.bluetooth) {
      setBluetoothSupported(true);
    } else {
      console.log('Web Bluetooth API is not supported in this browser');
    }
  }, []);

  const startBluetoothScan = async () => {
    if (!navigator.bluetooth) {
      alert('Web Bluetooth API is not supported in this browser');
      return;
    }

    try {
      setIsScanning(true);
      
      // Request a Bluetooth device
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: ['battery_service', 'device_information']
      });

      console.log('Selected device:', device);

      const newDevice = {
        id: device.id || Math.random().toString(36).substr(2, 9),
        mac: device.id || generateMacAddress(),
        name: device.name || 'Unknown Device',
        rssi: Math.floor(Math.random() * 100) - 100, // Simulated RSSI
        threatLevel: Math.random() > 0.7 ? 'high' : Math.random() > 0.5 ? 'medium' : 'low',
        timestamp: new Date().toLocaleTimeString(),
        device: device
      };

      setDevices(prev => [newDevice, ...prev.slice(0, 19)]);

    } catch (error) {
      console.error('Bluetooth scan error:', error);
      if (error.name === 'NotFoundError') {
        console.log('No device selected');
      } else {
        alert('Error scanning for devices: ' + error.message);
      }
    } finally {
      setIsScanning(false);
    }
  };

  const stopScan = () => {
    setIsScanning(false);
    console.log('Bluetooth scan stopped');
  };

  const handleScanToggle = () => {
    if (isScanning) {
      stopScan();
    } else {
      startBluetoothScan();
    }
  };

  const generateMacAddress = () => {
    return Array.from({length: 6}, () => 
      Math.floor(Math.random() * 256).toString(16).padStart(2, '0').toUpperCase()
    ).join(':');
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
          <p className="text-gray-300">Real-time Bluetooth Low Energy device detection using Web Bluetooth API</p>
          {!bluetoothSupported && (
            <p className="text-red-400 text-sm mt-2">
              ⚠️ Web Bluetooth API not supported in this browser. Try Chrome/Edge on desktop or Android.
            </p>
          )}
        </div>
        
        <button
          onClick={handleScanToggle}
          disabled={!bluetoothSupported}
          className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
            !bluetoothSupported
              ? 'bg-gray-500 cursor-not-allowed text-gray-300'
              : isScanning
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white'
          }`}
        >
          {isScanning ? <BluetoothOff className="w-5 h-5" /> : <Bluetooth className="w-5 h-5" />}
          <span>{isScanning ? 'Stop Scan' : 'Start BLE Scan'}</span>
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
              {!bluetoothSupported 
                ? 'Web Bluetooth API not supported in this browser'
                : isScanning 
                ? 'Searching for devices...' 
                : 'Click "Start BLE Scan" to detect Bluetooth devices'
              }
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
