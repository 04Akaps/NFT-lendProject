pragma solidity 0.8.0;

import "./OnlyOwner.sol";

contract Controller is OnlyOwner {
    mapping(address => bool) controllerMap;

    modifier isController() {
        require(controllerMap[msg.sender], "Error : Not Controller");
        _;
    }

    function addController(address _to) external onlyOwner {
        controllerMap[_to] = true;
    }

    function removeController(address _to) external onlyOwner {
        controllerMap[_to] = false;
    }
}
