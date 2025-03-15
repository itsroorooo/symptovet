"use client";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LogoutPage() {
  const router = useRouter();
  const supabase = createClient();
  const [message, setMessage] = useState("Logging out..."); // State for displaying messages

  useEffect(() => {
    const handleLogout = async () => {
      try {
        const { error } = await supabase.auth.signOut();

        if (error) {
          throw error;
        }

        // Set success message
        setMessage("Signed out successfully. Redirecting to login...");

        // Redirect to the login page after a short delay
        setTimeout(() => {
          router.push("/auth/login");
        }, 2000); // 2-second delay
      } catch (error) {
        // Set error message
        setMessage("Failed to sign out. Redirecting to home...");
        console.error("Error during sign out:", error.message);

        // Redirect to the home page after a short delay
        setTimeout(() => {
          router.push("/home");
        }, 2000); // 2-second delay
      }
    };

    handleLogout();
  }, [router, supabase]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <p>{message}</p> {/* Display the message */}
    </div>
  );
}
