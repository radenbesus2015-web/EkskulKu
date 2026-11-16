"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  { href: "/", teks: "Beranda" },
  { href: "/ekskul", teks: "Daftar Ekskul" },
  { href: "/saya", teks: "Ekskul Saya" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="border-b bg-white">
      <nav className="mx-auto flex max-w-5xl items-center gap-6 px-6 py-4">
        <Link href="/" className="text-xl font-bold text-blue-600">
          EkskulKu
        </Link>
        <div className="flex items-center gap-4">
          {menu.map((m) => {
            const isActive =
              m.href === "/"
                ? pathname === "/"
                : pathname.startsWith(m.href);

            return (
              <Link
                key={m.href}
                href={m.href}
                className={
                  isActive
                    ? "font-semibold text-blue-600"
                    : "text-slate-600 hover:text-blue-600"
                }
              >
                {m.teks}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}

