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
import { useAccountBalanceOnRpcGo } from "@/utils/ContractHelpers";
import { useWriteContract } from 'wagmi';
import { ABI as RpcGoABI } from "@/abi/RpcGoABI";
import { useAccount, useBalance } from "wagmi";
import { fetchFromSubgraphWithdrawalsDeposits } from "@/utils/TheGraphUtils";
import {
  Hash,
  TransactionReceipt
} from 'viem'
import { waitForTransactionReceipt } from '@wagmi/core'
import { config } from "@/components/Web3ModalProvider";
import HistoricTransactionData from "@/components/PaymentsComponents/HistoricTransactionsData";



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
  const [historicTransactions, setHistoricTransactions] = React.useState<{
    deposits: [{
        account: string;
        amount: string;
        transactionHash: string;
        id: string;
        blockTimestamp: string;
    }];
    withdraws: [{
        account: string;
        amount: string;
        transactionHash: string;
        id: string;
        blockTimestamp: string;
    }];
}>();


  const { writeContractAsync } = useWriteContract();

  const account = useAccount();
  const balance = useBalance({
    address: account.address,
  });
  React.useEffect(() => {
    console.log("Updated historicTransactions:", historicTransactions);
}, [historicTransactions]);

  // adds pending transaction in the beggining of transaction sorted list

  const addTransaction = (type: string, amount: string, transactionHash: string, blockTimestamp: string, completed: Boolean) => {
    const newTransaction = { account: "", amount, transactionHash, id: "", blockTimestamp};
    if (!completed) {
        if (type === "Deposit") {
          //@ts-ignore
            setHistoricTransactions({ ...historicTransactions, deposits: [newTransaction, ...historicTransactions!.deposits] });
        } else {
          //@ts-ignore
            setHistoricTransactions({ ...historicTransactions, withdraws: [newTransaction, ...historicTransactions!.withdraws] });
        }
    } else {
      //@ts-ignore
      setHistoricTransactions(prevTransactions => {
        const updatedDeposits = prevTransactions?.deposits.map(transaction => {
          if (transaction.transactionHash === transactionHash) {
            return { ...transaction, blockTimestamp };
          }
          return transaction;
        });
        const updatedWithdraws = prevTransactions?.withdraws.map(transaction => {
          if (transaction.transactionHash === transactionHash) {
            return { ...transaction, blockTimestamp };
          }
          return transaction;
        });
        return {
          deposits: updatedDeposits || [],
          withdraws: updatedWithdraws || [],
        };
      });
    }
};


  // function handling deposit function smart contract call
  const handleDeposit = async () => {
    const amount = parseFloat(depositAmount);
    if (!isNaN(amount) && amount > 0) {
      const amountInWei: number = amount * 10**18;
      const result = await writeContractAsync({ 
        abi: RpcGoABI,
        address: '0xC3Bf5ba7874FA863794B427DEef0ec866a492fBe',
        functionName: 'deposit',
        value: BigInt(amountInWei)
      });
      addTransaction("Deposit", depositAmount, result, "Pending", false);
      const resultReceipt = await waitForTransactionReceipt(config, {
        hash: result,
      })
      addTransaction("Deposit", depositAmount, result, "Completed", true);
    }
  };

  // function handling withdraw function smart contract call
  const handleWithdraw = async () => {
    const amount = parseFloat(withdrawAmount);
    if (!isNaN(amount) && amount > 0) {
      const amountInWei: number = amount * 10**18;
      const result = await writeContractAsync({ 
        abi: RpcGoABI,
        address: '0xC3Bf5ba7874FA863794B427DEef0ec866a492fBe',
        functionName: 'withdrawBalance',
        args: [BigInt(amountInWei)],
      });
      addTransaction("Withdraw", withdrawAmount, result, "Pending", false);
      const resultReceipt = await waitForTransactionReceipt(config, {
        hash: result,
      });
      addTransaction("Withdraw", withdrawAmount, result, "Completed", true);
    }
  };

  // retrieve balance on contract
  const balanceOnContract: string = useAccountBalanceOnRpcGo();
  // retrieves data from subgraph
  React.useEffect(
    () => {
      async function cb(){
        if (!account.address){
          return;
        }
        setHistoricTransactions(await fetchFromSubgraphWithdrawalsDeposits(account.address!));
      }
      cb();
    }, [account?.address]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Item>
            <UploadIcon />
            <Typography variant="h6">Top up your account</Typography>
            <Typography variant="body2">Balance on your wallet: {(balance.data?.formatted as string)?.substr(0, 8)}</Typography>
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
        <Grid item xs={12}>
          {/* 
          // @ts-ignore */}
          <HistoricTransactionData data={historicTransactions}></HistoricTransactionData>
        </Grid>
      </Grid>
    </Box>
  );
}
