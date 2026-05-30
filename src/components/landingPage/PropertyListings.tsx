"use client";

import PropertyCard from "./PropertyCard";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseclient";

export default function PropartyListings() {
  const [listings, setListings] = useState<any[]>([]);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    const { data, error } = await supabase
      .from("property")
      .select("*")
      .eq("status", "Approved")
      .order("created_at", { ascending: false })
      .limit(3);

    if (error) {
      console.log(error);
      return;
    }

    setListings(data || []);
  };

  return (
    <section className="px-10 py-16 bg-[#F7F8FC]">
      <div className="mb-10 flex flex-col gap-6 rounded-[28px] border border-green-100 bg-gradient-to-r from-white via-emerald-50 to-green-100 p-6 shadow-[0_20px_60px_rgba(16,185,129,0.12)] md:flex-row md:items-end md:justify-between">
  <div>
    <span className="mb-3 inline-flex rounded-full bg-green-100 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-green-700">
      Premium Picks
    </span>

    <h2 className="max-w-xl text-3xl font-extrabold leading-tight text-gray-900 md:text-5xl">
      Handpicked for your{" "}
      <span className="bg-gradient-to-r from-green-700 to-emerald-400 bg-clip-text text-transparent">
        lifestyle.
      </span>
    </h2>

    <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500">
      Curated collections based on the most requested living conditions in the
      city.
    </p>
  </div>

  <Link
    href="/property"
    className="group inline-flex items-center justify-center rounded-full bg-gradient-to-r from-green-600 to-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-green-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-green-300"
  >
    View all properties
    <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
      →
    </span>
  </Link>
</div>

      <div className="grid md:grid-cols-3 gap-8">
        {listings.map((item) => (
          <PropertyCard
            key={item.id}
            title={item.title}
            price={item.price}
            location={item.location}
            image={item.image}
            tags={item.amenities ? item.amenities.split(",") : []}
            owner={{
              name: item.name,
              email: item.email,
              phone: item.phone,
            }}
            property={item}
          />
        ))}
      </div>
    </section>
  );
}