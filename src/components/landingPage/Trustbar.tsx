"use client";

import {
  ShieldCheck,
  Building2,
  LockKeyhole,
  BadgeCheck,
} from "lucide-react";

export default function TrustBar() {
  const items = [
    { name: "VerifyPro", icon: ShieldCheck },
    { name: "UrbanPortals", icon: Building2 },
    { name: "SafeRent", icon: LockKeyhole },
    { name: "PropNexus", icon: BadgeCheck },
  ];

  return (
    <section className="bg-gradient-to-b from-[#F7F8FC] to-white px-10 py-16">
      <div className="mx-auto max-w-7xl">
        <p className="mb-10 text-center text-xs font-semibold uppercase tracking-[0.35em] text-green-600">
          Securing Your Journey With Trusted Partners
        </p>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {items.map(({ name, icon: Icon }, index) => (
            <div
              key={index}
              className="flex items-center justify-center gap-3 rounded-3xl border border-gray-100 bg-white px-6 py-6 shadow-sm"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50">
                <Icon
                  size={22}
                  className="text-green-700"
                />
              </div>

              <span className="text-base font-semibold text-gray-700">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}