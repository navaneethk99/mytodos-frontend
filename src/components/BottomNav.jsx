import React, { useState } from "react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import AddIcon from "@mui/icons-material/Add";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";

export default function BottomNav() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const handleNavigation = (page) => {
    navigate(`/app/${page}`);
  };

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => setValue(newValue)}
      >
        <BottomNavigationAction
          icon={<ListIcon sx={{ fontSize: "2rem" }} />}
          onClick={() => handleNavigation("todos")}
          sx={{
            "&.Mui-selected": {
              color: "#307d2fff", // teal
            },
            "&.Mui-focusVisible": {
              outline: "none",
            },
          }}
        />
        <BottomNavigationAction
          icon={<AddIcon sx={{ fontSize: "2rem" }} />}
          onClick={() => handleNavigation("add")}
          sx={{
            "&.Mui-selected": {
              color: "#307d2fff",
            },
            "&.Mui-focusVisible": {
              outline: "none",
            },
          }}
        />
        <BottomNavigationAction
          icon={<AccountCircleIcon sx={{ fontSize: "2rem" }} />}
          onClick={() => handleNavigation("profile")}
          sx={{
            "&.Mui-selected": {
              color: "#307d2fff",
            },
            "&.Mui-focusVisible": {
              outline: "none",
            },
          }}
        />
      </BottomNavigation>
    </Paper>
  );
}
