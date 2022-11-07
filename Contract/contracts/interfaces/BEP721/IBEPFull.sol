pragma solidity 0.8.0;

import "./IBEP721Metadata.sol";

abstract contract IBEPFull is IBEP721Metadata {
    function mint(address _to) virtual external;
    function viewTotalSupply() virtual public view returns(uint256);
    function burn(uint256 _tokenId) virtual public;
}