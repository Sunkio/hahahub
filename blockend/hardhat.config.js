require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: ".env" });

const QUICKNODE_MUMBAI_HTTP_URL = process.env.QUICKNODE_MUMBAI_HTTP_URL;
const QUICKNODE_SEPOLIA_HTTP_URL = process.env.QUICKNODE_SEPOLIA_HTTP_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
  solidity: "0.8.4",
  networks: {
    mumbai: {
      url: QUICKNODE_MUMBAI_HTTP_URL,
      accounts: [PRIVATE_KEY],
    },
    sepolia: {
        url: QUICKNODE_SEPOLIA_HTTP_URL,
        accounts: [PRIVATE_KEY],
    }
  },
};