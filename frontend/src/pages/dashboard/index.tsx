import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { Typography } from "@mui/material";
import TransactionsMade from "@/components/DashboardComponents/TransactionsMade";
import AccountBalance from "@/components/DashboardComponents/AccountBalance";
import { useAccount } from "wagmi";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import InfoPanel from "@/components/DashboardComponents/InfoPanel";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Dashboard() {
  const { address } = useAccount();

  if (!address) return null;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid xs={4}>
          <Item>
          <InfoPanel
              icon={<AccountBalanceWalletIcon />} // Pass the icon component as a prop
              description="Transactions created"
              number={333}
              color="primary" // Optional: Specify a color for the icon
            />
          </Item>
        </Grid>
        <Grid xs={4}>
          <Item>
            <AccountBalance address={address} />
          </Item>
        </Grid>
        <Grid xs={4}>
          <Item>
            <Typography>Current Spend</Typography>
            {/* Add content for CurrentSpend component */}
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
