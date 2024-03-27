require("@nomicfoundation/hardhat-toolbox");
require('dotenv/config');

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.0",
  networks: {
    etherlinkTest: {
      url: "https://node.ghostnet.etherlink.com",
      accounts: [process.env.MY_PRIVATE_KEY],
    }
  }
};
