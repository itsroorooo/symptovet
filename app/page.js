"use client";

import { useState } from "react";
import Image from "next/image";
import AuthModal from "./components/modals";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  return (
    <>
      {/* Navbar Section */}
      <nav className="bg-gray-900 text-white fixed top-0 left-0 w-full z-50 shadow-md shadow-blue-300">
        <div className="flex items-center justify-between p-4 px-6 md:px-12">
          <div className="flex items-center space-x-2">
            <img
              className="w-14 h-auto"
              src="/Logoblue.png"
              alt="SymptoVet Logo"
            />
            <span className="text-2xl font-bold">
              <span className="text-white">Sympto</span>
              <span className="text-blue-500">Vet</span>
            </span>
          </div>

          <ul className="hidden md:flex text-lg space-x-6">
            <li>
              <a
                href="#Home"
                className="hover:bg-blue-500 hover:text-white px-4 py-2 rounded"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#Offers"
                className="hover:bg-blue-500 hover:text-white px-4 py-2 rounded"
              >
                Offers
              </a>
            </li>
            <li>
              <a
                href="#About"
                className="hover:bg-blue-500 hover:text-white px-4 py-2 rounded"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#Contact"
                className="hover:bg-blue-500 hover:text-white px-4 py-2 rounded"
              >
                Contact
              </a>
            </li>
          </ul>

          {/* Login & Register Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Login Button */}
            <span
              onClick={() => {
                setIsModalOpen(true);
                setIsRegister(false);
              }}
              className="text-lg hover:bg-blue-500 hover:text-white px-4 py-2 rounded cursor-pointer"
            >
              Login
            </span>

            <span className="text-white px-2"> | </span>

            {/* Register Button */}
            <span
              onClick={() => {
                setIsModalOpen(true);
                setIsRegister(true);
              }}
              className="text-lg hover:bg-blue-500 hover:text-white px-4 py-2 rounded cursor-pointer"
            >
              Register
            </span>
          </div>
        </div>
      </nav>

      {/* Home Section */}
      <section
        id="Home"
        className="flex flex-col md:flex-row items-center max-w-full mx-auto px-6 md:px-16 pt-18 space-y-4 md:space-y-6 md:space-x-4"
      >
        {/* Content */}
        <div className="md:w-1/2 lg:w-1/2 mt-40 text-center md:text-left">
          <h1 className="text-center text-3xl md:text-5xl font-bold text-black leading-tight">
            Your Best Option for Pet Care Solutions
          </h1>

          <p className="mt-6 text-justify text-lg md:text-xl text-gray-700 py-6">
            Where health is best! Our platform instantly connects you to pet
            care solutions, ensuring your furry friends receive the attention
            they need right at home. Experience peace of mind knowing that, with
            us, your pets are always just a step away from the care they
            deserve, keeping tails waggin and hearts happy!
          </p>

          {/* Get Started Button */}
          <div className="mt-6 flex justify-center transition ease-in-out delay-100 hover:translate-y-1 hover:scale-110">
            <a
              href="#"
              className="text-lg bg-blue-500 hover:bg-black text-white px-6 py-4 rounded shadow"
            >
              Get Started
            </a>
          </div>
        </div>

        {/* Image */}
        <div className="md:w-1/2 flex justify-center items-center px-6 md:px-12 pt-8 translate-y-10 transition-all duration-700 ease-out- scroll-trigger">
          <Image
            src="/panda.png"
            width={900}
            height={500}
            alt="Panda and Pets"
            quality={100}
            className="object-contain"
          />
        </div>
      </section>

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isRegister={isRegister}
        setIsRegister={setIsRegister}
      />

      {/* Offers Section */}
      <section id="offers" className="mx-auto py-8 px-20">
        <h2 className="font-bold mt-4 text-center text-5xl text-black leading-tight">
          What Does Our Website Offer?
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-8">
          {[
            {
              title: "Locate Your Nearest Vet Clinic",
              image: "/map.png",
              description:
                "Quickly find the closest veterinary clinic to ensure your pet gets the care they need without delay. With our easy-to-use tool, locating trusted vets nearby has never been simpler.",
            },
            {
              title: "Book an appointment",
              image: "/book.jpeg",
              description:
                "Save time and hassle by booking your pet's appointment online. Choose a convenient time that works for you and ensure your furry friend gets the attention they deserve.",
            },
            {
              title: "Get the Best Expert Advice",
              image: "/expert.jpg",
              description:
                "Receive professional guidance from experienced veterinarians. Whether it's a health concern or routine care, trust the experts to provide the best advice for your pet's well-being.",
            },
          ].map((card, index) => (
            <div
              key={index}
              className="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-blue-500"
            >
              <div className="h-96 w-full">
                <Image
                  src={card.image}
                  alt={card.title}
                  width={400}
                  height={400}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
              <div className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
                <h1 className="text-3xl font-bold text-white">{card.title}</h1>
                <p className="mb-10 text-lg italic text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
