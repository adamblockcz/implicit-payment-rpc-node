# Hardhat project

### Minting

Users can mint new tokens by providing the token type they wish to mint. Minting requires payment based on the specified price per copy for the token type.

### Token Type Management

The contract owner has the ability to create new token types, update existing token types, and manage the URI associated with each token type.

### Withdrawal

The contract owner can withdraw the contract's balance, enabling easy access to funds accumulated from token sales.


## Installation

```shell
npm i
```

## Task

- Mint:

    ```shell
    npx hardhat mint --network polygon --token-type 0
    ```

## Test

```shell
npx hardhat test
```
