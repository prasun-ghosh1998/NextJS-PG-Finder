"use client";

import { supabase } from "@/lib/supabaseclient";
import { useEffect, useState } from "react";

export const UsersOwnersTable = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "user" | "owner">("all");

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

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this user?");

    if (!confirmDelete) return;

    const { error } = await supabase.from("registration").delete().eq("id", id);

    if (error) {
      console.log(error);
      return;
    }

    fetchUsers();
  };

  const filteredUsers = users.filter((user) => {
    if (filter === "all") return true;

    return user.role?.toLowerCase() === filter;
  });
  return (
    <div className="bg-white border border-gray-800 rounded-3xl p-6 overflow-x-auto">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-3xl font-semibold bg-gradient-to-r from-gray-950 via-gray-700 to-gray-500 bg-clip-text text-transparent">
          Users & Owner Details
        </h3>

        <div className="flex gap-3">
          <button
            onClick={() => setFilter("all")}
            className={`px-5 py-3 rounded-xl font-semibold transition-all ${
              filter === "all"
                ? "bg-green-500 text-black"
                : "bg-gray-800 text-white"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("user")}
            className={`px-5 py-3 rounded-xl font-semibold transition-all ${
              filter === "user"
                ? "bg-cyan-500 text-black"
                : "bg-gray-800 text-white"
            }`}
          >
            Users (
            {users.filter((u) => u.role?.toLowerCase() === "user").length})
          </button>

          <button
            onClick={() => setFilter("owner")}
            className={`px-5 py-3 rounded-xl font-semibold transition-all ${
              filter === "owner"
                ? "bg-purple-500 text-black"
                : "bg-gray-800 text-white"
            }`}
          >
            Owners (
            {users.filter((u) => u.role?.toLowerCase() === "owner").length})
          </button>
        </div>
      </div>

      <table className="w-full min-w-[1100px] text-white">
        <thead>
          <tr className="border-b border-gray-800 text-left text-black">
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
            filteredUsers.map((user) => (
              <tr key={user.id} className="border-b border-gray-400 ">
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
                      <p className="font-semibold text-black">{user.name}</p>

                      <p className="text-sm text-gray-400">
                        ID: #{user.id?.slice(0, 6)}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="text-gray-600">{user.email}</td>

                <td className="text-gray-600">{user.phone || "N/A"}</td>

                <td className="text-gray-600">{user.city || "Kolkata"}</td>

                {/* Role */}
                <td>
                  <span
                    className={`px-3 py-1 rounded-full font-medium ${
                      user.role?.toLowerCase() === "owner"
                        ? "bg-purple-500/20 text-purple-600"
                        : "bg-cyan-500/20 text-cyan-600"
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
                        : "bg-green-500/20 text-green-600"
                    }`}
                  >
                    {user.status || "Active"}
                  </span>
                </td>

                {/* Date */}
                <td className="text-gray-600">
                  {new Date(user.created_at).toLocaleDateString()}
                </td>

                {/* Actions */}
                <td>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleView(user)}
                      className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-sm"
                    >
                      View
                    </button>

                    <button
                      onClick={() => handleDelete(user.id)}
                      className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm"
                    >
                      Delete
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
