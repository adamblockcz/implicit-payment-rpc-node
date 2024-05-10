import { createWeb3Modal } from '@web3modal/wagmi/react'
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'

import { WagmiProvider } from 'wagmi'
import { holesky, mainnet } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren } from 'react'
import { RpcGoABI } from '@/abi/RpcGoABI'

const provider = process.env.PROVIDER;
const rpcGoContractAddress = process.env.RPC_GO_CONTRACT_ADDRESS

// 0. Setup queryClient
const queryClient = new QueryClient()

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = '8e69296476a1947583bc9379a38e0b92'

// 2. Create wagmiConfig
const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [mainnet, holesky] as const
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true
})

export const rpcGoContractConfig = {
  contractAddress: rpcGoContractAddress,
  abi: RpcGoABI,
  provider: provider,
};


// 3. Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true,
  enableOnramp: true
})

export function Web3ModalProvider({ children }:PropsWithChildren) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}