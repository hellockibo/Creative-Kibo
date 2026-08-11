import { PageWrapper } from '../components/layout/PageWrapper';
import { motion } from 'framer-motion';
import { useCursorStore } from '../store/useCursorStore';
import { useEffect } from 'react';

export function FuturePlatform() {
  const { setCursorState } = useCursorStore();

  useEffect(() => {
    // Force dark theme on body for this page if needed, 
    // though the wrapper handles the background.
    document.body.style.backgroundColor = '#0a0a0c';
    return () => {
      document.body.style.backgroundColor = '';
    }
  }, []);

  return (
    <PageWrapper className="bg-[#0a0a0c] text-white overflow-hidden relative">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 pt-20 flex flex-col min-h-[80vh]">
        <header className="flex justify-between items-center py-8 border-b border-white/10 text-xs font-mono tracking-widest text-white/50">
          <span>SYS.INIT // v1.0.0</span>
          <span className="text-kibo-green">SECURE CONNECTION</span>
        </header>

        <div className="flex-1 flex flex-col justify-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-kibo-green font-mono text-sm tracking-widest uppercase mb-6 block flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-kibo-green animate-pulse" />
              Project 01
            </span>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50">
              The Future <br /> Platform
            </h1>
            <p className="text-xl md:text-2xl text-white/60 max-w-2xl leading-relaxed mb-12">
              We are building an environment where creativity meets intelligent systems. A space for visionaries to collaborate, conceptualize, and create at the speed of thought.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { id: '01', title: 'Generative Architecture', desc: 'AI-assisted structural planning.' },
              { id: '02', title: 'Dynamic Visualization', desc: 'Real-time rendering pipelines.' },
              { id: '03', title: 'Collaborative Syntax', desc: 'Multi-user prompt engineering.' }
            ].map((module, i) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + (i * 0.1) }}
                className="p-6 border border-white/10 bg-white/5 backdrop-blur-sm group hover:bg-white/10 transition-colors cursor-crosshair"
                onMouseEnter={() => setCursorState('hover')}
                onMouseLeave={() => setCursorState('default')}
              >
                <span className="text-xs font-mono text-white/40 mb-4 block">MODULE_{module.id}</span>
                <h3 className="text-lg font-bold mb-2 group-hover:text-kibo-green transition-colors">{module.title}</h3>
                <p className="text-sm text-white/60">{module.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="py-8 text-center text-xs font-mono text-white/30"
        >
          AWAITING AUTHORIZATION...
        </motion.div>
      </div>
    </PageWrapper>
  );
}
