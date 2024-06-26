import { rpcGoContractConfig } from "@/components/Web3ModalProvider";
import { Typography } from "@mui/material";
import { useReadContract } from "wagmi";
import InfoPanel from "../InfoPanel";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { useAccountBalanceOnRpcGo } from "@/utils/ContractHelpers";

// Component implements InfoPanel for use of retrieving and displaying account balance

export default function AccountBalance({
  address,
}: {
  address: `0x${string}`;
}) {
  const { data: balance } = useReadContract({
    ...rpcGoContractConfig,
    functionName: "getAccountBalance",
    args: [address],
  });

  let balanceInEther: string = useAccountBalanceOnRpcGo();
  /*if (balance != undefined) {
    const balanceBigInt: bigint = BigInt(balance);
    balanceInEther = Number(balanceBigInt) / Number(BigInt(10 ** 18));
    
    return <InfoPanel icon={<AccountBalanceWalletIcon />} // Pass the icon component as a prop
    descrigetAccountBalanceOnRpcGoption="Account balance"
    number={balanceInEther.toString() + " ETH"}
    color="primary"/>
  }*/

  return <InfoPanel icon={<AccountBalanceWalletIcon />} // Pass the icon component as a prop
  description="Account balance"
  number={balanceInEther + " ETH"}
  color="primary"/>
}