# dHEDGE Kovan Subgraph

[dHEDGE](https://www.dhedge.org/) is a non-custodial, decentralised asset management and trading protocol on Ethereum, enabling investors to gain exposure to actively-managed and algorithmic investment pools from a Web 3 wallet such as MetaMask. Investors can gain exposure to other pools with a demonstrated history of success, whilst remaining in possession of their assets.

This subgraph dynamically tracks any fund created by the dHEDGE factory. It tracks the current state of dHEDGE Kovan contracts and contains stats for data such as:

- aggregated data across pool activity
- data on individual pools
- data on assets traded
- data on deposits & exchanges
- data on transfers & withdrawals

## Queries

### List of Pools

```graphql
{
  pools {
    id
    fundAddress
    name
    fundValue
  }
}
```

### A Pools exchanges, deposits, withdrawals

```graphql
{
  pools(where: { id: "0x16469a701ad694e61323991ccab3fb077ff77b06" }) {
    id
    fundAddress
    name
    managerName
    manager
    deposits {
      id
      investor
      valueDeposited
      fundTokensReceived
      time
    }
    exchanges {
      id
      sourceKey
      sourceAmount
      destinationKey
      destinationAmount
      time
    }
    withdrawals {
      id
      investor
      valueWithdrawn
      fundTokensWithdrawn
      time
    }
  }
}
```
