// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./HeroController.sol";

contract LevelDiagram is HeroController {
    bytes32 private constant MYTHOLOGY = keccak256("Mythology");
    bytes32 private constant LEGENDARY = keccak256("Legendary");
    bytes32 private constant EPIC = keccak256("Epic");
    bytes32 private constant ADMINISTRATOR = keccak256("Administrator");
    bytes32 private constant NORMAL = keccak256("Normal");

    function calculateTokenAmount(string memory grade, uint256 level)
        public
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
        bytes32 gradeCheck = keccak256(bytes(grade));

        return (
            gradeCheck == MYTHOLOGY ? 675 : gradeCheck == LEGENDARY
                ? 450
                : gradeCheck == EPIC
                ? 300
                : gradeCheck == ADMINISTRATOR
                ? 225
                : gradeCheck == NORMAL
                ? 200
                : 0
        );
    }

    function calculateItemIndex(uint256 _power)
        internal
        view
        returns (uint256)
    {
        for (uint256 i = 1; i <= 5; i++) {
            uint256 randomNumber = makeRandomNumberForItem(i);

            if (_power >= randomNumber) {
                _power -= randomNumber;
            } else {
                return i;
            }
        }

        return 0;
    }

    function calculatePower(string memory grade, uint256 level)
        internal
        view
        returns (uint256)
    {
        bytes32 gradeCheck = keccak256(bytes(grade));

        uint256 basicPower = (
            gradeCheck == MYTHOLOGY ? 450 : gradeCheck == LEGENDARY
                ? 300
                : gradeCheck == EPIC
                ? 200
                : gradeCheck == ADMINISTRATOR
                ? 150
                : gradeCheck == NORMAL
                ? 100
                : 0
        );

        uint256 levelCheck = (
            level == 1 ? 10 : level == 2 ? 15 : level == 3 ? 25 : level == 4
                ? 40
                : level == 5
                ? 70
                : 0
        );

        uint256 itemPower = 0;

        for (uint256 i = 1; i <= 5; i++) {
            uint256 balanceOf = getItem().balanceOf(msg.sender, i);
            uint256 basicItemPower = i + 1;
            itemPower = itemPower + (basicItemPower * balanceOf);
        }

        return ((basicPower + itemPower) * levelCheck) / 10;
    }

    function makeRandomNumberForItem(uint256 _tokenIndex)
        internal
        view
        returns (uint256)
    {
        return
            uint256(
                keccak256(
                    abi.encodePacked(
                        block.timestamp,
                        block.difficulty,
                        _tokenIndex
                    )
                )
            ) % 1000;
    }
}
