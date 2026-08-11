import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AlienAnimation } from './AlienAnimation';
import { AlienAnimationState, alienAnimations } from './alienAnimations';
import { alienLocations, defaultLocation, routeToLocation } from './alienConfig';

const STORAGE_KEY = 'kibo_alien_intro_played';
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
const MOBILE_BREAKPOINT = 768;

function getInitialStorageFlag() {
  if (typeof window === 'undefined') return false;
  return window.localStorage.getItem(STORAGE_KEY) === 'true';
}

function usePrefersReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(REDUCED_MOTION_QUERY).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const media = window.matchMedia(REDUCED_MOTION_QUERY);
    const listener = () => setReducedMotion(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  return reducedMotion;
}

export const AlienCharacter = forwardRef((props, ref) => {
  const location = useLocation();
  const [introPlayed, setIntroPlayed] = useState(getInitialStorageFlag);
  const [showEgg, setShowEgg] = useState(false);
  const [eggOpened, setEggOpened] = useState(false);
  const [showAlien, setShowAlien] = useState(introPlayed);
  const [showBubble, setShowBubble] = useState(false);
  const [bubbleText, setBubbleText] = useState('');
  const [currentAnimation, setCurrentAnimation] = useState(AlienAnimationState.IDLE);
  const [mobile, setMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth < MOBILE_BREAKPOINT : false);
  const [paused, setPaused] = useState(false);
  const [section, setSection] = useState(defaultLocation);

  const reducedMotion = usePrefersReducedMotion();
  const introTimeout = useRef(null);
  const bubbleTimeout = useRef(null);

  const currentLocation = useMemo(
    () => routeToLocation[location.pathname] ?? defaultLocation,
    [location.pathname],
  );

  const placement = useMemo(() => {
    return alienLocations[currentLocation] ?? alienLocations[defaultLocation];
  }, [currentLocation]);

  const showSpeechBubble = (text, duration = 2400) => {
    setBubbleText(text);
    setShowBubble(true);
    window.clearTimeout(bubbleTimeout.current);
    bubbleTimeout.current = window.setTimeout(() => setShowBubble(false), duration);
  };

  const playAnimation = (animationState) => {
    if (!alienAnimations[animationState]) return;
    setCurrentAnimation(animationState);
  };

  const showIdle = () => playAnimation(AlienAnimationState.IDLE);

  const wave = () => playAnimation(AlienAnimationState.WAVE);
  const talk = () => playAnimation(AlienAnimationState.TALK);
  const lookAround = () => playAnimation(AlienAnimationState.LOOK_AROUND);
  const teleport = () => playAnimation(AlienAnimationState.TELEPORT);

  useImperativeHandle(ref, () => ({
    wave,
    talk,
    lookAround,
    teleport,
  }), []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleResize = () => setMobile(window.innerWidth < MOBILE_BREAKPOINT);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (introPlayed || reducedMotion) {
      setShowEgg(false);
      setShowAlien(true);
      showIdle();
      return;
    }

    setShowEgg(true);
    introTimeout.current = window.setTimeout(() => setEggOpened(true), 900);
    introTimeout.current = window.setTimeout(() => {
      setShowEgg(false);
      setShowAlien(true);
      playAnimation(AlienAnimationState.EGG_HATCHING);
      window.localStorage.setItem(STORAGE_KEY, 'true');
      setIntroPlayed(true);
    }, 2200);

    return () => {
      window.clearTimeout(introTimeout.current);
    };
  }, [introPlayed, reducedMotion]);

  useEffect(() => {
    if (typeof document === 'undefined') return undefined;
    const handleVisibility = () => setPaused(document.visibilityState !== 'visible');
    handleVisibility();
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  useEffect(() => {
    if (currentLocation === section) return;
    setSection(currentLocation);
    const locationConfig = alienLocations[currentLocation] ?? alienLocations[defaultLocation];

    if (locationConfig.travel === 'ufo') {
      showSpeechBubble('Docking in the UFO...', 2600);
    } else if (locationConfig.travel === 'fly') {
      showSpeechBubble('I’m gliding over...', 2600);
    }
  }, [currentLocation, section]);

  const handleAnimationEnd = () => {
    if (currentAnimation === AlienAnimationState.EGG_HATCHING) {
      showSpeechBubble('Hello 👋', 2600);
      wave();
      return;
    }

    if (currentAnimation !== AlienAnimationState.IDLE) {
      showIdle();
    }
  };

  const containerStyle = useMemo(() => ({
    position: 'fixed',
    zIndex: 45,
    pointerEvents: 'none',
    ...placement.position,
    width: placement.width,
    maxWidth: 'calc(100vw - 32px)',
  }), [placement]);

  const innerStyle = {
    width: '100%',
    height: '100%',
    pointerEvents: 'auto',
    touchAction: 'none',
  };

  const eggClass = eggOpened ? 'translate-y-6 opacity-0' : 'translate-y-0 opacity-100';

  const animation = alienAnimations[currentAnimation] ?? alienAnimations[AlienAnimationState.IDLE];

  return (
    <div style={containerStyle} className="pointer-events-none">
      <div style={innerStyle} className="relative">
        {showEgg && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="relative flex h-[240px] w-[180px] flex-col items-center justify-center">
              <div className={`absolute top-0 h-[52%] w-[85%] rounded-b-[120px] bg-kibo-cream shadow-[0_12px_50px_rgba(0,0,0,0.12)] transition-all duration-700 ${eggClass}`} />
              <div className={`absolute bottom-0 h-[52%] w-[80%] rounded-t-[120px] bg-kibo-green shadow-[0_-10px_40px_rgba(0,0,0,0.12)] transition-all duration-700 ${eggClass}`} />
              <div className="absolute inset-x-0 top-[48%] h-2 bg-kibo-blue rounded-full shadow-sm" />
            </div>
          </div>
        )}

        {showAlien && (
          <div className="relative w-full h-full">
            <AlienAnimation
              animation={animation}
              onAnimationEnd={handleAnimationEnd}
              visible={!paused}
              className="w-full h-full"
            />
          </div>
        )}

        {showBubble && (
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-max max-w-[220px] rounded-3xl bg-white/95 text-kibo-blue shadow-2xl shadow-black/10 px-4 py-3 text-sm leading-snug pointer-events-none">
            {bubbleText}
          </div>
        )}
      </div>
    </div>
  );
});
