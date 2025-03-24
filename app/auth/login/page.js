"use client";

import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Loading from "@/components/Loading";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // For form submission
  const [emailError, setEmailError] = useState(""); // For email-specific errors
  const [passwordError, setPasswordError] = useState(""); // For password-specific errors
  const [isNavigating, setIsNavigating] = useState(false); // For route navigation
  const [rememberMe, setRememberMe] = useState(false); // For "Remember Me" checkbox

  const router = useRouter();
  const supabase = createClient();

  // Load the "Remember Me" preference from localStorage on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedRememberMe = localStorage.getItem("rememberMe") === "true";
      setRememberMe(savedRememberMe);
    }
  }, []);

  // Save the "Remember Me" preference to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("rememberMe", rememberMe);
    }
  }, [rememberMe]);

  const handleCheckboxChange = () => {
    setRememberMe(!rememberMe); // Toggle the checkbox state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setEmailError(""); // Clear previous email errors
    setPasswordError(""); // Clear previous password errors

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
      setIsNavigating(true); // Show loading spinner during navigation
      router.push("/user/dashboard"); // Navigate to dashboard
    } catch (error) {
      console.error("Login error:", error);

      // Handle specific error cases
      if (
        error.status === 400 &&
        error.message.includes("Invalid login credentials")
      ) {
        // Check if the email exists in the database
        const { data: user, error: userError } = await supabase
          .from("auth.users") // Replace "users" with your actual table name
          .select("auth.email")
          .eq("auth.email", email)
          .single();

        if (userError || !user) {
          setEmailError(
            "This email does not exist. Please check your email or register."
          );
        } else {
          setPasswordError("Incorrect password. Please try again.");
        }
      } else {
        setEmailError("An error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = async (provider) => {
    try {
      setLoading(true); // Show loading spinner during OAuth login
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
      });
      if (error) throw error;
      console.log(`${provider} login successful:`, data);
    } catch (error) {
      console.error(`${provider} login error:`, error);
      setEmailError(`Failed to login with ${provider}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      {/* Loading Spinner for Navigation */}
      {isNavigating && <Loading />}

      <div className="bg-white shadow-lg rounded-lg w-full max-w-sm sm:max-w-md md:max-w-lg p-6 h-auto relative">
        <div className="bg-white w-full p-4 sm:p-6">
          <div className="text-center mb-4">
            <h3 className="text-xl sm:text-2xl font-bold text-blue-500">
              Welcome Back!
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
                className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                  emailError ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Email Address"
                aria-label="Email Address"
              />
              {emailError && (
                <div className="text-red-500 text-sm mt-1">{emailError}</div>
              )}
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                  passwordError ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Password"
                aria-label="Password"
              />
              {passwordError && (
                <div className="text-red-500 text-sm mt-1">{passwordError}</div>
              )}
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex justify-between items-center mb-4">
              <label className="flex items-center text-gray-700">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={handleCheckboxChange}
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

            {/* Submit Button */}
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

            {/* OAuth Login Buttons */}
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

            {/* Register Link */}
            <p className="text-gray-800 text-xs sm:text-sm text-center mt-4">
              Don't have an account?{" "}
              <a
                href="/auth/register"
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
