import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
// import "@nomicfoundation/hardhat-verify";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import '@openzeppelin/hardhat-upgrades';
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "hardhat-contract-sizer"
//tasks
require('./tasks');

dotenv.config();


const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.19",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      }
    ],
    overrides: {
      "contracts/TestToken.sol": {
        version: "0.6.12",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        }
      }
    }
  },
  networks: {
    rinkeby: {
      url: "https://ethereum-holesky-rpc.publicnode.com",
      chainId: 17000,
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    hardhat: {
      // forking: {
      //   url: process.env.NODE_URI !== undefined ? process.env.NODE_URI : '',
      //   // blockNumber: 32910027
      // },
      
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
    gasPriceApi: "https://api.bscscan.com/api?module=proxy&action=eth_gasPrice",
    coinmarketcap: process.env.CMC_KEY,
    token: "BNB"
  },
  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: true,
    strict: true,
  },
  etherscan: {
    apiKey: {
      // ethereum mainnet
      mainnet: process.env.ETHERSCAN_API_KEY || '',
      goerli: process.env.ETHERSCAN_API_KEY || '',
      sepolia: process.env.ETHERSCAN_API_KEY || '',
      // binance smart chain
      bsc: process.env.BSCSCAN_API_KEY || '',
      bscTestnet: process.env.BSCSCAN_API_KEY || '',
      // polygon
      polygon: process.env.POLYGONSCAN_API_KEY || '',
      polygonMumbai: process.env.POLYGONSCAN_API_KEY || '',
      // arbitrum
      arbitrumOne: process.env.ARBISCAN_API_KEY || '',
      arbitrumNova: process.env.ARBISCAN_API_KEY || '',
      arbitrumSepolia: process.env.ARBISCAN_API_KEY || '',
      // avalanche
      avalanche: process.env.SNOWTRACE_API_KEY || '',
      avalancheFujiTestnet: process.env.SNOWTRACE_API_KEY || '',
      // optimism
      optimisticEthereum: process.env.OPTIMISM_API_KEY || '',
      optimisticSepolia: process.env.OPTIMISM_API_KEY || '',
      // base
      base: process.env.BASESCAN_API_KEY || '',
      baseGoerli: process.env.BASESCAN_API_KEY || '',
    },
    customChains: [
      {
        network: "arbitrumSepolia",
        chainId: 421614,
        urls: {
            apiURL: "https://api-sepolia.arbiscan.io/api",
            browserURL: "https://sepolia.arbiscan.io"
        }
      },
      {
        network: "optimisticSepolia",
        chainId: 11155420,
        urls: {
          apiURL: "https://api-sepolia-optimistic.etherscan.io/api",
          browserURL: "https://sepolia-optimism.etherscan.io/",
        }
      },
      {
        network: "base",
        chainId: 8453,
        urls: {
          apiURL: "https://api.basescan.org/api",
          browserURL: "https://basescan.org/",
        }
      },
      {
        network: "baseGoerli",
        chainId: 84531,
        urls: {
          apiURL: "https://api-goerli.basescan.org/api",
          browserURL: "https://goerli.basescan.org/",
        },
      },
      {
        network: "avalancheFujiTestnet",
        chainId: 43113,
        urls: {
          apiURL: "https://api-testnet.snowtrace.io/api",
          browserURL: "https://testnet.snowtrace.io/",
        },
      },
      {
        network: "avalanche",
        chainId: 43114,
        urls: {
          apiURL: "https://api.snowtrace.io/api",
          browserURL: "https://snowtrace.io/",
        },
      }
    ]
  }
};

export default config;
