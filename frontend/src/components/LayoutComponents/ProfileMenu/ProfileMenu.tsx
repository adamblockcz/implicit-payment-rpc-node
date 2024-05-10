import React from "react";
import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { styled } from "@mui/system";
import { useAccount, useDisconnect } from "wagmi";
import { disconnect } from "@wagmi/core";

const ProfileButton = styled(IconButton)`
  display: flex;
  align-items: center;
`;

const ProfileMenu: React.FC = () => {
  const { address, isConnecting, isDisconnected } = useAccount();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { disconnect } = useDisconnect();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDisconnect = () => {
    disconnect();
    handleClose();
  };

  return (
    <div style={{ marginLeft: "auto" }}>
      <ProfileButton
        aria-controls="profile-menu"
        aria-haspopup="true"
        onClick={handleClick}
        color="inherit"
      >
        <AccountCircleIcon />
        <Typography variant="body2" style={{ marginLeft: "0.5rem" }}>
          {address &&
            `${address.substring(0, 6)}...${address.substring(
              address.length - 6
            )}`}
        </Typography>
      </ProfileButton>
      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {isConnecting && <MenuItem disabled>Connecting...</MenuItem>}
        {isDisconnected && <MenuItem disabled>Disconnected</MenuItem>}
        {!isConnecting && !isDisconnected && (
          <MenuItem onClick={handleDisconnect}>Disconnect</MenuItem>
        )}
      </Menu>
    </div>
  );
};

export default ProfileMenu;
