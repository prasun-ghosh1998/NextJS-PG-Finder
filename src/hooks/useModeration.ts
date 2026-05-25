"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseclient";

export interface Listing {
  id: number;
  type: string;
  image: string;
  tag: string;
  title: string;
  location: string;
  owner: string;
  badge: string;
  danger: boolean;

  status: "Pending" | "Approved" | "Rejected";
}

export const useModeration = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchListings();
  }, []);

  /* FETCH */

  async function fetchListings() {
    setLoading(true);

    const { data, error } = await supabase
      .from("property")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.log(error);

      setLoading(false);

      return;
    }

    if (data) {
      const formattedData = data.map((item: any) => ({
        id: item.id,

        type: (
          item.tag ||
          item.type ||
          "PG"
        ).toUpperCase(),

        image:
          item.image ||
          item.property_image,

        tag:
          item.tag ||
          item.type ||
          "PG",

        title:
          item.title ||
          item.property_name,

        location:
          item.location ||
          item.address,

        owner:
          item.name ||
          "Unknown Owner",

        badge:
          item.status || "Pending",

        status:
          item.status || "Pending",

        danger:
          item.status === "Rejected",
      }));

      setListings(formattedData);
    }

    setLoading(false);
  }

  /* ACTION */

  async function updateAction(
    id: number,
    action:
      | "Approved"
      | "Rejected"
  ) {
    const { error } = await supabase
      .from("property")
      .update({
        status: action,
        action: action,
      })
      .eq("id", id);

    if (error) {
      console.log(error);

      return;
    }

    fetchListings();
  }

  return {
    listings,
    loading,
    updateAction,
  };
};