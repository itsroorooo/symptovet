"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle, Circle } from "lucide-react";
import { supabase } from "../../../components/user/supabaseClient";
import Sidebar from "../../../components/user/Sidebar";
import Image from "next/image";
import Link from "next/link";

export default function SymptomsPage() {
  const [symptoms, setSymptoms] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [symptomToEquipment, setSymptomToEquipment] = useState({});
  const [requiredEquipment, setRequiredEquipment] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState("symptoms");
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    const fetchSymptomsAndEquipment = async () => {
      const { data: symptomsData, error: symptomsError } = await supabase
        .from("symptoms")
        .select("id, name, description");

      if (symptomsError) {
        console.error("Error fetching symptoms:", symptomsError);
        return;
      }

      setSymptoms(symptomsData);
      setSelectedSymptoms(Array(symptomsData.length).fill(false));

      const { data: symptomEquipmentData, error: equipmentError } = await supabase
        .from("symptom_equipment")
        .select("symptom_id, equipment (name)");

      if (equipmentError) {
        console.error("Error fetching symptom-equipment mapping:", equipmentError);
        return;
      }

      const mapping = {};
      symptomEquipmentData.forEach((item) => {
        const symptomId = item.symptom_id;
        const equipmentName = item.equipment.name;

        if (!mapping[symptomId]) {
          mapping[symptomId] = [];
        }
        mapping[symptomId].push(equipmentName);
      });

      setSymptomToEquipment(mapping);
    };

    fetchSymptomsAndEquipment();
  }, []);

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

  const toggleSymptom = (index) => {
    const updatedSymptoms = [...selectedSymptoms];
    updatedSymptoms[index] = !updatedSymptoms[index];
    setSelectedSymptoms(updatedSymptoms);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selected = symptoms.filter((_, index) => selectedSymptoms[index]);

    let requiredEquipment = [];
    selected.forEach((symptom) => {
      const equipmentList = symptomToEquipment[symptom.id] || [];
      requiredEquipment = [...new Set([...requiredEquipment, ...equipmentList])];
    });

    setRequiredEquipment(requiredEquipment);
    setActiveComponent("map");
  };

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
          setActiveComponent={setActiveComponent}
        />
      </div>

      {/* Header - Fixed at the top */}
      <header className="bg-white shadow-md py-4 px-4 md:px-10 fixed w-full z-40" style={{ left: isSidebarOpen ? '256px' : '0', width: isSidebarOpen ? 'calc(100% - 256px)' : '100%' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-blue-500">
              {activeComponent === "symptoms" ? "Symptoms" : 
               activeComponent === "map" ? "Veterinary Map" : 
               activeComponent.charAt(0).toUpperCase() + activeComponent.slice(1)}
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
        className="pt-24 pb-6 px-4 md:px-10 overflow-auto" 
        style={{ 
          marginLeft: isSidebarOpen ? '256px' : '0',
          width: isSidebarOpen ? 'calc(100% - 256px)' : '100%',
          height: 'calc(100vh - 80px)'
        }}
      >
        {activeComponent === "symptoms" && (
          <div className="w-full flex items-center justify-center">
            <form
              onSubmit={handleSubmit}
              className="bg-white w-full max-w-6xl p-6 rounded-lg shadow-md"
            >
              <h1 className="text-2xl font-semibold text-center mb-6">
                SYMPTOMS LIST
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 overflow-y-auto max-h-[400px]">
                {symptoms.map((symptom, index) => (
                  <div
                    key={symptom.id}
                    className="w-full border border-gray-300 p-3 rounded-full cursor-pointer flex items-center justify-between transition duration-200 hover:bg-gray-100"
                    onClick={() => toggleSymptom(index)}
                  >
                    <span>{symptom.name}</span>
                    {selectedSymptoms[index] ? (
                      <CheckCircle className="text-green-500" />
                    ) : (
                      <Circle className="text-gray-400" />
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <label className="block font-semibold mb-2">
                  Additional info:
                </label>
                <textarea
                  className="w-full p-3 border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-900"
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  rows="3"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full mt-6 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition duration-300 font-medium"
              >
                Submit
              </button>
            </form>
          </div>
        )}
        {activeComponent === "map" && (
          <div className="w-full">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Recommended Equipment</h2>
              <ul className="list-disc pl-5">
                {requiredEquipment.map((equipment, index) => (
                  <li key={index} className="mb-1">
                    {equipment}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}