import { useState, useEffect } from "react";
import { api } from "../api/api";

export const useEmployeeContext = () => {
  const [employees, setEmployees] = useState([]);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async (query = "") => {
    try {
      setLoading(true);

      const response = await api.get(`/search?q=${query}`);
      setEmployees(response.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch employees");
      console.error("Error fetching employees:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    employees,
    error,
    loading,
    openDialog,
    selectedEmployee,
    setOpenDialog,
    setSelectedEmployee,
    fetchEmployees,
    addDialogOpen,
    setAddDialogOpen,
  };
};
