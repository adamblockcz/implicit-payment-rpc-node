import { createWeb3Modal } from "@web3modal/wagmi/react";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

import { WagmiProvider } from "wagmi";
import { holesky, mainnet } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { ABI as RpcGoABI } from "@/abi/RpcGoABI";

// inicialization of web3modal

const provider = process.env.PROVIDER;
const rpcGoContractAddress = process.env.NEXT_PUBLIC_RPC_GO_CONTRACT_ADDRESS;

const queryClient = new QueryClient();

const projectId = "8e69296476a1947583bc9379a38e0b92";

const metadata = {
  name: "Web3Modal",
  description: "Web3Modal Example",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const chains = [mainnet, holesky] as const;
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
});

export const rpcGoContractConfig = {
  address: rpcGoContractAddress as `0x${string}`,
  abi: RpcGoABI,
  chainId: holesky.id,
};

createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true,
  enableOnramp: true,
});

export function Web3ModalProvider({ children }: PropsWithChildren) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
