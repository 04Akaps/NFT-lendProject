// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "../../interface/IKIP17/IKIP17.sol";

interface IHeroNFT is IKIP17 {
    function mint(address _to) external;

    function burn(uint256 _tokenId) external;

    function setContract(address _heroCore) external;

    function getHeroCore() external view returns (address);

    function getTokenIndex() external view returns (uint256);
}
