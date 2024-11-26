import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
} from "@mui/material";
import { useEmployees } from "../../contexts/EmployeeContext";

export default function EmployeeDetails() {
  const { openDialog, setOpenDialog, selectedEmployee } = useEmployees();
  return (
    <Dialog
      open={openDialog === "details"}
      onClose={() => setOpenDialog(null)}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Employee Details</DialogTitle>
      <DialogContent>
        {selectedEmployee && (
          <Box>
            <Typography variant="body1">
              <strong>First Name:</strong> {selectedEmployee.first_name}
            </Typography>
            <Typography variant="body1">
              <strong>Last Name:</strong> {selectedEmployee.last_name}
            </Typography>
            <Typography variant="body1">
              <strong>Email:</strong> {selectedEmployee.email}
            </Typography>
            <Typography variant="body1">
              <strong>Position:</strong> {selectedEmployee.position}
            </Typography>
            <Typography variant="body1">
              <strong>Salary:</strong> ${selectedEmployee.salary}
            </Typography>
            <Typography variant="body1">
              <strong>Date of Joining:</strong>{" "}
              {
                new Date(selectedEmployee.date_of_joining)
                  .toISOString()
                  .split("T")[0]
              }
            </Typography>
            <Typography variant="body1">
              <strong>Department:</strong> {selectedEmployee.department}
            </Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenDialog(null)} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
