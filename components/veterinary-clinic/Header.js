'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter
import { Bars3Icon, BellIcon, UserCircleIcon } from '@heroicons/react/24/outline';

export default function Header({ sidebarOpen, setSidebarOpen, title }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const dropdownRef = useRef(null); // Ref for the dropdown
  const notificationRef = useRef(null); // Ref for the notification dropdown
  const router = useRouter(); // Initialize the router

  // Dummy notification data
  const notifications = [
    { id: 1, message: "New appointment scheduled for Max (Golden Retriever)", time: "2 hours ago" },
    { id: 2, message: "Lab results for Bella (Poodle) are ready", time: "5 hours ago" },
    { id: 3, message: "Equipment maintenance reminder", time: "1 day ago" },
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    // Implement logout logic here
    console.log('User logged out');
  };

  const handleProfile = () => {
    router.push('/veterinary-clinic/profile'); // Redirect to the profile page
  };

  const handleViewAllNotifications = () => {
    router.push('/veterinary-clinic/notifications'); // Redirect to the notifications page
  };

  return (
    <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow-md">
      {/* Glowing bottom border */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-400 shadow-glow"></div>

      <button
        className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <Bars3Icon className="h-6 w-6" />
      </button>

      <div className="flex-1 px-4 md:px-10 flex justify-between items-center">
        <div className="flex-1 flex items-center">
          <h2 className="text-lg font-medium text-gray-900">{title}</h2>
        </div>

        <div className="ml-4 flex items-center md:ml-6">
          {/* Notification button with tooltip */}
          <div className="relative" ref={notificationRef}>
            <div className="group relative">
              <button
                onClick={() => setIsNotificationOpen(!isNotificationOpen)} // Toggle notification dropdown
                className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 relative"
              >
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-6 w-6" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
              </button>
              {/* Tooltip */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-gray-300 text-white text-xs rounded-md duration-200 opacity-0 group-hover:opacity-100">
                <div className="bg-gray-300 text-white text-xs  px-2 py-1 whitespace-nowrap">
                  Notifications
                </div>
              </div>
            </div>

            {/* Notification dropdown */}
            {isNotificationOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-2">
                  {/* Notification items */}
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <p className="font-medium">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                  ))}
                  {/* View All button */}
                  <button
                    onClick={handleViewAllNotifications}
                    className="block w-full px-4 py-2 text-sm text-center text-blue-600 hover:bg-gray-50"
                  >
                    View All
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile dropdown */}
          <div className="ml-3 relative" ref={dropdownRef}>
            <div>
              <button
                onClick={toggleDropdown}
                className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="sr-only">Open user menu</span>
                <UserCircleIcon className="h-8 w-8 text-gray-400" />
              </button>
            </div>

            {isDropdownOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                  <button
                    onClick={handleProfile}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    role="menuitem"
                  >
                    Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    role="menuitem"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}