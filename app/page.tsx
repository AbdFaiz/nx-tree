import CTA from "@/components/landing/cta";
import Features from "@/components/landing/features";
import { Hero } from "@/components/landing/hero";
import Reviews from "@/components/landing/reviews";
import Nav from "@/components/nav";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-100">
      <Nav />
      <div className="flex flex-col items-center w-full">
        {/* Kontainer utama dibuat lebih lebar untuk elemen dekoratif */}
        <div className="w-full max-w-7xl mx-auto px-6">
          <Hero />
          <Features />
          <Reviews />
          <CTA />
        </div>
      </div>
    </main>
  );
}