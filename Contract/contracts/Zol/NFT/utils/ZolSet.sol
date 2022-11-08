pragma solidity 0.8.0;

import "../../../utils/OnlyOwner.sol";
import "../../../interfaces/BEP721/IBEP721Full.sol";
import "../../../interfaces/BEP20/IBEP20.sol";

import "./ZolDiagram.sol";

abstract contract ZolSet is OnlyOwner, ZolDiagram {
    IBEP721Full private zolNft;
    IBEP20 private zolToken;

    uint256 private mintPrice;

    receive() external payable {}

    constructor(
        uint256 _mintPrice,
        IBEP721Full _zolNft,
        IBEP20 _zolToken
    ) {
        mintPrice = _mintPrice;
        zolNft = _zolNft;
        zolToken = _zolToken;
    }

    // -> onlyOwner

    function changeMintPrice(uint256 _mintPrice) external onlyOwner {
        mintPrice = _mintPrice;
    }

    // -> View

    function viewMintPrice() public view returns (uint256) {
        return mintPrice;
    }

    function viewZolNft() public view returns (IBEP721Full) {
        return zolNft;
    }

    function viewZolToken() public view returns (IBEP20) {
        return zolToken;
    }
}
