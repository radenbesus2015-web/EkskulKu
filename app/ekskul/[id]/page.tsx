import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ambilEkskul } from "@/data/ambil";
import { ekskul, JAM_SESI } from "@/data/ekskul";
import Link from "next/link";
import AnggotaEkskul from "@/components/AnggotaEkskul";
import FormDaftar from "@/components/FormDaftar";
import { cookies } from "next/headers";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const item = ekskul.find((e) => e.id === Number(id));

  if (!item) {
    return {
      title: "Ekskul tidak ditemukan",
    };
  }

  return {
    title: item.nama,
  };
}

export default async function DetailEkskul({ params }: Props) {
  const { id } = await params;
  const ekskulId = Number(id);

  if (isNaN(ekskulId)) {
    notFound();
  }

  const item = await ambilEkskul(ekskulId);
  if (!item) {
    notFound();
  }

  const cookieStore = await cookies();
  const namaAwal = cookieStore.get("nama")?.value ?? "";
  const kelasAwal = cookieStore.get("kelas")?.value ?? "";

  return (
    <div className="space-y-6">
      <Link href="/ekskul" className="text-sm font-medium text-blue-600 hover:underline">
        ← Kembali ke Daftar Ekskul
      </Link>

      {/* Informasi Ekskul */}
      <article className="rounded-xl border bg-white p-6 shadow-sm">
        <span className="rounded bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
          {item.kategori}
        </span>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">{item.nama}</h1>
        <p className="mt-2 text-slate-600">
          Jadwal: <span className="font-semibold text-slate-800">{item.hari}</span> · Sesi{" "}
          {item.sesi} ({JAM_SESI[item.sesi]})
        </p>
        <p className="mt-1 text-slate-600">
          Pembina: <span className="font-semibold text-slate-800">{item.pembina}</span>
        </p>
      </article>

      {/* Formulir Pendaftaran */}
      <FormDaftar
        ekskulId={item.id}
        namaAwal={namaAwal}
        kelasAwal={kelasAwal}
      />

      {/* Anggota terdaftar dibungkus Suspense */}
      <section className="rounded-xl border bg-white p-6 shadow-sm">
        <Suspense
          fallback={
            <div className="py-6 text-center text-sm font-medium text-slate-500 animate-pulse">
              Memuat anggota...
            </div>
          }
        >
          <AnggotaEkskul ekskulId={item.id} kuota={item.kuota} />
        </Suspense>
      </section>
    </div>
  );
}
