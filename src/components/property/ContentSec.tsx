

// "use client";

// import { useEffect, useState } from "react";
// import ContentCard from "./ContentCard";
// import MapView from "./MapView";
// import FilterSide from "./FilterSide";
// import { supabase } from "@/lib/supabaseclient";

// export default function ContentSec() {
//   const [selectedPropertyType, setSelectedPropertyType] =
//     useState("");

//   const [selectedAmenities, setSelectedAmenities] =
//     useState<string[]>([]);

//   const [location, setLocation] = useState("");

// const [minPrice, setMinPrice] = useState(0);
// const [maxPrice, setMaxPrice] = useState(100000);

//   const [view, setView] = useState<"grid" | "map">(
//     "grid"
//   );

//   const [data, setData] = useState<any[]>([]);

//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 6;
//   // FETCH APPROVED DATA
//   useEffect(() => {
//     fetchProperties();
//   }, []);

//   const fetchProperties = async () => {
//     const { data, error } = await supabase
//       .from("property")
//       .select("*")
//       .eq("status", "Approved");

//       console.log("fetchdata",data)

//     if (error) {
//       console.log(error);
//     } else {
//       setData(data || []);
//     }
//   };

//   // FILTER LOGIC
// const filteredData = data.filter((item) => {

//   // PROPERTY TYPE
//   const matchesProperty =
//     selectedPropertyType === "" ||
//     item.type?.toLowerCase() ===
//       selectedPropertyType.toLowerCase();

//   // PRICE
//   const matchesPrice =
//     Number(item.price) >= minPrice &&
//     Number(item.price) <= maxPrice;

//   // LOCATION
//   const matchesLocation =
//     location === "" ||
//     item.location
//       ?.toLowerCase()
//       .includes(location.toLowerCase());

//   // AMENITIES
//   const itemAmenities = item.amenities
//     ? item.amenities
//         .split(",")
//         .map((a: string) =>
//           a.trim().toLowerCase()
//         )
//     : [];

//   const matchesAmenities =
//     selectedAmenities.length === 0 ||
//     selectedAmenities.every((a) =>
//       itemAmenities.includes(
//         a.toLowerCase()
//       )
//     );

//   return (
//     matchesProperty &&
//     matchesPrice &&
//     matchesLocation &&
//     matchesAmenities
//   );
// });
//   // const filteredData = data;

//   console.log("FILTERED DATA:", filteredData);

//   return (
//     <section className="px-10 py-16">
//       <div className="flex gap-8">

//         {/* SIDEBAR */}
//         <FilterSide
//           selectedPropertyType={
//             selectedPropertyType
//           }
//           setSelectedPropertyType={
//             setSelectedPropertyType
//           }
//           selectedAmenities={
//             selectedAmenities
//           }
//           setSelectedAmenities={
//             setSelectedAmenities
//           }
//           minPrice={minPrice}
//           maxPrice={maxPrice}
//           setMinPrice={setMinPrice}
//           setMaxPrice={setMaxPrice}
//           location={location}
//           setLocation={setLocation}
//         />

//         {/* RIGHT SIDE */}
//         <div className="flex-1">

//           {/* HEADER */}
//           <div className="flex justify-between items-center mb-8">

//             <div>
//               <h1 className="text-6xl font-bold text-gray-900">
//                 Available Oasis
//               </h1>

//               <p className="text-gray-500 text-lg mt-2">
//                 Discover {filteredData.length} curated
//                 living spaces.
//               </p>
//             </div>

//             {/* VIEW TOGGLE */}
//             <div className="bg-green-600 rounded-full p-2 flex gap-3">

//               <button
//                 onClick={() =>
//                   setView("grid")
//                 }
//                 className={`px-8 py-3 rounded-full ${
//                   view === "grid"
//                     ? "bg-white text-black font-medium"
//                     : "text-white"
//                 }`}
//               >
//                 Grid
//               </button>

//               <button
//                 onClick={() =>
//                   setView("map")
//                 }
//                 className={`px-8 py-3 rounded-full ${
//                   view === "map"
//                     ? "bg-white text-black font-medium"
//                     : "text-white"
//                 }`}
//               >
//                 Map View
//               </button>
//             </div>
//           </div>

//           {/* CONTENT */}
//           {view === "grid" ? (
//             <div className="grid grid-cols-3 gap-6">
//               {filteredData.map((item) => (
//                 <div key={item.id}>
//                 <ContentCard
                  
//                   item={item}
//                 />
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <MapView data={filteredData} />
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }



"use client";

import { useEffect, useMemo, useState } from "react";
import ContentCard from "./ContentCard";
import MapView from "./MapView";
import FilterSide from "./FilterSide";
import { supabase } from "@/lib/supabaseclient";

