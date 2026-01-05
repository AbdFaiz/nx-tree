import { AuthButton } from "@/components/auth-button";
// import { ThemeSwitcher } from "@/components/theme-switcher";
import Link from "next/link";
import { Suspense } from "react";

const items = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Features",
    href: "#features",
  },
  {
    title: "Reviews",
    href: "#reviews",
  },
]

const Nav = () => {
  return (
    <nav className="w-full sticky top-0 z-50 flex justify-center border-b bg-background/80 backdrop-blur-md">
      <div className="w-full max-w-6xl flex justify-between items-center h-16 px-6">
        <div className="flex gap-2 items-center">
          <Link href="/" className="font-bold tracking-tighter text-xl hover:underline">Nx Tree</Link>
        </div>
        
        <div className="flex gap-4 items-center">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-md font-medium text-primary hover:underline"
            >
              {item.title}
            </Link>
          ))}
          {/* <ThemeSwitcher /> */}
          {/* <div className="h-6 w-[1px] bg-border mx-2" /> */}
           <Suspense>
            <AuthButton />
          </Suspense>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
