"use client";

import Logo from "@/assets/images/landingPage/logo.png";
import { useAuthStorte } from "@/store/useAuthStore";
import {
  Building2,
  Heart,
  Home,
  Menu,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ProfileModal from "./ProfileModal";
import WishlistModal from "./WishlistModal";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

export default function Navbar() {
  const pathname = usePathname();
  const { token, role } = useAuthStorte();

  const [open, setOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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

  const mobileNavClass = (path: string) =>
    `flex items-center gap-3 rounded-2xl px-4 py-3 text-[15px] font-semibold transition-all duration-300 ${
      isActive(path)
        ? "bg-green-100 text-green-700"
        : "text-gray-600 hover:bg-green-50 hover:text-green-700"
    }`;

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <div className="sticky top-0 z-50 flex items-center justify-between border-b border-green-100 bg-white/90 px-4 py-3 shadow-sm backdrop-blur-xl sm:px-6 lg:px-10">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={Logo}
            alt="PGFinder Logo"
            width={180}
            height={60}
            className="h-12 w-auto object-contain sm:h-14"
          />
        </Link>

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

        <div className="hidden md:block">
          {!token ? (
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setLoginOpen(true)}
                className="group relative overflow-hidden rounded-full border border-green-200 px-6 py-2.5 text-green-700 transition-all duration-500 hover:text-white"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-green-700 to-emerald-500 transition-all duration-500 group-hover:translate-x-0" />
                <span className="relative z-10 font-semibold tracking-wide">
                  Login
                </span>
              </button>

              <button
                type="button"
                onClick={() => setRegisterOpen(true)}
                className="group relative overflow-hidden rounded-full border border-green-200 px-6 py-2.5 text-green-700 transition-all duration-500 hover:text-white"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-green-700 to-emerald-500 transition-all duration-500 group-hover:translate-x-0" />
                <span className="relative z-10 font-semibold tracking-wide">
                  Signup
                </span>
              </button>
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
              <button
                type="button"
                onClick={() => setWishlistOpen(true)}
                className="relative rounded-2xl border border-green-100 bg-gradient-to-br from-green-50 to-green-100 p-3 text-green-600 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md"
              >
                <Heart className="h-5 w-5 fill-green-600" />
              </button>

              <button
                type="button"
                onClick={() => setOpen(true)}
                className="rounded-2xl bg-gradient-to-r from-green-700 via-emerald-600 to-green-500 px-5 py-2.5 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-green-300"
              >
                Profile
              </button>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="flex h-11 w-11 items-center justify-center rounded-2xl border border-green-100 bg-green-50 text-green-700 shadow-sm md:hidden"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* MOBILE RIGHT DRAWER */}
      <div
        onClick={closeMobile}
        className={`fixed inset-0 z-[999] bg-black/40 backdrop-blur-sm transition-all duration-300 md:hidden ${
          mobileOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`absolute right-0 top-0 h-full w-[82%] max-w-[330px] bg-white shadow-2xl transition-transform duration-500 ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-green-100 px-5 py-4">
            <Image
              src={Logo}
              alt="PGFinder Logo"
              width={150}
              height={50}
              className="h-11 w-auto object-contain"
            />

            <button
              type="button"
              onClick={closeMobile}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50 text-green-700"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex h-[calc(100%-76px)] flex-col justify-between p-5">
            <div>
              <div className="mb-5 rounded-3xl bg-gradient-to-br from-green-700 via-emerald-600 to-green-400 p-5 text-white shadow-lg">
                <p className="text-sm opacity-90">Welcome to</p>
                <h3 className="mt-1 text-2xl font-bold">PGFinder+</h3>
                <p className="mt-2 text-sm opacity-90">
                  Find your perfect PG easily.
                </p>
              </div>

              <nav className="flex flex-col gap-2">
                <Link
                  href="/"
                  onClick={closeMobile}
                  className={mobileNavClass("/")}
                >
                  <Home size={18} />
                  Discover
                </Link>

                <Link
                  href="/work"
                  onClick={closeMobile}
                  className={mobileNavClass("/work")}
                >
                  <Sparkles size={18} />
                  How it works
                </Link>

                <Link
                  href="/property"
                  onClick={closeMobile}
                  className={mobileNavClass("/property")}
                >
                  <Building2 size={18} />
                  Property
                </Link>

                <Link
                  href="/community"
                  onClick={closeMobile}
                  className={mobileNavClass("/community")}
                >
                  <Users size={18} />
                  Community
                </Link>
              </nav>
            </div>

            <div className="border-t border-green-100 pt-5">
              {!token ? (
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => {
                      setLoginOpen(true);
                      closeMobile();
                    }}
                    className="w-full rounded-2xl border border-green-200 py-3 font-semibold text-green-700 transition-all duration-300 hover:bg-green-50"
                  >
                    Login
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setRegisterOpen(true);
                      closeMobile();
                    }}
                    className="w-full rounded-2xl bg-gradient-to-r from-green-700 via-emerald-600 to-green-500 py-3 font-semibold text-white shadow-md"
                  >
                    Signup
                  </button>
                </div>
              ) : role === "admin" ? (
                <Link
                  href="/admin/dashboard"
                  onClick={closeMobile}
                  className="block rounded-2xl bg-gradient-to-r from-green-700 via-emerald-600 to-green-500 py-3 text-center font-semibold text-white shadow-md"
                >
                  Admin Dashboard
                </Link>
              ) : role === "owner" ? (
                <Link
                  href="/owner/dashboard"
                  onClick={closeMobile}
                  className="block rounded-2xl bg-gradient-to-r from-green-700 via-emerald-600 to-green-500 py-3 text-center font-semibold text-white shadow-md"
                >
                  Owner Dashboard
                </Link>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setWishlistOpen(true);
                      closeMobile();
                    }}
                    className="rounded-2xl border border-green-200 py-3 font-semibold text-green-700"
                  >
                    Wishlist
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setOpen(true);
                      closeMobile();
                    }}
                    className="rounded-2xl bg-gradient-to-r from-green-700 via-emerald-600 to-green-500 py-3 font-semibold text-white shadow-md"
                  >
                    Profile
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />

      <RegisterModal
        open={registerOpen}
        onClose={() => setRegisterOpen(false)}
        onLoginOpen={() => {
          setRegisterOpen(false);
          setLoginOpen(true);
        }}
      />

      <ProfileModal open={open} onClose={() => setOpen(false)} />

      <WishlistModal
        open={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
      />
    </>
  );
}