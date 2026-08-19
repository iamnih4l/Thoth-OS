import { useState, useCallback, useMemo } from 'react';
import { ReactFlow, Background, Controls, MiniMap, applyNodeChanges, applyEdgeChanges, Handle, Position } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Database, Cpu, BrainCircuit, Blocks } from 'lucide-react';
import { useData } from '../contexts/DataContext';

// Custom Node for a Topology Layer
function LayerNode({ data }) {
  const styles = {
    core: 'bg-purple-500/10 border-purple-500/30 text-purple-200',
    agents: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200',
    skills: 'bg-blue-500/10 border-blue-500/30 text-blue-200',
    mcp: 'bg-orange-500/10 border-orange-500/30 text-orange-200',
  };

  return (
    <div className={`w-[800px] p-6 border rounded-xl flex flex-col items-center gap-4 shadow-lg backdrop-blur-xl ${styles[data.type] || 'bg-dark-800'}`}>
      {data.handles.includes('target') && <Handle type="target" position={Position.Top} className="!w-3 !h-3 !bg-gray-500" />}
      
      <div className="flex items-center gap-2 font-bold tracking-widest text-sm uppercase opacity-90">
        {data.icon} {data.title}
      </div>
      <div className="flex flex-wrap justify-center gap-3 w-full">
        {data.items.map(item => (
          <div key={item.id} className="px-3 py-1.5 bg-black/60 border border-white/10 rounded-md text-xs font-mono shadow-sm hover:border-white/30 transition-colors">
            {item.name}
          </div>
        ))}
        {data.total > data.items.length && (
          <div className="px-3 py-1.5 opacity-50 text-xs font-mono">
            +{data.total - data.items.length} more
          </div>
        )}
      </div>

      {data.handles.includes('source') && <Handle type="source" position={Position.Bottom} className="!w-3 !h-3 !bg-accent-500" />}
    </div>
  );
}

const nodeTypes = {
  layerNode: LayerNode,
};

export default function ArchitectureGraph() {
  const { data } = useData();

  // Define nodes and edges based on actual loaded data
  const initialNodes = useMemo(() => [
    {
      id: 'mcp-layer',
      type: 'layerNode',
      position: { x: 0, y: 0 },
      data: {
        title: 'External Integrations (MCP)',
        type: 'mcp',
        icon: <Database className="w-5 h-5" />,
        items: data.mcp.slice(0, 10),
        total: data.mcp.length,
        handles: ['source']
      }
    },
    {
      id: 'skills-layer',
      type: 'layerNode',
      position: { x: 0, y: 250 },
      data: {
        title: `Capability Registry`,
        type: 'skills',
        icon: <Blocks className="w-5 h-5" />,
        items: data.skills.slice(0, 15),
        total: data.skills.length,
        handles: ['target', 'source']
      }
    },
    {
      id: 'agents-layer',
      type: 'layerNode',
      position: { x: 0, y: 500 },
      data: {
        title: `Agent Subsystems`,
        type: 'agents',
        icon: <BrainCircuit className="w-5 h-5" />,
        items: data.agents.slice(0, 10),
        total: data.agents.length,
        handles: ['target', 'source']
      }
    },
    {
      id: 'core-layer',
      type: 'layerNode',
      position: { x: 0, y: 750 },
      data: {
        title: 'Core Kernel',
        type: 'core',
        icon: <Cpu className="w-5 h-5" />,
        items: data.coreModules,
        total: data.coreModules.length,
        handles: ['target']
      }
    }
  ], [data]);

  const initialEdges = [
    { id: 'e-mcp-skills', source: 'mcp-layer', target: 'skills-layer', animated: true, style: { stroke: '#8b5cf6', strokeWidth: 2 } },
    { id: 'e-skills-agents', source: 'skills-layer', target: 'agents-layer', animated: true, style: { stroke: '#3b82f6', strokeWidth: 2 } },
    { id: 'e-agents-core', source: 'agents-layer', target: 'core-layer', animated: true, style: { stroke: '#10b981', strokeWidth: 2 } },
  ];

  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback((changes) => setNodes((nds) => applyNodeChanges(changes, nds)), []);
  const onEdgesChange = useCallback((changes) => setEdges((eds) => applyEdgeChanges(changes, eds)), []);

  return (
    <div className="h-full w-full flex flex-col bg-[#05070a]">
      <header className="p-8 pb-4 flex-shrink-0 z-10 pointer-events-none">
        <h1 className="text-3xl font-bold text-gray-100 mb-2 drop-shadow-md">Architecture Mapping</h1>
        <p className="text-gray-400">Interactive topology of the Thoth OS runtime. Scroll to zoom, click and drag to pan.</p>
      </header>

      <div className="flex-1 w-full relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          minZoom={0.2}
          maxZoom={1.5}
          className="bg-transparent"
        >
          <Background color="#333" gap={24} size={1} />
          <Controls className="!bg-gray-900 !border-gray-700 !fill-white" />
          <MiniMap 
             nodeColor={(n) => {
               if (n.data.type === 'core') return '#a855f7';
               if (n.data.type === 'agents') return '#10b981';
               if (n.data.type === 'skills') return '#3b82f6';
               if (n.data.type === 'mcp') return '#f97316';
               return '#eee';
             }}
             className="!bg-black/80 !border-gray-800"
             maskColor="rgba(0,0,0,0.5)"
          />
        </ReactFlow>
      </div>
    </div>
  );
}
