import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";
import { Suspense } from "react";
import { Layers } from "lucide-react";

const Nav = () => {
  return (
    <nav className="w-full sticky top-0 z-50 flex justify-center border-b bg-background/80 backdrop-blur-md">
      <div className="w-full max-w-6xl flex justify-between items-center h-16 px-6">
        <div className="flex gap-2 items-center">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Layers className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-bold tracking-tighter text-xl">Nx Tree</span>
        </div>
        
        <div className="flex gap-3 items-center">
          <ThemeSwitcher />
          <div className="h-6 w-[1px] bg-border mx-2" />
           <Suspense>
            <AuthButton />
          </Suspense>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
