"use client";

import { useState } from "react";
import OwnerDetails from "../OwnersDetailsModal";

export default function ContentCard({ item }: any) {
  const [open, setOpen] = useState(false);
  console.log("item data",item);
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition duration-300">
      <div className="relative h-56 w-full">
        <img
          src={item.image || "/placeholder.jpg"}
          alt={item.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-5 space-y-3">
        <div className="flex items-start justify-between">
          <h2 className="text-xl text-gray-900 font-semibold">{item.title}</h2>

          <p className="text-green-700 font-bold text-lg">${item.price}</p>
        </div>

        <p className="text-sm text-gray-500">{item.type}</p>

        <div className="text-gray-600 text-sm">{item.location}</div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Owner:</span>
          <span className="text-sm font-medium text-green-700">{item.name}</span>
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
            className="w-full px-4 py-2 rounded-full bg-gradient-to-r from-green-700 to-green-400 text-white hover:from-green-900"
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
