"use client";

import { useEffect, useState } from "react";
import OwnerDetails from "../OwnersDetailsModal";
import { Heart, IndianRupee, MapPin, User } from "lucide-react";
import { supabase } from "@/lib/supabaseclient";

export default function ContentCard({ item }: any) {
  const [open, setOpen] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    checkWishlist();
  }, [item?.id]);

  const checkWishlist = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user || !item?.id) return;

    const { data } = await supabase
      .from("wishlist")
      .select("id")
      .eq("user_id", user.id)
      .eq("property_id", item.id)
      .maybeSingle();

    setWishlisted(!!data);
  };

  const handleWishlist = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please login first");
      return;
    }

    try {
      if (wishlisted) {
        const { error } = await supabase
          .from("wishlist")
          .delete()
          .eq("user_id", user.id)
          .eq("property_id", item.id);

        if (error) throw error;

        setWishlisted(false);
      } else {
        const { error } = await supabase.from("wishlist").insert({
          user_id: user.id,
          property_id: item.id,
        });

        if (error) throw error;

        setWishlisted(true);
      }
    } catch (error) {
      console.log("Wishlist Error:", error);
    }
  };
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition duration-300">
      <div className="relative h-56 w-full">
        <img
          src={item.image || "/placeholder.jpg"}
          alt={item.title}
          className="w-full h-full object-cover"
        />
         <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-pink-50 transition"
        >
          <Heart
            className={`h-5 w-5 transition ${
              wishlisted
                ? "fill-pink-500 text-pink-500"
                : "text-gray-500"
            }`}
          />
        </button>
        <p className="absolute top-3 left-3 text-sm text-white bg-green-600 px-4 py-1 rounded-2xl">{item.type}</p>
      </div>

      <div className="p-5 space-y-3">
        <div className="flex items-start justify-between">
          <h2 className="text-xl text-gray-900 font-semibold">{item.title}</h2>

          <p className="flex gap-1 items-center text-green-700 font-bold text-lg"><IndianRupee className="size-5" />{item.price}</p>
        </div>

        <div className="flex gap-3 text-gray-600 text-sm"><MapPin className=" size-5 text-green-700" />{item.location}</div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500"><User className="text-green-700 size-5" /></span>
          <span className="text-sm font-medium text-gray-500">
            {item.name}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          {item.amenities?.split(",").map((a: string, i: number) => (
            <span
              key={i}
              className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full"
            >
              {a}
            </span>
          ))}

          <button
            onClick={() => setOpen(true)}
            className="w-full mt-4 px-4 py-2 rounded-full bg-gradient-to-r from-green-700 to-green-400 text-white hover:from-green-900"
          >
            Owner Details
          </button>
          <OwnerDetails
            open={open}
            onClose={() => setOpen(false)}
            owner={{
              name: item.name,
              email: item.email,
              phone: item.phone,
            }}
            property={{
              id: item.id,
              title: item.title,
              location: item.location,
            }}
          />
        </div>
      </div>
    </div>
  );
}
