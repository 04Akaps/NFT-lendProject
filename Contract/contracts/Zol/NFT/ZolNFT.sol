pragma solidity 0.8.0;

import "../../interfaces/BEP721/BEP721.sol";
import "../../utils/OnlyOwner.sol";
import "../../utils/Counters.sol";

contract ZolNFT is BEP721("Zol", "Zl"), OnlyOwner {

    event Mint(address indexed who, uint256 tokenId);
    event Burn(uint256 tokenId);

    using Counters for *;
    
    address private zolCore;
    Counters.Counter tokenCount;

    modifier onlyCore() {
        require(zolCore != address(0x0), "zolCore Error : Set ZolCore CA");
        require(msg.sender == zolCore, "zolCore Error : Sender is Not ZolCore");
        _;
    }

    function mint(address _to) external onlyCore {
        uint256 currentTokenId = tokenCount.current();

        _mint(_to, currentTokenId);
        setTokenUri(currentTokenId);

        tokenCount.increment();

        emit Mint(_to, currentTokenId);
    }

    function burn(uint256 _tokenId) external {
        _burn(_tokenId);

        emit Burn(_tokenId);
    }

    function viewTotalSupply() external view returns(uint256){
        return tokenCount.current();
    }

    function setting(address _zolCore) external onlyOwner{
        zolCore = _zolCore;
    }
}