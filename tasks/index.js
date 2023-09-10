task("sendReqTba", "Send Request for Check NFT Owner", require("./sendReqTba"))
    .addParam("targetNetwork", "the target network name, ie: fuji, or mumbai, etc (from hardhat.config.js)")


task("readNftOwner", "Receive Token", require("./readNftOwner"))
    .addParam("targetNetwork", "the target network name, ie: fuji, or mumbai, etc (from hardhat.config.js)")

    task("withdraw", "Receive Token", require("./withdraw"))
    .addParam("targetNetwork", "the target network name, ie: fuji, or mumbai, etc (from hardhat.config.js)")

// set the Oracle address for the OmniCounter
// example:
task("omniCounterSetOracle", "set the UA (an OmniCounter contract) to use the specified oracle for the destination chain", require("./omniCounterSetOracle"))
    .addParam("targetNetwork", "the target network name, ie: fuji, or mumbai, etc (from hardhat.config.js)")
    .addParam("oracle", "the Oracle address for the specified targetNetwork")

// get the Oracle for sending to the destination chain
task("ocGetOracle", "get the Oracle address being used by the OmniCounter", require("./ocGetOracle")).addParam("targetNetwork", "the target network name, ie: fuji, or mumbai, etc (from hardhat.config.js)")

//
task("ocPoll", "poll the counter of the OmniCounter", require("./ocPoll"))

//
task(
    "omniCounterIncrementWithParamsV1",
    "increment the destination OmniCounter with gas amount param",
    require("./omniCounterIncrementWithParamsV1")
)
    .addParam("targetNetwork", "the target network name, ie: fuji, or mumbai, etc (from hardhat.config.js)")
    .addParam("gasAmount", "the gas amount for the destination chain")

//
task(
    "omniCounterIncrementWithParamsV2",
    "increment the destination OmniCounter with gas amount param",
    require("./omniCounterIncrementWithParamsV2")
)
    .addParam("targetNetwork", "the target network name, ie: fuji, or mumbai, etc (from hardhat.config.js)")
    .addParam("gasAmount", "the gas amount for the destination chain")
    .addParam("airDropEthQty", "the amount of eth to drop")
    .addParam("airDropAddr", "the air drop address")

task("routerAddLiquidityETH", "addLiquidityETH to the V2 Router", require("./routerAddLiquidityETH"))
    .addParam("router", "the router address")
    .addParam("token", "the token address")

task("swapNativeForNative", "swap native on one chain thru StargateComposed to native on another chainr", require("./swapNativeForNative"))
    .addParam("targetNetwork", "the destination network name")
    .addParam("bridgeToken", "the address of the token that will be bridged (the pools token)")
    .addParam("srcPoolId", "the poolId to bridge")
    .addParam("dstPoolId", "the poolId to bridge")
    .addParam("qty", "the quanitty of native to swap in")
/*
task("pingPongSetTrustedRemote", "set the trusted remote", require("./pingPongSetTrustedRemote")).addParam(
    "targetNetwork",
    "the targetNetwork to set as trusted"
)

task("ping", "call ping to start the pingPong with the target network", require("./ping")).addParam(
    "targetNetwork",
    "the targetNetwork to commence pingponging with"
)
*/

task("getSigners", "show the signers of the current mnemonic", require("./getSigners")).addOptionalParam("n", "how many to show", 3, types.int)

// uint qty,
// address bridgeToken,                    // the address of the native ERC20 to swap() - *must* be the token for the poolId
// uint16 dstChainId,                      // Stargate/LayerZero chainId
// uint16 srcPoolId,                       // stargate poolId - *must* be the poolId for the qty asset
// uint16 dstPoolId,                       // stargate destination poolId
task("stargateSwap", "", require("./stargateSwap"))
    .addParam("qty", "")
    .addParam("bridgeToken", "")
    .addParam("targetNetwork", "")
    .addParam("srcPoolId", "")
    .addParam("dstPoolId", "")

//
task("checkWireUp", "check wire up", require("./checkWireUp"))
    .addParam("e", "environment testnet/mainet")
    .addParam("contract", "the contract to delete and redeploy")

//
task("checkWireUpAll", "check wire up all", require("./checkWireUpAll"))
    .addParam("e", "environment testnet/mainet")
    .addParam("contract", "name of contract")
    .addOptionalParam("proxyContract", "name of proxy contract")
    .addOptionalParam("proxyChain", "name of proxy chain")

//
task(
    "setTrustedRemote",
    "setTrustedRemote(chainId, sourceAddr) to enable inbound/outbound messages with your other contracts",
    require("./setTrustedRemote")
).addParam("targetNetwork", "the target network to set as a trusted remote")
    .addOptionalParam("localContract", "Name of local contract if the names are different")
    .addOptionalParam("remoteContract", "Name of remote contract if the names are different")
    .addOptionalParam("contract", "If both contracts are the same name")

task("verifyContract", "", require("./verifyContract.js"))
    .addParam("contract", "contract name")
/*
//
task("getStoredPayloadEvent", "Detect and clear stored payload", require('./getStoredPayloadEvent'))
    .addParam("txStart", "provide a transaction hash in the block you want to start in")
    .addParam("srcAddress", "")
    .addParam("desAddress", "")
    .addOptionalParam("txEnd", "provide a tx hash in the block you want to end at")
    .addOptionalParam("step", "provide a tx hash in the block you want to end at", 1000, types.int)
    .addOptionalParam("nonce", "nonce to clear")
*/
//
task("getMessageFailedEvent", "Detect and clear failed message", require('./getMessageFailedEvent'))
    .addParam("txStart", "provide a transaction hash in the block you want to start in")
    .addParam("dstUa", "address of dst UA")
    .addOptionalParam("txEnd", "provide a tx hash in the block you want to end at")
    .addOptionalParam("step", "provide a tx hash in the block you want to end at", 1000, types.int)
    .addOptionalParam("nonce", "nonce to clear")

//
task("isFailedMessage", "check if failed message", require("./isFailedMessage"))
    .addParam("srcChainId", "")
    .addParam("srcAddress", "")
    .addParam("desAddress", "")
    .addParam("nonce", "")

//
task("isStoredPayload", "check if stored payload", require("./isStoredPayload"))
    .addParam("srcChainId", "")
    .addParam("srcAddress", "")
    .addParam("desAddress", "")
    .addOptionalParam("payload", "")
    .addOptionalParam("clear", "", false, types.boolean)