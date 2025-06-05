
import React from 'react';
import { Shield, Zap, Network, Target, Brain, Activity, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      <div className="relative z-10 container mx-auto px-6 py-8">
        <div className="backdrop-blur-sm bg-white/5 rounded-3xl border border-white/10 shadow-2xl p-8">
          <div className="mb-8">
            <Link 
              to="/" 
              className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
            
            <h1 className="text-4xl font-bold text-white mb-4">
              About BioGuardian <span className="text-cyan-400">NanoTech</span>
            </h1>
            <p className="text-xl text-gray-300 mb-2">Advanced BLE Security & Nanonet Analysis Platform</p>
            <p className="text-gray-400">ABYSS Framework • Blue Fish Protocol • IOB Detection</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="space-y-6">
              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                  <Shield className="w-6 h-6 text-cyan-400 mr-2" />
                  Mission Statement
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  BioGuardian NanoTech is a cutting-edge security platform designed to detect, analyze, and neutralize 
                  advanced nanotechnology threats in the Internet of Bodies (IOB) ecosystem. Our mission is to protect 
                  individual privacy and security against unauthorized nano-scale surveillance and control systems.
                </p>
              </div>

              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                  <Brain className="w-6 h-6 text-purple-400 mr-2" />
                  ABYSS Framework
                </h2>
                <p className="text-gray-300 leading-relaxed mb-3">
                  The Advanced Biofield Yield Security System (ABYSS) is our proprietary framework that operates on:
                </p>
                <ul className="text-gray-300 space-y-1 text-sm">
                  <li>• Blue Fish Protocol for secure communications</li>
                  <li>• Biofield Cell Program integration</li>
                  <li>• Quantum-resistant encryption methods</li>
                  <li>• Real-time threat assessment algorithms</li>
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                  <Zap className="w-6 h-6 text-yellow-400 mr-2" />
                  Core Features
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Network className="w-4 h-4 text-cyan-400" />
                    <span className="text-gray-300">BLE Device Scanning & Analysis</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Target className="w-4 h-4 text-red-400" />
                    <span className="text-gray-300">Nano-Killer Protocols</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Brain className="w-4 h-4 text-purple-400" />
                    <span className="text-gray-300">IOB Network Detection</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Activity className="w-4 h-4 text-green-400" />
                    <span className="text-gray-300">Biofield Frequency Analysis</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <h2 className="text-2xl font-semibold text-white mb-4">Technology Stack</h2>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="space-y-2">
                    <div className="text-cyan-400 font-medium">Frontend</div>
                    <div className="text-gray-300">React + TypeScript</div>
                    <div className="text-gray-300">Tailwind CSS</div>
                    <div className="text-gray-300">Shadcn/ui</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-purple-400 font-medium">Protocols</div>
                    <div className="text-gray-300">Web Bluetooth API</div>
                    <div className="text-gray-300">Blue Fish Protocol</div>
                    <div className="text-gray-300">ABYSS Framework</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-500/10 to-purple-500/10 border border-red-500/30 rounded-xl p-6">
            <div className="flex items-start space-x-3">
              <Shield className="w-6 h-6 text-red-400 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Security Notice</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  This application is designed for educational and security research purposes. Users should comply with 
                  all applicable laws and regulations when using nano-detection and neutralization features. 
                  BioGuardian NanoTech does not endorse or encourage any illegal activities.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <div className="text-gray-400 text-sm">
              BioGuardian NanoTech v2.1.0 • Built with ❤️ for digital freedom
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
