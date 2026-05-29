"use client";

import { ArrowRight, Home, Sparkles } from "lucide-react";

export default function CTA() {
  return (
    <section className="px-10 py-16">
      <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-green-900 via-green-700 to-emerald-500 px-8 py-16 text-center text-white shadow-[0_25px_80px_rgba(0,105,71,0.35)]">
        
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-emerald-300/20 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-3xl">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md">
            <Home className="h-8 w-8 text-white" />
          </div>

          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium backdrop-blur-md">
            <Sparkles size={16} />
            Start hosting with PGFinder
          </p>

          <h2 className="text-4xl font-extrabold leading-tight md:text-5xl">
            Are you a property owner or a master tenant?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-green-50/90">
            List your space and find high-quality tenants or roommates in
            minutes. Our platform handles verification and leads, so you can
            focus on being a great host.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <button className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3 font-semibold text-green-800 shadow-xl transition hover:scale-105 hover:bg-green-50">
              List Your Property
              <ArrowRight
                size={18}
                className="transition group-hover:translate-x-1"
              />
            </button>

            <button className="rounded-full border border-white/30 bg-white/10 px-7 py-3 font-semibold text-white backdrop-blur-md transition hover:scale-105 hover:bg-white/20">
              How Hosting Works
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}