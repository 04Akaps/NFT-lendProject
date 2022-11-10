pragma solidity 0.8.0;

import "./utils/Mining.sol";

contract ZolCore is Mining {
    // 넣을 컨텐츠
    // Mining
    struct Zol {
        address stakedOwner;
        uint256 level;
        string grade;
        uint256 timeStamp;
        address borrowedEOA;
    }

    struct Borrow {
        uint256 tokenId;
        uint256 perBlockPrice;
        uint256 borrowEndTime;
        uint256 calculatedBorrowPrice;
    }

    struct Exploration {
        address sender;
        uint256 tokenId;
        uint256 startTime;
        uint256 endTime;
    }

    mapping(uint256 => Zol) private zolMap;

    mapping(uint256 => bool) private isUploaded;
    mapping(uint256 => bool) private isExplorated;

    mapping(address => uint256) private miningRewardMap;
    uint256[] private stakedTokenArray;

    Borrow[] private borrowArray;
    Exploration[] private explorationArray;

    uint256 constant MAX_LEVEL = 5;

    constructor(
        uint256 _mintPrice,
        IBEP1155Full _zolWeapon,
        IBEP721Full _zolNft,
        IBEP20 _zolToken
    ) ZolSet(_mintPrice, _zolWeapon, _zolNft, _zolToken) {}

    modifier checkTokenOwner(uint256 _zolTokenId) {
        IBEP721Full nft = viewZolNft();
        require(
            nft.ownerOf(_zolTokenId) == msg.sender,
            "checkTokenOwner Error : Not Token Owner"
        );
        _;
    }

    modifier checkIsStaked(uint256 _zolTokenId) {
        IBEP721Full nft = viewZolNft();
        require(
            nft.ownerOf(_zolTokenId) == address(this),
            "checkTokenOwner Error : Not Token Owner"
        );
        _;
    }

    modifier checkIsStakedOwner(uint256 _zolTokenId) {
        require(
            zolMap[_zolTokenId].stakedOwner == msg.sender,
            "checkIsStakedowner Error : Not Token Owner"
        );
        _;
    }

    modifier chcekIsBorrowedOtherEOA(uint256 _zolTokenId) {
        require(
            zolMap[_zolTokenId].borrowedEOA == address(0x0),
            "Error : already Borrowed"
        );
        _;
    }

    /** Staking */
    function staingZol(uint256 _zolTokenId)
        external
        checkTokenOwner(_zolTokenId)
    {
        IBEP721Full nft = viewZolNft();

        zolMap[_zolTokenId].stakedOwner = msg.sender;
        stakedTokenArray.push(_zolTokenId);

        nft.transferFrom(msg.sender, address(this), _zolTokenId);
    }

    function unStakingZol(uint256 _zolTokenId) external {
        IBEP721Full nft = viewZolNft();

        require(
            nft.ownerOf(_zolTokenId) == address(this),
            "unStaking Error : Not Staked Token"
        );

        // 다른 사용자에게 빌려준 상태라면 unStaking 불가능
        require(zolMap[_zolTokenId].borrowedEOA == address(0x0));
        // Token이 여행 중일떄에는 불가능
        require(!isExplorated[_zolTokenId]);

        zolMap[_zolTokenId].stakedOwner = address(0x0);

        _distributeMiningReward();

        for (uint256 i = 0; i < stakedTokenArray.length; i++) {
            if (stakedTokenArray[i] == _zolTokenId) {
                if (i == stakedTokenArray.length - 1) {
                    stakedTokenArray.pop();
                } else {
                    uint256 lastValue = stakedTokenArray[
                        stakedTokenArray.length - 1
                    ];
                    stakedTokenArray[i] = lastValue;
                    stakedTokenArray.pop();
                }

                break;
            }
        }

        nft.transferFrom(address(this), msg.sender, _zolTokenId);
    }

    /** Lend */
    function uploadToLend(uint256 _zolTokenId, uint256 _perBlockBorrowPrice)
        external
        checkIsStaked(_zolTokenId)
        checkIsStakedOwner(_zolTokenId)
        chcekIsBorrowedOtherEOA(_zolTokenId)
    {
        // 검증 사항
        // 1. Staked 되어 있는지 , Staking을 시도한 User인지
        // 2. 이미 upload되어 있는지
        // 3. 다른 사용자에게 빌려 주었는지
        // 4. Exploration진행 중인 상태인지
        require(!isUploaded[_zolTokenId]);
        require(!isExplorated[_zolTokenId]);

        isUploaded[_zolTokenId] = true;
        borrowArray.push(Borrow(_zolTokenId, _perBlockBorrowPrice, 0, 0));
    }

    function cancelUploadFromLend(uint256 _zolTokenId)
        external
        checkIsStaked(_zolTokenId)
        checkIsStakedOwner(_zolTokenId)
        chcekIsBorrowedOtherEOA(_zolTokenId)
    {
        require(isUploaded[_zolTokenId]);

        uint256 length = borrowArray.length;

        for (uint256 i = 0; i < length; i++) {
            // borrowArray에서 제거 시켜 주어야 한다.

            if (borrowArray[i].tokenId == _zolTokenId) {
                if (i == length - 1) {
                    borrowArray.pop();
                } else {
                    Borrow memory lastValue = borrowArray[length - 1];
                    borrowArray[i] = lastValue;
                    borrowArray.pop();
                }

                break;
            }
        }

        isUploaded[_zolTokenId] = false;
    }

    function borrowZolFromLend(
        uint256 _zolTokenId,
        uint256 _index,
        uint256 _payAmount
    ) external chcekIsBorrowedOtherEOA(_zolTokenId) {
        // 검증 사항
        // 1. upload 되어 있는지
        // 2. 이미 다른 사용자가 빌려갔는지
        require(isUploaded[_zolTokenId]);
        // require()

        Borrow storage borrowStruct = borrowArray[_index];

        uint256 perBlockPrice = borrowStruct.perBlockPrice;
        // 만약 perBlockPrice가 3이고, _payment가 60  ~ 62라면 -> 20초를 빌린다는 예쩡
        // Token의 decimals를 고려해서 60을 주기에는 너무 야박하니 decimals를 고려하지 않는 값으로 활용할 예정
        uint256 calculatedEndTime = _payAmount / perBlockPrice;

        borrowStruct.perBlockPrice = block.timestamp + calculatedEndTime;
        borrowStruct.calculatedBorrowPrice = _payAmount;

        zolMap[_zolTokenId].borrowedEOA = msg.sender;
        isUploaded[_zolTokenId] = false;

        viewZolToken().transferFrom(msg.sender, address(this), _payAmount);
    }

    function giveBackZolFromBorrow(uint256 _zolTokenId) external {
        // 해당 함수는 endTime이 남아 있을떄만 유효하다.
        // 하지만 EndTime이후에는 실행이 되지 않기 떄문에 이러한 부분은 Exploration에서 내부적으로 처리할 예정

        // borrow한 유저가 다시 실행시켜서 돌려 주어야 한다.
        require(zolMap[_zolTokenId].borrowedEOA == msg.sender);

        // 이떄 돌려줄 금액에 대해서 측정을 해야 한다.
        // 빌린 기간에서 남은 기간에 따라서 측정이 이루어 져야 한다.
        uint256 currentBlockTime = block.timestamp;
        uint256 length = borrowArray.length;

        for (uint256 i = 0; i < length; i++) {
            Borrow memory borrowStruct = borrowArray[i];
            if (borrowStruct.tokenId == _zolTokenId) {
                // Token을 발견
                uint256 endTime = borrowStruct.borrowEndTime;

                // endTime과 현재 시간을 비교
                if (currentBlockTime <= endTime) {
                    uint256 remainDuration = endTime - currentBlockTime;
                    // NFT를 빌린 사용자에게 남은 시간을 계산해서 다시 전송
                    uint256 sendToEOA = remainDuration *
                        borrowStruct.perBlockPrice;
                    // 이후 사용된 금액은 NFT owner에게 전송
                    uint256 sendToOwner = borrowStruct.calculatedBorrowPrice -
                        sendToEOA;

                    viewZolToken().transfer(msg.sender, sendToEOA);

                    viewZolToken().transfer(
                        zolMap[_zolTokenId].stakedOwner,
                        sendToOwner
                    );
                }

                // 이후 Token이 이동 되었으니 배열을 정리해 주어야 한다.

                if (i == length - 1) {
                    borrowArray.pop();
                } else {
                    Borrow memory lastValue = borrowArray[length - 1];
                    borrowArray[i] = lastValue;
                    borrowArray.pop();
                }
            }
        }

        zolMap[_zolTokenId].borrowedEOA = address(0x0);
    }

    function _giveBackZolFromBorrow() internal {
        // Exploration에서 Borrow한 시간을 넘었을떄 동작할 함수
    }

    /** Exploration */
    // 1. 여행을 보내서 ERC1155를 수령하게 할 함수 기능 입니다.

    function doExploration(uint256 _zolTokenId, uint256 _duration)
        external
        checkIsStaked(_zolTokenId)
    {
        // 1. Borrow한 Token인지, 아니면 기존의 TokenOwner인지를 확인해야 한다.
        require(!isExplorated[_zolTokenId], "Error : zol already explorated");
        require(!isUploaded[_zolTokenId], "Error : zol already uploaded");

        Zol memory zol = zolMap[_zolTokenId];

        if (zol.borrowedEOA == address(0x0)) {
            require(zol.stakedOwner == msg.sender);
        } else {
            require(zol.borrowedEOA == msg.sender);
        }

        explorationArray.push(
            Exploration(
                msg.sender,
                _zolTokenId,
                block.timestamp,
                block.timestamp + _duration
            )
        );

        isExplorated[_zolTokenId] = true;
    }

    function endExploration(uint256 _zolTokenId) external {
        // 해당 함수에서는 빌려간 Token일 경우 실행되는 시점과, borrowEndTime을 비교해서 보상을 다른 사용자에게 전송해줄 필요가 있따.
        require(isExplorated[_zolTokenId], "Error : zol's not Explorated");

        Zol memory zol = zolMap[_zolTokenId];
        uint256 length = explorationArray.length;

        for (uint256 i = 0; i < length; i++) {
            Exploration memory expolration = explorationArray[i];

            if (expolration.tokenId == _zolTokenId) {
                // 이제 보상을 주어야 한다.
                // 1. endTime인지 확인
                uint256 explorationEndTime = expolration.endTime;

                require(
                    explorationEndTime >= block.timestamp,
                    "Error : Not Ended"
                );

                require(expolration.sender == msg.sender, "Error : Not Sender");
                uint256 duration = expolration.startTime - explorationEndTime;
                uint256 level = zol.level;
                string memory grade = zol.grade;

                // 2. 보상을 주는 로직 추가
                uint256 weaponTokenId = calculateExplorationRewardNumber(
                    duration,
                    level,
                    grade
                );

                viewZolWeapon().mint(msg.sender, weaponTokenId, 1);

                if (i == length - 1) {
                    explorationArray.pop();
                } else {
                    Exploration memory lastValue = explorationArray[length - 1];
                    explorationArray[i] = lastValue;
                    explorationArray.pop();
                }

                break;
            }
        }

        isExplorated[_zolTokenId] = false;
    }

    /** Level Up */
    function levelUpZol(uint256 _zolTokenId) external {
        require(
            viewZolNft().ownerOf(_zolTokenId) == msg.sender,
            "Error : Not Token Owner"
        );
        require(zolMap[_zolTokenId].level < MAX_LEVEL, "Error : MAX LEVEL");

        zolMap[_zolTokenId].level++;
    }

    /** Grade Up */
    function gradeUpZol(uint256 _zolTokenId) external {
        require(viewZolNft().ownerOf(_zolTokenId) == msg.sender);

        string memory nextGrade = calculateNextGrade(zolMap[_zolTokenId].grade);

        zolMap[_zolTokenId].grade = nextGrade;
    }

    /** Mining */
    // 1. Contract에 보관된 Token을 Mining할 함수 입니다.
    // 2. 현재 Contract에는 Lend쪽에서 Token을 관리하고 있기 떄문에 외부 Contract를 두어서 그쪽에서 Token을 수령할 예정입니다.
    function withDrawMiningReward(uint256 _amount) external {
        // EOA가 보상을 수령해 가는 함수

        require(miningRewardMap[msg.sender] >= _amount);

        viewZolToken().transfer(msg.sender, _amount);
    }

    function _distributeMiningReward() internal {
        // MiningReward를 누적 시킬 함수
        uint256 length = stakedTokenArray.length;
        uint256 totalPower = getZolPower(true, 0);

        for (uint256 i = 0; i < length; i++) {
            uint256 tokenId = stakedTokenArray[i];
            uint256 personalZolPower = getZolPower(false, tokenId);
        }
    }

    function calculateZolReward(uint256 _zolTokenId)
        public
        view
        returns (uint256)
    {}

    function getZolPower(bool _total, uint256 _zolTokenId)
        public
        view
        returns (uint256)
    {
        if (_total) {
            // 모든 ZolNFT의 MP를 확인할 떄
        } else {
            // 특정 zolNFT의 MP를 확인할 떄
        }

        return 3;
    }

    // Mint or Burn
    function mintZol() external payable {
        uint256 value = msg.value;
        uint256 mintPrice = viewMintPrice();

        require(
            value >= viewMintPrice(),
            "mintZol Error : Price is out of range"
        );

        uint256 overedPrice = mintPrice - value;
        payable(msg.sender).transfer(overedPrice);

        _makeZol();
    }

    function burnZol(uint256 _zolTokenId)
        external
        checkTokenOwner(_zolTokenId)
    {
        IBEP721Full nft = viewZolNft();
        nft.burn(_zolTokenId);
    }

    function _makeZol() internal {
        IBEP721Full nft = viewZolNft();

        nft.mint(msg.sender);

        zolMap[nft.viewTotalSupply()] = Zol(
            address(0x0),
            1,
            calculateZolGrade(1), // vrf Contract import 필요
            block.timestamp,
            address(0x0)
        );
    }
}
