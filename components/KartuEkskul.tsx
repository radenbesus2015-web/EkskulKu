import Link from "next/link";
import { JAM_SESI, type Ekskul } from "@/data/ekskul";

type Props = {
  ekskul: Ekskul;
  jumlahPendaftar: number;
};

export default function KartuEkskul({ ekskul, jumlahPendaftar }: Props) {
  const sisa = ekskul.kuota - jumlahPendaftar;
  const isPenuh = sisa <= 0;

  return (
    <div className="flex flex-col justify-between rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-md">
      <div>
        <div className="flex items-center justify-between">
          <span className="rounded bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
            {ekskul.kategori}
          </span>
          {isPenuh ? (
            <span className="rounded bg-red-100 px-2 py-0.5 text-xs font-bold text-red-600">
              Penuh
            </span>
          ) : (
            <span className="text-xs text-slate-500">
              Sisa {sisa} dari {ekskul.kuota} tempat
            </span>
          )}
        </div>

        <h2 className="mt-3 text-lg font-bold text-slate-900">{ekskul.nama}</h2>
        <p className="mt-1 text-sm text-slate-600">
          {ekskul.hari} · Sesi {ekskul.sesi} ({JAM_SESI[ekskul.sesi]})
        </p>
        <p className="mt-1 text-xs text-slate-500">Pembina: {ekskul.pembina}</p>
      </div>

      <div className="mt-5 pt-3 border-t">
        <Link
          href={`/ekskul/${ekskul.id}`}
          className="inline-block w-full rounded-lg bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white transition hover:bg-blue-700"
        >
          Lihat detail
        </Link>
      </div>
    </div>
  );
}

