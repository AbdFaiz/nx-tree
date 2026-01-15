"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Loader2, AtSign, XCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";

export default function OnboardingForm({ userId, initialAvatar }: { userId: string, initialAvatar: string }) {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState("");
  const [isTaken, setIsTaken] = useState(false);
  
  const router = useRouter();
  const supabase = createClient();
  const debouncedUsername = useDebounce(username, 500);

  const isValid = /^[a-zA-Z0-9_]{3,20}$/.test(username);

  // Fungsi cek username ke DB
  const checkUsername = useCallback(async (name: string) => {
    if (name.length < 3) return;
    
    setIsChecking(true);
    setError("");
    
    const { data, error: fetchError } = await supabase
      .from("profiles")
      .select("username")
      .eq("username", name.toLowerCase())
      .maybeSingle();

    if (fetchError) {
      console.error(fetchError);
    } else if (data) {
      setIsTaken(true);
      setError("This handle is already taken.");
    } else {
      setIsTaken(false);
      setError("");
    }
    setIsChecking(false);
  }, [supabase]);

  // Efek untuk menjalankan cek saat debounced value berubah
  useEffect(() => {
    if (debouncedUsername && isValid) {
      checkUsername(debouncedUsername);
    } else {
      setIsTaken(false);
      if (username && !isValid) setError(""); 
    }
  }, [debouncedUsername, isValid, checkUsername, username]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || isTaken) return;
    setLoading(true);

    const { error: updateError } = await supabase
      .from("profiles")
      .update({ 
        username: username.toLowerCase(),
        avatar_url: initialAvatar 
      })
      .eq("id", userId);

    if (updateError) {
      setError(updateError.code === "23505" ? "This handle is already taken." : "An error occurred.");
      setLoading(false);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
      <div className="flex flex-col gap-3">
        <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground ml-1">
          Reserve your handle
        </label>

        <div className="flex flex-col sm:flex-row items-stretch gap-2">
          <div className="relative flex-1 group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
              {isChecking ? (
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
              ) : (
                <AtSign className={cn(
                  "h-5 w-5 transition-colors duration-300",
                  isValid && !isTaken ? "text-emerald-500" : isTaken ? "text-red-500" : "group-focus-within:text-primary"
                )} />
              )}
            </div>
            
            <Input
              type="text"
              required
              autoFocus
              placeholder="username"
              className={cn(
                "h-14 pl-12 bg-background border-2 text-lg font-semibold transition-all duration-300",
                isValid && !isTaken ? "border-emerald-500/50 ring-4 ring-emerald-500/5" : "focus:border-primary",
                (error || isTaken) && "border-red-500 focus:ring-red-500/10"
              )}
              value={username}
              onChange={(e) => {
                setUsername(e.target.value.toLowerCase().replace(/\s/g, ""));
                setError(""); // Reset error saat mulai ngetik lagi
              }}
            />
          </div>

          <Button 
            type="submit" 
            size="lg"
            className={cn(
                "h-14 px-8 font-bold shadow-lg transition-all active:scale-95 disabled:opacity-50",
                isValid && !isTaken ? "bg-primary shadow-primary/20" : "bg-zinc-800"
            )}
            disabled={loading || !isValid || isTaken || isChecking}
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Claim"}
          </Button>
        </div>

        {/* Message Area */}
        <div className="min-h-[24px] px-1">
          {isChecking ? (
            <p className="text-sm font-medium text-muted-foreground animate-pulse">Checking availability...</p>
          ) : error ? (
            <p className="text-sm font-semibold text-red-500 flex items-center gap-1.5">
               <XCircle className="h-4 w-4" /> {error}
            </p>
          ) : username && !isValid ? (
            <p className="text-sm font-medium text-amber-500">
              3-20 characters (a-z, 0-9, _)
            </p>
          ) : isValid && !isTaken ? (
            <p className="text-sm font-bold text-emerald-600 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" /> 
              nxtree.io/{username} is available
            </p>
          ) : null}
        </div>
      </div>
    </form>
  );
}