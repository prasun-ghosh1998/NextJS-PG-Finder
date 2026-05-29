"use client";

import { useAuthStorte } from "@/store/useAuthStore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ProfileModal from "./ProfileModal";
import WishlistModal from "./WishlistModal";
import Logo from "@/assets/images/landingPage/logo.png";

import { Heart, Home, Building2, Users, Sparkles } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  const { token, role } = useAuthStorte();

  const [open, setOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  const navClass = (path: string) =>
    `relative flex items-center gap-2 text-[15px] transition-all duration-300 pb-1
   after:content-[''] after:absolute after:left-0 after:bottom-0
   after:h-[2px] after:rounded-full after:bg-gradient-to-r after:from-green-500 after:to-emerald-700
   after:transition-all after:duration-300
   ${
     isActive(path)
       ? "text-green-700 font-bold after:w-full"
       : "text-gray-500 hover:text-green-700 after:w-0 hover:after:w-full"
   }`;

  return (
    <div className=" top-0 z-50 flex items-center justify-between border-b border-green-100 bg-white/90 px-10 py-4 backdrop-blur-xl shadow-sm">
      <Link href="/" className="group flex items-center gap-3">
        <Image
          src={Logo}
          alt="PGFinder Logo"
          width={180}
          height={60}
          className="h-14 w-auto object-contain"
        />
      </Link>

      {/* ================= NAV LINKS ================= */}
      <div className="hidden items-center gap-8 md:flex">
        <Link href="/" className={navClass("/")}>
          <Home size={17} />
          Discover
        </Link>

        <Link href="/work" className={navClass("/work")}>
          <Sparkles size={17} />
          How it works
        </Link>

        <Link href="/property" className={navClass("/property")}>
          <Building2 size={17} />
          Property
        </Link>

        <Link href="/community" className={navClass("/community")}>
          <Users size={17} />
          Community
        </Link>
      </div>

      {/* ================= RIGHT SIDE ================= */}
      {!token ? (
        <div className="flex items-center gap-4">
          {/* LOGIN */}
          <Link
            href="/login"
            className={`group relative overflow-hidden rounded-full border px-6 py-2.5 transition-all duration-500 ${
              isActive("/login")
                ? "border-green-600 text-white"
                : "border-green-200 text-green-700 hover:text-white"
            }`}
          >
            <span
              className={`absolute inset-0 transition-all duration-500 ${
                isActive("/login")
                  ? "bg-gradient-to-r from-green-700 to-emerald-500"
                  : "bg-gradient-to-r from-green-700 to-emerald-500 -translate-x-full group-hover:translate-x-0"
              }`}
            />

            <span className="relative z-10 font-semibold tracking-wide">
              Login
            </span>
          </Link>

          {/* SIGNUP */}
          <Link
            href="/signup"
            className="rounded-full bg-gradient-to-r from-green-700 via-emerald-600 to-green-500 px-6 py-2.5 font-semibold tracking-wide text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-green-300"
          >
            Signup
          </Link>
        </div>
      ) : role === "admin" ? (
        <Link
          href="/admin/dashboard"
          className="rounded-full bg-gradient-to-r from-green-700 via-emerald-600 to-green-400 px-5 py-2.5 font-semibold text-white shadow-md transition-all duration-300 hover:scale-105"
        >
          Admin Dashboard
        </Link>
      ) : role === "owner" ? (
        <Link
          href="/owner/dashboard"
          className="rounded-full bg-gradient-to-r from-green-700 via-emerald-600 to-green-400 px-5 py-2.5 font-semibold text-white shadow-md transition-all duration-300 hover:scale-105"
        >
          Owner Dashboard
        </Link>
      ) : (
        <div className="flex items-center gap-3">
          {/* WISHLIST */}
          <button
            onClick={() => setWishlistOpen(true)}
            className="relative rounded-2xl border border-green-100 bg-gradient-to-br from-green-50 to-green-100 p-3 text-green-600 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md"
          >
            <Heart className="h-5 w-5 fill-green-600" />
          </button>

          {/* PROFILE */}
          <button
            onClick={() => setOpen(true)}
            className="rounded-2xl bg-gradient-to-r from-green-700 via-emerald-600 to-green-500 px-5 py-2.5 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-green-300"
          >
            Profile
          </button>
        </div>
      )}

      {/* ================= MODALS ================= */}
      <ProfileModal open={open} onClose={() => setOpen(false)} />

      <WishlistModal
        open={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
      />
    </div>
  );
}
