"use client";

import { Bell, Camera, MessageCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabaseclient";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Topbar() {
  const [owner, setOwner] = useState<any>(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    fetchOwner();
  }, []);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const fetchOwner = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

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
    fetchUnread(data.auth_user_id);
    fetchNotifications(data.auth_user_id);
  };

  const fetchUnread = async (ownerId: string) => {
    const { count, error } = await supabase
      .from("messages")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("is_seen", false)
      .neq("sender_id", ownerId);

    if (error) {
      console.log(error.message);
      return;
    }

    setUnreadCount(count || 0);
  };

  const fetchNotifications = async (ownerId: string) => {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("is_seen", false)
      .neq("sender_id", ownerId)
      .order("created_at", { ascending: false })
      .limit(10);

    if (error) {
      console.log(error.message);
      return;
    }

    setNotifications(data || []);
  };

  const handleBellClick = async () => {
    setOpen((prev) => !prev);

    if (!owner?.auth_user_id || notifications.length === 0) return;

    const ids = notifications.map((item) => item.id);

    const { error } = await supabase
      .from("messages")
      .update({ is_seen: true })
      .in("id", ids);

    if (error) {
      console.log(error.message);
      return;
    }

    setUnreadCount(0);
  };

  const handleNotificationClick = () => {
    setOpen(false);
    router.push("/owner/inquiries");
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file || !owner?.id) return;

    try {
      setUploading(true);

      const fileExt = file.name.split(".").pop();
      const fileName = `${owner.id}-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("profile")
        .upload(fileName, file, {
          upsert: true,
        });

      if (uploadError) {
        toast.error(uploadError.message);
        return;
      }

      const { data } = supabase.storage.from("profile").getPublicUrl(fileName);

      const imageUrl = data.publicUrl;

      const { error: updateError } = await supabase
        .from("registration")
        .update({
          image: imageUrl,
        })
        .eq("id", owner.id);

      if (updateError) {
        toast.error(updateError.message);
        return;
      }

      setOwner((prev: any) => ({
        ...prev,
        image: imageUrl,
      }));

      toast.success("Profile image updated");
    } catch (error) {
      console.log(error);
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    if (!owner?.auth_user_id) return;

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
          const newMessage: any = payload.new;

          if (newMessage.sender_id === owner.auth_user_id) return;

          setUnreadCount((prev) => prev + 1);
          setNotifications((prev) => [newMessage, ...prev]);

          const audio = new Audio("/notification.mp3");
          audio.play().catch(() => {});
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [owner?.auth_user_id]);

  return (
    <div className="flex flex-col gap-5 bg-zinc-900/60 p-5 shadow-lg lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h2 className="bg-gradient-to-b from-green-800 via-green-600 to-green-400 bg-clip-text text-4xl font-bold text-transparent">
          Owner Dashboard
        </h2>

        <p className="mt-2 text-gray-400">
          Manage your properties and inquiries.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={handleBellClick}
            className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-green-400 to-emerald-600 text-white shadow-lg"
          >
            <Bell size={18} />

            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
                {unreadCount}
              </span>
            )}
          </button>

          {open && (
            <div className="absolute right-0 top-16 z-50 w-[360px] overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 shadow-2xl">
              <div className="border-b border-zinc-800 px-5 py-4">
                <h3 className="text-lg font-bold text-white">
                  Notifications
                </h3>

                <p className="text-sm text-gray-400">
                  {notifications.length} recent messages
                </p>
              </div>

              <div className="max-h-[400px] overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="py-10 text-center text-sm text-gray-400">
                    No new notifications
                  </p>
                ) : (
                  notifications.map((item) => (
                    <div
                      key={item.id}
                      onClick={handleNotificationClick}
                      className="flex cursor-pointer gap-3 border-b border-zinc-800 px-5 py-4 hover:bg-zinc-900"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-green-500/20 text-green-400">
                        <MessageCircle size={17} />
                      </div>

                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-white">
                          New Message
                        </h4>

                        <p className="mt-1 line-clamp-2 text-sm text-gray-400">
                          {item.message ||
                            item.text ||
                            "You received a new message"}
                        </p>

                        <span className="mt-2 block text-xs text-gray-500">
                          {new Date(item.created_at).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 rounded-2xl bg-zinc-950 px-4 py-2">
          <div className="group relative h-12 w-12 overflow-hidden rounded-full">
            {owner?.image ? (
              <img
                src={owner.image}
                alt={owner?.name || "Owner"}
                className="h-full w-full rounded-full border-2 border-green-500 object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-600 font-bold uppercase text-white">
                {owner?.name?.charAt(0) || "O"}
              </div>
            )}

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="absolute inset-0 flex items-center justify-center bg-black/45 text-white opacity-0 transition group-hover:opacity-100"
            >
              <Camera size={16} />
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          <div>
            <h4 className="font-semibold text-white">
              {owner?.name || "Owner"}
            </h4>

            <p className="text-sm text-gray-400">
              {uploading ? "Uploading..." : owner?.role || "Owner"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}