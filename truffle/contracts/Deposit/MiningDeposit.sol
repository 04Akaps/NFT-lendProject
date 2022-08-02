// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../interface/IKIP7/IKIP7.sol";
import "../utils/Ownable.sol";

contract MiningDeposit is Ownable {
    IKIP7 private GxtToken;

    constructor(address _gxtToken, address _heroCore) {
        GxtToken = IKIP7(_gxtToken);

        uint256 maxNumber = type(uint256).max;

        GxtToken.approve(_heroCore, maxNumber);
    }

    function reSetApprove(address _heroCore) external onlyOwner {
        GxtToken.approve(_heroCore, type(uint256).max);
    }
}
