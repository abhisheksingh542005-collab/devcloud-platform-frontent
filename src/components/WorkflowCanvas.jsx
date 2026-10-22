import React, { useState, useCallback } from 'react';
import { ReactFlow, Controls, Background, applyNodeChanges, applyEdgeChanges, addEdge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const initialNodes = [
  { id: '1', position: { x: 50, y: 150 }, data: { label: '🚀 Git Webhook Trigger' }, type: 'input' },
  { id: '2', position: { x: 350, y: 150 }, data: { label: '⚙️ Build & Test Runner' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2', animated: true }];

export default function WorkflowCanvas() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    []
  );

  const addNode = (label) => {
    const newNodeId = `${nodes.length + 1}`;
    const newNode = {
      id: newNodeId,
      position: { x: Math.random() * 300 + 100, y: Math.random() * 200 + 100 },
      data: { label },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  return (
    <div className="h-[calc(100vh-80px)] w-full flex flex-col relative">
      <div className="absolute top-4 left-4 z-10 flex gap-3 bg-slate-900/90 p-3 rounded-xl border border-slate-800 shadow-xl backdrop-blur">
        <button 
          onClick={() => addNode('🛠️ Execute Shell Script')}
          className="bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded-lg text-xs font-medium text-white transition shadow"
        >
          + Add Action Node
        </button>
        <button 
          onClick={() => addNode('📦 Docker Container Deploy')}
          className="bg-emerald-600 hover:bg-emerald-500 px-3 py-1.5 rounded-lg text-xs font-medium text-white transition shadow"
        >
          + Add Deploy Node
        </button>
      </div>

      <div className="flex-1 w-full h-full bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <Background color="#334155" gap={16} />
          <Controls className="bg-slate-900 border border-slate-800 text-slate-100 rounded-lg overflow-hidden shadow-xl" />
        </ReactFlow>
      </div>
    </div>
  );
}