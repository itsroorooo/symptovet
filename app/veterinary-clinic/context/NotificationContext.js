// context/NotificationContext.js
"use client";

import { createContext, useState, useContext } from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  return (
    <NotificationContext.Provider value={{ isNotificationOpen, setIsNotificationOpen }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);