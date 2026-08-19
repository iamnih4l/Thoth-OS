import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Play, Loader2, CheckCircle, Code } from 'lucide-react';

export default function ExecutionDemo({ skill, onClose }) {
  const [status, setStatus] = useState('idle');
  const [logs, setLogs] = useState([]);
  const [input, setInput] = useState('{\n  "task": "Test capability",\n  "context": "Demo environment"\n}');

  const execute = () => {
    setStatus('running');
    setLogs([]);
    
    const sequence = [
      { msg: 'Intercepting intent via Thoth-OS Kernel...', delay: 500 },
      { msg: 'Resolving capability: ' + skill.name, delay: 1000 },
      { msg: 'Validating payload against input schema...', delay: 1800 },
      { msg: 'Context Manager: loading necessary dependencies...', delay: 2500 },
      { msg: `Executing ${skill.category} / ${skill.name}...`, delay: 3500 },
      { msg: 'Formatting output against schema...', delay: 5000 },
      { msg: 'Execution complete.', delay: 5500, type: 'success' }
    ];

    sequence.forEach(({ msg, delay, type }) => {
      setTimeout(() => {
        setLogs(prev => [...prev, { time: new Date().toLocaleTimeString(), msg, type }]);
        if (type === 'success') setStatus('success');
      }, delay);
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <motion.div 
        initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}
        className="bg-[#0b0e14] border border-dark-700 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col"
      >
        <div className="flex justify-between items-center p-4 border-b border-dark-700 bg-dark-900">
          <div className="flex items-center gap-3">
            <div className="px-2 py-0.5 bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-mono rounded">DEMO MODE</div>
            <h3 className="font-semibold text-gray-200">Execution Simulator</h3>
          </div>
          <button onClick={onClose} className="p-1 text-gray-500 hover:text-white rounded"><X className="w-5 h-5"/></button>
        </div>

        <div className="grid grid-cols-2 h-[500px]">
          {/* Left: Input */}
          <div className="border-r border-dark-700 flex flex-col bg-[#0d1117]">
            <div className="p-3 border-b border-dark-700 text-xs font-mono text-gray-400 flex items-center gap-2">
              <Code className="w-3.5 h-3.5" /> Input Payload (JSON)
            </div>
            <textarea 
              value={input}
              onChange={e => setInput(e.target.value)}
              className="flex-1 w-full bg-transparent text-emerald-400 font-mono text-sm p-4 focus:outline-none resize-none"
              spellCheck="false"
            />
            <div className="p-4 border-t border-dark-700">
              <button 
                onClick={execute}
                disabled={status === 'running'}
                className="w-full flex items-center justify-center gap-2 bg-accent-600 hover:bg-accent-500 disabled:bg-dark-700 disabled:text-gray-500 text-white py-2.5 rounded-lg font-medium transition-colors"
              >
                {status === 'running' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                {status === 'running' ? 'Executing...' : 'Run Simulation'}
              </button>
            </div>
          </div>

          {/* Right: Output / Logs */}
          <div className="flex flex-col bg-[#0b0e14] relative">
            <div className="p-3 border-b border-dark-700 text-xs font-mono text-gray-400">
              Runtime Telemetry
            </div>
            <div className="flex-1 overflow-y-auto p-4 font-mono text-xs space-y-2">
              {logs.length === 0 && <span className="text-gray-600">Awaiting execution...</span>}
              {logs.map((log, i) => (
                <div key={i} className="flex gap-3">
                  <span className="text-gray-600 shrink-0">[{log.time}]</span>
                  <span className={log.type === 'success' ? 'text-emerald-400' : 'text-gray-300'}>
                    {log.msg}
                  </span>
                </div>
              ))}
              {status === 'success' && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mt-4 p-4 border border-emerald-500/30 bg-emerald-500/10 rounded text-emerald-400 flex flex-col items-center justify-center gap-2">
                  <CheckCircle className="w-8 h-8" />
                  <span className="text-sm font-medium">SIMULATION COMPLETE</span>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
