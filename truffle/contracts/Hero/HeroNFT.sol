// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "../interface/IKIP17/KIP17Token.sol";
import "./interface/IHeroNFT.sol";

import "../utils/Ownable.sol";
import "../utils/Counter.sol";
import "../utils/Strings.sol";

contract HeroNFT is KIP17Token, Ownable, IHeroNFT {
    using Counters for Counters.Counter;

    Counters.Counter private tokenIndex;

    address private heroCore;

    string private PREFIX_DATA = "test";
    string private constant SUFIX_DATA = ".json";

    modifier onlyHeroCore() {
        require(
            heroCore != address(0x0),
            "HeroNFT Error : HeroCore does Not Setting"
        );
        require(
            msg.sender == heroCore,
            "HeroNFT Error : msg.sender != HeroCore Address"
        );
        _;
    }

    constructor() KIP17Token("GXTHero", "GXTH") {}

    function mint(address _to) external override onlyHeroCore {
        tokenIndex.increment();

        uint256 currentTokenId = tokenIndex.current();
        string memory uri = Strings.tokenURI(
            PREFIX_DATA,
            SUFIX_DATA,
            currentTokenId
        );

        _mint(_to, currentTokenId);
        _setTokenUri(currentTokenId, uri);
    }

    function burn(uint256 _tokenId) external override onlyHeroCore {
        _burn(_tokenId);
    }

    function setContract(address _heroCore) external override onlyOwner {
        require(
            _heroCore != address(0),
            "HeroNFT Error : HeroCore is Zero Address"
        );
        heroCore = _heroCore;
    }

    function getTokenIndex() external view override returns (uint256) {
        return tokenIndex.current();
    }

    function getHeroCore() external view override returns (address) {
        return heroCore;
    }
}
