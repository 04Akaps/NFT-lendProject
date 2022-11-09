pragma solidity 0.8.0;

import "../../interfaces/BEP20/BEP20.sol";
import "../../utils/OnlyOwner.sol";

contract ZolToken is BEP20("Zol", "ZL"), OnlyOwner {
    uint256 constant maxSupply = 10000000e18;

    function mint(address _to, uint256 _amount) external onlyOwner {
        require(totalSupply() <= maxSupply, "Error : maxSupply Error");
        _mint(_to, _amount);
    }

    function burn(address _to, uint256 _amount) external onlyOwner {
        _burn(_to, _amount);
    }
}
