// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

abstract contract ILevelDiagram {
     function calculateTokenAmount(string memory grade, uint256 level)
        public
        pure
        virtual
        returns (uint256);

    function calculateBasicLevelAmount(uint256 level)
        internal
        pure
        virtual
        returns (uint256);

    function calculateBasicGradeAmount(string memory grade)
        internal
        pure
        virtual
        returns (uint256);

    function calculateItemIndex(uint256 _power)
        external
        view
        virtual
        returns (uint256);

    function calculatePower(string memory grade, uint256 level)
        external
        view
        virtual
        returns (uint256);

    function makeRandomNumberForItem(uint256 _tokenIndex)
        internal
        view
        virtual
        returns (uint256);
}