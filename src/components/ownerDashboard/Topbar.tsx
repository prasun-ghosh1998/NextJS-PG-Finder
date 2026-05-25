"use client";

import {
  Bell,
  ChevronDown,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import { supabase } from "@/lib/supabaseclient";

export default function Topbar() {

  const [owner, setOwner] =
    useState<any>(null);

  const [unreadCount, setUnreadCount] =
    useState(0);

  // ---------------- FETCH OWNER ----------------

  useEffect(() => {
    fetchOwner();
  }, []);

  const fetchOwner = async () => {

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } =
      await supabase
        .from("registration")
        .select("*")
        .eq("email", user.email)
        .single();

    if (error) {
      console.log(error.message);
      return;
    }

    setOwner(data);

    // fetch unread after owner loaded
    fetchUnread(
      data.auth_user_id
    );

    realtimeNotification(
      data.auth_user_id
    );
  };

  // ---------------- FETCH UNREAD ----------------

  const fetchUnread = async (
    ownerId: string
  ) => {

    const { count } = await supabase
      .from("messages")
      .select("*", {
        count: "exact",
        head: true,
      })

      .eq("is_seen", false)

      .neq("sender_id", ownerId);

    setUnreadCount(count || 0);
  };

  // ---------------- REALTIME ----------------

  const realtimeNotification = (
    ownerId: string
  ) => {

    const channel = supabase
      .channel("owner-notification")

      .on(
        "postgres_changes",

        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },

        (payload) => {

          const newMessage: any =
            payload.new;

          // ignore owner own messages
          if (
            newMessage.sender_id ===
            ownerId
          ) {
            return;
          }

          // increase count
          setUnreadCount(
            (prev) => prev + 1
          );

          // notification sound
          const audio =
            new Audio(
              "/notification.mp3"
            );

          audio.play();
        }
      )

      .subscribe();

    return () => {
      supabase.removeChannel(
        channel
      );
    };
  };

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

      {/* LEFT */}
      <div>

        <h2 className="bg-gradient-to-b from-green-800 via-green-600 to-green-400 bg-clip-text text-4xl font-bold text-transparent">

          Owner Dashboard

        </h2>

        <p className="mt-2 text-gray-500">

          Manage your properties and inquiries.

        </p>

      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        {/* NOTIFICATION */}
        <button className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-green-400 to-emerald-600 text-white shadow-lg">

          <Bell size={20} />

          {unreadCount > 0 && (
            <>

              {/* red dot */}
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>

              {/* count */}
              <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">

                {unreadCount}

              </span>

            </>
          )}

        </button>

        {/* PROFILE */}
        <div className="flex items-center gap-3 rounded-2xl bg-zinc-900 px-4 py-2">

          {/* Avatar */}
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-600 font-bold uppercase text-white">

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

          <ChevronDown
            size={18}
            className="text-gray-400"
          />

        </div>

      </div>

    </div>
  );
}