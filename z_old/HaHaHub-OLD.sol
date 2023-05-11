// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract HaHaHub {
    uint256 jokeCount = 0;

    event JokeCreated(address indexed from, uint256 timestamp, string content);

    struct Joke {
        address author;
        uint256 timestamp;
        string content;
    }

    Joke[] public jokes;

    constructor() {
        console.log("HaHaHub contract deployed");
    }

    function createJoke(string memory _content) public {
        jokeCount += 1;
        console.log("%s has sent a joke: %s", msg.sender, _content);

        jokes.push(Joke(msg.sender, block.timestamp, _content));

        emit JokeCreated(msg.sender, block.timestamp, _content);
    }

    function getJokes() public view returns (Joke[] memory) {
        return jokes;
    }

    function getJokeCount() public view returns (uint256) {
        console.log("We have %d joke(s) in total!", jokeCount);
        return jokeCount;
    }
}