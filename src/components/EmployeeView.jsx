import {
  Container,
  Typography,
  Button,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import AddEmployee from "./Dialogs/AddEmployee";
import EditEmployee from "./Dialogs/EditEmployee";
import EmployeeDetails from "./Dialogs/EmployeeDetails";
import DeleteEmployee from "./Dialogs/DeleteEmployee";
import { useEmployees } from "../contexts/EmployeeContext";
import EmployeeTable from "./EmployeeTable";
import SearchBar from "./SearchBar";

function EmployeeView() {
  const { loading, error, setOpenDialog } = useEmployees();

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
        <SearchBar />
        <Button
          variant="contained"
          onClick={() => setOpenDialog("add")}
          sx={{ mb: 2 }}
        >
          Add Employee
        </Button>

        <EmployeeTable />
        <AddEmployee />
        <EditEmployee />
        <EmployeeDetails />
        <DeleteEmployee />
      </Box>
    </Container>
  );
}

export default EmployeeView;
