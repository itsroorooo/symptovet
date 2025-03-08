"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import ReCAPTCHA from "react-google-recaptcha";

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
  const [captchaValue, setCaptchaValue] = useState(null);

  const router = useRouter();
  const supabase = createClient();

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  const verifyCaptcha = async (token) => {
    const response = await fetch("/api/verify-captcha", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ captchaValue: token }),
    });

    const data = await response.json();
    return data.success;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Reset errors
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

    // Validation rules
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
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: fname,
            last_name: lname,
          },
        },
      });

      if (error) throw error;

      console.log("Registration successful:", data);
      router.push("/user/dashboard"); // Redirect to user dashboard
    } catch (error) {
      console.error("Registration error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg max-w-sm sm:max-w-md md:max-w-lg p-6 h-auto relative">
        {/* Modal Layout */}
        <div className="items-center gap-4">
          {/* Right Side (Form) */}
          <div className="bg-white w-full p-6">
            <div className="text-center mb-4">
              <h3 className="text-2xl font-bold text-blue-500">
                Create an Account
              </h3>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Name Input */}
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

              {/* Password Input */}
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

              {/* Confirm Password */}
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

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 text-lg font-semibold shadow-md transition duration-300"
                disabled={loading}
              >
                {loading ? "Processing..." : "Get Started"}
              </button>

              {/* OR Separator */}
              <div className="flex items-center justify-center my-4">
                <hr className="w-full border-gray-300" />
                <span className="mx-2 text-gray-500 font-medium">or</span>
                <hr className="w-full border-gray-300" />
              </div>

              {/* Google button */}
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

              {/* Facebook button */}
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

              {/* Toggle Between Login & Register */}
              <p className="text-gray-800 text-sm text-center mt-4">
                Already have an account?{" "}
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
    </div>
  );
}
