
import { Shield, AlertTriangle, CheckCircle, Info, Activity } from 'lucide-react';

const DeviceAnalysis = ({ selectedDevice }) => {
  if (!selectedDevice) {
    return (
      <div className="p-8">
        <div className="text-center py-16">
          <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-400 mb-2">No Device Selected</h2>
          <p className="text-gray-500">Select a device from the BLE scan to view detailed analysis</p>
        </div>
      </div>
    );
  }

  const analysisData = {
    iccStatus: Math.random() > 0.5 ? 'clean' : 'flagged',
    nanonetRisk: Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low',
    deviceType: 'BLE Peripheral',
    manufacturer: 'Unknown',
    services: ['Health Service', 'Device Information', 'Battery Service'],
    characteristics: 12,
    security: Math.random() > 0.5 ? 'encrypted' : 'unencrypted',
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      default: return 'text-green-400';
    }
  };

  const getRiskIcon = (risk) => {
    switch (risk) {
      case 'high': return <AlertTriangle className="w-5 h-5 text-red-400" />;
      case 'medium': return <Info className="w-5 h-5 text-yellow-400" />;
      default: return <CheckCircle className="w-5 h-5 text-green-400" />;
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Device Analysis</h2>
        <p className="text-gray-300">ICC Database validation and nanonet threat assessment</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">Device Information</h3>
          <div className="space-y-3">
            <div>
              <span className="text-gray-400 text-sm">MAC Address</span>
              <p className="font-mono text-white">{selectedDevice.mac}</p>
            </div>
            <div>
              <span className="text-gray-400 text-sm">Device Name</span>
              <p className="text-white">{selectedDevice.name}</p>
            </div>
            <div>
              <span className="text-gray-400 text-sm">Signal Strength</span>
              <p className="text-white">{selectedDevice.rssi} dBm</p>
            </div>
            <div>
              <span className="text-gray-400 text-sm">Device Type</span>
              <p className="text-white">{analysisData.deviceType}</p>
            </div>
          </div>
        </div>

        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">Security Analysis</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">ICC Status</span>
              <span className={`px-2 py-1 rounded text-xs ${
                analysisData.iccStatus === 'clean' 
                  ? 'bg-green-500/20 text-green-400' 
                  : 'bg-red-500/20 text-red-400'
              }`}>
                {analysisData.iccStatus.toUpperCase()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Nanonet Risk</span>
              <div className="flex items-center space-x-2">
                {getRiskIcon(analysisData.nanonetRisk)}
                <span className={getRiskColor(analysisData.nanonetRisk)}>
                  {analysisData.nanonetRisk.toUpperCase()}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Connection Security</span>
              <span className={`px-2 py-1 rounded text-xs ${
                analysisData.security === 'encrypted' 
                  ? 'bg-green-500/20 text-green-400' 
                  : 'bg-red-500/20 text-red-400'
              }`}>
                {analysisData.security.toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">Threat Assessment</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              <span className="text-gray-300 text-sm">Real-time monitoring active</span>
            </div>
            <div className="text-xs text-gray-400">
              Last updated: {selectedDevice.timestamp}
            </div>
            <div className="pt-2">
              <div className="text-sm text-gray-300 mb-2">Risk Score</div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    analysisData.nanonetRisk === 'high' ? 'bg-red-500' :
                    analysisData.nanonetRisk === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ 
                    width: analysisData.nanonetRisk === 'high' ? '85%' : 
                           analysisData.nanonetRisk === 'medium' ? '45%' : '15%' 
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white/5 p-6 rounded-xl border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4">BLE Services & Characteristics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-3">Available Services</h4>
            <div className="space-y-2">
              {analysisData.services.map((service, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span className="text-gray-300 text-sm">{service}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-3">Analysis Summary</h4>
            <div className="space-y-2 text-sm">
              <p className="text-gray-300">
                <span className="text-white font-medium">{analysisData.characteristics}</span> characteristics detected
              </p>
              <p className="text-gray-300">
                Manufacturer: <span className="text-white">{analysisData.manufacturer}</span>
              </p>
              <p className="text-gray-300">
                Security Level: <span className={`font-medium ${
                  analysisData.security === 'encrypted' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {analysisData.security}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceAnalysis;
