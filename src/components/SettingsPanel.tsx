
import { useState } from 'react';
import { Settings, Wifi, Shield, Bell, Database } from 'lucide-react';

const SettingsPanel = () => {
  const [settings, setSettings] = useState({
    scanFrequency: 5,
    autoQuarantine: true,
    notifications: true,
    deepScan: false,
    iccSync: true,
    threatLevel: 'medium',
  });

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Settings</h2>
        <p className="text-gray-300">Configure BioGuardian security parameters and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white/5 p-6 rounded-xl border border-white/10">
            <div className="flex items-center space-x-3 mb-4">
              <Wifi className="w-6 h-6 text-cyan-400" />
              <h3 className="text-xl font-semibold text-white">Scanning Configuration</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm mb-2">
                  Scan Frequency (seconds)
                </label>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={settings.scanFrequency}
                  onChange={(e) => updateSetting('scanFrequency', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>1s</span>
                  <span className="text-cyan-400">{settings.scanFrequency}s</span>
                  <span>30s</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-300">Enable Deep Scanning</span>
                <button
                  onClick={() => updateSetting('deepScan', !settings.deepScan)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.deepScan ? 'bg-cyan-500' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.deepScan ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white/5 p-6 rounded-xl border border-white/10">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="w-6 h-6 text-green-400" />
              <h3 className="text-xl font-semibold text-white">Security Settings</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Auto-Quarantine Threats</span>
                <button
                  onClick={() => updateSetting('autoQuarantine', !settings.autoQuarantine)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.autoQuarantine ? 'bg-green-500' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.autoQuarantine ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-2">
                  Threat Detection Level
                </label>
                <select
                  value={settings.threatLevel}
                  onChange={(e) => updateSetting('threatLevel', e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="low" className="bg-slate-800">Low (Fewer false positives)</option>
                  <option value="medium" className="bg-slate-800">Medium (Balanced)</option>
                  <option value="high" className="bg-slate-800">High (Maximum security)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white/5 p-6 rounded-xl border border-white/10">
            <div className="flex items-center space-x-3 mb-4">
              <Bell className="w-6 h-6 text-yellow-400" />
              <h3 className="text-xl font-semibold text-white">Notifications</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Enable Notifications</span>
                <button
                  onClick={() => updateSetting('notifications', !settings.notifications)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.notifications ? 'bg-yellow-500' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.notifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="space-y-2 text-sm text-gray-300">
                <label className="flex items-center">
                  <input type="checkbox" defaultChecked className="mr-2 rounded" />
                  Threat Detection Alerts
                </label>
                <label className="flex items-center">
                  <input type="checkbox" defaultChecked className="mr-2 rounded" />
                  Device Discovery Notifications
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2 rounded" />
                  System Status Updates
                </label>
              </div>
            </div>
          </div>

          <div className="bg-white/5 p-6 rounded-xl border border-white/10">
            <div className="flex items-center space-x-3 mb-4">
              <Database className="w-6 h-6 text-purple-400" />
              <h3 className="text-xl font-semibold text-white">Database Settings</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">ICC Database Sync</span>
                <button
                  onClick={() => updateSetting('iccSync', !settings.iccSync)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.iccSync ? 'bg-purple-500' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.iccSync ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-300">Last Sync</span>
                  <span className="text-cyan-400">2 hours ago</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-300">Database Version</span>
                  <span className="text-white">v2.1.4</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-300">Threat Signatures</span>
                  <span className="text-white">15,247</span>
                </div>
              </div>

              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors duration-200">
                Force Sync Database
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white/5 p-6 rounded-xl border border-white/10">
        <h3 className="text-xl font-semibold text-white mb-4">Application Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-2">Version</h4>
            <p className="text-white">BioGuardian v1.0.0 BETA</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-2">Platform</h4>
            <p className="text-white">Cross-Platform Web App</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-2">License</h4>
            <p className="text-white">Sovereign Tech Security</p>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-white/10">
          <p className="text-gray-400 text-sm">
            Maintainer: Meta_Textual under The House of Grønli | 
            Monoclonal Code Lineage: Sovereign Tech Security Circle
          </p>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
