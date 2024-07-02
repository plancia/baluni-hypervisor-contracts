// SPDX-License-Identifier: Unlicense

pragma solidity 0.7.6;
pragma abicoder v2;

import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";

import "@uniswap/v3-core/contracts/interfaces/IUniswapV3Pool.sol";
import "@uniswap/v3-core/contracts/interfaces/callback/IUniswapV3MintCallback.sol";
import "@uniswap/v3-core/contracts/interfaces/callback/IUniswapV3SwapCallback.sol";
import "@uniswap/v3-core/contracts/libraries/TickMath.sol";
import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";

/**
 * @title  TestRouter
 * @dev    DO NOT USE IN PRODUCTION. This is only intended to be used for
 *         tests and lacks slippage and callback caller checks.
 */
contract SwapRouter is
    IUniswapV3MintCallback,
    IUniswapV3SwapCallback,
    ISwapRouter
{
    using SafeERC20 for IERC20;

    function mint(
        IUniswapV3Pool pool,
        int24 tickLower,
        int24 tickUpper,
        uint128 amount
    ) external returns (uint256, uint256) {
        int24 tickSpacing = pool.tickSpacing();
        require(
            tickLower % tickSpacing == 0,
            "tickLower must be a multiple of tickSpacing"
        );
        require(
            tickUpper % tickSpacing == 0,
            "tickUpper must be a multiple of tickSpacing"
        );
        return
            pool.mint(
                msg.sender,
                tickLower,
                tickUpper,
                amount,
                abi.encode(msg.sender)
            );
    }

    function swap(
        IUniswapV3Pool pool,
        bool zeroForOne,
        int256 amountSpecified
    ) external returns (int256, int256) {
        return
            pool.swap(
                msg.sender,
                zeroForOne,
                amountSpecified,
                zeroForOne
                    ? TickMath.MIN_SQRT_RATIO + 1
                    : TickMath.MAX_SQRT_RATIO - 1,
                abi.encode(msg.sender)
            );
    }

    function uniswapV3MintCallback(
        uint256 amount0Owed,
        uint256 amount1Owed,
        bytes calldata data
    ) external override {
        _callback(amount0Owed, amount1Owed, data);
    }

    function uniswapV3SwapCallback(
        int256 amount0Delta,
        int256 amount1Delta,
        bytes calldata data
    ) external override {
        uint256 amount0 = amount0Delta > 0 ? uint256(amount0Delta) : 0;
        uint256 amount1 = amount1Delta > 0 ? uint256(amount1Delta) : 0;
        _callback(amount0, amount1, data);
    }

    function _callback(
        uint256 amount0,
        uint256 amount1,
        bytes calldata data
    ) internal {
        IUniswapV3Pool pool = IUniswapV3Pool(msg.sender);
        address payer = abi.decode(data, (address));

        IERC20(pool.token0()).safeTransferFrom(payer, msg.sender, amount0);
        IERC20(pool.token1()).safeTransferFrom(payer, msg.sender, amount1);
    }

    function exactInputSingle(
        ISwapRouter.ExactInputSingleParams calldata params
    ) external payable override returns (uint256 amountOut) {
        return 0;
    }

    function exactInput(
        ISwapRouter.ExactInputParams calldata params
    ) external payable override returns (uint256 amountOut) {
        return 0;
    }

    function exactOutputSingle(
        ISwapRouter.ExactOutputSingleParams calldata params
    ) external payable override returns (uint256 amountIn) {
        return 0;
    }

    function exactOutput(
        ISwapRouter.ExactOutputParams calldata params
    ) external payable override returns (uint256 amountIn) {
        return 0;
    }

    function refundETH() external payable {
        // solhint-disable-next-line avoid-tx-origin
        payable(tx.origin).transfer(msg.value);
    }
}
