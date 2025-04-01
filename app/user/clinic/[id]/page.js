"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../../../components/user/supabaseClient";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PawPrint from "../../../../components/user/PawPrint";
import Sidebar from "../../../../components/user/Sidebar";
import Image from "next/image";
import Link from "next/link";

export default function ClinicBooking() {
  const { id } = useParams();
  const [clinic, setClinic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [pawStep, setPawStep] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    ownerName: "",
    petName: "",
    animalType: "",
    breed: "",
  });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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

  useEffect(() => {
    const fetchClinic = async () => {
      const { data, error } = await supabase
        .from("clinics")
        .select("*")
        .eq("id", id)
        .single();

      setTimeout(() => {
        if (error) console.error("Error fetching clinic:", error);
        else setClinic(data);
        setLoading(false);
      }, 2000);
    };

    if (id) fetchClinic();
  }, [id]);

  // Paw print animation
  useEffect(() => {
    const interval = setInterval(() => {
      setPawStep((prevStep) => (prevStep + 1) % 3);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Appointment booked successfully! Please wait for confirmation.");
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-gray-600 text-lg font-normal animate-pulse flex items-center">
          Loading clinic details
          {pawStep > 0 && <PawPrint className="mx-1 animate-bounce" color="#FFD700" />} 
          {pawStep > 1 && <PawPrint className="mx-1 animate-bounce delay-150" color="#FFA500" />} 
          {pawStep > 2 && <PawPrint className="mx-1 animate-bounce delay-300" color="#FF8C00" />} 
        </p>
      </div>
    );
  }

  if (!clinic) return <p className="text-center py-8">Clinic not found.</p>;

  return (
    <div className="font-[Poppins] h-screen">
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

      <div className="flex">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
      </div>

      <header className="shadow-md py-4 px-4 md:px-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="ml-10 text-2xl font-bold text-blue-500">Book Appointment</h1>
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

      <div className="flex-1 flex justify-center items-start ml-0 md:ml-60 p-6">
        <div className="w-full max-w-3xl">
          <div className="flex flex-col items-center justify-center bg-white text-gray-800 px-4 py-8 rounded-lg shadow">
            <img src="/vet-clinic-icon.png" alt="Vet Clinic" className="h-24 mb-4" />
            <h1 className="text-2xl font-bold text-center">{clinic.name}</h1>
            <p className="text-center mb-6 text-gray-600">{clinic.address}</p>

            <div className="w-full bg-blue-100 p-4 rounded-md mb-6">
              <h3 className="font-semibold mb-3 text-lg">Clinic Information</h3>
              <div className="bg-blue-50 p-3 mb-3 rounded border border-blue-200">
                <p className="font-bold text-blue-800">Open Hours</p>
                <p>{clinic.open_hours || "Monday-Saturday, 9am-5pm"}</p>
              </div>
              <div className="bg-blue-50 p-3 rounded border border-blue-200">
                <p className="font-bold text-blue-800">Phone</p>
                <p>{clinic.contact || "(085) 300 1952"}</p>
              </div>
            </div>

            <button
              className="w-full max-w-md py-3 bg-green-500 text-white hover:bg-green-600 transition duration-300 rounded-lg shadow"
              onClick={() => setShowForm(true)}
            >
              Book Appointment
            </button>

            {showForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md relative mx-4">
                  <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowForm(false)}
                  >
                    &times;
                  </button>

                  <h2 className="text-xl font-semibold mb-4">Select Date</h2>
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    minDate={new Date()}
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                    placeholderText="Select a date"
                  />

                  <h2 className="text-xl font-semibold mb-4">Patient Information</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      type="text"
                      name="ownerName"
                      placeholder="Owner's Full Name"
                      value={formData.ownerName}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                    <input
                      type="text"
                      name="petName"
                      placeholder="Pet's Name"
                      value={formData.petName}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                    <input
                      type="text"
                      name="animalType"
                      placeholder="Kind of Animal"
                      value={formData.animalType}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                    <input
                      type="text"
                      name="breed"
                      placeholder="Pet's Breed"
                      value={formData.breed}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                    <button
                      type="submit"
                      className="w-full py-2 bg-blue-500 text-white hover:bg-blue-600 transition duration-300 rounded"
                    >
                      Confirm Booking
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}