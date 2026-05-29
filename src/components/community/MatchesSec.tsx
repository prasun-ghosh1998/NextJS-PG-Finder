"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { supabase } from "@/lib/supabaseclient";

export default function FeedbackSection() {
  const [feedbacks, setFeedbacks] = useState<any[]>([]);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    const { data, error } = await supabase
      .from("property_ratings")
      .select("*")
      .not("feedback", "is", null)
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    setFeedbacks(data || []);
  };

  return (
    <section className="overflow-hidden px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="bg-gradient-to-b from-green-800 via-green-600 to-green-400 bg-clip-text text-4xl font-bold text-transparent">
            What Our Users Say
          </h2>

          <p className="mt-3 text-gray-500">
            Real feedback from people who found their perfect PG.
          </p>
        </div>

        {/* SLIDER */}
        <div className="relative overflow-hidden">
          <div className="animate-slide flex w-max gap-8">
            {[...feedbacks, ...feedbacks].map((item, index) => (
              <div
                key={index}
                className="w-[350px] rounded-3xl border border-green-100 bg-white p-6 shadow-lg"
              >
                <div className="mb-5 flex items-center gap-4">
                  <img
                    src={`https://ui-avatars.com/api/?name=${item.user_id}`}
                    alt="user"
                    className="h-14 w-14 rounded-full object-cover"
                  />

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      PGFinder User
                    </h3>

                    <p className="text-sm text-gray-500">
                      Verified User
                    </p>
                  </div>
                </div>

                <div className="mb-4 flex gap-1">
                  {Array.from({
                    length: item.rating || 0,
                  }).map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                <p className="leading-7 text-gray-600">
                  “{item.feedback}”
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CUSTOM CSS */}
      <style jsx>{`
        .animate-slide {
          animation: slide 20s linear infinite;
        }

        @keyframes slide {
          0% {
            transform: translateX(0);
          }

          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}