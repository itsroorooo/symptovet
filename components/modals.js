"use client";

import { useState } from "react";
import Image from "next/image";

export default function AuthModal({
  isOpen,
  onClose,
  isRegister,
  setIsRegister,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white shadow-lg rounded-lg max-w-4xl w-full p-6 h-[600px] relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-white cursor-pointer hover:bg-gray-900 px-3 py-2 rounded transition duration-300"
        >
          ✖
        </button>

        {/* Modal Layout */}
        <div className="grid md:grid-cols-2 items-center gap-6">
          {/* Left Side (Image) */}
          <div className="hidden md:flex items-center justify-center w-full">
            <Image
              src="/veterinary.jpg"
              width={500}
              height={500}
              className="w-full h-auto max-h-[550px] object-cover rounded-lg"
              alt="Vet Illustration"
            />
          </div>

          {/* Right Side (Form) */}
          <div className="bg-white w-full p-6">
            <div className="text-center mb-4">
              <h3 className="text-2xl font-bold text-blue-500">
                {isRegister ? "Create an Account" : "Welcome Back!"}
              </h3>
            </div>

            <form>
              {/* Name Input (Only for Register) */}
              {isRegister && (
                <div className="mb-4 relative">
                  <input
                    type="text"
                    required
                    className="w-full text-sm border border-gray-300 rounded-md focus:border-blue-600 px-4 py-2 outline-none"
                    placeholder="Enter your name"
                  />
                </div>
              )}

              {/* Email Input */}
              <div className="mb-4 relative">
                <input
                  type="email"
                  required
                  className="w-full text-sm border border-gray-300 rounded-md focus:border-blue-600 px-4 py-2 outline-none"
                  placeholder="Email Address"
                />
              </div>

              {/* Password Input */}
              <div className="mb-4 relative">
                <input
                  type="password"
                  required
                  className="w-full text-sm border border-gray-300 rounded-md focus:border-blue-600 px-4 py-2 outline-none"
                  placeholder="Password"
                />
              </div>

              {/* Confirm Password (Only for Register) */}
              {isRegister && (
                <div className="mb-4 relative">
                  <input
                    type="password"
                    required
                    className="w-full text-sm border border-gray-300 rounded-md focus:border-blue-600 px-4 py-2 outline-none"
                    placeholder="Confirm your password"
                  />
                </div>
              )}

              {/* Remember Me / Forgot Password */}
              {!isRegister && (
                <div className="flex justify-between items-center mb-4">
                  <label className="flex items-center text-gray-700">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded mr-2"
                    />
                    Remember me
                  </label>
                  <a
                    href="#"
                    className="text-blue-600 text-sm font-semibold hover:underline"
                  >
                    Forgot Password?
                  </a>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 text-lg font-semibold shadow-md transition duration-300"
              >
                {isRegister ? "Get Started" : "Login"}
              </button>

              {/* OR Separator*/}
              <div className="flex items-center justify-center my-4">
                <hr className="w-full border-gray-300" />
                <span className="mx-2 text-gray-500 font-medium">or</span>
                <hr className="w-full border-gray-300" />
              </div>

              {/* Google button */}
              <button className="w-full flex items-center justify-center py-2 rounded-lg bg-white border border-gray-300 text-gray-800 font-semibold shadow-sm transition-all duration-300 hover:bg-gray-200">
                <Image
                  src="/google.png"
                  width={20}
                  height={20}
                  alt="Google Logo"
                  className="mr-2"
                />
                {isRegister ? "Create with Google" : "Login with Google"}
              </button>

              {/* Facebook button */}
              <button className="w-full flex items-center justify-center py-2 mt-3 rounded-lg bg-white border border-gray-300 text-gray-800 font-semibold shadow-sm transition-all duration-300 hover:bg-gray-200">
                <Image
                  src="/facebook.png"
                  width={20}
                  height={20}
                  alt="Google Logo"
                  className="mr-2"
                />
                {isRegister ? "Create with Facebook" : "Login with Facebook"}
              </button>

              {/* Toggle Between Login & Register */}
              <p className="text-gray-800 text-sm text-center mt-4">
                {isRegister
                  ? "Already have an account?"
                  : "Don't have an account?"}{" "}
                <span
                  onClick={() => setIsRegister(!isRegister)}
                  className="text-blue-600 font-semibold hover:underline cursor-pointer"
                >
                  {isRegister ? "Login" : "Create"}
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
