"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseclient";
import Image from "next/image";
import { Mail, Phone } from "lucide-react";

export default function TopUsers() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from("registration")
      .select("*")
      .eq("role", "user") // only users
      .limit(6);

    if (error) {
      console.log(error);
      return;
    }

    setUsers(data || []);
  };

  return (
    <div className="rounded-3xl bg-white p-6 shadow-lg">
  {/* Heading */}
  <div className="mb-6">
    <h2 className="text-3xl font-bold text-green-700">
      Top Users
    </h2>

    <p className="text-sm text-gray-500">
      Active platform users
    </p>
  </div>

  {/* List */}
  <div className="space-y-4">
    {users.map((user) => (
      <div
        key={user.id}
        className="flex items-center justify-between rounded-2xl border border-gray-100 bg-green-50 p-4 transition hover:shadow-lg"
      >
        {/* LEFT */}
        <div className="flex items-center gap-4">
          
          {/* Image */}
          <div className="h-16 w-16 overflow-hidden rounded-full border-4 border-green-200">
            <img
              src={
                user?.image ||
                "https://i.pravatar.cc"
              }
              alt="user"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Info */}
          <div>
            <h3 className="text-lg font-bold text-gray-800">
              {user?.name}
            </h3>

            <div className="mt-1 flex items-center gap-2 text-sm text-gray-600">
              <Mail size={14} className="text-green-600" />
              {user?.email}
            </div>

            <div className="mt-1 flex items-center gap-2 text-sm text-gray-600">
              <Phone size={14} className="text-green-600" />
              {user?.phone}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div>
          <p className="rounded-full bg-green-100 px-4 py-1 text-xs font-bold text-green-700">
            USER
          </p>
        </div>
      </div>
    ))}
  </div>
</div>
  );
}
