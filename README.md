# Baluni-Hypervisor-Contracts

This project is forked from [Hypervisor](https://github.com/GammaStrategies/hypervisor)

###

A Uniswap V2-like interface with fungible liquidity to Uniswap V3
which allows for arbitrary liquidity provision: one-sided, lop-sided, and
balanced

### Tasks

Deploys hypervisor

`npx hardhat deploy-hypervisor-orphan --pool UNIV3-POOL-ADDRESS --name ERC20-NAME --symbol ERC20-SYMBOL --network NETWORK`

Initialize hypervisor

`npx hardhat initialize-hypervisor --hypervisor HYPERVISOR-ADDRESS --amount0 TOKEN0-AMOUNT --amount1 TOKEN1-AMOUNT --uniProxy UNIPROXY-ADDRESS --adminAddress ADMIN-ADDRESS --network NETWORK`

### Testing

`npx hardhat test`
