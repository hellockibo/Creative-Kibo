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
              <a href="https://pin.it/10MIMem2w" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#E60023] text-white border border-[#E60023] flex items-center justify-center hover:opacity-90 transition-all" aria-label="Pinterest">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.25c-5.52 0-10 4.48-10 10 0 4.2 2.8 7.8 6.8 9.2.2-.8.5-2.1.5-2.5 0-.4-.1-.9-.5-1.5-.9-1.4-1.4-3.1-1.4-5.1 0-3.1 2.2-5.7 5.6-5.7 2.8 0 4.7 1.7 4.7 4.1 0 3.1-1.7 5.4-3.8 5.4-1.2 0-2.1-.9-1.8-2.1.3-1.5 1-3.1 1-4.6 0-1.1-.6-1.9-1.8-1.9-1.4 0-2.5 1.5-2.5 3.5 0 1.3.4 2.1.4 2.1l-1.6 6.6c-.2.9-.1 2.2-.1 2.9 0 0-.9.4-1.4.4-1.1 0-2.1-.8-2.8-1.7.1-.2.4-1 .5-1.3.2-.4.4-.9.4-1.3 0-.5-.2-.9-.7-1.2-.7-.5-1.7-.9-2.5-.9-1.9 0-3.3 1.5-3.3 3.5 0 2.1 1.7 3.8 4.1 3.8.6 0 1.2-.1 1.8-.3.5-.2 1.3-.3 1.7-.1.7.2 1.1.9 1.1 1.6 0 1.8-1.6 4.1-5.3 4.1-4.2 0-7.1-3.1-7.1-7.3 0-3.2 2.3-6.3 6.4-6.3 3.2 0 5.5 2.2 5.5 5.1 0 1.9-.9 3.9-2.6 4.8-.8.4-1.5.7-2.4.7-.9 0-1.8-.5-1.9-1.4-.1-.6.3-1.4.7-2.2.6-1.2 1.1-2.6 1.1-4.1 0-1.8-1.1-3.1-2.8-3.1-2.1 0-3.5 2-3.5 4.4 0 1.3.4 2.2.9 3.1l-2.1 8.4c-.4 1.5-.6 2.9-.6 4.3-.3-.1-.7-.2-1-.3.1-.1.5-1 .6-1.6.4-1.5.6-3 .6-4.5 0-.9-.1-1.8-.4-2.6l2.1-8.3c.5-2.1 1.7-3.9 4.1-3.9 1.6 0 2.6 1.1 2.6 2.7 0 1.2-.7 2.5-1.7 3.6-.6.7-1.1 1.3-1.1 2.2 0 .8.5 1.5 1.2 1.5.9 0 1.8-.8 2.3-1.9.7-1.5 1.3-3.5 1.3-5.3 0-2.7-1.7-4.8-5.1-4.8-4 0-6.6 3.2-6.6 7 0 2.8 1.7 5.3 4.5 6.2.3.1.6.1.8-.1l.4-.8c.1-.1.2-.4.1-.7-.6-1.6-.9-3.1-.9-4.6 0-2.3 1.5-4.1 3.5-4.1 1.7 0 2.7 1.2 2.7 2.8 0 2.2-1.5 4.6-3.6 4.6-1 0-1.7-.8-1.7-1.8 0-1.5 1.1-3.1 1.1-4.1 0-.7-.4-1.2-1.2-1.2-.9 0-1.7.9-1.7 2.1 0 .8.2 1.4.2 1.4S8 12.3 8 13.8c0 .4-.1 1.2-.2 1.7C7.8 17.2 7 18.5 7 20.1c0 1.7 1.2 3.1 3.1 3.1 2.6 0 4.4-1.9 4.4-4.6 0-1.9-.6-3.4-1.8-4.5-.3-.3-.7-.6-1.1-.8-.8-.5-1.7-.9-2.5-.9-1 0-1.9.7-1.9 1.7 0 .7.5 1.4 1.2 1.4.5 0 .9-.2 1.3-.6.5-.5.7-1.1.7-1.8 0-.8-.4-1.4-1.2-1.4-.9 0-1.6.7-1.6 1.8 0 .8.3 1.4.9 1.9.4.4.5.8.5 1.3 0 1.3-1.1 2.5-2.7 2.5-2.1 0-3.9-1.7-3.9-4.1 0-2.6 2.2-4.8 5.1-4.8 2.9 0 4.8 2.1 4.8 4.8 0 2.6-1.8 4.7-4.3 4.7-1.2 0-2.2-.6-2.7-1.4l-.7 2.6c-.2.8-.7 1.9-1 2.6.9.8 2.2 1.2 3.5 1.2 4.9 0 8.7-4 8.7-8.9 0-4.9-3.7-8.7-8.7-8.7Z"/></svg>
              </a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
