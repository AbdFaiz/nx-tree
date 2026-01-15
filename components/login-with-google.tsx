"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "./ui/button";
import { GoogleLogo } from "./google-logo";

export default function LoginWithGoogle() {
  const supabase = createClient();

  const login = async () => {
    const origin = window.location.origin;
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${origin}/auth/callback?next=/dashboard`,
      },
    });
  };

  return (
    <Button className="w-full" variant={"outline"} onClick={login}>
      <GoogleLogo /> Login with Google
    </Button>
  );
}
