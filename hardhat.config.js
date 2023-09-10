require("dotenv").config();

require('hardhat-contract-sizer');
require("@nomiclabs/hardhat-waffle");
require(`@nomiclabs/hardhat-etherscan`);
require("solidity-coverage");
require('hardhat-gas-reporter');
require('hardhat-deploy');
require('hardhat-deploy-ethers');
require('@openzeppelin/hardhat-upgrades');
require('./tasks');

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const API_URL_MUMBAI = process.env.API_URL_MUMBAI;
const API_URL_SEPOLIA = process.env.API_URL_SEPOLIA;
const API_URL_BSC = process.env.API_URL_BSC;
const API_KEY_MUMBAI = process.env.API_KEY_MUMBAI;
const API_URL_OPTGOERLI = process.env.API_URL_OPTGOERLI

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {

  solidity: {
    compilers: [
      {
        version: "0.8.4",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      },
      {
        version: "0.7.6",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      },
      {
        version: "0.8.12",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      }
    ]


  },

  // solidity: "0.8.4",
  contractSizer: {
    alphaSort: false,
    runOnCompile: true,
    disambiguatePaths: false,
  },

  namedAccounts: {
    deployer: {
      default: 0,    // wallet address 0, of the mnemonic in .env
    },
    proxyOwner: {
      default: 1,
    },
  },

  mocha: {
    timeout: 100000000
  },

  networks: {
    sepolia: {
      url: API_URL_SEPOLIA,
      chainId: 11155111,
      accounts: [ PRIVATE_KEY ],
    },
    mumbai: {
      url: API_URL_MUMBAI,
      chainId: 80001,
      accounts: [ PRIVATE_KEY ],
    },
    'bsc-testnet': {
      url: API_URL_BSC,
      chainId: 97,
      accounts: [PRIVATE_KEY],
    },
    'optimism-goerli': {
      url: API_URL_OPTGOERLI,
      chainId: 420,
      accounts: [PRIVATE_KEY],
    },
    'loot-testnet': {
      url: 'https://testnet.rpc.lootchain.com/http',
      chainId: 9088912,
      accounts: [PRIVATE_KEY],
    }
  },
  etherscan: {  // copy the Etherscan object from the verify Contracts secion on Dashboard 
    apiKey: {
      polygonMumbai: API_KEY_MUMBAI
    },
  }
};