const CHAIN_ID = require("../constants/chainIds.json")
const ENDPOINTS = require("../constants/layerzeroEndpoints.json");

module.exports = async function (taskArgs, hre) {
    const xchaintba = await ethers.getContract("XChainTba")
    console.log(`Withdraw token ....`)

    
    let tx = await xchaintba.withdraw(
        ethers.utils.parseEther("0.33"),
        {}
    )
}
