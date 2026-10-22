import React from 'react';
import { GitBranch, Activity, Server, LogOut } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, onLogout }) {
  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-screen">
      <div className="p-5 border-b border-slate-800 flex items-center space-x-3">
        <Server className="w-7 h-7 text-indigo-400" />
        <span className="text-xl font-bold tracking-wide text-slate-100">DevCloud</span>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <button 
          onClick={() => setActiveTab('canvas')}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition ${
            activeTab === 'canvas' 
              ? 'bg-indigo-600 text-white font-medium shadow-lg shadow-indigo-600/30' 
              : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
          }`}
        >
          <GitBranch className="w-5 h-5" />
          <span>Workflow Canvas</span>
        </button>

        <button 
          onClick={() => setActiveTab('metrics')}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition ${
            activeTab === 'metrics' 
              ? 'bg-indigo-600 text-white font-medium shadow-lg shadow-indigo-600/30' 
              : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
          }`}
        >
          <Activity className="w-5 h-5" />
          <span>System Metrics</span>
        </button>
      </nav>

      <div className="p-4 border-t border-slate-800 flex flex-col gap-3">
        <button 
          onClick={onLogout}
          className="w-full flex items-center space-x-2 text-slate-400 hover:text-red-400 px-3 py-2 rounded-lg hover:bg-slate-800 text-sm transition"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>

        <div className="text-xs text-slate-500 flex items-center justify-between pt-2 border-t border-slate-800/50">
          <span>Engine v1.0.0</span>
          <span className="flex items-center text-emerald-400 gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Connected
          </span>
        </div>
      </div>
    </aside>
  );
}