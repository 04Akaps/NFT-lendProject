// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

contract TimeLock {
    mapping(address => uint256[]) internal heroTimeLock;

    function changeTimeLock(uint256 _index) internal {
        delete heroTimeLock[msg.sender];

        uint256[] storage userTimeLock = heroTimeLock[msg.sender];

        if (userTimeLock.length == 1 || userTimeLock.length - 1 == _index) {
            userTimeLock.pop();
        } else {
            uint256 lastValue = userTimeLock[userTimeLock.length - 1];
            userTimeLock[_index] = lastValue;
            userTimeLock.pop();
        }
    }
}
