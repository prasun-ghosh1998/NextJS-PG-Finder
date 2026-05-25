"use client";

import {
  useEffect,
  useState,
} from "react";

import { Send } from "lucide-react";

import { supabase } from "@/lib/supabaseclient";

export default function ChatWindow({
  conversationId,
  ownerId,
}: any) {

  const [messages, setMessages] =
    useState<any[]>([]);

  const [text, setText] =
    useState("");

  // ---------------- FETCH ----------------

  const fetchMessages = async () => {

    if (!conversationId) return;

    const { data } = await supabase
      .from("messages")
      .select("*")
      .eq(
        "conversation_id",
        conversationId
      )
      .order("created_at", {
        ascending: true,
      });

    setMessages(data || []);

    // mark seen
    await supabase
      .from("messages")
      .update({
        is_seen: true,
      })
      .eq(
        "conversation_id",
        conversationId
      )
      .neq("sender_id", ownerId);
  };

  // ---------------- SEND ----------------

  const sendMessage = async () => {

    if (!text.trim()) return;

    await supabase
      .from("messages")
      .insert({
        conversation_id:
          conversationId,

        sender_id: ownerId,

        message: text,
      });

    setText("");
  };

  // ---------------- REALTIME ----------------

  useEffect(() => {

    fetchMessages();

    const channel = supabase
      .channel("chat-window")

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

          if (
            newMessage.conversation_id ===
            conversationId
          ) {
            setMessages((prev) => [
              ...prev,
              newMessage,
            ]);
          }
        }
      )

      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };

  }, [conversationId]);

  return (
    <div className="flex h-[600px] flex-col rounded-3xl bg-white shadow">

      {/* HEADER */}
      <div className="border-b p-5">

        <h2 className="text-xl font-bold">
          Live Chat
        </h2>

      </div>

      {/* MESSAGES */}
      <div className="flex-1 space-y-4 overflow-auto p-5">

        {messages.map((msg, i) => (

          <div
            key={i}
            className={`flex ${
              msg.sender_id === ownerId
                ? "justify-end"
                : "justify-start"
            }`}
          >

            <div
              className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                msg.sender_id === ownerId
                  ? "bg-green-600 text-white"
                  : "bg-gray-100"
              }`}
            >

              {msg.message}

            </div>

          </div>

        ))}

      </div>

      {/* INPUT */}
      <div className="border-t p-4">

        <div className="flex gap-3">

          <input
            value={text}
            onChange={(e) =>
              setText(e.target.value)
            }
            placeholder="Type message..."
            className="flex-1 rounded-xl border p-3 outline-none"
          />

          <button
            onClick={sendMessage}
            className="rounded-xl bg-green-600 px-5 text-white"
          >

            <Send size={18} />

          </button>

        </div>

      </div>

    </div>
  );
}