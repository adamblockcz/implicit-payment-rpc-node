import { rpcGoContractConfig } from '@/components/Web3ModalProvider'
import { useReadContract } from 'wagmi'
import { useAccount } from "wagmi";

export default function AccountBalance() {
    const { address } = useAccount();
    console.log(address);
    const { data: balance } = useReadContract({
        ...rpcGoContractConfig,
        functionName: 'getAccountBalance',
        args: [address],
    })
    console.log("balance is" + balance);

    return (
        <div>Balance: {balance?.toString()}</div>
    )
}