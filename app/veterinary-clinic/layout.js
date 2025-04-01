// app/layout.js or app/veterinary-clinic/layout.js
"use client";

import { NotificationProvider } from "../../app/veterinary-clinic/context/NotificationContext";

export default function Layout({ children }) {
  return (
    <NotificationProvider>
      {children}
    </NotificationProvider>
  );
}