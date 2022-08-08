// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "./IKIP37MetadataURI.sol";

interface IKIP37Full is IKIP37MetadataURI {
    function mint(
        address _user,
        uint256 _tokenId,
        uint256 _amount
    ) external;

    function burn(
        address _user,
        uint256 _tokenId,
        uint256 _amount
    ) external;
}
