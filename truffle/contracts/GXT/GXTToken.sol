// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "../interface/IKIP7/KIP7Token.sol";
import "../utils/Ownable.sol";

contract GXTToken is KIP7Token, Ownable {
    constructor(
        string memory _name,
        string memory _symbol,
        address _heroProxy
    ) KIP7Token(_name, _symbol) {
        _mint(_heroProxy, 750000e18);
    }

    function mint(address _to, uint256 _amount) external onlyOwner {
        _mint(_to, _amount);
    }

    function burn(address _to, uint256 _amount) external onlyOwner {
        _burn(_to, _amount);
    }
}
