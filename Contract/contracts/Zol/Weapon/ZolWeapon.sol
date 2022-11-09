pragma solidity 0.8.0;

import "../../interfaces/BEP1155/BEP1155.sol";
import "../../utils/Controller.sol";

contract ZolWeapon is BEP1155, Controller {
    constructor() {
        _setURI(0, "firstURi");
        _setURI(1, "firstURi");
        _setURI(2, "firstURi");
        _setURI(3, "firstURi");
        _setURI(4, "firstURi");
        _setURI(5, "Boom");
    }

    function mint(
        address _to,
        uint256 _tokenId,
        uint256 _amount
    ) external isController {
        _mint(_to, _tokenId, _amount, "");
    }

    function burn(uint256 _tokenId, uint256 _amount) public {
        _burn(msg.sender, _tokenId, _amount);
    }
}
