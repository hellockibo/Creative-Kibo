import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useCursorStore } from '../../store/useCursorStore';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Future Platform', path: '/future-platform' }
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { setCursorState } = useCursorStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleMouseEnter = () => setCursorState('hover');
  const handleMouseLeave = () => setCursorState('default');

  const isDark = location.pathname === '/future-platform';

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#fdfdfc]/90 backdrop-blur-md border-b border-[#60607A]/10 py-3'
            : 'bg-transparent py-5'
        } ${isDark ? 'text-white' : 'text-[#2D3748]'}`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-between">
          {/* Logo - Left */}
          <Link 
            to="/" 
            className="flex items-center group z-10 w-48"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => {
              if (location.pathname === '/') {
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
              }
            }}
            aria-label="Creative KIBO — Home"
          >
            <img 
              src="/logo.png" 
              alt="Creative KIBO Logo" 
              className={`h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105 ${isDark ? 'brightness-0 invert' : ''}`}
            />
          </Link>

          {/* Desktop Nav - Center */}
          <nav className="hidden lg:flex items-center justify-center gap-10 font-medium text-[1.05rem] absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                className="relative group py-2"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <span className={`transition-colors ${location.pathname === link.path ? 'text-[#1a1a1a] font-semibold' : 'text-[#4a4a52] hover:text-[#1a1a1a]'}`}>
                  {link.name}
                </span>
                <span className={`absolute left-0 bottom-0 w-full h-[2px] bg-[#D57B03] origin-left transition-transform duration-300 ${location.pathname === link.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
              </Link>
            ))}
          </nav>

          {/* CTA & Mobile Toggle - Right */}
          <div className="flex items-center justify-end gap-6 w-48 z-10">
            <Link 
              to="/contact"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className={`hidden md:flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 ${
                isDark 
                  ? 'bg-white text-[#0a0a0c]' 
                  : 'bg-gradient-to-r from-[#D57B03] to-[#F08A2D] text-white'
              }`}
            >
              Let's Talk
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>

            <button 
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(true)}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Menu className="w-7 h-7" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-[#fdfdfc] flex flex-col"
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <img src="/logo.png" alt="Creative KIBO Logo" className="h-10 w-auto object-contain" />
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 bg-gray-100 rounded-full text-gray-800"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <nav className="flex flex-col gap-6 p-8 text-3xl font-heading font-semibold text-[#1a1a1a]">
              {navLinks.map((link) => (
                <Link 
                  key={link.path} 
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={location.pathname === link.path ? 'text-[#D57B03]' : ''}
                >
                  {link.name}
                </Link>
              ))}
              <div className="mt-8 pt-8 border-t border-gray-100">
                <Link 
                  to="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-3 w-full py-4 bg-gradient-to-r from-[#D57B03] to-[#F08A2D] text-white rounded-full text-xl font-bold shadow-lg"
                >
                  Let's Talk
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
