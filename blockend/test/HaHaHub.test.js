const { expect } = require("chai");

describe("JokeHub", function () {
  let jokeHub;
  let owner;

  beforeEach(async function () {
    const JokeHub = await ethers.getContractFactory("JokeHub");
    jokeHub = await JokeHub.deploy();
    await jokeHub.deployed();

    [owner] = await ethers.getSigners();
  });

  it("Should create a joke and retrieve it", async function () {
    const jokeContent = "Why did the chicken cross the road?";

    await jokeHub.createJoke(jokeContent);
    const joke = await jokeHub.getJoke(1);

    expect(joke[1]).to.equal(jokeContent);
  });

  it("Should upvote a joke", async function () {
    const jokeContent = "Why did the chicken cross the road?";

    await jokeHub.createJoke(jokeContent);
    await jokeHub.upvoteJoke(1);

    const joke = await jokeHub.getJoke(1);
    expect(joke[2]).to.equal(1);
  });

  it("Should downvote a joke", async function () {
    const jokeContent = "Why did the chicken cross the road?";

    await jokeHub.createJoke(jokeContent);
    await jokeHub.downvoteJoke(1);

    const joke = await jokeHub.getJoke(1);
    expect(joke[3]).to.equal(1);
  });

  it("Should retrieve jokes by author", async function () {
    const jokeContent1 = "Why did the chicken cross the road?";
    const jokeContent2 = "Why did the turkey cross the road?";

    await jokeHub.createJoke(jokeContent1);
    await jokeHub.createJoke(jokeContent2);

    const jokesByAuthor = await jokeHub.getJokesByAuthor(owner.address);
    expect(jokesByAuthor.length).to.equal(2);
    expect(jokesByAuthor[0].content).to.equal(jokeContent1);
    expect(jokesByAuthor[1].content).to.equal(jokeContent2);
  });
});
