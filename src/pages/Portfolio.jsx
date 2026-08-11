import { PageWrapper } from '../components/layout/PageWrapper';
import { motion } from 'framer-motion';

export function Portfolio() {
  return (
    <PageWrapper>
      <section className="py-20 md:py-32 px-6 flex flex-col items-center text-center">
        <div className="max-w-4xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-kibo-blue mb-6">
              Our Work
            </h1>
            <p className="text-xl md:text-2xl text-kibo-blue/70 max-w-2xl mx-auto">
              We are currently preparing something meaningful. 
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="aspect-video w-full rounded-3xl bg-kibo-cream/30 border border-kibo-cream/50 flex flex-col items-center justify-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-kibo-blue/5 animate-pulse" />
            <h2 className="text-3xl md:text-5xl font-bold text-kibo-blue/40 relative z-10 tracking-widest uppercase">
              Coming Soon
            </h2>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
}
