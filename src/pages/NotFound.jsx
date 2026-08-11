import { PageWrapper } from '../components/layout/PageWrapper';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export function NotFound() {
  return (
    <PageWrapper className="flex items-center justify-center">
      <div className="text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: 'spring' }}
          className="mb-8"
        >
          {/* Alien Mascot Lost State Placeholder */}
          <div className="w-48 h-48 mx-auto bg-kibo-green/20 rounded-full flex items-center justify-center text-6xl">
            🛸
          </div>
        </motion.div>
        
        <h1 className="text-6xl font-bold text-kibo-blue mb-4 tracking-tighter">404</h1>
        <p className="text-xl text-kibo-blue/70 mb-8 max-w-md mx-auto">
          It looks like we've explored a little too far into the unknown. Let's head back home.
        </p>
        
        <Button asChild>
          <Link to="/">Return to Earth</Link>
        </Button>
      </div>
    </PageWrapper>
  );
}
