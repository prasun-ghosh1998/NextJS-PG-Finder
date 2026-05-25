"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseclient";

export default function RecentChats({
  ownerId,
  setSelectedConversation,
}: any) {

  const [chats, setChats] = useState<any[]>(
    []
  );

  // ---------------- FETCH CHATS ----------------

  const fetchChats = async () => {

    const { data, error } =
      await supabase
        .from("conversations")
        .select(`
          id,
          created_at,

          registration!conversations_user_id_fkey (
            name
          )
        `)
        .eq("owner_id", ownerId)
        .order("created_at", {
          ascending: false,
        });

    if (!error && data) {
      setChats(data);
    }
  };

  // ---------------- REALTIME ----------------

  useEffect(() => {
    fetchChats();

    const channel = supabase
      .channel("recent-chats")

      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "conversations",
        },

        () => {
          fetchChats();
        }
      )

      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="rounded-3xl bg-white p-5 shadow">

      <h2 className="mb-5 text-xl font-bold">
        Recent Chats
      </h2>

      <div className="space-y-3">

        {chats.map((chat: any) => (

          <div
            key={chat.id}
            onClick={() =>
              setSelectedConversation(
                chat.id
              )
            }
            className="cursor-pointer rounded-xl bg-gray-100 p-4 transition hover:bg-green-50"
          >

            <h3 className="font-semibold">
              {
                chat.registration?.name
              }
            </h3>

            <p className="text-sm text-gray-500">
              Last active now
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}