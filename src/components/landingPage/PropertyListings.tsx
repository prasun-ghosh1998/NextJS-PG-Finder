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
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Handpicked for your lifestyle.
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Curated collections based on the most requested living conditions in
            the city.
          </p>
        </div>

        <Link
          href="/property"
          className="text-green-600 text-sm font-medium hover:underline"
        >
          View all properties →
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