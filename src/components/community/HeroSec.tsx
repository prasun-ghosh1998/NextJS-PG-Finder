"use client";

import BannerImg from "@/assets/images/community/banner-bg.png";

export function HeroSec() {
  return (
    <section className="px-10 py-16">
      <div
        className="relative rounded-[36px] overflow-hidden min-h-[500px] flex items-center px-8 md:px-14 bg-cover bg-center"
        style={{
          backgroundImage: `
      linear-gradient(
        to right,
        rgba(6, 78, 59, 0.9),
        rgba(6, 78, 59, 0.1)
      ),
       url(${BannerImg.src})
    `,
        }}
      >
        <div className="relative z-10 max-w-xl">
          <h1 className="text-white text-5xl md:text-7xl font-bold leading-tight">
            Found by tech,
            <br />
            united by living.
          </h1>

          <p className="mt-6 text-lg text-gray-200 leading-relaxed">
            Experience the Urban Oasis where intelligent matching meets human
            connection. Your perfect roommate is just a profile away.
          </p>
        </div>
      </div>
    </section>
  );
}
