import { motion } from 'framer-motion';

export function PageWrapper({ children, className = "" }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`min-h-screen pt-20 ${className}`}
    >
      {children}
    </motion.main>
  );
}
