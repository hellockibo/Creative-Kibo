import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCursorStore } from '../../store/useCursorStore';

export function Footer() {
  const { setCursorState } = useCursorStore();

  const handleMouseEnter = () => setCursorState('hover');
  const handleMouseLeave = () => setCursorState('default');

  return (
    <footer className="bg-[#fdfdfc] border-t border-gray-100 py-16 px-6 lg:px-12 relative overflow-hidden text-[#4a4a52]">
      <div className="max-w-[1400px] mx-auto relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Logo & Bio - Left */}
          <div className="col-span-1 md:col-span-5">
            <Link 
              to="/" 
              className="inline-block mb-6 group"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <img 
                src="/logo.png" 
                alt="Creative KIBO" 
                className="h-14 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </Link>
            <p className="text-[1.05rem] leading-relaxed max-w-sm mb-6">
              Human-first creative agency transforming ideas into meaningful experiences.
            </p>
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Creative KIBO. All rights reserved.
            </p>
          </div>

          {/* Navigation */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="font-bold text-[#1a1a1a] mb-5">Navigation</h4>
            <ul className="flex flex-col gap-3 font-medium">
              <li><Link to="/" className="hover:text-[#D57B03] transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-[#D57B03] transition-colors">About</Link></li>
              <li><Link to="/services" className="hover:text-[#D57B03] transition-colors">Services</Link></li>
              <li><Link to="/portfolio" className="hover:text-[#D57B03] transition-colors">Portfolio</Link></li>
              <li><Link to="/future-platform" className="hover:text-[#D57B03] transition-colors">Future</Link></li>
              <li><Link to="/contact" className="hover:text-[#D57B03] transition-colors">Let's Talk</Link></li>
            </ul>
          </div>

          {/* Get in Touch */}
          <div className="col-span-1 md:col-span-3">
            <h4 className="font-bold text-[#1a1a1a] mb-5">Get in Touch</h4>
            <ul className="flex flex-col gap-4 font-medium">
              <li>
                <a href="mailto:hello@creativekibo.com" className="flex items-center gap-3 hover:text-[#D57B03] transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  hello@creativekibo.com
                </a>
              </li>
              <li>
                <a href="https://wa.me/919373541264" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-[#D57B03] transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  +91 93735 41264
                </a>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="font-bold text-[#1a1a1a] mb-5">Follow Us</h4>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/creative_kibo/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#D57B03] hover:text-white hover:border-[#D57B03] transition-all" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="https://www.linkedin.com/in/creative-kibo-24a62242b/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#D57B03] hover:text-white hover:border-[#D57B03] transition-all" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="https://pin.it/10MIMem2w" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#D57B03] hover:text-white hover:border-[#D57B03] transition-all" aria-label="Pinterest">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.25A9.75 9.75 0 0 0 8.44 21.08c-.08-1.34-.01-2.95.33-4.23l1.22-5.17s-.31-.62-.31-1.54c0-1.45.84-2.54 1.89-2.54.89 0 1.32.67 1.32 1.47 0 .9-.57 2.24-.86 3.48-.25 1.04.52 1.89 1.55 1.89 1.86 0 3.29-1.96 3.29-4.79 0-2.5-1.8-4.25-4.37-4.25-2.98 0-4.73 2.24-4.73 4.55 0 .9.35 1.86.78 2.38.09.11.1.2.07.31l-.29 1.17c-.05.19-.15.23-.35.14-1.3-.61-2.11-2.5-2.11-4.03 0-3.28 2.38-6.29 6.87-6.29 3.61 0 6.42 2.57 6.42 6.01 0 3.59-2.26 6.48-5.4 6.48-1.05 0-2.03-.55-2.37-1.2l-.65 2.47c-.23.91-.86 2.06-1.28 2.76.96.29 1.96.45 3 .45A9.75 9.75 0 1 0 12 2.25Z"/></svg>
              </a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
