"use client";

import Image from "next/image";
import IMG from "@/assets/images/works/img.png"
export function HowItWorks() {
  const steps = [
    {
      id: "01",
      title: "Create your Lifestyle Profile",
      desc: "Go beyond just budget. Tell our AI about your habits, pet preferences, and work-from-home needs to ensure the perfect match.",
      img: IMG,
    },
    {
      id: "02",
      title: "AI Smart Matching",
      desc: "Our algorithms filter thousands of listings to present only the top 5% that fit your unique lifestyle.",
    },
    {
      id: "03",
      title: "Secure Direct Chat",
      desc: "Connect with owners through our encrypted portal. No phone numbers shared until you’re ready.",
    },
    {
      id: "04",
      title: "Close the Deal",
      desc: "Review digital contracts, pay your deposit through PGFinder+ Escrow, and get your digital keys.",
      green: true,
    },
  ];
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <p className="text-green-500 text-sm font-semibold uppercase tracking-wide mb-2">
        THE SEEKER'S PATH
      </p>

      <div className="flex justify-between items-end mb-10 gap-4 flex-wrap">
        <h2 className="text-[#2C2F31] text-5xl font-bold leading-tight">
          Find your next sanctuary.
        </h2>
        <p className="text-gray-400">
          Four simple steps to move from scrolling to moving in.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {steps.map((item, index) => (
          <div
            key={index}
            className={`rounded-[28px] p-8 min-h-[260px] flex flex-col justify-between ${
              item.green
                ? "bg-[#066f4f] text-white"
                : item.id === "02"
                  ? "bg-[#cfe8d8]"
                  : "bg-[#d9d9d9]"
            }`}
          >
            <div>
              <div className="w-10 h-10 rounded-full bg-[#0a6a4f] text-white flex items-center justify-center text-sm font-semibold mb-6">
                {item.id}
              </div>

              <h3  className={`text-3xl font-semibold mb-4 ${
    item.id === "04" ? "text-white" : "text-black"
  }`}>{item.title}</h3>
              <p className={`text-black text-base leading-7 opacity-80 max-w-md ${item.id === "04" ? "text-white" : "text-black"}`}>
                {item.desc}
              </p>
              {item.img && (
                <div className="mt-6">
                  <Image
                    src={item.img}
                    alt={item.title}
                    width={220}
                    height={220}
                    className="w-full h-auto rounded-3xl object-contain"
                  />
                </div>
              )}
            </div>

            {item.id === "04" && (
              <button className="bg-white text-[#066f4f] px-6 py-3 rounded-full w-fit font-medium mt-8">
                Start Searching
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
