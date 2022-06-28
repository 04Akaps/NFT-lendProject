pragma solidity ^0.8.0;

import "../interface/IKIP37/KIP37.sol";

contract GXTItem is KIP37 {
    constructor(string memory uri) KIP37(uri) {}

    function mint(
        address _user,
        uint256 _tokenId,
        uint256 _amount
    ) external {
        _mint(_user, _tokenId, _amount, "");
    }

    function burn(
        address _user,
        uint256 _tokenId,
        uint256 _amount
    ) external {
        _burn(_user, _tokenId, _amount);
    }
}
