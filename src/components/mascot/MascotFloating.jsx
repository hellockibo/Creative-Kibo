import { motion } from 'framer-motion';
import { useState } from 'react';

export default function MascotFloating({ src = '/alien/Masot.png', alt = 'Mascot' }) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <motion.div
      className="mascot-floating"
      initial={{ y: 0 }}
      animate={{ y: [0, -14, 0, -8, 0], rotate: [0, -2, 1, -1, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      whileHover={{ scale: 1.06 }}
    >
      <img
        src={imgSrc}
        alt={alt}
        onError={(e) => {
          // Try a few fallbacks (root alien-wave.gif then a generic idle)
          if (imgSrc !== '/alien-wave.gif' && imgSrc !== '/alien-idle.gif') {
            setImgSrc('/alien-wave.gif');
            return;
          }
          if (imgSrc !== '/alien-idle.gif') {
            setImgSrc('/alien-idle.gif');
            return;
          }
        }}
        className="mascot-image"
      />
    </motion.div>
  );
}
