import { PageWrapper } from '../components/layout/PageWrapper';
import { motion } from 'framer-motion';

export function About() {
  return (
    <PageWrapper>
      <section className="py-20 md:py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-kibo-blue mb-10">
              We believe every idea begins with hope.
            </h1>
          </motion.div>
          
          <div className="prose prose-lg text-kibo-blue/80 max-w-none">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl leading-relaxed mb-8"
            >
              The name KIBO comes from the Japanese word 「希望」, meaning hope, dream, aspiration, and possibility. This meaning is the emotional foundation of everything we do.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl md:text-2xl leading-relaxed mb-16"
            >
              We don't just design visual decoration. We build languages that communicate purpose, build trust, and create lasting human connections.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-16 border-t border-kibo-blue/10"
          >
            {[
              { title: 'Curiosity', desc: 'Asking why before how.' },
              { title: 'Creativity', desc: 'Turning ideas into experiences.' },
              { title: 'Collaboration', desc: 'Building together.' },
              { title: 'Human Connection', desc: 'Putting people first.' },
              { title: 'Impact', desc: 'Creating meaningful results.' },
            ].map((value, i) => (
              <div key={value.title} className="p-6 bg-kibo-cream/30 rounded-2xl">
                <h3 className="text-2xl font-bold text-kibo-blue mb-2">{value.title}</h3>
                <p className="text-kibo-blue/70">{value.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
}
