import { expect, use } from "chai";
import { ethers } from "hardhat";
import chaiAsPromised from "chai-as-promised";
import { Token } from "@uniswap/sdk-core";

use(chaiAsPromised);

const ONE_ETHER = ethers.utils.parseUnits("1", "ether");

describe("RPC contract", function () {
  let RPC:any;
  let rpc:any;
  let ERC20:any;
  let erc20:any;
  
  let owner:any;
  let addr1:any;
  let addr2:any;
  let addr3:any;
  let addrs:any;

  beforeEach(async () => {
    [owner, addr1, addr2, addr3, ...addrs] = await ethers.getSigners();
    RPC = await ethers.getContractFactory("RpcGo");
    rpc = await RPC.deploy();

    ERC20 = await ethers.getContractFactory("ERC20");
    erc20 = await ERC20.deploy();

    const ownerBalance = await erc20.balanceOf(owner.address);

    // Approve Rpc contract to spend owner's tokens
    await erc20.approve(rpc.address, ownerBalance);
  });

  it("Deployment should assign the total supply of tokens to the owner" , async () => {
    // Forward transaction to Token contract via Rpc contract
    const data = erc20.interface.encodeFunctionData("transferFrom", [owner.address, addr1.address, ONE_ETHER]);
    const ownerBalanceBefore = await erc20.balanceOf(owner.address);
    // Submit transaction to Rpc contract
    await rpc.submitTransaction(erc20.address, 0, data, { gasLimit: 30000000 });
    expect(
      await erc20.balanceOf(addr1.address)
    ).to.be.equal(ONE_ETHER);
    expect(
      await erc20.balanceOf(owner.address)
    ).to.be.equal(ownerBalanceBefore.sub(ONE_ETHER));
  });
});
