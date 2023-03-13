// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract HaHaHub {
    uint256 jokeCount = 0;

    constructor() {
        console.log("HaHaHub contract deployed");
    }

    function createJoke() public {
        jokeCount += 1;
        console.log("%s has sent a joke!", msg.sender);
    }

    function getJokeCount() public view returns (uint256) {
        console.log("We have %d joke(s) in total!", jokeCount);
        return jokeCount;
    }
}