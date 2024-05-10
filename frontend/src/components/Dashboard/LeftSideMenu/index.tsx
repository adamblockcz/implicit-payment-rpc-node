import { styled } from '@mui/system';
import { Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from '@mui/icons-material/Dashboard';
import PaymentIcon from '@mui/icons-material/Payment';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';

interface LeftSideMenuProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  closed: boolean;
  setClosed: React.Dispatch<React.SetStateAction<boolean>>;
  variant: "permanent" | "temporary" | "persistent";
}

const drawerWidth = 240;
const closedDrawerWidth = 60; // Adjust the width when closed

const DrawerContainer = styled(Drawer)<{ open: boolean }>`
  width: ${({ open }) => (open ? `${drawerWidth}px` : `${closedDrawerWidth}px`)};
  flex-shrink: 0;
`;

const DrawerPaper = styled(Box)<{ open: boolean }>`
  width: ${({ open }) => (open ? `${drawerWidth}px` : `${closedDrawerWidth}px`)};
  height: 100%;
  background: #2196f3;
  transition: width 0.3s ease; /* Smooth transition when opening/closing */
`;

const StyledToolbar = styled(Box)`
  ${({ theme }) => theme.mixins.toolbar};
`;

const StyledListItem = styled(ListItem)`
  margin-bottom: 14px; /* Adjust the spacing between buttons */
`;

const ListItemIconWrapper = styled(ListItemIcon)`
  color: #fff;
  transform: scale(1.3); /* Adjust the scale factor to make icons bigger or smaller */

`;

const ListItemTextWrapper = styled(ListItemText)<{ open: boolean }>`
  color: #fff;
  display: ${({ open }) => (open ? 'block' : 'none')};
`;

const LeftSideMenu: React.FC<LeftSideMenuProps> = ({ open, closed, setOpen, setClosed, variant }) => {
  const toggleDrawer = () => {
    setClosed(!closed); 
    if (!closed && open){
      setOpen(false);
    }
    console.log("open set to " + open);
    console.log("closed set to " + closed);
  };

  const handleMouseEnter = () => {
  setOpen(true);
  console.log("open set to " + open);
  console.log("closed set to " + closed);
  };

  const handleMouseLeave = () => {
    if (closed){
      setOpen(false);
      }

    console.log("open set to " + open);
    console.log("closed set to " + closed);
  };

  return (
    <DrawerContainer variant={variant} open={open} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <DrawerPaper open={open}>
        <StyledToolbar>
          <IconButton onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
        </StyledToolbar>
        <List>
          <StyledListItem button>
            <ListItemIconWrapper>
              <DashboardIcon />
            </ListItemIconWrapper>
            <ListItemTextWrapper open={open} primary="Dashboard" />
          </StyledListItem>
          <StyledListItem button>
            <ListItemIconWrapper>
              <PaymentIcon />
            </ListItemIconWrapper>
            <ListItemTextWrapper open={open} primary="Payments" />
          </StyledListItem>
          <StyledListItem button>
            <ListItemIconWrapper>
              <ChangeCircleIcon />
            </ListItemIconWrapper>
            <ListItemTextWrapper open={open} primary="Migrate account" />
          </StyledListItem>
        </List>
      </DrawerPaper>
    </DrawerContainer>
  );
};

export default LeftSideMenu;
