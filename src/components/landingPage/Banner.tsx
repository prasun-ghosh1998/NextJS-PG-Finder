"use client";

import Image from "next/image";
import HeroImg from "@/assets/images/landingPage/banner-img.png";

export default function Banner() {
  return (
    <section className="bg-[#F7F8FC] px-10 py-12">
      <div className="grid items-center gap-10 md:grid-cols-2">
        {/* LEFT */}
        <div>
          <h1 className="text-[55px] font-bold leading-[1.1] text-[#2C2F31]">
            Find your{" "}
            <span className="bg-[#006947] bg-clip-text text-transparent">
              perfect
            </span>
            <br />
            oasis in the city.
          </h1>

          <p className="mt-6 max-w-lg text-gray-500">
            PGFinder+ leverages AI-driven compatibility matching to connect
            modern professionals with premium living spaces and curated
            roommates.
          </p>
        </div>

        {/* RIGHT */}
        <div
          data-aos="fade-right"
          data-aos-duration="1200"
          data-aos-delay="200"
          className="relative h-[550px] w-full overflow-hidden rounded-[30px] shadow-[0_20px_60px_rgba(0,0,0,0.18)]"
        >
          <img
            src={HeroImg.src}
            alt="hero"
            className="h-full w-full object-cover"
          />

          <div
            data-aos="fade-up"
            data-aos-delay="600"
            className="absolute bottom-10 left-45 flex -translate-x-1/2 items-center gap-3 rounded-full bg-white/95 px-6 py-4 text-black shadow-2xl backdrop-blur-xl"
          >
            <div className="flex -space-x-3">
              <img
                src="https://randomuser.me/api/portraits/women/1.jpg"
                alt="user"
                className="h-9 w-9 rounded-full border-2 border-white"
              />
              <img
                src="https://randomuser.me/api/portraits/men/2.jpg"
                alt="user"
                className="h-9 w-9 rounded-full border-2 border-white"
              />
            </div>

            <p className="whitespace-nowrap text-sm text-gray-500">
              Trusted by{" "}
              <span className="font-bold text-green-700">12,000+</span>{" "}
              residents in the city.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
