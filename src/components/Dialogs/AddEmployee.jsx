import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  TextField,
} from "@mui/material";
import { useEmployees } from "../../contexts/EmployeeContext";
import { apiCall } from "../../api/api";

export default function AddEmployee() {
  const { openDialog, setOpenDialog } = useEmployees();
  const [newEmployee, setNewEmployee] = useState({
    first_name: "",
    last_name: "",
    email: "",
    position: "",
    salary: "",
    date_of_joining: new Date().toISOString().split("T")[0],
    department: "",
  });

  const handleAddEmployee = async () => {
    try {
      await apiCall.addEmployee(newEmployee);
      setOpenDialog(null);
      setNewEmployee({
        first_name: "",
        last_name: "",
        email: "",
        position: "",
        salary: "",
        date_of_joining: new Date().toISOString().split("T")[0],
        department: "",
      });
    } catch (err) {
      console.error("Error adding employee:", err);
    }
  };

  return (
    <Dialog
      open={openDialog === "add"}
      onClose={() => setOpenDialog(null)}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Add Employee</DialogTitle>
      <DialogContent>
        <Box
          sx={{ display: "flex", flexDirection: "column", gap: 2, padding: 2 }}
        >
          <TextField
            label="First Name"
            fullWidth
            value={newEmployee.first_name}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, first_name: e.target.value })
            }
          />
          <TextField
            label="Last Name"
            fullWidth
            value={newEmployee.last_name}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, last_name: e.target.value })
            }
          />
          <TextField
            label="Email"
            fullWidth
            value={newEmployee.email}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, email: e.target.value })
            }
          />
          <TextField
            label="Position"
            fullWidth
            value={newEmployee.position}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, position: e.target.value })
            }
          />
          <TextField
            label="Salary"
            fullWidth
            value={newEmployee.salary}
            onChange={(e) =>
              setNewEmployee({
                ...newEmployee,
                salary: e.target.value
                  .trim()
                  .replaceAll(",", "")
                  .replaceAll("$", ""),
              })
            }
          />
          <TextField
            label="Date of Joining"
            type="date"
            fullWidth
            value={newEmployee.date_of_joining}
            onChange={(e) =>
              setNewEmployee({
                ...newEmployee,
                date_of_joining: e.target.value,
              })
            }
            inputLabel={{
              shrink: true,
            }}
          />
          <TextField
            label="Department"
            fullWidth
            value={newEmployee.department}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, department: e.target.value })
            }
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenDialog(null)} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAddEmployee} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
