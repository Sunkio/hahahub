const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const jokeContractFactory = await hre.ethers.getContractFactory('JokeHub');
  const jokeContract = await jokeContractFactory.deploy();
  await jokeContract.deployed();

  console.log("Contract deployed to:", jokeContract.address);
  console.log("Contract deployed by:", owner.address);

    let jokeCount = await jokeContract.getJokeCount();
    console.log("Current JokeCount: " + jokeCount.toNumber());
    let jokeTxn = await jokeContract.createJoke("What do you call a cow with no legs? - Ground beef");
    await jokeTxn.wait();

  jokeCount = await jokeContract.getJokeCount();
  console.log("Current JokeCount: " + jokeCount.toNumber());

    const [_, randomPerson] = await hre.ethers.getSigners();
    jokeTxn = await jokeContract.connect(randomPerson).createJoke("What do you call a cow with no legs? - Ground beef");
    jokeCount = await jokeContract.getJokeCount();
    console.log("Current JokeCount: " + jokeCount.toNumber());
    const joke = await jokeContract.jokes(0);
    console.log(joke);

};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
