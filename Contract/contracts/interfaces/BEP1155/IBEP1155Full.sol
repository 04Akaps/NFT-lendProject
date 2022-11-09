pragma solidity 0.8.0;

import "./IBEP1155MetadataURI.sol";

abstract contract IBEP1155Full is IBEP1155MetadataURI {
    function mint(
        address _to,
        uint256 _tokenId,
        uint256 _amount
    ) external virtual;

    function burn(
        address _to,
        uint256 _tokenId,
        uint256 _amount
    ) public virtual;
}
