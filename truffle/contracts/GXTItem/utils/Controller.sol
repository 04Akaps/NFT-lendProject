pragma solidity ^0.8.7;

import "../../utils/Ownable.sol";

contract Controller is Ownable {
    mapping(address => bool) private controllers;

    modifier onlyController() {
        require(controllers[msg.sender], "Error : Not Controller");
        _;
    }

    function addController(address _controller) external onlyOwner {
        controllers[_controller] = true;
    }

    function deleteController(address _controller) external onlyOwner {
        controllers[_controller] = false;
    }
}
