"use client";

import Img from "@/assets/images/works/img3.png"
import Image from "next/image";
export function FinalCTA (){
  return (
     <section className=" px-6 py-24">
  <div className="bg-[#58e2ae] rounded-[30px] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10">
    
    <div className="flex-1">
      <h2 className="text-green-900 text-4xl md:text-5xl font-bold leading-tight mb-5">
        Ready to find your urban oasis?
      </h2>

      <p className="text-gray-700 mb-8 max-w-lg">
        Join thousands of others who have already upgraded their living
        experience with PGFinder+.
      </p>

      <button className="bg-[#0c5a45] text-white px-8 py-3 rounded-full font-medium">
        Get Started Now
      </button>
    </div>

    <div className="flex-1 flex justify-center">
      <Image
        src={Img}
        alt="Urban Oasis"
        width={430}
        height={300}
        className="rounded-3xl object-cover shadow-lg"
      />
    </div>

  </div>
</section>
  )
}