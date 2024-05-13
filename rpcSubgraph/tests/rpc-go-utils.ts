import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  ExecuteTransaction,
  LogData,
  OwnerWithdraw,
  RevertReason,
  TransferAccount,
  Withdraw
} from "../generated/RpcGo/RpcGo"

export function createExecuteTransactionEvent(
  from: Address,
  to: Address,
  value: BigInt,
  data: Bytes
): ExecuteTransaction {
  let executeTransactionEvent = changetype<ExecuteTransaction>(newMockEvent())

  executeTransactionEvent.parameters = new Array()

  executeTransactionEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  executeTransactionEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  executeTransactionEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )
  executeTransactionEvent.parameters.push(
    new ethereum.EventParam("data", ethereum.Value.fromBytes(data))
  )

  return executeTransactionEvent
}

export function createLogDataEvent(data: Bytes): LogData {
  let logDataEvent = changetype<LogData>(newMockEvent())

  logDataEvent.parameters = new Array()

  logDataEvent.parameters.push(
    new ethereum.EventParam("data", ethereum.Value.fromBytes(data))
  )

  return logDataEvent
}

export function createOwnerWithdrawEvent(amount: BigInt): OwnerWithdraw {
  let ownerWithdrawEvent = changetype<OwnerWithdraw>(newMockEvent())

  ownerWithdrawEvent.parameters = new Array()

  ownerWithdrawEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return ownerWithdrawEvent
}

export function createRevertReasonEvent(reason: string): RevertReason {
  let revertReasonEvent = changetype<RevertReason>(newMockEvent())

  revertReasonEvent.parameters = new Array()

  revertReasonEvent.parameters.push(
    new ethereum.EventParam("reason", ethereum.Value.fromString(reason))
  )

  return revertReasonEvent
}

export function createTransferAccountEvent(
  from: Address,
  to: Address,
  amount: BigInt
): TransferAccount {
  let transferAccountEvent = changetype<TransferAccount>(newMockEvent())

  transferAccountEvent.parameters = new Array()

  transferAccountEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferAccountEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferAccountEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return transferAccountEvent
}

export function createWithdrawEvent(
  account: Address,
  amount: BigInt
): Withdraw {
  let withdrawEvent = changetype<Withdraw>(newMockEvent())

  withdrawEvent.parameters = new Array()

  withdrawEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  withdrawEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return withdrawEvent
}
