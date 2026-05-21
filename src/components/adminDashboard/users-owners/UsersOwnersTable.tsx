"use client";

import { supabase } from "@/lib/supabaseclient";
import { useEffect, useState } from "react";

export const UsersOwnersTable = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("registration")
      .select("*")
      .in("role", ["user", "owner"])
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
    } else {
      setUsers(data || []);
    }

    setLoading(false);
  };

  const handleView = (user: any) => {
    alert(`
Name: ${user.name}
Email: ${user.email}
Phone: ${user.phone || "N/A"}
City: ${user.city || "Kolkata"}
Role: ${user.role}
Status: ${user.status || "Active"}
    `);
  };
  return (
    <div className="bg-[#111827] border border-gray-800 rounded-3xl p-6 overflow-x-auto">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-semibold text-white">
          Users & Owner Details
        </h3>

        <div className="flex gap-3">
          <button className="bg-cyan-500 hover:bg-cyan-400 text-black px-5 py-3 rounded-xl font-semibold transition-all">
            Users (
            {users.filter((u) => u.role?.toLowerCase() === "user").length})
          </button>

          <button className="bg-purple-500 hover:bg-purple-400 text-black px-5 py-3 rounded-xl font-semibold transition-all">
            Owners (
            {users.filter((u) => u.role?.toLowerCase() === "owner").length})
          </button>
        </div>
      </div>

      <table className="w-full min-w-[1100px] text-white">
        <thead>
          <tr className="border-b border-gray-800 text-left text-gray-400">
            <th className="py-4">Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>City</th>
            <th>Role</th>
            <th>Status</th>
            <th>Joined</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {!loading &&
            users.map((user) => (
              <tr
                key={user.id}
                className="border-b border-gray-800 hover:bg-[#1E293B] transition-all"
              >
                {/* Name */}
                <td className="py-5">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-black ${
                        user.role?.toLowerCase() === "owner"
                          ? "bg-purple-500"
                          : "bg-cyan-500"
                      }`}
                    >
                      {user.name?.charAt(0)?.toUpperCase()}
                    </div>

                    <div>
                      <p className="font-semibold">{user.name}</p>

                      <p className="text-sm text-gray-400">
                        ID: #{user.id?.slice(0, 6)}
                      </p>
                    </div>
                  </div>
                </td>

                <td>{user.email}</td>

                <td>{user.phone || "N/A"}</td>

                <td>{user.city || "Kolkata"}</td>

                {/* Role */}
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      user.role?.toLowerCase() === "owner"
                        ? "bg-purple-500/20 text-purple-400"
                        : "bg-cyan-500/20 text-cyan-400"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>

                {/* Status */}
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      user.status === "Blocked"
                        ? "bg-red-500/20 text-red-400"
                        : "bg-green-500/20 text-green-400"
                    }`}
                  >
                    {user.status || "Active"}
                  </span>
                </td>

                {/* Date */}
                <td>{new Date(user.created_at).toLocaleDateString()}</td>

                {/* Actions */}
                <td>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleView(user)}
                      className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-sm"
                    >
                      View
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Loading */}
      {loading && (
        <div className="text-center py-20 text-gray-400">Loading users...</div>
      )}

      {/* Empty */}
      {!loading && users.length === 0 && (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold text-gray-400">
            No Users Found
          </h2>
        </div>
      )}
    </div>
  );
};
