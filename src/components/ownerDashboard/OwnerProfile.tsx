"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { supabase } from "@/lib/supabaseclient";

type OwnerType = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export default function OwnerProfile() {
  const [owner, setOwner] = useState<OwnerType | null>(null);

  useEffect(() => {
    fetchOwner();
  }, []);

  const fetchOwner = async () => {
    // Get logged in user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      console.log("No logged in user");
      return;
    }

    // Fetch owner details from registration table
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

  if (!owner) {
    return (
      <div className="text-white text-sm">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl px-4 py-2 flex items-center justify-between">

      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 text-white flex items-center justify-center font-bold text-lg uppercase">
          {owner.name?.charAt(0)}
        </div>

        {/* Info */}
        <div>
          <h4 className="font-semibold text-gray-800">
            {owner.name}
          </h4>

          <p className="text-sm text-gray-500">
            {owner.role}
          </p>
        </div>
      </div>

      <ChevronDown
        size={18}
        className="text-gray-600"
      />
    </div>
  );
}