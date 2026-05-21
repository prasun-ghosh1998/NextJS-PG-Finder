"use client";


import Room1 from "@/assets/images/landingPage/room1.png";
import Room2 from "@/assets/images/landingPage/room2.png";
import Room3 from "@/assets/images/landingPage/room3.png";
import PropertyCard from "./PropertyCard";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseclient";
import { log } from "console";

export default function PropartyListings() {
  // const listings = [
  //   {
  //     title: "The Nordic Studio",
  //     price: "$1,200",
  //     location: "Brooklyn, NY",
  //     image: Room1,
  //     tags: ["WiFi", "Kitchen", "AC"],
  //   },
  //   {
  //     title: "Skyline Loft",
  //     price: "$1,850",
  //     location: "Chelsea, NY",
  //     image: Room2,
  //     tags: ["Gym", "Laundry", "24/7 Concierge"],
  //   },
  //   {
  //     title: "Artisan Commons",
  //     price: "$950",
  //     location: "Astoria, Queens",
  //     image: Room3,
  //     tags: ["Balcony", "Parking", "Cleaning"],
  //   },
  // ];

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
      console.log("Fetched Properties:", data);

    if (error) {
      console.log(error);
      return;
    }

    setListings(data);
  };

  return (
    <section className="px-10 py-16 bg-[#F7F8FC]">

      {/* Header */}
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Handpicked for your lifestyle.
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Curated collections based on the most requested living conditions in the city.
          </p>
        </div>

        <Link  href="/property" className="text-green-600 text-sm font-medium hover:underline">
          View all properties →
        </Link>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* {listings.map((item, i) => (
          <PropertyCard key={i} {...item} />
        ))} */}
         {listings.map((item) => (
          <PropertyCard
            key={item.id}
            title={item.title}
            price={item.price}
            location={item.location}
            image={item.image}
            tags={item.tag ? [item.tag] : []}
          />
        ))}
      </div>
    </section>
  );
}