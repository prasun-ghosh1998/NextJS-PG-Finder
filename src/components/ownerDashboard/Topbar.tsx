"use client";

// import { Bell } from "lucide-react";

import {
  Bell,
  ChevronDown,
} from "lucide-react";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseclient";

export default function Topbar() {
  const [owner, setOwner] = useState<any>(null);

  useEffect(() => {
    fetchOwner();
  }, []);

  const fetchOwner = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    // Fetch registration data

    const { data, error } = await supabase
      .from("registration")
      .select("*")
      .eq("email", user.email)
      .single();

    if (error) {
      console.log(error.message);
      return;
    }

    setOwner(data);
  };

  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

      {/* LEFT */}
      <div>
        <h2 className="text-4xl font-bold bg-gradient-to-b from-green-800 via-green-600 to-green-400 bg-clip-text text-transparent">
          Owner Dashboard
        </h2>

        <p className="text-gray-500 mt-2">
          Manage your properties and inquiries.
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        {/* BELL */}
        <button className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center relative text-white">
          <Bell size={20} />

          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500"></span>
        </button>

        {/* PROFILE */}
        <div className="flex items-center gap-3 bg-zinc-900 px-4 py-2 rounded-2xl">

          {/* Avatar */}
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 text-white flex items-center justify-center font-bold uppercase">
            {owner?.name?.charAt(0) || "O"}
          </div>

          {/* Info */}
          <div>
            <h4 className="font-semibold text-white">
              {owner?.name || "Owner"}
            </h4>

            <p className="text-sm text-gray-400">
              {owner?.role || "Owner"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}