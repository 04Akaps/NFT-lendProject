pragma solidity 0.8.0;

import "./ZolSet.sol";

abstract contract Mining is ZolSet {
    uint256 public constant MINING_AMOUNT = 7500000e18;
    uint256 public constant MINING_DAY = 365 days / 12;
    bool private miningPaused = true;
    uint256 private lastUpdateTime;
    uint256 private remainTime;

    function setLastUpdateTime() internal {
        lastUpdateTime = block.timestamp;
    }

    function changeMiningPaused() public onlyOwner {
        miningPaused = !miningPaused;
        lastUpdateTime = block.timestamp;
        remainTime = MINING_DAY;
    }

    function _calculateReward() internal view returns (uint256) {
        return (MINING_AMOUNT / (MINING_DAY)) * (_calculateDuration());
    }

    function _calculateDuration() internal view returns (uint256) {
        if (block.timestamp <= lastUpdateTime) {
            return 0;
        } else {
            return block.timestamp - (lastUpdateTime);
        }
    }
}
