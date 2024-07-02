## Hypervisor

###

A Uniswap V2-like interface with fungible liquidity to Uniswap V3
which allows for arbitrary liquidity provision: one-sided, lop-sided, and
balanced

Consult tests/deposit_withdraw.test.ts for deposit, withdrawal, rebalance examples

### Tasks

Deploys hypervisor

`npx hardhat deploy-hypervisor-orphan --pool UNIV3-POOL-ADDRESS --name ERC20-NAME --symbol ERC20-SYMBOL --network NETWORK`

Initialize hypervisor

`npx hardhat initialize-hypervisor --hypervisor HYPERVISOR-ADDRESS --amount0 TOKEN0-AMOUNT --amount1 TOKEN1-AMOUNT --uniProxy UNIPROXY-ADDRESS --adminAddress ADMIN-ADDRESS --network NETWORK`

### Testing

`npx hardhat test`

Pool WMATICxUSDC 0x7dC64e726E425f4145127DCD2308a3b293B44fb2
Clearing 0xb679FdcaC090FFC4848d9709C705241867B0d78A
UniProxy 0x0CC0fD8e82eB9ea3b292082901cDe04195634D1b
Admin 0xD0Abe150C9eD0a3f1fb93a3601277fBc092508c2
