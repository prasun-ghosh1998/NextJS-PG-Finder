"use client";

import ModerationCard from "@/components/adminDashboard/moderation/ModerationCard";
import ModerationHeader from "@/components/adminDashboard/moderation/ModerationHeader";
import { useModeration } from "@/hooks/useModeration";
import { useEffect, useState } from "react";

export default function ModerationPage() {
  const [selectedFilter, setSelectedFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);

  const { listings, loading, updateAction } = useModeration();

  const ITEMS_PER_PAGE = 4;

  const filteredListings =
    selectedFilter === "ALL"
      ? listings
      : listings.filter((item) =>
          item.type?.toUpperCase().includes(selectedFilter)
        );

  const totalPages = Math.ceil(filteredListings.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedListings = filteredListings.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedFilter]);

  return (
    <div className="flex min-h-[calc(100vh-80px)] flex-col rounded-3xl bg-white p-6 text-green">
      <ModerationHeader
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        total={filteredListings.length}
      />
 <div className="flex-1">
      {loading ? (
        <div className="py-20 text-center text-gray-400">Loading...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {paginatedListings.map((item) => (
              <ModerationCard
                key={item.id}
                id={item.id}
                image={item.image}
                tag={item.tag}
                title={item.title}
                location={item.location}
                owner={item.owner}
                badge={item.badge}
                status={item.status}
                danger={item.danger}
                action={updateAction}
              />
            ))}
          </div>

          <div className="mt-10 flex items-center justify-between">
            <p className="text-sm text-gray-400">
              Showing {paginatedListings.length} of {filteredListings.length} results
            </p>

            {totalPages > 1 && (
              <div className="flex items-center gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  className="rounded-xl border px-4 py-2 text-sm font-semibold text-green-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Prev
                </button>

                <span className="text-sm font-semibold text-gray-600">
                  {currentPage} / {totalPages}
                </span>

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  className="rounded-xl border px-4 py-2 text-sm font-semibold text-green-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
    </div>
  );
}