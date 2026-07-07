import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Hero() {
  const { scrollY } = useScroll();
  // Parallax background and text effects
  const bgY = useTransform(scrollY, [0, 500], [0, 150]);
  const textY = useTransform(scrollY, [0, 500], [0, -50]);

  return (
    <section className="relative h-screen w-full overflow-hidden flex flex-col justify-between p-6 md:p-12">
      {/* Background Cinematic Motion */}
      <motion.div 
        style={{ y: bgY }}
        animate={{ scale: [1.05, 1] }}
        transition={{ duration: 2.5, ease: "easeOut" }}
        className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/40 via-neutral-950/20 to-neutral-950" />
      </motion.div>

      {/* Top Bar Navigation */}
      <div className="relative z-10 flex justify-between items-center w-full">
        <span className="text-xl font-bold tracking-[0.3em] text-amber-400 uppercase">AURA • STAY</span>
        <a 
          href="tel:+1234567890" 
          className="px-6 py-2 border border-white/20 rounded-full backdrop-blur-md text-sm tracking-wider hover:bg-white hover:text-black transition-all duration-500"
        >
          BOOK DIRECT
        </a>
      </div>

      {/* Core Hero Content */}
      <motion.div style={{ y: textY }} className="relative z-10 max-w-4xl my-auto">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-amber-400 font-medium tracking-[0.25em] uppercase text-xs md:text-sm mb-4"
        >
          A Luxury Sanctuary Awaits
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-5xl md:text-8xl font-light tracking-tight leading-none mb-8"
        >
          Where Nature Meets <br />
          <span className="font-serif italic text-amber-200">Refined Elegance</span>
        </motion.h1>
      </motion.div>

      {/* Immediate Premium Contact Info Hook */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-white/10 text-sm tracking-wide text-neutral-400"
      >
        <div>
          <p className="text-neutral-500 text-xs uppercase tracking-widest mb-1">Inquiries</p>
          <a href="mailto:stay@aurahaven.com" className="hover:text-amber-400 transition-colors duration-300 text-base">stay@aurahaven.com</a>
        </div>
        <div>
          <p className="text-neutral-500 text-xs uppercase tracking-widest mb-1">Direct Line</p>
          <a href="tel:+1234567890" className="hover:text-amber-400 transition-colors duration-300 text-base">+1 (234) 567-890</a>
        </div>
        <div className="flex items-center md:justify-end">
          <p className="text-amber-400/80 italic">↓ Scroll to explore the estate</p>
        </div>
      </motion.div>
    </section>
  );
}