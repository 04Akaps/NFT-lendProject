// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IHeroCoreFunc.sol";

contract IHeroCore is IHeroCoreFunc {
    struct HERO {
        uint256 tokenId;
        uint256 level;
        string grade;
        uint256 birthTime;
        uint256 reward;
        chcekStatus status;
    }

    struct chcekStatus {
        bool borrowed;
        bool traveled;
        bool mining;
        address owner;
        traveledStruct travelData;
        borrowStruct borrowData;
    }

    struct borrowStruct {
        uint256 borrowEndTime;
        address borrowers;
    }

    struct traveledStruct {
        address travelOwner;
        uint256 travelTime;
    }

    struct RequestStruct {
        address requestOwner;
        uint256 duration;
    }
}
