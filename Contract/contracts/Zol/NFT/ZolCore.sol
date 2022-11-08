pragma solidity 0.8.0;

import "./utils/ZolSet.sol";

contract ZolCore is ZolSet {
    // 넣을 컨텐츠
    // Mining, Lend, Exploration
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

    mapping(uint256 => Zol) private zolMap;

    mapping(uint256 => bool) private isUploaded;

    Borrow[] private borrowArray;

    constructor(
        uint256 _mintPrice,
        IBEP721Full _zolNft,
        IBEP20 _zolToken
    ) ZolSet(_mintPrice, _zolNft, _zolToken) {}

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

    // Staking

    function staingZol(uint256 _zolTokenId)
        external
        checkTokenOwner(_zolTokenId)
    {
        IBEP721Full nft = viewZolNft();

        zolMap[_zolTokenId].stakedOwner = msg.sender;

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

        zolMap[_zolTokenId].stakedOwner = address(0x0);

        nft.transferFrom(address(this), msg.sender, _zolTokenId);
    }

    // Lend
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
        require(!isUploaded[_zolTokenId]);

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
