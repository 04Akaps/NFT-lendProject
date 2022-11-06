pragma solidity 0.8.0;

import "../../../utils/OnlyOwner.sol";
import "../../../interfaces/BEP721/IBEPFull.sol";

abstract contract ZolSet is OnlyOwner {

    IBEPFull private zolNft;
    uint256 private mintPrice;


    receive() external payable {}

    constructor(uint256 _mintPrice, IBEPFull _zolNft) {
        mintPrice = _mintPrice;
        zolNft = _zolNft;
    }

    // -> onlyOwner

    function changeMintPrice(uint256 _mintPrice) external onlyOwner {
        mintPrice  = _mintPrice;
    }

    // -> View

    function viewMintPrice() public view returns(uint256){
        return mintPrice;
    }


    

}