"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "../../../components/user/supabaseClient";
import Sidebar from "../../../components/user/Sidebar"; 
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ClinicsListPage() {
  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState("appointment");
  const router = useRouter();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchClinics = async () => {
      try {
        const { data, error } = await supabase
          .from("clinics")
          .select("*")
          .order("name", { ascending: true });

        if (error) throw error;
        setClinics(data || []);
      } catch (error) {
        console.error("Error fetching clinics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClinics();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-gray-600 text-lg">Loading clinics...</p>
      </div>
    );
  }

  return (
    <div className="font-[Poppins] h-screen">
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
        />
      </div>

      {/* Header */}
      <header className="shadow-md py-4 px-4 md:px-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="ml-10 text-2xl font-bold text-blue-500">All Clinics</h1>
          </div>

          <div className="relative flex items-center space-x-4">
            <div>
              <p className="text-black text-lg">
                Hey, <span className="font-bold text-blue-500 text-lg">Rose</span>
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
                <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdownToggle">
                  <li>
                    <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                      Settings
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100">
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

      {/* Main Content */}
      <div className="flex-1 ml-0 md:ml-60 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6">Veterinary Clinics</h2>
            
            {clinics.length === 0 ? (
              <p className="text-gray-600">No clinics found in the database.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Clinic Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Address
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Open Hours
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {clinics.map((clinic) => (
                      <tr key={clinic.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{clinic.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-gray-500">{clinic.address}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-gray-500">{clinic.contact || "N/A"}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-gray-500">
                            {clinic.open_hours || "Monday-Saturday, 9am-5pm"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => router.push(`/user/appointment/clinic/${clinic.id}`)}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}