export default function ContentSec() {
  const [selectedPropertyType, setSelectedPropertyType] =
    useState("");

  const [selectedAmenities, setSelectedAmenities] =
    useState<string[]>([]);

  const [location, setLocation] = useState("");

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);

  const [view, setView] = useState<"grid" | "map">(
    "grid"
  );

  const [data, setData] = useState<any[]>([]);

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // FETCH APPROVED DATA
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

  // FILTER LOGIC
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      // PROPERTY TYPE
      const matchesProperty =
        selectedPropertyType === "" ||
        item.type?.toLowerCase() ===
          selectedPropertyType.toLowerCase();

      // PRICE
      const matchesPrice =
        Number(item.price) >= minPrice &&
        Number(item.price) <= maxPrice;

      // LOCATION
      const matchesLocation =
        location === "" ||
        item.location
          ?.toLowerCase()
          .includes(location.toLowerCase());

      // AMENITIES
      const itemAmenities = item.amenities
        ? item.amenities
            .split(",")
            .map((a: string) =>
              a.trim().toLowerCase()
            )
        : [];

      const matchesAmenities =
        selectedAmenities.length === 0 ||
        selectedAmenities.every((a) =>
          itemAmenities.includes(
            a.toLowerCase()
          )
        );

      return (
        matchesProperty &&
        matchesPrice &&
        matchesLocation &&
        matchesAmenities
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

  // RESET PAGE WHEN FILTER CHANGES
  useEffect(() => {
    setCurrentPage(1);
  }, [
    selectedPropertyType,
    selectedAmenities,
    location,
    minPrice,
    maxPrice,
  ]);

  // PAGINATION LOGIC
  const totalPages = Math.ceil(
    filteredData.length / itemsPerPage
  );

  const startIndex =
    (currentPage - 1) * itemsPerPage;

  const endIndex = startIndex + itemsPerPage;

  const paginatedData = filteredData.slice(
    startIndex,
    endIndex
  );

  console.log("FILTERED DATA:", filteredData);

  return (
    <section className="px-10 py-16">
      <div className="flex gap-8">

        {/* SIDEBAR */}
        <FilterSide
          selectedPropertyType={
            selectedPropertyType
          }
          setSelectedPropertyType={
            setSelectedPropertyType
          }
          selectedAmenities={
            selectedAmenities
          }
          setSelectedAmenities={
            setSelectedAmenities
          }
          minPrice={minPrice}
          maxPrice={maxPrice}
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
          location={location}
          setLocation={setLocation}
        />

        {/* RIGHT SIDE */}
        <div className="flex-1">

          {/* HEADER */}
          <div className="flex justify-between items-center mb-8">

            <div>
              <h1 className="text-6xl font-bold text-gray-900">
                Available Oasis
              </h1>

              <p className="text-gray-500 text-lg mt-2">
                Discover {filteredData.length} curated
                living spaces.
              </p>
            </div>

            {/* VIEW TOGGLE */}
            <div className="bg-green-600 rounded-full p-2 flex gap-3">

              <button
                onClick={() =>
                  setView("grid")
                }
                className={`px-8 py-3 rounded-full ${
                  view === "grid"
                    ? "bg-white text-black font-medium"
                    : "text-white"
                }`}
              >
                Grid
              </button>

              <button
                onClick={() =>
                  setView("map")
                }
                className={`px-8 py-3 rounded-full ${
                  view === "map"
                    ? "bg-white text-black font-medium"
                    : "text-white"
                }`}
              >
                Map View
              </button>
            </div>
          </div>

          {/* CONTENT */}
          {view === "grid" ? (
            <>
              <div className="grid grid-cols-3 gap-6">
                {paginatedData.map((item) => (
                  <div key={item.id}>
                    <ContentCard item={item} />
                  </div>
                ))}
              </div>

              {/* PAGINATION */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-3 mt-10">

                  {/* PREV */}
                  <button
                    onClick={() =>
                      setCurrentPage((prev) =>
                        Math.max(prev - 1, 1)
                      )
                    }
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-xl border border-gray-300 disabled:opacity-50"
                  >
                    Prev
                  </button>

                  {/* PAGE NUMBERS */}
                  {[...Array(totalPages)].map(
                    (_, index) => {
                      const page = index + 1;

                      return (
                        <button
                          key={page}
                          onClick={() =>
                            setCurrentPage(page)
                          }
                          className={`w-10 h-10 rounded-xl ${
                            currentPage === page
                              ? "bg-green-600 text-white"
                              : "border border-gray-300"
                          }`}
                        >
                          {page}
                        </button>
                      );
                    }
                  )}

                  {/* NEXT */}
                  <button
                    onClick={() =>
                      setCurrentPage((prev) =>
                        Math.min(
                          prev + 1,
                          totalPages
                        )
                      )
                    }
                    disabled={
                      currentPage === totalPages
                    }
                    className="px-4 py-2 rounded-xl border border-gray-300 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <MapView data={filteredData} />
          )}
        </div>
      </div>
    </section>
  );
}