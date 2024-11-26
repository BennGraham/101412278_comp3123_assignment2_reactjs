import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { apiCall } from "../../api/api";
import { useEmployees } from "../../contexts/EmployeeContext";

export default function DeleteEmployee() {
  const { openDialog, setOpenDialog, selectedEmployee, setSelectedEmployee } =
    useEmployees();

  const handleDeleteEmployee = async () => {
    try {
      await apiCall.deleteEmployee(selectedEmployee._id);
      setOpenDialog(null);
      setSelectedEmployee(null);
    } catch (err) {
      console.error("Error deleting employee:", err);
    }
  };

  return (
    <Dialog open={openDialog === "delete"} onClose={() => setOpenDialog(null)}>
      <DialogTitle>Delete Employee</DialogTitle>
      <DialogContent>
        <div>
          Are you sure you want to delete {selectedEmployee?.first_name || ""}?
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenDialog(null)} color="primary">
          Cancel
        </Button>
        <Button onClick={handleDeleteEmployee} color="primary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
