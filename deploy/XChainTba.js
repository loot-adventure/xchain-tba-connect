const LZ_ENDPOINTS = require("../constants/layerzeroEndpoints.json")

module.exports = async function ({ deployments, getNamedAccounts }) {
    const owner = (await ethers.getSigners())[0]
    const { deploy } = deployments
    const { deployer } = await getNamedAccounts()
    console.log(`>>> your address: ${deployer}`)

    // get the Endpoint address
    const endpointAddr = LZ_ENDPOINTS[hre.network.name]
    console.log(`[${hre.network.name}] Endpoint address: ${endpointAddr}`)

    let xhcaintba = await deploy("XChainTba", {
        from: deployer,
        args: [endpointAddr],
        log: true,
        waitConfirmations: 1,
    })
    console.log(`Contract Deployed: ${xhcaintba}`)

    let eth = "0.003"
    let tx = await (
        await owner.sendTransaction({
            to: xhcaintba.address,
            value: ethers.utils.parseEther(eth),
        })
    ).wait()
    console.log(`send it [${eth}] ether | tx: ${tx.transactionHash}`)
}

module.exports.tags = ["XChainTba"]
