import { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { useEmployees } from "../contexts/EmployeeContext";

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState("");
  const { fetchEmployees } = useEmployees();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchEmployees(searchInput);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchSubmit(e);
    }
  };

  const resetSearch = () => {
    setSearchInput("");
    fetchEmployees("");
  };

  return (
    <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
      <TextField
        label="Search by Name, Department, or Position"
        variant="outlined"
        fullWidth
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <Button variant="contained" onClick={handleSearchSubmit}>
        Search
      </Button>
      <Button variant="contained" onClick={resetSearch}>
        Reset
      </Button>
    </Box>
  );
}
