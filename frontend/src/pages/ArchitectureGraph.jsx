import { useState } from 'react';
import { motion } from 'framer-motion';
import { Database, Cpu, BrainCircuit, Blocks } from 'lucide-react';
import { useData } from '../contexts/DataContext';

export default function ArchitectureGraph() {
  const { data } = useData();
  const [activeLayer, setActiveLayer] = useState('all');

  const layers = [
    { id: 'core', name: 'Core Kernel', icon: <Cpu className="w-5 h-5" />, color: 'border-purple-500/30 text-purple-400 bg-purple-500/10' },
    { id: 'agents', name: 'Agent Subsystems', icon: <BrainCircuit className="w-5 h-5" />, color: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10' },
    { id: 'skills', name: 'Capability Registry', icon: <Blocks className="w-5 h-5" />, color: 'border-blue-500/30 text-blue-400 bg-blue-500/10' },
    { id: 'mcp', name: 'External Integrations', icon: <Database className="w-5 h-5" />, color: 'border-orange-500/30 text-orange-400 bg-orange-500/10' }
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto flex flex-col h-full">
      <header className="mb-10 flex-shrink-0">
        <h1 className="text-3xl font-bold text-gray-100 mb-2">Architecture Mapping</h1>
        <p className="text-gray-400">Interactive topology of the Thoth OS runtime.</p>
      </header>

      {/* Layer Toggle */}
      <div className="flex flex-wrap gap-4 mb-8">
        <button 
          onClick={() => setActiveLayer('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${activeLayer === 'all' ? 'bg-gray-700 text-white' : 'bg-dark-800 text-gray-400 hover:bg-dark-700'}`}
        >
          Full Topology
        </button>
        {layers.map(layer => (
          <button 
            key={layer.id}
            onClick={() => setActiveLayer(layer.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${activeLayer === layer.id ? layer.color : 'bg-dark-800 text-gray-400 hover:bg-dark-700'}`}
          >
            {layer.icon} {layer.name}
          </button>
        ))}
      </div>

      <div className="flex-1 bg-black/40 backdrop-blur-2xl border border-white/5 rounded-2xl relative overflow-hidden flex items-center justify-center p-8 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] perspective-[2000px]">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)]"></div>
        
        <motion.div 
          initial={{ rotateX: 60, rotateZ: -20, scale: 0.8, y: 50, opacity: 0 }}
          animate={{ rotateX: activeLayer === 'all' ? 50 : 20, rotateZ: activeLayer === 'all' ? -20 : 0, scale: 1, y: 0, opacity: 1 }}
          transition={{ duration: 1.5, type: "spring", bounce: 0.2 }}
          className="relative z-10 w-full max-w-5xl flex flex-col items-center justify-between h-full gap-12"
          style={{ transformStyle: "preserve-3d" }}
        >
          
          <ArchitectureLayer 
            title="External Integrations (MCP)" 
            items={data.mcp.slice(0, 8)} 
            type="mcp"
            isActive={activeLayer === 'all' || activeLayer === 'mcp'}
          />

          <ConnectingLine active={activeLayer === 'all' || activeLayer === 'mcp' || activeLayer === 'skills'} />

          <ArchitectureLayer 
            title={`Capability Registry (${data.skills.length} Skills)`} 
            items={data.skills.slice(0, 10)} 
            type="skills"
            isActive={activeLayer === 'all' || activeLayer === 'skills'}
          />

          <ConnectingLine active={activeLayer === 'all' || activeLayer === 'skills' || activeLayer === 'agents'} />

          <ArchitectureLayer 
            title={`Agent Subsystems (${data.agents.length} Agents)`} 
            items={data.agents.slice(0, 6)} 
            type="agents"
            isActive={activeLayer === 'all' || activeLayer === 'agents'}
          />

          <ConnectingLine active={activeLayer === 'all' || activeLayer === 'agents' || activeLayer === 'core'} />

          <ArchitectureLayer 
            title="Core Kernel" 
            items={data.coreModules} 
            type="core"
            isActive={activeLayer === 'all' || activeLayer === 'core'}
          />

        </motion.div>
      </div>
    </div>
  );
}

function ArchitectureLayer({ title, items, type, isActive }) {
  const styles = {
    core: 'bg-purple-500/10 border-purple-500/30 text-purple-200',
    agents: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200',
    skills: 'bg-blue-500/10 border-blue-500/30 text-blue-200',
    mcp: 'bg-orange-500/10 border-orange-500/30 text-orange-200',
  };

  return (
    <motion.div 
      animate={{ opacity: isActive ? 1 : 0.2, scale: isActive ? 1 : 0.95 }}
      className={`w-full p-6 border rounded-xl flex flex-col items-center gap-4 transition-all duration-500 ${isActive ? 'shadow-[0_0_30px_rgba(0,0,0,0.5)]' : ''} ${styles[type] || 'bg-dark-800'}`}
    >
      <div className="font-bold tracking-widest text-sm uppercase opacity-80">{title}</div>
      <div className="flex flex-wrap justify-center gap-3">
        {items.map(item => (
          <div key={item.id} className="px-3 py-1.5 bg-dark-900 border border-white/10 rounded-md text-xs font-mono shadow-sm">
            {item.name}
          </div>
        ))}
        {items.length >= 6 && <div className="px-3 py-1.5 opacity-50 text-xs font-mono">...and more</div>}
      </div>
    </motion.div>
  );
}

function ConnectingLine({ active }) {
  return (
    <motion.div 
      animate={{ opacity: active ? 1 : 0.1 }}
      className="h-10 w-[2px] bg-gradient-to-b from-transparent via-gray-500 to-transparent relative"
    >
       {active && (
         <motion.div 
            animate={{ top: ['0%', '100%'] }} 
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            className="absolute left-1/2 -translate-x-1/2 w-1.5 h-3 bg-white rounded-full shadow-[0_0_10px_white]" 
         />
       )}
    </motion.div>
  )
}
