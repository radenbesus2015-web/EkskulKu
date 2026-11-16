"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import {
  ekskul,
  pendaftar,
  tambahPendaftar,
  JAM_SESI,
  type Ekskul,
} from "@/data/ekskul";

export type HasilDaftar = {
  berhasil: boolean;
  pesan: string;
  galat: {
    nama?: string;
    kelas?: string;
    umum?: string;
  };
  isian: {
    nama: string;
    kelas: string;
  };
};

export async function daftarEkskul(
  _sebelum: HasilDaftar,
  formData: FormData
): Promise<HasilDaftar> {
  const ekskulId = Number(formData.get("ekskulId"));
  const nama = String(formData.get("nama") ?? "").trim();
  const kelas = String(formData.get("kelas") ?? "").trim();
  const isian = { nama, kelas };

  // Simulasi proses server agar tulisan "Memproses..." terlihat
  await new Promise((r) => setTimeout(r, 600));

  const targetEkskul = ekskul.find((e) => e.id === ekskulId);

  // Validasi ID ekskul yang tidak ada (misal diubah lewat DevTools)
  if (!targetEkskul) {
    return {
      berhasil: false,
      pesan: "Ekskul tidak valid atau tidak ditemukan.",
      galat: { umum: "Ekskul tidak valid atau tidak ditemukan." },
      isian,
    };
  }

  // 1. Validasi nama minimal 3 huruf, kelas minimal 3 karakter (galat per kolom)
  const galatKolom: { nama?: string; kelas?: string } = {};
  if (nama.length < 3) {
    galatKolom.nama = "Nama minimal 3 huruf.";
  }
  if (kelas.length < 3) {
    galatKolom.kelas = "Kelas minimal 3 karakter.";
  }

  if (galatKolom.nama || galatKolom.kelas) {
    return {
      berhasil: false,
      pesan: "Periksa kembali isian formulir.",
      galat: galatKolom,
      isian,
    };
  }

  const namaLower = nama.toLowerCase();
  const kelasLower = kelas.toLowerCase();

  // 2. Validasi sudah terdaftar di ekskul itu (huruf besar/kecil tidak dibedakan)
  const sudahAdaDiEkskul = pendaftar.some(
    (p) =>
      p.ekskulId === targetEkskul.id &&
      p.nama.toLowerCase() === namaLower &&
      p.kelas.toLowerCase() === kelasLower
  );

  if (sudahAdaDiEkskul) {
    const pesanGalat = `${nama} (${kelas}) sudah terdaftar di ${targetEkskul.nama}.`;
    return {
      berhasil: false,
      pesan: pesanGalat,
      galat: { umum: pesanGalat },
      isian,
    };
  }

  // Bonus 2: Maksimal mengikuti 2 ekskul, ekskul ketiga ditolak
  const totalEkskulDiikuti = pendaftar.filter(
    (p) =>
      p.nama.toLowerCase() === namaLower &&
      p.kelas.toLowerCase() === kelasLower
  ).length;

  if (totalEkskulDiikuti >= 2) {
    const pesanGalat = `Kamu sudah mengikuti 2 ekskul. Maksimal hanya boleh mengikuti 2 ekstrakurikuler.`;
    return {
      berhasil: false,
      pesan: pesanGalat,
      galat: { umum: pesanGalat },
      isian,
    };
  }

  // 3. Validasi kuota penuh
  const jumlahAnggota = pendaftar.filter((p) => p.ekskulId === targetEkskul.id).length;
  if (jumlahAnggota >= targetEkskul.kuota) {
    const pesanGalat = `Kuota ${targetEkskul.nama} sudah penuh (${targetEkskul.kuota} orang).`;
    return {
      berhasil: false,
      pesan: pesanGalat,
      galat: { umum: pesanGalat },
      isian,
    };
  }

  // 4. Validasi bentrok: murid itu sudah mengikuti ekskul lain pada hari dan sesi yang sama
  const ekskulLainMurid = pendaftar
    .filter(
      (p) =>
        p.nama.toLowerCase() === namaLower &&
        p.kelas.toLowerCase() === kelasLower &&
        p.ekskulId !== targetEkskul.id
    )
    .map((p) => ekskul.find((e) => e.id === p.ekskulId))
    .filter((e): e is Ekskul => Boolean(e));

  const ekskulBentrok = ekskulLainMurid.find(
    (e) => e.hari === targetEkskul.hari && e.sesi === targetEkskul.sesi
  );

  if (ekskulBentrok) {
    const pesanGalat = `Jadwal bentrok dengan ${ekskulBentrok.nama} (${ekskulBentrok.hari}, sesi ${ekskulBentrok.sesi}).`;
    return {
      berhasil: false,
      pesan: pesanGalat,
      galat: { umum: pesanGalat },
      isian,
    };
  }

  // Simpan pendaftar baru
  const nomorBaru = tambahPendaftar({
    ekskulId: targetEkskul.id,
    nama,
    kelas,
  });

  // Simpan nama & kelas di cookie agar terisi otomatis saat membuka ekskul lain
  const cookieStore = await cookies();
  cookieStore.set("nama", nama, { path: "/", maxAge: 60 * 60 * 24 * 7 });
  cookieStore.set("kelas", kelas, { path: "/", maxAge: 60 * 60 * 24 * 7 });

  // Revalidate cache agar daftar anggota dan sisa tempat langsung berubah tanpa F5
  revalidatePath(`/ekskul/${targetEkskul.id}`);
  revalidatePath("/ekskul");
  revalidatePath("/saya");

  const jamStr = JAM_SESI[targetEkskul.sesi] ? ` (${JAM_SESI[targetEkskul.sesi]})` : "";
  const pesanBerhasil = `Pendaftaran #${nomorBaru} berhasil: ${targetEkskul.nama}, ${targetEkskul.hari}, sesi ${targetEkskul.sesi}${jamStr}.`;

  return {
    berhasil: true,
    pesan: pesanBerhasil,
    galat: {},
    isian,
  };
}

export async function batalkanPendaftaran(formData: FormData) {
  const nomor = Number(formData.get("nomor"));
  if (isNaN(nomor)) return;

  const cookieStore = await cookies();
  const namaCookie = cookieStore.get("nama")?.value?.trim().toLowerCase();
  const kelasCookie = cookieStore.get("kelas")?.value?.trim().toLowerCase();

  if (!namaCookie || !kelasCookie) {
    return;
  }

  // Cari indeks pendaftaran yang cocok
  const index = pendaftar.findIndex(
    (p) =>
      p.nomor === nomor &&
      p.nama.trim().toLowerCase() === namaCookie &&
      p.kelas.trim().toLowerCase() === kelasCookie
  );

  if (index !== -1) {
    const itemDihapus = pendaftar[index];
    pendaftar.splice(index, 1);

    // Revalidate halaman terkait
    revalidatePath("/saya");
    revalidatePath("/ekskul");
    revalidatePath(`/ekskul/${itemDihapus.ekskulId}`);
  }
}
