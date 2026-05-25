"use client";

import { useEffect, useRef, useState } from "react";
import { Send, X } from "lucide-react";
import { supabase } from "@/lib/supabaseclient";

interface Props {
  selectedChat: any;
  userId: string;
  onClose?: () => void;
}

export default function ChatWindow({ selectedChat, userId, onClose }: Props) {
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [currentUserDbId, setCurrentUserDbId] = useState("");

  const bottomRef = useRef<HTMLDivElement | null>(null);

  const ownerId = selectedChat?.owner_id;
  const propertyId = selectedChat?.property_id;

  const getCurrentUserDbId = async () => {
    const { data, error } = await supabase
      .from("registration")
      .select("id")
      .eq("auth_user_id", userId)
      .single();

    if (error) {
      console.log("Registration user error:", error);
      return null;
    }

    setCurrentUserDbId(data.id);
    return data.id;
  };

  const createOrGetConversation = async () => {
    if (!userId || !ownerId || !propertyId) {
      console.log("Missing chat data", { userId, ownerId, propertyId });
      return;
    }

    await getCurrentUserDbId();

    const { data: existing, error: findError } = await supabase
      .from("conversations")
      .select("id")
      .eq("user_id", userId)
      .eq("owner_id", ownerId)
      .eq("property_id", propertyId)
      .order("created_at", { ascending: false })
      .limit(1);

    if (findError) {
      console.log("Find conversation error:", findError);
      return;
    }

    if (existing && existing.length > 0) {
      setConversationId(existing[0].id);
      fetchMessages(existing[0].id);
      return;
    }

    const { data: created, error: createError } = await supabase
      .from("conversations")
      .insert({
        user_id: userId,
        owner_id: ownerId,
        property_id: propertyId,
      })
      .select("id")
      .single();

    if (createError) {
      console.log("Create conversation error:", createError);
      return;
    }

    setConversationId(created.id);
    fetchMessages(created.id);
  };

  const fetchMessages = async (id: string) => {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("conversation_id", id)
      .order("created_at", { ascending: true });

    if (error) {
      console.log("Fetch messages error:", error);
      return;
    }

    setMessages(data || []);
  };

  const sendMessage = async () => {
    if (!message.trim()) return;
    if (!conversationId || !userId) return;

    let senderDbId = currentUserDbId;

    if (!senderDbId) {
      const id = await getCurrentUserDbId();
      if (!id) return;
      senderDbId = id;
    }

    const { data, error } = await supabase
      .from("messages")
      .insert({
        conversation_id: conversationId,
        sender_id: senderDbId,
        message: message.trim(),
        is_seen: false,
      })
      .select()
      .single();

    if (error) {
      console.log("Send message error:", error);
      return;
    }

    setMessages((prev) => [...prev, data]);
    setMessage("");
  };

  useEffect(() => {
    createOrGetConversation();
  }, [userId, ownerId, propertyId]);

  useEffect(() => {
    if (!conversationId) return;

    const channel = supabase
      .channel(`chat-${conversationId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          setMessages((prev) => {
            const exists = prev.some((msg) => msg.id === payload.new.id);
            if (exists) return prev;
            return [...prev, payload.new];
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex h-[530px] flex-col bg-white">
      <div className="flex items-center justify-between border-b px-5 py-4">
        <h2 className="text-lg font-bold">Live Chat</h2>

        {onClose && (
          <button onClick={onClose}>
            <X size={18} />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto bg-gray-50 px-4 py-4">
        {messages.length === 0 ? (
          <p className="mt-6 text-center text-xs text-gray-400">
            No messages yet
          </p>
        ) : (
          <div className="space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender_id === currentUserDbId
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${
                    msg.sender_id === currentUserDbId
                      ? "bg-green-600 text-white"
                      : "bg-white text-gray-800 shadow"
                  }`}
                >
                  {msg.message}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 border-t bg-white px-4 py-4">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
          placeholder="Type message..."
          className="h-11 flex-1 rounded-2xl border px-4 text-sm outline-none focus:border-green-500"
        />

        <button
          onClick={sendMessage}
          className="flex h-11 w-12 items-center justify-center rounded-2xl bg-green-600 text-white hover:bg-green-700"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}