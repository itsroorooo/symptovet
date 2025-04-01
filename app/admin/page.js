"use client";

import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import VetClinicAdmin from "./VetClinicAdmin";
import UserAdmin from "./UserAdmin";
import Image from "next/image";

export default function AdminDashboard() {
  // Sample data for users
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      status: "pending",
      signupDate: "2023-10-15",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      status: "pending",
      signupDate: "2023-10-16",
    },
    {
      id: 3,
      name: "Alex Johnson",
      email: "alex@example.com",
      status: "pending",
      signupDate: "2023-10-17",
    },
  ]);

  // Sample data for vet clinics
  const [vetClinics, setVetClinics] = useState([
    {
      id: 1,
      name: "Happy Paws Clinic",
      email: "clinic1@example.com",
      status: "pending",
      signupDate: "2023-10-10",
    },
    {
      id: 2,
      name: "Healthy Pets Vet",
      email: "clinic2@example.com",
      status: "approved",
      signupDate: "2023-10-12",
    },
    {
      id: 3,
      name: "Careful Companions",
      email: "clinic3@example.com",
      status: "rejected",
      signupDate: "2023-10-14",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  // State for sidebar visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // State for active component
  const [activeComponent, setActiveComponent] = useState("home");

  // Sample statistics data
  const stats = {
    totalUsers: 1200,
    activeUsers: 850,
    pendingApprovals: 15,
    totalVetClinics: 300,
  };

  // Function to toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // Ensure sidebar visibility is set after the component mounts
  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 768);
    };

    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Update URL hash for navigation in a client-safe way
  const handleSetActiveComponent = (component) => {
    setActiveComponent(component);
    if (typeof window !== "undefined") {
      window.history.pushState(null, "", `#${component}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
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
          setActiveComponent={handleSetActiveComponent}
        />
      </div>

      {/* Main Content */}
      <div className="ml-64">
        {activeComponent === "home" && (
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Dashboard Statistics</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-100 rounded-lg">
                <h2 className="text-lg font-semibold">Total Users</h2>
                <p className="text-2xl font-bold">{stats.totalUsers}</p>
              </div>
              <div className="p-4 bg-green-100 rounded-lg">
                <h2 className="text-lg font-semibold">Active Users</h2>
                <p className="text-2xl font-bold">{stats.activeUsers}</p>
              </div>
              <div className="p-4 bg-yellow-100 rounded-lg">
                <h2 className="text-lg font-semibold">Pending Approvals</h2>
                <p className="text-2xl font-bold">{stats.pendingApprovals}</p>
              </div>
              <div className="p-4 bg-purple-100 rounded-lg">
                <h2 className="text-lg font-semibold">Total Vet Clinics</h2>
                <p className="text-2xl font-bold">{stats.totalVetClinics}</p>
              </div>
            </div>
          </div>
        )}
        {activeComponent === "vet" && (
          <VetClinicAdmin
            searchTerm={searchTerm}
            filteredUsers={vetClinics.filter(
              (clinic) =>
                clinic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                clinic.email.toLowerCase().includes(searchTerm.toLowerCase())
            )}
            users={vetClinics}
            handleAction={(id, action) =>
              setVetClinics(
                vetClinics.map((clinic) =>
                  clinic.id === id ? { ...clinic, status: action } : clinic
                )
              )
            }
            setSearchTerm={setSearchTerm}
          />
        )}
        {activeComponent === "user" && (
          <UserAdmin
            users={users.filter(
              (user) =>
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase())
            )}
            handleAction={(id, action) =>
              setUsers(
                users.map((user) =>
                  user.id === id ? { ...user, status: action } : user
                )
              )
            }
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        )}
        {/* Add other components conditionally as needed */}
      </div>
    </div>
  );
}