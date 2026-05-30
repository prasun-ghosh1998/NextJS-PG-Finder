"use client";

import { useEffect, useMemo, useState } from "react";
import ContentCard from "./ContentCard";
import MapView from "./MapView";
import FilterSide from "./FilterSide";
import { supabase } from "@/lib/supabaseclient";

export default function ContentSec() {
  const [selectedPropertyType, setSelectedPropertyType] = useState("");

  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const [location, setLocation] = useState("");

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);

  const [view, setView] = useState<"grid" | "map">("grid");

  const [data, setData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    const { data, error } = await supabase
      .from("property")
      .select("*")
      .eq("status", "Approved");

    console.log("fetchdata", data);

    if (error) {
      console.log(error);
    } else {
      setData(data || []);
    }
  };

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesProperty =
        selectedPropertyType === "" ||
        item.type?.toLowerCase() === selectedPropertyType.toLowerCase();

      const matchesPrice =
        Number(item.price) >= minPrice && Number(item.price) <= maxPrice;

      const matchesLocation =
        location === "" ||
        item.location?.toLowerCase().includes(location.toLowerCase());

      const itemAmenities = item.amenities
        ? item.amenities.split(",").map((a: string) => a.trim().toLowerCase())
        : [];

      const matchesAmenities =
        selectedAmenities.length === 0 ||
        selectedAmenities.every((a) => itemAmenities.includes(a.toLowerCase()));

      return (
        matchesProperty && matchesPrice && matchesLocation && matchesAmenities
      );
    });
  }, [
    data,
    selectedPropertyType,
    minPrice,
    maxPrice,
    location,
    selectedAmenities,
  ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedPropertyType, selectedAmenities, location, minPrice, maxPrice]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const endIndex = startIndex + itemsPerPage;

  const paginatedData = filteredData.slice(startIndex, endIndex);

  console.log("FILTERED DATA:", filteredData);

  return (
    <section className="px-4 py-10 sm:px-6 lg:px-10 lg:py-16">
  <div className=" items-center flex flex-col gap-8 lg:flex-row">
    <FilterSide
      selectedPropertyType={selectedPropertyType}
      setSelectedPropertyType={setSelectedPropertyType}
      selectedAmenities={selectedAmenities}
      setSelectedAmenities={setSelectedAmenities}
      minPrice={minPrice}
      maxPrice={maxPrice}
      setMinPrice={setMinPrice}
      setMaxPrice={setMaxPrice}
      location={location}
      setLocation={setLocation}
    />

    <div className="w-full flex-1">
      <div className="mb-8 flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl">
            Available Oasis
          </h1>

          <p className="mt-2 text-base text-gray-500 sm:text-lg">
            Discover {filteredData.length} curated living spaces.
          </p>
        </div>

        <div className="flex w-full gap-2 rounded-full bg-green-600 p-2 sm:w-fit">
          <button
            onClick={() => setView("grid")}
            className={`flex-1 rounded-full px-6 py-3 text-sm sm:flex-none sm:px-8 ${
              view === "grid"
                ? "bg-white font-medium text-black"
                : "text-white"
            }`}
          >
            Grid
          </button>

          <button
            onClick={() => setView("map")}
            className={`flex-1 rounded-full px-6 py-3 text-sm sm:flex-none sm:px-8 ${
              view === "map"
                ? "bg-white font-medium text-black"
                : "text-white"
            }`}
          >
            Map View
          </button>
        </div>
      </div>

      {view === "grid" ? (
        <>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {paginatedData.map((item) => (
              <ContentCard key={item.id} item={item} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.max(prev - 1, 1))
                }
                disabled={currentPage === 1}
                className="rounded-xl border border-gray-300 px-4 py-2 disabled:opacity-50"
              >
                Prev
              </button>

              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;

                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`h-10 w-10 rounded-xl ${
                      currentPage === page
                        ? "bg-green-600 text-white"
                        : "border border-gray-300"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              <button
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(prev + 1, totalPages)
                  )
                }
                disabled={currentPage === totalPages}
                className="rounded-xl border border-gray-300 px-4 py-2 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="overflow-hidden rounded-3xl">
          <MapView data={filteredData} />
        </div>
      )}
    </div>
  </div>
</section>
  );
}
