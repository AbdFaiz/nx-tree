import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const CTA = () => {
  return (
    <section id="cta" className="px-4 lg:px-8 py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Kontainer Utama dengan Gradient & Border */}
        <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-16 sm:px-16 sm:py-20 shadow-2xl">
          {/* Efek Dekoratif Background */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-64 w-64 rounded-full bg-black/20 blur-3xl" />

          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 mb-6 text-sm font-medium text-primary-foreground backdrop-blur-md border border-white/20">
              <Sparkles className="h-4 w-4" />
              <span>Ready to transform your workflow?</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-6">
              Stop Wrestling with Monorepos. <br className="hidden md:block" />
              Start Visualizing with Nx Tree.
            </h2>

            <p className="text-lg text-primary-foreground/80 max-w-xl mx-auto mb-10 leading-relaxed">
              Join 10,000+ developers today. Get a clear bird&apos;s-eye view of
              your entire architecture in seconds.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="h-14 px-8 text-lg font-bold shadow-xl hover:scale-105 transition-transform"
              >
                <Link href="/dashboard" className="flex items-center gap-2">
                  Get Started for Free <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>

            <p className="mt-8 text-sm text-primary-foreground/60 italic">
              No credit card required. Cancel anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
