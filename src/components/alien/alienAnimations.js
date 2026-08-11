export const AlienAnimationState = {
  EGG_HATCHING: 'eggHatching',
  IDLE: 'idle',
  WAVE: 'wave',
  TALK: 'talk',
  LOOK_AROUND: 'lookAround',
  TELEPORT: 'teleport',
};

export const alienAnimations = {
  [AlienAnimationState.EGG_HATCHING]: {
    src: '/alien/processed/egg-hatching.webp',
    loop: false,
    duration: 4000,
    alt: 'KIBO alien hatching from an egg',
  },
  [AlienAnimationState.IDLE]: {
    src: '/alien/processed/alien-idle.webp',
    loop: true,
    duration: null,
    alt: 'KIBO alien idle animation',
  },
  [AlienAnimationState.WAVE]: {
    src: '/alien/processed/alien-wave.webp',
    loop: false,
    duration: 4000,
    alt: 'KIBO alien waving',
  },
  [AlienAnimationState.TALK]: {
    src: '/alien/processed/alien-talk.webp',
    loop: false,
    duration: 4000,
    alt: 'KIBO alien talking',
  },
  [AlienAnimationState.LOOK_AROUND]: {
    src: '/alien/processed/alien-look-around.webp',
    loop: false,
    duration: 4000,
    alt: 'KIBO alien looking around',
  },
  [AlienAnimationState.TELEPORT]: {
    src: '/alien/processed/alien-teleport.webp',
    loop: false,
    duration: 4000,
    alt: 'KIBO alien teleporting',
  },
};

export const animationOrder = [
  AlienAnimationState.EGG_HATCHING,
  AlienAnimationState.IDLE,
  AlienAnimationState.WAVE,
  AlienAnimationState.TALK,
  AlienAnimationState.LOOK_AROUND,
  AlienAnimationState.TELEPORT,
];
