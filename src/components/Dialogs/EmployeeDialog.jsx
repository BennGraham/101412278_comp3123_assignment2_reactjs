import AddEmployee from "./AddEmployee";
import EditEmployee from "./EditEmployee";
import EmployeeDetails from "./EmployeeDetails";
import DeleteEmployee from "./DeleteEmployee";

export default function EmployeeDialog() {
  return (
    <>
      <AddEmployee />
      <EditEmployee />
      <EmployeeDetails />
      <DeleteEmployee />
    </>
  );
}
