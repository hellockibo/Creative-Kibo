import { useEffect } from 'react';

export function AlienAnimation({ animation, onAnimationEnd, visible = true, className = '' }) {
  useEffect(() => {
    if (!visible || animation.loop || typeof animation.duration !== 'number') {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      onAnimationEnd?.();
    }, animation.duration + 50);

    return () => window.clearTimeout(timer);
  }, [animation, onAnimationEnd, visible]);

  if (!visible) {
    return null;
  }

  return (
    <img
      key={animation.src}
      src={animation.src}
      alt={animation.alt}
      className={`block w-full h-full object-contain select-none ${className}`}
      draggable="false"
      loading="eager"
      style={{ imageRendering: 'auto' }}
      aria-hidden="true"
    />
  );
}
