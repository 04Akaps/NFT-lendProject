pragma solidity 0.8.0;

import "./IBEP721Metadata.sol";

abstract contract IBEP721Full is IBEP721Metadata {
    function mint(address _to) external virtual;

    function viewTotalSupply() public view virtual returns (uint256);

    function burn(uint256 _tokenId) public virtual;
}
