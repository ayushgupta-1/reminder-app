import React, { useState, createContext, useEffect } from "react";
import { reminders } from "../constants/data";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [remindersList, setRemindersList] = useState([]);

  useEffect(() => {
    console.log(remindersList);
  }, [remindersList]);

  return (
    <AppContext.Provider value={{ remindersList, setRemindersList }}>
      {children}
    </AppContext.Provider>
  );
};
