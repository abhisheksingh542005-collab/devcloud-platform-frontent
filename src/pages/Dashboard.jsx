import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import WorkflowCanvas from '../components/WorkflowCanvas';
import MetricsView from './MetricsView';
import { Play, CheckCircle } from 'lucide-react';
import API from '../services/api';

export default function Dashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('canvas');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const handleSaveWorkflow = async () => {
    setSaving(true);
    try {
      await API.post('/workflows', {
        title: 'Production Deployment DAG',
        description: 'Auto-generated visual pipeline',
        nodes: [],
        edges: []
      });
      setMessage('Workflow Saved to Database!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Save failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={onLogout} />

      <main className="flex-1 flex flex-col bg-slate-950">
        <header className="h-16 bg-slate-900/50 backdrop-blur border-b border-slate-800 px-6 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-slate-200">
            {activeTab === 'canvas' ? 'Visual DAG Workflow Editor' : 'Real-time System Telemetry'}
          </h1>

          <div className="flex items-center space-x-4">
            {message && (
              <span className="text-xs flex items-center gap-1 text-emerald-400 bg-emerald-950/50 px-3 py-1.5 rounded-lg border border-emerald-800">
                <CheckCircle className="w-3.5 h-3.5" /> {message}
              </span>
            )}
            {activeTab === 'canvas' && (
              <button 
                onClick={handleSaveWorkflow} 
                disabled={saving}
                className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition shadow-lg shadow-indigo-600/20"
              >
                <Play className="w-4 h-4" />
                <span>{saving ? 'Saving...' : 'Save Pipeline'}</span>
              </button>
            )}
          </div>
        </header>

        <div className="flex-1 p-6 overflow-y-auto">
          {activeTab === 'canvas' ? <WorkflowCanvas /> : <MetricsView />}
        </div>
      </main>
    </div>
  );
}