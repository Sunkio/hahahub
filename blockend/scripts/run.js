const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const jokeContractFactory = await hre.ethers.getContractFactory("JokeHub");
  const jokeContract = await jokeContractFactory.deploy();
  await jokeContract.deployed();

  console.log("Contract deployed to:", jokeContract.address);
  console.log("Contract deployed by:", owner.address);

  await jokeContract.getJokeCount();

  const jokeTxn1 = await jokeContract.createJoke();
  await jokeTxn1.wait();

  await jokeContract.getJokeCount();

  const jokeTxn2 = await jokeContract.connect(randomPerson).createJoke();
  await jokeTxn2.wait();

  await jokeContract.getJokeCount();
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