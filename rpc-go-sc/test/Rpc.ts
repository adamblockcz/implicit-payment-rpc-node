import { expect, use } from "chai";
import { ethers } from "hardhat";
import chaiAsPromised from "chai-as-promised"

use(chaiAsPromised);

describe("RpcGo contract", function () {
  let RpcGo: any;
  let rpcGo: any;
  let ERC20: any;
  let erc20: any;

  let owner: any;
  let addr1: any;
  let addr2: any;
  let addrs: any;

  const ONE_ETHER = ethers.utils.parseEther("1");

  beforeEach(async () => {
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    RpcGo = await ethers.getContractFactory("RpcGo");
    rpcGo = await RpcGo.deploy();

    ERC20 = await ethers.getContractFactory("ERC20");
    erc20 = await ERC20.deploy();

    // Mint some tokens for the owner
    await erc20.mint(owner.address, ethers.utils.parseEther("100"));

    // Approve RpcGo contract to spend owner's tokens
    await erc20.connect(owner).approve(rpcGo.address, ethers.constants.MaxUint256);
  });

  it("should deposit ETH into the contract", async () => {
    await rpcGo.deposit({ value: ONE_ETHER });

    expect(await rpcGo.getTotalAccountsBalance()).to.equal(ONE_ETHER);
  });

  it("should withdraw ETH from the contract", async () => {
    await rpcGo.deposit({ value: ONE_ETHER });
    await rpcGo.withdrawBalance(ONE_ETHER.div(2));

    expect(await rpcGo.getTotalAccountsBalance()).to.equal(ONE_ETHER.div(2));
  });

  it("should transfer tokens between accounts", async () => {
    const initialBalance = ethers.utils.parseEther("100");
    await rpcGo.deposit({ value: ONE_ETHER });
    await rpcGo.transferAccount(addr1.address, ONE_ETHER.div(2));

    expect(await rpcGo.getTotalAccountsBalance(addr1.address)).to.equal(ONE_ETHER.div(2));
  });

  it("should allow owner to withdraw funds from the contract", async () => {
    const initialBalance = ethers.utils.parseEther("100");
    await rpcGo.deposit({ value: ONE_ETHER });

    const ownerBalanceBefore = await owner.getBalance();
    await rpcGo.ownerWithdraw();

    expect(await rpcGo.getTotalAccountsBalance()).to.equal(0);
    expect(await owner.getBalance()).to.be.gt(ownerBalanceBefore);
  });

  it("should fail if non-owner tries to withdraw funds from the contract", async () => {
    const initialBalance = ethers.utils.parseEther("100");
    await rpcGo.deposit({ value: ONE_ETHER });

    await expect(rpcGo.connect(addr1).ownerWithdraw()).to.be.revertedWith("Only owner can call this function");
  });
});
