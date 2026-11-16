"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { DAFTAR_KATEGORI, DAFTAR_HARI } from "@/data/ekskul";

type Props = {
  kategoriTerpilih: string;
  hariTerpilih: string;
};

export default function FormulirSaringan({
  kategoriTerpilih,
  hariTerpilih,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function perbaruiURL(namaParam: string, nilai: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (!nilai || nilai === "Semua kategori" || nilai === "Semua hari") {
      params.delete(namaParam);
    } else {
      params.set(namaParam, nilai);
    }
    const query = params.toString();
    router.push(query ? `/ekskul?${query}` : "/ekskul");
  }

  return (
    <div className="mb-6 flex flex-wrap items-center gap-4 rounded-xl border bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-1">
        <label htmlFor="filter-kategori" className="text-xs font-semibold text-slate-600">
          Kategori
        </label>
        <select
          id="filter-kategori"
          value={kategoriTerpilih}
          onChange={(e) => perbaruiURL("kategori", e.target.value)}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
        >
          <option value="Semua kategori">Semua kategori</option>
          {DAFTAR_KATEGORI.map((kat) => (
            <option key={kat} value={kat}>
              {kat}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="filter-hari" className="text-xs font-semibold text-slate-600">
          Hari
        </label>
        <select
          id="filter-hari"
          value={hariTerpilih}
          onChange={(e) => perbaruiURL("hari", e.target.value)}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
        >
          <option value="Semua hari">Semua hari</option>
          {DAFTAR_HARI.map((hari) => (
            <option key={hari} value={hari}>
              {hari}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

