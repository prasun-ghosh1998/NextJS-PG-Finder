"use client";

import Image from "next/image";
import { Heart, MapPin, User } from "lucide-react";
import { useEffect, useState } from "react";
import OwnerDetails from "../OwnersDetailsModal";
import { supabase } from "@/lib/supabaseclient";

interface Props {
  title: string;
  price: string;
  location: string;
  image: string;
  tags: string[];
  owner: any;
  property: any;
}

export default function PropertyCard({
  title,
  price,
  location,
  image,
  tags,
  owner,
  property,
}: Props) {
  const [open, setOpen] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    checkWishlist();
  }, [property?.id]);

  const checkWishlist = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user || !property?.id) return;

    const { data, error } = await supabase
      .from("wishlist")
      .select("id")
      .eq("user_id", user.id)
      .eq("property_id", property.id)
      .maybeSingle();

    if (error) {
      console.log("Check wishlist error:", error);
      return;
    }

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

    if (!property?.id) {
      alert("Property id not found");
      return;
    }

    if (wishlisted) {
      const { error } = await supabase
        .from("wishlist")
        .delete()
        .eq("user_id", user.id)
        .eq("property_id", property.id);

      if (error) {
        console.log("Remove wishlist error:", error);
        return;
      }

      setWishlisted(false);
    } else {
      const { error } = await supabase.from("wishlist").insert({
        user_id: user.id,
        property_id: property.id,
      });

      if (error) {
        console.log("Add wishlist error:", error);
        return;
      }

      setWishlisted(true);
    }
  };

  return (
    <>
      <div className="bg-[#F5F6FB] rounded-3xl shadow-md overflow-hidden hover:shadow-xl transition">
        <div className="relative h-[200px]">
          <Image
            src={image || "/placeholder.jpg"}
            alt={title}
            fill
            className="object-cover"
          />

          <div className="absolute top-3 left-3 bg-green-400 text-xs px-3 py-1 rounded-full flex items-center gap-1 font-medium">
            ✔ Verified Host
          </div>

          <button
            onClick={handleWishlist}
            className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-pink-50 transition"
          >
            <Heart
              className={`h-5 w-5 transition ${
                wishlisted
                  ? "fill-green-600 text-green-600"
                  : "text-gray-500"
              }`}
            />
          </button>
        </div>

        <div className="p-4 space-y-3">
          <div className="flex justify-between gap-3">
            <h3 className="font-semibold text-gray-800">{title}</h3>

            <p className="text-green-600 font-semibold whitespace-nowrap">
              ₹{price}
              <span className="text-gray-500 text-sm">/month</span>
            </p>
          </div>

          <div className="flex items-center gap-1 text-gray-500 text-sm">
            <MapPin className="text-green-600" size={14} />
            {location}
          </div>

          <div className="flex items-center gap-2 rounded-2xl bg-white border p-3">
            <User size={16} className="text-green-600" />
            <p className="text-sm font-semibold text-gray-800">
              {owner?.name || "Owner Name"}
            </p>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="w-full px-4 py-2 rounded-full bg-gradient-to-r from-green-700 to-green-400 text-white hover:from-green-900"
          >
            Owner Details
          </button>

          <div className="flex gap-2 flex-wrap pt-1">
            {tags?.map((tag, i) => (
              <span
                key={i}
                className="bg-[#D9DBF3] text-xs px-3 py-1 rounded-full text-gray-700"
              >
                {tag.trim()}
              </span>
            ))}
          </div>
        </div>
      </div>

      <OwnerDetails
        open={open}
        onClose={() => setOpen(false)}
        owner={owner}
        property={property}
      />
    </>
  );
}