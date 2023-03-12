const main = async () => {
  const jokeContractFactory = await hre.ethers.getContractFactory('JokeHub');
    const jokeContract = await jokeContractFactory.deploy();
    await jokeContract.deployed();
    console.log("Contract deployed to:", jokeContract.address);
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
