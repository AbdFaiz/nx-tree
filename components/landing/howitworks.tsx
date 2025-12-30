"use client";
import { motion } from "framer-motion";
import { MousePointer2, Link2, Share2 } from "lucide-react";

const STEPS = [
  {
    title: "Claim your link",
    desc: "Pilih username unik yang mencerminkan brand atau jati diri Anda.",
    icon: <Link2 className="w-6 h-6" />,
  },
  {
    title: "Add your socials",
    desc: "Hubungkan Instagram, TikTok, YouTube, hingga toko online Anda.",
    icon: <MousePointer2 className="w-6 h-6" />,
  },
  {
    title: "Share everywhere",
    desc: "Pasang link nxtree.me Anda di bio dan jangkau audiens lebih luas.",
    icon: <Share2 className="w-6 h-6" />,
  },
];

export function HowItWorks() {
  return (
    <section className="py-32">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Tampil Profesional dalam 3 Langkah</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">Tanpa ribet, tanpa coding. Fokus pada konten Anda, biarkan kami urus tampilannya.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STEPS.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative p-8 rounded-3xl border bg-card/50 hover:bg-muted-foreground/15 hover:shadow-xl hover:shadow-primary/5 transition-all group"
            >
              <div className="text-5xl font-black text-primary/5 absolute top-6 right-8 group-hover:text-primary/10 transition-colors">
                0{i + 1}
              </div>
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}