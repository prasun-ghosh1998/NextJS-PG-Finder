"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";

export default function PriceRange() {
  const [priceRange, setPriceRange] = useState([5000, 50000]);

  return (
    <div className="w-full space-y-5 rounded-3xl border bg-white p-5 shadow-sm">
      <div>
        <h2 className="text-lg font-semibold">
          Price Range
        </h2>

        <p className="text-sm text-gray-500">
          Select your monthly rent
        </p>
      </div>

      <Slider
        defaultValue={[1000, 10000]}
        min={0}
        max={100000}
        step={500}
        value={priceRange}
        onValueChange={(value) =>
          setPriceRange(value)
        }
      />

      <div className="flex items-center justify-between text-sm font-medium">
        <div className="rounded-xl bg-green-50 px-4 py-2 text-green-700">
          ₹{priceRange[0]}
        </div>

        <div className="rounded-xl bg-green-50 px-4 py-2 text-green-700">
          ₹{priceRange[1]}
        </div>
      </div>
    </div>
  );
}