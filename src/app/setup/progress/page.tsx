"use client";

import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { api } from "../../../../convex/_generated/api";

export default function SetupProgressPage() {
  const router = useRouter();
  const progress = useQuery(api.owners.getOnboardingProgress);

  useEffect(() => {
    if (progress?.redirectUrl) {
      router.replace(progress.redirectUrl);
    }
  }, [progress, router]);

  return (
    <div className="min-h-screen bg-background-dark flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-400 text-sm font-medium">Resuming your progress…</p>
      </div>
    </div>
  );
}
