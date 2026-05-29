"use client";
import { Globe, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/images/landingPage/logo.png";

export default function Footer() {
  return (
    <footer className="bg-[#EDEEF7] text-gray-600 pt-16 pb-6 px-10">
      <div className="grid md:grid-cols-4 gap-10">
        {/* Logo + Icons */}
        <div>
          <Link href="/" className="group flex items-center gap-3">
            <Image
              src={Logo}
              alt="PGFinder Logo"
              width={180}
              height={60}
              className="h-14 w-auto object-contain"
            />
          </Link>

          <div className="flex gap-4 mt-4">
            <div className="group flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#DCDFF1] transition-all duration-500 hover:-translate-y-1 hover:bg-gradient-to-r hover:from-green-700 hover:to-emerald-500 hover:text-white hover:shadow-[0_8px_25px_rgba(34,197,94,0.4)]">
              {" "}
              <Globe size={18} />
            </div>
            <div className="group flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#DCDFF1] transition-all duration-500 hover:-translate-y-1 hover:bg-gradient-to-r hover:from-green-700 hover:to-emerald-500 hover:text-white hover:shadow-[0_8px_25px_rgba(34,197,94,0.4)]">
              {" "}
              <Share2 size={18} />
            </div>
          </div>
        </div>

        {/* Explore */}
        {/* Explore */}
<div>
  <h3 className="mb-4 text-lg font-bold text-gray-800">
    Explore
  </h3>

  <ul className="space-y-3">
    <li className="cursor-pointer transition-all duration-300 hover:translate-x-2 hover:text-green-700">
      Find a Room
    </li>

    <li className="cursor-pointer transition-all duration-300 hover:translate-x-2 hover:text-green-700">
      Property List
    </li>
  </ul>
</div>

{/* Company */}
<div>
  <h3 className="mb-4 text-lg font-bold text-gray-800">
    Company
  </h3>

  <ul className="space-y-3">
    <li className="cursor-pointer transition-all duration-300 hover:translate-x-2 hover:text-green-700">
      About Us
    </li>

    <li className="cursor-pointer transition-all duration-300 hover:translate-x-2 hover:text-green-700">
      Privacy Policy
    </li>

    <li className="cursor-pointer transition-all duration-300 hover:translate-x-2 hover:text-green-700">
      Terms of Service
    </li>
  </ul>
</div>

{/* Support */}
<div>
  <h3 className="mb-4 text-lg font-bold text-gray-800">
    Support
  </h3>

  <ul className="space-y-3">
    <li className="cursor-pointer transition-all duration-300 hover:translate-x-2 hover:text-green-700">
      Help Center
    </li>

    <li className="cursor-pointer transition-all duration-300 hover:translate-x-2 hover:text-green-700">
      Contact Us
    </li>

    <li className="cursor-pointer transition-all duration-300 hover:translate-x-2 hover:text-green-700">
      Trust & Safety
    </li>

    <li className="cursor-pointer transition-all duration-300 hover:translate-x-2 hover:text-green-700">
      FAQ
    </li>
  </ul>
</div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-300 mt-10 pt-6 flex flex-col md:flex-row justify-between text-sm">
        <p>© 2024 PGFinder+. All rights reserved.</p>
        <p>Designed with passion for urban living.</p>
      </div>
    </footer>
  );
}
