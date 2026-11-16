"use client";

import { useTransition } from "react";
import { batalkanPendaftaran } from "@/app/actions";

type Props = {
  nomor: number;
};

export default function TombolBatalkan({ nomor }: Props) {
  const [isPending, startTransition] = useTransition();

  return (
    <form
      action={(formData) => {
        startTransition(async () => {
          await batalkanPendaftaran(formData);
        });
      }}
    >
      <input type="hidden" name="nomor" value={nomor} />
      <button
        type="submit"
        disabled={isPending}
        className="rounded-lg border border-red-300 bg-white px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending ? "Membatalkan..." : "Batalkan"}
      </button>
    </form>
  );
}

