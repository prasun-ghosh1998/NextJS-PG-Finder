"use client";

import Image from "next/image";
import { MapPin } from "lucide-react";
import HeroImg from "@/assets/images/landingPage/banner-img.png";

export default function Banner() {
  return (
    <section className="px-10 py-12 bg-[#F7F8FC]">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* LEFT */}
        <div>
          {/* Heading */}
          <h1 className="text-[55px] leading-[1.1] font-bold text-[#2C2F31]">
            Find your
            <span className="bg-[#006947] bg-clip-text text-transparent">
              perfect
            </span>
            <br />
            oasis in the city.
          </h1>

          {/* Description */}
          <p className="text-gray-500 mt-6 max-w-lg">
            PGFinder+ leverages AI-driven compatibility matching to connect
            modern professionals with premium living spaces and curated
            roommates.
          </p>

          {/* Search Box */}
          <div className="mt-8 bg-white rounded-full shadow-lg p-3 flex items-center gap-3 w-fit">
            {/* Location */}
            <div className="flex items-center gap-2 bg-[#EEF0FA] px-4 py-3 rounded-xl">
              <MapPin size={18} className="text-green-800" />
              <input
                type="text"
                placeholder="Where would you like to live?"
                className="outline-none text-black w-full"
              />
            </div>

            {/* Budget */}
            <div className="flex items-center gap-2 bg-[#EEF0FA] px-4 py-3 rounded-xl">
              <MapPin size={18} className="text-green-800" />
              <select className="text-black outline-none bg-transparent">
                <option>Looking for PGs</option>
                <option>Flatmates</option>
              </select>
            </div>

            {/* Button */}
            <button className="bg-green-800 text-white px-6 py-3 rounded-full font-medium">
              Search
            </button>
          </div>

          {/* Users */}
        </div>

        {/* RIGHT */}
        <div className="relative">
          <div className="rounded-[30px] overflow-hidden">
            <Image src={HeroImg} alt="hero" className="object-cover" />
          </div>

          {/* Floating Card */}
          <div className="absolute bottom-20 left-15 bg-white text-black px-6 py-4 rounded-full flex items-center gap-3 shadow-lg">
            <div className="flex -space-x-3">
              <img
                src="https://randomuser.me/api/portraits/women/1.jpg"
                className="w-8 h-8 rounded-full border-2 border-white"
              />
              <img
                src="https://randomuser.me/api/portraits/men/2.jpg"
                className="w-8 h-8 rounded-full border-2 border-white"
              />
            </div>

            <p className="text-sm text-gray-500">
              Trusted by{" "}
              <span className="font-bold text-green-700">12,000+ </span>{" "}
              residents in the city.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// import Image from "next/image";
// import bannerImg from "@/assets/images/landingPage/banner-img.png";

// export default function Banner() {
//   return (
//     <section className="grid md:grid-cols-2 gap-10 px-10 py-16 items-center bg-gradient-to-b from-[#6c759e2f] to-[#8a94c40a]">

//       {/* LEFT */}
//       <div>
//         <h1 className="text-5xl font-bold leading-tight">
//           Find Your Perfect <br />
//           <span className="text-blue-600">Space</span > & Ideal <span className="text-blue-600">Roommates</span>
//         </h1>

//         <p className="text-gray-500 mt-4">
//          Experience the new standard of shared living. Curated
// listings, verified profiles, and seamless connections for the
// modern urban dweller.
//         </p>

//         {/* SEARCH */}
//         <div className="bg-white p-4 rounded-xl shadow mt-6 flex gap-3">
//           <input className="flex-1 outline-none" placeholder="Where do you want to live?" />
//           <input className="w-32 outline-none" placeholder="Budget" />
//           <button className="bg-blue-600 text-white px-5 rounded-lg">
//             Search
//           </button>
//         </div>
//       </div>

//       {/* RIGHT */}
//       <div className="relative w-full h-[576px] rounded-2xl overflow-hidden">
//   <Image
//     src={bannerImg}
//     alt="banner"
//     fill
//     sizes="(max-width: 768px) 100vw, 50vw"
//     className="object-cover"
//   />
// </div>

//     </section>
//   );
// }
