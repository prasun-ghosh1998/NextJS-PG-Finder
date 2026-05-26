"use client";

import { useEffect, useState } from "react";
import OwnerDetails from "../OwnersDetailsModal";
import PropertyDetailsModal from "../PropertyDetailsModal";
import { Heart, IndianRupee, MapPin, Star, User } from "lucide-react";
import { supabase } from "@/lib/supabaseclient";

export default function ContentCard({ item }: any) {
  const [propertyOpen, setPropertyOpen] = useState(false);
  const [ownerOpen, setOwnerOpen] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const [avgRating, setAvgRating] = useState(0);

  useEffect(() => {
    checkWishlist();

    if (item?.id) {
      fetchAverageRating();
    }
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

  const fetchAverageRating = async () => {
    const { data, error } = await supabase
      .from("property_ratings")
      .select("rating")
      .eq("property_id", item.id);

    if (error) {
      console.log(error);
      return;
    }

    if (!data || data.length === 0) {
      setAvgRating(0);
      return;
    }

    const total = data.reduce(
      (sum: number, current: any) => sum + current.rating,
      0,
    );

    setAvgRating(total / data.length);
  };

  const handleWishlist = async (e: React.MouseEvent<HTMLButtonElement>) => {
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

  const handleOwnerDetails = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setOwnerOpen(true);
  };

  return (
    <>
      <div
        onClick={() => setPropertyOpen(true)}
        className="cursor-pointer bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition duration-300"
      >
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
                wishlisted ? "fill-pink-500 text-pink-500" : "text-gray-500"
              }`}
            />
          </button>

          <p className="absolute top-3 left-3 text-sm text-white bg-green-600 px-4 py-1 rounded-2xl">
            {item.type}
          </p>
        </div>

        <div className="p-5 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-xl text-gray-900 font-semibold">
                {item.title}
              </h2>
            </div>

            <p className="flex gap-1 items-center text-green-700 font-bold text-lg">
              <IndianRupee className="size-5" />
              {item.price}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex gap-3 text-gray-600 text-sm">
              <MapPin className="size-5 text-green-700" />
              {item.location}
            </div>
            <div className=" flex items-center gap-1">
              <Star className="size-4 fill-yellow-400 text-yellow-400" />

              <span className="text-sm font-medium text-gray-700">
                {avgRating ? avgRating.toFixed(1) : "0.0"}
              </span>

              <span className="text-xs text-gray-400">Rating</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <User className="text-green-700 size-5" />
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
                {a.trim()}
              </span>
            ))}
          </div>

          <button
            onClick={handleOwnerDetails}
            className="w-full mt-4 px-4 py-2 rounded-full bg-gradient-to-r from-green-700 to-green-400 text-white hover:from-green-900"
          >
            Owner Details
          </button>
        </div>
      </div>

      <PropertyDetailsModal
        open={propertyOpen}
        onClose={() => {
          setPropertyOpen(false);
          fetchAverageRating();
        }}
        item={item}
      />

      <OwnerDetails
        open={ownerOpen}
        onClose={() => setOwnerOpen(false)}
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
    </>
  );
}
