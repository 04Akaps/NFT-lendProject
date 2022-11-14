pragma solidity 0.8.0;

import "../../interfaces/BEP20/IBEP20.sol";

contract ZolMiningPool {
    constructor(address _zolCore, IBEP20 _zolToken) {
        _zolToken.approve(_zolCore, type(uint256).max);
    }
}