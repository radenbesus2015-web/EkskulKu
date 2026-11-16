export default function MemuatDetailEkskul() {
  return (
    <div className="space-y-6">
      {/* Tautan kembali */}
      <div className="h-4 w-36 rounded bg-slate-200 animate-pulse" />

      {/* Kerangka kartu info utama ekskul */}
      <article className="space-y-3 rounded-xl border bg-white p-6 shadow-sm">
        <div className="h-5 w-20 rounded bg-slate-200 animate-pulse" />
        <div className="h-9 w-1/2 rounded bg-slate-200 animate-pulse" />
        <div className="h-4 w-1/3 rounded bg-slate-200 animate-pulse" />
        <div className="h-4 w-1/4 rounded bg-slate-200 animate-pulse" />
      </article>

      {/* Kerangka formulir pendaftaran */}
      <div className="space-y-4 rounded-xl border bg-white p-6 shadow-sm">
        <div className="h-6 w-40 rounded bg-slate-200 animate-pulse" />
        <div className="h-10 w-full rounded-lg bg-slate-200 animate-pulse" />
        <div className="h-10 w-full rounded-lg bg-slate-200 animate-pulse" />
        <div className="h-10 w-full rounded-lg bg-slate-200 animate-pulse" />
      </div>

      {/* Kerangka daftar anggota */}
      <div className="space-y-3 rounded-xl border bg-white p-6 shadow-sm">
        <div className="flex justify-between">
          <div className="h-5 w-36 rounded bg-slate-200 animate-pulse" />
          <div className="h-5 w-24 rounded bg-slate-200 animate-pulse" />
        </div>
        <div className="h-12 w-full rounded bg-slate-100 animate-pulse" />
        <div className="h-12 w-full rounded bg-slate-100 animate-pulse" />
      </div>
    </div>
  );
}
