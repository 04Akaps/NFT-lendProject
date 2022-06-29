// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../../utils/SafeMath.sol";

import "../interface/IHeroNFT.sol";

import "../../interface/IKIP7/IKIP7.sol";
import "../../interface/IKIP37/IKIP37Full.sol";

contract HeroController {
    using SafeMath for *;

    IHeroNFT private heroNFT;
    IKIP7 private token;
    IKIP37Full private item;

    address payable private coreOwner;
    address public depositAddress;

    bool private paused;
    bool private miningPaused;

    uint256 public priceOfKlay;
    uint256 public priceOfToken;
    uint256 private constant DECIMALS = 1e18;

    modifier notPaused() {
        require(!paused, "Paused State");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == coreOwner, "HeroCore Error : onlyOwner");
        _;
    }
    
    constructor() {
        paused = true;
        miningPaused = true;
        coreOwner = payable(msg.sender);
    }

    function initialize(
        address _heroNFT,
        address _token,
        address _item,
        address _depositAddress,
        uint256 _klay,
        uint256 _tokenPrice
    ) external onlyOwner {
        priceOfKlay = _klay.mul(DECIMALS);
        priceOfToken = _tokenPrice.mul(DECIMALS);

        heroNFT = IHeroNFT(_heroNFT);
        token = IKIP7(_token);
        item = IKIP37Full(_item);

        depositAddress = _depositAddress;
    }

    function changePaused() external onlyOwner {
        paused = !paused;
    }

    function changeMiningPaused() external onlyOwner{
        miningPaused = !miningPaused;
    }

    // **** view Function ****

    function getOwner() public view returns (address payable) {
        return coreOwner;
    }

    function getPaused() public view returns (bool) {
        return paused;
    }

    function getMiningPaused() public view returns(bool){
        return miningPaused;
    }

    function getItem() public view returns(IKIP37Full){
        return item;
    }
    
    function getToken() public view returns (IKIP7) {
        return token;
    }

    function getHeroNFT() public view returns (IHeroNFT) {
        return heroNFT;
    }
}
