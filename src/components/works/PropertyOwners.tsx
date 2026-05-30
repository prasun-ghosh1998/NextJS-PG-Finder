"use client";

import Image from "next/image";
import Image2 from "@/assets/images/works/img2.png";
import { CircleCheck, Sparkles, ShieldCheck, TrendingUp } from "lucide-react";

export function PropertyOwners() {
  return (
    <section className="relative overflow-hidden bg-[#F6F8F4] px-6 py-24">
      <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-green-200/40 blur-3xl" />
      <div className="absolute -right-24 bottom-20 h-72 w-72 rounded-full bg-emerald-300/30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div data-aos="fade-right"
          data-aos-duration="1200"
          data-aos-delay="200" className="mb-20 text-center">
          <span className="inline-flex rounded-full bg-white px-5 py-2 text-xs font-bold uppercase tracking-[0.25em] text-green-700 shadow-sm">
            For Property Owners
          </span>

          <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-[#1F2933] md:text-6xl">
            Premium Listing,{" "}
            <span className="bg-gradient-to-r from-green-700 to-emerald-400 bg-clip-text text-transparent">
              Simplified.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-gray-500">
            Manage listings, qualify tenants, and grow faster with a smarter
            owner experience.
          </p>
        </div>

        <div className="grid items-center gap-14 rounded-[36px] border border-white/70 bg-white/80 p-6 shadow-[0_30px_90px_rgba(16,185,129,0.16)] backdrop-blur md:grid-cols-2 md:p-12">
          <div>
            <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-700">
              <Sparkles size={26} />
            </div>

            <h3 className="text-4xl font-extrabold leading-tight text-[#1F2933] md:text-5xl">
              List in Minutes,
              <br />
              Vibe Check Forever.
            </h3>

            <p className="mt-6 max-w-xl text-base leading-8 text-gray-500">
              Upload photos, set your house rules, and let our AI suggest the
              optimal price based on local oasis-living trends.
            </p>

            <ul className="mt-8 space-y-4">
              {[
                "Automated photo enhancement",
                "Smart pricing engine",
                "Instant listing visibility",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-4 rounded-2xl bg-green-50 px-4 py-3 text-sm font-semibold text-gray-700"
                >
                  <CircleCheck className="h-5 w-5 text-green-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div data-aos="fade-left"
          data-aos-duration="1200"
          data-aos-delay="200" className="relative">
            <div data-aos="fade-up"
          data-aos-duration="1200"
          data-aos-delay="200" className="absolute -left-5 -top-5 rounded-2xl bg-white px-5 py-4 shadow-xl">
              <p className="text-xs text-gray-400">Owner Growth</p>
              <p className="text-2xl font-extrabold text-green-700">+48%</p>
            </div>

            <Image
              src={Image2}
              alt="Property owner listing preview"
              width={620}
              height={520}
              className="h-[420px] w-full rounded-[32px] object-cover shadow-2xl"
            />
          </div>
        </div>

        <div className="mt-14 grid items-center gap-14 rounded-[36px] border border-white/70 bg-[#10251D] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.18)] md:grid-cols-2 md:p-12">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-[28px] bg-white/10 p-6 text-white backdrop-blur">
              <ShieldCheck className="mb-8 text-emerald-300" size={34} />
              <p className="text-4xl font-extrabold">98%</p>
              <p className="mt-2 text-sm text-white/60">Verified quality leads</p>
            </div>

            <div className="rounded-[28px] bg-white p-6 text-[#10251D] shadow-xl sm:translate-y-8">
              <TrendingUp className="mb-8 text-green-600" size={34} />
              <p className="text-4xl font-extrabold">3x</p>
              <p className="mt-2 text-sm text-gray-500">Faster tenant matching</p>
            </div>
          </div>

          <div>
            <span className="mb-5 inline-flex rounded-full bg-emerald-400/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
              AI Screening
            </span>

            <h3 className="text-4xl font-extrabold leading-tight text-white md:text-5xl">
              Qualify Guests with
              <br />
              AI Precision.
            </h3>

            <p className="mt-6 max-w-xl text-base leading-8 text-white/60">
              Don’t just get leads—get matches. Our AI scores potential tenants
              based on your preferences, past reviews, and lifestyle
              compatibility.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}