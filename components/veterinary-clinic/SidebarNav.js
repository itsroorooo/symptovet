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

export default function SidebarNav({ sidebarOpen, setSidebarOpen, navItems }) {
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
        <div className="flex items-center justify-between h-16 flex-shrink-0 px-4 bg-gray-900 border-b border-gray-800">
          <div className="flex items-center space-x-2">
            <Image
              src="/image/Logoblue.png" // Replace with your vet clinic logo
              alt="SymptoVet Logo"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <h1 className="text-xl font-bold text-white">
              <span className="text-white">Sympto</span>
              <span className="text-blue-500">Vet</span>
            </h1>
          </div>
          <button
            className="h-10 w-10 flex items-center justify-center text-gray-400 hover:text-white focus:outline-none"
            onClick={() => setSidebarOpen(false)}
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto pt-5 pb-4">
          <nav className="mt-5 px-2 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                  item.current
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-300 hover:bg-blue-500 hover:text-white'
                }`}
              >
                <item.icon
                  className={`mr-4 h-6 w-6 ${
                    item.current ? 'text-white' : 'text-gray-400 group-hover:text-white'
                  }`}
                />
                {item.name}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64 bg-gray-900">
          <div className="flex items-center h-16 flex-shrink-0 px-4 bg-gray-900 border-b border-gray-800">
            <div className="flex items-center space-x-2">
              <Image
                src="/image/Logoblue.png" // Replace with your vet clinic logo
                alt="SymptoVet Logo"
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <h1 className="text-2xl font-bold text-white">
                <span className="text-white">Sympto</span>
                <span className="text-blue-500">Vet</span>
              </h1>
            </div>
          </div>
          <div className="flex-1 flex flex-col overflow-y-auto">
            <nav className="flex-1 px-2 py-4 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    item.current
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-300 hover:bg-blue-500 hover:text-white'
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-6 w-6 ${
                      item.current ? 'text-white' : 'text-gray-400 group-hover:text-white'
                    }`}
                  />
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}