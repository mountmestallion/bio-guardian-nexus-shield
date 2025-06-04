
import { useState, useEffect } from 'react';
import { Network, Users, Brain, AlertTriangle, Zap } from 'lucide-react';

interface IOBNetwork {
  id: string;
  name: string;
  nodeCount: number;
  networkType: 'body2body' | 'neural_mesh' | 'biofield_sync' | 'quantum_entangled';
  threatLevel: 'critical' | 'high' | 'medium' | 'low';
  selfDestructCapable: boolean;
  communicationProtocol: string;
  encryptionLevel: string;
  biofieldFrequency: number;
}

const IOBNetworkAnalyzer = () => {
  const [networks, setNetworks] = useState<IOBNetwork[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState<IOBNetwork | null>(null);

  const startAnalysis = () => {
    setIsAnalyzing(true);
    console.log('Starting IOB network analysis...');
    
    setTimeout(() => {
      const mockNetworks: IOBNetwork[] = [
        {
          id: 'iob_001',
          name: 'Neural-Mesh-Alpha',
          nodeCount: 12,
          networkType: 'neural_mesh',
          threatLevel: 'critical',
          selfDestructCapable: true,
          communicationProtocol: 'BLE-NanoNet-v2.1',
          encryptionLevel: 'Quantum-AES-512',
          biofieldFrequency: 7.83
        },
        {
          id: 'iob_002',
          name: 'Body2Body-Network-Beta',
          nodeCount: 8,
          networkType: 'body2body',
          threatLevel: 'high',
          selfDestructCapable: false,
          communicationProtocol: 'Biofield-Sync-Protocol',
          encryptionLevel: 'Standard-AES-256',
          biofieldFrequency: 40.5
        }
      ];
      setNetworks(mockNetworks);
      setIsAnalyzing(false);
    }, 3000);
  };

  const getThreatColor = (level: string) => {
    switch (level) {
      case 'critical': return 'text-purple-400 bg-purple-500/20';
      case 'high': return 'text-red-400 bg-red-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      default: return 'text-green-400 bg-green-500/20';
    }
  };

  const getNetworkIcon = (type: string) => {
    switch (type) {
      case 'neural_mesh': return <Brain className="w-5 h-5" />;
      case 'body2body': return <Users className="w-5 h-5" />;
      case 'biofield_sync': return <Zap className="w-5 h-5" />;
      default: return <Network className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white/5 rounded-xl border border-white/10 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white flex items-center space-x-2">
            <Network className="w-6 h-6 text-purple-400" />
            <span>IOB Network Analyzer</span>
          </h3>
          
          <button
            onClick={startAnalysis}
            disabled={isAnalyzing}
            className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
              isAnalyzing
                ? 'bg-gray-500 cursor-not-allowed text-gray-300'
                : 'bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white'
            }`}
          >
            {isAnalyzing ? 'Analyzing...' : 'Start IOB Analysis'}
          </button>
        </div>

        {isAnalyzing && (
          <div className="mb-6 p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
              <span className="text-purple-400">Analyzing Internet of Bodies networks...</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-medium text-white mb-4">Detected Networks</h4>
            <div className="space-y-3">
              {networks.map((network) => (
                <div 
                  key={network.id}
                  onClick={() => setSelectedNetwork(network)}
                  className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {getNetworkIcon(network.networkType)}
                      <span className="font-medium text-white">{network.name}</span>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs ${getThreatColor(network.threatLevel)}`}>
                      {network.threatLevel.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-sm text-gray-300">
                    <div>Nodes: {network.nodeCount}</div>
                    <div>Type: {network.networkType.replace('_', ' ')}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            {selectedNetwork ? (
              <div className="space-y-4">
                <h4 className="text-lg font-medium text-white">Network Details</h4>
                <div className="bg-white/5 rounded-lg border border-white/10 p-4">
                  <div className="space-y-3">
                    <div>
                      <span className="text-gray-400">Network ID:</span>
                      <span className="text-white ml-2 font-mono">{selectedNetwork.id}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Protocol:</span>
                      <span className="text-white ml-2">{selectedNetwork.communicationProtocol}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Encryption:</span>
                      <span className="text-white ml-2">{selectedNetwork.encryptionLevel}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Biofield Freq:</span>
                      <span className="text-white ml-2">{selectedNetwork.biofieldFrequency} Hz</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Self-Destruct:</span>
                      <span className={`ml-2 ${selectedNetwork.selfDestructCapable ? 'text-red-400' : 'text-green-400'}`}>
                        {selectedNetwork.selfDestructCapable ? 'Capable' : 'Not Capable'}
                      </span>
                    </div>
                  </div>
                  
                  {selectedNetwork.selfDestructCapable && (
                    <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="w-4 h-4 text-red-400" />
                        <span className="text-red-400 text-sm">
                          Self-destruct capability detected - High risk network
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white/5 rounded-lg border border-white/10 p-8 text-center">
                <Network className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400">Select a network to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IOBNetworkAnalyzer;
