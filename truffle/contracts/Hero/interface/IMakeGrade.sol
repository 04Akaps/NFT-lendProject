// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

interface IMakeGrade{
    function makeGrade(uint256 _tokenIndex) external view  returns(string memory);
}       