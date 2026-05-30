"use client";

import { supabase } from "@/lib/supabaseclient";
import {
  Building2,
  Eye,
  MessageCircle,
  Wallet,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function StatsCards() {


 const [stats, setStats] = useState({
    listings: 0,
    inquiries: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const { count: listingsCount, error: listingsError } = await supabase
      .from("property")
      .select("*", { count: "exact", head: true });

    const { count: inquiriesCount, error: inquiriesError } = await supabase
      .from("inquiries") // change table name if different
      .select("*", { count: "exact", head: true });

    if (listingsError || inquiriesError) {
      console.error(listingsError || inquiriesError);
      return;
    }

    setStats({
      listings: listingsCount || 0,
      inquiries: inquiriesCount || 0,
    });
  };

  const cards = [
    {
      title: "Total Listings",
      value: stats.listings,
      icon: Building2,
      color: "bg-indigo-500",
    },
    {
      title: "Inquiries",
      value: stats.inquiries,
      icon: MessageCircle,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-2 gap-6">
      {cards.map((item, i) => (
        <div
          key={i}
          className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100"
        >
          <div
            className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center text-white`}
          >
            <item.icon size={28} />
          </div>

          <h3 className="text-gray-500 mt-5">
            {item.title}
          </h3>

          <p className="text-4xl font-bold text-gray-800 mt-2">
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
}