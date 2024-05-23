
import { rpcGoContractConfig } from "@/components/Web3ModalProvider";
import { useAccount, useReadContract } from "wagmi";

export function useAccountBalanceOnRpcGo() {
    const { address } = useAccount();
    const { data: balance } = useReadContract({
        ...rpcGoContractConfig,
        functionName: "getAccountBalance",
        //@ts-ignore
        args: [address],
    });

    if (balance !== undefined) {
        const balanceBigInt: bigint = BigInt(balance);
        let balanceInEther = Number(balanceBigInt) / Number(BigInt(10 ** 18));
        return balanceInEther.toString();
    }

    return "NaN";
}
