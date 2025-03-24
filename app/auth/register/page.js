"use client";

import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Loading from "@/components/Loading";

export default function Register() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [otpSent, setOtpSent] = useState(false); // Track if OTP has been sent
  const [otp, setOtp] = useState(""); // Store OTP input
  const [otpError, setOtpError] = useState(""); // OTP error message

  const router = useRouter();
  const supabase = createClient();

  // Check if email already exists
  const checkEmailExists = async (email) => {
    const { data, error } = await supabase
      .from("users")
      .select("email")
      .eq("email", email)
      .single();

    if (error && error.code !== "PGRST116") {
      console.error("Error checking email:", error);
      return false;
    }

    return !!data; // Returns true if email exists
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Reset errors
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

    // Validation rules
    if (!fname || !lname) {
      alert("Please fill in your first and last name.");
      setLoading(false);
      return;
    }

    if (!email || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      setLoading(false);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      // Send 6-digit OTP to the user's email
      const { data, error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          data: {
            first_name: fname,
            last_name: lname,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          shouldCreateUser: true, // Ensure a new user is created
        },
      });

      if (error) throw error;

      console.log("OTP sent:", data);
      setOtpSent(true); // Show OTP input field
      setShowNotification(true); // Show success notification
    } catch (error) {
      console.error("OTP sending error:", error);
      if (error.message.includes("User already registered")) {
        setEmailError("This email is already registered.");
      } else {
        alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setLoading(true);
    setOtpError("");

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: "email",
      });

      if (error) throw error;

      console.log("OTP verification successful:", data);
      router.push("/user/dashboard"); // Redirect to dashboard after successful verification
    } catch (error) {
      console.error("OTP verification error:", error);
      setOtpError("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg max-w-sm sm:max-w-md md:max-w-lg p-6 h-auto relative">
        {showNotification && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
            OTP sent to your email!
          </div>
        )}

        <div className="items-center gap-4">
          <div className="bg-white w-full p-6">
            <div className="text-center mb-4">
              <h3 className="text-2xl font-bold text-blue-500">
                Create an Account
              </h3>
            </div>

            <form onSubmit={handleSubmit}>
              {/* First Name and Last Name Inputs */}
              <div className="mb-4 relative flex gap-4">
                <input
                  type="text"
                  onChange={(e) => setFname(e.target.value)}
                  required
                  className="w-1/2 text-sm border border-gray-300 rounded-md focus:border-blue-600 px-4 py-2 outline-none"
                  placeholder="First name"
                />
                <input
                  type="text"
                  onChange={(e) => setLname(e.target.value)}
                  required
                  className="w-1/2 text-sm border border-gray-300 rounded-md focus:border-blue-600 px-4 py-2 outline-none"
                  placeholder="Last name"
                />
              </div>

              {/* Email Input */}
              <div className="mb-4 relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full text-sm border border-gray-300 rounded-md focus:border-blue-600 px-4 py-2 outline-none"
                  placeholder="Email Address"
                />
                {emailError && (
                  <p className="text-red-500 text-sm mt-1">{emailError}</p>
                )}
              </div>

              {/* Password Inputs */}
              <div className="mb-4 relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full text-sm border border-gray-300 rounded-md focus:border-blue-600 px-4 py-2 outline-none"
                  placeholder="Password"
                />
                {passwordError && (
                  <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                )}
              </div>

              <div className="mb-4 relative">
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full text-sm border border-gray-300 rounded-md focus:border-blue-600 px-4 py-2 outline-none"
                  placeholder="Confirm your password"
                />
                {confirmPasswordError && (
                  <p className="text-red-500 text-sm mt-1">
                    {confirmPasswordError}
                  </p>
                )}
              </div>

              {/* OTP Input (Shown after OTP is sent) */}
              {otpSent && (
                <div className="mb-4 relative">
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    className="w-full text-sm border border-gray-300 rounded-md focus:border-blue-600 px-4 py-2 outline-none"
                    placeholder="Enter 6-digit OTP"
                    maxLength={6}
                  />
                  {otpError && (
                    <p className="text-red-500 text-sm mt-1">{otpError}</p>
                  )}
                  <button
                    type="button"
                    onClick={verifyOtp}
                    className="w-full py-2 mt-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 text-lg font-semibold shadow-md transition duration-300"
                    disabled={loading}
                  >
                    {loading ? "Verifying..." : "Verify OTP"}
                  </button>
                </div>
              )}

              {/* Submit Button (Hidden after OTP is sent) */}
              {!otpSent && (
                <button
                  type="submit"
                  className="w-full py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 text-lg font-semibold shadow-md transition duration-300"
                  disabled={loading}
                >
                  {loading ? "Sending OTP..." : "Get Started"}
                </button>
              )}

              {/* OAuth Buttons */}
              <div className="flex items-center justify-center my-4">
                <hr className="w-full border-gray-300" />
                <span className="mx-2 text-gray-500 font-medium">or</span>
                <hr className="w-full border-gray-300" />
              </div>

              <button className="w-full flex items-center justify-center py-2 rounded-lg bg-white border border-gray-300 text-gray-800 font-semibold shadow-sm transition-all duration-300 hover:bg-gray-200">
                <Image
                  src="/image/google.png"
                  width={20}
                  height={20}
                  alt="Google Logo"
                  className="mr-2"
                />
                Create with Google
              </button>

              <button className="w-full flex items-center justify-center py-2 mt-3 rounded-lg bg-white border border-gray-300 text-gray-800 font-semibold shadow-sm transition-all duration-300 hover:bg-gray-200">
                <Image
                  src="/image/facebook.png"
                  width={20}
                  height={20}
                  alt="Facebook Logo"
                  className="mr-2"
                />
                Create with Facebook
              </button>

              {/* Login Link */}
              <p className="text-gray-800 text-sm text-center mt-4">
                Already have an account?{" "}
                <a
                  href="/auth/login"
                  className="text-blue-600 font-semibold hover:underline cursor-pointer"
                >
                  Login
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
