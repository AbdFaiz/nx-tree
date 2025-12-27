"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Layout,
  Share2,
  Zap,
  CircleCheck,
  CircleDot,
} from "lucide-react";
import Herofeatured from "./hero-featured";
import Link from "next/link";

export function Hero() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const mockupLinks = [
    {
      id: 1,
      label: "Nxtree - Instagram",
      url: "https://instagram.com/4o4nf_",
    },
    {
      id: 2,
      label: "Nxtree - Tiktok",
      url: "https://tiktok.com/",
    },
    {
      id: 3,
      label: "Nxtree - Youtube",
      url: "https://youtube.com/",
    },
  ];

  const handleClaim = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) return;
    router.push(`/auth/sign-up?username=${encodeURIComponent(username)}`);
  };

  return (
    <section className="relative min-h-[90vh] w-full flex items-center overflow-hidden bg-background px-6 lg:px-12">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -z-10 w-[50%] h-full bg-gradient-to-l from-primary/5 to-transparent opacity-50" />

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* LEFT COLUMN: CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col space-y-8 z-10"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center w-fit gap-2 px-3 py-1 rounded-full border border-border bg-secondary/30 text-muted-foreground text-[10px] uppercase tracking-widest font-semibold"
          >
            <CircleDot className="w-3 h-3 text-primary animate-pulse" />
            Nx Tree Engine
          </motion.div>

          {/* Heading */}
          <div className="space-y-4">
            <h1 className="text-6xl md:text-7xl font-bold tracking-tight leading-[1.05] text-foreground">
              One link. <br />
              <span className="text-muted-foreground/40 text-3xl md:text-4xl italic font-serif">
                Endless Possibilities.
              </span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-lg leading-relaxed">
              A minimalist platform for your digital presence.
              Create a professional link-in-bio and portfolio in seconds.
            </p>
          </div>

          {/* Form */}
          <div className="w-full max-w-md">
            <form
              onSubmit={handleClaim}
              className="group relative flex items-center p-1.5 rounded-2xl border bg-card shadow-2xl shadow-primary/5 transition-all focus-within:border-primary/50"
            >
              <div className="flex-1 flex items-center px-4">
                <span className="text-muted-foreground/50 font-medium select-none">
                  nxtree.me/
                </span>
                <input
                  className="bg-transparent border-none outline-none focus:ring-0 w-full ml-1 text-base font-medium placeholder:text-muted-foreground/30"
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value.toLowerCase())}
                />
              </div>
              <Button
                size="lg"
                className="rounded-xl px-6 bg-foreground text-background transition-all"
              >
                Claim <ArrowRight className="w-4 h-4" />
              </Button>
            </form>
            <div className="mt-4 flex items-center gap-4 px-2">
              <span className="flex items-center gap-1 text-[11px] text-muted-foreground/70 uppercase tracking-wider font-medium">
                <CircleCheck className="w-3 h-3 text-primary" /> Free
              </span>
              <span className="flex items-center gap-1 text-[11px] text-muted-foreground/70 uppercase tracking-wider font-medium">
                <CircleCheck className="w-3 h-3 text-primary" /> Easy Setup
              </span>
              <span className="flex items-center gap-1 text-[11px] text-muted-foreground/70 uppercase tracking-wider font-medium">
                <CircleCheck className="w-3 h-3 text-primary" /> Instant Access
              </span>
            </div>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: VISUAL ELEMENT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="relative hidden lg:flex justify-center items-center"
        >
          {/* Abstract Glass Card Preview */}
          <div className="relative w-[380px] h-[500px] rounded-[3rem] border border-white/20 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-2xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] flex flex-col p-8 overflow-hidden">
            {/* Mock Content */}
            <div className="w-20 h-20 rounded-2xl bg-primary/20 mb-6 self-center animate-pulse" />
            <div className="space-y-3 mb-10">
              <div className="h-4 w-3/4 bg-foreground/10 rounded-full mx-auto" />
              <div className="h-3 w-1/2 bg-foreground/5 rounded-full mx-auto" />
            </div>
            <div className="space-y-4">
              {mockupLinks.map((link) => (
                <motion.div
                  key={link.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + link.id * 0.1 }}
                  className="w-full h-12 rounded-xl border border-white/10 bg-white/5 flex items-center px-4 text-xs font-medium text-foreground/60"
                >
                  <Link target="_blank" href={link.url}>
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Decorative Circles */}
          <div className="absolute -z-20 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px]" />
        </motion.div>
      </div>

      {/* Subtle Footer Feature Bar */}
      <div className="absolute bottom-8 left-0 w-full px-6 lg:px-12">
        <div className="flex flex-wrap gap-8 transition-opacity duration-500">
          <Herofeatured icon={<Zap />} text="Ultra Fast" />
          <Herofeatured icon={<Layout />} text="Clean Design" />
          <Herofeatured icon={<Share2 />} text="Social Ready" />
        </div>
      </div>
    </section>
  );
}
