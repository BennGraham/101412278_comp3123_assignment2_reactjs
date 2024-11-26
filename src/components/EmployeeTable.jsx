import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Button } from "@mui/material";
import { useEmployees } from "../contexts/EmployeeContext";

export default function EmployeeTable() {
  const { employees, setOpenDialog, setSelectedEmployee } = useEmployees();

  const handleOpenDialog = (employee, dialogType) => {
    setOpenDialog(dialogType);
    setSelectedEmployee(employee);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Position</TableCell>
            <TableCell>Department</TableCell>
            <TableCell>Salary</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee._id}>
              <TableCell>{employee.first_name}</TableCell>
              <TableCell>{employee.last_name || "N/A"}</TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell>{employee.position || "N/A"}</TableCell>
              <TableCell>{employee.department || "N/A"}</TableCell>
              <TableCell>
                ${employee.salary?.toLocaleString() || "N/A"}
              </TableCell>
              <TableCell>
                <Button onClick={() => handleOpenDialog(employee, "details")}>
                  View
                </Button>
                <Button onClick={() => handleOpenDialog(employee, "edit")}>
                  Edit
                </Button>
                <Button onClick={() => handleOpenDialog(employee, "delete")}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
