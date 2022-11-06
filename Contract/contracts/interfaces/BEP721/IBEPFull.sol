pragma solidity 0.8.0;

import "./IBEP721Metadata.sol";

interface IBEPFull is IBEP721Metadata {
    function mint(address _to) external;
}