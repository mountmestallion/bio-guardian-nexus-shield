
import React from 'react';
import { Shield, Search, Brain, Network, Target, Settings, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DashboardHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const DashboardHeader = ({ activeTab, setActiveTab }: DashboardHeaderProps) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Shield },
    { id: 'scan', label: 'BLE Scan', icon: Search },
    { id: 'nano', label: 'Nano Detector', icon: Brain },
    { id: 'iob', label: 'IOB Networks', icon: Network },
    { id: 'killer', label: 'Nano Killer', icon: Target },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <header className="bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <Shield className="w-8 h-8 text-cyan-400" />
              <span className="text-xl font-bold text-white">BioGuardian</span>
            </div>
            
            <nav className="hidden md:flex space-x-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <Link 
              to="/about" 
              className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200"
            >
              <Info className="w-4 h-4" />
              <span className="text-sm">About</span>
            </Link>
            
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-300">ABYSS Online</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
