import { rpcGoContractConfig } from "@/components/Web3ModalProvider";
import { useReadContract } from "wagmi";

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
  console.log("balance is " + balance);

  return <div>Balance: {balance?.toString()}</div>;
}
