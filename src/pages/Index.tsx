
import React, { useState } from 'react';
import { Shield, Wifi, Settings, AlertTriangle, Activity, Target } from 'lucide-react';
import DashboardHeader from '../components/DashboardHeader';
import ScanPanel from '../components/ScanPanel';
import DeviceAnalysis from '../components/DeviceAnalysis';
import CommandCenter from '../components/CommandCenter';
import SettingsPanel from '../components/SettingsPanel';
import NanoDetector from '../components/NanoDetector';
import IOBNetworkAnalyzer from '../components/IOBNetworkAnalyzer';
import NanoKiller from '../components/NanoKiller';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [selectedNanoDevice, setSelectedNanoDevice] = useState(null);

  const handleNanoDetect = (device: any) => {
    setSelectedNanoDevice(device);
    console.log('Nano device detected:', device);
  };

  const renderActivePanel = () => {
    switch (activeTab) {
      case 'scan':
        return <ScanPanel onDeviceSelect={setSelectedDevice} />;
      case 'nano':
        return <NanoDetector onNanoDetect={handleNanoDetect} />;
      case 'iob':
        return <IOBNetworkAnalyzer />;
      case 'killer':
        return <NanoKiller targetDevice={selectedNanoDevice} />;
      case 'analysis':
        return <DeviceAnalysis selectedDevice={selectedDevice} />;
      case 'command':
        return <CommandCenter />;
      case 'settings':
        return <SettingsPanel />;
      default:
        return <DashboardOverview setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      <div className="relative z-10">
        <DashboardHeader activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="container mx-auto px-6 py-8">
          <div className="backdrop-blur-sm bg-white/5 rounded-3xl border border-white/10 shadow-2xl">
            {renderActivePanel()}
          </div>
        </main>
      </div>
    </div>
  );
};

const DashboardOverview = ({ setActiveTab }) => {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">
          BioGuardian <span className="text-cyan-400">NanoTech</span>
        </h1>
        <p className="text-gray-300">Advanced BLE Security & Nanonet Analysis Platform</p>
        <p className="text-gray-400 text-sm mt-1">ABYSS Framework • Blue Fish Protocol • IOB Detection</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-cyan-500/20 to-blue-600/20 p-6 rounded-xl border border-cyan-500/30">
          <div className="flex items-center justify-between mb-4">
            <Shield className="w-8 h-8 text-cyan-400" />
            <span className="text-2xl font-bold text-white">12</span>
          </div>
          <h3 className="text-sm font-medium text-gray-300">Active Scans</h3>
        </div>

        <div className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 p-6 rounded-xl border border-green-500/30">
          <div className="flex items-center justify-between mb-4">
            <Wifi className="w-8 h-8 text-green-400" />
            <span className="text-2xl font-bold text-white">24</span>
          </div>
          <h3 className="text-sm font-medium text-gray-300">BLE Devices</h3>
        </div>

        <div className="bg-gradient-to-br from-red-500/20 to-pink-600/20 p-6 rounded-xl border border-red-500/30">
          <div className="flex items-center justify-between mb-4">
            <AlertTriangle className="w-8 h-8 text-red-400" />
            <span className="text-2xl font-bold text-white">3</span>
          </div>
          <h3 className="text-sm font-medium text-gray-300">Threats Detected</h3>
        </div>

        <div className="bg-gradient-to-br from-purple-500/20 to-violet-600/20 p-6 rounded-xl border border-purple-500/30">
          <div className="flex items-center justify-between mb-4">
            <Activity className="w-8 h-8 text-purple-400" />
            <span className="text-2xl font-bold text-white">98%</span>
          </div>
          <h3 className="text-sm font-medium text-gray-300">System Health</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <h3 className="text-xl font-semibold text-white mb-4">Nano-Detection Suite</h3>
          <div className="space-y-3">
            <button 
              onClick={() => setActiveTab('scan')}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-3 px-4 rounded-lg transition-all duration-200 font-medium"
            >
              Start BLE Scan
            </button>
            <button 
              onClick={() => setActiveTab('nano')}
              className="w-full bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white py-3 px-4 rounded-lg transition-all duration-200 font-medium"
            >
              Nano Detector
            </button>
            <button 
              onClick={() => setActiveTab('iob')}
              className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white py-3 px-4 rounded-lg transition-all duration-200 font-medium"
            >
              IOB Network Analysis
            </button>
            <button 
              onClick={() => setActiveTab('killer')}
              className="w-full bg-gradient-to-r from-red-600 to-pink-700 hover:from-red-700 hover:to-pink-800 text-white py-3 px-4 rounded-lg transition-all duration-200 font-medium flex items-center justify-center space-x-2"
            >
              <Target className="w-4 h-4" />
              <span>Nano-Killer Protocol</span>
            </button>
          </div>
        </div>

        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <h3 className="text-xl font-semibold text-white mb-4">Recent Nano Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-300">Neural-Mesh-Alpha detected</span>
              <span className="text-red-400 text-sm">Critical</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-300">Graphene nodes: 5.8 GHz</span>
              <span className="text-yellow-400 text-sm">Medium</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-300">IOB Network: Body2Body</span>
              <span className="text-red-400 text-sm">High</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-300">Biofield signature: BF-Theta-2847</span>
              <span className="text-green-400 text-sm">Safe</span>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
            <div className="text-sm text-purple-400 font-medium mb-1">ABYSS Framework Status</div>
            <div className="text-xs text-gray-300">Blue Fish Protocol: Active • Biofield Cell Program: Online</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
