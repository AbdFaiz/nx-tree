/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getSocialIcon } from "@/components/icons/social-icons";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

// Fungsi helper kontras
function getContrastColor(hexColor: string) {
  if (!hexColor || hexColor === "transparent") return "black";
  const hex = hexColor.replace("#", "");
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "black" : "white";
}

interface ProfileContentProps {
  paramsPromise?: Promise<{ username: string }>;
  initialData?: { profile: any; links: any[] };
  isPreview?: boolean;
}

export async function ProfileContent({
  paramsPromise,
  initialData,
  isPreview = false,
}: ProfileContentProps) {
  let profile, links;

  if (initialData) {
    // Mode Preview: Ambil dari props
    profile = initialData.profile;
    links = initialData.links;
  } else if (paramsPromise) {
    // Mode Public Page: Ambil dari DB
    const { username } = await paramsPromise;
    const supabase = await createClient();
    const { data: p } = await supabase.from("profiles").select("*").eq("username", username).single();
    if (!p) return notFound();
    const { data: l } = await supabase.from("links").select("*").eq("user_id", p.id).order("display_order", { ascending: true });
    profile = p;
    links = l || [];
  } else {
    return null;
  }

  const themeColor = profile.theme_color || "#ffffff";
  const textColor = getContrastColor(themeColor);

  const socialTop = links?.filter((l: any) => l.is_social && l.social_position === "top") || [];
  const socialBottom = links?.filter((l: any) => l.is_social && l.social_position === "bottom") || [];
  const regularLinks = links?.filter((l: any) => !l.is_social) || [];

  return (
     <div 
      className={cn(
        "flex flex-col items-center px-6 py-20 relative overflow-hidden transition-all",
        isPreview ? "min-h-full" : "min-h-screen"
      )}
      style={{ backgroundColor: themeColor, color: textColor }}
    >
      {/* 1. DECORATIVE BLOBS (Biar ga sepi) */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[30%] rounded-full blur-[120px] opacity-20 bg-current" />
      <div className="absolute bottom-[-5%] right-[-5%] w-[30%] h-[25%] rounded-full blur-[100px] opacity-10 bg-current" />

      {/* 2. TEXTURE OVERLAY */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.04] mix-blend-overlay" 
           style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/stardust.png")` }} />

      <div 
      className={cn("w-full flex flex-col items-center z-10 px-6", isPreview ? "max-w-full" : "max-w-[440px]")}>
        
        {/* HEADER SECTION */}
        <header className="flex flex-col items-center mb-10 w-full text-center">

          <div className="relative mb-8">
            <Avatar className="h-24 w-24 rounded-[2.5rem] border-2 border-current/10 shadow-2xl relative z-10">
              <AvatarImage src={profile.avatar_url} className="object-cover" />
              <AvatarFallback className="font-black">{profile.username?.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            {/* Element hiasan belakang avatar */}
            <div className="absolute -inset-2 border-2 border-dashed border-current/10 rounded-[3rem] animate-[spin_20s_linear_infinite]" />
          </div>
          
          <div className="space-y-2">
            <h1 className={cn("font-black tracking-tighter uppercase italic leading-none", isPreview ? "text-xl" : "text-4xl")}>
              {profile.full_name}
            </h1>
            <p className="text-xs font-bold tracking-[0.3em] uppercase opacity-40">@{profile.username}</p>
          </div>

          {profile.bio && (
            <p 
            className={cn("mt-6 font-medium leading-relaxed opacity-70", isPreview ? "text-[11px]" : "text-sm")}>
              {profile.bio}
            </p>
          )}
        </header>

        {/* SOCIAL TOP */}
        {socialTop.length > 0 && (
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {socialTop.map((link) => (
              <a 
                key={link.id} 
                href={isPreview ? "#" : link.url}
                target="_blank" 
                className="opacity-50 hover:opacity-100 transition-opacity active:opacity-30"
              >
                {getSocialIcon(link.url)}
              </a>
            ))}
          </div>
        )}

        {/* MAIN LINKS */}
        <div className="grid gap-4 w-full mb-16">
          {(isPreview ? regularLinks.slice(0, 1) : regularLinks).map((link) => (
            <a
              key={link.id}
              href={isPreview ? "#" : link.url}
              target="_blank"
              className={cn("group relative flex items-center rounded-[2.2rem] border-2 border-current/10 bg-current/[0.03] hover:bg-current/10 hover:border-current/20 transition-all duration-500 active:scale-[0.98]", isPreview ? "p-2 justify-center" : "p-6 justify-between")}
            >
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-current opacity-20 group-hover:opacity-100 transition-opacity" />
                <span className={cn("font-black uppercase tracking-widest italic", isPreview ? "text-[9px]" : "text-sm")}>
                  {link.title}
                </span>
              </div>
              {!isPreview && (

              <div className="h-10 w-10 flex items-center justify-center rounded-2xl bg-current transition-all duration-500 group-hover:rounded-full group-hover:rotate-45"
                   style={{ color: themeColor, backgroundColor: textColor }}>
                <ArrowUpRight className="w-5 h-5" />
              </div>
              )}
            </a>
          ))}
        </div>

        {/* SOCIAL BOTTOM */}
        {socialBottom.length > 0 && (
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            {socialBottom.map((link) => (
              <a key={link.id} 
                href={isPreview ? "#" : link.url}
                target="_blank" 
                className="p-3 rounded-2xl border border-current/5 bg-current/[0.02] hover:bg-current/[0.05] transition-all"
              >
                {getSocialIcon(link.url)}
              </a>
            ))}
          </div>
        )}

         {!isPreview && (
          <footer className="flex flex-col items-center gap-4 text-center">
            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-current/[0.05] border border-current/5">
              <ShieldCheck className="w-4 h-4 opacity-40" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Verified by NxTree Protocol</span>
            </div>
            
            <div className="flex flex-col gap-1 py-4">
              <p className="text-[9px] font-black uppercase tracking-[0.5em] opacity-20">EST. 2026 — ALL RIGHTS RESERVED</p>
            </div>
          </footer>
         )}
      </div>
    </div>
  );
}