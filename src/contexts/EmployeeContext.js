import React, { createContext, useContext } from "react";
import { useEmployeeContext } from "../hooks/useEmployeeContext";

const EmployeeContext = createContext();

export function EmployeeProvider({ children }) {
  const context = useEmployeeContext();

  return (
    <EmployeeContext.Provider value={context}>
      {children}
    </EmployeeContext.Provider>
  );
}

export const useEmployees = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error("useEmployee must be used within an EmployeeProvider");
  }
  return context;
};
