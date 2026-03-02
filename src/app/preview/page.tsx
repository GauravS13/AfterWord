import Link from "next/link";

export default function PreviewPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col items-center justify-center text-center p-6">
      <div className="size-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
        <span className="material-symbols-outlined text-[32px]">visibility</span>
      </div>
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Vault Preview</h1>
      <p className="text-slate-500 dark:text-slate-400 max-w-md mb-8">
        This feature is actively being developed. Soon, you will be able to preview exactly what your selected executors will see when unlocking your vault.
      </p>
      <Link href="/dashboard" className="px-6 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-colors">
        Return to Dashboard
      </Link>
    </div>
  );
}
