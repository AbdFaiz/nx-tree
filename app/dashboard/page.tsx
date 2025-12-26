// app/dashboard/page.tsx
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Cek apakah profil sudah ada
  const { data: profile } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", user.id)
    .single();

  // Jika profil belum dibuat, lempar ke halaman onboarding
  if (!profile) {
    redirect("/onboarding");
  }

  return (
    <div>
      <h1>Selamat Datang, {profile.username}!</h1>
    </div>
  );
}