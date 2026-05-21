"use client";

import { useAuthStorte } from "@/store/useAuthStore";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const { token, role } = useAuthStorte();
  const isActive = (path: string) => pathname === path;

  const navClass = (path: string) =>
  `relative text-[16px] transition duration-300 pb-1
   after:content-[''] after:absolute after:left-0 after:bottom-0
   after:h-[2px] after:bg-green-700 after:transition-all after:duration-300
   ${
     isActive(path)
       ? "text-green-700 font-extrabold after:w-full"
       : "text-gray-500 hover:text-green-700 after:w-0 hover:after:w-full hover:font-bold"
   }`;

  return (
    <div className="flex justify-between items-center px-10 py-4 bg-white shadow-sm">
      <Link
        href="/"
        className="text-green-700 font-bold text-[25px] hover:text-green-900 transition duration-300"
      >
        PGFinder+
      </Link>

      <div className="flex gap-8 text-sm">
        <Link href="/" className={navClass("/")}>
          Discover
        </Link>

        <Link href="/work" className={navClass("/work")}>
          How it works
        </Link>

        <Link href="/property" className={navClass("/property")}>
          Property
        </Link>

        <Link href="/community" className={navClass("/community")}>
          Community
        </Link>
      </div>

      {!token ? (
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className={`group relative overflow-hidden px-6 py-2.5 rounded-full border transition-all duration-500 ${
              isActive("/login")
                ? "border-emerald-500 text-white"
                : "border-emerald-200 text-emerald-700 hover:text-white"
            }`}
          >
            <span
              className={`absolute inset-0 transition-all duration-500 ${
                isActive("/login")
                  ? "bg-gradient-to-r from-emerald-700 to-green-500"
                  : "bg-gradient-to-r from-emerald-700 to-green-500 -translate-x-full group-hover:translate-x-0"
              }`}
            />

            <span className="relative z-10 font-medium tracking-wide">
              Login
            </span>
          </Link>

          <Link
            href="/login"
            className={`group relative overflow-hidden px-6 py-2.5 rounded-full border transition-all duration-500 ${
              isActive("/login")
                ? "border-emerald-500 text-white"
                : "border-emerald-200 text-emerald-700 hover:text-white"
            }`}
          >
            <span
              className={`absolute inset-0 transition-all duration-500 ${
                isActive("/login")
                  ? "bg-gradient-to-r from-emerald-700 to-green-500"
                  : "bg-gradient-to-r from-emerald-700 to-green-500 -translate-x-full group-hover:translate-x-0"
              }`}
            />

            <span className="relative z-10 font-medium tracking-wide">
              Signup
            </span>
          </Link>
        </div>
      ) : role === "admin" ? (
        <Link
          href="/admin/dashboard"
          className="px-4 py-2 rounded-full  bg-gradient-to-r from-green-700 to-green-400 text-white  hover:from-green-900 hover:to-green-600 transition-all duration-300"
        >
          Admin Dashboard
        </Link>
      ) : role === "owner" ? (
        <Link
          href="/owner/dashboard"
          className="px-4 py-2 rounded-full bg-gradient-to-r from-green-700 to-green-400 text-white  hover:from-green-900 hover:to-green-600 transition-all duration-300"
        >
          Owner Dashboard
        </Link>
      ) : (
        <Link
          href="/user"
          className="px-4 py-2 rounded-full  bg-gradient-to-r from-green-700 to-green-400 text-white  hover:from-green-900 hover:to-green-600 transition-all duration-300"
        >
          Profile
        </Link>
      )}
    </div>
  );
}
