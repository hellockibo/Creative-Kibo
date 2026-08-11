export const alienLocations = {
  hero: {
    position: { right: 24, bottom: 24 },
    width: 260,
    travel: 'walk',
  },
  about: {
    position: { left: 24, top: '30%' },
    width: 240,
    travel: 'float',
  },
  services: {
    position: { right: 24, top: '38%' },
    width: 260,
    travel: 'walk',
  },
  portfolio: {
    position: { left: 24, bottom: '28%' },
    width: 260,
    travel: 'fly',
  },
  futurePlatform: {
    position: { right: 24, top: '18%' },
    width: 280,
    travel: 'ufo',
  },
  contact: {
    position: { left: '50%', bottom: 24, transform: 'translateX(-50%)' },
    width: 260,
    travel: 'walk',
  },
  footer: {
    position: { right: 24, bottom: 16 },
    width: 220,
    travel: 'float',
  },
};

export const routeToLocation = {
  '/': 'hero',
  '/about': 'about',
  '/services': 'services',
  '/portfolio': 'portfolio',
  '/future-platform': 'futurePlatform',
  '/contact': 'contact',
};

export const defaultLocation = 'hero';
