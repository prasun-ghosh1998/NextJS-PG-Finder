"use client";

import { supabase } from "@/lib/supabaseclient";
import { useEffect, useState } from "react";

import { AreaChart, Area, ResponsiveContainer, XAxis, Tooltip } from "recharts";

export default function ChartSection() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetchChartData();
  }, []);

  const fetchChartData = async () => {
    const { data: users } = await supabase.from("registration").select("*");

    const grouped: any = {};

    users?.forEach((user) => {
      const day = new Date(user.created_at).toLocaleDateString("en-US", {
        weekday: "short",
      });

      grouped[day] = (grouped[day] || 0) + 1;
    });

    const formatted = Object.keys(grouped).map((day) => ({
      day,
      users: grouped[day],
    }));

    setData(formatted);
  };

  return (
    <div className="bg-white p-6 rounded-xl w-full">
      <h2 className="text-lg font-semibold mb-4">User Growth Trends</h2>

      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={data}>
          <XAxis dataKey="day" stroke="#888" />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="users"
            stroke="#8B5CF6"
            fill="#8B5CF6"
            fillOpacity={0.2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
