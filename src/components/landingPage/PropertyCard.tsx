"use client";

import Image from "next/image";
import { MapPin } from "lucide-react";

interface Props {
  title: string;
  price: string;
  location: string;
  image: any;
  tags: string[];
}

export default function PropertyCard({
  title,
  price,
  location,
  image,
  tags,
}: Props) {
  return (
    <div className="bg-[#F5F6FB] rounded-3xl shadow-md overflow-hidden hover:shadow-xl transition">

      {/* Image */}
      <div className="relative h-[200px]">
        <Image src={image} alt={title} fill className="object-cover" />

        {/* Badge */}
        <div className="absolute top-3 left-3 bg-green-400 text-xs px-3 py-1 rounded-full flex items-center gap-1 font-medium">
          ✔ Verified Host
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">

        <div className="flex justify-between">
          <h3 className="font-semibold text-gray-800">{title}</h3>
          <p className="text-green-600 font-semibold">
            {price}
            <span className="text-gray-500 text-sm">/month</span>
          </p>
        </div>

        <div className="flex items-center gap-1 text-gray-500 text-sm">
          <MapPin className="text-green-600" size={14} />
          {location}
        </div>

        <div className="flex gap-2 flex-wrap pt-1">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="bg-[#D9DBF3] text-xs px-3 py-1 rounded-full text-gray-700"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}