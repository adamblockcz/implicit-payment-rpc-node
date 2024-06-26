/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface RpcGoInterface extends ethers.utils.Interface {
  functions: {
    "deposit()": FunctionFragment;
    "getAccountBalance(address)": FunctionFragment;
    "getTotalAccountsBalance()": FunctionFragment;
    "ownerWithdraw()": FunctionFragment;
    "ownerWithdrawAmount(uint256)": FunctionFragment;
    "setFeeAmount(uint256)": FunctionFragment;
    "submitTransaction(address,uint256,bytes)": FunctionFragment;
    "transferAccount(address,uint256)": FunctionFragment;
    "withdrawBalance(uint256)": FunctionFragment;
    "withdrawRemainingBalance()": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "deposit", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getAccountBalance",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "getTotalAccountsBalance",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "ownerWithdraw",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "ownerWithdrawAmount",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setFeeAmount",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "submitTransaction",
    values: [string, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "transferAccount",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawBalance",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawRemainingBalance",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getAccountBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTotalAccountsBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "ownerWithdraw",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "ownerWithdrawAmount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setFeeAmount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "submitTransaction",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferAccount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawRemainingBalance",
    data: BytesLike
  ): Result;

  events: {
    "Deposit(address,uint256)": EventFragment;
    "ExecuteTransaction(address,address,uint256,bytes)": EventFragment;
    "LogData(bytes)": EventFragment;
    "OwnerWithdraw(uint256)": EventFragment;
    "Payment(address,uint256)": EventFragment;
    "RevertReason(string)": EventFragment;
    "TransferAccount(address,address,uint256)": EventFragment;
    "Withdraw(address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Deposit"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ExecuteTransaction"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "LogData"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnerWithdraw"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Payment"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RevertReason"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TransferAccount"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Withdraw"): EventFragment;
}

export type DepositEvent = TypedEvent<
  [string, BigNumber] & { account: string; amount: BigNumber }
>;

export type ExecuteTransactionEvent = TypedEvent<
  [string, string, BigNumber, string] & {
    from: string;
    to: string;
    value: BigNumber;
    data: string;
  }
>;

export type LogDataEvent = TypedEvent<[string] & { data: string }>;

export type OwnerWithdrawEvent = TypedEvent<
  [BigNumber] & { amount: BigNumber }
>;

export type PaymentEvent = TypedEvent<
  [string, BigNumber] & { account: string; amount: BigNumber }
>;

export type RevertReasonEvent = TypedEvent<[string] & { reason: string }>;

export type TransferAccountEvent = TypedEvent<
  [string, string, BigNumber] & { from: string; to: string; amount: BigNumber }
>;

export type WithdrawEvent = TypedEvent<
  [string, BigNumber] & { account: string; amount: BigNumber }
>;

export class RpcGo extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: RpcGoInterface;

  functions: {
    deposit(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getAccountBalance(
      account: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getTotalAccountsBalance(overrides?: CallOverrides): Promise<[BigNumber]>;

    ownerWithdraw(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    ownerWithdrawAmount(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setFeeAmount(
      _feeAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    submitTransaction(
      to: string,
      value: BigNumberish,
      data: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferAccount(
      to: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    withdrawBalance(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    withdrawRemainingBalance(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  deposit(
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getAccountBalance(
    account: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getTotalAccountsBalance(overrides?: CallOverrides): Promise<BigNumber>;

  ownerWithdraw(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  ownerWithdrawAmount(
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setFeeAmount(
    _feeAmount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  submitTransaction(
    to: string,
    value: BigNumberish,
    data: BytesLike,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferAccount(
    to: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  withdrawBalance(
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  withdrawRemainingBalance(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    deposit(overrides?: CallOverrides): Promise<void>;

    getAccountBalance(
      account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getTotalAccountsBalance(overrides?: CallOverrides): Promise<BigNumber>;

    ownerWithdraw(overrides?: CallOverrides): Promise<void>;

    ownerWithdrawAmount(
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setFeeAmount(
      _feeAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    submitTransaction(
      to: string,
      value: BigNumberish,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    transferAccount(
      to: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    withdrawBalance(
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    withdrawRemainingBalance(overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    "Deposit(address,uint256)"(
      account?: string | null,
      amount?: null
    ): TypedEventFilter<
      [string, BigNumber],
      { account: string; amount: BigNumber }
    >;

    Deposit(
      account?: string | null,
      amount?: null
    ): TypedEventFilter<
      [string, BigNumber],
      { account: string; amount: BigNumber }
    >;

    "ExecuteTransaction(address,address,uint256,bytes)"(
      from?: string | null,
      to?: string | null,
      value?: null,
      data?: null
    ): TypedEventFilter<
      [string, string, BigNumber, string],
      { from: string; to: string; value: BigNumber; data: string }
    >;

    ExecuteTransaction(
      from?: string | null,
      to?: string | null,
      value?: null,
      data?: null
    ): TypedEventFilter<
      [string, string, BigNumber, string],
      { from: string; to: string; value: BigNumber; data: string }
    >;

    "LogData(bytes)"(data?: null): TypedEventFilter<[string], { data: string }>;

    LogData(data?: null): TypedEventFilter<[string], { data: string }>;

    "OwnerWithdraw(uint256)"(
      amount?: null
    ): TypedEventFilter<[BigNumber], { amount: BigNumber }>;

    OwnerWithdraw(
      amount?: null
    ): TypedEventFilter<[BigNumber], { amount: BigNumber }>;

    "Payment(address,uint256)"(
      account?: string | null,
      amount?: null
    ): TypedEventFilter<
      [string, BigNumber],
      { account: string; amount: BigNumber }
    >;

    Payment(
      account?: string | null,
      amount?: null
    ): TypedEventFilter<
      [string, BigNumber],
      { account: string; amount: BigNumber }
    >;

    "RevertReason(string)"(
      reason?: null
    ): TypedEventFilter<[string], { reason: string }>;

    RevertReason(reason?: null): TypedEventFilter<[string], { reason: string }>;

    "TransferAccount(address,address,uint256)"(
      from?: string | null,
      to?: string | null,
      amount?: null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { from: string; to: string; amount: BigNumber }
    >;

    TransferAccount(
      from?: string | null,
      to?: string | null,
      amount?: null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { from: string; to: string; amount: BigNumber }
    >;

    "Withdraw(address,uint256)"(
      account?: string | null,
      amount?: null
    ): TypedEventFilter<
      [string, BigNumber],
      { account: string; amount: BigNumber }
    >;

    Withdraw(
      account?: string | null,
      amount?: null
    ): TypedEventFilter<
      [string, BigNumber],
      { account: string; amount: BigNumber }
    >;
  };

  estimateGas: {
    deposit(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getAccountBalance(
      account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getTotalAccountsBalance(overrides?: CallOverrides): Promise<BigNumber>;

    ownerWithdraw(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    ownerWithdrawAmount(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setFeeAmount(
      _feeAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    submitTransaction(
      to: string,
      value: BigNumberish,
      data: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferAccount(
      to: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    withdrawBalance(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    withdrawRemainingBalance(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    deposit(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getAccountBalance(
      account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getTotalAccountsBalance(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    ownerWithdraw(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    ownerWithdrawAmount(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setFeeAmount(
      _feeAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    submitTransaction(
      to: string,
      value: BigNumberish,
      data: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferAccount(
      to: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    withdrawBalance(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    withdrawRemainingBalance(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
