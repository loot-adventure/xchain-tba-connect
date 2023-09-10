// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
pragma abicoder v2;

import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../lzApp/NonblockingLzApp.sol";

contract XChainTba is NonblockingLzApp, Pausable {
    /*
    address|tokenId|nftOwner(0x123...)
     */
    mapping(address => mapping(uint256 => address)) public nftOwner;
    event receiveNftReq(address nftAddress, uint256 tokenId, address nftOwner, uint16 counter);
    event nftOwnerResult(bool result, address nftAddress, uint256 tokenId, address nftOwner);

    address public LOOTNFT;

    constructor(address _lzEndpoint) NonblockingLzApp(_lzEndpoint) {}
    
    function enable(bool en) external {
        if (en) {
            _pause();
        } else {
            _unpause();
        }
    }

    function sendRequestGetTbaInfo(
        uint16 _dstChainId, 
        address _nftAddress, 
        uint256 _tokenId,
        address _nftOwner,
        uint16 _counter
    ) public payable {
        //Create Message
        bytes memory payload = abi.encode(
            _nftAddress,
            _nftOwner,
            _tokenId,
            _counter
        );
        uint16 version = 1;
        //uint gasForDestinationLzReceive = 15e15;
        uint gasForDestinationLzReceive = 350000;
        bytes memory adapterParams = abi.encodePacked(version, gasForDestinationLzReceive);
        _lzSend(
            _dstChainId, 
            payload, 
            payable(this), 
            address(0x0), 
            adapterParams, 
            msg.value
        );
    }

    function returnTbaInfo(
        uint16 _dstChainId,
        address,
        uint _gasFee,
        address _nftAddress, 
        uint256 _tokenId,
        address _nftOwner,
        uint16 _counter
    ) public payable whenNotPaused {
        //Create Message
        bytes memory payload = abi.encode(
            _nftAddress,
            _nftOwner,
            _tokenId,
            _counter
        );
        uint16 version = 1;
        uint gasForDestinationLzReceive = 350000;
        
        bytes memory adapterParams = abi.encodePacked(version, gasForDestinationLzReceive);
        _lzSend(
            _dstChainId, 
            payload, 
            payable(this), 
            address(0x0), 
            adapterParams, 
            _gasFee
        );
    }

    function _nonblockingLzReceive(
        uint16 _srcChainId,
        bytes memory _srcAddress,
        uint64, /*_nonce*/
        bytes memory _payload
    ) internal override {
        //トークン所有者の情報を更新する
        //受け取ったメッセージを複合(NFTアドレス、NFT所有者、トークンID、カウンター)
        (
            address _nftAddress, 
            address _nftOwner, 
            uint256 _tokenId,
            uint16 _counter
        ) = abi.decode(_payload, (address, address, uint256, uint16));

        if(_counter==1){
            IERC721 _lootNft = IERC721(_nftAddress);
            address _tmpNftOwner = _lootNft.ownerOf(_tokenId);
            if(_tmpNftOwner == _nftOwner){
                emit nftOwnerResult(true ,_nftAddress, _tokenId, _nftOwner);
                address sendBackToAddress;
                assembly {sendBackToAddress := mload(add(_srcAddress, 20))}
                uint _gasFee =  13e15;
                //uint _gasFee = 330000;
                returnTbaInfo(_srcChainId, sendBackToAddress, _gasFee, _nftAddress, _tokenId, _nftOwner, 2);
            } else {
                emit nftOwnerResult(false ,_nftAddress, _tokenId, _nftOwner);
            }
        } else {
            nftOwner[_nftAddress][_tokenId] = _nftOwner;
        }
        emit receiveNftReq(_nftAddress, _tokenId, _nftOwner, _counter);
    }
    
    function setLootNft(address _lootNft) external onlyOwner{
        LOOTNFT = _lootNft;
    }

    function setOracle(uint16 dstChainId, address oracle) external onlyOwner {
        uint TYPE_ORACLE = 6;
        // set the Oracle
        lzEndpoint.setConfig(lzEndpoint.getSendVersion(address(this)), dstChainId, TYPE_ORACLE, abi.encode(oracle));
    }

    function getOracle(uint16 remoteChainId) external view returns (address _oracle) {
        bytes memory bytesOracle = lzEndpoint.getConfig(lzEndpoint.getSendVersion(address(this)), remoteChainId, address(this), 6);
        assembly {
            _oracle := mload(add(bytesOracle, 32))
        }
    }

    function withdraw(uint256 _amount) public onlyOwner {
        payable(msg.sender).transfer(_amount);
    }

    receive() external payable {}
}