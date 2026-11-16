import { ambilAnggota } from "@/data/ambil";
import { cookies } from "next/headers";
import { Suspense } from "react";

type Props = {
  ekskulId: number;
  kuota: number;
};

async function DaftarAnggotaInternal({ ekskulId, kuota }: Props) {
  const anggota = await ambilAnggota(ekskulId);
  const cookieStore = await cookies();
  const namaDiCookie = cookieStore.get("nama")?.value?.trim().toLowerCase();

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-800">Anggota terdaftar</h2>
        <span className="text-sm font-medium text-slate-600">
          {anggota.length} dari {kuota} tempat terisi
        </span>
      </div>

      {anggota.length === 0 ? (
        <p className="rounded-lg bg-slate-50 p-4 text-center text-sm text-slate-500">
          Belum ada anggota.
        </p>
      ) : (
        <ul className="divide-y divide-slate-100 rounded-lg border bg-white">
          {anggota.map((a) => {
            const isKamu = namaDiCookie && a.nama.trim().toLowerCase() === namaDiCookie;
            return (
              <li
                key={a.nomor}
                className="flex items-center justify-between px-4 py-3 text-sm"
              >
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-800">{a.nama}</span>
                  <span className="text-slate-400">·</span>
                  <span className="text-slate-600">{a.kelas}</span>
                  {isKamu && (
                    <span className="rounded bg-blue-100 px-2 py-0.5 text-xs font-bold text-blue-700">
                      Kamu
                    </span>
                  )}
                </div>
                <span className="text-xs text-slate-400">#{a.nomor}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default function AnggotaEkskul({ ekskulId, kuota }: Props) {
  return (
    <Suspense
      fallback={
        <div className="py-6 text-center text-sm font-medium text-slate-500 animate-pulse">
          Memuat anggota...
        </div>
      }
    >
      <DaftarAnggotaInternal ekskulId={ekskulId} kuota={kuota} />
    </Suspense>
  );
}
