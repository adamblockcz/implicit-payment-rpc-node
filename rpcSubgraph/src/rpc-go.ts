import {
  ExecuteTransaction as ExecuteTransactionEvent,
  LogData as LogDataEvent,
  OwnerWithdraw as OwnerWithdrawEvent,
  RevertReason as RevertReasonEvent,
  TransferAccount as TransferAccountEvent,
  Withdraw as WithdrawEvent,
  Deposit as DepositEvent,
  Payment as PaymentEvent
} from "../generated/RpcGo/RpcGo"
import {
  ExecuteTransaction,
  LogData,
  OwnerWithdraw,
  RevertReason,
  TransferAccount,
  Withdraw,
  UserProfile,
  Deposit,
  Payment
} from "../generated/schema"

export function handleExecuteTransaction(event: ExecuteTransactionEvent): void {
  let entity = new ExecuteTransaction(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.from = event.params.from.toHexString()
  entity.to = event.params.to
  entity.value = event.params.value
  entity.data = event.params.data

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  let user = UserProfile.load(entity.from);

  if(!user) {
    user = new UserProfile(entity.from);
    user.save();
  }
}

export function handleDeposit(event: DepositEvent): void{
  let entity = new Deposit(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePayment(event: PaymentEvent): void{
  let entity = new Payment(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleLogData(event: LogDataEvent): void {
  let entity = new LogData(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.data = event.params.data

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnerWithdraw(event: OwnerWithdrawEvent): void {
  let entity = new OwnerWithdraw(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRevertReason(event: RevertReasonEvent): void {
  let entity = new RevertReason(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.reason = event.params.reason

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTransferAccount(event: TransferAccountEvent): void {
  let entity = new TransferAccount(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.from = event.params.from
  entity.to = event.params.to
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleWithdraw(event: WithdrawEvent): void {
  let entity = new Withdraw(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
