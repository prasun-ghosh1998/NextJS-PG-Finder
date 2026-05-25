"use client";

import Image from "next/image";
import { MapPin, User } from "lucide-react";
import { useState } from "react";
import OwnerDetails from "../OwnersDetailsModal";

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

  return (
    <>
      <div className="bg-[#F5F6FB] rounded-3xl shadow-md overflow-hidden hover:shadow-xl transition">
        <div className="relative h-[200px]">
          <Image src={image} alt={title} fill className="object-cover" />

          <div className="absolute top-3 left-3 bg-green-400 text-xs px-3 py-1 rounded-full flex items-center gap-1 font-medium">
            ✔ Verified Host
          </div>
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
            {tags.map((tag, i) => (
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