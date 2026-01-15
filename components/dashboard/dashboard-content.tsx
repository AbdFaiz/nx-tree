import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LayoutGrid, Settings, Check, ArrowUpRight, User, Fingerprint } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ProfileContent } from "./profile-content";

export default async function DashboardContent() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  // Fetch profile and links data
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single();
  const { data: linksData } = await supabase.from("links").select("*").eq("user_id", user.id).order("display_order");

  if (!profile?.username) redirect("/onboarding");

  // Safety fallback for links
  const links = linksData || [];

  return (
    <div className="max-w-[1400px] mx-auto py-12 px-6 lg:px-12 bg-[#FAFAFA] min-h-screen">
      
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
          <div className="h-[2px] w-4 bg-zinc-200" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400">User Command Center</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
            Welcome, <span className="text-zinc-500 font-normal">{profile.full_name?.split(' ')[0]}</span>
          </h1>
        </div>

        <div className="flex items-center gap-3 p-1.5 bg-white border border-zinc-200/60 rounded-full shadow-sm">
          <div className="px-4 py-1.5">
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-tight">Public URL</p>
            <p className="text-xs font-semibold text-zinc-900">nxtree.vercel.app/{profile.username}</p>
          </div>
          <Button asChild size="sm" className="rounded-full bg-zinc-900 hover:bg-zinc-800 text-white h-9">
            <Link href={`/${profile.username}`} target="_blank">
              <ArrowUpRight className="w-4 h-4 mr-1.5" /> Visit
            </Link>
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Navigation Actions */}
        <div className="lg:col-span-7 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Link href="/links" className="group relative p-8 rounded-[2.5rem] border border-zinc-200 bg-white hover:border-zinc-400 transition-all duration-300 overflow-hidden md:col-span-2">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <LayoutGrid className="w-32 h-32 rotate-12" />
              </div>
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 text-white flex items-center justify-center mb-6">
                  <LayoutGrid className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900 mb-1">Editor Links</h3>
                <p className="text-sm text-zinc-500">Add, reorder, and customize your link tree.</p>
              </div>
            </Link>

            <Link href="/settings" className="group p-8 rounded-[2.5rem] border border-zinc-200 bg-white hover:border-zinc-400 transition-all">
              <div className="w-10 h-10 rounded-xl bg-zinc-100 text-zinc-600 flex items-center justify-center mb-6 group-hover:bg-zinc-900 group-hover:text-white transition-colors">
                <Settings className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-zinc-900 mb-1">Appearance</h4>
              <p className="text-xs text-zinc-500 italic">Themes & Colors</p>
            </Link>

            <Link href="/settings#profile" className="group p-8 rounded-[2.5rem] border border-zinc-200 bg-white hover:border-zinc-400 transition-all">
              <div className="w-10 h-10 rounded-xl bg-zinc-100 text-zinc-600 flex items-center justify-center mb-6 group-hover:bg-zinc-900 group-hover:text-white transition-colors">
                <User className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-zinc-900 mb-1">Identity</h4>
              <p className="text-xs text-zinc-500 italic">Bio & Socials</p>
            </Link>
          </div>

          {/* Profile Onboarding Status */}
          <div className="p-10 rounded-[2.5rem] border border-zinc-200 bg-white space-y-8">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h4 className="text-sm font-bold uppercase tracking-widest text-zinc-900">Profile Readiness</h4>
                <div className="h-[2px] w-8 bg-zinc-200" />
              </div>
              <Fingerprint className="text-zinc-200 w-8 h-8" />
            </div>

            <div className="grid gap-4">
               <CheckItem label="Username Claimed" checked={!!profile.username} />
               <CheckItem label="Profile Identity Complete" checked={!!profile.bio} />
               <CheckItem label="Content Successfully Published" checked={links.length > 0} />
            </div>
          </div>
        </div>

        {/* Live Mobile Preview */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="sticky top-12 w-full max-w-[340px]">
             <div className="relative p-2.5 rounded-[4rem] border border-zinc-200 bg-zinc-900 shadow-xl shadow-zinc-200/50">
                <div className="rounded-[3.2rem] overflow-hidden aspect-[9/18.5] bg-zinc-900 border border-zinc-800 relative shadow-inner">
                  
                  <ProfileContent 
                    initialData={{ profile, links }} 
                    isPreview={true} 
                  />

                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-zinc-900 rounded-2xl z-20 border-x border-b border-white/5" />
                </div>
             </div>
             
             <div className="flex items-center justify-center gap-2 mt-6">
                <div className="h-[1px] w-4 bg-zinc-400" />
                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400">Live Feedback</p>
                <div className="h-[1px] w-4 bg-zinc-400" />
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function CheckItem({ label, checked }: { label: string; checked: boolean }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-2xl border border-zinc-50 bg-zinc-50/50">
      <div className="flex items-center gap-3">
        <div className={cn(
          "w-5 h-5 rounded-lg flex items-center justify-center border transition-all duration-500",
          checked ? "bg-emerald-500 border-emerald-500 text-white shadow-sm shadow-emerald-200" : "bg-white border-zinc-200"
        )}>
          {checked && <Check className="w-3 h-3" strokeWidth={4} />}
        </div>
        <span className={cn("text-xs font-semibold tracking-tight transition-colors", checked ? "text-zinc-900" : "text-zinc-400")}>
          {label}
        </span>
      </div>
      <div className={cn("h-1 w-1 rounded-full", checked ? "bg-emerald-500" : "bg-zinc-200")} />
    </div>
  );
}