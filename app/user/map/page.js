"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import "leaflet/dist/leaflet.css";
import { createClient } from "@supabase/supabase-js";
import PawPrint from "../../../components/user/PawPrint";
import Sidebar from "../../../components/user/Sidebar";
import Image from "next/image";
import Link from "next/link";

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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
    <div className="font-[Poppins] h-screen bg-gray-100">
      {/* Sidebar Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 bg-gray-900 text-white rounded-md md:hidden"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          ></path>
        </svg>
      </button>

      {/* Sidebar */}
      <div className="flex">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          setActiveComponent={() => {}}
        />
      </div>

      {/* Header - Fixed at the top */}
      <header 
        className="bg-white shadow-md py-4 px-4 md:px-10 fixed w-full z-40" 
        style={{ 
          left: isSidebarOpen ? '256px' : '0', 
          width: isSidebarOpen ? 'calc(100% - 256px)' : '100%' 
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-blue-500">
              Veterinary Map
            </h1>
          </div>

          <div className="relative flex items-center space-x-4">
            <div>
              <p className="text-black text-lg">
                Hey,{" "}
                <span className="font-bold text-blue-500 text-lg">Rose</span>
              </p>
              <p className="text-black text-sm">Fur Mom</p>
            </div>

            <div className="relative">
              <input
                type="checkbox"
                id="dropdownToggle"
                className="hidden peer"
              />

              <label htmlFor="dropdownToggle">
                <Image
                  src="/image/megan.jpg"
                  alt="Avatar dropdown"
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full cursor-pointer"
                />
              </label>

              <div className="hidden peer-checked:block absolute right-0 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44">
                <div className="px-4 py-3 text-sm text-gray-900">
                  <div>Bonnie Green</div>
                  <div className="font-medium truncate">name@flowbite.com</div>
                </div>

                <ul
                  className="py-2 text-sm text-gray-700"
                  aria-labelledby="dropdownToggle"
                >
                  <li>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Settings
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Earnings
                    </a>
                  </li>
                </ul>

                <div className="py-1">
                  <a
                    href="/auth/logout"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Adjusted for header and sidebar */}
      <main 
        className="pt-24 pb-6 px-4 md:px-10 overflow-hidden" 
        style={{ 
          marginLeft: isSidebarOpen ? '256px' : '0',
          width: isSidebarOpen ? 'calc(100% - 256px)' : '100%',
          height: 'calc(100vh - 80px)'
        }}
      >
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
          <div className="h-full w-full rounded-lg overflow-hidden shadow-md">
            <MapContainer
              center={[8.9475, 125.5406]}
              zoom={14}
              className="h-full w-full"
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
                      click: () => router.push(`/user/clinic/${clinic.id}`),
                    }}
                  >
                    <Tooltip>{clinic.name}</Tooltip>
                  </Marker>
                ) : null
              )}
            </MapContainer>
          </div>
        )}
      </main>
    </div>
  );
}