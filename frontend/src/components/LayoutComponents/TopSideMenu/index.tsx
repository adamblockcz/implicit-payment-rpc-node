// TopSideMenu.tsx

import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import ProfileMenu from "../ProfileMenu/ProfileMenu";

const TopSideMenu: React.FC = () => {
  return (
    <AppBar
      position="static"
      sx={{ top: 0, width: "100%", backgroundColor: "#2196f3" }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          component="div"
          sx={{ textAlign: "center", width: "100%" }}
        >
          RPCGo
        </Typography>
        <ProfileMenu />
      </Toolbar>
    </AppBar>
  );
};

export default TopSideMenu;
