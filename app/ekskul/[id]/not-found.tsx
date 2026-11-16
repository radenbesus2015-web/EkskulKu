import Link from "next/link";

export default function EkskulTidakDitemukan() {
  return (
    <div className="py-16 text-center">
      <h1 className="text-2xl font-bold text-slate-800">Ekskul tidak ditemukan</h1>
      <p className="mt-2 text-slate-600">
        Ekskul yang kamu cari tidak ada atau alamat salah.
      </p>
      <Link
        href="/ekskul"
        className="mt-4 inline-block font-medium text-blue-600 hover:underline"
      >
        Kembali ke daftar ekskul
      </Link>
    </div>
  );
}

