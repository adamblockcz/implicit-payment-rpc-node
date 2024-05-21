import { expect, use } from "chai";
import { ethers } from "hardhat";
import chaiAsPromised from "chai-as-promised"

use(chaiAsPromised);

describe("RpcGo contract", function () {
  let RpcGo: any;
  let rpcGo: any;
  let ERC20: any;
  let erc20: any;
  let iterableMapping: any;

  let owner: any;
  let addr1: any;
  let addr2: any;
  let addrs: any;

  const ONE_ETHER = ethers.utils.parseEther("1");

  beforeEach(async () => {
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    const IterableMappingFactory = await ethers.getContractFactory("IterableMapping");
    iterableMapping = await IterableMappingFactory.deploy();
    RpcGo = await ethers.getContractFactory("RpcGo", {
      libraries: {
        IterableMapping: iterableMapping.address,
      },
    });
    rpcGo = await RpcGo.deploy();
    ERC20 = await ethers.getContractFactory("ERC20");
    erc20 = await ERC20.deploy();
  });

  it("Should submit a transaction and deduct the fee", async function () {
    await rpcGo.connect(addr1).deposit({ value: ethers.utils.parseEther("1.0") });
    expect(await rpcGo.getAccountBalance(addr1.address)).to.equal(ethers.utils.parseEther("1.0"));

    const transactionValue = ethers.utils.parseEther("0.5");
    const feeAmount = ethers.utils.parseEther("0.0001");
    await expect(
        rpcGo.connect(addr1).submitTransaction(addr2.address, 0, "0x", { value: 0 })
    ).to.emit(rpcGo, 'ExecuteTransaction')
    .withArgs(addr1.address, addr2.address, 0, "0x");
    expect(await rpcGo.getAccountBalance(addr1.address)).to.equal(ethers.utils.parseEther("1.0").sub(feeAmount));
});

  it("should deposit ETH into the contract", async () => {
    await rpcGo.deposit({ value: ONE_ETHER });

    expect(await rpcGo.getAccountBalance(owner.address)).to.equal(ONE_ETHER);
  });

  it("should withdraw ETH from the contract", async () => {
    await rpcGo.deposit({ value: ONE_ETHER });
    await rpcGo.withdrawBalance(ONE_ETHER.div(2));

    expect(await rpcGo.getAccountBalance(owner.address)).to.equal(ONE_ETHER.div(2));
  });

  it("should transfer tokens between accounts", async () => {
    await rpcGo.deposit({ value: ONE_ETHER });
    await rpcGo.transferAccount(addr1.address, ONE_ETHER.div(2));
    expect(await rpcGo.getAccountBalance(addr1.address)).to.equal(ONE_ETHER.div(2));
  });

  it("should not allow owner to withdraw funds from the contract if not used by user", async () => {
    const initialBalance = ethers.utils.parseEther("100");
    await rpcGo.deposit({ value: ONE_ETHER });

    const ownerBalanceBefore = await owner.getBalance();
    await expect(rpcGo.ownerWithdraw()).to.be.revertedWith('No remaining balance to withdraw');
    expect(await rpcGo.getTotalAccountsBalance()).to.equal(ONE_ETHER);
    expect(await owner.getBalance()).to.be.lte(ownerBalanceBefore);
  });

  it("should fail if non-owner tries to withdraw funds from the contract", async () => {
    const initialBalance = ethers.utils.parseEther("100");
    await rpcGo.deposit({ value: ONE_ETHER });

    await expect(rpcGo.connect(addr1).ownerWithdraw()).to.be.revertedWith("Only owner can call this function");
  });
});
