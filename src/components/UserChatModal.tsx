"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedChat: any;
}

export default function UserChatModal({
  open,
  setOpen,
  selectedChat,
}: Props) {
  return (
    <Dialog  open={open} onOpenChange={setOpen}>
      <DialogContent className="!max-w-4xl overflow-hidden rounded-3xl p-0">
        <div className="flex items-center gap-4 border-b p-5">
          <div className="flex h-14 w-12 items-center justify-center rounded-full bg-green-100 text-xl font-bold text-green-700">
            {selectedChat?.owner?.name?.charAt(0) || "O"}
          </div>

          <div>
            <h2 className="text-xl font-bold">
              {selectedChat?.owner?.name || "Owner Name"}
            </h2>

            <p className="text-sm text-gray-500">
              {selectedChat?.property?.location || "Location"}
            </p>
          </div>
        </div>

        <div className="h-[450px] space-y-4 overflow-y-auto bg-[#F8F9FD] p-5">
          <div className="w-fit rounded-2xl bg-white p-3 shadow-sm">
            Hello 👋
          </div>

          <div className="ml-auto w-fit rounded-2xl bg-green-600 p-3 text-white">
            Hi there!
          </div>
        </div>

        <div className="flex gap-3 border-t p-4">
          <input
            type="text"
            placeholder="Type message..."
            className="h-12 flex-1 rounded-2xl border px-4 outline-none"
          />

          <button className="rounded-2xl bg-green-600 px-6 text-white hover:bg-green-700">
            Send
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}