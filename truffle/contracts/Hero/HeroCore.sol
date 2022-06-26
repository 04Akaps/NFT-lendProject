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
        bool borrowed;
        bool traveled;
        bool mining;
        stakeStruct stakeData;
        traveledStruct travelData;
        borrowStruct borrowData;
    }

    struct stakeStruct {
        address owner;
        uint256 miningTime;
    }

    struct borrowStruct {
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
    uint256 private constant TRAVEL_DURATION = 7 days;
    uint256 private borrowPricePerBlock = 1e15; // 7일의 경우에는 그럼 600 토큰
    // 604800

    struct RequestStruct {
        address requestOwner;
        uint256 duration;
    }
    mapping(uint256 =>RequestStruct[]) private borrowRequestMap;
    mapping(address => uint256) private myRequestMap;

    modifier checkStaked(uint256 _tokenId) {
        address owner = getHeroNFT().ownerOf(_tokenId);
        require(owner == address(this), "Error : Hero is Not Staked!!");
        _;
    }

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

    function travel(uint256 _tokenId) external checkStaked(_tokenId) {
        HERO storage hero = heroVault[_tokenId];

        uint256 currentTime = _currentTIme();
        uint256 travelDuration =  currentTime.add(TRAVEL_DURATION);

        require(!hero.status.traveled, "Error : hero is Traveled!");
        require(!hero.status.mining,"Error : hero is Traveled!");

        if(hero.status.borrowed){
            // 빌린 상태라면
            require(msg.sender == hero.status.borrowData.borrowers, "Error : msg.sender is Not Borrowers");
            require(travelDuration <= hero.status.borrowData.borrowEndTime,"Error : Not Enough Time For Travel && BorrowEndTime");
        } else{
            // 빌리지 않은 상태라면
            require(msg.sender == hero.status.stakeData.owner, "Error : msg.sender is Not Owner");
        }

        hero.status.traveled = true;
        hero.status.travelData.travelTime = travelDuration;
    }

    function getRewardToTravel(uint256 _tokenId) external checkStaked(_tokenId) {
        HERO storage hero = heroVault[_tokenId];

        uint256 currentTime = _currentTIme();

        require(hero.status.traveled, "Error : hero is Traveled!");
        require(hero.status.travelData.travelTime <= currentTime);

        if(hero.status.borrowed){
            require(msg.sender == hero.status.borrowData.borrowers, "Error : msg.sender is Not Borrowers");
            // 빌린 상태라면 빌린 User에게 보상을 줘야 한다.
        }else{
            require(msg.sender == hero.status.stakeData.owner, "Error : msg.sender is Not Owner");
            // 빌리지 않은 상태라면 Stake한 User에게 보상을 주어야 한다.
        }

        hero.status.traveled = false;
        hero.status.travelData.travelTime = 0;

        // 보상을 주어야 한다.
        // maybe 등급 + level을 통해서 더 많은 보상을 가져 갈 수 있게 설정
    }

    function requestBorrow(uint256 _tokenId, uint256 _duartion) external checkStaked(_tokenId) {
        HERO storage hero = heroVault[_tokenId];

        require(!hero.status.borrowed, "Error : Hero is Browwed anothor User");

        require(myRequestMap[msg.sender] == 0, "Error : already Request Another Hero");

        borrowRequestMap[_tokenId].push(RequestStruct(msg.sender, _duartion));
        myRequestMap[msg.sender] = _tokenId;
        // 단순히 request만 신ㄴ청하면 된다.
        // Hero가 없어도 사용이 가능
    }

    function cancelRequest(uint256 _tokenId) external checkStaked(_tokenId) {
        require(myRequestMap[msg.sender] != 0, "Error : Not Existed Request!");

        myRequestMap[msg.sender] = 0;

        RequestStruct[] storage requestList = borrowRequestMap[_tokenId];

        for(uint i=0; i< requestList.length; i++){
            if(requestList[i].requestOwner == msg.sender){
                delete requestList[i];

                if(requestList.length == 1 || requestList.length.sub(1) == i){
                    requestList.pop();
                }else{
                    RequestStruct memory lastValue = requestList[requestList.length.sub(1)];
                    requestList[i] = lastValue;
                    requestList.pop();
                }

                break;
            }
        }


    }

    function approveBorrow(uint256 _tokenId, address _apprrovedUser) external checkStaked(_tokenId) {
        HERO storage hero = heroVault[_tokenId];

        uint256 currentTime = _currentTIme();

        require(hero.status.stakeData.owner == msg.sender, "Error : Not Token Owner!");
        
        (bool inRequest, RequestStruct memory data) = checkUserInBorrowData(_tokenId, _apprrovedUser);
        require(inRequest, "Error : RequestUser is Not Existed In RequestData");

        uint256 duration = data.duration;
        address requestOwner = data.requestOwner;

        uint256 borrowPrice = duration.mul(borrowPricePerBlock);

        //  비용을 어떻게 전송할지 구성 해야함

        hero.status.borrowed = true;
        hero.status.borrowData.borrowEndTime = currentTime.add(duration);
        hero.status.borrowData.borrowers = data.requestOwner;
    }

    function mining(uint256 _tokenId) external {}

    function claimMiningAmount() external {}

    function levelUp() external {}

    function stake(uint256 _tokenId) external {
        address tokenOwner = getHeroNFT().ownerOf(_tokenId);
        HERO storage hero = heroVault[_tokenId];

        require(tokenOwner == msg.sender, "Error : Not Token Owner");

        hero.status.stakeData.owner = msg.sender;

        getHeroNFT().transferFrom(msg.sender, address(this), _tokenId);
    }

    function unStake(uint256 _tokenId) external checkStaked(_tokenId) {
        HERO storage hero = heroVault[_tokenId];

        require(!hero.status.borrowed, "Error : Token is Borrowed!!");
        require(!hero.status.traveled, "Error : Token is Traveled!!");
        require(!hero.status.mining, "Error : Token is Mining!!");

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
                stakeStruct(address(0x0), 0),
                traveledStruct(0),
                borrowStruct( 0, address(0x0))
            )
        );
    }

    function checkUserInBorrowData(uint256 _tokenId, address _apprrovedUser) internal returns(bool, RequestStruct memory){
        RequestStruct[] memory requestList= borrowRequestMap[_tokenId];

        for(uint i=0; i<requestList.length; i++){
            if(requestList[i].requestOwner == _apprrovedUser){
                return (true, requestList[i]);
            }
        }

        return (false, requestList[0]);
    }

    function _currentTIme() internal view returns(uint256){
        return block.timestamp;
    }

    //// **** view function

    function getMintBuyAmount() external view returns (uint256) {
        return mintBuyLimitMap[msg.sender];
    }
}
