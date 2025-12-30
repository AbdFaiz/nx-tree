import { FAQ } from "@/components/landing/faq";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/howitworks";
import { Preview } from "@/components/landing/preview";
import Nav from "@/components/nav";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Nav />
      <div className="flex flex-col items-center w-full">
        {/* Kontainer utama dibuat lebih lebar untuk elemen dekoratif */}
        <div className="w-full max-w-7xl mx-auto px-6">
          <Hero />
          <HowItWorks />
          <Preview />
          <FAQ />
        </div>
      </div>
    </main>
  );
}