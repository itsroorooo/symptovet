"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useUser } from "@/context/UserContext";

export default function BookingForm({
  clinic,
  selectedDate,
  selectedTime,
  onClose,
  onSuccess,
}) {
  const { user } = useUser();
  const [formData, setFormData] = useState({
    petName: "",
    animalType: "",
    breed: "",
    symptoms: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.from("appointments").insert([
        {
          clinic_id: clinic.id,
          user_id: user.id,
          date: selectedDate.toISOString().split("T")[0],
          time: selectedTime,
          pet_name: formData.petName,
          animal_type: formData.animalType,
          breed: formData.breed,
          symptoms: formData.symptoms,
          status: "pending",
        },
      ]);

      if (error) throw error;

      onSuccess();
    } catch (err) {
      console.error("Booking error:", err);
      setError("Failed to book appointment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">
              Confirm Appointment
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Clinic:</span>
              <span className="font-medium">{clinic.name}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Date:</span>
              <span className="font-medium">
                {selectedDate.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Time:</span>
              <span className="font-medium">{selectedTime}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="petName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Pet's Name
              </label>
              <input
                type="text"
                id="petName"
                name="petName"
                value={formData.petName}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label
                htmlFor="animalType"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Type of Animal
              </label>
              <select
                id="animalType"
                name="animalType"
                value={formData.animalType}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select animal type</option>
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Bird">Bird</option>
                <option value="Rabbit">Rabbit</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="breed"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Breed
              </label>
              <input
                type="text"
                id="breed"
                name="breed"
                value={formData.breed}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label
                htmlFor="symptoms"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Symptoms/Reason for Visit
              </label>
              <textarea
                id="symptoms"
                name="symptoms"
                value={formData.symptoms}
                onChange={handleChange}
                rows={3}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm mt-2">{error}</div>
            )}

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
              >
                {loading ? "Booking..." : "Confirm Booking"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}