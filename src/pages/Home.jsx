import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCursorStore } from '../store/useCursorStore';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import './Home.css';
import MascotFloating from '../components/mascot/MascotFloating';

export function Home() {
  const { setCursorState } = useCursorStore();
  const { scrollY } = useScroll();
  const mascotY = useTransform(scrollY, [0, 800], [0, 250]);
  
  const handleHoverEnter = () => setCursorState('hover');
  const handleHoverLeave = () => setCursorState('default');

  return (
    <main className="home-page min-h-screen pt-24">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container max-w-[1400px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[85vh]">
          
          <div className="hero-content z-10 relative">
            <motion.div 
              className="badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#839958] text-[#839958] font-bold text-sm tracking-wider uppercase mb-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              HUMAN FIRST. TECHNOLOGY EMPOWERED.
            </motion.div>
            
            <motion.h1 
              className="text-[4rem] lg:text-[5.5rem] font-bold leading-[1.05] tracking-tight text-[#2D3748] mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Transform Ideas<br />
              Into <span className="text-[#839958]">Experiences.</span>
            </motion.h1>
            
            <motion.p 
              className="text-lg text-[#4a4a52] max-w-lg mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              We blend human creativity, strategic thinking and AI-powered tools to craft meaningful brand experiences that inspire people and grow businesses.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap items-center gap-6 mb-12"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Link to="/contact" className="btn-primary" onMouseEnter={handleHoverEnter} onMouseLeave={handleHoverLeave}>
                Book a Discovery Call
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </Link>
              <Link to="/portfolio" className="btn-text" onMouseEnter={handleHoverEnter} onMouseLeave={handleHoverLeave}>
                Explore Our Work
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </Link>
            </motion.div>
            
            <motion.div 
              className="trust-avatars flex items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
            </motion.div>
          </div>

          <div className="hero-visual relative h-full min-h-[600px] flex items-center justify-center">
            {/* Background Shapes */}
            <div className="shape shape-arch"></div>
            <svg viewBox="0 0 240 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="shape shape-triangle">
              <path d="M102.68 15.3601C110.38 2.03006 129.62 2.03006 137.32 15.3601L233.15 181.259C240.85 194.589 231.23 211.259 215.83 211.259H24.1702C8.77025 211.259 -0.849749 194.589 6.85025 181.259L102.68 15.3601Z" fill="#D57B03"/>
            </svg>
            
            {/* Floating details */}
            <div className="float-dot green" style={{ top: '10%', right: '20%' }}></div>
            <div className="float-dot outline" style={{ top: '30%', right: '5%' }}></div>
            <div className="float-star" style={{ top: '15%', left: '10%' }}>✦</div>
            <div className="float-star" style={{ bottom: '20%', right: '15%' }}>✦</div>
            <div className="float-grid"></div>

            {/* Mascot */}
            <motion.div 
              className="mascot-wrapper relative z-20"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, type: 'spring' }}
            >
              <motion.div style={{ y: mascotY }}>
                <div className="speech-bubble">Hello 👋</div>
                <img src="/alien/Masot.png" alt="Creative KIBO mascot" className="w-[400px] drop-shadow-2xl" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="features-bar py-12 border-y border-gray-100 bg-white relative z-10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-wrap lg:flex-nowrap justify-between items-center gap-8">
          
          <div className="feature-item flex items-center gap-4">
            <div className="feature-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/><path d="M12 11c1.5-1.5 2.5-3.5 2.5-5.5"/><path d="M12 11c-1.5-1.5-2.5-3.5-2.5-5.5"/></svg></div>
            <div>
              <h4 className="font-bold text-[#2D3748]">Human First</h4>
              <p className="text-sm text-gray-500">People and purpose<br/>above everything.</p>
            </div>
          </div>
          <div className="feature-divider hidden lg:block w-px h-12 bg-gray-200"></div>
          
          <div className="feature-item flex items-center gap-4">
            <div className="feature-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg></div>
            <div>
              <h4 className="font-bold text-[#2D3748]">Creative by Nature</h4>
              <p className="text-sm text-gray-500">Curious minds turning<br/>ideas into impact.</p>
            </div>
          </div>
          <div className="feature-divider hidden lg:block w-px h-12 bg-gray-200"></div>

          <div className="feature-item flex items-center gap-4">
            <div className="feature-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4M3 5h4"/></svg></div>
            <div>
              <h4 className="font-bold text-[#2D3748]">Tech Empowered</h4>
              <p className="text-sm text-gray-500">AI and technology<br/>amplify creativity.</p>
            </div>
          </div>
          <div className="feature-divider hidden lg:block w-px h-12 bg-gray-200"></div>

          <div className="feature-item flex items-center gap-4">
            <div className="feature-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></div>
            <div>
              <h4 className="font-bold text-[#2D3748]">Built Together</h4>
              <p className="text-sm text-gray-500">Collaboration is at the<br/>heart of everything.</p>
            </div>
          </div>
          <div className="feature-divider hidden lg:block w-px h-12 bg-gray-200"></div>

          <div className="feature-item flex items-center gap-4">
            <div className="feature-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg></div>
            <div>
              <h4 className="font-bold text-[#2D3748]">Driven by Impact</h4>
              <p className="text-sm text-gray-500">We create work that<br/>makes a difference.</p>
            </div>
          </div>

        </div>
      </section>

      {/* Services Section */}
      <section className="services-section relative pt-24 pb-16 overflow-hidden">
        <div className="wave-bg absolute top-0 left-0 w-full h-full -z-10"></div>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <p className="text-sm font-bold text-[#839958] uppercase tracking-widest mb-3">WHAT WE CREATE</p>
              <h2 className="text-4xl lg:text-[2.75rem] font-bold text-[#2D3748] leading-[1.1]">
                Creative solutions<br/>for modern brands<span className="text-[#D57B03]">.</span>
              </h2>
            </div>
            <Link to="/services" className="font-bold text-[#2D3748] hover:text-[#D57B03] flex items-center gap-2 transition-colors">
              View all services <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </Link>
          </div>

          <div className="services-grid">
            
            <motion.div className="service-card active" whileHover={{ y: -8 }}>
              <div className="service-icon bg-[#3B3B4F]"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><circle cx="12" cy="18" r="3"/><path d="M7.5 8.5 10.5 16"/><path d="M16.5 8.5 13.5 16"/><path d="M8.5 6h7"/></svg></div>
              <h3 className="text-2xl font-bold text-[#2D3748] mb-4">Branding</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">Build strong identities that tell your story and connect deeply.</p>
              <button className="service-btn"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></button>
            </motion.div>

            <motion.div className="service-card" whileHover={{ y: -8 }}>
              <div className="service-icon bg-[#839958]"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 7h.01"/><path d="M17 7h.01"/><path d="M7 17h.01"/><path d="M17 17h.01"/><path d="M12 12h.01"/></svg></div>
              <h3 className="text-2xl font-bold text-[#2D3748] mb-4">Social Media</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">Engaging content and campaigns that grow your brand.</p>
              <button className="service-btn"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></button>
            </motion.div>

            <motion.div className="service-card" whileHover={{ y: -8 }}>
              <div className="service-icon bg-[#D57B03]"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4M3 5h4"/></svg></div>
              <h3 className="text-2xl font-bold text-[#2D3748] mb-4">AI Creatives</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">AI-powered visuals and content for limitless creativity.</p>
              <button className="service-btn"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></button>
            </motion.div>

            <motion.div className="service-card" whileHover={{ y: -8 }}>
              <div className="service-icon bg-[#4A5568]"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg></div>
              <h3 className="text-2xl font-bold text-[#2D3748] mb-4">3D Visualization</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">Stunning 3D and architectural visuals that bring ideas to life.</p>
              <button className="service-btn"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></button>
            </motion.div>

            <motion.div className="service-card" whileHover={{ y: -8 }}>
              <div className="service-icon bg-[#718096]"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M8 10h.01"/><path d="M12 10h.01"/><path d="M16 10h.01"/></svg></div>
              <h3 className="text-2xl font-bold text-[#2D3748] mb-4">Storytelling</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">Stories, presentations and experiences that leave a lasting impact.</p>
              <button className="service-btn"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></button>
            </motion.div>
            
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="portfolio-section py-20 bg-[#F9F7F3]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row gap-16 items-center">
          
          <div className="portfolio-text w-full lg:w-1/4">
            <p className="text-sm font-bold text-[#839958] uppercase tracking-widest mb-3">SELECTED WORK</p>
            <h2 className="text-4xl lg:text-[2.75rem] font-bold text-[#2D3748] leading-[1.1] mb-6">
              A glimpse of<br/>what we create<span className="text-[#D57B03]">.</span>
            </h2>
            <p className="text-gray-600 mb-6 text-lg">Our portfolio is growing.<br/>Exciting projects coming soon!</p>
            <Link to="/portfolio" className="font-bold text-[#D57B03] hover:text-[#F08A2D] flex items-center gap-2 transition-colors text-lg">
              View Portfolio <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </Link>
          </div>

          <div className="portfolio-gallery w-full lg:w-3/4 flex gap-6 overflow-x-auto pb-8 pt-4 snap-x no-scrollbar relative items-center">
            
            <div className="portfolio-card shrink-0 w-[300px] h-[340px] rounded-[32px] bg-[#3B3B4F] flex items-center justify-center p-8 snap-center hover:-translate-y-2 transition-transform duration-300">
               <div className="w-full h-full border border-white/10 rounded-2xl relative overflow-hidden flex items-center justify-center bg-[#2D2D42]">
                 <img src="/logo.png" alt="Project 1" className="w-24 brightness-0 invert opacity-40"/>
                 <div className="absolute top-4 left-4 flex gap-2">
                   <div className="w-2 h-2 rounded-full bg-white/30"></div>
                   <div className="w-2 h-2 rounded-full bg-white/30"></div>
                 </div>
               </div>
            </div>

            <div className="portfolio-card shrink-0 w-[300px] h-[340px] rounded-[32px] bg-[#1A1A1A] flex items-center justify-center p-8 snap-center hover:-translate-y-2 transition-transform duration-300">
               <div className="w-full h-full border border-white/10 rounded-2xl relative overflow-hidden flex flex-col justify-between bg-[#111] p-6">
                 <div className="w-8 h-8 rounded-full bg-white/20"></div>
                 <div className="w-full h-24 bg-white/5 rounded-xl"></div>
                 <div className="flex gap-2">
                   <div className="w-12 h-4 bg-white/20 rounded"></div>
                   <div className="w-16 h-4 bg-white/10 rounded"></div>
                 </div>
               </div>
            </div>

            <div className="portfolio-card shrink-0 w-[300px] h-[340px] rounded-[32px] bg-[#E2E8F0] overflow-hidden snap-center hover:-translate-y-2 transition-transform duration-300 shadow-sm relative">
               <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="House" className="w-full h-full object-cover"/>
            </div>

            <div className="portfolio-card shrink-0 w-[300px] h-[340px] rounded-[32px] bg-[#1A1A2E] overflow-hidden snap-center flex items-center justify-center hover:-translate-y-2 transition-transform duration-300">
               <div className="flex gap-4 p-4 transform rotate-12">
                 <div className="w-20 h-40 rounded-2xl bg-[#2D2D42] border border-white/10 shadow-xl flex flex-col items-center p-2 gap-2">
                   <div className="w-full h-16 bg-white/5 rounded-xl"></div>
                   <div className="w-full h-8 bg-white/5 rounded-xl"></div>
                 </div>
                 <div className="w-20 h-40 rounded-2xl bg-[#2D2D42] border border-white/10 shadow-xl -translate-y-8 flex flex-col items-center p-2 gap-2">
                   <div className="w-12 h-12 bg-[#D57B03]/20 rounded-full my-auto"></div>
                 </div>
               </div>
            </div>
            
            <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 lg:translate-x-6 w-14 h-14 bg-[#D57B03] text-white rounded-full flex items-center justify-center shadow-[0_10px_25px_rgba(213,123,3,0.4)] hover:bg-[#F08A2D] hover:scale-110 transition-all z-10 sticky right-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="quote-section pt-24 pb-32 bg-white relative">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-16 relative z-10">
          
          <div className="quote-content flex-1 flex gap-6 items-start">
            <span className="text-[120px] text-[#D57B03] font-serif leading-[0.6] mt-8 opacity-80">“</span>
            <h2 className="text-4xl lg:text-[3rem] font-bold text-[#2D3748] leading-[1.1] tracking-tight">
              We don't just create designs—<br/>we create <span className="text-[#839958]">meaningful</span> impact.
            </h2>
          </div>

          <div className="quote-side flex items-center gap-8 w-full md:w-2/5 md:border-l-2 border-gray-100 md:pl-10 relative">
            <p className="text-[#4a4a52] font-medium text-lg leading-relaxed">Every idea deserves to become an experience that people remember and trust.</p>
          </div>

        </div>
        
        {/* Decorative stars */}
        <div className="absolute top-12 right-[10%] text-[#D57B03] opacity-30 text-2xl">✦</div>
        <div className="absolute bottom-12 left-[10%] text-[#839958] opacity-30 text-3xl">✦</div>

        {/* Peeking Mascot */}
        <div className="absolute bottom-0 right-[10%] lg:right-[15%] z-20 w-32 translate-y-[1px]">
          <img src="/alien/Masot.png" alt="Mascot peeking" className="w-full drop-shadow-2xl" />
        </div>
      </section>

      {/* Future Section */}
      <section className="future-section relative bg-[#1B1B2A] overflow-hidden border-t border-[#2D2D42]">
        <div className="stars-bg absolute inset-0 opacity-40 mix-blend-screen"></div>
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-stretch relative">
            
            <div className="future-visual w-full md:w-1/2 min-h-[350px] md:min-h-[450px] relative overflow-hidden bg-gradient-to-br from-[#1B1B2A] to-[#2D2D42]">
               <div className="portal">
                 <div className="portal-glow"></div>
                 <div className="portal-stairs">
                   <div className="stair s1"></div>
                   <div className="stair s2"></div>
                   <div className="stair s3"></div>
                   <div className="stair s4"></div>
                   <div className="stair s5"></div>
                 </div>
                 
                 {/* Teleporting Alien */}
                 <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-[200px]">
                   <img src="/alien/processed/alien-teleport.webp" alt="Teleporting Alien" className="w-full drop-shadow-[0_0_20px_rgba(195,180,227,0.6)]" />
                 </div>
               </div>
            </div>

            <div className="future-text w-full md:w-1/2 p-12 lg:p-24 relative z-10 text-white flex flex-col justify-center">
               <h2 className="text-[3.5rem] font-bold mb-6 leading-tight tracking-tight">The <span className="text-[#839958]">Future</span><br/>is being built.</h2>
               <p className="text-gray-300 text-xl mb-10 max-w-md leading-relaxed">We're building a next-gen creative platform to empower creators and brands to build, collaborate and grow without limits.</p>
               <Link to="/future-platform" className="btn-outline self-start">
                 Explore the Future
                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
               </Link>
            </div>
            
            <div className="absolute top-16 right-16 text-yellow-100 opacity-60 text-xl">✦</div>
            <div className="absolute bottom-16 right-[40%] text-blue-100 opacity-40 text-sm">✦</div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta py-24 bg-white relative z-0">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative">
          <div className="bg-[#FCFAF7] rounded-[40px] p-12 lg:p-20 flex flex-col md:flex-row items-center justify-between relative shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-[#F0ECE1]">
            
            <h2 className="text-[3.5rem] font-bold text-[#2D3748] mb-8 md:mb-0 leading-[1.05] tracking-tight relative z-10">
              Have an <span className="text-[#839958]">idea</span><br/>worth building?
            </h2>

            <div className="text-center md:text-left z-10 md:mr-32">
              <p className="text-[#4a4a52] mb-8 font-medium text-xl leading-relaxed">Let's create something<br/>meaningful together.</p>
              <Link to="/contact" className="btn-primary shadow-lg">
                Book a Discovery Call
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>
              </Link>
            </div>
            
            <div className="absolute right-0 bottom-0 w-[400px] translate-x-12 translate-y-8 z-0 hidden lg:block overflow-visible">
               <img src="/alien/Masot.png" alt="Mascot Thumbs up" className="w-full drop-shadow-2xl" />
            </div>
            
            <div className="absolute top-12 right-20 text-[#D57B03] text-xl">✦</div>
            <div className="absolute bottom-20 left-1/2 text-[#839958] text-2xl">✦</div>
          </div>
        </div>
      </section>
    </main>
  );
}
