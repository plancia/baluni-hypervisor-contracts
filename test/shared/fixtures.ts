import { BigNumber } from "ethers";
import { ethers } from "hardhat";

import {
  TestERC20,
  IUniswapV3Factory,
  ISwapRouter,
  HypervisorFactory,
  UniswapV3PoolDeployer,
  TokeHypervisorFactory,
  SwapRouter,
} from "../../typechain";

import { Fixture } from "ethereum-waffle";

interface UniswapV3Fixture {
  factory: IUniswapV3Factory;
  router: ISwapRouter;
}

async function uniswapV3Fixture(): Promise<UniswapV3Fixture> {
  const factoryFactory = await ethers.getContractFactory("UniswapV3Factory");
  const factory = (await factoryFactory.deploy()) as IUniswapV3Factory;

  const tokenFactory = await ethers.getContractFactory("TestERC20");
  const WETH = (await tokenFactory.deploy(
    BigNumber.from(2).pow(255)
  )) as TestERC20; // TODO: change to real WETH
  console.log("WETH deployed");

  const routerFactory = await ethers.getContractFactory("SwapRouter");
  const router = (await routerFactory.deploy()) as SwapRouter;
  console.log("Router deployed");
  return { factory, router };
}

interface TokensFixture {
  token0: TestERC20;
  token1: TestERC20;
  token2: TestERC20;
}

async function tokensFixture(): Promise<TokensFixture> {
  const tokenFactory = await ethers.getContractFactory("TestERC20");
  const tokenA = (await tokenFactory.deploy(
    BigNumber.from(2).pow(255)
  )) as TestERC20;
  const tokenB = (await tokenFactory.deploy(
    BigNumber.from(2).pow(255)
  )) as TestERC20;
  const tokenC = (await tokenFactory.deploy(
    BigNumber.from(2).pow(255)
  )) as TestERC20;

  const [token0, token1, token2] = [tokenA, tokenB, tokenC].sort(
    (tokenA, tokenB) =>
      tokenA.address.toLowerCase() < tokenB.address.toLowerCase() ? -1 : 1
  );

  return { token0, token1, token2 };
}

interface HypervisorFactoryFixture {
  hypervisorFactory: HypervisorFactory;
}

async function hypervisorFactoryFixture(
  factory: IUniswapV3Factory
): Promise<HypervisorFactoryFixture> {
  const hypervisorFactoryFactory = await ethers.getContractFactory(
    "HypervisorFactory"
  );
  const hypervisorFactory = (await hypervisorFactoryFactory.deploy(
    factory.address
  )) as HypervisorFactory;
  return { hypervisorFactory };
}
interface TokeHypervisorFactoryFixture {
  tokeHypervisorFactory: TokeHypervisorFactory;
}

async function tokeHypervisorFactoryFixture(
  factory: IUniswapV3Factory
): Promise<TokeHypervisorFactoryFixture> {
  const tokeHypervisorFactoryFactory = await ethers.getContractFactory(
    "TokeHypervisorFactory"
  );
  const tokeHypervisorFactory = (await tokeHypervisorFactoryFactory.deploy(
    factory.address
  )) as TokeHypervisorFactory;
  return { tokeHypervisorFactory };
}

interface OurFactoryFixture {
  ourFactory: UniswapV3PoolDeployer;
}

async function ourFactoryFixture(): Promise<OurFactoryFixture> {
  const ourFactoryFactory = await ethers.getContractFactory(
    "UniswapV3PoolDeployer"
  );
  const ourFactory =
    (await ourFactoryFactory.deploy()) as UniswapV3PoolDeployer;
  return { ourFactory };
}

type allContractsFixture = UniswapV3Fixture & TokensFixture & OurFactoryFixture;

export const fixture: Fixture<allContractsFixture> =
  async function (): Promise<allContractsFixture> {
    const { factory, router } = await uniswapV3Fixture();
    const { token0, token1, token2 } = await tokensFixture();
    const { ourFactory } = await ourFactoryFixture();

    return {
      token0,
      token1,
      token2,
      factory,
      router,
      ourFactory,
    };
  };

type HypervisorTestFixture = UniswapV3Fixture &
  TokensFixture &
  HypervisorFactoryFixture;

export const hypervisorTestFixture: Fixture<HypervisorTestFixture> =
  async function (): Promise<HypervisorTestFixture> {
    const { factory, router } = await uniswapV3Fixture();
    const { token0, token1, token2 } = await tokensFixture();
    const { hypervisorFactory } = await hypervisorFactoryFixture(factory);

    return {
      token0,
      token1,
      token2,
      factory,
      router,
      hypervisorFactory,
    };
  };

type TokeHypervisorTestFixture = UniswapV3Fixture &
  TokensFixture &
  TokeHypervisorFactoryFixture;

export const tokeHypervisorTestFixture: Fixture<TokeHypervisorTestFixture> =
  async function (): Promise<TokeHypervisorTestFixture> {
    const { factory, router } = await uniswapV3Fixture();
    const { token0, token1, token2 } = await tokensFixture();
    const { tokeHypervisorFactory } = await tokeHypervisorFactoryFixture(
      factory
    );

    return {
      token0,
      token1,
      token2,
      factory,
      router,
      tokeHypervisorFactory,
    };
  };
