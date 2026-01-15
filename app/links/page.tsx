import { Suspense } from "react";
import Header from "@/components/header";
import { LinkEditor } from "@/components/dashboard/link-editor";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Loader2 } from "lucide-react";

async function LinksContent() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) redirect("/auth/login");

  return <LinkEditor userId={user.id} />;
}

export default function LinksPage() {
  return (
    <div className="min-h-screen bg-zinc-50/50">
      <Header isFixed />
      <main className="max-w-3xl mx-auto px-6 py-12 md:py-20">
        <div className="space-y-12">
          <div className="space-y-2 text-center md:text-left">
            <h1 className="text-5xl font-black tracking-tighter">My Links</h1>
            <p className="text-muted-foreground font-medium text-lg">
              Manage your tree and social connections.
            </p>
          </div>

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
            {/* Pindah logika auth ke dalam sini */}
            <LinksContent />
          </Suspense>
        </div>
      </main>
    </div>
  );
}