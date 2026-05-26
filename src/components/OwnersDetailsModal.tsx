"use client";

import { useEffect, useState } from "react";
import {
  X,
  MapPin,
  Mail,
  Phone,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import UserChatModal from "./UserChatModal";
import { supabase } from "@/lib/supabaseclient";

interface OwnerModalProps {
  open: boolean;
  onClose: () => void;
  owner: any;
  property: any;
}

export default function OwnerDetails({
  open,
  onClose,
  owner,
  property,
}: OwnerModalProps) {
  const [loading, setLoading] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [currentUserId, setCurrentUserId] = useState("");
  const [ownerData, setOwnerData] = useState<any>(owner);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setCurrentUserId(user?.id || "");
    };

    getUser();
  }, []);

  useEffect(() => {
    const fetchOwnerFullData = async () => {
      if (!owner?.email) return;

      const { data, error } = await supabase
        .from("registration")
        .select("*")
        .eq("email", owner.email)
        .single();

      if (error) {
        console.log("Owner fetch error:", error);
        return;
      }

      setOwnerData(data);
    };

    fetchOwnerFullData();
  }, [owner]);

  const selectedChat = {
    owner: ownerData,
    property,
    owner_id: ownerData?.auth_user_id,
    property_id: property?.id,
  };

  console.log("CHAT DATA", {
  userId: currentUserId,
  ownerId: ownerData?.auth_user_id,
  propertyId: property?.id,
});

  const handleChat = () => {
    if (!currentUserId || !ownerData?.auth_user_id || !property?.id) {
      console.log("Missing chat data:", {
        currentUserId,
        ownerAuthId: ownerData?.auth_user_id,
        propertyId: property?.id,
        ownerData,
        property,
      });
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      onClose();
      setChatOpen(true);
    }, 500);
  };

  if (!open && !chatOpen) return null;

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl">
            <button
              onClick={onClose}
              className="absolute right-5 top-5 z-10 rounded-full bg-gray-100 p-2 transition hover:bg-gray-200"
            >
              <X className="h-5 w-5 text-gray-700" />
            </button>

            <div className="grid md:grid-cols-2">
              <div className="relative h-[300px] bg-gradient-to-t from-gray-700 via-gray-500 to-gray-400 md:h-full">
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                <div className="absolute bottom-6 left-6 text-white">
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-green-700 px-4 py-1 text-sm font-medium">
                    <ShieldCheck className="h-4 w-4" />
                    Verified Owner
                  </div>

                  <h2 className="bg-gradient-to-b from-green-400 via-green-600 to-green-800 bg-clip-text text-2xl font-bold text-transparent">
                    {ownerData?.name || "Owner Name"}
                  </h2>

                  <p className="mt-2 flex items-center gap-2 text-sm text-gray-200">
                    <MapPin className="h-4 w-4 text-green-700" />
                    {property?.location || "Location"}
                  </p>
                </div>
              </div>

              <div className="p-8">
                <h3 className="mb-8 text-2xl font-bold text-gray-900">
                  Property Owner Details
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-4">
                    <div className="rounded-xl bg-white p-3 shadow-sm">
                      <Mail className="h-5 w-5 text-green-700" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-400">
                        Email Address
                      </p>
                      <p className="font-semibold text-gray-800">
                        {ownerData?.email || "No email"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-4">
                    <div className="rounded-xl bg-white p-3 shadow-sm">
                      <Phone className="h-5 w-5 text-green-700" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-400">
                        Phone Number
                      </p>
                      <p className="font-semibold text-gray-800">
                        {ownerData?.phone || "No phone"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-10">
                  <button
                    onClick={handleChat}
                    disabled={loading || !currentUserId}
                    className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-green-700 text-sm font-semibold text-white transition hover:bg-green-800 disabled:opacity-60"
                  >
                    <MessageCircle className="h-5 w-5" />
                    {loading ? "Starting Chat..." : "Chat With Owner"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <UserChatModal
        open={chatOpen}
        setOpen={setChatOpen}
        selectedChat={selectedChat}
        userId={currentUserId}
      />
    </>
  );
}