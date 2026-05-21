"use client";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabaseclient";
import StatCard from "./StateCard";

export default function DashboardStats() {
  const [stats, setStats] = useState({
    users: 0,
    listings: 0,
    usersGrowth: 0,
    listingsGrowth: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    // TOTAL USERS
    const { count: usersCount } = await supabase
      .from("registration")
      .select("*", { count: "exact", head: true });

    // TOTAL LISTINGS
    const { count: propertiesCount } = await supabase
      .from("property")
      .select("*", { count: "exact", head: true });

    // YESTERDAY DATE
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    // USERS BEFORE TODAY
    const { count: yesterdayUsers } = await supabase
      .from("registration")
      .select("*", { count: "exact", head: true })
      .lt("created_at", yesterday.toISOString());

    // LISTINGS BEFORE TODAY
    const { count: yesterdayProperties } = await supabase
      .from("property")
      .select("*", { count: "exact", head: true })
      .lt("created_at", yesterday.toISOString());

    // DAILY GROWTH %
    const usersGrowth =
      yesterdayUsers && yesterdayUsers > 0
        ? (((usersCount || 0) - yesterdayUsers) / yesterdayUsers) * 100
        : 0;

    const listingsGrowth =
      yesterdayProperties && yesterdayProperties > 0
        ? (((propertiesCount || 0) - yesterdayProperties) /
            yesterdayProperties) *
          100
        : 0;

    setStats({
      users: usersCount || 0,
      listings: propertiesCount || 0,
      usersGrowth,
      listingsGrowth,
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4 mb-6">
      <StatCard
        title="Total Users"
        value={stats.users}
        growth={`${stats.usersGrowth.toFixed(1)}%`}
      />

      <StatCard
        title="Total Listings"
        value={stats.listings}
        growth={`${stats.listingsGrowth.toFixed(1)}%`}
      />
    </div>
  );
}