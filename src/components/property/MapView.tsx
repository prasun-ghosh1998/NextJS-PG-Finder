"use client";

export default function MapView({ data }:any) {
  if (!data.length) return <p>No locations found</p>;

  return (
    <div className="space-y-6">

      {data.map((item:any) => (
        <div key={item.id} className="bg-white rounded-xl overflow-hidden shadow">
          
          <div className="p-3 font-semibold">{item.title}</div>

          <iframe
            width="100%"
            height="250"
            loading="lazy"
            className="border-0"
            src={`https://www.google.com/maps?q=${encodeURIComponent(
              item.location
            )}&output=embed`}
          ></iframe>

        </div>
      ))}

    </div>
  );
}