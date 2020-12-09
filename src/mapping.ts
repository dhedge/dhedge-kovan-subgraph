import {
  DaoAddressSet as DaoAddressSetEvent,
  DaoFeeSet as DaoFeeSetEvent,
  ExitFeeCooldownSet as ExitFeeCooldownSetEvent,
  ExitFeeSet as ExitFeeSetEvent,
  FundCreated as FundCreatedEvent,
  MaximumSupportedAssetCountSet as MaximumSupportedAssetCountSetEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  ProxyCreated as ProxyCreatedEvent
} from "../generated/Contract/Contract"
import {
  DaoAddressSet,
  DaoFeeSet,
  ExitFeeCooldownSet,
  ExitFeeSet,
  FundCreated,
  MaximumSupportedAssetCountSet,
  OwnershipTransferred,
  ProxyCreated
} from "../generated/schema"

export function handleDaoAddressSet(event: DaoAddressSetEvent): void {
  let entity = new DaoAddressSet(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.dao = event.params.dao
  entity.save()
}

export function handleDaoFeeSet(event: DaoFeeSetEvent): void {
  let entity = new DaoFeeSet(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.numerator = event.params.numerator
  entity.denominator = event.params.denominator
  entity.save()
}

export function handleExitFeeCooldownSet(event: ExitFeeCooldownSetEvent): void {
  let entity = new ExitFeeCooldownSet(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.cooldown = event.params.cooldown
  entity.save()
}

export function handleExitFeeSet(event: ExitFeeSetEvent): void {
  let entity = new ExitFeeSet(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.numerator = event.params.numerator
  entity.denominator = event.params.denominator
  entity.save()
}

export function handleFundCreated(event: FundCreatedEvent): void {
  let entity = new FundCreated(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.fundAddress = event.params.fundAddress
  entity.isPoolPrivate = event.params.isPoolPrivate
  entity.fundName = event.params.fundName
  entity.managerName = event.params.managerName
  entity.manager = event.params.manager
  entity.time = event.params.time
  entity.managerFeeNumerator = event.params.managerFeeNumerator
  entity.managerFeeDenominator = event.params.managerFeeDenominator
  entity.save()
}

export function handleMaximumSupportedAssetCountSet(
  event: MaximumSupportedAssetCountSetEvent
): void {
  let entity = new MaximumSupportedAssetCountSet(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.count = event.params.count
  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner
  entity.save()
}

export function handleProxyCreated(event: ProxyCreatedEvent): void {
  let entity = new ProxyCreated(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.proxy = event.params.proxy
  entity.save()
}
