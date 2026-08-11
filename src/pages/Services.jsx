import { PageWrapper } from '../components/layout/PageWrapper';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useCursorStore } from '../store/useCursorStore';

const servicesList = [
  {
    id: 'branding',
    title: 'Branding & Identity',
    desc: 'Transforming ideas into cohesive visual languages.',
    subcategories: ['Brand Strategy', 'Identity Design', 'Logo Design', 'Brand Guidelines']
  },
  {
    id: 'social',
    title: 'Social Media',
    desc: 'Connecting with audiences where they live.',
    subcategories: ['Social Campaigns', 'Content Creation', 'Community Strategy']
  },
  {
    id: 'ai',
    title: 'AI Creatives',
    desc: 'Intelligent technology enhancing human imagination.',
    subcategories: ['AI-Assisted Production', 'Concept Generation', 'Dynamic Workflows']
  },
  {
    id: '3d',
    title: '3D Visualization',
    desc: 'Bringing depth and reality to the conceptual.',
    subcategories: ['Architectural Viz', 'Product Modeling', 'Motion Graphics']
  }
];

export function Services() {
  const [activeService, setActiveService] = useState(null);
  const { setCursorState } = useCursorStore();

  return (
    <PageWrapper>
      <section className="py-20 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-kibo-blue mb-6">
              Capabilities
            </h1>
            <p className="text-xl md:text-2xl text-kibo-blue/70 max-w-2xl">
              We don't just deliver files. We deliver capabilities that help you achieve your goals.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            <div className="flex flex-col gap-4">
              {servicesList.map((service) => (
                <motion.div
                  key={service.id}
                  className={`p-6 rounded-3xl cursor-pointer transition-all border ${
                    activeService === service.id 
                      ? 'bg-kibo-orange text-white border-kibo-orange shadow-lg' 
                      : 'bg-kibo-cream/30 hover:bg-kibo-cream/50 text-kibo-blue border-kibo-cream/50'
                  }`}
                  onClick={() => setActiveService(activeService === service.id ? null : service.id)}
                  onMouseEnter={() => setCursorState('hover')}
                  onMouseLeave={() => setCursorState('default')}
                >
                  <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                  <p className={`text-sm ${activeService === service.id ? 'text-white/90' : 'text-kibo-blue/70'}`}>
                    {service.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="bg-kibo-cream/10 rounded-3xl p-8 border border-kibo-cream/30 min-h-[400px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                {activeService ? (
                  <motion.div
                    key={activeService}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="w-full"
                  >
                    <h4 className="text-xl font-bold text-kibo-blue mb-6 uppercase tracking-widest border-b border-kibo-blue/10 pb-4">
                      {servicesList.find(s => s.id === activeService).title} Capabilities
                    </h4>
                    <ul className="flex flex-col gap-4">
                      {servicesList.find(s => s.id === activeService).subcategories.map(sub => (
                        <li key={sub} className="flex items-center gap-3 text-lg text-kibo-blue/80 font-medium">
                          <span className="w-2 h-2 rounded-full bg-kibo-green" />
                          {sub}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-kibo-blue/40 text-center"
                  >
                    Select a capability to see more details.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
