import { useEffect, useRef } from 'react';

export function AlienAnimation({ animation, onAnimationEnd, visible = true, className = '' }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!visible || animation.loop || typeof animation.duration !== 'number') {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      onAnimationEnd?.();
    }, animation.duration + 50);

    return () => window.clearTimeout(timer);
  }, [animation, onAnimationEnd, visible]);

  // Handle video playback for non-looping animations
  useEffect(() => {
    if (!visible || !videoRef.current) return;

    if (animation.loop) {
      videoRef.current.loop = true;
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.loop = false;
      videoRef.current.play().catch(() => {});
    }
  }, [animation, visible]);

  if (!visible) {
    return null;
  }

  // Determine if we should use video or img tag
  const isWebP = animation.src?.endsWith('.webp');

  if (isWebP) {
    return (
      <video
        key={animation.src}
        ref={videoRef}
        src={animation.src}
        className={`block w-full h-full object-contain select-none ${className}`}
        draggable="false"
        autoPlay
        muted
        aria-hidden="true"
        style={{ display: 'block' }}
      />
    );
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
