import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { ekskul, pendaftar, JAM_SESI } from "@/data/ekskul";
import TombolBatalkan from "@/components/TombolBatalkan";

export const metadata: Metadata = {
  title: "Ekskul Saya",
};

export default async function HalamanEkskulSaya() {
  const cookieStore = await cookies();
  const namaCookie = cookieStore.get("nama")?.value?.trim();
  const kelasCookie = cookieStore.get("kelas")?.value?.trim();

  // 1. Tanpa cookie
  if (!namaCookie || !kelasCookie) {
    return (
      <div className="py-12 text-center">
        <h1 className="text-2xl font-bold text-slate-800">Ekskul Saya</h1>
        <p className="mt-3 text-slate-600">Kamu belum mendaftar apa pun.</p>
        <Link
          href="/ekskul"
          className="mt-5 inline-block rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Lihat Daftar Ekskul
        </Link>
      </div>
    );
  }

  // 2. Dengan cookie: Cari ekskul yang diikuti murid ini
  const namaLower = namaCookie.toLowerCase();
  const kelasLower = kelasCookie.toLowerCase();

  const pendaftaranMurid = pendaftar.filter(
    (p) =>
      p.nama.trim().toLowerCase() === namaLower &&
      p.kelas.trim().toLowerCase() === kelasLower
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1 border-b pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Ekskul Saya</h1>
          <p className="mt-1 text-sm font-medium text-slate-600">
            {namaCookie} · {kelasCookie} · {pendaftaranMurid.length} ekskul diikuti
          </p>
        </div>
        <Link
          href="/ekskul"
          className="text-sm font-semibold text-blue-600 hover:underline"
        >
          + Daftar ekskul lain
        </Link>
      </div>

      {/* 3. Cookie ada tetapi belum ada pendaftaran */}
      {pendaftaranMurid.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">
          <p className="text-slate-600">Belum ada ekskul yang diikuti.</p>
          <Link
            href="/ekskul"
            className="mt-4 inline-block text-sm font-semibold text-blue-600 hover:underline"
          >
            Pilih ekskul sekarang →
          </Link>
        </div>
      ) : (
        <div className="divide-y rounded-xl border bg-white shadow-sm">
          {pendaftaranMurid.map((p) => {
            const dataEkskul = ekskul.find((e) => e.id === p.ekskulId);
            if (!dataEkskul) return null;

            return (
              <div
                key={p.nomor}
                className="flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center"
              >
                <div>
                  <span className="rounded bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">
                    {dataEkskul.kategori}
                  </span>
                  <h2 className="mt-1 text-lg font-bold">
                    <Link
                      href={`/ekskul/${dataEkskul.id}`}
                      className="text-slate-900 hover:text-blue-600 hover:underline"
                    >
                      {dataEkskul.nama}
                    </Link>
                  </h2>
                  <p className="mt-1 text-sm text-slate-600">
                    {dataEkskul.hari}, sesi {dataEkskul.sesi} ({JAM_SESI[dataEkskul.sesi]})
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500">
                    Pembina: {dataEkskul.pembina} · Nomor Pendaftaran: #{p.nomor}
                  </p>
                </div>

                <div>
                  <TombolBatalkan nomor={p.nomor} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
