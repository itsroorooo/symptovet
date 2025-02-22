"use client";

import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <>
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
            src="/image/panda.png"
            width={900}
            height={500}
            alt="Panda and Pets"
            quality={100}
            className="object-contain"
          />
        </div>
      </section>

      {/* Offers Section */}
      <section id="offers" className="mx-auto py-8 px-6 md:px-20">
        <h2 className="font-bold mt-4 text-center text-3xl md:text-5xl text-black leading-tight">
          What Does Our Website Offer?
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-8">
          {[
            {
              title: "Locate Your Nearest Vet Clinic",
              image: "/image/map.png",
              description:
                "Quickly find the closest veterinary clinic to ensure your pet gets the care they need without delay. With our easy-to-use tool, locating trusted vets nearby has never been simpler.",
            },
            {
              title: "Book an appointment",
              image: "/image/book.jpeg",
              description:
                "Save time and hassle by booking your pet's appointment online. Choose a convenient time that works for you and ensure your furry friend gets the attention they deserve.",
            },
            {
              title: "Get the Best Expert Advice",
              image: "/image/expert.jpg",
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
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  {card.title}
                </h1>
                <p className="mb-10 text-sm md:text-lg italic text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Us Section */}
      <section
        id="About"
        className="flex flex-col mt-10 md:flex-row items-center mb-12 mx-auto py-12 px-6 md:px-20 bg-gray-50"
      >
        {/* Content (Left Side) */}
        <div className="md:w-1/2 text-justify text-lg md:text-xl text-gray-700">
          <h2 className="font-bold text-3xl text-center md:text-5xl text-black leading-tight mb-12">
            Know More About Our Website
          </h2>
          <p className="mb-6">
            We are passionate about providing the best care for your beloved
            pets. Our mission is to make pet care accessible, convenient, and
            stress-free for pet owners everywhere. We understand that your pets
            are more than just animals; they are cherished members of your
            family.
          </p>
          <p className="mb-6">
            Our platform was founded by a team of pet lovers and veterinary
            professionals who saw the need for a more streamlined approach to
            pet care. Whether you need to find a nearby vet, book an
            appointment, or get expert advice, we are here to help you every
            step of the way.
          </p>
          <p className="mb-6">
            What sets us apart is our commitment to quality and convenience. We
            partner with trusted veterinarians and pet care experts to ensure
            that your pets receive the highest standard of care. Our
            user-friendly platform is designed to save you time and provide
            peace of mind, knowing that your pets are in good hands.
          </p>
          <p className="mb-6">
            Join our growing community of pet owners who trust us to keep their
            pets healthy and happy. Together, we can make pet care easier and
            more enjoyable for everyone.
          </p>
        </div>

        {/* Image Container (Right Side) */}
        <div className="md:w-1/2 relative flex mt-8 md:mt-0">
          {/* First Image */}
          <div className="w-96 h-96  relative z-10 flex overflow-hidden rounded-lg shadow-lg ml-44">
            <Image
              src="/image/deku.jpg"
              width={500}
              height={400}
              alt="Baby dog color black"
              quality={100}
              className="object-cover"
            />
          </div>

          {/* Second Image (Overlapping) */}
          <div className="w-96 h-96 absolute top-1/4 left-1/2 transform -translate-y-1/5 -translate-x-1/5 z-20 rounded-lg shadow-lg overflow-hidden">
            <Image
              src="/image/kuromi.jpg"
              width={384}
              height={384}
              alt="About Us Pets 2"
              quality={100}
              className="object-cover w-full h-full mb-6"
            />
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="contact">
        <div className="h-60 w-full bg-gray-900 mt-24"></div>

        <div className="max-w-5xl max-md:max-w-xl max-sm:max-w-sm mx-auto -mt-48 px-6">
          <h2 className="text-4xl max-md:text-xl text-center font-extrabold text-white mb-12">
            Meet the Team
          </h2>

          <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8 max-sm:justify-center text-center">
            <div className="bg-white rounded-lg p-6 shadow-md hover:scale-105 transition-all duration-500">
              <div className="lg:min-h[250px]">
                <Image
                  src="/image/rose.jpg"
                  width={200}
                  height={200}
                  alt="Person 1"
                  quality={100}
                  className="w-full rounded-lg inline-block object-cover"
                />
              </div>
              <div className="mt-6">
                <h4 className="text-gray-800 text-lg font-bold">
                  Rose Ann Baqueran
                </h4>
                <p className="text-sm text-gray-500 mt-1">CEO</p>

                <div className="space-x-4 mt-6">
                  <button
                    type="button"
                    className="w-7 h-7 inline-flex items-center justify-center rounded-full border-none outline-none bg-gray-100 hover:bg-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12px"
                      fill="#333"
                      viewBox="0 0 155.139 155.139"
                    >
                      <path
                        d="M89.584 155.139V84.378h23.742l3.562-27.585H89.584V39.184c0-7.984 2.208-13.425 13.67-13.425l14.595-.006V1.08C115.325.752 106.661 0 96.577 0 75.52 0 61.104 12.853 61.104 36.452v20.341H37.29v27.585h23.814v70.761h28.48z"
                        data-original="#010002"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="w-7 h-7 inline-flex items-center justify-center rounded-full border-none outline-none bg-gray-100 hover:bg-gray-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14px"
                      fill="#333"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                        data-original="#000000"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="w-7 h-7 inline-flex items-center justify-center rounded-full border-none outline-none bg-gray-100 hover:bg-gray-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14px"
                      fill="#333"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                        data-original="#000000"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md hover:scale-106 transtion-all duration-500">
              <div className="lg:min-h-[250px]">
                <Image
                  src="/image/megan.jpg"
                  width={192}
                  height={192}
                  alt="Person 2"
                  quality={100}
                  className="w-full rounded-lg inline-block object-cover"
                />
              </div>
              <div className="mt-6">
                <h4 className="text-gray-800 text-lg font-bold">
                  Megan Binondo
                </h4>
                <p className="text-sm text-gray-600 mt-1">CEO</p>

                <div className="space-x-4 mt-6">
                  <button
                    type="button"
                    className="w-7 h-7 inline-flex items-center justify-center rounded-full border-none outline-none bg-gray-100 hover:bg-gray-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12px"
                      fill="#333"
                      viewBox="0 0 155.139 155.139"
                    >
                      <path
                        d="M89.584 155.139V84.378h23.742l3.562-27.585H89.584V39.184c0-7.984 2.208-13.425 13.67-13.425l14.595-.006V1.08C115.325.752 106.661 0 96.577 0 75.52 0 61.104 12.853 61.104 36.452v20.341H37.29v27.585h23.814v70.761h28.48z"
                        data-original="#010002"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="w-7 h-7 inline-flex items-center justify-center rounded-full border-none outline-none bg-gray-100 hover:bg-gray-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14px"
                      fill="#333"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                        data-original="#000000"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="w-7 h-7 inline-flex items-center justify-center rounded-full border-none outline-none bg-gray-100 hover:bg-gray-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14px"
                      fill="#333"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                        data-original="#000000"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md hover:scale-105 transition-all duration-500">
              <div className="lg:min-h-[250px]">
                <Image
                  src="/image/ahra.jpg"
                  width={192}
                  height={192}
                  alt="Person 2"
                  quality={100}
                  className="w-full rounded-lg inline-block object-cover"
                />
              </div>
              <div className="mt-6">
                <h4 className="text-gray-800 text-lg font-bold">
                  Princess Ahra Herbolingo
                </h4>
                <p className="text-sm text-gray-600 mt-1">CEO</p>

                <div className="space-x-5 mt-6">
                  <button
                    type="button"
                    className="w-7 h-7 inline-flex items-center justify-center rounded-full border-none outline-none bg-gray-100 hover:bg-gray-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12px"
                      fill="#333"
                      viewBox="0 0 155.139 155.139"
                    >
                      <path
                        d="M89.584 155.139V84.378h23.742l3.562-27.585H89.584V39.184c0-7.984 2.208-13.425 13.67-13.425l14.595-.006V1.08C115.325.752 106.661 0 96.577 0 75.52 0 61.104 12.853 61.104 36.452v20.341H37.29v27.585h23.814v70.761h28.48z"
                        data-original="#010002"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="w-7 h-7 inline-flex items-center justify-center rounded-full border-none outline-none bg-gray-100 hover:bg-gray-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14px"
                      fill="#333"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                        data-original="#000000"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="w-7 h-7 inline-flex items-center justify-center rounded-full border-none outline-none bg-gray-100 hover:bg-gray-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14px"
                      fill="#333"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                        data-original="#000000"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
