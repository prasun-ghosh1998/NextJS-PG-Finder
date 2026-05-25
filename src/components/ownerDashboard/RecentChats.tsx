"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseclient";

export default function RecentChats({ ownerId, setSelectedConversation }: any) {
  const [chats, setChats] = useState<any[]>([]);

  const fetchChats = async () => {
    if (!ownerId) return;

    const { data, error } = await supabase
      .from("conversations")
      .select(`
        id,
        created_at,
        user_id,
        owner_id,
        property_id,
        user:registration!conversations_user_id_fkey (
          name,
          email
        )
      `)
      .eq("owner_id", ownerId)
      .order("created_at", { ascending: false });

    if (error) {
      console.log("Recent chat error:", error);
      return;
    }

    setChats(data || []);
  };

  useEffect(() => {
    fetchChats();

    const channel = supabase
      .channel("recent-chats-owner")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "conversations",
        },
        () => fetchChats()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [ownerId]);

  return (
    <div className="rounded-3xl bg-white p-5 shadow">
      <h2 className="mb-5 text-xl font-bold">Recent Chats</h2>

      <div className="space-y-3">
        {chats.length === 0 && (
          <p className="text-sm text-gray-400">No chats yet</p>
        )}

        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => setSelectedConversation(chat.id)}
            className="cursor-pointer rounded-xl bg-gray-100 p-4 transition hover:bg-green-50"
          >
            <h3 className="font-semibold">
              {chat.user?.name || "User"}
            </h3>
            <p className="text-sm text-gray-500">
              {chat.user?.email || "No email"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}