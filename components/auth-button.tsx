// components/auth-button.tsx
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogoutButton } from "./logout-button";
import { LayoutDashboard, LogOut, Settings } from "lucide-react";

export async function AuthButton() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return (
      <Button asChild size="sm" className="rounded-full px-6 shadow-lg shadow-primary/20">
        <Link href="/auth/login">Get Started</Link>
      </Button>
    );
  }

  const avatarUrl = user.user_metadata?.avatar_url;
  const name = user.user_metadata?.full_name ?? "User";
  const email = user.email;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-10 w-10 rounded-full p-0 border-2 border-transparent hover:border-primary/30 transition-all">
          <Avatar className="h-9 w-9 shadow-sm">
            <AvatarImage src={avatarUrl} alt={name} />
            <AvatarFallback className="bg-primary text-primary-foreground font-bold">
              {name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64 mt-2" align="end" sideOffset={8}>
        <DropdownMenuLabel className="flex flex-col gap-1 p-4">
          <p className="text-sm font-bold leading-none">{name}</p>
          <p className="text-xs font-medium text-muted-foreground truncate">{email}</p>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator />
        
        <div className="p-1">
          <DropdownMenuItem asChild className="rounded-lg cursor-pointer py-2.5">
            <Link href="/dashboard">
              <LayoutDashboard className="mr-3 h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Dashboard</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild className="rounded-lg cursor-pointer py-2.5">
            <Link href="/dashboard/settings">
              <Settings className="mr-3 h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Settings</span>
            </Link>
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator />

        <div className="p-1">
          <DropdownMenuItem className="rounded-lg cursor-pointer py-2.5 text-destructive focus:bg-destructive focus:text-destructive-foreground">
            <LogOut className="mr-3 h-4 w-4" />
            <LogoutButton />
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}