"use client";

import Img from "@/assets/images/works/img3.png"
import Image from "next/image";
export function FinalCTA (){
  return (
     <section className=" mx-6 my-20">
  <div className="bg-[#58e2ae] rounded-[30px] py-5 px-10 md:px-8  flex flex-col md:flex-row items-center justify-between gap-10">
    
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

    <div className="flex-1  flex justify-center">
      <Image
        src={Img}
        alt="Urban Oasis"
        width={420}
        height={200}
        className="rounded-3xl object-cover shadow-lg"
      />
    </div>

  </div>
</section>
  )
}