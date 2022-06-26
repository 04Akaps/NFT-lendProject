pragma solidity ^0.8.0;

import "../interface/IKIP7/IKIP7.sol";

contract borrowDeposit {
    IKIP7 private GxtToken;

    constructor(address _gxtToken, address _houseCore) {
        GxtToken = IKIP7(GxtToken);

        uint256 maxNumber; // maxNumber만큼 approve해주면 된다.

        GxtToken.approve(_houseCore, maxNumber);
    }
}
