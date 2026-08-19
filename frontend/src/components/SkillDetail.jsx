import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { ArrowLeft, Play, FileCode, CheckCircle2, ChevronRight, GitBranch } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { marked } from 'marked';
import ExecutionDemo from './ExecutionDemo';


export default function SkillDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useData();
  const [demoMode, setDemoMode] = useState(false);
  const [techMode, setTechMode] = useState(false);

  const skill = data.skills.find(s => s.id === id);

  if (!skill) {
    return <div className="p-8 text-red-500 font-mono">Skill {id} not found in repository.</div>;
  }

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <header className="flex-shrink-0 border-b border-dark-700 bg-dark-900/80 backdrop-blur-xl p-6 sticky top-0 z-20 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/skills')}
            className="p-2 hover:bg-dark-800 rounded-lg text-gray-400 hover:text-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-xs font-mono text-accent-500 bg-accent-500/10 px-2 py-0.5 rounded border border-accent-500/20">
                {skill.category.toUpperCase()}
              </span>
              <span className="text-xs font-mono text-emerald-500 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                AVAILABLE
              </span>
            </div>
            <h1 className="text-2xl font-bold text-gray-100">{skill.name}</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setTechMode(!techMode)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-sm transition-colors border ${
              techMode ? 'bg-purple-500/10 border-purple-500/50 text-purple-400' : 'bg-dark-800 border-dark-700 text-gray-400 hover:bg-dark-700'
            }`}
          >
            <FileCode className="w-4 h-4" />
            {techMode ? 'DEV MODE: ON' : 'DEV MODE: OFF'}
          </button>
          <button 
            onClick={() => setDemoMode(true)}
            className="flex items-center gap-2 px-4 py-2 bg-accent-600 hover:bg-accent-500 text-white rounded-lg font-medium transition-colors shadow-[0_0_15px_rgba(59,130,246,0.3)]"
          >
            <Play className="w-4 h-4" />
            Simulate Execution
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-4xl mx-auto space-y-10">
          
          {/* Overview */}
          <section>
            <h2 className="text-lg font-semibold mb-4 text-gray-300 border-b border-dark-700 pb-2">Overview</h2>
            {techMode ? (
              <pre className="p-4 bg-[#0d1117] rounded-lg border border-dark-700 text-sm font-mono text-green-400 overflow-x-auto">
                {JSON.stringify({ name: skill.name, description: skill.description, purpose: skill.purpose }, null, 2)}
              </pre>
            ) : (
              <div className="prose prose-invert prose-blue max-w-none">
                <p className="text-gray-400 text-lg">{skill.purpose || skill.description}</p>
              </div>
            )}
          </section>

          {/* Workflow/Execution Flow */}
          <section>
            <h2 className="text-lg font-semibold mb-4 text-gray-300 border-b border-dark-700 pb-2">Execution Flow</h2>
            <div className="flex items-center gap-3 font-mono text-sm overflow-x-auto py-4">
              {['Input', 'Thoth OS Core', 'Context Mgr', skill.name, 'Output'].map((step, i, arr) => (
                <div key={step} className="flex items-center gap-3">
                  <div className={`px-4 py-2 rounded border ${i === 3 ? 'bg-accent-500/10 border-accent-500/30 text-accent-400' : 'bg-dark-800 border-dark-700 text-gray-400'}`}>
                    {step}
                  </div>
                  {i < arr.length - 1 && <ChevronRight className="w-4 h-4 text-dark-500" />}
                </div>
              ))}
            </div>
          </section>

          {/* IO Schema */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section>
              <h2 className="text-lg font-semibold mb-4 text-gray-300 border-b border-dark-700 pb-2">Input Schema</h2>
              {skill.inputFormat ? (
                <pre className="p-4 bg-[#0d1117] rounded-lg border border-dark-700 text-sm font-mono text-blue-300 overflow-x-auto whitespace-pre-wrap">
                  {skill.inputFormat}
                </pre>
              ) : (
                <div className="p-4 bg-dark-800 rounded-lg text-gray-500 font-mono text-sm">No specific input schema defined.</div>
              )}
            </section>
            
            <section>
              <h2 className="text-lg font-semibold mb-4 text-gray-300 border-b border-dark-700 pb-2">Output Schema</h2>
              {skill.outputFormat ? (
                <pre className="p-4 bg-[#0d1117] rounded-lg border border-dark-700 text-sm font-mono text-emerald-300 overflow-x-auto whitespace-pre-wrap">
                  {skill.outputFormat}
                </pre>
              ) : (
                <div className="p-4 bg-dark-800 rounded-lg text-gray-500 font-mono text-sm">Standard conversational output.</div>
              )}
            </section>
          </div>

          {/* Workflow Markdown */}
          {skill.workflow && (
             <section>
               <h2 className="text-lg font-semibold mb-4 text-gray-300 border-b border-dark-700 pb-2">Agent Workflow</h2>
               <div className="prose prose-invert prose-sm max-w-none p-6 bg-dark-800 border border-dark-700 rounded-xl" dangerouslySetInnerHTML={{ __html: marked.parse(skill.workflow) }}>
               </div>
             </section>
          )}

          {/* Source Link */}
          <section className="pt-8 border-t border-dark-700 flex justify-between items-center">
            <div className="text-sm font-mono text-gray-500">
              Repository Source: <span className="text-gray-300">{skill.path}</span>
            </div>
            <a 
              href={`https://github.com/iamnih4l/Thoth-OS/tree/main${skill.path}`} 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              <GitBranch className="w-4 h-4" />
              View Source on GitHub
            </a>
          </section>

        </div>
      </div>

      <AnimatePresence>
        {demoMode && <ExecutionDemo skill={skill} onClose={() => setDemoMode(false)} />}
      </AnimatePresence>
    </div>
  );
}
