import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Terminal, Database, Activity, LayoutGrid, Network } from 'lucide-react';
import { motion } from 'framer-motion';
import Dashboard from './pages/Dashboard';
import SkillExplorer from './pages/SkillExplorer';
import ArchitectureGraph from './pages/ArchitectureGraph';
import { useData } from './contexts/DataContext';

function App() {
  const { loading, error } = useData();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#030407] overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15)_0%,rgba(3,4,7,1)_70%)]"></div>
        <div className="flex flex-col items-center space-y-6 relative z-10">
          <motion.div 
            animate={{ rotateZ: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="relative"
          >
            <Activity className="w-16 h-16 text-accent-500 opacity-80" />
            <div className="absolute inset-0 w-full h-full bg-accent-500 blur-xl opacity-40"></div>
          </motion.div>
          <p className="text-accent-400 font-mono text-xs tracking-[0.4em] animate-pulse drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]">INITIALIZING THOTH OS KERNEL...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#030407] text-red-500 font-mono">
        Error loading capability data: {error}
      </div>
    );
  }

  const navItems = [
    { path: '/', label: 'System Overview', icon: <Terminal className="w-5 h-5" /> },
    { path: '/skills', label: 'Skill Explorer', icon: <LayoutGrid className="w-5 h-5" /> },
    { path: '/architecture', label: 'Architecture Graph', icon: <Network className="w-5 h-5" /> },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-[#05070a] text-gray-200 relative perspective-[2000px]">
      
      {/* Cinematic Ambient Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f10_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f10_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        <motion.div 
          animate={{ opacity: [0.15, 0.3, 0.15], scale: [1, 1.1, 1], rotateZ: [0, 5, 0] }} 
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[30%] -left-[10%] w-[80%] h-[80%] rounded-full bg-blue-600/10 blur-[150px]" 
        />
        <motion.div 
          animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.2, 1], rotateZ: [0, -5, 0] }} 
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[40%] -right-[20%] w-[70%] h-[70%] rounded-full bg-purple-600/10 blur-[150px]" 
        />
      </div>

      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-black/40 backdrop-blur-2xl flex flex-col z-20 shadow-[4px_0_24px_rgba(0,0,0,0.5)]">
        <div className="h-20 flex items-center px-6 border-b border-white/5">
          <motion.div 
            animate={{ rotateY: 360 }} 
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="mr-3"
          >
            <Database className="w-6 h-6 text-accent-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
          </motion.div>
          <h1 className="font-bold text-xl tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500 drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)]">
            THOTH OS
          </h1>
        </div>
        
        <nav className="flex-1 py-8 px-4 space-y-2">
          {navItems.map(item => {
            const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`relative flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all duration-300 group overflow-hidden ${
                  isActive 
                    ? 'text-accent-300 shadow-[inset_2px_0_0_0_#3b82f6]' 
                    : 'text-gray-400 hover:text-gray-100'
                }`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="sidebar-active"
                    className="absolute inset-0 bg-gradient-to-r from-accent-500/20 to-transparent" 
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <div className="relative z-10 flex items-center space-x-3 group-hover:translate-x-1 transition-transform duration-300">
                  {item.icon}
                  <span className="font-medium text-sm tracking-wide">{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-white/5 bg-black/20">
          <div className="flex items-center space-x-3 text-xs font-mono text-gray-400">
            <div className="relative w-2.5 h-2.5">
              <span className="absolute inset-0 rounded-full bg-emerald-500 blur-[4px] animate-pulse"></span>
              <span className="absolute inset-0 rounded-full bg-emerald-400"></span>
            </div>
            <span className="tracking-widest">SYSTEM ONLINE</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 relative overflow-y-auto z-10 [transform-style:preserve-3d]">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/skills/*" element={<SkillExplorer />} />
          <Route path="/architecture" element={<ArchitectureGraph />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
