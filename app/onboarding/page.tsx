// app/onboarding/page.tsx
import { Suspense } from "react";
import { OnboardingContent } from "../../components/dashboard/onboarding-content";
import { Loader2 } from "lucide-react";

export default function OnboardingPage() {
  return (
    <main className="min-h-screen relative flex items-center justify-center bg-background overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative w-full max-w-[440px] px-6">
        <Suspense fallback={
          <div className="flex flex-col items-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-primary/20" />
          </div>
        }>
          <OnboardingContent />
        </Suspense>
      </div>
    </main>
  );
}