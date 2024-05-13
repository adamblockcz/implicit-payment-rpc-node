import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import UploadIcon from '@mui/icons-material/Upload';
import GetAppIcon from '@mui/icons-material/GetApp';
import { getAccountBalanceOnRpcGo } from "@/utils/ContractHelpers";
import { useWriteContract } from 'wagmi'
import { ABI as RpcGoABI } from "@/abi/RpcGoABI";
import { useAccount, useBalance } from "wagmi";
import { writeContract } from "@wagmi/core";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Payments() {
  const [depositAmount, setDepositAmount] = React.useState("");
  const [withdrawAmount, setWithdrawAmount] = React.useState("");
  const { writeContract } = useWriteContract()

  const account = useAccount();
  const balance = useBalance({
    address: account.address,
  });
  console.log(balance);

  const handleDeposit = () => {
    // Convert deposit amount to number
    const amount = parseFloat(depositAmount);
    // Check if amount is a valid number and greater than 0
    if (!isNaN(amount) && amount > 0) {
      // Convert amount to wei (1 ether = 10^18 wei)
      const amountInWei: number = amount * 10**18;
      // Call writeContract function with the deposit amount in wei
      writeContract({ 
        abi: RpcGoABI,
        address: '0xC3Bf5ba7874FA863794B427DEef0ec866a492fBe',
        functionName: 'deposit',
        value: BigInt(amountInWei)
      });
      console.log("Depositing:", depositAmount);
    } else {
      console.error("Invalid deposit amount");
    }
  };

  const handleWithdraw = () => {
    // Handle withdraw logic here
    console.log("Withdrawing:", withdrawAmount);
  };

  let balanceOnContract: string = getAccountBalanceOnRpcGo();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Item>
            <UploadIcon />
            <Typography variant="h6">Top up your account</Typography>
            <Typography variant="body2">Balance on your wallet: {balance.data?.formatted}</Typography>
            <TextField
              label="Enter amount"
              variant="outlined"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button variant="contained" onClick={handleDeposit}>
              Deposit
            </Button>
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <GetAppIcon />
            <Typography variant="h6">Withdraw funds</Typography>
            <Typography variant="body2">Current balance: {balanceOnContract}</Typography>
            <TextField
              label="Enter amount"
              variant="outlined"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button variant="contained" onClick={handleWithdraw}>
              Withdraw
            </Button>
            <Button variant="contained" onClick={() => console.log("Withdrawing all")}>
              Withdraw all funds
            </Button>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
