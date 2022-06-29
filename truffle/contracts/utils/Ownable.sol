// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Ownable {
    address payable private owner;

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    function getOwner() public view returns(address payable){
        return owner;
    }
}