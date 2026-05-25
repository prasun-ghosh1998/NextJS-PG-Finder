"use client";

import { useEffect, useState } from "react";
import { Send } from "lucide-react";
import { supabase } from "@/lib/supabaseclient";

export default function ChatWindow({ conversationId, ownerId }: any) {
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");
  const [ownerDbId, setOwnerDbId] = useState("");

  const getOwnerDbId = async () => {
    if (!ownerId) return null;

    const { data, error } = await supabase
      .from("registration")
      .select("id")
      .eq("auth_user_id", ownerId)
      .single();

    if (error) {
      console.log("Owner registration error:", error);
      return null;
    }

    setOwnerDbId(data.id);
    return data.id;
  };

  const fetchMessages = async () => {
    if (!conversationId) {
      setMessages([]);
      return;
    }

    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true });

    if (error) {
      console.log("Fetch messages error:", error);
      return;
    }

    setMessages(data || []);
  };

  const markSeen = async () => {
    if (!conversationId || !ownerDbId) return;

    await supabase
      .from("messages")
      .update({ is_seen: true })
      .eq("conversation_id", conversationId)
      .neq("sender_id", ownerDbId);
  };

  const sendMessage = async () => {
    if (!conversationId) return;
    if (!ownerId) return;
    if (!text.trim()) return;

    let senderId = ownerDbId;

    if (!senderId) {
      const id = await getOwnerDbId();
      if (!id) return;
      senderId = id;
    }

    const { error } = await supabase.from("messages").insert({
      conversation_id: conversationId,
      sender_id: senderId,
      message: text.trim(),
      is_seen: false,
    });

    if (error) {
      console.log("Send message error:", error);
      return;
    }

    setText("");
    fetchMessages();
  };

  useEffect(() => {
    getOwnerDbId();
  }, [ownerId]);

  useEffect(() => {
    fetchMessages();
  }, [conversationId]);

  useEffect(() => {
    markSeen();
  }, [conversationId, ownerDbId, messages]);

  useEffect(() => {
    if (!conversationId) return;

    const channel = supabase
      .channel(`owner-chat-window-${conversationId}`)
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

  return (
    <div className="flex h-[600px] flex-col rounded-3xl bg-white shadow">
      <div className="border-b p-5">
        <h2 className="text-xl font-bold">Live Chat</h2>
      </div>

      <div className="flex-1 space-y-4 overflow-auto p-5">
        {!conversationId && (
          <p className="text-center text-sm text-gray-400">
            Select a chat
          </p>
        )}

        {conversationId && messages.length === 0 && (
          <p className="text-center text-sm text-gray-400">
            No messages yet
          </p>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender_id === ownerDbId ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] rounded-2xl px-4 py-3 text-sm ${
                msg.sender_id === ownerDbId
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {msg.message}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t p-4">
        <div className="flex gap-3">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
            disabled={!conversationId}
            placeholder="Type message..."
            className="flex-1 rounded-xl border p-3 outline-none disabled:bg-gray-100"
          />

          <button
            onClick={sendMessage}
            disabled={!conversationId}
            className="rounded-xl bg-green-600 px-5 text-white disabled:bg-gray-300"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}