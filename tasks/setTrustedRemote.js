const CHAIN_ID = require("../constants/chainIds.json")
const { getDeploymentAddresses } = require("../utils/readStatic")

module.exports = async function (taskArgs, hre) {
    let localContract, remoteContract;

    if(taskArgs.contract) {
        localContract = taskArgs.contract;
        remoteContract = taskArgs.contract;
    } else {
        localContract = taskArgs.localContract;
        remoteContract = taskArgs.remoteContract;
    }

    if(!localContract || !remoteContract) {
        console.log("Must pass in contract name OR pass in both localContract name and remoteContract name")
        return
    }

    // get local contract
    const localContractInstance = await ethers.getContract(localContract)

    // get deployed remote contract address
    const remoteAddress = getDeploymentAddresses(taskArgs.targetNetwork)[remoteContract]

    // get remote chain id
    const remoteChainId = CHAIN_ID[taskArgs.targetNetwork]

    // concat remote and local address
    let remoteAndLocal = hre.ethers.utils.solidityPack(
        ['address','address'],
        [remoteAddress, localContractInstance.address]
    )

    // check if pathway is already set
    const isTrustedRemoteSet = await localContractInstance.isTrustedRemote(remoteChainId, remoteAndLocal);

    if(!isTrustedRemoteSet) {
        try {
            let tx = await (await localContractInstance.setTrustedRemote(remoteChainId, remoteAndLocal)).wait()
            console.log(`✅ [${hre.network.name}] setTrustedRemote(${remoteChainId}, ${remoteAndLocal})`)
            console.log(` tx: ${tx.transactionHash}`)
        } catch (e) {
            if (e.error.message.includes("The chainId + address is already trusted")) {
                console.log("*source already set*")
            } else {
                console.log(`❌ [${hre.network.name}] setTrustedRemote(${remoteChainId}, ${remoteAndLocal})`)
            }
        }
    } else {
        console.log("*source already set*")
    }

    let tx02 = await(
        //await localContractInstance.setLootNft('0x3D7169410a843E2601e79796ec40e16ff0bd0E92')
        //await localContractInstance.setLootNft('0xDc5b8F3971F5c4B60FB13d39cE65Bea7Dee8aEA7') //mumbai
        //await localContractInstance.setLootNft('0xcaD30e84e38597C1791B30DD41705eA3a16d7D0d') //bsc-testnet
        await localContractInstance.setLootNft('0x24fc344e49105fe55A9709f0B76bd5D9aC4FF6F8') //opt-goerli
    );
    tx02.wait();
    console.log(`set LootNft Address....`);
    console.log(`tx02: ${tx02}`);
}
