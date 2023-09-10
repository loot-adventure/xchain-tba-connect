const CHAIN_ID = require("../constants/chainIds.json")
const ENDPOINTS = require("../constants/layerzeroEndpoints.json");

module.exports = async function (taskArgs, hre) {
    //const remoteChainId = CHAIN_ID[taskArgs.targetNetwork]
    const xchaintba = await ethers.getContract("XChainTba")

    // quote fee with default adapterParams
    let adapterParams = ethers.utils.solidityPack(["uint16", "uint256"], [1, 200000]) // default adapterParams example

    console.log(`Nft owner record is ....`)

    /*
    let tx = await xchaintba.withdraw(
            ethers.utils.parseEther("0.05"),
            {}
        )
    */
    let tx = await xchaintba.nftOwner(
        '0xDc5b8F3971F5c4B60FB13d39cE65Bea7Dee8aEA7',
        1,
        {}
    )
    console.log(`✅ Network [${hre.network.name}] `)
    console.log(`tx - nftOwner is ...: ${tx}`)

    let tx02 = await xchaintba.LOOTNFT()
    console.log(`lootNft Address: ${tx02}`)
}
