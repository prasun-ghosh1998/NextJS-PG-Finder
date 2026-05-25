"use client";

import ModerationCard from "@/components/adminDashboard/moderation/ModerationCard";
import ModerationHeader from "@/components/adminDashboard/moderation/ModerationHeader";
import { useModeration } from "@/hooks/useModeration";
import { useState } from "react";


export default function ModerationPage() {
  const [selectedFilter, setSelectedFilter] =
    useState("ALL");

  const {
    listings,
    loading,
    updateAction,
  } = useModeration();

  /* FILTER */

  const filteredListings =
    selectedFilter === "ALL"
      ? listings
      : listings.filter((item) =>
          item.type
            ?.toUpperCase()
            .includes(selectedFilter)
        );

  return (
    <div className="min-h-screen bg-[#0B1220] text-white p-6">
      {/* HEADER */}

      <ModerationHeader
        selectedFilter={
          selectedFilter
        }
        setSelectedFilter={
          setSelectedFilter
        }
        total={filteredListings.length}
      />

      {/* LOADING */}

      {loading ? (
        <div className="text-center py-20 text-gray-400">
          Loading...
        </div>
      ) : (
        <>

          <div className="grid grid-cols-2 gap-6">
            {filteredListings.map(
              (item) => (
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
                  action={
                    updateAction
                  }
                />
              )
            )}
          </div>

          {/* FOOTER */}

          <div className="flex justify-between items-center mt-10">
            <p className="text-gray-400 text-sm">
              Showing{" "}
              {
                filteredListings.length
              }{" "}
              results
            </p>
          </div>
        </>
      )}
    </div>
  );
}