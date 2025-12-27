"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

const IMAGES = [
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop", // Abstract Minimal 1
  "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=1000&auto=format&fit=crop", // Abstract Minimal 2
  "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1000&auto=format&fit=crop", // Abstract Minimal 3
];

export function Featured() {
  const [index, setIndex] = useState(0);
  const [username, setUsername] = useState("");

  // Auto-swipe setiap 5 detik
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextStep = () => setIndex((prev) => (prev + 1) % IMAGES.length);
  const prevStep = () => setIndex((prev) => (prev - 1 + IMAGES.length) % IMAGES.length);

  return (
    <section className="relative w-full min-h-screen flex flex-col lg:flex-row overflow-hidden bg-background">
      
      {/* LEFT COLUMN: PHOTO SWIPE */}
      <div className="relative w-full lg:w-1/2 h-[400px] lg:h-screen bg-muted overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={index}
            src={IMAGES[index]}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full object-cover"
            alt="Showcase"
          />
        </AnimatePresence>

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />

        {/* Navigation Buttons */}
        <div className="absolute bottom-10 left-10 flex gap-3 z-20">
          <button 
            onClick={prevStep}
            className="p-3 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={nextStep}
            className="p-3 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Slide Indicator */}
        <div className="absolute bottom-12 right-10 flex gap-2 z-20">
          {IMAGES.map((_, i) => (
            <div 
              key={i}
              className={`h-1 transition-all duration-500 rounded-full ${i === index ? "w-8 bg-white" : "w-2 bg-white/40"}`}
            />
          ))}
        </div>
      </div>

      {/* RIGHT COLUMN: TEXT CONTENT */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-md w-full space-y-10"
        >
          {/* Brand Tag */}
          <div className="flex items-center gap-2 text-primary font-medium tracking-[0.2em] text-[10px] uppercase">
            <Sparkles className="w-4 h-4" />
            Nx Tree Premium
          </div>

          {/* Heading */}
          <div className="space-y-6">
            <h1 className="text-5xl lg:text-6xl font-bold tracking-tighter leading-none text-foreground">
              Estetika dalam <br /> 
              <span className="text-muted-foreground font-serif italic font-normal">Kesederhanaan.</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Tampilkan siapa Anda melalui satu link yang dikurasi dengan indah. Tanpa gangguan, hanya esensi.
            </p>
          </div>

          {/* Claim Box */}
          <div className="space-y-4">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/0 rounded-2xl blur opacity-25 group-focus-within:opacity-100 transition duration-1000" />
              <div className="relative flex items-center p-1 bg-background border rounded-xl overflow-hidden shadow-sm">
                <span className="pl-4 text-muted-foreground/50 font-medium">nxtree.me/</span>
                <input 
                  type="text"
                  placeholder="username"
                  className="flex-1 px-1 py-3 bg-transparent outline-none text-base"
                  value={username}
                  onChange={(e) => setUsername(e.target.value.toLowerCase())}
                />
                <Button size="lg" className="rounded-lg px-6 shadow-none">
                  Claim
                </Button>
              </div>
            </div>
            <p className="text-[11px] text-muted-foreground px-1 uppercase tracking-widest font-medium">
              Dapatkan akses eksklusif sekarang — Gratis.
            </p>
          </div>

          {/* Minimal Stats/Features */}
          <div className="pt-10 border-t flex gap-12">
            <div>
              <p className="text-2xl font-bold">120k+</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Creators</p>
            </div>
            <div>
              <p className="text-2xl font-bold">99.9%</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Uptime</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}