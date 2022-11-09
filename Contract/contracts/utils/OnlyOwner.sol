pragma solidity 0.8.0;

contract OnlyOwner {
    address payable owner;

    constructor() {
        owner = payable(msg.sender);
    }

    modifier onlyOwner {
        require(msg.sender ==owner);
        _;
    }

    function reSetOwner(address payable _owner) external onlyOwner{
        owner = _owner;
    }

    function viewOwner() public view returns(address payable){
        return owner;
    }
}