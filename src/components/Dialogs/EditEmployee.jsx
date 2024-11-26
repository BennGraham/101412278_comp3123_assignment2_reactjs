import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  TextField,
} from "@mui/material";
import { apiCall } from "../../api/api";
import { useEmployees } from "../../contexts/EmployeeContext";

export default function EditEmployee() {
  const { openDialog, setOpenDialog, selectedEmployee, setSelectedEmployee } =
    useEmployees();

  const handleUpdateEmployee = async () => {
    try {
      await apiCall.updateEmployee(selectedEmployee._id, selectedEmployee);
      setOpenDialog(null);
      setSelectedEmployee(null);
    } catch (err) {
      console.error("Error updating employee:", err);
    }
  };

  return (
    <Dialog
      open={openDialog === "edit"}
      onClose={() => setOpenDialog(null)}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Edit Employee</DialogTitle>
      <DialogContent>
        {selectedEmployee && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              padding: 2,
            }}
          >
            <TextField
              label="First Name"
              fullWidth
              value={selectedEmployee.first_name}
              onChange={(e) =>
                setSelectedEmployee({
                  ...selectedEmployee,
                  first_name: e.target.value,
                })
              }
            />
            <TextField
              label="Last Name"
              fullWidth
              value={selectedEmployee.last_name}
              onChange={(e) =>
                setSelectedEmployee({
                  ...selectedEmployee,
                  last_name: e.target.value,
                })
              }
            />
            <TextField
              label="Email"
              fullWidth
              value={selectedEmployee.email}
              onChange={(e) =>
                setSelectedEmployee({
                  ...selectedEmployee,
                  email: e.target.value,
                })
              }
            />
            <TextField
              label="Position"
              fullWidth
              value={selectedEmployee.position}
              onChange={(e) =>
                setSelectedEmployee({
                  ...selectedEmployee,
                  position: e.target.value,
                })
              }
            />
            <TextField
              label="Salary"
              fullWidth
              value={selectedEmployee.salary}
              onChange={(e) =>
                setSelectedEmployee({
                  ...selectedEmployee,
                  salary: e.target.value,
                })
              }
            />
            <TextField
              label="Date of Joining"
              type="date"
              fullWidth
              value={
                new Date(selectedEmployee.date_of_joining)
                  .toISOString()
                  .split("T")[0]
              }
              onChange={(e) =>
                setSelectedEmployee({
                  ...selectedEmployee,
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
              value={selectedEmployee.department}
              onChange={(e) =>
                setSelectedEmployee({
                  ...selectedEmployee,
                  department: e.target.value,
                })
              }
            />
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenDialog(null)} color="primary">
          Cancel
        </Button>
        <Button onClick={handleUpdateEmployee} color="primary">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
