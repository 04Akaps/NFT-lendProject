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
    }

    mapping(uint256 => Zol) private zolMap;

    mapping(uint256 => bool) private isUploaded;
    mapping(uint256 => bool) private isBorrowed;
    mapping(uint256 => address) private borrowedAddressMap;
    uint256[] private borrowArray;

    constructor(uint256 _mintPrice, IBEPFull _zolNft) ZolSet(_mintPrice, _zolNft) {}

    modifier checkTokenOwner(uint256 _zolTokenId) {
        IBEPFull nft = viewZolNft();
        require(nft.ownerOf(_zolTokenId)  == msg.sender, "checkTokenOwner Error : Not Token Owner");
        _;
    }

    modifier checkIsStaked(uint256 _zolTokenId){
        IBEPFull nft = viewZolNft();
        require(nft.ownerOf(_zolTokenId)  == address(this), "checkTokenOwner Error : Not Token Owner");
        _;
    }

    modifier checkIsStakedOwner(uint256 _zolTokenId){
        require(zolMap[_zolTokenId].stakedOwner == msg.sender, "checkIsStakedowner Error : Not Token Owner");
        _;
    }

    // Staking

    function staingZol(uint256 _zolTokenId) external checkTokenOwner(_zolTokenId){
        IBEPFull nft = viewZolNft();

        zolMap[_zolTokenId].stakedOwner = msg.sender;

        nft.transferFrom(msg.sender, address(this), _zolTokenId);
    }

    function unStakingZol(uint256 _zolTokenId) external {
        IBEPFull nft = viewZolNft();

        require(nft.ownerOf(_zolTokenId) == address(this) ,"unStaking Error : Not Staked Token");

        zolMap[_zolTokenId].stakedOwner = address(0x0);

        nft.transferFrom(address(this), msg.sender, _zolTokenId);
    }

    // Lend

    function uploadToLend(uint256 _zolTokenId) external checkIsStaked(_zolTokenId) checkIsStakedOwner(_zolTokenId){
        borrowArray.push(_zolTokenId);

        isUploaded[_zolTokenId] = true;
    }

    function cancelUploadFromLend(uint256 _zolTokenId)external checkIsStaked(_zolTokenId) checkIsStakedOwner(_zolTokenId){
        require( isUploaded[_zolTokenId]);
        
        for(uint256 i=0; i<borrowArray.length; i++){

        }
        isUploaded[_zolTokenId] = false;
    }

    function borrowZolFromLend(uint256 _zolTokenId) external {

        require(isUploaded[_zolTokenId]);
        require(borrowedAddressMap[_zolTokenId] == address(0x0));

        borrowedAddressMap[_zolTokenId] = msg.sender;
        isBorrowed[_zolTokenId] = true;
        isUploaded[_zolTokenId] = false;
    }

    function giveBackZolFromBorrow(uint256 _zolTokenId) external {

        // borrow한 유저가 다시 실행시켜서 돌려 주어야 한다.
        require(borrowedAddressMap[_zolTokenId] == msg.sender);

        borrowedAddressMap[_zolTokenId] = address(0x0);
        isBorrowed[_zolTokenId] = false;
    }

    // Mint or Burn

    function mintZol() external payable {
        uint256 value = msg.value;
        uint256 mintPrice = viewMintPrice();

        require(value >= viewMintPrice(), "mintZol Error : Price is out of range");

        uint256 overedPrice = mintPrice - value;
        payable(msg.sender).transfer(overedPrice);

        _makeZol();
    }

    function burnZol(uint256 _zolTokenId) external checkTokenOwner(_zolTokenId){
        IBEPFull nft = viewZolNft();
        nft.burn(_zolTokenId);
    }

    function _makeZol() internal {
        IBEPFull nft = viewZolNft();

        nft.mint(msg.sender);
        
        zolMap[nft.viewTotalSupply()] = Zol (
            address(0x0),
            1,
            calculateZolGrade(1), // vrf Contract import 필요
            block.timestamp
        );
    }
}