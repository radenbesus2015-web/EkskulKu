import { cookies } from "next/headers";
import FormDaftar from "@/components/FormDaftar";

export default async function FormDaftarWithCookies({ ekskulId }: { ekskulId: number }) {
  const cookieStore = await cookies();
  const namaAwal = cookieStore.get("nama")?.value ?? "";
  const kelasAwal = cookieStore.get("kelas")?.value ?? "";

  return (
    <FormDaftar
      ekskulId={ekskulId}
      namaAwal={namaAwal}
      kelasAwal={kelasAwal}
    />
  );
}

