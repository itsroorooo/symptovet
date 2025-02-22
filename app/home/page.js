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
        className="flex flex-col mt-10 md:flex-row items-center mx-auto py-12 px-6 md:px-20 bg-gray-50"
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
          <p>
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
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </section>
    </>
  );
}
