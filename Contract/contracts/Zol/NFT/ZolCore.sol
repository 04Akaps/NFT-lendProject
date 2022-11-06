pragma solidity 0.8.0;

import "./utils/ZolSet.sol";

contract ZolCore is ZolSet {
    // 넣은 기능
    // 1. Breed
    // 2. LevelUp

    // 넣을 컨텐츠
    // Staking, Mining, Lend, Exploration
    struct Zol {
        address currentOwner;
        uint256 level;
        uint256 breedCount;
        uint256 timeStamp;
    }

    constructor(uint256 _mintPrice, IBEPFull _zolNft) ZolSet(_mintPrice, _zolNft) {}

    function mintZol() external payable {
        uint256 value = msg.value;
        uint256 mintPrice = viewMintPrice();

        require(value >= viewMintPrice(), "mintZol Error : Price is out of range");

        uint256 overedPrice = mintPrice - value;
        payable(msg.sender).transfer(overedPrice);


    }
}