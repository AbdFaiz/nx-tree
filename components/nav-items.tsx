// components/nav-items.tsx
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export async function NavItems() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const navItems = user
    ? [
        { title: "Dashboard", href: "/dashboard" },
        { title: "My Links", href: "/links" },
        { title: "Settings", href: "/settings" },
      ]
    : [
        { title: "Home", href: "#hero" },
        { title: "Features", href: "#features" },
        { title: "Reviews", href: "#reviews" },
      ];

  return (
    <nav className="hidden md:flex gap-6">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
