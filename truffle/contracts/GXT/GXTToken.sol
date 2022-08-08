// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "../interface/IKIP7/KIP7Token.sol";
import "../utils/Ownable.sol";

contract GXTToken is KIP7Token, Ownable {
    constructor() KIP7Token("GXT", "GTX") {}

    function mint(address _to, uint256 _amount) external onlyOwner {
        _mint(_to, _amount);
    }

    function burn(address _to, uint256 _amount) external onlyOwner {
        _burn(_to, _amount);
    }
}
