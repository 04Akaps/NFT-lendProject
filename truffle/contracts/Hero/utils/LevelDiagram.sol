// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LevelDiagram {
    function calculateTokenAmount(string memory grade, uint256 level)
        internal
        pure
        returns (uint256)
    {
        uint256 gradeAmount = calculateBasicGradeAmount(grade);
        uint256 levelAmount = calculateBasicLevelAmount(level);

        return ((gradeAmount * levelAmount) / 10) * 1e18;
    }

    function calculateBasicLevelAmount(uint256 level)
        internal
        pure
        returns (uint256)
    {
        return (
            level == 1 ? 15 : level == 2 ? 22 : level == 3 ? 42 : level == 4
                ? 80
                : 0
        );
    }

    function calculateBasicGradeAmount(string memory grade)
        internal
        pure
        returns (uint256)
    {
        return (
            keccak256(bytes(grade)) == keccak256("Mythology")
                ? 675
                : keccak256(bytes(grade)) == keccak256("Legendary")
                ? 450
                : keccak256(bytes(grade)) == keccak256("Epic")
                ? 300
                : keccak256(bytes(grade)) == keccak256("Administrator")
                ? 225
                : keccak256(bytes(grade)) == keccak256("Normal")
                ? 200
                : 0
        );
    }
}
