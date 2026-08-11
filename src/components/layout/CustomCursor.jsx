import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useCursorStore } from '../../store/useCursorStore';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const { cursorState, cursorText } = useCursorStore();

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);
    
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  if (isTouchDevice) return null;

  const variants = {
    default: {
      x: mousePosition.x - 8,
      y: mousePosition.y - 8,
      height: 16,
      width: 16,
      backgroundColor: 'rgba(96, 96, 122, 1)', // Dust Blue
      mixBlendMode: 'difference'
    },
    hover: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      height: 48,
      width: 48,
      backgroundColor: 'rgba(213, 123, 3, 0.4)', // Burnt Orange
      mixBlendMode: 'normal'
    },
    explore: {
      x: mousePosition.x - 40,
      y: mousePosition.y - 40,
      height: 80,
      width: 80,
      backgroundColor: 'rgba(244, 226, 208, 1)', // Soft Cream
      mixBlendMode: 'normal'
    }
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] flex items-center justify-center text-kibo-blue font-semibold text-xs text-center"
        variants={variants}
        animate={cursorState}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
          mass: 0.5
        }}
      >
        {cursorState === 'explore' && cursorText}
      </motion.div>
    </>
  );
}
