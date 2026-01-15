import { Suspense } from "react";
import { ProfileEditor } from "@/components/dashboard/profile-editor";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Loader2, ArrowLeft } from "lucide-react";
import Header from "@/components/header";
import Link from "next/link";

async function SettingsContent() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return <ProfileEditor profile={profile} />;
}

export default function SettingsPage() {
  return (
    <>
      <Header isFixed />
      <div className="min-h-screen bg-[#FAFAFA] py-16 px-6 lg:px-10">
        <div className="max-w-2xl mx-auto space-y-12">
          {/* Navigation & Header */}
          <header className="space-y-6">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-zinc-900 transition-colors group"
            >
              <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />{" "}
              Back to Workspace
            </Link>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="h-4 w-[2px] bg-zinc-900 rounded-full" />
                <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
                  Settings
                </h1>
              </div>
              <p className="text-sm text-zinc-500 font-medium">
                Manage your public identity and profile aesthetics.
              </p>
            </div>
          </header>

          <Suspense
            fallback={
              <div className="flex flex-col items-center py-20 gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-zinc-300" />
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  Loading Configuration...
                </p>
              </div>
            }
          >
            <SettingsContent />
          </Suspense>
        </div>
      </div>
    </>
  );
}
