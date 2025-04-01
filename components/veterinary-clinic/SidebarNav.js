// components/SidebarNav.jsx
'use client';

import {
  HomeIcon,
  ClipboardDocumentListIcon,
  CalendarIcon,
  BeakerIcon,
  UserCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useState } from 'react'; // Import useState

export default function SidebarNav({ sidebarOpen, setSidebarOpen, navItems }) {
  // State to track the active navigation item
  const [activeNav, setActiveNav] = useState(navItems.find((item) => item.current)?.name || '');

  // Function to handle navigation item clicks
  const handleNavClick = (name) => {
    setActiveNav(name); // Update the active navigation item
  };

  return (
    <>
      {/* Mobile sidebar overlay */}
      <div
        className={`fixed inset-0 z-40 bg-gray-600 bg-opacity-75 transition-opacity duration-300 lg:hidden ${
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Mobile sidebar */}
      <div
        className={`fixed inset-y-0 left-0 flex flex-col z-40 w-64 max-w-xs transform transition duration-300 ease-in-out bg-gray-900 lg:hidden ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo and Name */}
        <div className="p-4 flex flex-col items-center">
          <Image
            src="/image/Logoblue.png" // Replace with your vet clinic logo
            alt="SymptoVet Logo"
            width={112}
            height={112}
            className="w-28 h-28"
          />
          <span className="text-3xl font-bold mt-4">
            <span className="text-white">Sympto</span>
            <span className="text-blue-500">Vet</span>
          </span>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto pt-5 pb-4">
          <nav className="mt-5 px-2 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => handleNavClick(item.name)} // Update active state on click
                className={`group flex items-center px-4 py-3 text-lg font-medium rounded-md ${
                  activeNav === item.name
                    ? 'bg-blue-500 text-white' // Active state
                    : 'text-gray-300 hover:bg-blue-500 hover:text-white' // Inactive state
                }`}
              >
                <item.icon
                  className={`mr-4 h-8 w-8 ${
                    activeNav === item.name
                      ? 'text-white' // Active state
                      : 'text-blue-500 group-hover:text-white' // Inactive state
                  }`}
                />
                <span>{item.name}</span>
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64 bg-gray-900">
          {/* Logo and Name */}
          <div className="p-4 flex flex-col items-center">
            <Image
              src="/image/Logoblue.png" // Replace with your vet clinic logo
              alt="SymptoVet Logo"
              width={112}
              height={112}
              className="w-28 h-28"
            />
            <span className="text-3xl font-bold mt-4">
              <span className="text-white">Sympto</span>
              <span className="text-blue-500">Vet</span>
            </span>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 flex flex-col overflow-y-auto">
            <nav className="flex-1 px-2 py-4 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => handleNavClick(item.name)} // Update active state on click
                  className={`group flex items-center px-4 py-3 text-lg rounded-md ${
                    activeNav === item.name
                      ? 'bg-blue-500 text-white' // Active state
                      : 'text-white hover:bg-blue-500 hover:text-white' // Inactive state
                  }`}
                >
                  <item.icon
                    className={`mr-4 h-8 w-8 ${
                      activeNav === item.name
                        ? 'text-white' // Active state
                        : 'text-blue-500 group-hover:text-white' // Inactive state
                    }`}
                  />
                  <span>{item.name}</span>
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}