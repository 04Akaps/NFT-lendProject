pragma solidity 0.8.0;

import "../../../utils/OnlyOwner.sol";
import "../../../interfaces/BEP721/IBEP721Full.sol";
import "../../../interfaces/BEP20/IBEP20.sol";
import "../../../interfaces/BEP1155/IBEP1155Full.sol";

import "./ZolDiagram.sol";

abstract contract ZolSet is OnlyOwner, ZolDiagram {
    IBEP1155Full private zolWeapon;
    IBEP721Full private zolNft;
    IBEP20 private zolToken;
    address miningPool;

    uint256 private mintPrice;

    receive() external payable {}

    constructor(
        uint256 _mintPrice,
        IBEP1155Full _zolWeapon,
        IBEP721Full _zolNft,
        IBEP20 _zolToken,
        address _miningPool
    ) {
        mintPrice = _mintPrice;

        zolNft = _zolNft;
        zolToken = _zolToken;
        zolWeapon = _zolWeapon;
        miningPool = _miningPool;
    }

    // -> onlyOwner

    function changeMintPrice(uint256 _mintPrice) external onlyOwner {
        mintPrice = _mintPrice;
    }

    // -> View

    function viewMintPrice() public view returns (uint256) {
        return mintPrice;
    }

    function viewZolWeapon() public view returns (IBEP1155Full) {
        return zolWeapon;
    }

    function viewZolNft() public view returns (IBEP721Full) {
        return zolNft;
    }

    function viewZolToken() public view returns (IBEP20) {
        return zolToken;
    }
}
