

"use client";

import { Slider } from "@heroui/react";

interface Props {
  selectedPropertyType: string;
  setSelectedPropertyType: (value: string) => void;

  selectedAmenities: string[];
  setSelectedAmenities: React.Dispatch<
    React.SetStateAction<string[]>
  >;

  minPrice: number;
  maxPrice: number;

  setMinPrice: (value: number) => void;
  setMaxPrice: (value: number) => void;

  location: string;
  setLocation: (value: string) => void;
}

const FilterSide = ({
  selectedPropertyType,
  setSelectedPropertyType,
  selectedAmenities,
  setSelectedAmenities,
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
  location,
  setLocation,
}: Props) => {

  const toggleAmenity = (a: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(a)
        ? prev.filter((x) => x !== a)
        : [...prev, a]
    );
  };

  return (
    <div className="w-[300px] bg-gradient-to-tl from-green-100 via-green-300 to-green-400 rounded-[30px] p-8 h-fit">

      <h2 className="text-3xl font-semibold mb-8 text-gray-700">
        Filters
      </h2>

      <div className="space-y-8">

        {/* LOCATION */}
        <div>
          <p className="text-sm font-semibold mb-3 text-black">
            LOCATION
          </p>

          <input
            type="text"
            value={location}
            onChange={(e) =>
              setLocation(e.target.value)
            }
            placeholder="Search location..."
            className="bg-white text-black rounded-full px-5 py-4 w-full outline-none"
          />
        </div>

        {/* BUDGET */}
        <div>
          <p className="text-sm font-semibold mb-3 text-black">
            MONTHLY BUDGET
          </p>

          <Slider
            step={500}
            minValue={0}
            maxValue={100000}
            value={[minPrice, maxPrice]}
            onChange={(value) => {
              const values = value as number[];

              setMinPrice(values[0]);
              setMaxPrice(values[1]);
            }}
            // classNames={{
            //   base: "max-w-full",
            //   track: "bg-white/40 h-2",
            //   filler: "bg-green-800",
            //   thumb:
            //     "w-5 h-5 bg-white border-4 border-green-800 shadow-lg",
            // }}
          />

          <div className="flex justify-between mt-4 text-sm text-gray-700 font-medium">
            <span>${minPrice}</span>
            <span>${maxPrice}</span>
          </div>
        </div>

        {/* PROPERTY TYPE */}
        <div>
          <p className="text-sm text-black font-semibold mb-4">
            PROPERTY TYPE
          </p>

          <div className="space-y-3">

            <p
              onClick={() =>
                setSelectedPropertyType("")
              }
              className={`cursor-pointer ${
                selectedPropertyType === ""
                  ? "text-green-700 font-semibold"
                  : "text-black"
              }`}
            >
              {selectedPropertyType === ""
                ? "●"
                : "○"}{" "}
              All
            </p>
{["pg", "flat"].map((type) => (
  <p
    key={type}
    onClick={() =>
      setSelectedPropertyType(type)
    }
    className={`cursor-pointer transition ${
      selectedPropertyType === type
        ? "text-green-700 font-semibold"
        : "text-black"
    }`}
  >
    {selectedPropertyType === type
      ? "●"
      : "○"}{" "}
    {type.charAt(0).toUpperCase() + type.slice(1)}
  </p>
))}
            {/* {["PG", "Flat"].map((type) => (
              <p
                key={type}
                onClick={() =>
                  setSelectedPropertyType(type)
                }
                className={`cursor-pointer transition ${
                  selectedPropertyType === type
                    ? "text-green-700 font-semibold"
                    : "text-black"
                }`}
              >
                {selectedPropertyType === type
                  ? "●"
                  : "○"}{" "}
                {type}
              </p>
            ))} */}
          </div>
        </div>

        {/* AMENITIES */}
        <div>
          <p className="text-sm font-semibold mb-4 text-black">
            AMENITIES
          </p>

          <div className="flex flex-wrap gap-3 text-black">
            {["wifi", "gym", "ac"].map((a) => (
              <span
                key={a}
                onClick={() => toggleAmenity(a)}
                className={`px-4 py-2 rounded-full cursor-pointer transition ${
                  selectedAmenities.includes(a)
                    ? "bg-green-700 text-white"
                    : "bg-gray-200"
                }`}
              >
                {a}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default FilterSide;