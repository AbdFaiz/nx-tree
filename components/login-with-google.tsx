"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "./ui/button";
import { GoogleLogo } from "./google-logo";

export default function LoginWithGoogle() {
  const supabase = createClient();

  const login = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `http://localhost:3000/auth/callback`,
      },
    });
  };

  return (
    <Button className="w-full" variant={"outline"} onClick={login}>
      <GoogleLogo /> Login with Google
    </Button>
  );
}
