// app/onboarding/onboarding-content.tsx
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import OnboardingForm from "@/components/onboarding-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export async function OnboardingContent() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("username, avatar_url, full_name")
    .eq("id", user.id)
    .single();

  if (profile?.username) redirect("/dashboard");

  const name = profile?.full_name || user.email?.split('@')[0] || "User";
  const initialAvatar = profile?.avatar_url || `https://ui-avatars.com/api/?name=${name}&background=0D0D0D&color=fff`;

  return (
    <div className="flex flex-col items-center">
      {/* Visual Avatar Preview */}
      <div className="mb-8 relative">
        <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
        <Avatar className="h-24 w-24 border-4 border-background shadow-2xl relative">
          <AvatarImage src={initialAvatar} />
          <AvatarFallback>{name.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
      </div>

      <div className="text-center space-y-3 mb-10">
        <h2 className="text-4xl font-black tracking-tighter text-foreground sm:text-5xl">
          Pick your handle.
        </h2>
        <p className="text-muted-foreground text-base max-w-[280px] mx-auto leading-relaxed">
          Choose a username for your new <span className="text-foreground font-semibold">Nx Tree</span> profile.
        </p>
      </div>

      <div className="w-full">
        <OnboardingForm userId={user.id} initialAvatar={initialAvatar} />
      </div>
    </div>
  );
}