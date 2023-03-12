const main = async () => {
  const jokeContractFactory = await hre.ethers.getContractFactory("JokeHub");
  const jokeContract = await jokeContractFactory.deploy();
  await jokeContract.deployed();
  console.log("Contract deployed to:", jokeContract.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0); // exit Node process without error
  } catch (error) {
    console.log(error);
    process.exit(1); // exit Node process with "Uncaught Fatal Exception" error
  }
};

runMain();