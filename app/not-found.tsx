import Link from "next/link";

export default function NotFoundGlobal() {
  return (
    <div className="py-20 text-center">
      <h1 className="text-6xl font-extrabold text-slate-800">404</h1>
      <h2 className="mt-3 text-xl font-semibold text-slate-700">
        Halaman tidak ditemukan
      </h2>
      <p className="mt-2 text-slate-500">
        Maaf, halaman yang kamu tuju tidak ada atau alamat URL salah.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}

