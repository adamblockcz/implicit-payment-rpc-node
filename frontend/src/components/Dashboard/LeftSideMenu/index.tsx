import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from '@mui/system';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PaymentIcon from '@mui/icons-material/Payment';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';

const drawerWidth = 240;

const SideDrawer = styled(Drawer)`
  width: ${drawerWidth}px;
  background: blue;
  flexShrink: 0;
`;

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    width: drawerWidth,
    background: '#2196f3',
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClosed: {
    width: theme.spacing(7),
    background: '#2196f3',
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  toolbar: theme.mixins.toolbar,
}));

const LeftSideMenu: React.FC = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [hovered, setHovered] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <SideDrawer
      variant="permanent"
      classes={{
        paper: open ? classes.drawerPaper : classes.drawerPaperClosed,
      }}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={toggleDrawer}>
          <MenuIcon />
        </IconButton>
      </div>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <List>
          <ListItem>
            <ListItemIcon>
              <DashboardIcon/>
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <PaymentIcon/>
            </ListItemIcon>
            <ListItemText primary="Payments" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <ChangeCircleIcon/>
            </ListItemIcon>
            <ListItemText primary="Migrate account"/>
          </ListItem>
        </List>
      </div>
    </SideDrawer>
  );
};

export default LeftSideMenu;