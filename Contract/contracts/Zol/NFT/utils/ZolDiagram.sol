pragma solidity 0.8.0;

contract ZolDiagram {
    bytes32 MYTHICAL = keccak256("Mythical");
    bytes32 LEGENDARY = keccak256("Legendary");
    bytes32 EPIC = keccak256("Epic");
    bytes32 RARE = keccak256("Rare");
    bytes32 NORMAL = keccak256("Normal");

    uint256[] private gradeProbability = new uint256[](5);
    uint256[] private weaponMintProbability = new uint256[](5);

    constructor() {
        gradeProbability[0] = 1;
        gradeProbability[1] = 5;
        gradeProbability[2] = 14;
        gradeProbability[3] = 30;
        gradeProbability[4] = 50;

        weaponMintProbability[0] = 3000;
        weaponMintProbability[1] = 2500;
        weaponMintProbability[2] = 2000;
        weaponMintProbability[3] = 1800;
        weaponMintProbability[4] = 1500;
    }

    function zolPowerDiagram(uint256 _level, string memory _grade)
        internal
        view
        returns (uint256)
    {
        bytes32 currentGrade = keccak256(bytes(_grade));

        uint256 gradePoint = currentGrade == NORMAL ? 100 : currentGrade == RARE
            ? 120
            : currentGrade == EPIC
            ? 140
            : currentGrade == LEGENDARY
            ? 160
            : currentGrade == MYTHICAL
            ? 200
            : 0;

        uint256 levelPoint = _level == 1 ? 50 : _level == 2 ? 80 : _level == 3
            ? 100
            : _level == 4
            ? 120
            : _level == 5
            ? 150
            : 0;

        return gradePoint + levelPoint;
    }

    function calculateExplorationRewardNumber(
        uint256 _duration,
        uint256 _level,
        string memory _grade
    ) internal view returns (uint256 _weaponTokenId) {
        uint256 randomNumber = _getRandomnNumberForWeapon();
        uint256 duration = _duration;
        uint256 durationPoint;

        while (duration < 302400) {
            durationPoint++;
            duration -= 302400;
        }

        uint256 addpointsNumber = ((((randomNumber + (durationPoint * 100)) *
            addLevelPointsToExploration(_level)) / 100) *
            addGradePointsToExploration(_grade)) / 100;

        for (uint256 i = 0; i < weaponMintProbability.length; i++) {
            uint256 probability = weaponMintProbability[i];

            if (addpointsNumber >= probability) {
                return i;
            }
        }

        return 5;
    }

    function addLevelPointsToExploration(uint256 level)
        internal
        view
        returns (uint256)
    {
        return (
            level == 1 ? 100 : level == 2 ? 120 : level == 3 ? 150 : level == 4
                ? 180
                : level == 5
                ? 200
                : 0
        );
    }

    function addGradePointsToExploration(string memory _grade)
        internal
        view
        returns (uint256)
    {
        bytes32 currentGrade = keccak256(bytes(_grade));

        return (
            currentGrade == NORMAL ? 100 : currentGrade == RARE
                ? 120
                : currentGrade == EPIC
                ? 150
                : currentGrade == LEGENDARY
                ? 180
                : 0
        );
    }

    function calculateZolGrade(uint256 _vrfRandomNumber)
        internal
        view
        returns (string memory)
    {
        uint256 randomNumber = _getRandomnNumber(_vrfRandomNumber);

        for (uint256 i = 0; i < gradeProbability.length; i++) {
            uint256 probability = gradeProbability[i];

            if (randomNumber > probability) {
                randomNumber -= probability;
            } else {
                return _changeIntToGrade(i);
            }
        }

        return "grade_error";
    }

    function calculateNextGrade(string memory _currentGrade)
        internal
        view
        returns (string memory)
    {
        bytes32 currentGrade = keccak256(bytes(_currentGrade));

        require(currentGrade != MYTHICAL, "Error : MaxLevel Error");

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

    function _changeIntToGrade(uint256 i)
        internal
        pure
        returns (string memory)
    {
        return (
            i == 0 ? "Mythical" : i == 1 ? "Legendary" : i == 2
                ? "Epic"
                : i == 3
                ? "Rare"
                : i == 4
                ? "Normal"
                : "none"
        );
    }

    function _getRandomnNumber(uint256 _vrfRandomNumber)
        internal
        view
        returns (uint256)
    {
        return
            uint256(
                keccak256(
                    abi.encodePacked(
                        msg.sender,
                        block.timestamp,
                        block.gaslimit,
                        block.difficulty,
                        _vrfRandomNumber
                    )
                )
            ) % 100;
    }

    function _getRandomnNumberForWeapon() internal view returns (uint256) {
        return
            uint256(
                keccak256(
                    abi.encodePacked(
                        msg.sender,
                        block.timestamp,
                        block.gaslimit,
                        block.difficulty
                    )
                )
            ) % 100;
    }
}
