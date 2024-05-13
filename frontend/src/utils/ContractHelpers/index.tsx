import { rpcGoContractConfig } from "@/components/Web3ModalProvider";
import { useAccount, useReadContract } from "wagmi";

export function getAccountBalanceOnRpcGo() {
    const account = useAccount();
    const { data: balance } = useReadContract({
        ...rpcGoContractConfig,
        functionName: "getAccountBalance",
        args: [account.address],
    });
    if (balance != undefined) {
        const balanceBigInt: bigint = BigInt(balance);
        let balanceInEther = Number(balanceBigInt) / Number(BigInt(10 ** 18));
        
        return balanceInEther.toString();
        }

  
  return "NaN";
}