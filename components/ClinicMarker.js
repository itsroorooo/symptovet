"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Icon } from "@iconify/react";

const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Tooltip = dynamic(
  () => import("react-leaflet").then((mod) => mod.Tooltip),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

export default function ClinicMarker({ clinic, onClick, highlight }) {
  const L = typeof window !== "undefined" ? require("leaflet") : null;

  const icon = L && new L.Icon({
    iconUrl: highlight 
      ? "/map-marker-highlight.png" 
      : "/map-marker.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  if (!L || !clinic.latitude || !clinic.longitude) return null;

  return (
    <Marker
      position={[clinic.latitude, clinic.longitude]}
      icon={icon}
      eventHandlers={{
        click: () => onClick(clinic.id),
      }}
    >
      <Tooltip direction="top" offset={[0, -10]} permanent={false}>
        <div className="p-1">
          <h3 className="font-bold">{clinic.name}</h3>
          <p className="text-sm">{clinic.address}</p>
        </div>
      </Tooltip>
      
      <Popup>
        <div className="w-40">
          <h3 className="font-bold text-sm">{clinic.name}</h3>
          <p className="text-xs mb-1">{clinic.address}</p>
          <div className="flex items-center text-xs">
            <Icon icon="mdi:clock" className="mr-1" />
            {clinic.open_hours || "Mon-Sat, 9am-5pm"}
          </div>
          <button
            onClick={() => onClick(clinic.id)}
            className="mt-2 w-full bg-blue-500 text-white text-xs py-1 px-2 rounded hover:bg-blue-600 transition"
          >
            Book Appointment
          </button>
        </div>
      </Popup>
    </Marker>
  );
}