import { Featured } from "@/components/featured";
import { Hero } from "@/components/hero";
import Nav from "@/components/nav";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Nav />
      <div className="flex flex-col items-center w-full">
        {/* Kontainer utama dibuat lebih lebar untuk elemen dekoratif */}
        <div className="w-full max-w-7xl mx-auto px-6">
          <Hero />
          <Featured />
        </div>
      </div>
    </main>
  );
}