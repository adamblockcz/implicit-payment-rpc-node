import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import AccountBalance from "@/components/DashboardComponents/AccountBalance";
import { useAccount } from "wagmi";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import InfoPanel from "@/components/DashboardComponents/InfoPanel";
import PaidIcon from '@mui/icons-material/Paid';
import { fetchFromSubgrapPayments } from "@/utils/TheGraphUtils";
import { formatEther } from 'viem';
import UsageGraph from "@/components/DashboardComponents/UsageGraph";
import Typography from "@mui/material/Typography";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Dashboard() {
  const account = useAccount();
  const [ txCount, setTxCount ] = React.useState("");
  const [ txAmountSum, setTxAmountSum ] = React.useState("");
  const [ data, setData ] = React.useState<{
    payments: [{
        account: string;
        amount: string;
        transactionHash: string;
        blockTimestamp: string;
    }];
}>();

  React.useEffect(
    () => {
      async function cb(){
        if (!account.address){
          return;
        }
        const txs = await fetchFromSubgrapPayments(account.address!);
        if (txs){
          setTxCount(txs.payments.length.toString());
          setData(txs);
          const totalAmountInWei = txs.payments.reduce((total, payment) => total + BigInt(payment.amount), BigInt(0));
          setTxAmountSum(parseFloat(formatEther(totalAmountInWei)).toString());
        }
      }
      cb();
    }, [account?.address]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid xs={4}>
          <Item>
          <InfoPanel
              icon={<AccountBalanceWalletIcon />} // Pass the icon component as a prop
              description="Transactions created"
              number={txCount}
              color="primary" 
            />
          </Item>
        </Grid>
        <Grid xs={4}>
          <Item>
            {/* 
          // @ts-ignore */}
            <AccountBalance address={account?.address} />
          </Item>
        </Grid>
        <Grid xs={4}>
          <Item>
            <InfoPanel
              icon={<PaidIcon/>}
              description="Total spend"
              number={txAmountSum + " ETH"}
              color="primary"
            />
          </Item>
        </Grid>
      </Grid>
      <Grid>
        <Grid  xs={12} marginTop="3vh">
          <Item>
            <Typography variant="h6" gutterBottom>Last 30 days transactions count</Typography>
            <UsageGraph data={data!} />
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
