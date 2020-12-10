import {
  Approval as ApprovalEvent,
  AssetAdded as AssetAddedEvent,
  AssetRemoved as AssetRemovedEvent,
  Deposit as DepositEvent,
  Exchange as ExchangeEvent,
  ManagerFeeMinted as ManagerFeeMintedEvent,
  ManagerFeeSet as ManagerFeeSetEvent,
  ManagerUpdated as ManagerUpdatedEvent,
  PoolPrivacyUpdated as PoolPrivacyUpdatedEvent,
  Transfer as TransferEvent,
  Withdrawal as WithdrawalEvent,
  DHedge,
} from '../generated/templates/Dhedge/Dhedge';
import {
  Approval,
  AssetAdded,
  AssetRemoved,
  Deposit,
  Exchange,
  ManagerFeeMinted,
  ManagerFeeSet,
  ManagerUpdated,
  PoolPrivacyUpdated,
  Transfer,
  Withdrawal,
  Pool,
} from '../generated/schema';
import { dataSource } from '@graphprotocol/graph-ts';

export function handleApproval(event: ApprovalEvent): void {
  let entity = new Approval(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );
  entity.owner = event.params.owner;
  entity.spender = event.params.spender;
  entity.value = event.params.value;
  entity.save();
}

export function handleAssetAdded(event: AssetAddedEvent): void {
  let entity = new AssetAdded(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );
  entity.fundAddress = event.params.fundAddress;
  entity.manager = event.params.manager;
  entity.assetKey = event.params.assetKey;
  entity.save();
}

export function handleAssetRemoved(event: AssetRemovedEvent): void {
  let entity = new AssetRemoved(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );
  entity.fundAddress = event.params.fundAddress;
  entity.manager = event.params.manager;
  entity.assetKey = event.params.assetKey;
  entity.save();
}

export function handleDeposit(event: DepositEvent): void {
  let entity = new Deposit(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );
  let contract = DHedge.bind(event.address);

  let id = dataSource.address().toHexString();
  let pool = Pool.load(id);
  if (!pool) {
    pool = new Pool(id);
    pool.fundAddress = event.params.fundAddress;
  }
  pool.name = contract.name();
  pool.manager = contract.manager();
  pool.managerName = contract.managerName();
  pool.fundValue = contract.totalFundValue();
  pool.totalSupply = contract.totalSupply();
  pool.isPrivatePool = contract.privatePool();
  pool.tokenPrice = contract.tokenPrice();
  pool.save();

  entity.fundAddress = event.params.fundAddress;
  entity.totalSupply = contract.totalSupply();
  entity.manager = contract.manager();
  entity.investor = event.params.investor;
  entity.valueDeposited = event.params.valueDeposited;
  entity.fundTokensReceived = event.params.fundTokensReceived;
  entity.totalInvestorFundTokens = event.params.totalInvestorFundTokens;
  entity.fundValue = event.params.fundValue;
  entity.time = event.params.time;
  entity.pool = pool.id;
  entity.save();
}

export function handleExchange(event: ExchangeEvent): void {
  let entity = new Exchange(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );
  let contract = DHedge.bind(event.address);

  let id = dataSource.address().toHexString();
  let pool = Pool.load(id);
  if (!pool) {
    pool = new Pool(id);
    pool.fundAddress = event.params.fundAddress;
  }

  pool.name = contract.name();
  pool.manager = contract.manager();
  pool.managerName = contract.managerName();
  pool.fundValue = contract.totalFundValue();
  pool.totalSupply = contract.totalSupply();
  pool.isPrivatePool = contract.privatePool();
  pool.tokenPrice = contract.tokenPrice();
  pool.save();

  entity.fundAddress = event.params.fundAddress;
  entity.totalSupply = contract.totalSupply();
  entity.manager = contract.manager();
  entity.fundValue = contract.totalFundValue();
  entity.sourceKey = event.params.sourceKey;
  entity.sourceAmount = event.params.sourceAmount;
  entity.destinationKey = event.params.destinationKey;
  entity.destinationAmount = event.params.destinationAmount;
  entity.time = event.params.time;
  entity.pool = pool.id;
  entity.save();
}

export function handleManagerFeeMinted(event: ManagerFeeMintedEvent): void {
  let entity = new ManagerFeeMinted(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );
  entity.pool = event.params.pool;
  entity.manager = event.params.manager;
  entity.available = event.params.available;
  entity.daoFee = event.params.daoFee;
  entity.managerFee = event.params.managerFee;
  entity.tokenPriceAtLastFeeMint = event.params.tokenPriceAtLastFeeMint;
  entity.save();
}

export function handleManagerFeeSet(event: ManagerFeeSetEvent): void {
  let entity = new ManagerFeeSet(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );
  entity.fundAddress = event.params.fundAddress;
  entity.manager = event.params.manager;
  entity.numerator = event.params.numerator;
  entity.denominator = event.params.denominator;
  entity.save();
}

export function handleManagerUpdated(event: ManagerUpdatedEvent): void {
  let entity = new ManagerUpdated(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );
  entity.newManager = event.params.newManager;
  entity.newManagerName = event.params.newManagerName;
  entity.save();
}

export function handlePoolPrivacyUpdated(event: PoolPrivacyUpdatedEvent): void {
  let entity = new PoolPrivacyUpdated(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );
  entity.isPoolPrivate = event.params.isPoolPrivate;
  entity.save();
}

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );
  entity.from = event.params.from;
  entity.to = event.params.to;
  entity.value = event.params.value;
  entity.save();
}

export function handleWithdrawal(event: WithdrawalEvent): void {
  let entity = new Withdrawal(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );
  let contract = DHedge.bind(event.address);

  let id = dataSource.address().toHexString();
  let pool = Pool.load(id);
  if (!pool) {
    pool = new Pool(id);
    pool.fundAddress = event.params.fundAddress;
  }
  pool.name = contract.name();
  pool.manager = contract.manager();
  pool.managerName = contract.managerName();
  pool.fundValue = contract.totalFundValue();
  pool.totalSupply = contract.totalSupply();
  pool.isPrivatePool = contract.privatePool();
  pool.tokenPrice = contract.tokenPrice();
  pool.save();

  entity.fundAddress = event.params.fundAddress;
  entity.totalSupply = contract.totalSupply();
  entity.manager = contract.manager();
  entity.investor = event.params.investor;
  entity.valueWithdrawn = event.params.valueWithdrawn;
  entity.fundTokensWithdrawn = event.params.fundTokensWithdrawn;
  entity.totalInvestorFundTokens = event.params.totalInvestorFundTokens;
  entity.fundValue = event.params.fundValue;
  entity.time = event.params.time;
  entity.pool = pool.id;
  entity.save();
}
