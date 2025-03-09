"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import "leaflet/dist/leaflet.css";
import { createClient } from "@supabase/supabase-js";
import PawPrint from "../../components/PawPrint";
import '../../style/App.css';
import Navbar from "../../components/Navbar";

// Dynamically import Leaflet components
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });
const Tooltip = dynamic(() => import("react-leaflet").then((mod) => mod.Tooltip), { ssr: false });

// Supabase setup
const supabase = createClient("https://onzgnwoxdhqaquyzqmsj.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9uemdud294ZGhxYXF1eXpxbXNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkxOTg2NDIsImV4cCI6MjA1NDc3NDY0Mn0.b7WfTQ6nopR6hG9BqfLCA0WNzi7jLsSV6Hn9epOVfUI");

export default function VetMap({ requiredEquipment }) {
  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pawStep, setPawStep] = useState(0);
  const router = useRouter();
  
  useEffect(() => {
    const pawTimer = setInterval(() => {
      setPawStep((prev) => (prev < 3 ? prev + 1 : 3));
    }, 500);

    const fetchClinics = async () => {
      const { data, error } = await supabase.from("clinics").select("*");
      if (error) {
        console.error("Error fetching clinics:", error.message);
      } else {
        setClinics(data);
      }

      setTimeout(() => {
        setLoading(false);
        clearInterval(pawTimer);
      }, 2000);
    };

    fetchClinics();
    return () => clearInterval(pawTimer);
  }, []);

  return (
    <div className="h-screen w-screen m-0 p-0 overflow-hidden">
      {loading ? (
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-gray-600 text-lg font-normal flex items-center">
            Loading clinics
            {pawStep > 0 && <PawPrint className="mx-1 animate-bounce" color="#FFF8E3" />}
            {pawStep > 1 && <PawPrint className="mx-1 animate-bounce delay-150" color="#F4E1C1" />}
            {pawStep > 2 && <PawPrint className="mx-1 animate-bounce delay-300" color="#A0522D" />}
          </p>
        </div>
      ) : (
        <MapContainer
          center={[8.9475, 125.5406]}
          zoom={14}
          className="h-screen w-screen"
          style={{ margin: 0, padding: 0 }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {clinics.map((clinic) =>
            clinic.latitude && clinic.longitude ? (
              <Marker
                key={clinic.id}
                position={[clinic.latitude, clinic.longitude]}
                eventHandlers={{
                  click: () => router.push(`/clinic/${clinic.id}`),
                }}
              >
                <Tooltip>{clinic.name}</Tooltip>
              </Marker>
            ) : null
          )}
        </MapContainer>
      )}
    </div>
  );
}
