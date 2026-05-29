"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Building2,
  Home,
  LogOut,
  MessageSquare,
} from "lucide-react";
import { useAuthStorte } from "@/store/useAuthStore";
import Logo from "@/assets/images/landingPage/logo.png";
import Image from "next/image";


export default function Sidebar() {
  const pathname = usePathname();
    const logout = useAuthStorte((state) => state.logout);
  // const active = true;

  const menus = [
    {
      icon: Home,
      label: "Dashboard",
      href: "/owner/dashboard",
    },
    {
      icon: Building2,
      label: "Listings",
      href: "/owner/listing",
    },
    {
      icon: MessageSquare,
      label: "Inquiries",
      href: "/owner/inquiries",
    },
  ];

  return (
    <aside className="w-[280px] hidden lg:flex flex-col justify-between bg-gradient-to-b from-[#000000] via-[#2c2c2e] to-[#373838] text-white p-6">
      <div>
        {/* LOGO */}
        <Link href={"/"} className="flex items-center gap-5">
          <Image
          src={Logo}
          alt="PGFinder Logo"
          width={180}
          height={60}
          className="h-14 w-auto object-contain"
        />
        </Link>

        {/* MENUS */}
        <nav className="space-y-2">
          {menus.map((item, i) => {
            const active = pathname === item.href;

            return (
              <Link
                href={item.href}
                key={i}
                className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition ${
                  active
                    ? "bg-gradient-to-r from-green-900 to-green-600 text-white"
                    : "hover:bg-green-700/13 text-gray-300"
                }`}
              >
                <item.icon size={20} />

                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* USER */}
      <div>

         <button
      onClick={logout}
      className="w-full mt-4 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white rounded-2xl py-4 flex items-center justify-center gap-3 transition"
    >
      <LogOut size={20} />
      Logout
    </button>
      </div>
    </aside>
  );
}
