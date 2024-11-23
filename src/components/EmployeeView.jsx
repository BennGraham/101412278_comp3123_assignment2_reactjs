import React, { useState, useEffect } from "react";
import { api } from "../api/api";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  Box,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

function EmployeeView() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [newEmployee, setNewEmployee] = useState({
    first_name: "",
    last_name: "",
    email: "",
    position: "",
    salary: "",
    date_of_joining: "",
    department: "",
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await api.get("/employees");
      setEmployees(response.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch employees");
      console.error("Error fetching employees:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDetailModal = (employee) => {
    setSelectedEmployee(employee);
    setOpenDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setOpenDetailModal(false);
    setSelectedEmployee(null);
  };

  const handleOpenAddModal = () => {
    setOpenAddModal(true);
  };

  const handleCloseAddModal = () => {
    setOpenAddModal(false);
    setNewEmployee({
      first_name: "",
      last_name: "",
      email: "",
      position: "",
      salary: "",
      date_of_joining: "",
      department: "",
    });
  };

  const handleOpenEditModal = (employee) => {
    setSelectedEmployee(employee);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setSelectedEmployee(null);
  };

  const handleAddEmployee = async () => {
    try {
      await api.post("/employees", newEmployee);
      fetchEmployees();
      handleCloseAddModal();
    } catch (err) {
      console.error("Error adding employee:", err);
    }
  };

  const handleEditEmployee = async () => {
    try {
      await api.put(`/employees/${selectedEmployee._id}`, selectedEmployee);
      fetchEmployees();
      handleCloseEditModal();
    } catch (err) {
      console.error("Error editing employee:", err);
    }
  };

  const handleDeleteEmployee = async () => {
    try {
      await api.delete(`/employees/${selectedEmployee._id}`);
      fetchEmployees();
      handleCloseEditModal();
    } catch (err) {
      console.error("Error deleting employee:", err);
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Employees
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Button variant="contained" onClick={handleOpenAddModal} sx={{ mb: 2 }}>
          Add Employee
        </Button>

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
                    <Button onClick={() => handleOpenDetailModal(employee)}>
                      View
                    </Button>
                    <Button onClick={() => handleOpenEditModal(employee)}>
                      Edit
                    </Button>
                    <Button onClick={() => handleDeleteEmployee(employee)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog
          open={openDetailModal}
          onClose={handleCloseDetailModal}
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
                  {selectedEmployee.date_of_joining}
                </Typography>
                <Typography variant="body1">
                  <strong>Department:</strong> {selectedEmployee.department}
                </Typography>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDetailModal} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={openAddModal}
          onClose={handleCloseAddModal}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Add Employee</DialogTitle>
          <DialogContent>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
                  setNewEmployee({ ...newEmployee, salary: e.target.value })
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
            <Button onClick={handleCloseAddModal} color="primary">
              Cancel
            </Button>
            <Button onClick={handleAddEmployee} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={openEditModal}
          onClose={handleCloseEditModal}
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
                  value={selectedEmployee.date_of_joining}
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
            <Button onClick={handleCloseEditModal} color="primary">
              Cancel
            </Button>
            <Button onClick={handleEditEmployee} color="primary">
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
}

export default EmployeeView;
