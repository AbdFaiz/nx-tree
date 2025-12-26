import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "./logout-button";

export async function AuthButton() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="flex gap-2">
        <Button asChild size="sm" variant="outline">
          <Link href="/auth/login">Sign in</Link>
        </Button>
        <Button asChild size="sm" variant="default">
          <Link href="/auth/sign-up">Sign up</Link>
        </Button>
      </div>
    );
  }

  const avatarUrl = user.user_metadata?.avatar_url;
  const name = user.user_metadata?.full_name ?? user.email;

  return (
    <div className="flex items-center gap-3">
      {avatarUrl && (
        <Image
          src={avatarUrl}
          alt={name}
          width={32}
          height={32}
          className="rounded-full"
        />
      )}

      <span className="text-sm">{name}</span>
      <LogoutButton />
    </div>
  );
}
