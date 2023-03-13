const main = async () => {
  const jokeContractFactory = await hre.ethers.getContractFactory("HaHaHub");
  const jokeContract = await jokeContractFactory.deploy();
  await jokeContract.deployed();
  console.log("Contract address: ", jokeContract.address);

  let jokeCount;
  jokeCount = await jokeContract.getJokeCount();
  console.log(jokeCount.toNumber());

  /**
   * Let's send a few waves!
   */
  let jokeTxn = await jokeContract.createJoke("A hilarious joke!");
  await jokeTxn.wait(); // Wait for the transaction to be mined

  const [_, randomPerson] = await hre.ethers.getSigners();
  jokeTxn = await jokeContract.connect(randomPerson).createJoke("An even funnier joke!");
  await jokeTxn.wait(); // Wait for the transaction to be mined

  let allJokes = await jokeContract.getJokes();
  console.log(allJokes);
}

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