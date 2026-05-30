
"use client";

import {
  ShieldCheck,
  Sparkles,
  BadgeCheck,
  MessageCircleMore,
} from "lucide-react";

export default function PremiumSection() {
  const features = [
    {
      icon: <Sparkles className="h-7 w-7" />,
      title: "Quality Verified",
      desc: "Every listing is physically verified by our team to ensure it meets our Oasis Standards.",
    },
    {
      icon: <ShieldCheck className="h-7 w-7" />,
      title: "Verified Properties",
      desc: "Every listing is manually verified for safety, cleanliness, and authenticity.",
    },
    {
      icon: <BadgeCheck className="h-7 w-7" />,
      title: "Zero Brokerage",
      desc: "Direct communication with owners and flatmates. No hidden fees or middle-men.",
    },
    {
      icon: <MessageCircleMore className="h-7 w-7" />,
      title: "Instant Chat",
      desc: "Connect instantly with owners using secure real-time messaging.",
    },
  ];

  return (
    <section className="bg-[#F7F8FC] px-10 py-24">
      <div className="mx-auto max-w-7xl">
        
        {/* TOP */}
        <div className="mb-16 text-center">
          

          <h2 className="mx-auto max-w-3xl text-5xl font-bold leading-tight text-[#2C2F31]">
            Built for the {""}
            <span className="bg-gradient-to-r from-green-700 to-emerald-500 bg-clip-text text-transparent">
              modern {""}
            </span>
            urbanite.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-500">
            We've removed the friction from the hunt so you can focus on the living.
          </p>
        </div>

        {/* CARDS */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((item, index) => (
            <div
              key={index}
              className="group rounded-[30px] border border-green-100 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-3 hover:border-green-200 hover:shadow-[0_20px_60px_rgba(34,197,94,0.18)]"
            >
              {/* ICON */}
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-700 to-emerald-500 text-white shadow-lg transition-all duration-500 group-hover:scale-110">
                {item.icon}
              </div>

              {/* TITLE */}
              <h3 className="mb-4 text-2xl font-bold text-[#2C2F31]">
                {item.title}
              </h3>

              {/* DESC */}
              <p className="leading-7 text-gray-500">
                {item.desc}
              </p>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}