import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, PlayCircle } from "lucide-react";

export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden px-4 py-20 lg:px-8 lg:py-32">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-10">
          <div className="space-y-6">
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-tight">
              One Link, <br />
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Infinite Possibilities
              </span>
            </h1>

            <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Nx Tree is the ultimate solution for managing your Nx monorepo. 
              Explore dependencies and visualize your architecture with one click.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button asChild size="lg" className="py- px-8 text-md font-semibold shadow-lg shadow-primary/20 hover:border hover:border-primary hover:text-primary hover:bg-transparent">
              <Link href="/dashboard" className="flex items-center gap-2">
                Get Started For Free <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="py- px-8 text-md font-semibold transition-all border-primary hover:bg-primary hover:text-primary-foreground">
              <Link href="/demo" className="flex items-center gap-2">
                <PlayCircle className="w-4 h-4" /> See How It Works
              </Link>
            </Button>
          </div>

          {/* Social Proof / Partners */}
          <div className="pt-20">
            <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground/60 mb-8">
              Trusted by
            </p>
            <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 grayscale opacity-50 contrast-125">
              <span className="text-2xl font-bold tracking-widest opacity-60 hover:opacity-100">CREATOR</span>
              <span className="text-2xl font-bold tracking-widest opacity-60 hover:opacity-100">BUSINESS</span>
              <span className="text-2xl font-bold tracking-widest opacity-60 hover:opacity-100">INFLUENCER</span>
              <span className="text-2xl font-bold tracking-widest opacity-60 hover:opacity-100">ARTIST</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}