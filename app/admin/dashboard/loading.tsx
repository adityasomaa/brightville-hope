export default function DashboardLoading() {
  return (
    <div className="mx-auto w-full max-w-[1400px] px-5 py-8 md:px-10" aria-busy>
      <div className="flex items-center justify-between">
        <div className="h-9 w-56 animate-pulse rounded-xl bg-ink/10" />
        <div className="h-9 w-28 animate-pulse rounded-full bg-ink/10" />
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="flex flex-col gap-6">
          <div className="h-48 animate-pulse rounded-3xl bg-ink/5" />
          <div className="h-72 animate-pulse rounded-3xl bg-ink/5" />
        </div>
        <div className="flex flex-col gap-6">
          <div className="h-44 animate-pulse rounded-3xl bg-ink/5" />
          <div className="h-64 animate-pulse rounded-3xl bg-ink/5" />
          <div className="h-40 animate-pulse rounded-3xl bg-ink/5" />
        </div>
      </div>
    </div>
  );
}
