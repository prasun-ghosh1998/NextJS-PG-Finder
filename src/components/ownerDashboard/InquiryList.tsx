"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseclient";

export default function InquiryList({
  ownerId,
  setSelectedConversation,
}: any) {

  const [inquiries, setInquiries] =
    useState<any[]>([]);

  // ---------------- FETCH ----------------

  const fetchInquiries = async () => {

    const { data, error } =
      await supabase
        .from("messages")
        .select(`
          id,
          message,
          is_seen,
          created_at,
          conversation_id,
          sender_id,

          conversations (
            id,

            registration!conversations_user_id_fkey (
              name
            )
          )
        `)

        .neq("sender_id", ownerId)

        .order("created_at", {
          ascending: false,
        });

    if (!error && data) {

      const formatted = data.map(
        (item: any) => ({
          id: item.id,

          msg: item.message,

          seen: item.is_seen,

          conversationId:
            item.conversation_id,

          name:
            item.conversations
              ?.registration?.name,
        })
      );

      setInquiries(formatted);
    }
  };

  // ---------------- REALTIME ----------------

  useEffect(() => {

    fetchInquiries();

    const channel = supabase
      .channel("owner-inquiries")

      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },

        () => {
          fetchInquiries();
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
        New Inquiries
      </h2>

      <div className="space-y-4">

        {inquiries.map((item) => (

          <div
            key={item.id}
            onClick={() =>
              setSelectedConversation(
                item.conversationId
              )
            }
            className="cursor-pointer rounded-2xl border p-4 transition hover:bg-green-50"
          >

            <div className="flex justify-between">

              <div>

                <h3 className="font-semibold">
                  {item.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {item.msg}
                </p>

              </div>

              {!item.seen && (
                <div className="h-3 w-3 rounded-full bg-red-500" />
              )}

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}