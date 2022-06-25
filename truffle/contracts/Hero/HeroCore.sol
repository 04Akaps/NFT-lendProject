// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "./utils/HeroController.sol";
import "./utils/TimeLock.sol";

import "../utils/SafeMath.sol";

contract HeroCore is HeroController, TimeLock {
    using SafeMath for *;

    struct HERO {
        uint256 level;
        string grade;
        uint256 birthTime;
        chcekStatus status;
    }

    struct chcekStatus {
        bool staked;
        bool borrowed;
        bool traveled;
        bool mining;
        stakeStruct stakeData;
        traveledStruct travelData;
        borrowStruct borrowData;
    }

    struct stakeStruct {
        address owner;
        uint256 yieldTime;
    }

    struct borrowStruct {
        address owner;
        uint256 price;
        uint256 borrowEndTime;
        address borrowers;
    }

    struct traveledStruct {
        uint256 travelTime;
    }

    mapping(address => uint256) private mintBuyLimitMap;
    mapping(uint256 => HERO) private heroVault;

    uint256 private constant MINT_BUY_LIMIT = 3;
    uint256 private constant MAX_LEVEL = 5;
    uint256 private constant TIME_LOCK_DURATION = 7 days;

    function mintBuy() external payable {
        // klay를 주고 구입하는 함수
        uint256 value = msg.value;
        uint256 buyAmount = mintBuyLimitMap[msg.sender];
        uint256 overAmount = value.sub(priceOfKlay);

        require(buyAmount < MINT_BUY_LIMIT, "Error : onlyBuy 3 Hero From Klay");

        require(value != 0, "Error : value is Zero");
        require(value >= priceOfKlay, "Error : Not Enough Klay");

        mintBuyLimitMap[msg.sender] = buyAmount.add(1);
        _mintHero();

        getOwner().transfer(value);
        payable(msg.sender).transfer(overAmount);
    }

    function mintByToken(uint256 _tokenAmount) external {
        // Token을 주고 구입하는 함수
        uint256 value = _tokenAmount;

        require(
            value >= priceOfToken,
            "Error : TokenValue lower than PriceOfToken"
        );

        getToken().transferFrom(msg.sender, address(this), value);

        if (value > priceOfToken) {
            uint256 overValue = value.sub(priceOfToken);
            getToken().transfer(getOwner(), overValue);
        }

        heroTimeLock[msg.sender].push(block.timestamp.add(TIME_LOCK_DURATION));
    }

    function mintTimeLock(uint256 _index) external {
        uint256 time = heroTimeLock[msg.sender][_index];

        require(time > block.timestamp, "Error : TimeLock Duration");

        changeTimeLock(_index);
        _mintHero();
    }

    function travel() external {}

    function getRewardToTravel() external {}

    function registerBorrow() external {}

    function getBorrow() external {}

    function mining(uint256 _tokenId) external {}

    function claimMiningAmount() external {}

    function levelUp() external {}

    function stake(uint256 _tokenId) external {
        address tokenOwner = getHeroNFT().ownerOf(_tokenId);
        HERO storage hero = heroVault[_tokenId];

        require(tokenOwner == msg.sender, "Error : Not Token Owner");

        hero.status.staked = true;
        hero.status.stakeData.owner = msg.sender;

        getHeroNFT().transferFrom(msg.sender, address(this), _tokenId);
    }

    function unStake(uint256 _tokenId) external {
        address tokenOwner = getHeroNFT().ownerOf(_tokenId);
        HERO storage hero = heroVault[_tokenId];

        require(tokenOwner == address(this), "Error : Not Token Owner");

        require(hero.status.staked, "Error : Token is Not Staked!!");
        require(!hero.status.borrowed, "Error : Token is Borrowed!!");
        require(!hero.status.traveled, "Error : Token is Traveled!!");
        require(!hero.status.mining, "Error : Token is Mining!!");

        hero.status.staked = false;
        hero.status.stakeData.owner = address(0x0);

        getHeroNFT().transferFrom(address(this), msg.sender, _tokenId);
    }

    function burn(uint256 _tokenId) external {
        getHeroNFT().burn(_tokenId);
    }

    // ** ineternal
    function _mintHero() internal {
        getHeroNFT().mint(msg.sender);

        uint256 tokenIndex = getHeroNFT().getTokenIndex();
        string memory grade = getDiagram().makeGrade(tokenIndex);

        heroVault[tokenIndex] = HERO(
            1,
            grade,
            block.timestamp,
            chcekStatus(
                false,
                false,
                false,
                false,
                stakeStruct(address(0x0), 0),
                traveledStruct(0),
                borrowStruct(address(0x0), 0, 0, address(0x0))
            )
        );
    }

    //// **** view function

    function getMintBuyAmount() external view returns (uint256) {
        return mintBuyLimitMap[msg.sender];
    }
}
