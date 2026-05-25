"use client";

import dynamic from "next/dynamic";

const IndiaMap = dynamic(
  () => import("./IndiaMap"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[600px] items-center justify-center rounded-2xl border">
        Loading Map...
      </div>
    ),
  }
);

interface Props {
  data: any[];
}

export default function MapView({
  data,
}: Props) {
  return <IndiaMap data={data} />;
}