// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../../utils/SafeMath.sol";

import "../interface/IHeroNFT.sol";
import "../interface/IMakeGrade.sol";
import "../../interface/IKIP7/IKIP7.sol";

contract HeroController {
    using SafeMath for *;

    IHeroNFT private heroNFT;
    IMakeGrade private gradeDiagram;
    IKIP7 private token;

    address payable private coreOwner;
    address public depositAddress;

    bool private initialized;
    bool private paused;

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

    function init() external {
        require(initialized == false, "already Initialized!!");

        paused = true;
        coreOwner = payable(msg.sender);

        initialized = true;
    }

    function initialize(
        address _heroNFT,
        address _gradeDiagram,
        address _token,
        address _depositAddress,
        uint256 _klay,
        uint256 _tokenPrice
    ) external onlyOwner {
        priceOfKlay = _klay.mul(DECIMALS);
        priceOfToken = _tokenPrice.mul(DECIMALS);

        heroNFT = IHeroNFT(_heroNFT);
        gradeDiagram = IMakeGrade(_gradeDiagram);
        token = IKIP7(_token);

        depositAddress = _depositAddress;
    }

    function changePaused() external onlyOwner {
        paused = !paused;
    }

    // **** view Function ****

    function getOwner() public view returns (address payable) {
        return coreOwner;
    }

    function getPaused() public view returns (bool) {
        return paused;
    }

    function getToken() public view returns (IKIP7) {
        return token;
    }

    function getDiagram() public view returns (IMakeGrade) {
        return gradeDiagram;
    }

    function getHeroNFT() public view returns (IHeroNFT) {
        return heroNFT;
    }
}
