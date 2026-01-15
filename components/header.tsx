import { AuthButton } from "@/components/auth-button";
import { NavItems } from "@/components/nav-items";    
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Suspense } from "react";

const Header = ({ isFixed = false }: { isFixed?: boolean }) => {
  return (
    <header
      className={cn(
        "bg-background/80 backdrop-blur-md border-b border-border transition-all",
        isFixed && "sticky top-0 z-50"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <Link href="/" className="font-bold tracking-tighter text-xl">
            Nx Tree
          </Link>
        </div>

          <Suspense
            fallback={
              <div className="hidden md:flex gap-6">
                <div className="h-4 w-20 bg-muted animate-pulse rounded" />
                <div className="h-4 w-20 bg-muted animate-pulse rounded" />
              </div>
            }
          >
            <NavItems />
          </Suspense>

        <div className="flex gap-4 items-center">
          <Suspense
            fallback={
              <div className="h-9 w-20 bg-muted animate-pulse rounded-md" />
            }
          >
            <AuthButton />
          </Suspense>
        </div>
      </div>
    </header>
  );
};

export default Header;
