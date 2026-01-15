import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { ProfileContent } from "@/components/dashboard/profile-content";

type Props = {
  params: Promise<{ username: string }>;
};

export default function PublicProfilePage({ params }: Props) {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-zinc-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-zinc-300" />
          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Loading Tree...</p>
        </div>
      </div>
    }>
      <ProfileContent paramsPromise={params} />
    </Suspense>
  );
}