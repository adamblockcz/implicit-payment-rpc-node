/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Rpc, RpcInterface } from "../Rpc";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "ExecuteTransaction",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "LogData",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "reason",
        type: "string",
      },
    ],
    name: "RevertReason",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "submitTransaction",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506103f4806100206000396000f3fe60806040526004361061001e5760003560e01c8063c642747414610023575b600080fd5b610036610031366004610202565b610038565b005b7fe33eb0896a1b189f05b8c6d69ce71e4db20a0f91fc82ae4d6384ad76ba6e558081604051610067919061032b565b60405180910390a1600080846001600160a01b0316848460405161008b9190610345565b60006040518083038185875af1925050503d80600081146100c8576040519150601f19603f3d011682016040523d82523d6000602084013e6100cd565b606091505b50915091508161019857606060448251106100e85750600481015b8151156100f5578061011f565b6040518060400160405280601081526020016f2737903932bb32b93a103932b0b9b7b760811b8152505b90507f3c4b96f0117ea792d5c26cf00a23b93d220325ef34e352d05103b1971c8cb54c81604051610150919061032b565b60405180910390a1806040516020016101699190610361565b60408051601f198184030181529082905262461bcd60e51b825261018f9160040161032b565b60405180910390fd5b846001600160a01b0316336001600160a01b03167fab7bccecddf9b5629e0d45e9fcc3c9d353ae417ddb20dd83eb7c9fe71725de4786866040516101dd92919061039d565b60405180910390a35050505050565b634e487b7160e01b600052604160045260246000fd5b60008060006060848603121561021757600080fd5b83356001600160a01b038116811461022e57600080fd5b925060208401359150604084013567ffffffffffffffff8082111561025257600080fd5b818601915086601f83011261026657600080fd5b813581811115610278576102786101ec565b604051601f8201601f19908116603f011681019083821181831017156102a0576102a06101ec565b816040528281528960208487010111156102b957600080fd5b8260208601602083013760006020848301015280955050505050509250925092565b60005b838110156102f65781810151838201526020016102de565b50506000910152565b600081518084526103178160208601602086016102db565b601f01601f19169290920160200192915050565b60208152600061033e60208301846102ff565b9392505050565b600082516103578184602087016102db565b9190910192915050565b7302a3930b739b0b1ba34b7b7103330b4b632b21d160651b8152600082516103908160148501602087016102db565b9190910160140192915050565b8281526040602082015260006103b660408301846102ff565b94935050505056fea2646970667358221220202c75a82b53357551f8e07517077160fff768fc6ab99af4509bc9a1e36ea03d64736f6c63430008130033";

export class Rpc__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Rpc> {
    return super.deploy(overrides || {}) as Promise<Rpc>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): Rpc {
    return super.attach(address) as Rpc;
  }
  connect(signer: Signer): Rpc__factory {
    return super.connect(signer) as Rpc__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): RpcInterface {
    return new utils.Interface(_abi) as RpcInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Rpc {
    return new Contract(address, _abi, signerOrProvider) as Rpc;
  }
}