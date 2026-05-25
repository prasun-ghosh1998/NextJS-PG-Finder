"use client";

import { useEffect } from "react";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

export default function IndiaMap({ data = [] }: any) {
  useEffect(() => {
    delete (L.Icon.Default.prototype as any)._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      iconUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    });
  }, []);

  return (
    <MapContainer
      center={[22.9734, 78.6569]}
      zoom={5}
      className="h-[600px] w-full rounded-2xl"
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {data.map((item: any) => {
        if (!item.latitude || !item.longitude) return null;

        return (
          <Marker
            key={item.id}
            position={[
              Number(item.latitude),
              Number(item.longitude),
            ]}
          >
            <Popup>
              <div className="space-y-1">
                <h3 className="font-bold text-lg">
                  {item.title}
                </h3>

                <p>{item.location}</p>

                <p className="font-semibold text-green-600">
                  ₹{item.price}
                </p>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}