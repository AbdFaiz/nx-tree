"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Hero() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleClaim = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) return;
    router.push(`/auth/sign-up?username=${encodeURIComponent(username)}`);
  };

  return (
    <div className="flex flex-col gap-16 items-center py-20">
      <div className="flex flex-col gap-4 items-center">
        <h1 className="text-5xl font-bold tracking-tight">Everything you are in one simple link.</h1>
        <p className="text-muted-foreground text-lg">Claim your unique username and start building your page.</p>
        
        <form onSubmit={handleClaim} className="flex w-full max-w-sm items-center space-x-2 mt-4">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">linktree.clone/</span>
            <Input 
              className="pl-28" 
              placeholder="username" 
              value={username}
              onChange={(e) => setUsername(e.target.value.toLowerCase())} 
            />
          </div>
          <Button type="submit">Claim</Button>
        </form>
      </div>
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
    </div>
  );
}