// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "../interface/IKIP37/KIP37.sol";
import "./utils/Controller.sol";

contract GXTItem is KIP37, Controller {
    constructor() KIP37() {
        _setURI(0, "firstItem");
        _setURI(1, "secondItem");
        _setURI(2, "thirdItem");
        _setURI(3, "fourthItem");
    }

    function mint(
        address _user,
        uint256 _tokenId,
        uint256 _amount
    ) external onlyController {
        _mint(_user, _tokenId, _amount, "");
    }

    function burn(
        address _user,
        uint256 _tokenId,
        uint256 _amount
    ) external onlyController {
        _burn(_user, _tokenId, _amount);
    }
}
