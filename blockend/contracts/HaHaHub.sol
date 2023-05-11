// SPDX-License-Identifier: MIT
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract JokeHub {
    uint256 public jokeCount = 0;

    constructor() {
        console.log("JokeHub contract deployed");
    }

    struct Joke {
        uint256 id;
        string content;
        uint256 timestamp;
        uint256 upvotes;
        uint256 downvotes;
        address author;
    }

    mapping(uint256 => Joke) public jokes;

    event JokeCreated(
        uint256 id,
        string content,
        uint256 timestamp,
        uint256 upvotes,
        uint256 downvotes,
        address author
    );

    event JokeUpvoted(
        uint256 id,
        string content,
        uint256 timestamp,
        uint256 upvotes,
        uint256 downvotes,
        address author
    );

    event JokeDownvoted(
        uint256 id,
        string content,
        uint256 timestamp,
        uint256 upvotes,
        uint256 downvotes,
        address author
    );

    function createJoke(string memory _content) public {
        require(bytes(_content).length > 0, "Joke must have content");

        jokeCount++;
        jokes[jokeCount] = Joke(jokeCount, _content, block.timestamp, 0, 0, msg.sender);

        emit JokeCreated(jokeCount, _content, block.timestamp, 0, 0, msg.sender);
    }

    function upvoteJoke(uint256 _id) public {
        require(_id > 0 && _id <= jokeCount, "Joke must exist");

        Joke storage _joke = jokes[_id];
        _joke.upvotes++;

        emit JokeUpvoted(_joke.id, _joke.content, _joke.timestamp, _joke.upvotes, _joke.downvotes, _joke.author);
    }

    function downvoteJoke(uint256 _id) public {
        require(_id > 0 && _id <= jokeCount, "Joke must exist");

        Joke storage _joke = jokes[_id];
        _joke.downvotes++;

        emit JokeDownvoted(_joke.id, _joke.content, _joke.timestamp, _joke.upvotes, _joke.downvotes, _joke.author);
    }

    function getJoke(uint256 _id) public view returns (uint256, string memory, uint256, uint256, address) {
        Joke memory _joke = jokes[_id];
        return (_joke.id, _joke.content, _joke.upvotes, _joke.downvotes, _joke.author);
    }

    function getJokeCount() public view returns (uint256) {
        return jokeCount;
    }

    function getJokes() public view returns (Joke[] memory) {
        Joke[] memory _jokes = new Joke[](jokeCount);
        for (uint256 i = 0; i < jokeCount; i++) {
            _jokes[i] = jokes[i + 1];
        }
        return _jokes;
    }

    function getJokesByAuthor(address _author) public view returns (Joke[] memory) {
        uint256 _jokeCount = 0;
        for (uint256 i = 0; i < jokeCount; i++) {
            if (jokes[i + 1].author == _author) {
                _jokeCount++;
            }
        }

        Joke[] memory _jokes = new Joke[](_jokeCount);
        uint256 index = 0;
        for (uint256 i = 0; i < jokeCount; i++) {
            if (jokes[i + 1].author == _author) {
                _jokes[index] = jokes[i + 1];
                index++;
            }
        }
        return _jokes;
    }

    function getJokesByUpvotes() public view returns (Joke[] memory) {
        Joke[] memory _jokes = new Joke[](jokeCount);
        for (uint256 i = 0; i < jokeCount; i++) {
            _jokes[i] = jokes[i + 1];
        }
        for (uint256 i = 0; i < jokeCount; i++) {
            for (uint256 j = 0; j < jokeCount - i - 1; j++) {
                if (_jokes[j].upvotes < _jokes[j + 1].upvotes) {
                    Joke memory _temp = _jokes[j];
                    _jokes[j] = _jokes[j + 1];
                    _jokes[j + 1] = _temp;
                }
            }
        }
        return _jokes;
    }

    function getJokesByDownvotes() public view returns (Joke[] memory) {
        Joke[] memory _jokes = new Joke[](jokeCount);
        for (uint256 i = 0; i < jokeCount; i++) {
            _jokes[i] = jokes[i + 1];
        }
        for (uint256 i = 0; i < jokeCount; i++) {
            for (uint256 j = 0; j < jokeCount - i - 1; j++) {
                if (_jokes[j].downvotes < _jokes[j + 1].downvotes) {
                    Joke memory _temp = _jokes[j];
                    _jokes[j] = _jokes[j + 1];
                    _jokes[j + 1] = _temp;
                }
            }
        }
        return _jokes;
    }

    function getJokesByUpvotesAndDownvotes() public view returns (Joke[] memory) {
        Joke[] memory _jokes = new Joke[](jokeCount);
        for (uint256 i = 0; i < jokeCount; i++) {
            _jokes[i] = jokes[i + 1];
        }
        for (uint256 i = 0; i < jokeCount; i++) {
            for (uint256 j = 0; j < jokeCount - i - 1; j++) {
                if (_jokes[j].upvotes - _jokes[j].downvotes < _jokes[j + 1].upvotes - _jokes[j + 1].downvotes) {
                    Joke memory _temp = _jokes[j];
                    _jokes[j] = _jokes[j + 2];
                    _jokes[j + 1] = _temp;
                }
            }
        }
        return _jokes;
    }

    function getJokesByUpvotesAndDownvotesAndAuthor(address _author) public view returns (Joke[] memory) {
        Joke[] memory _jokes = new Joke[](jokeCount);
        uint256 _jokeCount = 0;
        for (uint256 i = 0; i < jokeCount; i++) {
            if (jokes[i + 1].author == _author) {
                _jokes[_jokeCount] = jokes[i + 1];
                _jokeCount++;
            }
        }
        for (uint256 i = 0; i < _jokeCount; i++) {
            for (uint256 j = 0; j < _jokeCount - i - 1; j++) {
                if (_jokes[j].upvotes - _jokes[j].downvotes < _jokes[j + 1].upvotes - _jokes[j + 1].downvotes) {
                    Joke memory _temp = _jokes[j];
                    _jokes[j] = _jokes[j + 1];
                    _jokes[j + 1] = _temp;
                }
            }
        }
        return _jokes;
    }

    function getJokesByUpvotesAndAuthor(address _author) public view returns (Joke[] memory) {
        Joke[] memory _jokes = new Joke[](jokeCount);
        uint256 _jokeCount = 0;
        for (uint256 i = 0; i < jokeCount; i++) {
            if (jokes[i + 1].author == _author) {
                _jokes[_jokeCount] = jokes[i + 1];
                _jokeCount++;
            }
        }
        for (uint256 i = 0; i < _jokeCount; i++) {
            for (uint256 j = 0; j < _jokeCount - i - 1; j++) {
                if (_jokes[j].upvotes < _jokes[j + 1].upvotes) {
                    Joke memory _temp = _jokes[j];
                    _jokes[j] = _jokes[j + 1];
                    _jokes[j + 1] = _temp;
                }
            }
        }
        return _jokes;
    }

    function getJokesByDownvotesAndAuthor(address _author) public view returns (Joke[] memory) {
        Joke[] memory _jokes = new Joke[](jokeCount);
        uint256 _jokeCount = 0;
        for (uint256 i = 0; i < jokeCount; i++) {
            if (jokes[i + 1].author == _author) {
                _jokes[_jokeCount] = jokes[i + 1];
                _jokeCount++;
            }
        }
        for (uint256 i = 0; i < _jokeCount; i++) {
            for (uint256 j = 0; j < _jokeCount - i - 1; j++) {
                if (_jokes[j].downvotes < _jokes[j + 1].downvotes) {
                    Joke memory _temp = _jokes[j];
                    _jokes[j] = _jokes[j + 1];
                    _jokes[j + 1] = _temp;
                }
            }
        }
        return _jokes;
    }
}