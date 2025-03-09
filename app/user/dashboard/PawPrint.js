"use client";

import React from "react";

export default function PawPrint({ className, color = "#8B4513", size = 10 }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 12c-1.1 0-2 .9-2 2s.9 3 2 3 2-1.9 2-3-.9-2-2-2zm-6.4 1.6c-.5-.2-1-.3-1.6-.3-1.7 0-3 1.3-3 3s1.3 3 3 3c.5 0 1.1-.1 1.6-.3 1.6-.7 2.4-2.5 1.7-4.1-.4-.8-1-1.2-1.7-1.3zm12.8 0c-.7.1-1.3.5-1.7 1.3-.7 1.6.1 3.4 1.7 4.1.5.2 1.1.3 1.6.3 1.7 0 3-1.3 3-3s-1.3-3-3-3c-.6 0-1.1.1-1.6.3zm-10.9-1.6c1.7-.3 2.8-2.1 2.5-3.9-.2-1.5-1.3-2.7-2.7-2.9-1.8-.3-3.4 1.2-3.1 3.1.3 1.7 1.7 3 3.3 3.3zm9.2 0c1.7-.3 2.8-2.1 2.5-3.9-.2-1.5-1.3-2.7-2.7-2.9-1.8-.3-3.4 1.2-3.1 3.1.3 1.7 1.7 3 3.3 3.3z" />
    </svg>
  );
}