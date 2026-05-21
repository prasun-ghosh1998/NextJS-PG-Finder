"use client";
import { Globe, Share2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#EDEEF7] text-gray-600 pt-16 pb-6 px-10">
      <div className="grid md:grid-cols-4 gap-10">

        {/* Logo + Icons */}
        <div>
          <h2 className="text-blue-600 text-xl font-semibold mb-6">
            PGFinder+
          </h2>

          <div className="flex gap-4">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#DCDFF1] cursor-pointer">
              <Globe size={18} />
            </div>
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#DCDFF1] cursor-pointer">
              <Share2 size={18} />
            </div>
          </div>
        </div>

        {/* Explore */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-4">Explore</h3>
          <ul className="space-y-3">
            <li>Find a Room</li>
            <li>Property List</li>
            <li>Premium PGs</li>
            <li>Verified Listings</li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-4">Company</h3>
          <ul className="space-y-3">
            <li>About Us</li>
            <li>Careers</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-4">Support</h3>
          <ul className="space-y-3">
            <li>Help Center</li>
            <li>Contact Us</li>
            <li>Trust & Safety</li>
            <li>FAQ</li>
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