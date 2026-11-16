import type { Metadata } from "next";
import { Suspense } from "react";
import KontenEkskulSaya from "@/components/KontenEkskulSaya";

export const metadata: Metadata = {
  title: "Ekskul Saya",
};

export default function HalamanEkskulSaya() {
  return (
    <Suspense
      fallback={
        <div className="space-y-4 py-8">
          <div className="h-8 w-48 rounded bg-slate-200 animate-pulse" />
          <div className="h-40 rounded-xl border bg-white animate-pulse" />
        </div>
      }
    >
      <KontenEkskulSaya />
    </Suspense>
  );
}
