"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { supabase } from "@/lib/supabaseclient";

export default function FeedbackSection() {
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    setLoading(true);

    const { data: ratings, error: ratingError } = await supabase
      .from("property_ratings")
      .select("*")
      .order("created_at", { ascending: false });

    const { data: users, error: userError } = await supabase
      .from("registration")
      .select("id, auth_user_id, name, email, image");

    console.log("ratings:", ratings);
    console.log("users:", users);
    console.log("ratingError:", ratingError);
    console.log("userError:", userError);

    if (ratingError) {
      setLoading(false);
      return;
    }

    const formatted =
      ratings?.map((item: any) => {
        const user = users?.find((u: any) => {
          return (
            String(u.id) === String(item.user_id) ||
            String(u.auth_user_id) === String(item.user_id) ||
            String(u.email) === String(item.user_email) ||
            String(u.email) === String(item.email)
          );
        });

        return {
          ...item,
          user_name: user?.name || "PGFinder User",
          user_image: user?.image || null,
        };
      }) || [];

    setFeedbacks(formatted);
    setLoading(false);
  };

  return (
    <section className="bg-[#F7F8FC] px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <p className="mb-3 text-center text-sm font-semibold uppercase text-green-700">
          User Feedback
        </p>

        <h2 className="mb-14 text-center text-4xl font-bold text-[#2C2F31] md:text-5xl">
          What Our {""}
          <span className="text-green-600">Users{" "}</span>
          Say
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading feedback...</p>
        ) : feedbacks.length === 0 ? (
          <p className="text-center text-gray-500">No feedback found.</p>
        ) : (
          <div className="relative overflow-hidden">
            <div className="animate-slide flex w-max gap-8">
              {[...feedbacks, ...feedbacks].map((item, index) => (
                <div
                  key={index}
                  className="w-[350px] rounded-3xl border border-green-100 bg-white p-6 shadow-lg"
                >
                  <div className="mb-5 flex items-center gap-4">
                    <img
                      src={
                        item.user_image ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          item.user_name
                        )}&background=16a34a&color=ffffff`
                      }
                      alt={item.user_name}
                      className="h-14 w-14 rounded-full object-cover"
                    />

                    <div>
                      <h3 className="text-lg font-semibold capitalize text-gray-800">
                        {item.user_name}
                      </h3>
                      <p className="text-sm text-gray-500">Verified User</p>
                    </div>
                  </div>

                  <div className="mb-4 flex items-center gap-2">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <Star
                        key={i}
                        size={18}
                        className={
                          i < Number(item.rating || 0)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    ))}

                    <span className="text-sm font-semibold text-gray-700">
                      {item.rating || 0}/5
                    </span>
                  </div>

                  <p className="leading-7 text-gray-600">
                    “{item.feedback || item.message || "No message"}”
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}