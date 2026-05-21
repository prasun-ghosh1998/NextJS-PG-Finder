"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart2,
  Users,
  ShieldCheck,
  FileText,
  Building2,
  LogOut,
} from "lucide-react";
import { useAuthStorte } from "@/store/useAuthStore";

export default function Sidebar() {
  const pathname = usePathname();
  const logout = useAuthStorte((state) => state.logout);

  const menu = [
    { name: "Analytics", icon: BarChart2, path: "/admin/dashboard" },
    { name: "Users & owners", icon: Users, path: "/admin/users-owners" },
    { name: "Moderation", icon: ShieldCheck, path: "/admin/moderation" },
    // { name: "Reports", icon: FileText, path: "/admin/reports" },
  ];

  return (
    <div className="w-80 h-screen bg-gradient-to-b from-[#000000] via-[#2c2c2e] to-[#373838] text-white flex flex-col justify-between p-5">
      {/* Logo */}
      <div>
         <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center">
            <Building2 size={22} />
          </div>

          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 bg-clip-text text-transparent">
              PGFinder+
            </h1>

            <p className="text-sm text-gray-400">Admin Panel</p>
          </div>

        {/* Menu */}
        <nav className="space-y-3">
          {menu.map((item) => {
            const isActive = pathname === item.path;

            return (
              <Link
                key={item.name}
                href={item.path}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200
                  
                  ${
                    isActive
                      ? "bg-[#1A2236] text-white shadow-inner"
                      : "hover:bg-[#1A2236] hover:text-white"
                  }
                `}
              >
                <item.icon
                  size={18}
                  className={isActive ? "text-blue-500" : ""}
                />
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
