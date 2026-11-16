import Link from "next/link";
import { ekskul, JAM_SESI } from "@/data/ekskul";

export default function Home() {
  const unggulan = ekskul.slice(0, 3);

  return (
    <div>
      <section className="py-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Daftar Ekstrakurikuler di Sekolahmu
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Pilih minat dan bakatmu, pantau kuota, dan daftar langsung secara online tanpa formulir kertas.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Link
            href="/ekskul"
            className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
          >
            Lihat Semua Ekskul
          </Link>
          <Link
            href="/saya"
            className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Ekskul Saya
          </Link>
        </div>
      </section>

      <section className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-800">Ekskul Pilihan</h2>
          <Link href="/ekskul" className="text-sm font-medium text-blue-600 hover:underline">
            Lihat semua →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {unggulan.map((item) => (
            <Link
              key={item.id}
              href={`/ekskul/${item.id}`}
              className="block rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <span className="rounded bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
                {item.kategori}
              </span>
              <h3 className="mt-2 text-lg font-bold text-slate-800">{item.nama}</h3>
              <p className="mt-1 text-sm text-slate-600">
                {item.hari} · Sesi {item.sesi} ({JAM_SESI[item.sesi]})
              </p>
              <p className="mt-1 text-xs text-slate-500">Pembina: {item.pembina}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
