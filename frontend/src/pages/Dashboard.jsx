import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useData } from '../contexts/DataContext';
import { Database, Cpu, Layers, Workflow, CheckCircle2 } from 'lucide-react';

// Custom Tilt Component using Framer Motion
function TiltCard({ children, bg, color, icon, label, value }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-2xl relative overflow-hidden h-full shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex flex-col justify-between"
    >
      <div className={`absolute -top-10 -right-10 w-40 h-40 rounded-full blur-[50px] transition-opacity duration-500 ${bg}`}></div>
      <div className="relative z-10 flex justify-between items-start mb-8" style={{ transform: "translateZ(30px)" }}>
        <div>
          <p className="text-sm font-medium text-gray-400 mb-2 uppercase tracking-widest">{label}</p>
          <p className="text-5xl font-bold text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">{value}</p>
        </div>
        <div className={`p-3 rounded-xl bg-white/5 border border-white/10 ${color} shadow-[0_0_15px_rgba(currentColor,0.5)]`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
}

export default function Dashboard() {
  const { data } = useData();
  const { metadata } = data;

  const stats = [
    { label: 'Available Skills', value: metadata.skillCount, icon: <Layers className="w-8 h-8" />, color: 'text-blue-400', bg: 'bg-blue-500/20' },
    { label: 'Core Modules', value: metadata.coreModuleCount, icon: <Cpu className="w-8 h-8" />, color: 'text-purple-400', bg: 'bg-purple-500/20' },
    { label: 'Active Agents', value: metadata.agentCount, icon: <Workflow className="w-8 h-8" />, color: 'text-emerald-400', bg: 'bg-emerald-500/20' },
    { label: 'Integrations', value: metadata.mcpCount, icon: <Database className="w-8 h-8" />, color: 'text-orange-400', bg: 'bg-orange-500/20' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, z: -100 }}
      animate={{ opacity: 1, z: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="p-10 max-w-7xl mx-auto space-y-12"
    >
      <header className="mb-12 relative z-10">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-white mb-3 tracking-wide drop-shadow-[0_2px_20px_rgba(255,255,255,0.2)]"
        >
          System Telemetry
        </motion.h1>
        <p className="text-gray-400 text-lg">Real-time kernel monitoring and capability analysis.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 perspective-[1000px]">
        {stats.map((stat, idx) => (
          <motion.div 
             key={stat.label}
             initial={{ opacity: 0, rotateX: 20, y: 50 }}
             animate={{ opacity: 1, rotateX: 0, y: 0 }}
             transition={{ delay: idx * 0.1, duration: 0.7, type: "spring" }}
             className="h-full"
          >
             <TiltCard {...stat} />
          </motion.div>
        ))}
      </div>

      {/* Concept Model */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }}
        className="mt-16"
      >
        <h2 className="text-2xl font-semibold mb-8 flex items-center text-white drop-shadow-md">
          <CheckCircle2 className="w-6 h-6 mr-3 text-accent-500" />
          Neural Execution Pipeline
        </h2>
        
        <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl p-10 overflow-x-auto shadow-[0_15px_40px_rgba(0,0,0,0.4)]">
          <div className="min-w-[900px] flex items-center justify-between font-mono text-sm">
            <FlowStep title="Developer Intent" subtitle="/startup build..." active delay={0} />
            <FlowArrow delay={0.2} />
            <FlowStep title="Task Orchestrator" subtitle="Core Module" delay={0.4} />
            <FlowArrow delay={0.6} />
            <FlowStep title="Agent Selection" subtitle="Specialist Chosen" delay={0.8} />
            <FlowArrow delay={1.0} />
            <FlowStep title="Skill Execution" subtitle="Schema-driven Tools" delay={1.2} />
            <FlowArrow delay={1.4} />
            <FlowStep title="Quality Checker" subtitle="AGENTS.md Rules" delay={1.6} />
            <FlowArrow delay={1.8} />
            <FlowStep title="Final Output" subtitle="Production Ready" highlight delay={2.0} />
          </div>
        </div>
      </motion.section>

    </motion.div>
  );
}

function FlowStep({ title, subtitle, active, highlight, delay }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: delay + 0.5, duration: 0.5, type: "spring" }}
      className={`flex flex-col items-center justify-center p-5 rounded-xl border relative overflow-hidden ${highlight ? 'bg-accent-500/20 border-accent-500 text-white shadow-[0_0_30px_rgba(59,130,246,0.3)]' : active ? 'bg-white/10 border-white/20 text-white shadow-lg' : 'bg-black/50 border-white/5 text-gray-400'} w-44 text-center`}
    >
      {highlight && <div className="absolute inset-0 bg-gradient-to-tr from-accent-500/0 via-accent-500/10 to-accent-500/0 animate-[shimmer_2s_infinite]"></div>}
      <span className="font-bold mb-2 text-base z-10 tracking-wide">{title}</span>
      <span className="text-xs opacity-70 z-10">{subtitle}</span>
    </motion.div>
  )
}

function FlowArrow({ delay }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={{ delay: delay + 0.5, duration: 0.4 }}
      className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-accent-500/50 to-transparent mx-2 relative origin-left"
    >
      <motion.div 
        animate={{ x: ["0%", "100%"], opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: delay + 1 }}
        className="absolute top-1/2 -translate-y-1/2 w-4 h-1 rounded-full bg-accent-400 blur-[2px] shadow-[0_0_10px_#60a5fa]"
      ></motion.div>
    </motion.div>
  )
}
