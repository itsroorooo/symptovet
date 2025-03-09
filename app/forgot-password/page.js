"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const { data, error: supabaseError } =
        await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });

      if (supabaseError) {
        throw supabaseError;
      }

      setMessage("Password reset email sent. Please check your inbox.");
    } catch (error) {
      console.error("Error sending reset email:", error);
      setError("Failed to send reset email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-sm sm:max-w-md md:max-w-lg p-6 h-auto relative">
        <div className="bg-white w-full p-4 sm:p-6">
          <div className="text-center mb-4">
            <h3 className="text-xl sm:text-2xl font-bold text-blue-500">
              Forgot Password
            </h3>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className="mb-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full text-sm border border-gray-300 rounded-md focus:border-blue-600 px-4 py-2 outline-none"
                placeholder="Email Address"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 text-red-500 text-sm text-center">
                {error}
              </div>
            )}

            {/* Success Message */}
            {message && (
              <div className="mb-4 text-green-500 text-sm text-center">
                {message}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 rounded-md text-white bg-blue-600 hover:bg-black text-sm sm:text-lg font-semibold shadow-md transition duration-300 flex justify-center items-center"
              disabled={loading}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Send Reset Email"
              )}
            </button>

            {/* Back to Login */}
            <p className="text-gray-800 text-xs sm:text-sm text-center mt-4">
              Remember your password?{" "}
              <a
                href="/login"
                className="text-blue-600 font-semibold hover:underline cursor-pointer"
              >
                Login
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
