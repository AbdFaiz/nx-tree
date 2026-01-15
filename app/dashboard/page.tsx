import { Suspense } from "react";
import DashboardContent from "../../components/dashboard/dashboard-content";
import { Loader2 } from "lucide-react";
import Header from "@/components/header";

export default function DashboardPage() {
  return (
    <>
    <Header />
      <main className="min-h-screen bg-zinc-50/50 dark:bg-zinc-950">
        <Suspense fallback={
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Loading Dashboard</p>
          </div>
        }>
          <DashboardContent />
        </Suspense>
      </main>
    </>
  );
}