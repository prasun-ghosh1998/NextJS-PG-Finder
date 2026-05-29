"use client";

import { useEffect, useState } from "react";
import {
  X,
  Star,
  MapPin,
  IndianRupee,
  User,
  Home,
} from "lucide-react";
import { supabase } from "@/lib/supabaseclient";

export default function PropertyDetailsModal({
  open,
  onClose,
  item,
}: any) {
  const [userId, setUserId] = useState("");
  const [rating, setRating] = useState(0);
  const [avgRating, setAvgRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (open && item?.id) {
      getUser();
      fetchRating();
    }
  }, [open, item?.id]);

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setUserId(user?.id || "");
  };

  const fetchRating = async () => {
    const { data: ratings } = await supabase
      .from("property_ratings")
      .select("rating, user_id, feedback")
      .eq("property_id", item.id);

    if (!ratings) return;

    const total = ratings.reduce(
      (sum: number, r: any) => sum + r.rating,
      0
    );

    setAvgRating(ratings.length ? total / ratings.length : 0);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const myRating = ratings.find(
      (r: any) => r.user_id === user?.id
    );

    setRating(myRating?.rating || 0);
    setFeedback(myRating?.feedback || "");
  };

  const handleRating = async (value: number) => {
    if (!userId) {
      alert("Please login first");
      return;
    }

    setRating(value);
  };

  const handleFeedbackSubmit = async () => {
    if (!userId) {
      alert("Please login first");
      return;
    }

    if (!rating) {
      alert("Please select rating");
      return;
    }

    if (!feedback.trim()) {
      alert("Please write feedback");
      return;
    }

    const { error } = await supabase.from("property_ratings").upsert(
      {
        user_id: userId,
        property_id: item.id,
        rating,
        feedback,
      },
      {
        onConflict: "user_id,property_id",
      }
    );

    if (error) {
      console.log(error);
      alert(error.message);
      return;
    }

    alert("Feedback submitted successfully");
    fetchRating();
  };

  if (!open || !item) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-xl"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-white p-2 shadow hover:bg-gray-100"
        >
          <X size={20} />
        </button>

        <div className="h-72 w-full">
          <img
            src={item.image || "/placeholder.jpg"}
            alt={item.title}
            className="h-full w-full rounded-t-3xl object-cover"
          />
        </div>

        <div className="space-y-5 p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="mb-2 inline-block rounded-full bg-green-100 px-4 py-1 text-sm text-green-700">
                {item.type}
              </p>

              <h2 className="text-3xl font-bold text-gray-900">
                {item.title}
              </h2>
            </div>

            <p className="flex items-center gap-1 text-2xl font-bold text-green-700">
              <IndianRupee className="size-6" />
              {item.price}
            </p>
          </div>

          <div className="flex items-center gap-3 text-gray-600">
            <MapPin className="size-5 text-green-700" />
            {item.location}
          </div>

          <div className="flex items-center gap-3 text-gray-600">
            <User className="size-5 text-green-700" />
            Owner: {item.name}
          </div>

          <div>
            <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold">
              <Home className="size-5 text-green-700" />
              Amenities
            </h3>

            <div className="flex flex-wrap gap-2">
              {item.amenities?.split(",").map((a: string, i: number) => (
                <span
                  key={i}
                  className="rounded-full bg-green-100 px-4 py-2 text-sm text-green-700"
                >
                  {a.trim()}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-gray-50 p-4">
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
              Property Rating & Feedback
            </h3>

            <p className="mb-3 text-sm text-gray-500">
              Average Rating: {avgRating.toFixed(1)} / 5
            </p>

            <div className="mb-4 flex gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  onClick={() => handleRating(value)}
                  className="transition hover:scale-110"
                >
                  <Star
                    className={`size-8 ${
                      value <= rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>

            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Write your feedback..."
              rows={4}
              className="w-full resize-none rounded-2xl border border-green-100 p-4 text-gray-700 outline-none focus:border-green-500"
            />

            <button
              onClick={handleFeedbackSubmit}
              className="mt-4 w-full rounded-2xl bg-gradient-to-r from-green-700 to-emerald-500 py-3 font-semibold text-white transition hover:scale-[1.02]"
            >
              Submit Feedback
            </button>

            {!userId && (
              <p className="mt-3 text-sm text-red-500">
                Login korle rating & feedback dite parbe.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}