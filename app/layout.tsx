import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Suspense } from "react";

const poppins = localFont({
  src: [
    { path: "./fonts/Poppins-Regular.ttf", weight: "400" },
    { path: "./fonts/Poppins-Bold.ttf", weight: "700" },
  ],
});

export const metadata: Metadata = {
  title: {
    default: "EkskulKu",
    template: "%s · EkskulKu",
  },
  description: "Situs pendaftaran ekstrakurikuler sekolah",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="antialiased">
      <body className={`${poppins.className} flex min-h-screen flex-col bg-slate-50 text-slate-800`}>
        <Suspense fallback={<div className="h-16 border-b bg-white" />}>
          <Navbar />
        </Suspense>
        <main className="mx-auto w-full max-w-5xl flex-1 p-6">{children}</main>
        <footer className="border-t bg-white p-4 text-center text-sm text-slate-500">
          EkskulKu · Sistem Pendaftaran Ekstrakurikuler
        </footer>
      </body>
    </html>
  );
}
