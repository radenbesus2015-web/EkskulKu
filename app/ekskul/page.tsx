import type { Metadata } from "next";
import { ambilSemuaEkskul } from "@/data/ambil";
import { pendaftar, DAFTAR_KATEGORI, DAFTAR_HARI } from "@/data/ekskul";
import KartuEkskul from "@/components/KartuEkskul";
import FormulirSaringan from "@/components/FormulirSaringan";

export const metadata: Metadata = {
  title: "Daftar Ekskul",
};

type Props = {
  searchParams: Promise<{
    kategori?: string;
    hari?: string;
    sisa?: string;
  }>;
};

export default async function HalamanEkskul({ searchParams }: Props) {
  const { kategori, hari, sisa } = await searchParams;

  const semuaEkskul = await ambilSemuaEkskul();

  // Validasi nilai dari URL agar nilai aneh tidak menyebabkan galat
  const kategoriValid =
    kategori && DAFTAR_KATEGORI.includes(kategori as (typeof DAFTAR_KATEGORI)[number])
      ? kategori
      : undefined;

  const hariValid =
    hari && DAFTAR_HARI.includes(hari) ? hari : undefined;

  const filterHanyaAdaSisa = sisa === "1";

  // Saringan bekerja bersamaan di sisi server
  const hasilSaring = semuaEkskul.filter((item) => {
    const cocokKategori = kategoriValid ? item.kategori === kategoriValid : true;
    const cocokHari = hariValid ? item.hari === hariValid : true;

    let cocokSisa = true;
    if (filterHanyaAdaSisa) {
      const terisi = pendaftar.filter((p) => p.ekskulId === item.id).length;
      cocokSisa = item.kuota - terisi > 0;
    }

    return cocokKategori && cocokHari && cocokSisa;
  });

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold text-slate-800">Daftar Ekskul</h1>

      <FormulirSaringan
        kategoriTerpilih={kategoriValid ?? "Semua kategori"}
        hariTerpilih={hariValid ?? "Semua hari"}
        sisaTerpilih={filterHanyaAdaSisa}
      />

      <p className="mb-4 text-sm font-medium text-slate-600">
        {hasilSaring.length} ekskul ditemukan
      </p>

      {hasilSaring.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <p className="text-slate-600">Tidak ada ekskul yang cocok.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {hasilSaring.map((item) => {
            const jumlahPendaftar = pendaftar.filter((p) => p.ekskulId === item.id).length;
            return (
              <KartuEkskul
                key={item.id}
                ekskul={item}
                jumlahPendaftar={jumlahPendaftar}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
