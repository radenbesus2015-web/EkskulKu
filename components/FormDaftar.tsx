"use client";

import { useActionState } from "react";
import { daftarEkskul, type HasilDaftar } from "@/app/actions";

type Props = {
  ekskulId: number;
  namaAwal: string;
  kelasAwal: string;
};

export default function FormDaftar({ ekskulId, namaAwal, kelasAwal }: Props) {
  const initialState: HasilDaftar = {
    berhasil: false,
    pesan: "",
    galat: {},
    isian: { nama: namaAwal, kelas: kelasAwal },
  };

  const [hasil, formAction, isPending] = useActionState(daftarEkskul, initialState);

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-slate-800">Daftar ekskul ini</h2>

      {hasil.berhasil && (
        <div className="mt-4 rounded-lg bg-green-50 p-4 border border-green-200">
          <p className="text-sm font-semibold text-green-700">{hasil.pesan}</p>
        </div>
      )}

      <form action={formAction} className="mt-4 space-y-4">
        <input type="hidden" name="ekskulId" value={ekskulId} />

        {/* Galat Nama */}
        <div>
          <label htmlFor="input-nama" className="block text-xs font-semibold text-slate-700">
            Nama Lengkap
          </label>
          <input
            id="input-nama"
            name="nama"
            type="text"
            defaultValue={hasil.isian.nama}
            placeholder="Masukkan nama..."
            className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 focus:border-blue-500 focus:outline-none"
          />
          {hasil.galat.nama && (
            <p className="mt-1 text-xs font-medium text-red-600">{hasil.galat.nama}</p>
          )}
        </div>

        {/* Galat Kelas */}
        <div>
          <label htmlFor="input-kelas" className="block text-xs font-semibold text-slate-700">
            Kelas
          </label>
          <input
            id="input-kelas"
            name="kelas"
            type="text"
            defaultValue={hasil.isian.kelas}
            placeholder="Contoh: XI RPL 1..."
            className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 focus:border-blue-500 focus:outline-none"
          />
          {hasil.galat.kelas && (
            <p className="mt-1 text-xs font-medium text-red-600">{hasil.galat.kelas}</p>
          )}
        </div>

        {/* Galat Aturan Lainnya (satu pesan di atas tombol) */}
        {hasil.galat.umum && (
          <div className="rounded-lg bg-red-50 p-3 border border-red-200">
            <p className="text-sm font-medium text-red-700">{hasil.galat.umum}</p>
          </div>
        )}

        {/* Tombol dengan status Memproses... */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
        >
          {isPending ? "Memproses..." : "Daftar Sekarang"}
        </button>
      </form>
    </div>
  );
}

