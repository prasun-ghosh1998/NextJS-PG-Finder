"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import ChatWindow from "./ChatWindow";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedChat: any;
  userId: string;
}

export default function UserChatModal({
  open,
  setOpen,
  selectedChat,
  userId,
}: Props) {
  if (!selectedChat) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="!max-w-[420px] overflow-hidden rounded-3xl p-0">
        <ChatWindow
          selectedChat={selectedChat}
          userId={userId}
          onClose={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}