"use client";

import Image from "next/image";

import {
  Check,
  MapPin,
  X,
} from "lucide-react";

interface Props {
  id: number;
  image: string;
  tag: string;
  title: string;
  location: string;
  owner: string;
  badge: string;
  danger: boolean;
  status:string;

  action: (
    id: number,
    type: "Approved" | "Rejected"
  ) => void;
}

const ModerationCard = ({
  id,
  image,
  tag,
  title,
  location,
  owner,
  badge,
  danger,
  status,
  action,
}: Props) => {
  return (
    <div className="flex bg-[#111827] rounded-xl overflow-hidden border border-[#1F2937] shadow-lg">
      {/* IMAGE */}

      <div className="relative w-[45%] h-[200px]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />

        <span className="absolute top-3 left-3 text-xs bg-black/60 px-2 py-1 rounded">
          {tag}
        </span>
      </div>

      {/* CONTENT */}

      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center">
            <h2 className="font-semibold">
              {title}
            </h2>

            <span
              className={`text-xs px-2 py-1 rounded-full ${
                danger
                  ? "bg-red-500/20 text-red-400"
                  : "bg-green-500/20 text-green-400"
              }`}
            >
              {badge}
            </span>
          </div>

          <p className="text-gray-400 text-sm flex items-center gap-1 mt-1">
            <MapPin size={14} />
            {location}
          </p>

          <p className="text-xs text-gray-500 mt-2">
            {owner}
          </p>
        </div>

        {/* ACTIONS */}

        <div className="flex gap-3 mt-4">
          <button
  onClick={() => action(id, "Approved")}
  disabled={status === "Approved"}
  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm ${
    status === "Approved"
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-green-500 hover:bg-green-600"
  }`}
>
  <Check size={16} />

  {status === "Approved"
    ? "Approved"
    : "Approve"}
</button>

          <button
            onClick={() =>
              action(id, "Rejected")
            }
            className="flex items-center gap-2 border border-gray-600 px-4 py-2 rounded-lg text-sm bg-red-400 hover:bg-red-600"
          >
            <X size={16} />

            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModerationCard;