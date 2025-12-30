import * as motion from "motion/react-client";
import { GripVertical, Palette, Type, MousePointer } from "lucide-react";

export function Preview() {
  return (
    <section className="py-24 overflow-hidden">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest">
            Editor Canvas
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            Kontrol penuh di <br /> ujung jari Anda.
          </h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div>
                <h4 className="font-bold">Drag & Drop Builder</h4>
                <p className="text-muted-foreground">Atur ulang urutan link Anda dengan mudah hanya dengan menggesernya.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div>
                <h4 className="font-bold">Customizable Themes</h4>
                <p className="text-muted-foreground">Ganti warna, font, dan bentuk tombol sesuai dengan estetika brand Anda.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mockup Dashboard */}
        <div className="relative">
          <div className="bg-background rounded-2xl border shadow-2xl p-4 md:p-8">
            <div className="flex items-center justify-between mb-8 border-b pb-4">
              <span className="font-bold text-sm">Editor Halaman</span>
              <div className="flex gap-2">
                 <div className="w-3 h-3 rounded-full bg-red-400" />
                 <div className="w-3 h-3 rounded-full bg-yellow-400" />
                 <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}