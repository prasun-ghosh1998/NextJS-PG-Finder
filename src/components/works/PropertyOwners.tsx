"use client";

import Image from "next/image";
import Image2 from "@/assets/images/works/img2.png"
import { CircleCheck } from "lucide-react";
export function PropertyOwners (){
  return (
          <section className="bg-[#e5e5e5] py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-[#0a6a4f] font-semibold uppercase text-sm mb-4">
            For Property Owners
          </p>

          <h2 className="text-[#2C2F31] text-center text-5xl font-bold mb-20">
            Premium Listing, Simplified.
          </h2>

          <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h3 className="text-[#2C2F31] text-4xl font-bold mb-6">
                List in Minutes,
                <br />
                Vibe Check Forever.
              </h3>
              <p className="text-gray-600 leading-7 mb-6">
                Upload photos, set your house rules, and let our AI suggest the
                optimal price based on local oasis-living trends.
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex gap-4"><CircleCheck style={{color:"green"}} /> Automated photo enhancement</li>
                <li className="flex gap-4"><CircleCheck style={{color:"green"}}/> Smart pricing engine</li>
              </ul>
            </div>

            <div className=" rounded-[24px]" >
              <Image src={Image2}
                    alt=""
                    width={220}
                    height={220}
                    className="w-[530px] shadow-lg h-auto rounded-3xl object-contain">

              </Image>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-14 items-center">
            <div className="bg-white rounded-[24px] h-[180px] shadow-md" />
            <div>
              <h3 className="text-[#2C2F31] text-4xl font-bold mb-6">
                Qualify Guests with
                <br />
                AI Precision.
              </h3>
              <p className="text-gray-600 leading-7">
                Don’t just get leads—get matches. Our AI scores potential
                tenants based on your preferences, past reviews, and lifestyle
                compatibility.
              </p>
            </div>
          </div>
        </div>
      </section>
  )
}

