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

// Ensure that we have all the environment variables we need.
const mnemonic: string | undefined = process.env.MNEMONIC;
if (!mnemonic) {
  throw new Error("Please set your MNEMONIC in a .env file");
}

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
    bscTestnet: {
      url: "https://data-seed-prebsc-2-s1.bnbchain.org:8545",
      chainId: 97,
      gasPrice: 10000000000,
      gas: 15044139,
      accounts: {
        count: 12,
        mnemonic,
        path: "m/44'/60'/0'/0",
      },
    },
    bscmainnet: {
      url: "https://bsc-dataseed.binance.org/",
      chainId: 56,
      gasPrice: 3000000000,
      accounts: {
        count: 12,
        mnemonic,
        path: "m/44'/60'/0'/0",
      },
    },
    arbitrumSepolia: {
      url: 'https://arb-sepolia.g.alchemy.com/v2/qJn9AwSqRsmZZThXE2QUMFK0ZJxaszwo',
      chainId: 421614,
      accounts: {
        count: 12,
        mnemonic,
        path: "m/44'/60'/0'/0",
      },
    },
    optimisticSepolia: {
      url: 'https://opt-sepolia.g.alchemy.com/v2/VsH9uwvN_ZlTty81pPKc5jLyfUtzQ3CA',
      gasPrice: 4000000,
      chainId: 11155420,
      accounts: {
        count: 12,
        mnemonic,
        path: "m/44'/60'/0'/0",
      },
    },
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/2d8Y6PGH9pUxs7ppKbuUsztVq8hjQDui",
      accounts: {
        count: 12,
        mnemonic,
        path: "m/44'/60'/0'/0",
      },
    },
    polygonMumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/9Fh4piJA_Iq77pzVY7Zvw2GTz4TtLg-N",
      gasPrice: 10000000000,
      accounts: {
        count: 12,
        mnemonic,
        path: "m/44'/60'/0'/0",
      },
    },
    polygon: {
      url: "https://api.tatum.io/v3/blockchain/node/MATIC/b6b2bc61-64af-4b1b-ad6c-a0ffee7a0e72",
      gasPrice: 3000000000000,
      accounts: {
        count: 12,
        mnemonic,
        path: "m/44'/60'/0'/0",
      },
    },
    hardhat: {
      // forking: {
      //   url: process.env.NODE_URI !== undefined ? process.env.NODE_URI : '',
      //   // blockNumber: 32910027
      // },
      accounts: {
        mnemonic,
        count: 100,
      }
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
