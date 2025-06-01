
import { useState } from 'react';
import { Shield, Wifi, Settings, AlertTriangle, Activity } from 'lucide-react';
import DashboardHeader from '../components/DashboardHeader';
import ScanPanel from '../components/ScanPanel';
import DeviceAnalysis from '../components/DeviceAnalysis';
import CommandCenter from '../components/CommandCenter';
import SettingsPanel from '../components/SettingsPanel';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedDevice, setSelectedDevice] = useState(null);

  const renderActivePanel = () => {
    switch (activeTab) {
      case 'scan':
        return <ScanPanel onDeviceSelect={setSelectedDevice} />;
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
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.03"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
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
          <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button 
              onClick={() => setActiveTab('scan')}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-3 px-4 rounded-lg transition-all duration-200 font-medium"
            >
              Start BLE Scan
            </button>
            <button 
              onClick={() => setActiveTab('analysis')}
              className="w-full bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white py-3 px-4 rounded-lg transition-all duration-200 font-medium"
            >
              View Device Analysis
            </button>
            <button 
              onClick={() => setActiveTab('command')}
              className="w-full bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white py-3 px-4 rounded-lg transition-all duration-200 font-medium"
            >
              Command Center
            </button>
          </div>
        </div>

        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <h3 className="text-xl font-semibold text-white mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-300">Device MAC: AA:BB:CC:DD:EE:FF</span>
              <span className="text-green-400 text-sm">Safe</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-300">Device MAC: 11:22:33:44:55:66</span>
              <span className="text-red-400 text-sm">Threat</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-300">Device MAC: FF:EE:DD:CC:BB:AA</span>
              <span className="text-yellow-400 text-sm">Unknown</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
