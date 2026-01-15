import Link from "next/link";
import { Github, Twitter, Youtube, ArrowUpRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative mt-20 border-t border-border/40 bg-zinc-50 dark:bg-zinc-950/50">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Brand Box */}
          <div className="md:col-span-4 space-y-6">
            <div className="flex items-center gap-2">
              {/* <div className="h-8 w-8 rounded-md bg-foreground flex items-center justify-center">
                <span className="text-background font-bold text-[10px]">NX</span>
              </div> */}
              <span className="text-xl font-bold tracking-tighter">NX TREE</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Making monorepo management beautiful. Visualize, analyze, and optimize your Nx workspace with ease.
            </p>
            <div className="flex gap-4">
              {[Github, Twitter, Youtube].map((Icon, i) => (
                <Link key={i} href="#" className="p-2 rounded-full border border-primary bg-background hover:bg-primary hover:text-primary-foreground transition-all">
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-foreground/50">Resources</h4>
              <ul className="space-y-3">
                {['Documentation', 'API Reference', 'Examples', 'Blog'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-sm font-medium flex items-center group">
                      {item} <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-foreground/50">Product</h4>
              <ul className="space-y-3 font-medium">
                {['Pricing', 'Visualizer', 'Integrations', 'Changelog'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">{item}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-foreground/50">Stay Updated</h4>
              <p className="text-xs text-muted-foreground">Subscribe to our technical newsletter.</p>
              <form className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="w-full h-9 rounded-md border border-border bg-background px-3 text-xs focus:ring-1 focus:ring-primary outline-none"
                />
                <button className="h-9 px-3 rounded-md bg-foreground text-background text-xs font-bold hover:bg-foreground/80 transition-colors">
                  Join
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-border/20 flex justify-center items-center gap-6">
            <p className="text-sm text-muted-foreground">© 2026 Nx Tree Inc.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;