import { useState, useMemo } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Code, Boxes, Shield, TerminalSquare } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import SkillDetail from '../components/SkillDetail';

const ICONS = {
  Software: <Code className="w-4 h-4" />,
  Frontend: <Boxes className="w-4 h-4" />,
  Security: <Shield className="w-4 h-4" />,
  DevOps: <TerminalSquare className="w-4 h-4" />
};

export default function SkillExplorer() {
  const { data } = useData();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();

  const categories = ['All', ...new Set(data.skills.map(s => s.category))].sort();

  const filteredSkills = useMemo(() => {
    return data.skills.filter(skill => {
      const matchesSearch = skill.name.toLowerCase().includes(search.toLowerCase()) || 
                            skill.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || skill.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [data.skills, search, selectedCategory]);

  return (
    <div className="h-full flex flex-col">
      <Routes>
        <Route path="/" element={
          <div className="p-8 max-w-7xl mx-auto w-full flex-1">
            <header className="mb-8">
              <h1 className="text-3xl font-bold text-gray-100 mb-2">Skill Explorer</h1>
              <p className="text-gray-400">Discover and inspect the executable capabilities of Thoth OS.</p>
            </header>

            {/* Controls */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input 
                  type="text"
                  placeholder="Search skills, descriptions, schemas..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-dark-900 border border-dark-700 rounded-lg py-2.5 pl-10 pr-4 text-gray-200 focus:outline-none focus:border-accent-500 transition-colors"
                />
              </div>
              <div className="relative w-full md:w-64">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-dark-900 border border-dark-700 rounded-lg py-2.5 pl-10 pr-4 text-gray-200 focus:outline-none focus:border-accent-500 appearance-none"
                >
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-20">
              <AnimatePresence>
                {filteredSkills.map((skill, idx) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    whileHover={{ scale: 1.05, rotateX: 5, rotateY: -5, zIndex: 10, boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}
                    transition={{ duration: 0.2 }}
                    key={skill.id}
                    onClick={() => navigate(`/skills/${skill.id}`)}
                    className="bg-black/40 backdrop-blur-md border border-white/10 hover:border-accent-500/50 rounded-xl p-5 cursor-pointer flex flex-col group transition-colors relative overflow-hidden"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="flex items-center justify-between mb-3 relative z-10" style={{ transform: "translateZ(20px)" }}>
                      <span className="text-xs font-mono px-2 py-1 bg-dark-900 rounded-md text-gray-400 border border-dark-700 flex items-center gap-1.5">
                        {ICONS[skill.category] || <Boxes className="w-3 h-3" />}
                        {skill.category}
                      </span>
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-200 mb-2 group-hover:text-accent-400 transition-colors relative z-10" style={{ transform: "translateZ(30px)" }}>{skill.name}</h3>
                    <p className="text-sm text-gray-500 line-clamp-3 mb-4 flex-1 relative z-10" style={{ transform: "translateZ(10px)" }}>{skill.description}</p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 font-mono mt-auto pt-3 border-t border-white/5 relative z-10" style={{ transform: "translateZ(20px)" }}>
                      <span>SCHEMA READY</span>
                      <span className="text-accent-500 group-hover:translate-x-1 transition-transform">Inspect →</span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {filteredSkills.length === 0 && (
                <div className="col-span-full py-20 text-center text-gray-500 font-mono">
                  No capabilities match your query.
                </div>
              )}
            </div>
          </div>
        } />
        
        <Route path="/:id" element={<SkillDetail />} />
      </Routes>
    </div>
  );
}
