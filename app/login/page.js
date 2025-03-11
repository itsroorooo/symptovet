"use client";

import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data, error: supabaseError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (supabaseError) {
        throw supabaseError;
      }

      console.log("Login successful:", data);
      router.push("/user/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      if (error.message.includes("Invalid login credentials")) {
        setError("Incorrect email and password. Please try again.");
      } else {
        setError("An error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = async (provider) => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
      });
      if (error) throw error;
      console.log(`${provider} login successful:`, data);
    } catch (error) {
      console.error(`${provider} login error:`, error);
      setError(`Failed to login with ${provider}. Please try again.`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-sm sm:max-w-md md:max-w-lg p-6 h-auto relative">
        <div className="bg-white w-full p-4 sm:p-6">
          <div className="text-center mb-4">
            <h3 className="text-xl sm:text-2xl font-bold text-blue-500">
              Welcome Back!
            </h3>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                  error ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Email Address"
                aria-label="Email Address"
              />
            </div>

            <div className="mb-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                  error ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Password"
                aria-label="Password"
              />
            </div>

            {error && (
              <div className="mb-4 text-red-500 text-sm">
                {error}
              </div>
            )}

            <div className="flex justify-between items-center mb-4 text-xs sm:text-sm">
              <label className="flex items-center text-gray-700">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded mr-2"
                  aria-label="Remember Me"
                />
                Remember me
              </label>
              <a
                href="/forgot-password"
                className="text-blue-600 font-semibold hover:underline"
              >
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-2 rounded-md text-white bg-blue-600 hover:bg-black text-sm sm:text-lg font-semibold shadow-md transition duration-300 flex justify-center items-center"
              disabled={loading}
              aria-label="Login"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Login"
              )}
            </button>

            <div className="flex items-center justify-center my-4">
              <hr className="w-full border-gray-300" />
              <span className="mx-2 text-gray-500 font-medium">or</span>
              <hr className="w-full border-gray-300" />
            </div>

            <button
              type="button"
              onClick={() => handleOAuthLogin("google")}
              className="w-full flex items-center justify-center py-2 rounded-lg bg-white border border-gray-300 text-gray-800 font-semibold shadow-sm transition-all duration-300 hover:bg-gray-300"
              aria-label="Continue with Google"
            >
              <Image
                src="/image/google.png"
                width={20}
                height={20}
                alt="Google Logo"
                className="mr-2"
              />
              Continue with Google
            </button>

            <button
              type="button"
              onClick={() => handleOAuthLogin("facebook")}
              className="w-full flex items-center justify-center py-2 mt-3 rounded-lg bg-white border border-gray-300 text-gray-800 font-semibold shadow-sm transition-all duration-300 hover:bg-gray-300"
              aria-label="Continue with Facebook"
            >
              <Image
                src="/image/facebook.png"
                width={20}
                height={20}
                alt="Facebook Logo"
                className="mr-2"
              />
              Continue with Facebook
            </button>

            <p className="text-gray-800 text-xs sm:text-sm text-center mt-4">
              Don't have an account?{" "}
              <a
                href="/register"
                className="text-blue-600 font-semibold hover:underline cursor-pointer"
              >
                Create
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
