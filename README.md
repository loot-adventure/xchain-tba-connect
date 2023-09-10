# Token Bound Account between Omnichain
※どこかで英語化する

## 概要
* 複数ブロックチェーン間でのToken Bound Account（ERC6551）を実現する
* 処理は、[/contracts/examples/XChainTba.sol](./contracts/examples/XChainTba.sol)に記述

## サンプルコードの実行手順
1. 必要ライブラリインストール
   ```
   npm install
   ```
2. 環境変数の設定
    
    .envファイル(.env)を作成し、環境変数を設定する
    <br> *[.env.example](./.env.example)を参照
   ```
    PRIVATE_KEY=YOUR_PRIVATE_KEY
    API_URL_MUMBAI="https://polygon-mumbai.g.alchemy.com/v2/..."
    API_URL_SEPOLIA="https://eth-sepolia.g.alchemy.com/v2/..."
    API_URL_BSC="https://sparkling-cosmological-season.bsc-testnet.discover.quiknode.pro/..."
    API_URL_OPTGOERLI="https://opt-goerli.g.alchemy.com/v2/..."

   ```
3. コントラクトデプロイ
   1. Optimism Goerli
        ```bash
        npx hardhat --network optimism-goerli deploy --tags XChainTba
        ```
   2. BNB Testnet
        ```bash
        npx hardhat --network bsc-testnet deploy --tags XChainTba
        ```
4. ブリッジ通信を行うコントラクトの設定
   1. Optimism Goerli
        ```bash
        npx hardhat --network optimism-goerli setTrustedRemote --target-network bsc-testnet --contract XChainTba
        ```
   2. BNB Testnet
        ```bash
        npx hardhat --network bsc-testnet setTrustedRemote --target-network optimism-goerli --contract XChainTba
        ```
5. NFT所有者情報の確認リクエスト *BNB Testnetで実行
    ```bash
    npx hardhat --network bsc-testnet sendReqTba --target-network optimism-goerli
    ```

## 参考
* [LayerZero Solidity Examples](https://github.com/LayerZero-Labs/solidity-examples/blob/LzAppLite/constants/layerzeroEndpoints.json)
* [LayerZero Testnet Addresses](https://layerzero.gitbook.io/docs/technical-reference/testnet/testnet-addresses)
* [LayerZero EVM Guides](https://layerzero.gitbook.io/docs/evm-guides/master)
* 実行結果
  * [BNB Testnet(参照リクエスト側)](https://testnet.bscscan.com/address/0xec2a3cef15ade0c9521a604d2112b5624cb31b7c#events)
  * [Optimism Goerli](https://goerli-optimism.etherscan.io/address/0x4f60cad73dcf794a3982b1aa55db4d25b30e6507#events)