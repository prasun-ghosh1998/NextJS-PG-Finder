"use client";

import { useEffect, useState } from "react";
import RecentChats from "@/components/ownerDashboard/RecentChats";
import ChatWindow from "@/components/ownerDashboard/ChatWindow";
import { supabase } from "@/lib/supabaseclient";

export default function Inquiries() {
  const [ownerId, setOwnerId] = useState("");
  const [selectedConversation, setSelectedConversation] = useState("");

  useEffect(() => {
    const getOwner = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setOwnerId(user?.id || "");
    };

    getOwner();
  }, []);

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-4">
        <RecentChats
          ownerId={ownerId}
          setSelectedConversation={setSelectedConversation}
        />
      </div>

      <div className="col-span-8">
        <ChatWindow
          ownerId={ownerId}
          conversationId={selectedConversation}
        />
      </div>
    </div>
  );
}