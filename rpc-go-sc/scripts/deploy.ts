import { ethers } from "hardhat";

async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    console.log("Account balance:", (await deployer.getBalance()).toString());
  
    const IterableMappingFactory = await ethers.getContractFactory("IterableMapping");
    let iterableMapping: any;
    //iterableMapping = await IterableMappingFactory.deploy();
    const RpcGo = await ethers.getContractFactory("RpcGo", {
      libraries: {
        IterableMapping: "0xa99E30c90274f9cdc44ADA71ebdD846e057ab1ef",
      },
    });

    const Token = await ethers.getContractFactory("ERC20");
    //const rpcGo = await RpcGo.deploy();
    const token = await Token.deploy();
  
    //console.log("IterableMapping address:", iterableMapping.address);
    //console.log("RpcGo address:", rpcGo.address);
    console.log("Token address:", token.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  