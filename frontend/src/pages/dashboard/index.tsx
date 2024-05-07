import { LoggedInVerifier } from '@/components/LoggedInVerifier';

import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from '@mui/system';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PaymentIcon from '@mui/icons-material/Payment';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';

const drawerWidth = 240;

const RootContainer = styled(Box)`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  background-image: radial-gradient(#c0c0c0 1px, transparent 1px),
    radial-gradient(#c0c0c0 1px, transparent 1px);
  background-size: 20px 20px;
`;

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
    <RootContainer>
    <LoggedInVerifier />
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
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon/>
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <PaymentIcon/>
            </ListItemIcon>
            <ListItemText primary="Payments" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ChangeCircleIcon/>
            </ListItemIcon>
            <ListItemText primary="Migrate account"/>
          </ListItem>
        </List>
      </div>
    </SideDrawer>
    </RootContainer>
  );
};

export default LeftSideMenu;