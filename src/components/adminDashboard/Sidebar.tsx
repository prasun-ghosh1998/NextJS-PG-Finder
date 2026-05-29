"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart2,
  Users,
  ShieldCheck,
  LogOut,
} from "lucide-react";
import { useAuthStorte } from "@/store/useAuthStore";
import Image from "next/image";
import Logo from "@/assets/images/landingPage/logo.png";


export default function Sidebar() {
  const pathname = usePathname();
  const logout = useAuthStorte((state) => state.logout);

  const menu = [
    { name: "Analytics", icon: BarChart2, path: "/admin/dashboard" },
    { name: "Users & owners", icon: Users, path: "/admin/users-owners" },
    { name: "Moderation", icon: ShieldCheck, path: "/admin/moderation" },
  ];

  return (
    <div className="w-80 h-screen bg-gradient-to-b from-[#000000] via-[#2c2c2e] to-[#373838] text-white flex flex-col justify-between p-5">
      {/* Logo */}
      <div>
        <Link href={"/"} className="flex items-center gap-5">
          <Image
          src={Logo}
          alt="PGFinder Logo"
          width={180}
          height={60}
          className="h-14 w-auto object-contain"
        />
        </Link>

        {/* Menu */}
        <nav className="space-y-3 mt-6">
          {menu.map((item) => {
            const active = pathname === item.path;

            return (
              <Link
                key={item.name}
                href={item.path}
                className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition ${
                  active
                    ? "bg-gradient-to-r from-green-900 to-green-600 text-white"
                    : "hover:bg-green-700/13 text-gray-300"
                }`}
              >
                <item.icon size={18} className={"text-white"} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom */}
      <div>
        <div>
          <button
            onClick={logout}
            className="w-full mt-4 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white rounded-2xl py-4 flex items-center justify-center gap-3 transition"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
