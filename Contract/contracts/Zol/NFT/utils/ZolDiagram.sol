pragma solidity 0.8.0;


contract ZolDiagram  {

    bytes32 MYTHICAL = keccak256("Mythical");
    bytes32 LEGENDARY = keccak256("Legendary");
    bytes32 EPIC = keccak256("Epic");
    bytes32 RARE = keccak256("Rare");
    bytes32 NORMAL = keccak256("Normal");

    uint256[] private gradeProbability = new uint256[](5);

    constructor() {
        gradeProbability[0] = 1;
        gradeProbability[1] = 5;
        gradeProbability[2] = 14;
        gradeProbability[3] = 30;
        gradeProbability[4] = 50;
    }

    function calculateZolGrade(uint256 _vrfRandomNumber)  internal view returns(string memory) {
        uint256 randomNumber = _getRandomnNumber(_vrfRandomNumber);

        for (uint256 i=0; i<gradeProbability.length; i++){
            uint256 probability = gradeProbability[i];

            if(randomNumber > probability) {
                randomNumber -= probability;
            }else{
                return _changeIntToGrade(i);
            }
        }

        return "grade_error";
    }

    function calculateNextGrade(string calldata _currentGrade)  internal view returns(string memory){
        bytes32 currentGrade = keccak256(bytes(_currentGrade));

        require(currentGrade != NORMAL, "Error : MaxLevel Error");

        return (
            currentGrade == NORMAL ? "Rare" : currentGrade == RARE
                ? "Epic"
                : currentGrade == EPIC
                ? "Legendary"
                : currentGrade == LEGENDARY
                ? "Mythical"
                : ""
        );
    }

    function _changeIntToGrade(uint256 i)internal pure returns(string memory){
        return(
            i == 0 ? "Mythical" : 
            i == 1 ? "Legendary" : 
            i == 2 ? "Epic" : 
            i ==3 ? "Rare" : 
            i == 4 ? "Normal" : "none"
        );
    }

    function _getRandomnNumber(uint256 _vrfRandomNumber) internal view returns(uint256){
        return uint256(keccak256(abi.encodePacked(
            msg.sender,
            block.timestamp,
            block.gaslimit,
            block.difficulty,
            _vrfRandomNumber
        ))) % 100;
    }
}