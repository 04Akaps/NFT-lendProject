// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./utils/HeroController.sol";
import "./utils/TimeLock.sol";
import "./utils/LevelDiagram.sol";

import "../utils/SafeMath.sol";

contract HeroCore is HeroController, TimeLock, LevelDiagram {
    using SafeMath for *;

    struct HERO {
        uint256 level;
        string grade;
        uint256 birthTime;
        uint256 reward;
        chcekStatus status;
    }

    struct chcekStatus {
        bool borrowed;
        bool traveled;
        bool mining;
        address owner;
        traveledStruct travelData;
        borrowStruct borrowData;
    }

    struct borrowStruct {
        uint256 borrowEndTime;
        address borrowers;
    }

    struct traveledStruct {
        address travelOwner;
        uint256 travelTime;
    }

    mapping(address => uint256) private mintBuyLimitMap;
    mapping(uint256 => HERO) private heroVault;

    uint256 private constant MINT_BUY_LIMIT = 3;
    uint256 private constant MAX_LEVEL = 5;
    uint256 private constant TIME_LOCK_DURATION = 7 days;
    uint256 private constant TRAVEL_DURATION = 7 days;
    uint256 private constant BORROW_PRICE_PER_BLOCK = 1e15;

    uint256 public constant MINING_REWARD = 125000e18;
    uint256 public constant MINING_DURATION = 365 days / 12;
    uint256 public lastClaimTime;

    struct RequestStruct {
        address requestOwner;
        uint256 duration;
    }

    mapping(uint256 => RequestStruct[]) private borrowRequestMap;
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

        uint256 currentTime = _currentTime();
        uint256 travelDuration = currentTime.add(TRAVEL_DURATION);

        require(!hero.status.traveled, "Error : hero is Traveled!");
        require(!hero.status.mining, "Error : hero is Traveled!");

        if (hero.status.borrowed) {
            // 빌린 상태라면
            require(
                msg.sender == hero.status.borrowData.borrowers,
                "Error : msg.sender is Not Borrowers"
            );
            require(
                travelDuration <= hero.status.borrowData.borrowEndTime,
                "Error : Not Enough Time For Travel && BorrowEndTime"
            );
        } else {
            // 빌리지 않은 상태라면
            require(
                msg.sender == hero.status.owner,
                "Error : msg.sender is Not Owner"
            );
        }

        hero.status.traveled = true;
        hero.status.travelData.travelOwner = msg.sender;
        hero.status.travelData.travelTime = travelDuration;
    }

    function getRewardToTravel(uint256 _tokenId)
        external
        checkStaked(_tokenId)
    {
        HERO storage hero = heroVault[_tokenId];

        uint256 currentTime = _currentTime();

        require(hero.status.traveled, "Error : hero is Traveled!");
        require(
            hero.status.travelData.travelTime <= currentTime,
            "Error : Not Travel End Time"
        );

        address travelOwner = hero.status.travelData.travelOwner;

        require(
            msg.sender == hero.status.owner ||
                msg.sender == travelOwner,
            "Error : Not TravelOwner or stakeOwner"
        );

        address receiver;

        if (hero.status.borrowData.borrowEndTime < currentTime) {
            hero.status.borrowed = false;
            hero.status.borrowData.borrowEndTime = 0;
            hero.status.borrowData.borrowers = address(0x0);

            receiver = hero.status.owner;
        } else {
            receiver = travelOwner;
        }

        hero.status.traveled = false;
        hero.status.travelData.travelOwner = address(0x0);
        hero.status.travelData.travelTime = 0;

        // 보상을 주어야 한다. = receiver
        // 만약 borrow가 끝나는 시간 이후에 실행이 되면 시간을 지키지 않은 것이기 떄문에 보상은 TokenOwner에게 주어진다.

        // maybe 등급 + level을 통해서 더 많은 보상을 가져 갈 수 있게 설정
    }

    function requestBorrow(uint256 _tokenId, uint256 _duartion)
        external
        checkStaked(_tokenId)
    {
        HERO storage hero = heroVault[_tokenId];

        require(!hero.status.borrowed, "Error : Hero is Browwed anothor User");

        require(
            myRequestMap[msg.sender] == 0,
            "Error : already Request Another Hero"
        );

        borrowRequestMap[_tokenId].push(RequestStruct(msg.sender, _duartion));
        myRequestMap[msg.sender] = _tokenId;

        uint256 borrowPrice = _duartion.mul(BORROW_PRICE_PER_BLOCK);

        getToken().transferFrom(msg.sender, address(this), borrowPrice);
        getToken().transfer(depositAddress, borrowPrice);
    }

    function cancelRequest(uint256 _tokenId) external checkStaked(_tokenId) {
        require(myRequestMap[msg.sender] != 0, "Error : Not Existed Request!");

        myRequestMap[msg.sender] = 0;

        RequestStruct[] storage requestList = borrowRequestMap[_tokenId];

        for (uint256 i = 0; i < requestList.length; i++) {
            if (requestList[i].requestOwner == msg.sender) {
                delete requestList[i];

                if (requestList.length == 1 || requestList.length.sub(1) == i) {
                    requestList.pop();
                } else {
                    RequestStruct memory lastValue = requestList[
                        requestList.length.sub(1)
                    ];
                    requestList[i] = lastValue;
                    requestList.pop();
                }

                uint256 borrowPrice = requestList[i].duration.mul(
                    BORROW_PRICE_PER_BLOCK
                );

                getToken().transferFrom(
                    depositAddress,
                    address(this),
                    borrowPrice
                );
                getToken().transfer(msg.sender, borrowPrice);

                // 이렇게 계속 토큰을 이동시키면 event를 가져올떄 특정 값 이하가 되면 approve를 다시 설정해 주면 된다.

                break;
            }
        }
    }

    function approveBorrow(uint256 _tokenId, address _apprrovedUser)
        external
        checkStaked(_tokenId)
    {
        HERO storage hero = heroVault[_tokenId];
        uint256 currentTime = _currentTime();

        require(!hero.status.mining, "Error : Token is Mining!");

        require(
            hero.status.owner == msg.sender,
            "Error : Not Token Owner!"
        );

        (bool inRequest, RequestStruct memory data) = _checkUserInBorrowData(
            _tokenId,
            _apprrovedUser
        );

        require(inRequest, "Error : RequestUser is Not Existed In RequestData");

        uint256 duration = data.duration;

        _returnBorrowRequestToken(_tokenId);

        hero.status.borrowed = true;
        hero.status.borrowData.borrowEndTime = currentTime.add(duration);
        hero.status.borrowData.borrowers = data.requestOwner;
    }

    function mining(uint256 _tokenId)
        external
        checkStaked(_tokenId)
    {
        HERO storage hero = heroVault[_tokenId];
 
        require(!hero.status.borrowed, "Error : Token is Borrowed!");
        require(!hero.status.traveled, "Error : Token is Traveled!");

        _distributeReward();

        hero.status.mining = true;
    }

    function claimMiningAmount(uint256 _tokenId) external checkStaked(_tokenId) {
        HERO storage hero = heroVault[_tokenId];

        _distributeReward();

        uint256 rewardAmount = hero.reward;
        hero.reward  = 0;

        require(hero.status.mining, "Error : Token is Not Mining");

        lastClaimTime = _currentTime();

        getToken().transfer(msg.sender, rewardAmount);   
    }

    function viewCanClaimAmount(uint256 _tokenId) external view checkStaked(_tokenId) returns(uint256) {
        HERO memory hero = heroVault[_tokenId];

         if(!getMiningPaused()){
            uint256 totalPower = _getHeroPower(0,true);
            uint256 cycle  = _currentTime().sub(lastClaimTime); 
            uint256 totalReward = MINING_REWARD.div(MINING_DURATION).mul(cycle);

            uint256 heroPower = _getHeroPower(_tokenId, false);
            uint256 personalReward = totalReward.div(totalPower).mul(heroPower);

            return hero.reward.add(personalReward);
        }

        return hero.reward;

    }

    function levelUp(uint256 _tokenId) external checkStaked(_tokenId) {
        HERO storage hero = heroVault[_tokenId];

        require(
            msg.sender == hero.status.owner,
            "Error : Not TokenOwner"
        );
        uint256 level = hero.level;

        require(level < MAX_LEVEL, "Error : Token is MaxLevel Status");

        uint256 calculatePrice = calculateTokenAmount(hero.grade, level);

        require(
            getToken().balanceOf(msg.sender) >= calculatePrice,
            "Error : Not Exough Token"
        );

        hero.level = level.add(1);

        getToken().transferFrom(msg.sender, address(this), calculatePrice);
        getToken().transfer(getOwner(), calculatePrice);
    }

    function stake(uint256 _tokenId) external {
        address tokenOwner = getHeroNFT().ownerOf(_tokenId);
        HERO storage hero = heroVault[_tokenId];

        require(tokenOwner == msg.sender, "Error : Not Token Owner");

        hero.status.owner = msg.sender;
        getHeroNFT().transferFrom(msg.sender, address(this), _tokenId);
    }

    function unStake(uint256 _tokenId) external checkStaked(_tokenId) {
        HERO storage hero = heroVault[_tokenId];

        require(!hero.status.borrowed, "Error : Token is Borrowed!!");
        require(!hero.status.traveled, "Error : Token is Traveled!!");
        require(!hero.status.mining, "Error : Token is Mining!!");

        _distributeReward();

        uint256 rewardAmount = hero.reward;

        hero.status.owner = address(0x0);
        hero.reward = 0;

        lastClaimTime = _currentTime();

        getToken().transfer(msg.sender, rewardAmount);
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
            0,
            chcekStatus(
                false,
                false,
                false,
                address(0x0),
                traveledStruct(address(0x0), 0),
                borrowStruct(0, address(0x0))
            )
        );
    }

    function _checkUserInBorrowData(uint256 _tokenId, address _apprrovedUser)
        internal
        view
        returns (bool, RequestStruct memory)
    {
        RequestStruct[] memory requestList = borrowRequestMap[_tokenId];

        for (uint256 i = 0; i < requestList.length; i++) {
            if (requestList[i].requestOwner == _apprrovedUser) {
                return (true, requestList[i]);
            }
        }

        return (false, requestList[0]);
    }

    function _returnBorrowRequestToken(uint256 _tokenId) internal {
        RequestStruct[] memory requestList = borrowRequestMap[_tokenId];

        for (uint256 i = 0; i < requestList.length; i++) {
            uint256 borrowPrice = requestList[i].duration.mul(
                BORROW_PRICE_PER_BLOCK
            );

            address approvedOwner = requestList[i].requestOwner;

            getToken().transferFrom(depositAddress, address(this), borrowPrice);
            getToken().transfer(approvedOwner, borrowPrice);
        }
    }

    function _distributeReward() internal{
        if(!getMiningPaused()){
            uint256 totalPower = _getHeroPower(0,true);

            uint256 totalSupply = getHeroNFT().getTokenIndex();

            uint256 cycle  = _currentTime().sub(lastClaimTime); 
            uint256 totalReward = MINING_REWARD.div(MINING_DURATION).mul(cycle);

            for(uint i=1; i<= totalSupply; i++){
                HERO storage userHero = heroVault[i];

                uint256 heroPower = _getHeroPower(i, false);

                uint256 personalReward = totalReward.div(totalPower).mul(heroPower);
                userHero.reward = userHero.reward.add(personalReward);
            }

        }
      
    }

    function _getHeroPower(uint256 _tokenId, bool total) internal view returns(uint256) {
        if(total){
            uint256 totalSupply = getHeroNFT().getTokenIndex();

            uint256 totalPower;

            for(uint i=1; i<= totalSupply; i++){
                HERO memory userHero = heroVault[i];

                if(userHero.status.mining){
                    totalPower = totalPower.add(calculatePower(userHero.grade, userHero.level));
                }

            }

            return totalPower;
        }else{
            HERO memory userHero = heroVault[_tokenId];

            return calculatePower(userHero.grade, userHero.level);
        }
    }

    function _currentTime() internal view returns (uint256) {
        return block.timestamp;
    }

    //// **** view function

    function getMintBuyAmount() external view returns (uint256) {
        return mintBuyLimitMap[msg.sender];
    }
}
