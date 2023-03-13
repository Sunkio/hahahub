const main = async () => {
  const [deployer] = await hre.ethers.getSigners();
  const accountBalance = await deployer.getBalance();

  console.log("Deploying contracts with account: ", deployer.address);
  console.log("Account balance: ", accountBalance.toString());

  const jokeContractFactory = await hre.ethers.getContractFactory("JokeHub");
  const jokeContract = await jokeContractFactory.deploy();
  await jokeContract.deployed();

  console.log("JokeHub address: ", jokeContract.address);
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
