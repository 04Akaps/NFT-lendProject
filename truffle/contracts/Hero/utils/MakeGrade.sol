// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "../interface/IMakeGrade.sol";
import "../../utils/SafeMath.sol";

contract MakeGrade is IMakeGrade {
    using SafeMath for *;

    uint256[] private weightValueMap;
    string[] private gradeValueMap;

    constructor() {
        weightValueMap.push(1);
        weightValueMap.push(5);
        weightValueMap.push(14);
        weightValueMap.push(30);
        weightValueMap.push(50);

        gradeValueMap.push("Mythology");
        gradeValueMap.push("Legendary");
        gradeValueMap.push("Epic");
        gradeValueMap.push("Administrator");
        gradeValueMap.push("Normal");
    }

    function makeGrade(uint256 _tokenIndex)
        external
        view
        override
        returns (string memory)
    {
        uint256 randNumber = makeRandomNumber(_tokenIndex);
        uint256 gradeIndex;

        for (uint256 i = 0; i < weightValueMap.length; i++) {
            uint256 value = weightValueMap[i];
            if (randNumber > value) {
                randNumber = randNumber.sub(value);
            } else {
                gradeIndex = i;
                break;
            }
        }

        return gradeValueMap[gradeIndex];
    }

    function makeRandomNumber(uint256 _tokenIndex)
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
            ) % 100;
    }
}
