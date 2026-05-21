"use client";

import {
  Check,
  Clock3,
  MessageCircle,
  X,
} from "lucide-react";

export default function BookingRequests() {
  const requests = [
    {
      id: 1,
      name: "Rahul Sharma",
      property: "Sunrise PG",
      time: "2 mins ago",
    },
    {
      id: 2,
      name: "Priya Sen",
      property: "Urban Flat",
      time: "15 mins ago",
    },
    {
      id: 3,
      name: "Amit Das",
      property: "Blue Nest PG",
      time: "1 hour ago",
    },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">
            Booking Requests
          </h2>

          <p className="text-gray-500 mt-1">
            Accept or reject tenant requests
          </p>
        </div>

        {/* <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center">
          <Clock3 className="text-indigo-600" />
        </div> */}
      </div>

      {/* REQUESTS */}
      <div className="space-y-5">
        {requests.map((item) => (
          <div
            key={item.id}
            className="border border-gray-100 rounded-3xl p-5 hover:shadow-md transition"
          >
            <div className="flex items-start justify-between gap-5">
              <div className="flex gap-4">
                <div className="w-14 h-14 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold text-lg">
                  {item.name.charAt(0)}
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 text-lg">
                    {item.name}
                  </h4>

                  <p className="text-gray-500 mt-1">
                    Interested in{" "}
                    <span className="font-medium">
                      {item.property}
                    </span>
                  </p>

                  <div className="flex items-center gap-2 mt-3 text-sm text-gray-400">
                    <Clock3 size={15} />

                    {item.time}
                  </div>
                </div>
              </div>

              {/* <button className="w-11 h-11 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
                <MessageCircle size={20} />
              </button> */}
            </div>

            {/* ACTIONS */}
            <div className="flex gap-4 mt-6">
              <button className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-2xl font-medium flex items-center justify-center gap-2 transition">
                <Check size={18} />

                Accept
              </button>

              <button className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-2xl font-medium flex items-center justify-center gap-2 transition">
                <X size={18} />

                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}