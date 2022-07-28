// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./utils/HeroController.sol";
import "./utils/TimeLock.sol";
import "./utils/LevelDiagram.sol";
import "./utils/MakeGrade.sol";

import "./interface/IHeroCore.sol";

import "../utils/SafeMath.sol";

contract HeroCore is TimeLock, LevelDiagram, MakeGrade, IHeroCore {
    using SafeMath for *;

    HERO[] heroArray;
    mapping(uint256 => HERO) private heroVault;

    uint256 private constant MINT_BUY_LIMIT = 3;
    uint256 private constant MAX_LEVEL = 5;
    uint256 private constant TIME_LOCK_DURATION = 7 days;
    uint256 private constant TRAVEL_DURATION = 7 days;
    uint256 private constant BORROW_PRICE_PER_BLOCK = 1e15;

    uint256 public constant MINING_REWARD = 125000e18;
    uint256 public constant MINING_DURATION = 365 days / 12;
    uint256 public lastClaimTime;

    mapping(uint256 => RequestStruct[]) private borrowRequestMap;
    mapping(address => uint256) private myRequestMap;

    modifier checkStaked(uint256 _tokenId) {
        address owner = getHeroNFT().ownerOf(_tokenId);
        require(owner == address(this), "Error : Hero is Not Staked!!");
        _;
    }

    fallback() external payable {}

    function mintBuy() external payable {
        // klay를 주고 구입하는 함수
        uint256 value = msg.value;
        uint256 amount = value.div(priceOfKlay);

        require(value != 0, "Error : value is Zero");
        require(value >= priceOfKlay, "Error : Not Enough Klay");

        for (uint256 i = 0; i < amount; i++) {
            _mintHero();
        }

        payable(address(this)).transfer(value);
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
            require(
                travelDuration <= hero.status.borrowData.borrowEndTime,
                "Error : Not Enough Time For Travel && BorrowEndTime"
            );

            require(
                msg.sender == hero.status.borrowData.borrowers,
                "Error : msg.sender is Not Borrowers"
            );
        } else {
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
            msg.sender == hero.status.owner || msg.sender == travelOwner,
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

        uint256 power = _getHeroPower(_tokenId, false);
        uint256 randomItemNumber = calculateItemIndex(power);

        if (randomItemNumber < 1) {
            getItem().mint(receiver, 1, 1);
        }

        getItem().mint(receiver, randomItemNumber, 1);
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

        require(hero.status.owner == msg.sender, "Error : Not Token Owner!");

        (bool inRequest, RequestStruct memory data) = _checkUserInBorrowData(
            _tokenId,
            _apprrovedUser
        );

        require(inRequest, "Error : RequestUser is Not Existed In RequestData");

        uint256 duration = data.duration;

        uint256 approvedOwnerPrice = _returnBorrowRequestToken(
            _tokenId,
            _apprrovedUser
        );

        hero.status.borrowed = true;
        hero.status.borrowData.borrowEndTime = currentTime.add(duration);
        hero.status.borrowData.borrowers = data.requestOwner;

        getToken().transferFrom(
            depositAddress,
            address(this),
            approvedOwnerPrice
        );
        getToken().transfer(msg.sender, approvedOwnerPrice);
    }

    function returnHero(uint256 _tokenId) external checkStaked(_tokenId) {
        HERO storage hero = heroVault[_tokenId];
        uint256 currentTime = _currentTime();

        require(!hero.status.mining, "Error : Token is Mining!");

        // borrow한 Hero를 반환하는 함수
        // Owner가 실행하던가 아니면 빌려간 User가 실행하여 남은 durtion의 금액을 회수한다.
        require(
            hero.status.borrowData.borrowers == msg.sender ||
                hero.status.owner == msg.sender,
            "Error : Not Owner Or Borrowers"
        );

        require(
            hero.status.borrowData.borrowEndTime <= currentTime,
            "Error : Not Borrow End TIme"
        );

        hero.status.borrowed = false;
        hero.status.borrowData.borrowEndTime = 0;
        hero.status.borrowData.borrowers = address(0x0);
    }

    function mining(uint256 _tokenId) external checkStaked(_tokenId) {
        HERO storage hero = heroVault[_tokenId];

        require(!hero.status.borrowed, "Error : Token is Borrowed!");
        require(!hero.status.traveled, "Error : Token is Traveled!");

        _distributeReward();

        hero.status.mining = true;
    }

    function claimMiningAmount(uint256 _tokenId)
        external
        checkStaked(_tokenId)
    {
        HERO storage hero = heroVault[_tokenId];

        _distributeReward();

        uint256 rewardAmount = hero.reward;
        hero.reward = 0;

        require(hero.status.mining, "Error : Token is Not Mining");

        lastClaimTime = _currentTime();

        getToken().transfer(msg.sender, rewardAmount);
    }

    function viewCanClaimAmount(uint256 _tokenId)
        external
        view
        checkStaked(_tokenId)
        returns (uint256)
    {
        HERO memory hero = heroVault[_tokenId];

        if (!getMiningPaused()) {
            uint256 totalPower = _getHeroPower(0, true);
            uint256 cycle = _currentTime().sub(lastClaimTime);
            uint256 totalReward = MINING_REWARD.div(MINING_DURATION).mul(cycle);

            uint256 heroPower = _getHeroPower(_tokenId, false);
            uint256 personalReward = totalReward.div(totalPower).mul(heroPower);

            return hero.reward.add(personalReward);
        }

        return hero.reward;
    }

    function levelUp(uint256 _tokenId) external checkStaked(_tokenId) {
        HERO storage hero = heroVault[_tokenId];

        require(msg.sender == hero.status.owner, "Error : Not TokenOwner");

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

        uint256 tokenId = getHeroNFT().getTokenIndex();

        uint256 tokenIndex = getHeroNFT().getTokenIndex();
        string memory grade = makeGrade(tokenIndex);

        HERO memory newHero = HERO(
            tokenId,
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

        heroVault[tokenIndex] = newHero;
        heroArray.push(newHero);
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

    function _returnBorrowRequestToken(uint256 _tokenId, address _approvedOwner)
        internal
        returns (uint256)
    {
        RequestStruct[] memory requestList = borrowRequestMap[_tokenId];

        uint256 approvedOwnerPrice = 0;

        for (uint256 i = 0; i < requestList.length; i++) {
            uint256 borrowPrice = requestList[i].duration.mul(
                BORROW_PRICE_PER_BLOCK
            );

            address approvedOwner = requestList[i].requestOwner;

            if (approvedOwner != _approvedOwner) {
                getToken().transferFrom(
                    depositAddress,
                    address(this),
                    borrowPrice
                );
                getToken().transfer(approvedOwner, borrowPrice);
            } else {
                approvedOwnerPrice = borrowPrice;
            }
        }

        return approvedOwnerPrice;
    }

    function _distributeReward() internal {
        if (!getMiningPaused()) {
            uint256 totalPower = _getHeroPower(0, true);

            uint256 totalSupply = getHeroNFT().getTokenIndex();

            uint256 cycle = _currentTime().sub(lastClaimTime);
            uint256 totalReward = MINING_REWARD.div(MINING_DURATION).mul(cycle);

            for (uint256 i = 1; i <= totalSupply; i++) {
                HERO storage userHero = heroVault[i];

                uint256 heroPower = _getHeroPower(i, false);

                uint256 personalReward = totalReward.div(totalPower).mul(
                    heroPower
                );
                userHero.reward = userHero.reward.add(personalReward);
            }
        }
    }

    function _getHeroPower(uint256 _tokenId, bool total)
        internal
        view
        returns (uint256)
    {
        if (total) {
            uint256 totalSupply = getHeroNFT().getTokenIndex();

            uint256 totalPower;

            for (uint256 i = 1; i <= totalSupply; i++) {
                HERO memory userHero = heroVault[i];

                if (userHero.status.mining) {
                    totalPower = totalPower.add(
                        calculatePower(userHero.grade, userHero.level)
                    );
                }
            }

            return totalPower;
        } else {
            HERO memory userHero = heroVault[_tokenId];

            return calculatePower(userHero.grade, userHero.level);
        }
    }

    function _currentTime() internal view returns (uint256) {
        return block.timestamp;
    }

    //// **** view function

    function getHeroStatus(uint256 _heroTokenId)
        public
        view
        returns (HERO memory)
    {
        return heroVault[_heroTokenId];
    }

    function getMyTotalHeroStatus(address _user)
        public
        view
        returns (HERO[] memory)
    {
        uint256 length = getHeroNFT().balanceOf(_user);

        HERO[] memory myheroList = new HERO[](length);
        uint256 index;

        for (uint256 i = 0; i < heroArray.length; i++) {
            HERO memory hero = heroArray[i];

            uint256 tokenId = hero.tokenId;

            if (getHeroNFT().ownerOf(tokenId) == _user) {
                myheroList[index] = hero;
                index = index.add(1);
            }
        }

        return myheroList;
    }
}
